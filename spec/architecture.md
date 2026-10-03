# BridgeWay — Architecture Spec

> Source of truth for how the app is built. Update in the same change as any code change that affects it.

## 1. Overview
Polish-language civic engagement SPA ("bridge between a problem and a solution"). Residents report problems (signals), pitch ideas, get matched to solutions/experts/NGOs/funding, and follow community projects on a map. MVP: fully client-side, mocked data, no backend. **Data honesty rule:** every seeded dataset is demo data and is labelled as such in the UI (`common.demo`, `common.demoNote`); no invented KPIs, ratings, "verified" claims, effects or contacts.

## 2. Stack
| Concern | Choice |
|---|---|
| Build | Vite 5 (`npm run dev/build/preview`), output `dist/` |
| UI | React 18, Tailwind CSS 3 (custom `brand` colors in `tailwind.config.js`), framer-motion, lucide-react |
| Routing | react-router-dom v6, `BrowserRouter`, all pages lazy-loaded |
| Forms | react-hook-form |
| Map | leaflet + react-leaflet |
| i18n | i18next + react-i18next, languages `pl` (default) and `en`; inline resources in `src/i18n.js` |
| Hosting | Cloudflare Workers Static Assets (`wrangler.jsonc`, SPA fallback); `netlify.toml` kept as alt. See `DEPLOYMENT.md` |
| Tests | none yet |

## 3. Directory layout
```
src/
  main.jsx            entry: providers (Router, AppProvider), i18n import
  App.jsx             route table (lazy pages, Suspense)
  i18n.js             pl/en resources, language persisted in localStorage
  index.css           Tailwind layers + shared classes (e.g. container-app)
  context/AppContext.jsx   global state (see §5)
  data/index.js       mock datasets + category/city helpers
  data/bdlContext.json  GUS BDL snapshot (share of 65+ per city), written by scripts/fetch-bdl-context.mjs
  utils/              matching.js (keyword scoring), transferScore.js (case transfer score), privacy.js (sensitive categories, coordinate coarsening), geo.js (distanceKm), formatters.js
  hooks/              useLocalStorage, useDebounce
  components/
    layout/           Layout (Header, Footer, Outlet)
    map/MapView.jsx   Leaflet wrapper
    cases/ScoreBreakdown.jsx   per-factor transfer score card
    ui/index.jsx      design-system primitives (Button, Card, Badge, Chip, Input, Textarea, Select, Modal, Toast, EmptyState, Skeleton, cx)
  pages/              one file per route
```

## 4. Routes (Polish slugs)
| Path | Page |
|---|---|
| `/` | Home (slogan “Problem został już gdzieś rozwiązany.”, CTAs: find a case → `/rozwiazania`, report → `/zglos`; sections: verified cases, 5-step how-it-works, demo-map teaser) |
| `/mapa` | MapPage |
| `/zglos` | SubmitPage (report problem / propose idea) |
| `/pomysly`, `/pomysly/:id` | IdeasPage, IdeaDetail |
| `/rozwiazania`, `/rozwiazania/:id` | SolutionsPage, SolutionDetail |
| `/eksperci`, `/eksperci/:id` | ExpertsPage, ExpertDetail |
| `/finansowanie` | FundingPage (detail component: FundingDetail) |
| `/projekty`, `/projekty/:id` | ProjectsPage (list of projects, empty state → `/rozwiazania`), ProjectRoom |
| `/profil` | ProfilePage |
| `/analityka` | AnalyticsPage |
| `/o-nas` | AboutPage |
| `/dostepnosc` | AccessibilityPage (accessibility statement, linked from footer) |
| `/prywatnosc`, `/regulamin` | LegalPage (`kind="privacy"`/`"terms"`; prototype drafts, linked from footer) |
| `*` | NotFound |

Nav order (concept §5.5): Solutions (centre), Map, Projects, Experts, Funding, Ideas (demoted, last). Profile only in the avatar menu; Analytics not linked until roadmap Step 18.

## 5. State & persistence
`AppProvider` (`useApp()`) holds: `user`, `signals`, `ideas`, `projects`, `saved`, `filters`, `toasts`, plus actions (`addSignal`, `addIdea`, `addProject` (returns the created project; defaults `responsibleBody: null`, `statusHistory: [received]`), `updateProject(id, patch|fn)`,  `saveItem`, `isSaved`, `setFilters`, `clearFilters`) and `data` (static datasets).
- Each slice persists via `useLocalStorage` under `bridgeart-*` keys (`-user`, `-signals`, `-ideas`, `-projects`, `-saved`, `-filters`, `-toasts-placeholder`, plus `bridgeart-lang` for language).
- Seeded from `src/data/index.js` on first load. Data is per-browser; no sync.
- Static, read-only entities (solutions, experts, ngos, fundings) are read from `data` directly.

## 6. Domain model (mock, in `src/data/index.js`)
Entities: `categories` (id, name, nameEn, color), `cities` (id, name, coords), `signals`, `ideas`, `solutions`, `experts`, `ngos`, `fundings`, `projects`. (No `analytics` dataset: the Analytics page counts the user's local signals/ideas/projects. Experts have no `rating`/`email`, NGOs no project counts.)
`solutions` are **evidence-backed cases** (route `/rozwiazania`), loaded from `spec/sourcing-spike.md`: `id`, `kind` (`case` | `route`), `category`, `city`, `country`, `year`, `title`, `organisation`, `problem`, `solution`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel` (A–D: A systematic review, B controlled study, C evaluation / uncontrolled outcome, D outputs only), `context`, `source` (`{label,url}`), `steps`. Text fields are `{pl,en}` objects read with `loc()`; `null` = not stated in the source (UI shows "not stated"/"not measured", never an invented value). Every case must be real, sourced and graded; unverifiable cases are not added. `kind: 'route'` is a recommended process (accessibility audit → responsible body → technically approved solution), replacing the removed unsafe DIY-ramp case. Cases without `steps` produce generic `cases.defaultSteps` tasks on copy. Category ids: mieszkanie, seniorzy, dostepnosc, cyfrowe, ekologia, integracja, inne. `projects` have optional `sourceSolutionId` (set when copied from a case; its `steps` or `cases.defaultSteps` become `todo` tasks). `projects` also carry `responsibleBody` (string | null — null is flagged in Project Room) and `statusHistory[]` (`{status, date, note}`, status ∈ received | assigned | inprogress | resolved | rejected; rejection requires a note); shown/edited in the Project Room overview, labelled demo/local. `signals` may carry `onBehalf` (bool) + `consentAt` (ISO) — set by SubmitPage (problem tab) only when the proxy flag and the consent checkbox are both ticked; demo signal `s6` is a proxy report; MapView popup shows a badge. **Privacy:** `utils/privacy.js` `isSensitive` = problem with category `seniorzy`/`mieszkanie` or `onBehalf`; such signals are drawn on the map as a 3 km `Circle` at coords snapped to a 0.1° grid (display-time, plus stored coarse by SubmitPage). Only a city is collected, never an address. IDs of user-created items are prefixed (`s`/`i`/`p` + timestamp).
Helpers: `categoryById`, `categoryName`, `loc` (language via `window.__i18nLang`). UI: `EvidenceBadge` in `components/ui`.

## 7. Matching (`src/utils/`)
**Cases (`transferScore.js`, used by `matchSolutions`, SolutionsPage, SolutionDetail, SubmitPage, IdeaDetail):** `scoreCase(case, {category, city, available})` → `{excluded, score|null, preliminary, factors[]}`. Weights (concept §6.3, a hypothesis shown in the UI): problem type 30, context 25, budget 15, partners 15, evidence 15. Score = weighted mean of factors **that have data**, 0–100; factors without data are `value: null` → "no data" and the score is marked preliminary. Currently with data: problem type (case category = chosen category; null without a category) and evidence (A 1, B .75, C .5, D .25 — assumption). Context similarity (Step 15): `1 − min(1, |share65_user − share65_case| / 0.10)` from the GUS BDL snapshot `data/bdlContext.json` (`units[city].share65`, year, source/retrieval date shown in `ScoreBreakdown`), only when both the user's city (`input.city`; city select on SolutionsPage, `?city=` on detail) and the case city are in the snapshot — otherwise "no data" (foreign cities, voivodeships). 10 pp gap = 0 is an assumption. Snapshot (retrieved 2026-10-03, year 2024, BDL variables 72305 total / 72239 + 72240 aged 65+, gmina level) holds all 8 demo cities; refresh with `node scripts/fetch-bdl-context.mjs` (optional `BDL_CLIENT_ID` key). Always "no data": budget (case costs are free text, no user budget), partners (no real registry). Hard constraints first: `case.requires[]` not in `input.available[]` → excluded (hook; no case declares `requires` yet). SolutionDetail reads input from `?cat=&city=`.
**Other entities (`matching.js`):** `matchExperts/Ngos/Fundings/Ideas` via `matchAll` — keyword scoring: category (100/0, 40 neutral), keyword hits (25 per word ≥3 chars, diacritic-normalized), city (30). Label is "Suggestions … (model, no AI)". Specialization strings mapped via `SPEC_TO_CAT`.

## 8. Conventions
- UI text goes through i18n keys (pl + en); never hardcode user-facing strings in new code.
- Use `components/ui` primitives and Tailwind classes; brand colors from tailwind config.
- New route = page in `src/pages`, lazy entry + `<Route>` in `App.jsx`, nav/i18n update, update §4 here.
- No backend/env vars/secrets in MVP. External calls only: map tiles, dicebear avatars (`formatters.avatarUrl`). GUS BDL is fetched at build time by `scripts/fetch-bdl-context.mjs` (never at runtime).
- Accessibility (WCAG AA, see `accessibility.md`): text colours must keep ≥4.5:1 (`neutral-400` is already AA; don't use `brand-secondary/accent` as text colour); icon-only buttons need an i18n `aria-label` (`a11y.*`) and decorative icons `aria-hidden`; form controls need `htmlFor`/`id`; `Layout` focuses `<main>` and sets the tab title from `<h1>` on route change; framer-motion runs under `MotionConfig reducedMotion="user"`.
- Privacy: SubmitPage shows a third-party personal data warning; sensitive reports never get exact map points (`utils/privacy.js`); policy/terms text lives in i18n `legal.*`.
- Security headers for Netlify in `netlify.toml`; Cloudflare uses `wrangler.jsonc`.

## 9. Known gaps / tech debt
- Non-functional controls are hidden, not faked (no search, logout, drafts, join-team, chat, upload/invite in Project Room); they return only with real backing (see roadmap P15).
- `toasts` persisted in localStorage under a placeholder key.
- Accessibility: manual keyboard + screen-reader run pending; `Modal` has no full focus trap; map only partly keyboard-accessible.
- GUS BDL snapshot is static (refresh manually); only the 8 demo cities, aged 65+ share is the single context indicator (population density etc. not used). Anonymous BDL quota is 100 requests/15 min.
- No tests, no auth, no backend; data not shared across devices.
- Some comments in code are in Russian.
