# FeatureTasks — FEAT-008: Responsive Design and Mobile Optimization

## Scope summary

FEAT-008 is a targeted responsive audit and patch pass over the existing HushVoting public website. It must preserve approved content, section intent, and current component boundaries while fixing breakpoint, spacing, typography, touch-target, accessibility, and visual-language defects across mobile, tablet, and desktop.

Implementation must:

- validate that the Sovereign Shield CSS runtime baseline is loaded before any responsive acceptance is claimed;
- audit the current homepage and utility surfaces before patching, recording pre-existing source/test state separately;
- keep the homepage route as a thin composition layer and keep section-specific logic in existing landing components;
- update navigation breakpoints so mobile/tablet use hamburger disclosure through 1023px and inline nav starts at 1024px;
- preserve the existing mobile disclosure accessibility model: native button, `aria-expanded`, Escape-to-close, focus restoration, hidden panel removed from the accessibility tree while closed, and one inner primary navigation landmark;
- use `bg-surface-container-low` plus a subtle `border-t border-outline-variant` only for the approved mobile/tablet disclosure divider;
- ensure no `border-white` appears in source or rendered DOM at any tested viewport;
- ensure all interactive links/buttons expose at least 48px height and width or equivalent interactive padding, including desktop nav and footer links;
- preserve and verify fluid tokenized typography, section gutters, wrapping behavior, and no horizontal overflow at narrow viewports;
- preserve existing landing copy and static constants unless a focused responsive/accessibility defect requires a narrow change;
- update or repair existing FEAT-008 Playwright/Gherkin artifacts instead of duplicating partial downstream files;
- expose canonical package-level validation entry points for the CSS baseline and FEAT-008 responsive viewport checks without hardcoding shell commands in phase documents;
- add bounding-box and computed-style browser assertions for the acceptance matrix;
- avoid a broad redesign, new sections, backend behavior, analytics, authentication, or any HushVoting election-execution workflow.

Out of scope: new marketing copy, new product sections, replacing the design system, final logo asset delivery, contact-form/backend/API work, authenticated election flows, verifier execution, analytics/cookie consent, and broad CI/CD/deployment work.

## Linked EPIC and acceptance traceability

| Source                     | Requirement                                                                                          | Planned coverage                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| EPIC-001 Success Criteria  | Website is fully responsive on desktop, tablet, and mobile                                           | Phases 1, 4, 5, 6, and 7 audit, patch, integrate, and validate the responsive matrix                        |
| EPIC-001 Success Criteria  | Navigation to Trust Model, Roles, Protocol Evidence, and Platform works through top nav              | Phases 4, 6, and 7 preserve anchors while correcting mobile/tablet/desktop disclosure behavior              |
| EPIC-001 Visual Language   | Sovereign Shield token contract and HushVoting visual-language rules                                 | Phases 1, 5, and 7 verify tonal surfaces, focus states, no `border-white`, and no heavy nested cards        |
| FEAT-008 CSS prerequisite  | CSS baseline must pass before responsive scenarios                                                   | Phases 0, 1, 6, and 7 require `css-runtime-baseline` and `visual-language-baseline` evidence first          |
| FEAT-008 Navigation        | Mobile/tablet hamburger below 1024px; desktop inline nav at 1024px+                                  | Phases 4, 5, 6, and 7 patch `Header`/`MobileNavDisclosure` and assert 375px, 768px, 1024px, 1440px behavior |
| FEAT-008 Layouts           | Trust, Roles, Protocol Evidence, Platform Readiness, Claim Boundary, Footer stack/grid correctly     | Phases 1, 5, 6, and 7 inspect current components, patch grids/wrapping, and assert bounding boxes           |
| FEAT-008 Spacing           | 16px mobile gutters and 24px desktop gutters or equivalent tokens                                    | Phases 5 and 7 verify section padding using computed-style assertions                                       |
| FEAT-008 Typography        | H1/body/section headings use tokenized fluid scaling and remain readable at 320px                    | Phases 5 and 7 preserve clamp rules and assert computed font sizes/line heights                             |
| FEAT-008 Touch targets     | All interactive elements expose 48px touch/click targets and focus-visible rings                     | Phases 4, 5, and 7 patch links/buttons and assert bounding boxes/focus behavior                             |
| FEAT-008 Visual language   | No `border-white`; use tonal hierarchy; no heavy mobile card stacking                                | Phases 5 and 7 run source/DOM scans and computed-style checks across viewports                              |
| FEAT-008 Validation matrix | CSS baseline first; mobile/tablet/desktop viewport scenarios; bounding-box and computed-style checks | Phases 2, 3, and 7 create/update scripts and Playwright coverage                                            |
| Lessons FEAT-002           | Prefer tonal surface fills over structural borders                                                   | Phases 1, 5, and 7 use fill/spacing/radius and restrict borders to approved states/divider                  |
| Lessons FEAT-003           | Preserve mobile disclosure accessibility; use native anchors for navigation/CTAs                     | Phases 4 and 7 keep one nav landmark, invisible closed panel, and anchor semantics                          |
| Lessons FEAT-004           | Audit content contracts before implementation; keep fragment IDs exact                               | Phase 1 confirms no copy drift and Phase 6 verifies section IDs match existing nav links                    |
| Lessons FEAT-005           | Constants-first/static-section patterns and existing downstream E2E files                            | Phases 1, 2, and 7 inspect constants and repair existing responsive tests rather than duplicating           |
| Lessons FEAT-006           | Global CSS must import from root; account for SSR/CSS runtime behavior                               | Phases 0, 1, 6, and 7 verify CSS injection before browser visual assertions                                 |
| Lessons FEAT-007           | External protocol/link semantics and footer/mobile wrapping expectations                             | Phases 5 and 7 validate CTA/footer anchors, wrapping, focus states, and target dimensions                   |

## Refinement decisions and assumptions

- **Implementation posture:** audit-and-patch, not redesign. Preserve current content, constants, component ownership, and section order unless a responsive or accessibility acceptance criterion forces a narrow change.
- **Navigation breakpoint:** desktop navigation and nav CTA begin at the large breakpoint/1024px equivalent. Mobile/tablet disclosure remains active below that range.
- **Mobile disclosure treatment:** `bg-surface-container-low` with `border-t border-outline-variant` is the only approved divider treatment for the disclosure panel. `border-white` is prohibited.
- **CSS baseline:** FEAT-006 established root-level CSS import. If the baseline fails, implementation must stop responsive acceptance and fix or escalate the CSS prerequisite first.
- **Hero mark:** the current token-based `BrandMark` is acceptable; FEAT-008 may add contextual sizing for the hero mark to satisfy computed-dimension acceptance, but does not wait for a final logo asset.
- **Responsive logo acceptance:** header mark remains compact; hero mark should have an intentional larger mobile/tablet/desktop size or an equivalent computed dimension justified in `planning-analysis-report.md`.
- **Manual devices:** Playwright viewport emulation is sufficient for canonical automated checks; manual/device review should be recorded as `manual-review-ready` or waived with a precise scope reason when physical devices are unavailable.
- **E2E ownership:** this repository owns the focused public-website Playwright/Gherkin coverage for FEAT-008. No HushServerNode TwinTest is expected because FEAT-008 changes static public UI behavior only and no backend/API contract.
- **Existing untracked files:** `tests/e2e/features/responsive-layout.feature` and `tests/e2e/responsive-layout.spec.ts` may already exist from earlier sessions. Treat them as FEAT-008 artifacts to inspect, repair, and integrate.
- **Lint debt:** the known ESLint v9 configuration gap is pre-existing. If static-analysis remains blocked by missing config, record a phase-specific waiver and use typecheck/build/unit/browser evidence rather than hiding the debt.

## Task inventory by phase

| Phase   | Focus              | Key tasks                                                                                                                                                           | Status    |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Phase 0 | Health check       | Inspect git status, FEAT artifacts, current source/tests, CSS import placement, existing responsive E2E files, and known tooling debt                               | COMPLETED |
| Phase 1 | Planning analysis  | Create `planning-analysis-report.md`; document current responsive defects, source contracts, target files, acceptance mapping, and test strategy                    | COMPLETED |
| Phase 2 | Data layer         | Add/update typed viewport, selector, breakpoint, and responsive validation metadata/constants used by tests or components                                           | COMPLETED |
| Phase 3 | Business logic     | Add/update pure helper logic for responsive test assertions, class composition, touch-target measurement support, and safe breakpoint mapping where needed          | COMPLETED |
| Phase 4 | Presentation logic | Patch component behavior and semantic markup, especially `Header`, `MobileNavDisclosure`, `HeroSection`, link semantics, IDs, and accessibility state               | COMPLETED |
| Phase 5 | User interface     | Patch tokenized classes for grids, gutters, typography, hero/logo sizing, wrapping, touch targets, focus states, and approved mobile disclosure surface             | PENDING   |
| Phase 6 | Integration        | Compose and verify homepage/route-level contracts, package-level validation scripts, FEAT-008 E2E integration, generated route artifacts, and CSS baseline ordering | PENDING   |
| Phase 7 | Testing and polish | Expand/repair unit/component and Playwright/Gherkin coverage for the viewport matrix, computed styles, bounding boxes, visual language, and formatting              | PENDING   |
| Phase 8 | Final checkpoint   | Confirm acceptance traceability, phase evidence, code-review readiness, documentation consistency, and handoff quality before complete-feature                      | PENDING   |

## Dependencies and assumptions

- FEAT-001 scaffold, TanStack Start, TypeScript strict mode, Vitest, Testing Library, Playwright, and Gherkin feature-file conventions remain available.
- FEAT-002 Sovereign Shield tokens, UI primitives, `cn`, Material Symbols font integration, focus-ring patterns, and no-white-border rule remain the styling baseline.
- FEAT-003 Header, Hero, navigation constants, CTA anchors, and mobile disclosure are the starting point for breakpoint/accessibility patches.
- FEAT-004, FEAT-005, FEAT-006, and FEAT-007 sections are already composed on the homepage and establish exact fragment IDs, component boundaries, and static-section tests.
- FEAT-006 root CSS import remains in `src/routes/__root.tsx`; route-level global CSS imports should not be reintroduced.
- FEAT-007 footer and utility routes remain static and should be included in touch-target/focus checks where they expose links.
- The public website stays static/SSR and does not introduce backend, API, authentication, election execution, or contact-form behavior.
- Browser behavior must be validated with focused FEAT-008 tests and not by running all E2E categories as one giant suite by default.

## UI, data, API, and integration contracts

### UI contract

- `Header` exposes a compact brand link, primary desktop nav, desktop Pilot Access CTA, and mobile/tablet disclosure without duplicate primary navigation landmarks in the same visible mode.
- Desktop nav and CTA are hidden below 1024px and visible at 1024px+. Hamburger disclosure is visible below 1024px and hidden at 1024px+.
- `MobileNavDisclosure` uses a native `<button>` with `aria-expanded`, `aria-controls`, Escape close, outside-click close, link-activation close, and focus restoration to the trigger.
- Closed mobile/tablet disclosure content is not visible, not pointer-interactive, and removed from the accessibility tree using visibility/display-equivalent behavior.
- Open mobile/tablet disclosure surface uses the approved tonal fill and subtle outline-variant top divider only.
- Navigation links, CTAs, utility links, footer links, and other anchors/buttons expose visible focus rings and at least 48px target dimensions or equivalent padding.
- Hero headline, body/subheadline, and section headings use tokenized fluid scaling and remain readable at 320px.
- Hero brand mark has contextual sizing suitable for the hero, separate from the compact header mark.
- Role Workflow grid is 1 column on mobile, 2 columns on tablet, and 4 columns on desktop.
- Protocol Evidence items stack on mobile and render in two columns on desktop.
- Platform Readiness cards stack on mobile and render in three columns on desktop where width permits.
- Claim Boundary badges wrap cleanly and never create horizontal overflow.
- Footer stacks/wraps on mobile and renders side-by-side on desktop while preserving 48px link targets.
- No `border-white` class is present in source or rendered DOM; borders remain limited to focus/state treatment and the approved mobile nav divider.

### Data and test metadata contract

If implementation introduces or updates static metadata, it should live near existing landing constants or test helpers and remain typed. Expected metadata may include:

- canonical breakpoint labels and viewport sizes: 320, 375, 768, 1024, 1440, and optionally 1920 widths;
- canonical navigation labels and section IDs imported from existing constants where possible;
- expected layout column counts for Role Workflow, Protocol Evidence, and Platform Readiness by viewport class;
- expected design-token computed values or acceptable ranges for gutters, touch targets, typography, and surfaces;
- no-white-border selector/source-scan expectations shared by tests.

### API contract

No backend API, route loader, server action, contact submission, HushServerNode call, authentication, authorization, analytics, CMS, verifier lookup, evidence lookup, or election workflow contract is introduced by FEAT-008.

### Integration contract

- Homepage section order and fragment IDs remain stable: hero, `#trust`, `#roles`, `#protocol`, `#platform`, `#pilot-access`, and footer/utility links.
- Existing components remain exported through `src/components/landing/index.ts` if component signatures change or new helpers are shared.
- Package-level validation entry points distinguish the CSS baseline from FEAT-008 responsive viewport checks so implementation and CI can run them in the required order.
- Existing FEAT-008 Gherkin feature/spec files are updated in place and tagged with `@FEAT-008` / visual-language tags as appropriate.
- Tests should use semantic locators and constants where practical, falling back to computed-style and bounding-box helpers for visual/layout assertions.

## Verification evidence labels

Implementation phases must record declarative evidence labels rather than hardcoded shell commands:

- `repository-health`
- `css-runtime-baseline`
- `planning-analysis-report`
- `source-audit`
- `typecheck`
- `static-analysis`
- `unit-tests`
- `component-render-tests`
- `route-render-tests`
- `ui-tests`
- `gherkin-e2e`
- `visual-language-baseline`
- `responsive-viewport-matrix`
- `computed-style-checks`
- `bounding-box-checks`
- `touch-target-checks`
- `focus-visible-checks`
- `no-horizontal-overflow`
- `no-white-border-regression`
- `accessibility-review`
- `responsive-review`
- `format-check`
- `build`
- `manual-review-ready`
- `code-review`
- `full-verification`

## Phase quality-gate policy

A phase cannot be marked complete until every gate in that phase file is one of:

- `satisfied`, with exact evidence paths and verification labels recorded by the implementation worker;
- `not applicable`, with a phase-specific reason explaining why the gate does not apply;
- `waived`, with a phase-specific risk rationale and owner/agent justification.

Implementation workers must not mark a phase complete while any gate remains `missing`. Browser/UI behavior changes require `ui-tests`, `gherkin-e2e`, `responsive-viewport-matrix`, and/or precise waiver evidence. Production code changes require automated tests or a precise waiver. Code-relevant phases require a persisted code-review report or an explicit risk-based waiver. Refinement seeds gates; implementation owns satisfaction evidence.

## Completion handoff expectations

Before completing FEAT-008 implementation, the worker must ensure:

- CSS runtime baseline evidence is recorded before FEAT-008-specific responsive acceptance;
- `planning-analysis-report.md` exists and records source audit, breakpoint decisions, accepted assumptions, and changed contracts;
- navigation uses hamburger disclosure through tablet widths and inline nav at desktop widths;
- mobile disclosure uses approved surface/divider classes and never `border-white`;
- all links/buttons expose 48px touch targets or equivalent padding and visible focus rings;
- 320px and 375px mobile widths have no horizontal overflow and readable typography;
- Role Workflow, Protocol Evidence, Platform Readiness, Claim Boundary, Final CTA, and Footer layout behavior matches the acceptance matrix;
- package-level validation entry points exist for CSS baseline first and FEAT-008 responsive checks second;
- focused Gherkin/Playwright scenarios cover mobile, tablet, desktop, no-white-border, padding, typography, touch targets, computed styles, and bounding boxes;
- no backend/API/election workflow behavior was introduced;
- no source or rendered DOM contains `border-white`;
- changed source, tests, and MemoryBank docs are formatted;
- phase files contain exact evidence for changed files, tests, E2E/browser coverage, and review decisions;
- any remaining manual-device or tooling debt is recorded with phase-specific waiver rationale rather than hidden.
