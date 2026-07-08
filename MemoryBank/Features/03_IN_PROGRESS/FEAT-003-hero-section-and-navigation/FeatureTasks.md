# FEAT-003 Feature Tasks - Hero Section and Navigation

**Feature ID:** FEAT-003  
**Parent Epic:** EPIC-001 - HushVoting Website Platform and Initial Design  
**Refinement Status:** Ready handoff generated; implementation phases start as `PENDING`.

## Scope Summary

FEAT-003 replaces the scaffold homepage surface with the public HushVoting website top navigation and hero section only. The implementation must deliver a fixed blurred navigation header, responsive desktop/tablet/mobile navigation behavior, the approved hero headline and subheadline, a token-based brand mark fallback, two hero CTAs, and the restrained purple glow treatment using FEAT-002 Sovereign Shield components/tokens.

The feature must not implement downstream landing-page sections, footer/legal/contact pages, a real pilot-access workflow, authenticated election behavior, backend integrations, analytics, or verifier execution. It may link to planned section anchors owned by later FEATs.

## Linked EPIC / Acceptance Traceability

| Source | Requirement | Planned Evidence Labels |
| --- | --- | --- |
| FEAT-003 AC 1-5 | Fixed blurred top navigation with brand identity, section anchors, and prominent Pilot Access CTA | build, static-analysis, unit-tests, ui-tests, accessibility-review, manual-review-ready |
| FEAT-003 AC 6-10 | Hero brand treatment, approved headline/subheadline, two CTAs, and purple glow | build, unit-tests, ui-tests, design-review-ready, manual-review-ready |
| FEAT-003 AC 11-12 | Responsive desktop/tablet/mobile states and usable mobile navigation | ui-tests, accessibility-review, manual-review-ready |
| FEAT-003 AC 13-14 | Semantic landmarks, heading hierarchy, keyboard reachability, accessible names, menu state | unit-tests, ui-tests, accessibility-review |
| FEAT-003 AC 15-16 | Use FEAT-002 tokens/components and avoid default bright border separation | static-analysis, design-review-ready, manual-review-ready |
| FEAT-003 AC 17 | Verify through the project verification profile and canonical package-script labels | build, static-analysis, typecheck, unit-tests, affected-tests, ui-tests, full-verification |
| EPIC-001 Success Criteria | Landing page communicates product value proposition and exposes anchors for Trust Model, Roles, Protocol Evidence, Platform | ui-tests, manual-review-ready |
| EPIC-001 Dependency Flow | FEAT-003 depends on FEAT-002 and provides nav/hero foundation for FEAT-007 and FEAT-008 | integration-contract-review, manual-review-ready |
| FEAT-001/002 Lessons Learned | Use canonical verification labels, keep Tailwind import/script contracts stable, prefer tonal surfaces over borders | static-analysis, design-review-ready, full-verification |

## Refinement Decisions and Contracts

| Topic | Decision |
| --- | --- |
| Pilot Access interim target | Use `#pilot-access` as the documented temporary CTA target. FEAT-003 must not create a fake form or imply submission success. FEAT-007 owns the real contact section/path and will add the matching target or replace the href. |
| Hero secondary CTA target | Use `#protocol` for `View verifier model`; FEAT-006 owns the eventual Protocol Evidence section. |
| Section anchor targets | Navigation links target `#trust`, `#roles`, `#protocol`, and `#platform`. FEAT-003 must not implement the downstream sections. Missing anchors must not crash or throw route errors. |
| Brand asset | Use a token-based HushVoting brand mark fallback. Do not load external prototype image URLs. Do not copy prototype assets into production unless an approved local asset is supplied and recorded during planning. |
| Mobile navigation pattern | Use a simple accessible non-modal disclosure panel by default. The trigger must expose `aria-expanded` and `aria-controls`; links must remain keyboard reachable and close the menu after activation. |
| Fixed-header anchor strategy | Add or document a shared scroll-margin/scroll-padding strategy so later section headings are not hidden by the fixed header. |
| Component boundary | Prefer FEAT-002 `Button` for true buttons; use native anchors styled consistently for links/CTAs. If a reusable link-button primitive is introduced, document the contract in the planning report and avoid breaking existing `Button` semantics. |

## Phase Inventory

| Phase | Name | Status | Primary Output |
| --- | --- | --- | --- |
| 0 | Health Check | COMPLETED | Baseline repo, FEAT, design-system, and scope sanity check |
| 1 | Planning Analysis | COMPLETED | `planning-analysis-report.md` with final implementation contracts |
| 2 | Data Layer | COMPLETED | Static content/link constants, anchor contract, brand asset/fallback decision record |
| 3 | Business Logic | COMPLETED | Navigation/menu state behavior and CTA/link interaction contracts |
| 4 | Presentation Logic | COMPLETED | Semantic route/component structure and accessibility behavior |
| 5 | User Interface | COMPLETED | Responsive nav/hero visuals, glow, tonal surfaces, and focus/touch states |
| 6 | Integration | COMPLETED | Homepage integration, future-section anchor compatibility, stable exports/imports |
| 7 | Testing & Polish | COMPLETED | Unit/UI/E2E coverage and responsive/accessibility polish evidence |
| 8 | Final Checkpoint | COMPLETED | Acceptance traceability, quality-gate review, and implementation handoff |

## Task Inventory by Phase

### Phase 0 - Health Check

- Confirm FEAT-003 is still in the expected workflow folder and contains no unresolved validation markers.
- Confirm FEAT-001 scaffold and FEAT-002 design-system outputs are available: TanStack Start root route, global styles, UI primitives, test setup, README verification profile, and lessons learned.
- Inspect `src/routes/index.tsx`, `src/components/ui/`, `styles/app.css`, and existing tests for current scaffold contracts and conflicts.
- Confirm no approved production logo exists before relying on a local asset; default to the token-based brand mark fallback.
- Record blockers before source changes begin.

### Phase 1 - Planning Analysis

- Create `planning-analysis-report.md` as the canonical implementation plan.
- Record the final component/file boundary for `TopNavigation`, `HeroSection`, `BrandMark`, mobile disclosure behavior, CTA link constants, and tests.
- Record how `Button` is used for true buttons and how anchor CTAs are styled accessibly without invalid button/link nesting.
- Record the temporary pilot-access target (`#pilot-access`) and the downstream owner handoff to FEAT-007.
- Record the scroll-margin/scroll-padding strategy for fixed-header anchors.
- Define unit, accessibility, and browser UI test coverage without embedding executable commands.
- Later phases must read and update `planning-analysis-report.md` whenever implementation reality changes a contract that future phases consume.

### Phase 2 - Data Layer

- Define static navigation item data for Trust Model, Roles, Protocol Evidence, and Platform with labels and hrefs.
- Define CTA data for Pilot Access / Request pilot access and View verifier model.
- Define approved hero copy exactly as specified by FEAT-003 design artifacts.
- Define brand mark data/semantics for the token-based fallback.
- Keep data local/static; do not add CMS, backend, environment, analytics, or persistence behavior.

### Phase 3 - Business Logic

- Implement the mobile navigation disclosure state with deterministic open/close behavior.
- Ensure nav links and Pilot Access CTA close the mobile menu after activation.
- Add Escape-key close behavior if the selected implementation behaves like a drawer/panel that remains open over content.
- Ensure link activation to missing planned anchors is safe and does not throw route errors.
- Keep CTA behavior as navigation only; no submission side effects.

### Phase 4 - Presentation Logic

- Compose the homepage with semantic `<header>`, `<nav aria-label="Primary">`, `<main>`, and hero `<section>` landmarks.
- Ensure the hero contains one page-level `<h1>` with the approved headline.
- Use native anchors for navigation and link CTAs; use native buttons only for toggles/actions such as the mobile menu trigger.
- Apply accessible names, `aria-expanded`, `aria-controls`, decorative mark/glow semantics, and logical tab order.
- Preserve SSR/static rendering without requiring client-only content for the core hero copy.

### Phase 5 - User Interface

- Apply fixed blurred/translucent navigation treatment using Sovereign Shield tokens and tonal separation.
- Apply responsive desktop/tablet/mobile layouts with a centered hero, bounded text measure, comfortable CTA rhythm, and 48px-friendly mobile touch targets.
- Implement the token-based brand mark fallback and restrained purple glow without reducing text contrast.
- Use FEAT-002 tokens/components/classes; avoid white outline borders as default layout separation.
- Add visible focus states and reduced-motion-safe transition/glow behavior where transitions are used.

### Phase 6 - Integration

- Replace scaffold homepage content without expanding into later landing sections.
- Ensure global styles are loaded once and fixed-header scroll behavior is available to future sections.
- Keep imports through stable FEAT-002 public component surfaces where practical.
- Ensure FEAT-003 does not break existing design-system tests or scaffold route contracts.
- Record any new component export boundary if future FEATs should reuse the navigation, hero, or brand mark.

### Phase 7 - Testing & Polish

- Add/update unit tests for approved hero copy, nav link labels/hrefs, CTA labels/hrefs, brand fallback rendering, and mobile menu state attributes.
- Add/update browser UI happy-path coverage for homepage/nav/hero visibility and mobile disclosure behavior where the project pattern supports it.
- Add accessibility-focused assertions for landmarks, heading hierarchy, accessible names, and keyboard-reachable controls where practical.
- Polish responsive spacing, contrast, focus states, reduced-motion behavior, and content line lengths.
- Validate through project evidence labels: build, static-analysis, typecheck, unit-tests, affected-tests, ui-tests, design-review-ready, and manual-review-ready.

### Phase 8 - Final Checkpoint

- Confirm every FEAT-003 acceptance criterion is traced to implementation files, test files, and evidence labels.
- Confirm `planning-analysis-report.md` reflects final implementation reality.
- Confirm no downstream sections, contact form, backend integration, analytics, or verifier execution were added.
- Confirm phase quality gates are satisfied, not applicable, or explicitly waived with phase-specific justification.
- Prepare final handoff notes for completion review, including exact changed paths and any FEAT-007/FEAT-008 follow-up contracts.

## Dependencies and Assumptions

- FEAT-001 is completed and provides the TanStack Start, Tailwind v4, TypeScript, Vitest, Playwright/Gherkin, and package-script foundation.
- FEAT-002 is completed and provides Sovereign Shield tokens/components plus visual-language lessons.
- No approved production logo asset is present at refinement time; implementation should use the token-based brand mark fallback unless planning records a newly approved local asset.
- FEAT-004 through FEAT-006 will add the real section targets for `#trust`, `#roles`, `#protocol`, and `#platform`.
- FEAT-007 owns the real pilot-access/contact destination and will replace or satisfy `#pilot-access`.
- FEAT-008 will perform full-site responsive optimization, but FEAT-003 must still be responsive for its own nav/hero scope.

## Verification Evidence Labels

Implementation workers must record evidence using declarative labels, not hardcoded commands:

- build
- static-analysis
- typecheck
- unit-tests
- affected-tests
- ui-tests
- accessibility-review
- design-review-ready
- integration-contract-review
- manual-review-ready
- full-verification

## Phase Quality-Gate Policy

Implementation cannot complete a phase until every gate in that phase file is satisfied, not applicable, or explicitly waived with a phase-specific justification. Production code changes require automated test evidence or a precise waiver. Browser/UI behavior changes require Gherkin/Playwright E2E evidence or a precise waiver explaining why unit, contract, or integration coverage is enough. Code-relevant phases require a persisted review report or a precise waiver with an explicit risk rationale.

## UI, Data, API, and Integration Contracts

- **UI contract:** Header/nav/hero must use semantic landmarks, approved copy, tokenized visual styles, accessible controls, responsive states, and visible focus behavior.
- **Data contract:** Static in-repo constants only for nav labels/hrefs, CTA labels/hrefs, and hero copy; no external data loading.
- **API contract:** No API, backend, analytics, authentication, or live verifier contract is introduced by FEAT-003.
- **Integration contract:** Homepage route remains `/`; planned anchors are stable (`#trust`, `#roles`, `#protocol`, `#platform`, `#pilot-access`); future FEATs may satisfy the anchors without changing FEAT-003 labels.

## Blockers

No blocker remains after refinement. The interim Pilot Access target, brand fallback, missing-anchor behavior, and mobile menu pattern are decided above for implementation planning.
