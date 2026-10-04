[← README](../README.md) · [Project](../README.md#about) · [Tech spec](./TECH_SPEC.md) · **Architecture** · [License](./LICENSE.md)

# Architecture

Condensed view. Authoritative detail: [`spec/architecture.md`](../spec/architecture.md).

```
Browser (React SPA, PL/EN)
  │  pages lazy-loaded · state: React Context + localStorage
  │  /api/*  (fetch)
  ▼
Cloudflare Worker  worker/index.js ── static assets (SPA fallback)
  ├─ auth: magic link, sessions, registration approval
  ├─ reports: shared problem reports + status timeline
  ├─ metrics: computed from D1 (first response time, reuse rate)
  └─ adapt-plan: retrieval from loaded cases → OpenRouter LLM → quote validation
  ▼
D1 (SQLite): users, reports, settings, profiles, adapt_log, per-account user data
```

## Layers
| Layer | Location | Role |
|---|---|---|
| Entry & routing | `src/main.jsx`, `src/App.jsx` | providers, lazy route table |
| Pages | `src/pages/` | one file per route (Polish slugs) |
| Components | `src/components/` | `ui` primitives, layout, map, case cards, `RequireAuth` guard |
| State | `src/context/` | `AppContext` (local data), `AuthContext` (backend + session) |
| Domain logic | `src/utils/` | `transferScore.js`, `matching.js`, `privacy.js`, `geo.js` |
| Data | `src/data/` | demo datasets, GUS BDL snapshot (fetched at build time only) |
| API client | `src/api.js` | thin `/api/*` client |
| Backend | `worker/`, `migrations/` | API Worker and D1 schema |

## Key design decisions
- **Works without a backend**: the app degrades to local mode and says so.
- **Honest scoring**: transfer score = weighted mean of factors that have data; missing factors are shown, not guessed.
- **LLM is guarded**: output rejected unless each item contains a verbatim quote from the loaded cases; digits in generated text are banned.
- **Privacy**: only a city is collected; sensitive categories are rendered as coarse 3 km circles.
- **No secrets in the client**; only external calls are map tiles and avatars.

## Conventions
All UI text via i18n keys (pl + en); `components/ui` primitives; lazy pages; any change to routes/state/data/deps/build updates `spec/architecture.md`.
