# FeatureTasks — FEAT-005: Role Workflow Section

## Scope summary

FEAT-005 implements one static, responsive homepage section at `id="roles"` that introduces the four HushVoting election roles: Organizations, Voters, Trustees, and Auditors.

Implementation must preserve the narrow feature boundary:

- add a semantic homepage `#roles` section after the existing FEAT-004 Trust Model section;
- render exactly four non-interactive role cards in the approved order;
- use decorative Material Symbol icons, visible role titles, and approved description copy;
- keep the homepage route as a thin composition layer;
- use Sovereign Shield surface, spacing, typography, and radius tokens with tonal separation rather than default bright outlines;
- add component/unit coverage for the section, exact copy, card count, and decorative icon accessibility;
- avoid backend, authentication, role-specific workflow routing, dynamic content, navigation rewrites, modals, and protocol-evidence work.

## Linked EPIC and acceptance traceability

| Source                   | Requirement                                                                          | Planned coverage                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| EPIC-001 Feature 5       | Create Role Workflow section with four responsive role cards                         | Phases 2-6 create role data, component structure, styling, and homepage composition       |
| FEAT-005 Acceptance      | Homepage includes a section with `id="roles"`                                        | Phases 4 and 6 implement the semantic section and route composition                       |
| FEAT-005 Acceptance      | Existing `#roles` navigation target works without navigation changes                 | Phases 1, 4, and 6 verify Header remains unchanged and the target is provided             |
| FEAT-005 Acceptance      | Exactly four cards: Organizations, Voters, Trustees, Auditors                        | Phases 2, 4, and 7 define and test the static role contract                               |
| FEAT-005 Acceptance      | Each card includes decorative Material Symbol icon, title, and approved copy         | Phases 2, 4, 5, and 7 implement and verify icon/title/description rendering               |
| FEAT-005 Acceptance      | Decorative icons do not create redundant screen-reader output                        | Phases 4, 5, and 7 require `aria-hidden="true"` and accessibility review                  |
| FEAT-005 Acceptance      | Uses existing design-system surfaces and visual language                             | Phase 5 applies tonal card surfaces, spacing, and radius using existing tokens/components |
| FEAT-005 Acceptance      | Responsive across supported viewport sizes                                           | Phases 5, 6, and 7 require one/two/four-column layout and responsive review               |
| FEAT-005 Acceptance      | Avoid backend, dynamic data, and navigation rewrite scope                            | Phases 1, 2, 3, and 6 explicitly constrain integration and data contracts                 |
| FEAT-005 Acceptance      | Unit tests verify the section and all four role cards render                         | Phase 7 adds or updates component render tests for exact content and accessibility        |
| Design artifacts         | Cards are informational and unfocusable; route remains composition-only              | Phases 3, 4, and 6 enforce static behavior and route composition boundaries               |
| Lessons learned FEAT-002 | Prefer tonal surfaces over border-heavy cards                                        | Phase 5 avoids white/default outlines and uses surface fills first                        |
| Lessons learned FEAT-003 | Fragment-only anchors remain stable; use native links only for navigation            | FEAT-005 only supplies `#roles`; no Header or MobileNavDisclosure changes are planned     |
| Lessons learned FEAT-004 | Match upstream fragment target exactly; decorative icons hidden when text is present | Phases 4 and 7 verify `id="roles"` and icon `aria-hidden` handling                        |

## Final refinement decisions

- FEAT-005 will include a compact visible section header to avoid an abrupt transition after the Trust Model section while preserving the semantic `h2` section name.
- Approved header copy:
  - eyebrow: `Role Workflow`
  - heading: `Four roles, one protocol-bound election flow.`
  - description: `HushVoting separates election governance, private participation, trustee safeguards, and audit review into clear responsibilities.`
- Approved role-card copy is the FEAT/EPIC contract, not the prototype’s longer trustee sentence.
- Cards are non-interactive informational surfaces. They must not be links, buttons, modal triggers, or keyboard focus targets in this FEAT.
- Role data should be centralized in `src/components/landing/constants.ts` or a clearly local static constant; tests must assert exact copy so accidental content drift fails quickly.
- If project validation still exposes the known pre-existing ESLint 9 missing-flat-config issue, implementation must record exact static-analysis evidence and either fix it only if safely approved/in scope or document a precise phase-specific waiver. Build, typecheck, unit/component tests, formatting, and review readiness remain expected.

## Task inventory by phase

| Phase   | Focus              | Key tasks                                                                                                                                      | Status    |
| ------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Phase 0 | Health check       | Inspect repository status, existing landing components, tests, design-system exports, and known validation/tooling debt before changing source | COMPLETED |
| Phase 1 | Planning analysis  | Create `planning-analysis-report.md`, confirm content contracts, file boundaries, accessibility model, responsive strategy, and test plan      | COMPLETED |
| Phase 2 | Data layer         | Add typed static role-section constants for header copy, role order, icon names, titles, and approved descriptions                             | COMPLETED |
| Phase 3 | Business logic     | Keep behavior static; confirm there is no dynamic data, state machine, workflow routing, card interaction, API call, or role permission logic  | COMPLETED |
| Phase 4 | Presentation logic | Create/export `RoleWorkflowSection` with semantic section, heading relationship, role list/card markup, and non-focusable card structure       | COMPLETED |
| Phase 5 | User interface     | Apply Sovereign Shield surfaces, spacing, typography, icon styling, radius, subtle optional tonal lift, and responsive grid behavior           | COMPLETED |
| Phase 6 | Integration        | Compose the section after `TrustModelSection` on the homepage without changing Header navigation or unrelated sections                         | COMPLETED |
| Phase 7 | Testing and polish | Add/update component/unit tests, run canonical validation labels, perform accessibility/responsive review, and format changed files            | COMPLETED |
| Phase 8 | Final checkpoint   | Verify acceptance traceability, evidence completeness, docs consistency, review readiness, and handoff quality                                 | COMPLETED |

## Dependencies and assumptions

- FEAT-001 scaffold is complete and the TanStack Start, Vite, TypeScript, Vitest, Playwright, and Tailwind v4 baseline remains intact.
- FEAT-002 design-system tokens and utilities are available, including `cn` and reusable UI patterns documented in `STYLEGUIDE.md`.
- FEAT-003 Header already includes a fragment-only `#roles` navigation link; FEAT-005 must not rewrite navigation.
- FEAT-004 Trust Model section is already composed on the homepage and establishes the immediate predecessor section and spacing rhythm.
- `src/routes/index.tsx` remains the homepage composition point.
- Material Symbols font integration remains available from the existing site setup. Visible text must remain meaningful if the icon font fails.
- FEAT-008 will provide broader cross-section responsive polish, but FEAT-005 must still be responsive and readable on its own.
- The known ESLint flat-config gap may exist before implementation starts.

## UI, data, API, and integration contracts

### UI contract

- Component: `RoleWorkflowSection` under `src/components/landing/`.
- Export: update `src/components/landing/index.ts` to export the component and role-section constants/types as needed.
- Homepage composition: render `<RoleWorkflowSection />` after `<TrustModelSection />` in `src/routes/index.tsx`.
- Semantic structure: `section id="roles" aria-labelledby="roles-heading"` or an equivalent robust heading relationship.
- Heading order: section heading is `h2`, because FEAT-003 owns the homepage `h1`.
- Cards: informational elements only; no `button`, `a`, click handler, modal trigger, or `tabIndex`.
- Icons: Material Symbol text spans are decorative with `aria-hidden="true"` because visible text conveys the card meaning.
- Layout: one column on mobile, two columns on tablet, four columns on desktop when width permits.

### Static data contract

Section copy:

- eyebrow: `Role Workflow`
- heading: `Four roles, one protocol-bound election flow.`
- description: `HushVoting separates election governance, private participation, trustee safeguards, and audit review into clear responsibilities.`

Role card data, in order:

| Role          | Icon             | Description                                                                                        |
| ------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| Organizations | `corporate_fare` | Create and govern election parameters, define voter rolls, and establish timing protocols.         |
| Voters        | `groups`         | Securely claim eligibility through private ID providers and cast cryptographically masked ballots. |
| Trustees      | `key`            | Approve governed actions and manage distributed decryption keys.                                   |
| Auditors      | `rule`           | Review protocol evidence and package integrity through the standalone verifier suite.              |

### API contract

No application API, backend API, server action, route loader, data persistence, CMS, authentication, or authorization contract is introduced by this FEAT.

### Integration contract

- Existing `NAV_LINKS` continue to include `{ label: "Roles", href: "#roles" }`.
- FEAT-005 supplies the matching anchor target and does not alter Header or MobileNavDisclosure behavior.
- The section should use the same `section-anchor` offset convention as existing homepage sections so the fixed header does not obscure the target.
- Later sections (`#protocol`, `#platform`, `#pilot-access`) remain out of scope and may continue to be absent without route errors.

## Verification evidence labels

Implementation phases must record evidence using declarative labels, not hardcoded command strings:

- `repository-health`
- `planning-analysis-report`
- `typecheck`
- `static-analysis`
- `unit-tests`
- `component-render-tests`
- `ui-tests`
- `build`
- `format-check`
- `accessibility-review`
- `responsive-review`
- `manual-review-ready`
- `code-review`
- `full-verification`

## Phase quality-gate policy

A phase cannot be marked complete until every quality gate in that phase file is one of:

- `satisfied`, with exact evidence paths and verification labels recorded by the implementation worker;
- `not applicable`, with a phase-specific reason explaining why the gate does not apply;
- `waived`, with a phase-specific risk rationale and owner/agent justification.

Implementation workers must not mark a phase complete while any gate remains `missing`. Browser/UI behavior changes require `ui-tests` evidence or a precise waiver. Production code changes require automated tests or a precise waiver. Code-relevant phases require a persisted code-review report or an explicit risk-based waiver.

## Completion handoff expectations

Before completing FEAT-005 implementation, the worker must ensure:

- the homepage includes exactly one `#roles` section for this role workflow surface;
- all four approved role cards render in order with exact approved copy;
- decorative icons are hidden from assistive technology;
- cards remain non-interactive and unfocusable;
- visual separation uses tonal Sovereign Shield surfaces rather than outline-heavy card borders;
- responsive layout supports mobile one-column, tablet two-column, and desktop four-column presentation;
- route composition remains thin;
- changed source, tests, and MemoryBank docs are formatted;
- validation evidence is attached to the relevant phase files;
- any remaining validation/tooling debt is recorded with exact scope rather than hidden.
