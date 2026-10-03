// Build-time snapshot of GUS BDL context data (share of population aged 65+) for the demo cities.
// Usage: node scripts/fetch-bdl-context.mjs   (public API, anonymous; respects Retry-After)
// Writes src/data/bdlContext.json. Never types numbers by hand.
import { writeFileSync } from 'node:fs';

const BASE = 'https://bdl.stat.gov.pl/api/v1';
const CITIES = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Łódź', 'Szczecin', 'Lublin'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(path, params = {}) {
  const url = `${BASE}${path}?${new URLSearchParams({ format: 'json', lang: 'en', ...params })}`;
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      const wait = (parseInt(res.headers.get('retry-after'), 10) || 60) + 5;
      console.error(`429, waiting ${wait}s`); await sleep(wait * 1000); continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    await sleep(400);
    return res.json();
  }
  throw new Error(`rate-limited: ${url}`);
}

const find = async (name, level = 5) => (await get('/units/search', { name, level })).results
  .find(u => u.name.toLowerCase().includes(name.toLowerCase()) && /city/i.test(u.name));

// variable ids are discovered, not assumed: pass them via env if known
const VAR_POP = process.env.BDL_VAR_POP, VAR_65 = process.env.BDL_VAR_POP65;
if (!VAR_POP || !VAR_65) { console.error('Set BDL_VAR_POP (total population) and BDL_VAR_POP65 (aged 65+) variable ids'); process.exit(1); }

const units = {};
for (const city of CITIES) {
  const u = await find(city);
  if (!u) { console.error('unit not found', city); continue; }
  const [p, p65] = await Promise.all([VAR_POP, VAR_65].map(v => get(`/data/by-unit/${u.id}`, { 'var-id': v, 'unit-level': 5, 'year': 2022 })));
  const a = p.results?.[0]?.values?.[0], b = p65.results?.[0]?.values?.[0];
  if (!a || !b || !a.val) { console.error('no values', city); continue; }
  units[city] = { unitId: u.id, year: +a.year, pop: a.val, pop65: b.val, share65: +(b.val / a.val).toFixed(4) };
  console.error('ok', city, units[city].share65);
}

writeFileSync(new URL('../src/data/bdlContext.json', import.meta.url), JSON.stringify({
  source: { label: 'GUS Bank Danych Lokalnych', url: 'https://bdl.stat.gov.pl/', retrieved: new Date().toISOString().slice(0, 10) },
  indicator: 'share65plus', variables: { pop: VAR_POP, pop65: VAR_65 }, units,
}, null, 2) + '\n');
