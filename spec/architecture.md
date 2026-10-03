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
  utils/              matching.js (keyword scoring), transferScore.js (case transfer score), geo.js (distanceKm), formatters.js
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
| `/` | Home |
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
| `*` | NotFound |

## 5. State & persistence
`AppProvider` (`useApp()`) holds: `user`, `signals`, `ideas`, `projects`, `saved`, `filters`, `toasts`, plus actions (`addSignal`, `addIdea`, `addProject` (returns the created project),  `saveItem`, `isSaved`, `setFilters`, `clearFilters`) and `data` (static datasets).
- Each slice persists via `useLocalStorage` under `bridgeart-*` keys (`-user`, `-signals`, `-ideas`, `-projects`, `-saved`, `-filters`, `-toasts-placeholder`, plus `bridgeart-lang` for language).
- Seeded from `src/data/index.js` on first load. Data is per-browser; no sync.
- Static, read-only entities (solutions, experts, ngos, fundings) are read from `data` directly.

## 6. Domain model (mock, in `src/data/index.js`)
Entities: `categories` (id, name, nameEn, color), `cities` (id, name, coords), `signals`, `ideas`, `solutions`, `experts`, `ngos`, `fundings`, `projects`. (No `analytics` dataset: the Analytics page counts the user's local signals/ideas/projects. Experts have no `rating`/`email`, NGOs no project counts.)
`solutions` are **evidence-backed cases** (route `/rozwiazania`), loaded from `spec/sourcing-spike.md`: `id`, `kind` (`case` | `route`), `category`, `city`, `country`, `year`, `title`, `organisation`, `problem`, `solution`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel` (A–D: A systematic review, B controlled study, C evaluation / uncontrolled outcome, D outputs only), `context`, `source` (`{label,url}`), `steps`. Text fields are `{pl,en}` objects read with `loc()`; `null` = not stated in the source (UI shows "not stated"/"not measured", never an invented value). Every case must be real, sourced and graded; unverifiable cases are not added. `kind: 'route'` is a recommended process (accessibility audit → responsible body → technically approved solution), replacing the removed unsafe DIY-ramp case. Cases without `steps` produce generic `cases.defaultSteps` tasks on copy. Category ids: mieszkanie, seniorzy, dostepnosc, cyfrowe, ekologia, integracja, inne. `projects` have optional `sourceSolutionId` (set when copied from a case; its `steps` or `cases.defaultSteps` become `todo` tasks). IDs of user-created items are prefixed (`s`/`i`/`p` + timestamp).
Helpers: `categoryById`, `categoryName`, `loc` (language via `window.__i18nLang`). UI: `EvidenceBadge` in `components/ui`.

## 7. Matching (`src/utils/`)
**Cases (`transferScore.js`, used by `matchSolutions`, SolutionsPage, SolutionDetail, SubmitPage, IdeaDetail):** `scoreCase(case, {category, city, available})` → `{excluded, score|null, preliminary, factors[]}`. Weights (concept §6.3, a hypothesis shown in the UI): problem type 30, context 25, budget 15, partners 15, evidence 15. Score = weighted mean of factors **that have data**, 0–100; factors without data are `value: null` → "no data" and the score is marked preliminary. Currently with data: problem type (case category = chosen category; null without a category) and evidence (A 1, B .75, C .5, D .25 — assumption). Always "no data": context (needs GUS BDL, roadmap Step 15), budget (case costs are free text, no user budget), partners (no real registry). Hard constraints first: `case.requires[]` not in `input.available[]` → excluded (hook; no case declares `requires` yet). SolutionDetail reads input from `?cat=&city=`.
**Other entities (`matching.js`):** `matchExperts/Ngos/Fundings/Ideas` via `matchAll` — keyword scoring: category (100/0, 40 neutral), keyword hits (25 per word ≥3 chars, diacritic-normalized), city (30). Label is "Suggestions … (model, no AI)". Specialization strings mapped via `SPEC_TO_CAT`.

## 8. Conventions
- UI text goes through i18n keys (pl + en); never hardcode user-facing strings in new code.
- Use `components/ui` primitives and Tailwind classes; brand colors from tailwind config.
- New route = page in `src/pages`, lazy entry + `<Route>` in `App.jsx`, nav/i18n update, update §4 here.
- No backend/env vars/secrets in MVP. External calls only: map tiles, dicebear avatars (`formatters.avatarUrl`).
- Security headers for Netlify in `netlify.toml`; Cloudflare uses `wrangler.jsonc`.

## 9. Known gaps / tech debt
- Non-functional controls are hidden, not faked (no search, logout, drafts, join-team, chat, upload/invite in Project Room); they return only with real backing (see roadmap P15).
- `toasts` persisted in localStorage under a placeholder key.
- No tests, no auth, no backend; data not shared across devices.
- Some comments in code are in Russian.
