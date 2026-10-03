# BridgeWay — Concept Assessment (Jury / Investor Review)

> Reviewer role: hackathon juror + impact investor. Tone: strict. Basis: `spec/architecture.md`, `README.md`, seed data in `src/data/index.js`, route/page inventory. Date: 2026-10-03.
> Verdict is about the **concept and evidence of impact**, not code quality.

## 1. Verdict

| Criterion (typical hackathon weighting) | Score /10 | Comment |
|---|---|---|
| Problem clarity & relevance | 6 | Real problem (civic fragmentation) but stated as seven generic categories, not one sharp user pain. |
| Innovation | 3 | Report → idea → match → fund → track is a well-trodden pattern (FixMyStreet, Decidim, Zgłoś Problem, Budżet Obywatelski portals, Zrzutka, Ashoka-type directories). No unique mechanism. |
| Social impact potential | 5 | Targets valid groups (seniors, accessibility, digital exclusion) but impact is asserted, not designed or measured. |
| Evidence / validation | 1 | Zero real users, zero partner letters, zero pilots. All numbers are fabricated seed data. |
| Feasibility & execution | 5 | A clean working SPA exists. But no backend, no auth, no persistence across devices → nothing a resident can actually use. |
| Scalability / sustainability | 2 | No revenue model, no owner of the "last mile" (who actually fixes the ramp?). |
| Inclusion & ethics | 3 | The target groups (seniors, disabled, digitally excluded) are the least likely to use a web SPA with a map. Not addressed. |
| **Overall** | **3.6 / 10** | **Not fundable in current form. A competent demo of a generic idea.** |

One-sentence jury summary: *a polished form-and-directory front end with invented data, aimed at people who by definition are excluded from web forms, with no mechanism that guarantees any problem is ever solved.*

## 2. What is good (keep)
1. Polish-first, bilingual UI (pl/en) and Polish-specific framing — local relevance is an asset.
2. The category choice (seniors, accessibility, digital exclusion, housing) is aligned with real, under-served social needs.
3. The "bridge" metaphor and the matching idea (problem ↔ expert/NGO/solution/funding) is the only potentially differentiating element — see §4.
4. Low-cost-solution cards (e.g. neighbour-built ramps, 1–4k PLN) are the right instinct: small, concrete, replicable interventions.
5. Deployable, fast, no secrets — a clean base to iterate.

## 3. Critical weaknesses (strict)

### 3.1 The data is fake and presented as real — credibility risk (blocker)
- `analytics.kpis` claims **1248 signals, 356 ideas, 89 projects, 68% rate**; the seed contains **6 signals and 6 ideas**. A juror who opens the data file (or one real click) sees this. Presenting invented KPIs on `/analityka` and likely Home is a trust-killer and, for a civic platform, ethically unacceptable.
- Experts use `@example.com`; contacts like "Fundacja X"; `verified: true` is a hard-coded boolean with no verification process behind it. Effect claims ("+40% participation", "-3°C latem") have no source.
- "Rating 4.8/4.9" for experts with no rating mechanism.
- **Rule:** nothing that looks like a real metric may be invented. Label demo data visibly, or replace with real public data.

### 3.2 No closed loop — the platform does not solve anything
The flow ends at "contact expert / follow project". Nothing guarantees that a signal reaches a party with the **power or obligation to act** (gmina, spółdzielnia, zarząd dróg). Reporting platforms die exactly here: citizens report, nobody responds, trust collapses within months. There is no response-SLA, no escalation, no public accountability, no status that a duty-holder controls.

### 3.3 Wrong channel for the target users
Seniors, people with disabilities and the digitally excluded are the stated beneficiaries (the platform even lists "digital exclusion" as a problem), yet the only interface is a map-based web SPA. No offline/assisted channel, no accessibility statement, no WCAG target, no plain-language mode, no phone/SMS/library-point/volunteer-proxy path. **The solution reproduces the problem it describes.**

### 3.4 No differentiation vs. existing players
Not named anywhere in the project: Decidim/Budżet Obywatelski portals, "Zgłoś problem" city apps, 19115 (Warsaw), Fundacja Batorego/Ogólnopolska Federacja Organizacji Pozarządowych directories (ngo.pl, Pozytywnie), Zrzutka/PolakPotrafi (funding), Nextdoor-like groups on Facebook. Without a stated reason why a resident would choose BridgeWay, the jury will assume "none".

### 3.5 Scope sprawl, no wedge
Twelve routes: map, ideas, solutions, experts, funding, projects, profile, analytics… Seven categories across 8 cities. A marketplace/directory with no supply side is empty. Classic cold-start failure: who is the first 100 users, and who supplies the first 20 experts/NGOs *on day one*?

### 3.6 No impact model, no metrics
There is no theory of change (inputs → outputs → outcomes), no definition of "solved", no baseline, no target. "Rate 68%" is not defined. Investors/juries for social impact require at least 2–3 **outcome** metrics (e.g. share of reported accessibility barriers removed within 90 days; seniors who completed first e-service).

### 3.7 No sustainability / business model
Who pays? Not residents. NGOs have no budget. Gminy are the only real payer, but nothing addresses municipal procurement, integration (CRM/EZD, 19115), or why a gmina would adopt it over free alternatives. Funding page is a list, not a transaction.

### 3.8 Trust, safety, legal
- Public geo-located reports about named neighbours/buildings, free-text, no moderation, no abuse/defamation handling → liability.
- No GDPR/RODO basis, privacy policy, consent, data retention, or processor map (footer links "Privacy/Terms" exist as labels only — verify they lead somewhere real).
- Expert/NGO directory with no vetting → fraud vector aimed at vulnerable people.
- No auth: anyone can post as anyone ("author" is free text).

### 3.9 Technical claims vs. social claims
Per architecture §5/§9: state is `localStorage`, "no sync", "no auth, no backend". Therefore the "community" is a single browser. A jury will not credit "community platform" when two users cannot see each other's posts. Acceptable for a prototype **only if** the pitch is honest about it and a thin real backend (even one shared DB) is demonstrated for the core loop.

### 3.10 Pitch hygiene
- Footer "Stworzone na HackYeah" — fine for the demo, but the product vision must not read as a hackathon artefact.
- Code comments partly in Russian; irrelevant to the jury, but sloppy if code is reviewed.

## 4. Recommended concept changes (prioritised)

### P0 — must do before any pitch
| # | Change | Why |
|---|---|---|
| P0.1 | **Remove or relabel all fabricated metrics.** Replace `analytics.kpis` with live counts derived from actual data, or banner "Demo data". Remove `verified`, ratings, and effect claims unless sourced. | Credibility (§3.1). |
| P0.2 | **Pick one wedge.** Recommendation: **accessibility barriers + senior isolation in ONE city** (e.g. Kraków or Wrocław). Drop the other 5 categories and 7 cities from the main UX (keep as "coming next"). | Focus, cold-start (§3.5). |
| P0.3 | **Define the closed loop for the wedge.** Every signal gets an *addressee* (e.g. ZDM/ZIM, spółdzielnia, dzielnicowy ośrodek pomocy społecznej, a named NGO), a public status timeline (received → assigned → in progress → resolved/rejected + reason) and an SLA (e.g. response in 14 days). Show unanswered items publicly ("silent for 30 days"). | Differentiator + accountability (§3.2). |
| P0.4 | **Assisted-access channel.** Add a "report on behalf of someone" flow (volunteer / librarian / family member), a phone/SMS-or-paper-form concept, large-type/high-contrast/plain-language mode, and a WCAG 2.2 AA target with an accessibility statement. | Aligns product with beneficiaries (§3.3). |
| P0.5 | **Real minimal backend for the core loop** (report → public page → status change by addressee) with auth (email magic-link) so at least two real people can see the same data. | Prove it's a community, not a mock (§3.9). |
| P0.6 | **Written theory of change + 3 outcome metrics + baseline** in this file (see §6 template). | Impact evidence (§3.6). |

### P1 — strongly recommended
| # | Change | Why |
|---|---|---|
| P1.1 | **Letter(s) of intent**: ≥1 gmina/district office, ≥2 NGOs, ≥1 senior club or library willing to be an assisted-access point. Even non-binding. | Only real validation available in a hackathon (§3.4–3.5). |
| P1.2 | **Competitive map** (1 slide/table): what BridgeWay does that 19115 / ngo.pl / Decidim / Facebook groups do not. Candidate USP: *"every report is routed to a duty-holder and tracked to resolution, with a low-cost proven solution suggested"* — the matching engine becomes **solution recommender**, not a directory. | Innovation (§3.4). |
| P1.3 | **Make matching the hero feature, make it honest.** Today it's keyword + category + city scoring. Show *why* a match was made, cite the source of each solution (real case studies from Polish NGOs/cities), and let users rate whether the suggestion worked → feedback improves ranking. | Real innovation, measurable. |
| P1.4 | **Moderation & safety policy**: report/flag, takedown, no personal data of third parties, address fuzzing for sensitive categories (e.g. lonely seniors must never be pinpointed on a public map!). | Legal and ethical (§3.8). |
| P1.5 | **RODO package**: privacy policy, consent, retention, DPIA-lite, DPO contact; real Terms. | Required in EU (§3.8). |
| P1.6 | **Vetting of experts/NGOs**: KRS number check for NGOs, manual approval for experts, visible "verified by <who, when>". Replace the boolean. | Fraud against vulnerable users (§3.8). |

### P2 — to strengthen the investment case
| # | Change | Why |
|---|---|---|
| P2.1 | **Business model**: B2G SaaS for gminy (dashboard of unresolved signals, response-time KPIs, EZD/19115 integration) + free for residents/NGOs. Pricing hypothesis per 10k inhabitants/yr. | Sustainability (§3.7). |
| P2.2 | **Public-funds angle**: connect to real programmes (Budżet Obywatelski, Fundusz Inicjatyw Obywatelskich, EU/EOG funds) — import real calls, deadlines, eligibility; remove invented funds. | Utility, credibility. |
| P2.3 | **Open data export** (CC-BY) of anonymised signal statistics; useful to NGOs/researchers and to prove transparency. | Social value, trust. |
| P2.4 | **Volunteer-time ledger** (hours contributed, resolved cases) as the core engagement metric instead of vanity counts. | Impact measurement. |
| P2.5 | Consider **UA/other-language support** (Ukrainian community in PL is large; integration category exists) rather than en, which serves few residents. | Real inclusion value. |
| P2.6 | Cut surface area: merge Ideas/Projects, demote Analytics/Profile/Experts to secondary navigation. | Focus. |

## 5. Suggested sharper positioning

**Current (implicit):** "A bridge between a problem and a solution."  — generic, unfalsifiable.

**Proposed:** *"BridgeWay makes sure an accessibility barrier or an isolated senior reported in <City> reaches someone who can act — and stays visible until it's resolved."*
- Beneficiary: seniors & people with disabilities (and the neighbours/volunteers acting for them).
- Mechanism: routed reports + proven low-cost fixes + public status timeline + assisted access.
- Proof point to build for the demo: **one real barrier, one real addressee, one real status change.**

## 6. Impact model template (to fill in; strict jury will ask)

| Level | Definition | Example metric | Baseline | 12-month target |
|---|---|---|---|---|
| Output | Reports routed to duty-holder | # reports with named addressee | 0 | TBD |
| Output | Assisted-access points active | # libraries/clubs/NGOs | 0 | TBD |
| Outcome | Barriers resolved | % resolved ≤ 90 days | n/a | TBD |
| Outcome | Time to first response | median days | n/a | ≤ 14 |
| Outcome | Seniors reached through proxy reporting | # unique beneficiaries | 0 | TBD |
| Impact | Quality-of-life proxy | e.g. self-reported mobility/isolation (short survey) | TBD | TBD |

Rule: no figure in the UI or pitch without a source or an explicit "target"/"demo" label.

## 7. Pitch / demo checklist (strict)
- [ ] No invented KPIs anywhere in UI or deck.
- [ ] One concrete persona story with a real (or clearly staged) end-to-end resolution.
- [ ] Named competitors + differentiation slide.
- [ ] Who pays + who acts (addressee) stated in one sentence each.
- [ ] Accessibility demonstrated (keyboard-only, screen reader pass, large type) — not just claimed.
- [ ] Privacy/safety answer ready: "what if someone reports a named neighbour / a lonely senior's address?"
- [ ] Honest limitation statement: prototype scope, what is mocked.
- [ ] Letters of intent or interview quotes (≥5 target-user interviews: seniors/carers, ≥2 officials).

## 8. Risks if concept is not changed
| Risk | Likelihood | Impact |
|---|---|---|
| Jury perceives fake metrics as deception | High | Disqualifying in impact categories |
| "Just another reporting app" | High | Low innovation score |
| Target users cannot use the product | High | Negative social-value score |
| Empty-platform / cold start after launch | High | Project dies post-hackathon |
| Legal exposure (RODO, defamation) | Medium | Blocks any pilot with a gmina |

## 9. Impact on specs / roadmap (follow-up, not yet done)
Per project rules, accepted recommendations must be reflected in `architecture.md` and `roadmap.md`. Proposed roadmap steps (statuses: Open):
1. Data honesty pass (P0.1) — remove/label fabricated metrics.
2. Wedge narrowing + copy rewrite (P0.2, §5).
3. Closed-loop model: addressee + status timeline + SLA (P0.3) — data-model change (`signals.addressee`, `statusHistory`, `dueAt`).
4. Accessibility & assisted-access (P0.4).
5. Minimal backend + auth (P0.5) — architecture.md §2/§5/§9 will change.
6. Impact metrics & real analytics (P0.6, §6).
7. Moderation, RODO, vetting (P1.4–P1.6).

## 10. Final note to the team
The instinct (civic participation for the excluded) is right and the demo is clean, but today the project optimises for *looking like a platform* rather than *producing a resolved case*. The fastest route from 3.6 to a competitive score: **narrow, make one loop real, show one resolved case, and delete everything that is invented.**
