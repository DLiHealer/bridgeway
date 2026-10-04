<div align="center">

# 🌉 BridgeWay

**"This problem has already been solved somewhere."**
A bridge between a local problem and a solution that already works.

[Project](#about) · [Tech spec](./docs/TECH_SPEC.md) · [Architecture](./docs/ARCHITECTURE.md) · [License](./docs/LICENSE.md)

</div>

> © 2026 Dominik Liahovich. All rights reserved. Proprietary software — see [License](#license).

---

## About

### The problem
Across Poland, municipalities, NGOs and residents face the same social problems: inaccessible public space, lonely seniors, digital exclusion, housing hardship. Each community usually starts from zero. Solutions that worked in one town sit scattered in reports, foundation websites and conference slides, so nobody else finds them. Residents who are most affected are often the least able to use complicated websites or to speak to the authorities.

### What BridgeWay does
BridgeWay helps a commune, an NGO or an ordinary resident **stop reinventing the wheel**:

- **Find** — browse verified cases already implemented in Poland and the EU, each with its source and an honest evidence level (A–D).
- **Check fit** — a transparent *transfer score* shows how applicable a case is to *your* town. Factors we have no data for say "no data" instead of pretending.
- **Adapt** — an AI-assisted plan turns a case into concrete steps for your context. It is shown only if every point is backed by a verbatim quote from the case, so the AI cannot invent facts, numbers or sources.
- **Report** — residents report local problems; reports are public, tracked on a timeline and answered by responders.
- **Connect** — experts, NGOs, funding programmes and community projects matched to the problem, plus a map of local signals.
- **Measure** — analytics computed from real activity (e.g. time to first response, reuse of solutions), not decorative charts.

### Who it is for
| Who | What they get |
|---|---|
| Residents | A simple way to report a problem and see what happens next |
| Local governments | Ready, proven solutions instead of a blank page; a channel to respond |
| NGOs & experts | Visibility, partners and funding pointers |
| Seniors and people with disabilities | Accessibility-first design (WCAG AA target), assisted reporting, bilingual PL/EN interface |

### Principles
- **Honesty over polish** — demo data is labelled; no invented KPIs, ratings, "verified" badges or contacts.
- **Privacy by design** — only a city is collected, never an address; sensitive reports (seniors, housing, on behalf of someone else) are never pinned to an exact point on the map.
- **Inclusion** — usable by people the web usually excludes.
- **AI as a tool, not the product** — guarded, auditable, never the source of truth.

### Status
Hackathon MVP: a working web app with an optional backend for shared reports and magic-link login. Seeded cases, experts and funding are demo data and marked as such. See the [roadmap](./spec/roadmap.md).

---

## Documentation

| Tab | What's inside |
|---|---|
| [**Tech spec**](./docs/TECH_SPEC.md) | Stack, functional scope, how to run, build and deploy |
| [**Architecture**](./docs/ARCHITECTURE.md) | System diagram, layers, key design decisions |
| [**License**](./docs/LICENSE.md) | Copyright and usage restrictions |

Deep-dive specs live in [`spec/`](./spec/README.md); deployment in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Quick start
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
```
Shared reports and login need the API Worker (`npm run dev:api`); without it the app runs in local mode.

## License

**Copyright © 2026 Dominik Liahovich. All rights reserved.**

This is proprietary software, **not open source**. The code is visible for evaluation only. You may not copy, fork, modify, deploy, redistribute, reuse in another product or use it to train AI models, commercially or otherwise, without written permission from the copyright holder. Full terms: [`LICENSE`](./LICENSE).
