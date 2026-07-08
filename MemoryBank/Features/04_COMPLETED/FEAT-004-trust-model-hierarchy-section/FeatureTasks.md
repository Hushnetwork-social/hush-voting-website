# FeatureTasks — FEAT-004: Trust Model Hierarchy Section

## Scope summary

FEAT-004 implements one static, responsive homepage section: the `#trust` Trust Model Hierarchy section. The section explains HushVoting! as the application interface and orchestration layer on top of HushNetwork as the trust, privacy, and blockchain foundation.

Implementation must preserve the narrow feature boundary:

- add a semantic homepage `#trust` section after the existing FEAT-003 hero;
- render the approved eyebrow, heading, explanatory copy, two vertical trust-layer cards, capability chips, trust labels, decorative connector, and restrained glow/accent treatment;
- keep the homepage route as a thin composition layer;
- add component and browser-facing verification for rendered content, anchor behavior, responsiveness, and accessibility-relevant structure;
- avoid backend, verifier, protocol, authentication, contact, legal, footer, or additional homepage section work.

## Linked EPIC and acceptance traceability

| Source                   | Requirement                                                                                                                                    | Planned coverage                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| EPIC-001 Feature 4       | Build Trust Model Hierarchy section with eyebrow, headline, two layered cards, capability chips, trust labels, gradient connector, subtle glow | Phases 2-6 create constants, component structure, visual styling, and route composition         |
| FEAT-004 Acceptance      | Stable `#trust` anchor on homepage                                                                                                             | Phases 4 and 6 compose `TrustModelSection` with semantic section id and scroll-margin behavior  |
| FEAT-004 Acceptance      | Eyebrow and clear hierarchy headline                                                                                                           | Phases 2, 4, and 7 verify `Foundational Integrity` and `The Trust Model Hierarchy`              |
| FEAT-004 Acceptance      | Two cards: HushVoting! and HushNetwork                                                                                                         | Phases 2, 4, 5, and 7 verify both layer titles and subtitles                                    |
| FEAT-004 Acceptance      | Appropriate trust labels and capability chips                                                                                                  | Phases 2, 4, and 7 verify four capability chips and three trust labels                          |
| FEAT-004 Acceptance      | Gradient connector or equivalent hierarchy treatment                                                                                           | Phase 5 implements decorative connector; Phase 7 validates non-noisy semantics                  |
| FEAT-004 Acceptance      | Subtle glow and tonal styling consistent with visual language                                                                                  | Phase 5 applies Sovereign Shield tokens and avoids border-heavy structure                       |
| FEAT-004 Acceptance      | Responsive, readable, balanced narrow layouts                                                                                                  | Phases 5, 6, and 7 include responsive layout and browser-facing checks                          |
| FEAT-004 Acceptance      | Accessibility: semantic section, valid heading order, decorative elements hidden, contrast acceptable                                          | Phases 4, 5, and 7 cover semantic structure and accessibility review                            |
| FEAT-004 Acceptance      | Component tests cover key rendered content                                                                                                     | Phase 7 adds component render tests for section, heading, layer copy, chips, labels, and anchor |
| Design artifacts         | Homepage route remains thin; vertical trust hierarchy preserved on every breakpoint                                                            | Phases 1, 4, and 6 enforce component boundaries and route composition                           |
| Lessons learned FEAT-002 | Prefer tonal surfaces over borders                                                                                                             | Phase 5 explicitly avoids default white outline separators                                      |
| Lessons learned FEAT-003 | Keep route as composition point; fragment-only anchors are stable                                                                              | Phases 4 and 6 integrate through `src/routes/index.tsx` without display logic                   |

## Final refinement decisions

- Supporting copy is accepted for implementation as: `HushVoting! coordinates election eligibility, participation, private choice, and evidence artifacts on top of HushNetwork's privacy and blockchain foundation.` If product ownership changes this before implementation starts, Phase 1 must update `planning-analysis-report.md` before later phases consume copy constants.
- Trust labels remain plain informational text badges for FEAT-004. Icons for trust labels are deferred unless a later design pass explicitly requests them.
- Capability chip Material Symbol icons are decorative because each chip has visible text.
- FEAT-004 should not broaden into a generic tooling cleanup. If validation still finds the known pre-existing ESLint 9 missing-flat-config issue, implementation must either apply a minimal project-approved lint-config fix when safely in scope or record a phase-specific validation waiver naming the pre-existing tooling debt. Typecheck, unit, browser-facing UI checks, build, formatting, and manual review readiness remain expected evidence.

## Task inventory by phase

| Phase   | Focus              | Key tasks                                                                                                                 | Status    |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------- |
| Phase 0 | Health check       | Inspect current repo status, existing landing components, tests, and known lint debt before changing source               | COMPLETED |
| Phase 1 | Planning analysis  | Create `planning-analysis-report.md`, confirm copy/content contracts, map target files and test strategy                  | COMPLETED |
| Phase 2 | Data layer         | Add typed static trust-section constants for copy, chips, icons, labels, and layer metadata                               | COMPLETED |
| Phase 3 | Business logic     | Keep behavior intentionally static; implement render-ready mapping rules without interactive state or API/data loading    | COMPLETED |
| Phase 4 | Presentation logic | Create/export `TrustModelSection`, semantic structure, ids, aria relationships, and route-safe component API              | COMPLETED |
| Phase 5 | User interface     | Apply Sovereign Shield surfaces, spacing, responsive wrapping, connector, and restrained glow/accent styling              | COMPLETED |
| Phase 6 | Integration        | Compose section into homepage after hero; update route-level/homepage and browser-facing contracts                        | COMPLETED |
| Phase 7 | Testing and polish | Add/update unit/component and browser-facing checks; run canonical validation labels; document lint debt if still present | COMPLETED |
| Phase 8 | Final checkpoint   | Verify acceptance traceability, evidence completeness, docs, formatting status, and handoff readiness                     | COMPLETED |

## Dependencies and assumptions

- FEAT-001 scaffold is complete and the TanStack Start, Vite, TypeScript, Vitest, Playwright, and Tailwind v4 baseline remains intact.
- FEAT-002 design-system tokens and UI primitives are available, especially `Section`, `Card`, `InsetWell`, `IconLabel`, `StatusChip`, and `cn` utilities.
- FEAT-003 header/hero/navigation are complete; `Trust Model` already points to `#trust` as a fragment-only anchor.
- `src/routes/index.tsx` remains the homepage composition point.
- This feature is static/SSR. No HushServerNode, HushVoting web-client, verifier, blockchain, or protocol API integration is needed.
- Material Symbols font remains available from the existing site setup; visible chip text must remain sufficient if the icon font fails.
- The known missing ESLint flat-config issue may still exist before implementation begins.

## UI, data, API, and integration contracts

### UI contract

- Component: `TrustModelSection` under `src/components/landing/`.
- Export: update `src/components/landing/index.ts` so future landing sections can import consistently.
- Homepage composition: import and render after `HeroSection` in `src/routes/index.tsx`.
- Semantic structure: `section id="trust" aria-labelledby="trust-heading"` or an equivalent robust pattern.
- Heading order: section heading is `h2`, because FEAT-003 owns the homepage `h1`.
- Decorative connector/glow: CSS-only or `aria-hidden="true"`.
- Informational chips/labels: not buttons, not links, not focusable.

### Static data contract

Required copy and labels:

- eyebrow: `Foundational Integrity`
- heading: `The Trust Model Hierarchy`
- supporting copy: `HushVoting! coordinates election eligibility, participation, private choice, and evidence artifacts on top of HushNetwork's privacy and blockchain foundation.`
- HushVoting! layer subtitle: `The Application Interface & Orchestration Layer`
- capability chips: `Eligibility`, `Participation`, `Private Choice`, `Artifacts`
- HushNetwork layer subtitle: `The Trust, Privacy, and Blockchain Foundation`
- trust labels: `ZERO-KNOWLEDGE PROOFS`, `IMMUTABLE LEDGER`, `ENCRYPTED SHARDS`

Recommended icon contract for capability chips:

- `Eligibility` → `person_check`
- `Participation` → `how_to_vote`
- `Private Choice` → `security`
- `Artifacts` → `inventory_2`

### API contract

No application API, backend API, server action, route loader, or network contract is introduced by this FEAT.

### Integration contract

- Existing nav links must continue using fragment-only hrefs.
- Anchor navigation to `#trust` must not hide the heading under the fixed header.
- Later homepage sections (`#roles`, `#protocol`, `#platform`, `#pilot-access`) remain out of scope and may continue to be absent without route errors.

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

Before completing FEAT-004 implementation, the worker must ensure:

- all required copy and labels are present;
- vertical hierarchy is preserved across breakpoints;
- visual separation is tonal and not border-heavy;
- static content renders without JavaScript-dependent data loading;
- route composition remains thin;
- changed source, tests, and MemoryBank docs are formatted;
- validation evidence is attached to the relevant phase files;
- any remaining lint/tooling debt is recorded with exact failure scope rather than hidden.
