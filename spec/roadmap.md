## Roadmap for preparing MVP of the app

Statuses:
- Open
- In progress
- Blocked
- Postponed
- Done


### Step 1. Status: Done

Create architectural spec and add documentation for claude code so that it supports this each time changes are implemented and also uses it as a reference for future changes.

Update .gitignore so that no instructions for AI appear in the repo

Create reference for specs that will also be supported in case of changes

---

# Roadmap v1 — from `concept_v1.0.md` §17

Source: [concept_v1.0.md](./concept_v1.0.md) (approved). Steps are ordered by the Pareto principle: highest value/effort first. Step N = concept item P(N-1), IDs `P1…P18` are kept for traceability.

Conventions:
- Effort: S ≈ up to half a day, M ≈ 1 day, L ≈ 2–3 days, XL = post-hackathon. Value: ●●● high … ● low. Estimates are rough, for a 1–2 developer team.
- Any change to routes, state, data model or dependencies (P5, P6, P8, P15) updates `spec/architecture.md` in the same change.
- Any number shown in the UI or pitch is **real** (with a source), a **target** (labelled), or **demo** (labelled). No other kind.
- Steps P14–P17 do not start until P1–P13 are Done or consciously cut.

## Assumptions (open questions from concept §15 not yet answered)
- Wedge: accessibility of local/public services (+ isolation of seniors as second example).
- Demo: two municipalities, a case transferred from one to the other; UI in pl/en.
- Backend and LLM are Tier 2: they do not block the core demo; without them the prototype is honestly labelled "data is local".
- Sourcing spike (P4) and validation (P12) are run by the team in parallel, not by the developer on the critical path.

## Execution order
1. In parallel from day one: **P4** (sourcing spike) and **P12** (validation).
2. Development: P1 → P2 → P3 (quick wins) → P5 → P6 → P7 → P8 → P9 → P10 → P11.
3. Packaging: **P13**; reserve at least one day for rehearsal.
4. Only with spare time: P14 → P15 → P16 → P17.
5. **Gate after P4:** if the spike result falls into rows 2–3 of concept §7.4, revisit the USP wording before starting P5–P6.

## Layer 1 — Trust & a working flow (~20% effort → ~50% value)

### Step 2 (P1). Status: Done
**Data honesty.** Remove invented KPIs (Home, Analytics), "verified" badges, expert ratings and unsourced "effect" claims; label demo data; remove or hide fake expert contacts.
- Effort S · Value ●●● · After: —
- Done when: no number on the UI lacks a source or a "demo/target" label; no invented organisations or ratings remain.

### Step 3 (P2). Status: Done
**Fix the end-to-end flow** Solution → "Skopiuj to u siebie" → Project (`/projekty` is currently a copy of ProfilePage).
- Effort S · Value ●●● · After: —
- Done when: the scenario runs without dead ends; the projects list is a real list.

### Step 4 (P3). Status: Done
**Remove dead UI.** Each non-working control is either implemented minimally, hidden, or labelled "prototype" (search, logout, save draft, upload, chat, export PDF, join team).
- Effort S · Value ●●● · After: —
- Done when: the demo path contains no button without an effect.

## Layer 2 — Core USP (~25% effort → ~+30% value)

### Step 5 (P4). Status: Open
**Sourcing spike.** Find and verify 10–15 real accessibility / senior-support cases (source, organisation, cost, duration, outcome and how it was measured, evidence level A–D, licence/reuse rules). Unverifiable cases are excluded. Run in parallel.
- Effort M · Value ●●● · After: —
- Done when: a table of cases with clickable sources exists and the decision per concept §7.4 is recorded.

### Step 6 (P5). Status: Open
**Evidence-backed case schema.** Add `source`, `organisation`, `cost`, `duration`, `outcome`, `outcomeMethod`, `evidenceLevel`, `context`; load the cases from P4; remove the unsafe "DIY wooden ramps" case (replace with route: accessibility audit → responsible body → technically approved solution).
- Effort M · Value ●●● · After: P4
- Done when: all cases in the app are real, sourced and graded A–D. Update `architecture.md` §6.

### Step 7 (P6). Status: Open
**Transfer score with explanation.** Weighted formula from concept §6.3 with visible weights, "no data" instead of invented values, hard constraints first; one matching algorithm on every recommendation screen; remove the "AI" label from keyword matching.
- Effort M · Value ●●● · After: P5
- Done when: each case shows a score with a per-factor breakdown and the source of every input. Update `architecture.md` §7.

### Step 8 (P7). Status: Open
**Home repositioning.** Slogan "Problem został już gdzieś rozwiązany." (pl; en equivalent, via i18n), two CTAs, 5-step "how it works", cases as the navigation centre; demote Pomysły / Profil / Analityka per concept §5.5.
- Effort S · Value ●●○ · After: P5
- Done when: the first screen explains the value in ~5 seconds. Update `architecture.md` §4.

## Layer 3 — Social value & responsibility (~20% effort → ~+12% value)

### Step 9 (P8). Status: Open
**Addressee and status of a report.** Field `responsibleBody`, status timeline (received → assigned → in progress → resolved/rejected + reason), shown in Project Room.
- Effort M · Value ●●○ · After: P2
- Done when: the demo report shows an addressee and status history; an empty addressee is flagged. Update `architecture.md` §6.

### Step 10 (P9). Status: Open
**Minimal assisted reporting.** "I'm reporting on behalf of someone" flag, recorded consent, hint about proxy points (library, senior club, social worker, NGO).
- Effort S · Value ●●○ · After: —
- Done when: the flag and consent text are in the form; the demo scenario goes through a proxy.

### Step 11 (P10). Status: Open
**Accessibility minimum and check.** Keyboard navigation, visible focus, WCAG AA contrast, text scaling to 200%, landmarks, icon labels, accessibility statement; run the main scenario with keyboard and a screen reader.
- Effort M · Value ●●○ · After: P7, P9
- Done when: checklist passed; remaining limitations listed honestly.

### Step 12 (P11). Status: Open
**Privacy & safety minimum.** Coarsen map points for sensitive categories, warning about third-party personal data, real Privacy and Terms pages linked from the footer.
- Effort S–M · Value ●●○ · After: —
- Done when: pages exist; exact addresses of sensitive categories are not published.

### Step 13 (P12). Status: Open
**Validation.** 5 interviews with the target group, ≥1 municipality/district, ≥2 NGOs, ≥1 proxy point, ≥1 letter of intent or quote; results in a separate file under `spec/`. Run in parallel.
- Effort M · Value ●●● · After: —
- Done when: real quotes and honest numbers are ready for the pitch (no rounding up).

## Layer 4 — Packaging

### Step 14 (P13). Status: Open
**Demo scenario and pitch.** End-to-end 90-second scenario, a before/after frame (real, or clearly labelled as staged), competitor slide (concept §11), honest statement of what is mocked.
- Effort M · Value ●●● · After: P6, P8, P9, P12
- Done when: rehearsal runs without failures and every figure is labelled.

## Layer 5 — Reinforcement if time remains (diminishing returns)

### Step 15 (P14). Status: Open
**One real context source.** GUS BDL (share of 65+, population) for 2 municipalities feeding the "context similarity" factor.
- Effort M · Value ●●○ · After: P6
- Done when: the factor is computed from real data with the source shown.

### Step 16 (P15). Status: Open
**Shared backend + magic-link login** for the loop report → public page → status change by another role.
- Effort L · Value ●●○ · After: P8
- Done when: two browsers see the same data; otherwise the demo keeps the "data is local" label. Update `architecture.md` §2, §5, §9.

### Step 17 (P16). Status: Open
**LLM adaptation plan** strictly from loaded cases (RAG, a source link for every claim, no generated facts).
- Effort L · Value ●○○ · After: P5, P6
- Done when: every statement in the plan has a source link; fields without a source stay empty.

### Step 18 (P17). Status: Open
**Honest analytics.** Rebuild Analityka on real metrics (reuse rate, time to first response) or hide the section.
- Effort M · Value ●○○ · After: P8, P15
- Done when: no decorative charts; only computed metrics.

## Layer 6 — After the hackathon

### Step 19 (P18). Status: Postponed
**Tier 3.** KRS/REGON organisation checks, real funding calls, B2G dashboard, moderation system, municipal pilots, SMS/voice/paper channels, languages beyond pl/en, public API. Planned separately; not detailed here.
- Effort XL · Value ●○○ · After: exit from the hackathon
