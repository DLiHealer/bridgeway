# Specs index

Reference for project specs. **Keep this index and the linked specs in sync with code changes.**

| Doc | Purpose |
|---|---|
| [architecture.md](./architecture.md) | Stack, structure, routes, state, data model, matching, conventions |
| [concept_v1.0.md](./concept_v1.0.md) | Working product concept (RU): USP, scope cut line, demo, evidence, validation. Approved v1.0 |
| [concept_review_v0.1.md](./concept_review_v0.1.md), [concept_review_v0.2.md](./concept_review_v0.2.md) | Archived jury/investor reviews (inputs to v1.0) |
| [sourcing-spike.md](./sourcing-spike.md) | Step 5 result: verified cases with sources, evidence levels A–D, §7.4 decision |
| [accessibility.md](./accessibility.md) | Step 11 result: accessibility checklist, pending manual checks, limitations |
| [validation.md](./validation.md) | Step 13 (postponed): desk-evidence rules, validation plan, interview guide, interview/quote logs (real data only) |
| [roadmap.md](./roadmap.md) | MVP roadmap steps and statuses (Open / In progress / Blocked / Postponed / Done) |

## Maintenance rules
- Any change to routes, state, data model, dependencies, build/deploy → update `architecture.md` in the same commit.
- New spec file → add a row to the table above.
- Roadmap step finished → set its status to Done.
