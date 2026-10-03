// Transparent transfer score (concept §6.3). Weighted mean over factors that have real data;
// factors without data are "no data" (value null), never an invented number.
export const WEIGHTS = { problemType: 30, context: 25, budget: 15, partners: 15, evidence: 15 };
const EVIDENCE_VALUE = { A: 1, B: 0.75, C: 0.5, D: 0.25 };

export function scoreCase(s, input = {}) {
  // Hard constraints first: a case requiring something unavailable is excluded, not scored.
  const missing = (s.requires || []).filter(r => !(input.available || []).includes(r));
  if (missing.length) return { excluded: true, missing, score: null, preliminary: true, factors: [] };

  const factors = [
    { id: 'problemType', value: input.category ? (s.category === input.category ? 1 : 0) : null, source: 'case' },
    { id: 'context', value: null, source: null },   // needs GUS BDL (roadmap Step 15)
    { id: 'budget', value: null, source: null },    // case costs are free text, no user budget yet
    { id: 'partners', value: null, source: null },  // needs a real registry of NGOs/bodies
    { id: 'evidence', value: EVIDENCE_VALUE[s.evidenceLevel] ?? null, source: 'evidence' },
  ].map(f => ({ ...f, weight: WEIGHTS[f.id] }));

  const known = factors.filter(f => f.value !== null);
  const total = known.reduce((a, f) => a + f.weight, 0);
  const score = total ? Math.round(known.reduce((a, f) => a + f.weight * f.value, 0) / total * 100) : null;
  return { excluded: false, score, preliminary: known.length < factors.length, factors };
}
