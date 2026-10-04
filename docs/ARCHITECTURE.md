[← README](../README.md) · [Project](../README.md#about) · [Tech spec](./TECH_SPEC.md) · **Architecture** · [License](./LICENSE.md)

# BridgeWay: architecture

> © 2026 Dominik Liahovich. All rights reserved. This page summarises the architecture. The authoritative source is [`spec/architecture.md`](../spec/architecture.md).

## Contents
1. [Architectural drivers](#1-architectural-drivers)
2. [System context](#2-system-context)
3. [Containers and deployment](#3-containers-and-deployment)
4. [Frontend architecture](#4-frontend-architecture)
5. [Backend architecture](#5-backend-architecture)
6. [Data storage](#6-data-storage)
7. [Key flows](#7-key-flows)
8. [Cross-cutting concerns](#8-cross-cutting-concerns)
9. [Architecture decisions](#9-architecture-decisions)
10. [Directory layout](#10-directory-layout)
11. [Evolution path](#11-evolution-path)

---

## 1. Architectural drivers

| Driver | Consequence |
|---|---|
| Built for a hackathon, small team | One repo, one deployable, no servers to manage |
| Must work without a backend | Local-first SPA. The backend is an optional enhancement |
| Trust is the product | Deterministic scoring, a sourced data base, a guarded LLM |
| Vulnerable users | Privacy and accessibility are built in, not added later |
| Near-zero running cost | Cloudflare free tier: edge assets, Worker, D1 |

## 2. System context

```mermaid
flowchart LR
  R[Resident / proxy helper]
  S[Responder<br/>municipality, NGO]
  BW((BridgeWay))
  OSM[OpenStreetMap tiles]
  DB2[DiceBear avatars]
  RS[Resend email]
  OR[OpenRouter LLM]
  GUS[GUS BDL statistics]

  R -- reports, browses cases --> BW
  S -- statuses, approvals, settings --> BW
  BW -- map tiles --> OSM
  BW -- avatars --> DB2
  BW -- magic links --> RS
  BW -- adaptation plan prompt --> OR
  GUS -. build-time snapshot .-> BW
```

## 3. Containers and deployment

```mermaid
flowchart TB
  subgraph Browser
    SPA[React SPA<br/>Vite build, PL/EN]
    LS[(localStorage<br/>guest data, language)]
    SPA <--> LS
  end

  subgraph Cloudflare edge
    W[Worker<br/>worker/index.js]
    A[Static assets<br/>dist/, SPA fallback]
    D[(D1 SQLite)]
    W -- ASSETS binding --> A
    W -- DB binding --> D
  end

  SPA -- "GET /*" --> W
  SPA -- "fetch /api/*" --> W
  W -- HTTPS --> RS[Resend]
  W -- HTTPS --> OR[OpenRouter]
```

- A single Cloudflare Worker deployment (`wrangler.jsonc`) serves everything. `run_worker_first: ["/api/*"]` sends API calls to the Worker code, and all other paths go to static assets with a fallback to `index.html`.
- **Alternative hosting:** any static host (a Netlify config is included) runs the SPA in local mode without the API.
- **Local development:** Vite on `:5173` proxies `/api` to `wrangler dev` on `:8787`, which uses a local D1 database.

## 4. Frontend architecture

```mermaid
flowchart TB
  main[main.jsx<br/>Router + providers + i18n] --> App[App.jsx<br/>lazy route table]
  App --> Layout[Layout<br/>Header · Outlet · Footer]
  Layout --> Pages[pages/*<br/>one file per route]
  Pages --> UI[components/ui<br/>design-system primitives]
  Pages --> Feat[components/cases · map · RequireAuth]
  Pages --> Ctx[AppContext · AuthContext]
  Pages --> Utils[utils/<br/>transferScore · matching · privacy · geo]
  Ctx --> Data[data/<br/>cases, demo sets, BDL snapshot]
  Ctx --> Api[api.js<br/>/api client]
```

| Layer | Location | Responsibility |
|---|---|---|
| Bootstrap | `src/main.jsx` | `BrowserRouter`, `AuthProvider`, `AppProvider`, i18n |
| Routing | `src/App.jsx` | lazy `<Route>`s with a `Suspense` fallback |
| Layout | `components/layout` | header/nav, footer, focus management, tab titles |
| Pages | `src/pages` | screen composition only |
| UI kit | `components/ui` | Button, Card, Badge, Chip, Input, Select, Modal, Toast, EmptyState, Skeleton, EvidenceBadge |
| Feature components | `components/cases`, `components/map` | `ScoreBreakdown`, `AdaptPlan`, `MapView` |
| Guards | `components/RequireAuth.jsx` | redirects to `/logowanie` when a backend exists and the user isn't logged in |
| State | `context/AppContext.jsx` | user, signals, ideas, projects, saved, filters, toasts and their actions |
| Session | `context/AuthContext.jsx` | backend availability, account, login/logout |
| Domain logic | `src/utils` | pure functions: scoring, matching, privacy, geo, formatting |
| Data | `src/data` | curated cases, demo datasets, GUS snapshot |

**State strategy:**
- **Guest:** each state slice persists in `localStorage` (`bridgeart-*` keys).
- **Logged in:** private slices are held in memory, loaded from D1 at login, and saved back with a 500 ms debounce. When the account changes, they are reset so that data never leaks between accounts.
- **Shared reports** always come from the API.
- **Static entities** (cases, experts, NGOs, funding) are read directly from bundled data.

## 5. Backend architecture

A single Worker module with a small hand-written router (no framework):

```mermaid
flowchart LR
  Req[Request] --> Router{pathname}
  Router -- not /api --> Assets[ASSETS.fetch]
  Router --> Health["health"]
  Router --> Auth["auth · me · profile"]
  Router --> UD["user-data"]
  Router --> Rep["reports"]
  Router --> Met["metrics"]
  Router --> Adapt["adapt-plan"]
  Router --> Adm["admin"]
  Auth --> Mail[Resend / EMAIL binding]
  Adapt --> AP[adaptPlan.js<br/>retrieve → prompt → validate]
  AP --> OR[OpenRouter]
  Auth & UD & Rep & Met & Adapt & Adm --> D1[(D1)]
```

- **Auth middleware:** reads the `bw_session` cookie, looks up the session hash, and resolves the role (`responder` if the email is in `RESPONDER_EMAILS`, otherwise `resident`).
- **Authorisation** is checked per route: public, session, or responder.
- **Validation:** request sizes and enums are checked at the edge (e.g. user-data slices ≤ 256 KB, allowed slice names, status values).
- **Stateless:** all state lives in D1, so the Worker can scale horizontally at the edge.

## 6. Data storage

| Data | Where | Shared? |
|---|---|---|
| Curated cases, demo directories | JS bundle (`src/data`) | read-only, everyone |
| GUS context snapshot | JSON in the bundle | read-only |
| Guest data | browser `localStorage` | no, one browser only |
| Account data (signals, ideas, projects, saved) | D1 `user_data` | no, private per account |
| Shared reports and timelines | D1 `reports`, `report_status` | public read |
| Auth, registrations, profiles | D1 | private |
| Settings (test mode, LLM model) | D1 `settings` | responders |

```mermaid
erDiagram
  registrations { text email PK  text status  int created_at  int decided_at }
  login_tokens { text hash PK  text email  int expires_at  int used  int created_at }
  sessions { text hash PK  text email  int expires_at }
  profiles { text email PK  text name  text role_label  text city  text bio  int updated_at }
  user_data { text email PK  text slice PK  text json  int updated_at }
  reports { text id PK  text owner_email  text title  text description  text category  text city  int on_behalf  text responsible_body  int created_at }
  report_status { int id PK  text report_id FK  text status  text note  text actor_role  int created_at }
  adapt_log { int id PK  text email  int created_at }
  settings { text key PK  text value }

  reports ||--o{ report_status : "has timeline"
```

Emails act as the natural user key. Migrations live in `migrations/0001–0006` and are applied with `wrangler d1 migrations apply`.

## 7. Key flows

### 7.1 Magic-link login with approval
```mermaid
sequenceDiagram
  actor U as User
  participant SPA
  participant W as Worker
  participant D as D1
  participant M as Resend
  U->>SPA: enter email
  SPA->>W: POST /api/auth/request
  alt responder, approved, or test mode
    W->>D: store token hash (15 min, single use)
    W->>M: send link /logowanie?token=…
    M-->>U: email
    U->>SPA: open link
    SPA->>W: POST /api/auth/verify {token}
    W->>D: mark token used, create session hash (30 d)
    W-->>SPA: Set-Cookie bw_session (HttpOnly)
  else unknown email
    W->>D: registrations: pending
    W-->>SPA: {pending: true}
    Note over W,D: a responder approves on /admin
  end
```

### 7.2 Finding and transferring a case
```mermaid
sequenceDiagram
  actor U as Resident
  participant SPA
  participant TS as transferScore.js
  U->>SPA: choose category + city
  SPA->>TS: scoreCase(case, {category, city})
  TS-->>SPA: score, preliminary flag, factors (incl. "no data")
  U->>SPA: "Copy to my town"
  SPA->>SPA: create project (steps → tasks, sourceSolutionId)
  SPA-->>U: project room: tasks, responsible body, status timeline
```
This flow runs entirely in the browser, with no network calls.

### 7.3 Guarded adaptation plan
```mermaid
sequenceDiagram
  participant SPA
  participant W as Worker
  participant D as D1
  participant L as OpenRouter
  SPA->>W: POST /api/adapt-plan {caseId, city, lang}
  W->>D: rate limit check (10/h per account)
  W->>W: load the case (only corpus)
  W->>L: prompt with case passages
  L-->>W: {items:[{action, evidence:[{field, quote}]}]}
  W->>W: drop items with digits or non-verbatim quotes
  alt every item valid
    W-->>SPA: items + source link + gaps
  else otherwise
    W-->>SPA: error, nothing shown
  end
```

### 7.4 Report lifecycle
`received → assigned → in progress → resolved | rejected (note required)`. Each change is a new `report_status` row that records the actor role, so the timeline is append-only and auditable. `GET /api/metrics` derives the time to first response from the first non-`received` row.

## 8. Cross-cutting concerns

| Concern | Approach |
|---|---|
| Security | hashed tokens, HttpOnly cookie, same-origin JSON for writes, secrets only in Worker env, minimal external calls |
| Privacy | city-level data only, coordinate coarsening for sensitive reports, per-account isolation, aggregate metrics |
| Accessibility | WCAG AA conventions in UI primitives, focus and title management in `Layout`, reduced motion |
| i18n | all strings via i18next keys (pl/en); bilingual `{pl,en}` content in data |
| Honesty | demo labels (`common.demo`), `null` → "not stated", preliminary scores, LLM quote validation |
| Observability | Cloudflare Worker logs; adaptation-plan calls logged for rate limiting only |
| Cost | free-tier edge hosting; LLM model and price chosen by a responder |

## 9. Architecture decisions

| # | Decision | Why | Trade-off |
|---|---|---|---|
| AD-1 | Local-first SPA with an optional backend | the demo must never fail; works on any static host | two data paths (local and D1) |
| AD-2 | One Cloudflare Worker for both assets and API | one deployable, same origin, no CORS | vendor coupling to Cloudflare |
| AD-3 | D1 (SQLite) instead of a managed SQL server | zero operations, free tier, SQL migrations | single-region writes, size limits |
| AD-4 | Passwordless magic links | no password storage, verified email ownership | depends on email delivery |
| AD-5 | Deterministic, visible scoring instead of ML ranking | explainable and auditable; no invented precision | less "smart" ranking |
| AD-6 | LLM confined to one case, with verbatim-quote validation | prevents hallucinated facts and sources | some valid plans are rejected |
| AD-7 | GUS data fetched at build time | no runtime dependency or quota at request time | snapshot needs manual refresh |
| AD-8 | Curated case base in code | every case is reviewed, sourced and graded | adding cases needs a deploy |
| AD-9 | Lazy-loaded pages, map in its own chunk | fast first load on weak devices | more network requests |

## 10. Directory layout

```
bridgeway-app/
├─ src/
│  ├─ main.jsx, App.jsx, i18n.js, index.css, api.js
│  ├─ context/        AppContext.jsx, AuthContext.jsx
│  ├─ components/     layout/, ui/, map/, cases/, RequireAuth.jsx
│  ├─ pages/          one file per route
│  ├─ utils/          transferScore, matching, privacy, geo, formatters
│  ├─ hooks/          useLocalStorage, useDebounce
│  └─ data/           index.js (cases + demo data), bdlContext.json
├─ worker/            index.js (API router), adaptPlan.js
├─ migrations/        0001–0006 D1 schema
├─ scripts/           fetch-bdl-context.mjs
├─ spec/              product and technical specs, roadmap
├─ docs/              README tabs (tech spec, architecture, license)
├─ public/            static files
├─ wrangler.jsonc     Cloudflare config
└─ netlify.toml       alternative static hosting
```

## 11. Evolution path

1. **Share more:** move ideas, projects and map signals to D1 with moderation.
2. **Responsible-body registry:** replace the env list with verified institutions and routing rules.
3. **Live data:** real funding calls; more GUS indicators (density, income) for the context factor.
4. **Case base as data:** a case-editor workflow with review and evidence grading, stored in D1 instead of code.
5. **Quality:** automated tests (scoring, validation, API), a full accessibility audit, focus trap in modals.
6. **Municipal dashboard:** response-time and reuse reporting per gmina (the sustainability model).

---

[← Tech spec](./TECH_SPEC.md) · [License →](./LICENSE.md)
