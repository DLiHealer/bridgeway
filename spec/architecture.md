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
  utils/              matching.js (scoring), geo.js (distanceKm), formatters.js
  hooks/              useLocalStorage, useDebounce
  components/
    layout/           Layout (Header, Footer, Outlet)
    map/MapView.jsx   Leaflet wrapper
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
Entities: `categories` (id, name, nameEn, color), `cities` (id, name, coords), `signals`, `ideas`, `solutions`, `experts`, `ngos`, `fundings`, `projects`. (No `analytics` dataset: the Analytics page counts the user's local signals/ideas/projects. Solutions have no `effect`/`verified`, experts no `rating`/`email`, NGOs no project counts.) Category ids: mieszkanie, seniorzy, dostepnosc, cyfrowe, ekologia, integracja, inne. `projects` have optional `sourceSolutionId` (set when copied from a solution; its `steps` become `todo` tasks). IDs of user-created items are prefixed (`s`/`i`/`p` + timestamp).
Helpers: `categoryById`, `categoryName` (language via `window.__i18nLang`).

## 7. Matching (`src/utils/matching.js`)
`matchAll(input, data)` → `matchExperts/Ngos/Solutions/Fundings/Ideas`. Score = category match (100 / 0, 40 neutral when no category) + text keyword hits (25 per word ≥3 chars, diacritic-normalized) + city match (30). UI label is "Suggestions (no AI)" — keyword matching, not AI. Specialization strings mapped to category ids via `SPEC_TO_CAT`.

## 8. Conventions
- UI text goes through i18n keys (pl + en); never hardcode user-facing strings in new code.
- Use `components/ui` primitives and Tailwind classes; brand colors from tailwind config.
- New route = page in `src/pages`, lazy entry + `<Route>` in `App.jsx`, nav/i18n update, update §4 here.
- No backend/env vars/secrets in MVP. External calls only: map tiles, dicebear avatars (`formatters.avatarUrl`).
- Security headers for Netlify in `netlify.toml`; Cloudflare uses `wrangler.jsonc`.

## 9. Known gaps / tech debt
- `toasts` persisted in localStorage under a placeholder key.
- No tests, no auth, no backend; data not shared across devices.
- Some comments in code are in Russian.
