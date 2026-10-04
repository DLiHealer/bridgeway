// LLM adaptation plan (Step 17): retrieval + guardrails. The LLM may only pick and rephrase text of ONE loaded case;
// every plan item must carry verbatim quotes from that case, otherwise it is dropped server-side.
import { solutions } from '../src/data/index.js';

export const DEFAULT_MODEL = 'openai/gpt-4o-mini';
const OPENROUTER = 'https://openrouter.ai/api/v1';

// OpenRouter catalogue (public endpoint): id, name, USD per 1M tokens in/out. Cached per isolate for 10 min.
let cache = { at: 0, models: null };
export async function listModels() {
  if (cache.models && Date.now() - cache.at < 600_000) return cache.models;
  const res = await fetch(`${OPENROUTER}/models`);
  if (!res.ok) throw new Error('models');
  const { data } = await res.json();
  const per1M = (v) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? Math.round(n * 1e6 * 1e4) / 1e4 : null; };
  const models = (data || []).filter(m => m.id && /text/.test(m.architecture?.output_modalities?.join(',') || 'text'))
    .map(m => ({ id: m.id, name: m.name || m.id, in: per1M(m.pricing?.prompt), out: per1M(m.pricing?.completion) }))
    .sort((a, b) => a.name.localeCompare(b.name));
  cache = { at: Date.now(), models };
  return models;
}
const FIELDS = ['problem', 'solution', 'cost', 'duration', 'outcome', 'outcomeMethod', 'context'];
const MAX_ITEMS = 6;

const txt = (v, lang) => (v && typeof v === 'object' ? (v[lang] ?? v.pl ?? null) : v ?? null);

// Passages of a case in the requested language; null = not stated in the source (stays empty).
export function passages(c, lang) {
  const out = {};
  for (const f of FIELDS) { const v = txt(c[f], lang); if (v) out[f] = v; }
  (c.steps || []).forEach((s, i) => { const v = txt(s, lang); if (v) out[`step${i + 1}`] = v; });
  return out;
}

export const gaps = (c) => FIELDS.filter(f => !txt(c[f], 'pl'));

export function buildMessages(c, lang, input) {
  const p = passages(c, lang);
  const sources = Object.entries(p).map(([k, v]) => `[${k}] ${v}`).join('\n');
  const system = [
    `You draft a short adaptation plan for copying a documented case to another place. Answer in ${lang === 'en' ? 'English' : 'Polish'}.`,
    'Use ONLY the passages below. Do not add facts, numbers, costs, names, laws or advice that are not in them. If something is not in the passages, leave it out.',
    'Return JSON: {"items":[{"action":"short imperative sentence","evidence":[{"field":"<passage id>","quote":"<exact text copied from that passage>"}]}]}.',
    `Max ${MAX_ITEMS} items. Every item needs 1-2 evidence entries; each quote must be copied character by character from the passage. "action" must not contain digits.`,
  ].join('\n');
  const user = `Passages of the case (id [..]):\n${sources}\n\nThe user's place: ${input.city || 'not given'}.`;
  return [{ role: 'system', content: system }, { role: 'user', content: user }];
}

export const SCHEMA = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          action: { type: 'string' },
          evidence: { type: 'array', items: { type: 'object', properties: { field: { type: 'string' }, quote: { type: 'string' } }, required: ['field', 'quote'] } },
        },
        required: ['action', 'evidence'],
      },
    },
  },
  required: ['items'],
};

// Keep only items whose quotes are verbatim substrings of the case passages; drop anything else.
export function validate(raw, c, lang) {
  let data = raw;
  if (typeof data === 'string') { try { data = JSON.parse(data); } catch { return { items: [], dropped: 0 }; } }
  const list = Array.isArray(data?.items) ? data.items.slice(0, 12) : [];
  const p = passages(c, lang);
  const items = [];
  for (const it of list) {
    const action = typeof it?.action === 'string' ? it.action.trim() : '';
    if (!action || action.length > 220 || /\d/.test(action) || !Array.isArray(it.evidence)) continue;
    const evidence = [];
    for (const e of it.evidence.slice(0, 2)) {
      const src = p[e?.field];
      const q = typeof e?.quote === 'string' ? e.quote.trim() : '';
      const at = src && q.length >= 8 ? src.toLowerCase().indexOf(q.toLowerCase()) : -1;
      if (at >= 0) evidence.push({ field: e.field, quote: src.slice(at, at + q.length) }); // always show the source's own text
    }
    if (evidence.length && items.length < MAX_ITEMS) items.push({ action, evidence });
  }
  return { items, dropped: list.length - items.length };
}

export const findCase = (id) => solutions.find(s => s.id === id) || null;

export async function buildPlan(env, caseId, lang, input, model = DEFAULT_MODEL) {
  const c = findCase(caseId);
  if (!c) return { status: 404, error: 'not_found' };
  if (!env.OPENROUTER_API_KEY) return { status: 503, error: 'llm_unavailable' };
  let res;
  try {
    const r = await fetch(`${OPENROUTER}/chat/completions`, {
      method: 'POST',
      headers: { authorization: `Bearer ${env.OPENROUTER_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: buildMessages(c, lang, input),
        response_format: { type: 'json_schema', json_schema: { name: 'plan', strict: false, schema: SCHEMA } },
        max_tokens: 900,
        temperature: 0,
      }),
    });
    if (!r.ok) return { status: 502, error: 'llm_failed' };
    res = (await r.json())?.choices?.[0]?.message?.content;
  } catch { return { status: 502, error: 'llm_failed' }; }
  const { items, dropped } = validate(res, c, lang);
  return {
    status: 200,
    plan: {
      caseId: c.id, model, lang, items, dropped,
      source: c.source,
      gaps: gaps(c),
    },
  };
}
