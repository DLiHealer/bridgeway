# BridgeWay

A Polish-language civic engagement SPA — "a bridge between a problem and a solution." Residents report local problems, pitch ideas, find matching solutions/experts/funding, and track community projects on a map.

- **Stack**: Vite 5 + React 18 + React Router v6 (`BrowserRouter`) + Tailwind CSS 3 + Leaflet + i18next
- **Data**: fully static/mocked (`src/data/index.js`) — no backend, no API keys, no env vars required
- **State**: React Context + `localStorage` (per-browser only, not shared across devices)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the Cloudflare Pages setup.
