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
