# Deployment Spec — GitHub + Cloudflare Pages (as-is, no backend)

Scope of this document: move the current static BridgeWay app to GitHub, then host it on Cloudflare Pages exactly as it works today (client-side mock data, `localStorage` state). Adding a real backend (Cloudflare Workers + D1) is a separate, later effort — not covered here.

## 1. Repo name

**`bridgeway`** — matches the app's actual product name (page title, header, branding), not the stale `bridgeart` name that was in `package.json` (now fixed to match).

## 2. What's in the repo vs. what's ignored

Tracked:
```
.gitignore
README.md
DEPLOYMENT.md
index.html
netlify.toml          (harmless to keep; ignored by Cloudflare, only read by Netlify)
package.json / package-lock.json
postcss.config.js
tailwind.config.js
vite.config.js
public/               (favicon.svg, _redirects)
src/                  (all app code)
```

Ignored (`.gitignore`):
```
node_modules
dist
.netlify
.DS_Store
*.log
```

`node_modules` is never committed — this is already handled. Anyone who clones the repo runs `npm install` to regenerate it.

## 3. Local prep — already done

The following was done in a clean working copy at a path with no spaces/Cyrillic characters (`~/Projects/bridgeway`), copied from the original ZIP extract, excluding `node_modules`, `dist`, `.netlify`, `.DS_Store`, and the stray `__MACOSX` folder:

- [x] Cleaned directory (no macOS junk, no nested duplicate folder)
- [x] `.gitignore` extended (`node_modules`, `dist`, `.netlify`, `.DS_Store`, `*.log`)
- [x] `public/_redirects` added — `/* /index.html 200` (SPA fallback for Cloudflare Pages, equivalent to the existing Netlify `[[redirects]]` rule, needed because the app uses React Router's `BrowserRouter` with real paths like `/mapa`, `/pomysly/i1`)
- [x] `package.json` `name` field corrected to `bridgeway`
- [x] `git init` + initial commit (see below)

## 4. Push to GitHub

This environment has SSH access configured for GitHub (user `codriter`) but no `gh` CLI and no API token, so the empty repo has to be created once through the GitHub web UI — everything else is already done or scripted.

**Your one manual step:**
1. Go to <https://github.com/new>
2. Repository name: `bridgeway`
3. Visibility: **Public**
4. **Do not** check "Add a README", "Add .gitignore", or "Choose a license" — the repo must be created empty, otherwise the initial push will conflict with files already created on GitHub's side.
5. Click **Create repository**.

Then push (done from `~/Projects/bridgeway`):
```bash
git remote add origin git@github.com:codriter/bridgeway.git
git branch -M main
git push -u origin main
```

**To get a working copy elsewhere** (what you asked for — "clone it to another folder"):
```bash
git clone git@github.com:codriter/bridgeway.git /path/to/another/folder
cd /path/to/another/folder
npm install
npm run dev
```

## 5. Cloudflare Pages setup

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**
2. Authorize Cloudflare's GitHub app, select the `bridgeway` repo
3. Build settings:
   | Setting | Value |
   |---|---|
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` |
   | Environment variables | none needed |
4. Click **Save and Deploy**

Cloudflare builds and serves the app at `https://bridgeway.pages.dev` (free `*.pages.dev` subdomain, included automatically). Every subsequent push to `main` triggers a new deployment; every pull request gets its own free preview URL.

## 6. Post-deploy verification checklist

- [ ] Homepage loads at `https://bridgeway.pages.dev`
- [ ] Client-side navigation works (click through to `/mapa`, `/pomysly`, etc.)
- [ ] **Direct URL / page refresh on a sub-route works** (e.g. open `https://bridgeway.pages.dev/mapa` directly, or hit refresh while on it) — this is the specific case `public/_redirects` exists to fix; if it 404s, the `_redirects` file didn't make it into the `dist` build output
- [ ] Map (Leaflet) renders correctly
- [ ] Language switch (PL/EN via i18next) works
- [ ] Submitting a problem/idea via `/zglos` still works (writes to `localStorage`, so this is per-browser only — expected with no backend)

## 7. Free-tier fit

Everything here runs on Cloudflare's free plan: unlimited static requests/bandwidth for Pages, free `*.pages.dev` subdomain and SSL, 500 builds/month. No credit card or custom domain required. (A custom domain can be attached later for free — you'd only pay a registrar for the domain name itself, not Cloudflare.)

## 8. Out of scope (future work)

A real backend (Cloudflare Pages Functions + D1, replacing the mocked `src/data/index.js` and `localStorage` writes with a shared, persistent database) was discussed separately and deliberately left out of this migration. Revisit when ready — it's a small, well-bounded addition on top of this setup, not a rewrite.

## Backend (Step 16): Worker + D1 + magic-link login
- Local: create `.dev.vars` (gitignored) with `DEV_MAGIC_LINK=true` and `RESPONDER_EMAILS=urzad@example.com`; `npm run build`, `npm run db:migrate:local`, `npm run dev:api` (serves site + API on :8787), or `npm run dev` + `npm run dev:api` (Vite proxies `/api`). With `DEV_MAGIC_LINK` the sign-in link is shown on the page instead of emailed.
- Production: `npx wrangler d1 create bridgeway` (or let wrangler auto-provision), `npx wrangler d1 migrations apply bridgeway --remote`, then `wrangler secret put RESPONDER_EMAILS` (comma list) and set `MAIL_FROM` plus an `EMAIL` send binding (Cloudflare Email Service; sender domain must be onboarded). Never set `DEV_MAGIC_LINK` in production. `npx wrangler deploy` after `npm run build`.
- Without the Worker (e.g. Netlify) the app runs as before; shared reports and login show a "no server / data is local" notice.
- Email via Resend (no own domain): `wrangler secret put RESEND_API_KEY`. Without `MAIL_FROM` the sender is `onboarding@resend.dev`, which Resend delivers **only to the Resend account owner's email** — enough for a responder login; residents need a verified domain (`MAIL_FROM` on it). Sending order: dev link → Resend → Cloudflare `EMAIL` binding.
- Registration with approval: new emails are stored as pending; a responder approves them on `/logowanie`. With Resend's shared test sender only the Resend account owner's inbox receives links, so approved residents can't log in until `MAIL_FROM` is on a verified domain (Resend or Cloudflare Email Service).
- Production sender: `MAIL_FROM = BridgeWay <login@mail.processtotool.com>` (wrangler.jsonc vars; subdomain verified in Resend), so approved addresses can receive links. Real-inbox delivery confirmed by the owner (2026-10-04).
- Test mode: responder can enable "send links to new addresses without approval" on `/admin` (stored in D1, default off, 50 links/h cap). Links are still emailed, so address ownership is verified. Disable after demos.

### Adaptation plan (Step 17)
Uses OpenRouter: secret `OPENROUTER_API_KEY` (`wrangler secret put OPENROUTER_API_KEY`); the model is chosen on `/admin` (D1 `settings.llmModel`). Apply the new migration (`wrangler d1 migrations apply bridgeway --remote`) before deploying; locally `npm run db:migrate:local`. Locally put `OPENROUTER_API_KEY` in `.dev.vars`; without it the endpoint returns `llm_unavailable`.
