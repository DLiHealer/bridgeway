[← README](../README.md) · [Project](../README.md#about) · **Tech spec** · [Architecture](./ARCHITECTURE.md) · [License](./LICENSE.md)

# BridgeWay: technical specification

> © 2026 Dominik Liahovich. All rights reserved. This page summarises the system. The authoritative, always-current source is [`spec/architecture.md`](../spec/architecture.md).

## Contents
1. [Scope and goals](#1-scope-and-goals)
2. [Technology stack](#2-technology-stack)
3. [Functional modules](#3-functional-modules)
4. [Routes](#4-routes)
5. [Roles and permissions](#5-roles-and-permissions)
6. [Data model](#6-data-model)
7. [Transfer score](#7-transfer-score)
8. [Keyword matching](#8-keyword-matching)
9. [LLM adaptation plan and guardrails](#9-llm-adaptation-plan-and-guardrails)
10. [HTTP API](#10-http-api)
11. [Non-functional requirements](#11-non-functional-requirements)
12. [Run, build, deploy](#12-run-build-deploy)
13. [Configuration](#13-configuration)
14. [Known limitations](#14-known-limitations)

---

## 1. Scope and goals

| Goal | How it is met |
|---|---|
| Find proven solutions to local social problems | Curated base of real, sourced cases with evidence levels A–D |
| Judge fit honestly | Transparent weighted transfer score; "no data" instead of guessing |
| Move from a problem to a result | Reports and projects with a responsible body and a status timeline |
| Include excluded people | Proxy reporting with consent, WCAG AA target, PL/EN |
| Protect privacy | City-level location only, coarsened map display for sensitive reports |
| Never mislead | Demo data labelled; LLM output only with verbatim, source-checked quotes |

**Out of scope for the MVP:** live funding-call feeds, a registry of real responsible bodies, content moderation, chat or file upload in project rooms, native mobile apps.

## 2. Technology stack

| Concern | Choice | Notes |
|---|---|---|
| Build | Vite 5 | `npm run dev / build / preview`, output `dist/` |
| UI | React 18, Tailwind CSS 3 | custom `brand` palette in `tailwind.config.js` |
| Motion and icons | framer-motion, lucide-react | animations respect `prefers-reduced-motion` |
| Routing | react-router-dom v6 (`BrowserRouter`) | every page is lazy-loaded |
| Forms | react-hook-form | |
| Map | Leaflet + react-leaflet | OpenStreetMap tiles |
| i18n | i18next + react-i18next | `pl` (default) and `en`; resources in `src/i18n.js` |
| Backend | Cloudflare Worker (`worker/index.js`) | handles `/api/*` only; static assets via the `ASSETS` binding |
| Database | Cloudflare D1 (SQLite) | schema in `migrations/0001–0006` |
| Email | Resend HTTP API (production), Cloudflare `EMAIL` binding (fallback) | magic-link delivery |
| LLM | OpenRouter | model chosen on `/admin`, default `openai/gpt-4o-mini` |
| Statistics | GUS BDL (Local Data Bank) | fetched **at build time** by `scripts/fetch-bdl-context.mjs` |
| Hosting | Cloudflare Workers Static Assets | SPA fallback; `netlify.toml` kept as an alternative |
| Tests | none yet | verification by `npm run build` and manual checks |

## 3. Functional modules

### 3.1 Solutions (case base)
- Real interventions from Poland, the EU and the UK, taken from [`spec/sourcing-spike.md`](../spec/sourcing-spike.md). Every case has a source link and a graded evidence level.
- **Evidence levels:** **A** systematic review / meta-analysis of RCTs · **B** peer-reviewed controlled or quasi-experimental study · **C** official/independent evaluation, or outcomes without a control group · **D** outputs only (money spent, people trained), no outcome measured.
- Fields the source doesn't state are `null` and are shown as "not stated" / "not measured". Values are never estimated.
- `kind: 'route'` entries describe a recommended process (e.g. accessibility audit → responsible body → technically approved solution) instead of a single intervention.
- "Copy to my town" creates a project whose tasks come from the case's `steps`, or from generic default steps.

### 3.2 Reporting (signals and ideas)
- Report a problem or propose an idea: title, description, category, city.
- **Proxy reporting:** an "on behalf of another person" flag with a recorded consent timestamp.
- A warning about third-party personal data is shown before submission.
- Matching cases appear directly under the form.

### 3.3 Shared reports (backend)
- Public list and detail pages with a status timeline: `received → assigned → in progress → resolved | rejected`. A rejection must include a note.
- Responders set the responsible body and advance the status.

### 3.4 Projects
- A project room with tasks, a responsible body (an empty one is flagged), a status history and a link to its source case (`sourceSolutionId`).

### 3.5 Experts, NGOs, funding
- Demo directories, labelled as such. Entries are matched to a problem by keyword scoring ([§8](#8-keyword-matching)). Ratings, emails and invented counts are deliberately left out.

### 3.6 Map
- Leaflet map of signals and projects. Sensitive signals are drawn as a 3 km circle at coordinates snapped to a 0.1° grid ([§11](#11-non-functional-requirements)).

### 3.7 Analytics
- Computed on request from D1 (`GET /api/metrics`): report counts by status, share of reports with a response, median time to first response, and solution **reuse rate** (projects created from cases). Aggregates only, no personal data.

### 3.8 Accounts and administration
- Passwordless login with magic links; registration approval; profile editing.
- Per-account private data (signals, ideas, projects, saved items) synced to D1.
- `/admin` (responders only): registration mode (approval required / test mode), LLM model picker with prices, approve/reject pending registrations.

## 4. Routes

Polish slugs; all pages are lazy-loaded in `src/App.jsx`.

| Path | Page | Notes |
|---|---|---|
| `/` | Home | slogan, CTAs to cases and reporting, how-it-works, map teaser |
| `/rozwiazania`, `/rozwiazania/:id` | Solutions, case detail | transfer score breakdown, adaptation plan, "copy to my town" |
| `/zglos` | Submit | report a problem / propose an idea |
| `/zgloszenia`, `/zgloszenia/:id` | Shared reports | requires backend; responder controls |
| `/mapa` | Map | |
| `/projekty`, `/projekty/:id` | Projects, project room | |
| `/pomysly`, `/pomysly/:id` | Ideas | |
| `/eksperci`, `/eksperci/:id` | Experts | demo data |
| `/finansowanie` | Funding | demo data |
| `/analityka` | Analytics | requires backend |
| `/logowanie` | Login | email → magic link; consumes `?token=` |
| `/profil` | Profile | login required when a backend exists |
| `/admin` | Admin | login + responder role |
| `/o-nas`, `/dostepnosc`, `/prywatnosc`, `/regulamin` | About, accessibility statement, privacy, terms | |
| `*` | Not found | |

## 5. Roles and permissions

| Role | Source | Can |
|---|---|---|
| Guest | no login or no backend | use all local features; data stays in this browser |
| Resident | approved email | create shared reports; private per-account data; adaptation plan |
| Responder | listed in `RESPONDER_EMAILS` | everything a resident can, plus update report status and responsible body, approve registrations, change settings and LLM model |

Registration: links are emailed only to responders and approved addresses. Other addresses become `pending` (at most 200) until a responder decides. In **test mode** new addresses are auto-approved but still have to click an emailed link (50 links/hour cap).

## 6. Data model

### 6.1 Client-side entities (`src/data/index.js`)
| Entity | Key fields |
|---|---|
| `categories` | `id` (mieszkanie, seniorzy, dostepnosc, cyfrowe, ekologia, integracja, inne), `name`, `nameEn`, `color` |
| `cities` | `id`, `name`, `coords` (8 demo cities) |
| `solutions` | `id`, `kind` (case/route), `category`, `city`, `country`, `year`, `title`, `organisation`, `problem`, `solution`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel`, `context`, `source {label,url}`, `steps`. Text fields are `{pl,en}` |
| `signals` | problem reports; optional `onBehalf`, `consentAt`; coarse coordinates when sensitive |
| `ideas`, `projects` | projects carry `sourceSolutionId`, `responsibleBody`, `statusHistory[] {status,date,note}`, tasks |
| `experts`, `ngos`, `fundings` | demo directory entries |

IDs of user-created items carry a prefix (`s`/`i`/`p`) and a timestamp.

### 6.2 Server-side tables (D1)
| Table | Purpose |
|---|---|
| `login_tokens` | hashed one-time login tokens (15 min, single use) |
| `sessions` | hashed session tokens (30 days) |
| `registrations` | `email`, `status` (pending/approved/rejected), timestamps |
| `profiles` | `email`, `name`, `role_label`, `city`, `bio` |
| `reports` | shared reports: owner, title, description, category, city, `on_behalf`, `responsible_body` |
| `report_status` | status timeline rows with note and actor role |
| `user_data` | per-account JSON slices (`signals`, `ideas`, `projects`, `saved`), ≤ 256 KB each |
| `adapt_log` | adaptation-plan calls, for rate limiting |
| `settings` | key/value: `testMode`, `llmModel` |

The full diagram is in [Architecture → Data storage](./ARCHITECTURE.md#6-data-storage).

## 7. Transfer score

Implemented in `src/utils/transferScore.js` as `scoreCase(case, {category, city, available})` → `{excluded, score|null, preliminary, factors[]}`.

| Factor | Weight | Value | Data today |
|---|---|---|---|
| Problem type | 30 | 1 if the case category equals the chosen category | ✅ when a category is chosen |
| Local context | 25 | `1 − min(1, |share65_user − share65_case| / 0.10)` | ✅ when both cities are in the GUS BDL snapshot |
| Budget | 15 | — | ❌ always "no data" (costs are free text) |
| Partners | 15 | — | ❌ always "no data" (no real registry) |
| Evidence | 15 | A 1.0 · B 0.75 · C 0.5 · D 0.25 | ✅ |

- **Score** = weighted mean of the factors **that have data**, scaled to 0–100.
- If any factor lacks data, the score is marked **preliminary**, and the UI lists each missing factor as "no data".
- **Hard constraints first:** a case whose `requires[]` is not met is excluded (a hook for future use).
- The weights and the 10-percentage-point cut-off are stated hypotheses and are shown in the UI.
- Context data: GUS BDL, gmina level, year 2024, population aged 65+ divided by total population (retrieved 2026-10-03). Refresh with `node scripts/fetch-bdl-context.mjs`.

## 8. Keyword matching

`src/utils/matching.js` ranks experts, NGOs, funding and ideas against a problem:

| Signal | Points |
|---|---|
| Category match | 100 (40 if neutral, 0 if mismatched) |
| Keyword hit (word ≥ 3 chars, diacritics normalised) | 25 each |
| Same city | 30 |

These are labelled in the UI as "Suggestions (model, no AI)".

## 9. LLM adaptation plan and guardrails

`POST /api/adapt-plan {caseId, city, lang}` (implemented in `worker/adaptPlan.js`):

1. **Retrieval:** the only corpus is the chosen case. There is no web access and no other knowledge.
2. **Generation:** the model returns `{items: [{action, evidence: [{field, quote}]}]}`.
3. **Validation:** an item is kept only if
   - `action` contains **no digits** (so no invented numbers), and
   - each `quote` is a **verbatim substring** of the cited case field. The quote is then replaced by the original source text.
4. **Display:** the plan is shown only if every item passes. The source link is the case's own `source`. `gaps` lists case fields that are `null`.
5. **Limits:** login required, same-origin JSON only, 10 calls per hour per account. Results are not stored.

Error contract: `404` unknown case · `429 rate_limited` · `502 llm_failed` · `503 llm_unavailable` (no API key).

## 10. HTTP API

All endpoints are served by the Worker under `/api/`. Request and response bodies are JSON. Sessions use the HttpOnly `bw_session` cookie.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | — | backend availability probe |
| GET | `/api/me` | session | current account `{email, role}` |
| POST | `/api/auth/request` | — | request a magic link (or create a pending registration) |
| POST | `/api/auth/verify` | — | exchange a token for a session cookie |
| POST | `/api/auth/logout` | session | end the session |
| GET, PUT | `/api/profile` | session | read / update the profile |
| GET | `/api/user-data` | session | all private data slices |
| PUT | `/api/user-data/:slice` | session | save one slice (`signals`, `ideas`, `projects`, `saved`) |
| GET | `/api/reports` | — | list shared reports |
| POST | `/api/reports` | session | create a shared report |
| GET | `/api/reports/:id` | — | report detail with timeline |
| POST | `/api/reports/:id/status` | responder | add a status (+ note, responsible body) |
| POST | `/api/adapt-plan` | session | guarded LLM adaptation plan |
| GET | `/api/metrics` | — | aggregate analytics |
| GET | `/api/admin/registrations` | responder | pending registrations |
| POST | `/api/admin/registrations/decide` | responder | approve / reject |
| GET, POST | `/api/admin/settings` | responder | test mode |
| GET, POST | `/api/admin/llm` | responder | current LLM model (validated against the catalogue) |
| GET | `/api/admin/llm/models` | responder | OpenRouter model catalogue with prices (10 min cache) |

## 11. Non-functional requirements

### Security
- Passwordless login. Tokens and sessions are stored only as **hashes**. Login tokens are single-use and expire after 15 minutes.
- The session cookie is `HttpOnly; Secure; SameSite=Lax`. State-changing requests require a same-origin `Origin` and a JSON content type (CSRF protection).
- Only responders can change a report's status. A rejection without a reason is refused (`400 reason_required`).
- **No secrets in the client.** API keys live only in Worker secrets.
- Security headers are defined in `netlify.toml` / `wrangler.jsonc`.
- The only external runtime calls are OpenStreetMap tiles and DiceBear avatars. GUS BDL is fetched at build time only.

### Privacy (RODO/GDPR-minded)
- Only a city is stored, never an address.
- Sensitive reports (categories `seniorzy` and `mieszkanie`, or any report made on behalf of someone else) are stored with coarse coordinates and drawn as a 3 km circle on a 0.1° grid (`src/utils/privacy.js`).
- Per-account data is private. When the user logs out or switches accounts, the previous account's state is cleared from memory.
- Metrics are aggregate only.

### Accessibility
- Target: WCAG 2.1 AA. Text contrast ≥ 4.5:1; icon-only buttons have translated `aria-label`s; decorative icons are `aria-hidden`; form controls are labelled.
- On route change, focus moves to `<main>` and the tab title is updated. Animations run under `MotionConfig reducedMotion="user"`.
- Checklist and pending manual checks: [`spec/accessibility.md`](../spec/accessibility.md).

### Internationalisation
- Every user-facing string goes through i18n keys in both `pl` and `en`. The language choice is saved in `localStorage`.

### Performance
- Pages are lazy-loaded, and the map is split into its own chunk.
- Static assets are served from Cloudflare's edge, and the Worker runs only for `/api/*`.

### Resilience
- With no backend (`/api/health` fails), the app works in local mode and tells the user that data stays in the browser.

## 12. Run, build, deploy

```bash
npm install
npm run dev                 # Vite dev server (proxies /api to :8787)
npm run dev:api             # Worker + D1 locally on :8787
npm run db:migrate:local    # apply D1 migrations locally
npm run build               # production build to dist/
npm run preview             # preview the build
node scripts/fetch-bdl-context.mjs   # refresh the GUS BDL snapshot
```

For local login, create `.dev.vars` (gitignored) with `DEV_MAGIC_LINK=true` and `RESPONDER_EMAILS=you@example.com`. The sign-in link then appears on the page instead of being emailed.

Production deploy (Cloudflare):
```bash
npx wrangler d1 migrations apply bridgeway --remote
npx wrangler secret put RESPONDER_EMAILS
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put OPENROUTER_API_KEY
npm run build && npx wrangler deploy
```
Full guide: [`DEPLOYMENT.md`](../DEPLOYMENT.md).

## 13. Configuration

| Name | Kind | Required | Purpose |
|---|---|---|---|
| `DB` | D1 binding | backend | database |
| `ASSETS` | assets binding | yes | static SPA files |
| `RESPONDER_EMAILS` | secret | backend | comma-separated responder emails |
| `RESEND_API_KEY` | secret | for email | Resend delivery |
| `MAIL_FROM` | var | for email | sender, e.g. `BridgeWay <login@…>` on a verified domain |
| `EMAIL` | send-email binding | optional | Cloudflare Email Service fallback |
| `OPENROUTER_API_KEY` | secret | for adaptation plan | LLM access |
| `PUBLIC_URL` | var | optional | base URL in emailed links |
| `DEV_MAGIC_LINK` | `.dev.vars` only | local | show the link instead of emailing it. **Never set this in production** |
| `BDL_CLIENT_ID` | env | optional | higher GUS BDL quota for the snapshot script |

## 14. Known limitations

- No automated tests yet.
- Only reports are shared. Ideas, projects and map signals stay per account / per browser.
- No content moderation, email change or account deletion flow yet. There is no rate limit on login links.
- Responders are an environment list, not a registry of real authorities.
- The GUS snapshot is static, covers the 8 demo cities, and uses one context indicator (share of residents aged 65+).
- The LLM `action` text is a paraphrase, guarded only by the digit ban and the quote requirement. Live model quality has not been checked yet.
- Accessibility: a manual screen-reader pass is pending, `Modal` lacks a full focus trap, and the map is only partly keyboard-accessible.
- The product is **not yet validated with users** ([`spec/validation.md`](../spec/validation.md)).

---

[← Back to README](../README.md) · [Architecture →](./ARCHITECTURE.md)
