// Transparent transfer score (concept §6.3). Weighted mean over factors that have real data;
// factors without data are "no data" (value null), never an invented number.
import bdl from '../data/bdlContext.json';

export const WEIGHTS = { problemType: 30, context: 25, budget: 15, partners: 15, evidence: 15 };
// Context similarity: gap in the share of 65+ (GUS BDL snapshot) of 10 pp or more = 0 similarity (assumption).
export const CONTEXT_MAX_GAP = 0.10;
const EVIDENCE_VALUE = { A: 1, B: 0.75, C: 0.5, D: 0.25 };

function contextFactor(s, input) {
  const a = bdl.units?.[input.city], b = bdl.units?.[s.city];
  if (!a || !b) return { id: 'context', value: null, source: null };
  const value = 1 - Math.min(1, Math.abs(a.share65 - b.share65) / CONTEXT_MAX_GAP);
  return { id: 'context', value, source: 'bdl', detail: { from: { city: input.city, ...a }, to: { city: s.city, ...b }, ref: bdl.source } };
}

export function scoreCase(s, input = {}) {
  // Hard constraints first: a case requiring something unavailable is excluded, not scored.
  const missing = (s.requires || []).filter(r => !(input.available || []).includes(r));
  if (missing.length) return { excluded: true, missing, score: null, preliminary: true, factors: [] };

  const factors = [
    { id: 'problemType', value: input.category ? (s.category === input.category ? 1 : 0) : null, source: 'case' },
    contextFactor(s, input),  // GUS BDL snapshot, only when both cities have data
    { id: 'budget', value: null, source: null },    // case costs are free text, no user budget yet
    { id: 'partners', value: null, source: null },  // needs a real registry of NGOs/bodies
    { id: 'evidence', value: EVIDENCE_VALUE[s.evidenceLevel] ?? null, source: 'evidence' },
  ].map(f => ({ ...f, weight: WEIGHTS[f.id] }));

  const known = factors.filter(f => f.value !== null);
  const total = known.reduce((a, f) => a + f.weight, 0);
  const score = total ? Math.round(known.reduce((a, f) => a + f.weight * f.value, 0) / total * 100) : null;
  return { excluded: false, score, preliminary: known.length < factors.length, factors };
}
