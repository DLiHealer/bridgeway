# Demo scenario and pitch (Roadmap Step 14 / P13)

Rule: every number is **real** (source), **target** (labelled) or **demo** (labelled). Nothing else goes on a slide. Validation status is "not yet validated with users" ([validation.md](./validation.md)).

## 1. 90-second demo (pl UI; switch to en on request)
Persona (staged, labelled on slide): Anna helps an elderly neighbour on a wheelchair who cannot reach a social-services centre. Start on `/` with language pl, fresh localStorage.

| Time | Action (route / control) | Say (core message) |
|---|---|---|
| 0–10 s | `/` — slogan „Problem został już gdzieś rozwiązany.” | Residents report problems, but nobody tells them what already worked elsewhere. |
| 10–25 s | CTA „Zgłoś” → `/zglos`, tab problem; short description, category *dostępność*, city; tick „zgłaszam w imieniu osoby” + consent | Proxy reporting: a library or neighbour can report for someone; consent is recorded; no address is collected. |
| 25–40 s | Matching cases shown under the form (or `/rozwiazania?cat=dostepnosc`) | Real cases with source, organisation, cost, duration, measured outcome and **evidence level A–D**. Most are C/D — we say so. |
| 40–55 s | Open a case → `ScoreBreakdown` | Transfer score with visible weights; factors without data say „brak danych”, the score is marked **preliminary**. Not AI — a weighted model. |
| 55–70 s | „Skopiuj to u siebie” → city → „Utwórz projekt” | One click creates a project with the case's steps as tasks. |
| 70–85 s | `/projekty/:id` overview | Addressee card (empty addressee flagged in red), status timeline received → assigned → in progress → resolved/rejected (+ reason). |
| 85–90 s | Closing slide: mocked vs real, validation status | See §4–5. |

Fallbacks: if the map/tiles are offline skip `/mapa` (not in the path); if localStorage is dirty, clear `bridgeart-*` keys; the whole path is client-side, no network is needed except map tiles/avatars.

## 2. Before / after frame
No real before/after case from a Polish municipality is available (no interviews, see validation.md). Therefore:
- **Staged (label on slide: „Scenariusz ilustracyjny — nie prawdziwa osoba”):** before — neighbour cannot reach the centre, nobody knows who is responsible; after — report has an addressee, a status and a case to copy.
- **Real (only measured outcome shown):** case c1, Barcelona, quasi-experimental before-after, n=74, median age 83: perceived health +21%, mental health +24%, psychological distress −16%, satisfaction 98%; level B. Source: [Gac Sanit 2014](https://doi.org/10.1016/j.gaceta.2014.04.013). Do not present as an effect of BridgeWay.

## 3. Competitor slide (concept §11)
**Status: hypothesis — not yet verified against the current sites; check each row before the pitch** (owner: team).

| Type | Examples | Do | Gap (hypothesis) | BridgeWay |
|---|---|---|---|---|
| City complaint portals | „zgłoś problem”, 19115 Warsaw | take reports | no "what worked elsewhere"; result stays in the office | case search/transfer + public status |
| Participation platforms | Decidim-like, budżety obywatelskie | voting, ideas | no verifiable result, little "what to do" | evidence registry + adaptation steps |
| NGO directories | ngo.pl | directory | not tied to a concrete problem/case | executor tied to a case |
| Crowdfunding | zrzutka.pl, polakpotrafi.pl | collect money | do not help choose *what* to fund | applicability check before funding |
| Social groups | neighbourhood groups | fast discussion | knowledge lost, no structure | structured base |

Positioning: not a replacement — a layer of knowledge and responsibility between them: "what to do" and "who answers".

## 4. What is mocked / what is real (slide)
Real: 6 intervention cases + 1 route, each with link and level A–D ([sourcing-spike.md](./sourcing-spike.md)); transfer-score formula and visible weights; privacy handling (coarsened areas for sensitive reports, only city collected); accessibility code-level checklist.
Mocked / limited (say it aloud):
- No backend: data lives in the browser (localStorage), not shared across devices.
- Demo signals, demo project `p1`, demo addressee — labelled „Dane demo”; statuses are typed by hand, not provided by an authority.
- Transfer score is preliminary: only problem type and evidence have data; context, budget, partners = „brak danych”.
- Keyword matching for experts/NGOs/funding, no AI/LLM anywhere.
- Experts/NGOs/funding lists are demo, not a registry.
- Legal pages are prototype drafts; manual screen-reader run pending ([accessibility.md](./accessibility.md)).
- Evidence: 6 cases, 1 at level B, none A; USP is "structured registry of practices + help collecting evidence", not "proven solutions".

## 5. Validation slide
pl: „Jeszcze nie zwalidowane z użytkownikami. Dowody: 6 zweryfikowanych przypadków ze źródłami. Następny krok: 5 wywiadów i pilotaż w jednej gminie.”
en: "Not yet validated with users. Evidence so far: 6 verified cases with sources. Next step: 5 interviews and a pilot with one municipality."
Optional (only with a source): NIK audit — 87% of 16 audited local-government units fail minimum accessibility ([prawo.pl](https://www.prawo.pl/samorzad/dostepnosc-w-samorzadach-tylko-na-papierze-krytyczne-wyniki-kontroli-nik,1547387.html)), problem evidence level C.

## 6. Figure register (allowed numbers)
| Figure | Kind | Source / label |
|---|---|---|
| 6 verified cases (+1 route) | real | sourcing-spike.md |
| 1 case at level B, 0 at A | real | sourcing-spike.md |
| +21% / +24% / −16% / 98%, n=74 | real | Gac Sanit 2014 (case c1) |
| 87% of 16 units fail accessibility minimum | real (problem) | NIK via prawo.pl |
| Score weights 30/25/15/15/15 | hypothesis | concept §6.3, shown in UI |
| 5 interviews, 1 pilot municipality | target | validation.md |
| 90 s | target | demo length |
No user, revenue, savings or impact numbers exist; none may be added.

## 7. Rehearsal checklist (human, pending)
- [ ] Run §1 three times from a fresh browser profile, pl and en; each ≤ 90 s, no dead end.
- [ ] Run on the projector/laptop used for the pitch; check contrast and text size.
- [ ] Each slide figure matches §6; staged frame carries its label.
- [ ] Competitor rows checked against live sites; unverified rows removed or marked.
- [ ] Rehearse Q&A: "Is this validated?" (no), "Is it AI?" (no), "Where does data live?" (browser only).
Reserve at least one day for this (roadmap execution order).
