// Build-time snapshot of GUS BDL context data (share of population aged 65+) for the demo cities.
// Usage: BDL_VAR_POP=<id> BDL_VARS_65=<id,id,...> [BDL_CLIENT_ID=<key>] node scripts/fetch-bdl-context.mjs
// Anonymous limits: 5/s, 100/15m, 1000/12h; a free registered key (header X-ClientId) raises them. One data call per city.
// Writes src/data/bdlContext.json. Never types numbers by hand.
import { writeFileSync } from 'node:fs';

const BASE = 'https://bdl.stat.gov.pl/api/v1';
const CITIES = ['Warszawa', 'Kraków', 'Gdańsk', 'Wrocław', 'Poznań', 'Łódź', 'Szczecin', 'Lublin'];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const headers = process.env.BDL_CLIENT_ID ? { 'X-ClientId': process.env.BDL_CLIENT_ID } : {};

async function get(path, params = {}) {
  const q = new URLSearchParams({ format: 'json', lang: 'en' });
  for (const [k, v] of Object.entries(params)) [].concat(v).forEach(x => q.append(k, x));
  const url = `${BASE}${path}?${q}`;
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, { headers });
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

const find = async name => (await get('/units/search', { name, level: 5 })).results
  .find(u => u.name.toLowerCase().includes(name.toLowerCase()) && /city/i.test(u.name));

// variable ids are discovered via /variables?subject-id=P2137 (population by age), not assumed
const VAR_POP = process.env.BDL_VAR_POP;
const VARS_65 = (process.env.BDL_VARS_65 || '').split(',').filter(Boolean);
if (!VAR_POP || !VARS_65.length) {
  console.error('Set BDL_VAR_POP (total population) and BDL_VARS_65 (comma list: age groups 65-69 … 85+, same sex)');
  process.exit(1);
}

const units = {};
for (const city of CITIES) {
  const u = await find(city);
  if (!u) { console.error('unit not found', city); continue; }
  const d = await get(`/data/by-unit/${u.id}`, { 'var-id': [VAR_POP, ...VARS_65], year: [2020, 2021, 2022, 2023, 2024] });
  const byVar = Object.fromEntries((d.results || []).map(r => [String(r.id), Object.fromEntries(r.values.map(v => [v.year, v.val]))]));
  const y = Object.keys(byVar[VAR_POP] || {}).filter(y => VARS_65.every(v => byVar[v]?.[y] != null)).sort().at(-1);
  if (!y) { console.error('no complete year', city); continue; }
  const pop = byVar[VAR_POP][y];
  const pop65 = VARS_65.reduce((a, v) => a + byVar[v][y], 0);
  units[city] = { unitId: u.id, year: +y, pop, pop65, share65: +(pop65 / pop).toFixed(4) };
  console.error('ok', city, y, units[city].share65);
}

writeFileSync(new URL('../src/data/bdlContext.json', import.meta.url), JSON.stringify({
  source: { label: 'GUS Bank Danych Lokalnych', url: 'https://bdl.stat.gov.pl/', retrieved: new Date().toISOString().slice(0, 10) },
  indicator: 'share65plus', variables: { pop: VAR_POP, pop65: VARS_65 }, units,
}, null, 2) + '\n');
