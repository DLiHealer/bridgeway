<div align="center">

# 🌉 BridgeWay

### „Problem został już gdzieś rozwiązany.”
**This problem has already been solved somewhere.**

A civic platform that connects a local social problem with a real, documented solution that has already worked somewhere else, and then follows it until something actually changes.

[**Project**](#about) · [**Tech spec**](./docs/TECH_SPEC.md) · [**Architecture**](./docs/ARCHITECTURE.md) · [**License**](./docs/LICENSE.md)

</div>

> **© 2026 Dominik Liahovich. All rights reserved.** BridgeWay is proprietary software. The code is published for evaluation only and may not be copied, reused or deployed. See [License](#license).

---

## Contents
1. [About](#about)
2. [The problem](#the-problem)
3. [Our answer](#our-answer)
4. [Who BridgeWay is for](#who-bridgeway-is-for)
5. [A story: from problem to change](#a-story-from-problem-to-change)
6. [What you can do in BridgeWay](#what-you-can-do-in-bridgeway)
7. [Principles we don't compromise on](#principles-we-dont-compromise-on)
8. [Inclusion and accessibility](#inclusion-and-accessibility)
9. [Privacy by design](#privacy-by-design)
10. [Measuring social impact](#measuring-social-impact)
11. [Where BridgeWay fits](#where-bridgeway-fits)
12. [Sustainability model](#sustainability-model)
13. [Project status](#project-status)
14. [Documentation](#documentation)
15. [Quick start](#quick-start)
16. [License](#license)

---

## About

BridgeWay helps a **municipality (gmina), an NGO or an ordinary resident** stop reinventing solutions to social problems. It finds interventions that have already been carried out in Poland and the EU, shows how strong the evidence behind them really is, explains honestly how well they would fit *this* place, and walks the problem from a report to an owner, a status and a measured result.

The interface is in Polish (with full English), because its first users are Polish communities.

## The problem

Every Polish town has the same set of hard, quiet problems: older people isolated at home, buildings and offices that people with disabilities cannot enter, neighbours left out of a digital world, families struggling with housing. These are not new problems, and many have already been tackled well somewhere.

But that knowledge is scattered. It sits in evaluation reports, EU project summaries, foundation websites and conference slides. A social worker in one gmina rarely learns what worked in the next voivodeship, so:

- **every community starts from zero**, spending time and public money on approaches that have already been tried;
- **reports go nowhere**: a resident complains, but nobody is named as responsible and nothing visible happens;
- **the people most affected are the least heard**: seniors and people with limited mobility often can't use complex websites or deal with institutions on their own.

The scale is real. A 2026 audit of local-government accessibility by the Supreme Audit Office (NIK) found that **87% of the audited units failed minimum accessibility requirements**. None of the 34 websites checked was fully compliant ([source](https://www.prawo.pl/samorzad/dostepnosc-w-samorzadach-tylko-na-papierze-krytyczne-wyniki-kontroli-nik,1547387.html), recorded in [`sourcing-spike.md`](./sourcing-spike.md)).

## Our answer

**Evidence-based solution transfer:**

```
Problem → similar real cases → strength of evidence → fit to this place
        → adaptation plan → responsible body → status → measured result
        → back into the shared knowledge base
```

Each completed transfer makes the next one cheaper and faster. Over time, BridgeWay's real value is a structured base of interventions: *what was done, where, for whom, under what conditions, at what cost, and with what measured result.*

## Who BridgeWay is for

| Role | Who | What BridgeWay gives them |
|---|---|---|
| **Reporter** | a resident, a family, neighbours | A clear path from "something is wrong" to action, with a visible status |
| **Proxy helper** | a librarian, social worker, volunteer, senior club | The ability to report **on behalf of** someone who can't, with recorded consent |
| **Implementer** | an NGO, a municipal department | A ready, source-backed adaptation plan instead of a blank page |
| **Responsible body** | road/building authority, housing manager, social-welfare centre | A named addressee and a public status timeline to answer through |
| **Funder** *(after the hackathon)* | grant programmes, foundations | Proven interventions worth funding, matched to real needs |

**The main beneficiaries are older people and people with limited mobility.** BridgeWay is designed so that they **don't have to use it themselves**: someone they trust can do it for them.

## A story: from problem to change

> *Illustrative scenario (staged, as in our demo).*

Anna's elderly neighbour uses a wheelchair and can no longer reach the local social-services centre. Anna opens BridgeWay:

1. **She reports the problem on his behalf.** She picks *accessibility*, chooses the city and ticks "reporting for another person". His consent is recorded. No address is collected.
2. **BridgeWay shows matching real cases**, each with its organisation, cost, duration, measured outcome and an evidence level from A to D. Most real cases are C or D, and the app says so.
3. **She opens a case and sees its transfer score**: which factors match her town, their weights, and which factors have **no data**. Missing factors are never guessed, and the score is marked *preliminary*.
4. **One click creates a local project** with the case's steps as tasks.
5. **The project names a responsible body.** If none is named yet, the gap is flagged. A public timeline follows the status: *received → assigned → in progress → resolved / rejected (with a reason)*.

## What you can do in BridgeWay

- 🔎 **Find solutions.** Browse verified cases from Poland and the EU, each with a source link and an evidence level.
- 📊 **Check fit.** A transparent transfer score weighs problem type, local context (e.g. the share of residents aged 65+, from official GUS statistics), budget, partners and evidence.
- 🧭 **Adapt.** Get an AI-assisted adaptation plan that is shown **only if every step is backed by a verbatim quote** from the case. The AI cannot add facts, numbers or sources.
- 📣 **Report.** Submit local problems. Shared reports are public and have a status timeline that responders update.
- 🤝 **Connect.** Find experts, NGOs and funding programmes matched to the problem by keywords and location.
- 🗺️ **See the map** of local signals and community projects. Sensitive reports are shown only as a blurred area.
- 💡 **Propose ideas** and turn cases into **projects** with tasks, an addressee and a status history.
- 📈 **Measure.** Analytics are computed from real activity (time to first response, how often solutions are reused). There are no decorative charts.

## Principles we don't compromise on

1. **Every claim has a source.** No source, no fact on the screen.
2. **Every score is explainable.** There is no "magic percentage": factors, weights and their origin are visible.
3. **Every report has an addressee and a status.** A report without an owner is a ticket into the void.
4. **Honest numbers only.** Every figure is either **real** (with a source), a **target** (labelled) or **demo** (labelled). Demo data is always marked in the interface.
5. **AI is a tool, not the product.** It is guarded and auditable, and it is never the source of truth.
6. **Safety first.** Unsafe do-it-yourself fixes (e.g. self-built ramps) are not recommended. BridgeWay points to the proper route instead: accessibility audit → responsible body → technically approved solution.

## Inclusion and accessibility

- **Assisted (proxy) reporting** with explicit consent, so that people excluded from the web can still be heard.
- **WCAG 2.1 AA target**: contrast ≥ 4.5:1, labelled controls, keyboard focus management, screen-reader-friendly page titles, and respect for the "reduced motion" setting.
- **Bilingual interface** (Polish / English), switchable at any time.
- An **accessibility statement** published inside the app (`/dostepnosc`, details in [`accessibility.md`](./accessibility.md)).

## Privacy by design

- Only a **city** is collected, never a street address.
- **Sensitive reports** (seniors, housing, or reports made on behalf of someone else) are never pinned to an exact point. The map shows a 3 km area on a coarse grid instead.
- A warning about third-party personal data is shown before a report is submitted.
- Logging in uses **one-time email links**: there are no passwords to leak. Each account's data is private.
- Draft privacy policy and terms are included in the app (`/prywatnosc`, `/regulamin`).

## Measuring social impact

**Theory of change:** problem described → applicable proven case found → owner assigned → solution implemented → result measured → case enriches the base → the next place needs less time and money.

| Level | Metric | Why it matters |
|---|---|---|
| Output | Share of reports with a named addressee | Accountability, not volume |
| Output | Number of cases with a source and an evidence level | Growth of the knowledge base |
| Outcome | **Time to first response** (median) | Whether institutions actually react |
| Outcome | **Reuse rate**: share of new problems tackled with an existing case | BridgeWay's signature metric |
| Outcome | Share of cases resolved within 30 / 60 / 90 days | Real progress |
| Impact | People whose access to a place or service improved | The change that matters |

**North Star:** *the number of successfully transferred solutions.* Today's baseline is zero, and we don't hide that.

## Where BridgeWay fits

BridgeWay does not replace existing tools. It is the **layer of knowledge and accountability between them**: *what to do* and *who is responsible*.

| Existing tool | What it does well | What BridgeWay adds |
|---|---|---|
| City "report a problem" portals | Collect complaints | Proven solutions from elsewhere + a public status |
| Participatory budgets and platforms | Ideas and voting | An evidence base + an adaptation plan through to a result |
| NGO directories | Who is out there | Matching the right partner to a specific case |
| Crowdfunding | Raising money | Checking *what* is worth funding before the money is raised |
| Neighbourhood social-media groups | Fast discussion | Structured knowledge that doesn't get lost |

*(This comparison is a working hypothesis. See [`concept_v1.0.md`](./concept_v1.0.md) §11.)*

## Sustainability model

*(A hypothesis, not yet validated. No prices are named before validation.)*

- **Free for residents and NGOs.**
- **Municipalities:** a dashboard of open reports, response times, transferable cases and reports.
- **Foundations and programmes:** effectiveness reporting and a catalogue of proven interventions.
- **Researchers and partners:** anonymised data access by agreement.

## Project status

**Hackathon MVP. Working and deployed on Cloudflare.**

- ✅ Verified case base (real sources, evidence levels A–D), transfer score, matching, map, ideas and projects
- ✅ Optional backend: shared reports, magic-link login with registration approval, responder workflow, per-account data
- ✅ Guarded LLM adaptation plan, computed analytics, accessibility pass, privacy safeguards
- ⏳ User validation interviews (postponed): the product is **not yet validated with users** ([`validation.md`](./validation.md))
- ⏳ After the hackathon: real funding calls, a registry of responsible bodies, moderation, automated tests

Seeded experts, NGOs, funding entries, ideas and projects are **demo data** and are labelled as such. Full plan: [`roadmap.md`](./roadmap.md).

---

## Documentation

| Tab | What's inside |
|---|---|
| [**Tech spec**](./docs/TECH_SPEC.md) | Functional modules, routes, API, data model, scoring formulas, LLM guardrails, security, configuration, limitations |
| [**Architecture**](./docs/ARCHITECTURE.md) | System context, components, request flows, storage, D1 schema, deployment, design decisions |
| [**License**](./docs/LICENSE.md) | Copyright, what is and isn't allowed, third-party notices |

Deep-dive specs: [`architecture.md`](./architecture.md), [`roadmap.md`](./roadmap.md), [`concept_v1.0.md`](./concept_v1.0.md), [`sourcing-spike.md`](./sourcing-spike.md), [`accessibility.md`](./accessibility.md), [`validation.md`](./validation.md). Deployment steps are in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Quick start

```bash
npm install
npm run dev        # frontend at http://localhost:5173
npm run build      # production build to dist/
```

Shared reports, login and the adaptation plan need the API Worker (`npm run dev:api`; see [Tech spec → Run, build, deploy](./docs/TECH_SPEC.md#12-run-build-deploy)). Without it, the app runs in **local mode** and says so.

## License

**Copyright © 2026 Dominik Liahovich. All rights reserved.**

BridgeWay is **proprietary software, not open source**. The source code, design, texts and curated case base are visible **for evaluation only** (for example, by a hackathon jury). Without prior written permission from the copyright holder, you may not copy, fork, modify, deploy, host, redistribute or reuse it in another product, or use any part of it for text and data mining or AI training. This applies to commercial and non-commercial use alike.

Full terms: [`LICENSE`](./LICENSE) · Summary and third-party notices: [`docs/LICENSE.md`](./docs/LICENSE.md)
