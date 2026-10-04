// LLM adaptation plan (Step 17): retrieval + guardrails. The LLM may only pick and rephrase text of ONE loaded case;
// every plan item must carry verbatim quotes from that case, otherwise it is dropped server-side.
import { solutions } from '../src/data/index.js';

export const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
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

export async function buildPlan(env, caseId, lang, input) {
  const c = findCase(caseId);
  if (!c) return { status: 404, error: 'not_found' };
  if (!env.AI) return { status: 503, error: 'llm_unavailable' };
  const res = await env.AI.run(MODEL, {
    messages: buildMessages(c, lang, input),
    response_format: { type: 'json_schema', json_schema: SCHEMA },
    max_tokens: 900,
    temperature: 0,
  });
  const { items, dropped } = validate(res?.response ?? res, c, lang);
  return {
    status: 200,
    plan: {
      caseId: c.id, model: MODEL, lang, items, dropped,
      source: c.source,
      gaps: gaps(c),
    },
  };
}
