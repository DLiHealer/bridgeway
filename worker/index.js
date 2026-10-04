// BridgeWay API (Cloudflare Worker + D1): magic-link login and shared problem reports.
// Everything outside /api/* is served by the static assets binding.

const ROLE_LABELS = ['Mieszkaniec', 'Aktywista', 'Ekspert', 'NGO', 'Instytut'];
const STATUSES = ['received', 'assigned', 'inprogress', 'resolved', 'rejected'];
const TOKEN_TTL_MS = 15 * 60 * 1000;
const SESSION_TTL_S = 30 * 24 * 3600;
const MAX_LINKS_PER_HOUR = 5;
const MAX_PENDING = 200;
const TEST_MODE_MAX_LINKS_PER_HOUR = 50; // global cap while test mode is on (limits mail abuse)

const testModeOn = async (env) => (await env.DB.prepare("SELECT value FROM settings WHERE key = 'testMode'").first())?.value === '1';
const COOKIE = 'bw_session';

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers } });
const fail = (status, error) => json({ error }, status);

const sha256 = async (s) =>
  [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map(b => b.toString(16).padStart(2, '0')).join('');
const randomToken = () => [...crypto.getRandomValues(new Uint8Array(32))].map(b => b.toString(16).padStart(2, '0')).join('');
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const validEmail = (e) => e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const roleOf = (env, email) =>
  (env.RESPONDER_EMAILS || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean).includes(email) ? 'responder' : 'resident';

function getCookie(request, name) {
  const m = (request.headers.get('cookie') || '').match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return m ? m[1] : null;
}

async function session(request, env) {
  const raw = getCookie(request, COOKIE);
  if (!raw) return null;
  const row = await env.DB.prepare('SELECT email, expires_at FROM sessions WHERE hash = ?').bind(await sha256(raw)).first();
  if (!row || row.expires_at < Date.now()) return null;
  return { email: row.email, role: roleOf(env, row.email) };
}

function sameOriginJson(request) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return false;
  return (request.headers.get('content-type') || '').includes('application/json');
}

async function readJson(request) {
  try { return await request.json(); } catch { return null; }
}

async function history(env, id) {
  const { results } = await env.DB.prepare('SELECT status, note, actor_role AS actorRole, created_at AS date FROM report_status WHERE report_id = ? ORDER BY id').bind(id).all();
  return results.map(r => ({ ...r, date: new Date(r.date).toISOString().slice(0, 10) }));
}

const publicReport = (r) => ({
  id: r.id, title: r.title, description: r.description, category: r.category, city: r.city,
  onBehalf: !!r.on_behalf, responsibleBody: r.responsible_body, createdAt: new Date(r.created_at).toISOString().slice(0, 10),
});

async function sendLink(env, email, link) {
  if (env.DEV_MAGIC_LINK === 'true') return { devLink: link };
  const text = `Zaloguj się / Sign in: ${link}\n\nLink jest ważny 15 minut i można go użyć raz. / Valid for 15 minutes, single use.`;
  const subject = 'BridgeWay — link do logowania / sign-in link';
  if (env.RESEND_API_KEY) {
    // Resend HTTP API; MAIL_FROM defaults to Resend's shared test sender (delivers only to the Resend account owner)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: env.MAIL_FROM || 'BridgeWay <onboarding@resend.dev>', to: [email], subject, text }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
    return {};
  }
  if (!env.EMAIL || !env.MAIL_FROM) throw new Error('email not configured');
  await env.EMAIL.send({
    to: email, from: env.MAIL_FROM, subject, text,
  });
  return {};
}

async function api(request, env, url) {
  const { pathname } = url;
  const method = request.method;
  if (pathname === '/api/health') return json({ ok: true });

  if ((method === 'POST' || method === 'PUT') && !sameOriginJson(request)) return fail(400, 'bad_request');

  if (pathname === '/api/me' && method === 'GET') {
    const s = await session(request, env);
    return json({ user: s });
  }

  if (pathname === '/api/auth/request' && method === 'POST') {
    const body = await readJson(request);
    const email = clean(body?.email, 254).toLowerCase();
    if (!validEmail(email)) return fail(400, 'invalid_email');
    const now = Date.now();
    // Registration: only responders and approved ("trusted") emails get a link; others become a pending request.
    if (env.DEV_MAGIC_LINK !== 'true' && roleOf(env, email) !== 'responder') {
      const reg = await env.DB.prepare('SELECT status FROM registrations WHERE email = ?').bind(email).first();
      if (reg?.status !== 'rejected' && reg?.status !== 'approved' && await testModeOn(env)) {
        // Test mode (responder-controlled): new/pending emails are approved automatically; the link still goes to the inbox.
        const { n } = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_tokens WHERE created_at > ?').bind(now - 3600_000).first();
        if (n >= TEST_MODE_MAX_LINKS_PER_HOUR) return fail(429, 'rate_limited');
        await env.DB.prepare("INSERT INTO registrations (email, status, created_at, decided_at) VALUES (?, 'approved', ?, ?) ON CONFLICT(email) DO UPDATE SET status = 'approved', decided_at = excluded.decided_at").bind(email, now, now).run();
      } else if (!reg) {
        const { n } = await env.DB.prepare("SELECT COUNT(*) AS n FROM registrations WHERE status = 'pending'").first();
        if (n >= MAX_PENDING) return fail(429, 'registrations_full');
        await env.DB.prepare('INSERT INTO registrations (email, status, created_at) VALUES (?, ?, ?)').bind(email, 'pending', now).run();
        return json({ pending: true });
      } else if (reg.status === 'pending') return json({ pending: true });
      else if (reg.status === 'rejected') return fail(403, 'registration_rejected');
    }
    const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_tokens WHERE email = ? AND created_at > ?').bind(email, now - 3600_000).first();
    if (recent.n >= MAX_LINKS_PER_HOUR) return fail(429, 'rate_limited');
    const token = randomToken();
    await env.DB.prepare('INSERT INTO login_tokens (hash, email, expires_at, created_at) VALUES (?, ?, ?, ?)').bind(await sha256(token), email, now + TOKEN_TTL_MS, now).run();
    const base = env.PUBLIC_URL || url.origin;
    try {
      return json({ sent: true, ...(await sendLink(env, email, `${base}/logowanie?token=${token}`)) });
    } catch {
      return fail(503, 'email_unavailable');
    }
  }

  if (pathname === '/api/auth/verify' && method === 'POST') {
    const body = await readJson(request);
    const token = clean(body?.token, 128);
    if (!token) return fail(400, 'bad_request');
    const hash = await sha256(token);
    // single use: the UPDATE only matches an unused, unexpired token
    const res = await env.DB.prepare('UPDATE login_tokens SET used = 1 WHERE hash = ? AND used = 0 AND expires_at > ?').bind(hash, Date.now()).run();
    if (!res.meta.changes) return fail(400, 'invalid_token');
    const row = await env.DB.prepare('SELECT email FROM login_tokens WHERE hash = ?').bind(hash).first();
    const sid = randomToken();
    await env.DB.prepare('INSERT INTO sessions (hash, email, expires_at) VALUES (?, ?, ?)').bind(await sha256(sid), row.email, Date.now() + SESSION_TTL_S * 1000).run();
    return json({ user: { email: row.email, role: roleOf(env, row.email) } }, 200, {
      'set-cookie': `${COOKIE}=${sid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_S}`,
    });
  }

  if (pathname === '/api/auth/logout' && method === 'POST') {
    const raw = getCookie(request, COOKIE);
    if (raw) await env.DB.prepare('DELETE FROM sessions WHERE hash = ?').bind(await sha256(raw)).run();
    return json({ ok: true }, 200, { 'set-cookie': `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0` });
  }

  if (pathname === '/api/admin/registrations' && method === 'GET') {
    const s = await session(request, env);
    if (!s) return fail(401, 'login_required');
    if (s.role !== 'responder') return fail(403, 'forbidden');
    const { results } = await env.DB.prepare('SELECT email, status, created_at AS createdAt FROM registrations ORDER BY created_at DESC LIMIT 200').all();
    return json({ registrations: results.map(r => ({ ...r, createdAt: new Date(r.createdAt).toISOString().slice(0, 10) })) });
  }

  if (pathname === '/api/profile' && (method === 'GET' || method === 'PUT')) {
    const s = await session(request, env);
    if (!s) return fail(401, 'login_required');
    if (method === 'PUT') {
      const b = await readJson(request);
      const name = clean(b?.name, 60), city = clean(b?.city, 60), bio = clean(b?.bio, 500), roleLabel = clean(b?.roleLabel, 20);
      if (name.length < 2 || !ROLE_LABELS.includes(roleLabel)) return fail(400, 'invalid_profile');
      await env.DB.prepare('INSERT INTO profiles (email, name, role_label, city, bio, updated_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET name = excluded.name, role_label = excluded.role_label, city = excluded.city, bio = excluded.bio, updated_at = excluded.updated_at').bind(s.email, name, roleLabel, city, bio, Date.now()).run();
    }
    const p = await env.DB.prepare('SELECT name, role_label AS roleLabel, city, bio FROM profiles WHERE email = ?').bind(s.email).first();
    return json({ profile: p || null });
  }

  if (pathname === '/api/admin/settings' && (method === 'GET' || method === 'POST')) {
    const s = await session(request, env);
    if (!s) return fail(401, 'login_required');
    if (s.role !== 'responder') return fail(403, 'forbidden');
    if (method === 'POST') {
      const b = await readJson(request);
      if (typeof b?.testMode !== 'boolean') return fail(400, 'bad_request');
      await env.DB.prepare("INSERT INTO settings (key, value) VALUES ('testMode', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(b.testMode ? '1' : '0').run();
    }
    return json({ testMode: await testModeOn(env) });
  }

  const adm = pathname.match(/^\/api\/admin\/registrations\/decide$/);
  if (adm && method === 'POST') {
    const s = await session(request, env);
    if (!s) return fail(401, 'login_required');
    if (s.role !== 'responder') return fail(403, 'forbidden');
    const b = await readJson(request);
    const email = clean(b?.email, 254).toLowerCase(), decision = clean(b?.decision, 10);
    if (!validEmail(email) || !['approved', 'rejected'].includes(decision)) return fail(400, 'bad_request');
    const res = await env.DB.prepare('UPDATE registrations SET status = ?, decided_at = ? WHERE email = ?').bind(decision, Date.now(), email).run();
    if (!res.meta.changes) return fail(404, 'not_found');
    return json({ ok: true });
  }

  if (pathname === '/api/reports' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT * FROM reports ORDER BY created_at DESC LIMIT 200').all();
    const out = [];
    for (const r of results) {
      const h = await history(env, r.id);
      out.push({ ...publicReport(r), status: h[h.length - 1]?.status || 'received' });
    }
    return json({ reports: out });
  }

  if (pathname === '/api/reports' && method === 'POST') {
    const s = await session(request, env);
    if (!s) return fail(401, 'login_required');
    const b = await readJson(request);
    const title = clean(b?.title, 140), description = clean(b?.description, 2000), category = clean(b?.category, 40), city = clean(b?.city, 60);
    if (title.length < 3 || !description || !category || !city) return fail(400, 'invalid_report');
    const id = 'r' + Date.now().toString(36) + randomToken().slice(0, 6);
    const now = Date.now();
    await env.DB.batch([
      env.DB.prepare('INSERT INTO reports (id, owner_email, title, description, category, city, on_behalf, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(id, s.email, title, description, category, city, b?.onBehalf ? 1 : 0, now),
      env.DB.prepare('INSERT INTO report_status (report_id, status, note, actor_role, created_at) VALUES (?, ?, ?, ?, ?)').bind(id, 'received', '', s.role, now),
    ]);
    return json({ id }, 201);
  }

  const m = pathname.match(/^\/api\/reports\/([\w-]+)(\/status)?$/);
  if (m) {
    const report = await env.DB.prepare('SELECT * FROM reports WHERE id = ?').bind(m[1]).first();
    if (!report) return fail(404, 'not_found');
    if (!m[2] && method === 'GET') {
      const h = await history(env, report.id);
      return json({ report: { ...publicReport(report), status: h[h.length - 1]?.status || 'received', statusHistory: h } });
    }
    if (m[2] && method === 'POST') {
      const s = await session(request, env);
      if (!s) return fail(401, 'login_required');
      if (s.role !== 'responder') return fail(403, 'forbidden');
      const b = await readJson(request);
      const status = clean(b?.status, 20), note = clean(b?.note, 500), body = clean(b?.responsibleBody, 120);
      if (!STATUSES.includes(status)) return fail(400, 'invalid_status');
      if (status === 'rejected' && !note) return fail(400, 'reason_required');
      const stmts = [env.DB.prepare('INSERT INTO report_status (report_id, status, note, actor_role, created_at) VALUES (?, ?, ?, ?, ?)').bind(report.id, status, note, s.role, Date.now())];
      if (body) stmts.push(env.DB.prepare('UPDATE reports SET responsible_body = ? WHERE id = ?').bind(body, report.id));
      await env.DB.batch(stmts);
      return json({ ok: true });
    }
  }
  return fail(404, 'not_found');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    try {
      return await api(request, env, url);
    } catch (e) {
      console.error(e);
      return fail(500, 'server_error');
    }
  },
};
