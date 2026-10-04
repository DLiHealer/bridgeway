[← README](../README.md) · [Project](../README.md#about) · **Tech spec** · [Architecture](./ARCHITECTURE.md) · [License](./LICENSE.md)

# Technical specification

Condensed view. Authoritative detail: [`spec/architecture.md`](../spec/architecture.md).

## Stack
| Concern | Choice |
|---|---|
| Build | Vite 5 → `dist/` |
| UI | React 18, Tailwind CSS 3, framer-motion, lucide-react |
| Routing | react-router-dom v6 (`BrowserRouter`), lazy pages |
| Forms | react-hook-form |
| Map | Leaflet + react-leaflet |
| i18n | i18next, Polish (default) and English |
| Backend | Cloudflare Worker (`worker/`) + D1 database, `/api/*` only |
| Auth | Email magic links (Resend / Cloudflare Email) |
| LLM | OpenRouter, model picked by responders in `/admin`; used only for the adaptation plan |
| Hosting | Cloudflare Workers Static Assets (see [`DEPLOYMENT.md`](../DEPLOYMENT.md)) |

## Functional scope
- Search verified, sourced cases of solved social problems (evidence levels A–D).
- Transparent **transfer score** (weights shown; factors without data are marked "no data", score is preliminary).
- Keyword matching of experts, NGOs and funding; ideas and projects; map of signals.
- Shared problem reports with a status timeline and a responder workflow.
- LLM adaptation plan — shown only if every item passes a verbatim-quote check against the loaded cases.
- Computed analytics from real data (`/api/metrics`).
- Accessibility (WCAG AA target), privacy-by-design (sensitive reports are never pinned to exact coordinates).

## Data honesty rules
Seeded datasets are labelled demo data; no invented KPIs, ratings, "verified" claims or contacts; LLM output with generated facts, numbers or sources is never displayed.

## Run, build, deploy
```bash
npm install
npm run dev            # frontend (Vite)
npm run dev:api        # API Worker on :8787 (Vite proxies /api)
npm run db:migrate:local
npm run build          # outputs dist/
```
Backend config (`RESPONDER_EMAILS`, `RESEND_API_KEY`, `MAIL_FROM`, `OPENROUTER_API_KEY`, …) is documented in [`DEPLOYMENT.md`](../DEPLOYMENT.md). Secrets never reach the client.

## Related specs
[Roadmap](../spec/roadmap.md) · [Accessibility](../spec/accessibility.md) · [Validation plan](../spec/validation.md) · [Pitch](../spec/pitch.md) · [Sourcing spike](../spec/sourcing-spike.md)
