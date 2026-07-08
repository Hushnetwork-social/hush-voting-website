# FeatureTasks — FEAT-007: Footer, Utility Pages and Contact Path

## Scope summary

FEAT-007 completes the first public HushVoting website journey by adding the final conversion CTA, semantic footer, conservative utility page scaffolds, and a launch-safe pilot contact path.

Implementation must:

- keep the homepage route as a thin composition layer;
- add a final CTA inside `<main>` after `PlatformReadinessSection` with `id="pilot-access"` so existing hero/nav fragment links resolve;
- implement `Request pilot access` as a native mailto link generated from typed constants;
- visibly mark the pilot contact path as a placeholder/subject-to-review onboarding path;
- render a secondary `Download overview` CTA without a broken `href="#"`; the refined safe interim target is `#protocol` unless an owner-approved static asset or external document is supplied before implementation;
- render a semantic `<footer>` after `</main>` with HushVoting brand context and utility links;
- create `/privacy`, `/terms`, and `/security` route scaffolds with concise pending-review copy that does not imply final legal, terms, privacy, audit, or certification approval;
- centralize CTA copy, mailto configuration, overview behavior, footer links, utility routes, and placeholder copy in typed constants before components;
- use Sovereign Shield surfaces, typography, spacing, radius, focus states, and Button/Card/Section primitives without `border-white` or heavy card-inside-card treatment;
- add focused unit/component and FEAT-007 Gherkin/Playwright coverage without running the entire E2E suite by default; no HushServerNode TwinTest is expected because FEAT-007 is a static public-website surface with no backend/API contract.

Out of scope: contact forms, backend APIs, CRM/email sending, analytics, cookie consent, final legal authoring, completed security audit claims, authenticated app workflows, election execution, verifier execution, and broad FEAT-008 responsive optimization beyond FEAT-007 baseline usability.

## Linked EPIC and acceptance traceability

| Source                     | Requirement                                                                                    | Planned coverage                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| EPIC-001 Success Criteria  | Footer legal/security links and pilot access/contact CTA are present                           | Phases 2-7 define constants, render CTA/footer, integrate routes, and validate links            |
| EPIC-001 Design Source     | Follow prototype layout and Sovereign Shield token contract                                    | Phases 1, 5, and 7 preserve tonal surfaces, spacing, radius, and visual-language tests          |
| FEAT-007 CSS prerequisite  | Sovereign Shield CSS baseline must pass before visual acceptance                               | Phases 0, 1, 6, and 7 verify baseline dependency and stop if stylesheet injection regresses     |
| FEAT-007 Source of Truth   | Typed constants for CTA, footer, utility routes/copy, and mailto config                        | Phase 2 creates typed constants and constants-backed tests before components                    |
| FEAT-007 Final CTA         | `section#pilot-access`, approved heading/description, two buttons, glow card, no white outline | Phases 4-7 implement semantics, styling, integration, and browser assertions                    |
| FEAT-007 Contact Path      | Primary CTA is a keyboard-accessible mailto link with approved placeholder subject/body        | Phases 2, 4, and 7 generate and test mailto href from constants                                 |
| FEAT-007 Download Overview | CTA renders but must not be broken or misleading                                               | Phases 1-2 lock the refined safe interim target `#protocol` unless an approved asset/URL exists |
| FEAT-007 Footer            | Brand, tagline, Privacy/Terms/Security links, responsive layout, label-sm typography           | Phases 2, 4, 5, 6, and 7 implement and test footer contract                                     |
| FEAT-007 Utility Pages     | `/privacy`, `/terms`, `/security` render pending-review scaffold pages with back-home link     | Phases 2, 4, 5, 6, and 7 implement shared shell/routes and route tests                          |
| FEAT-007 Visual Language   | Tokenized surfaces, no `border-white`, hover/focus states, decorative icons aria-hidden        | Phases 5 and 7 apply and test visual/accessibility constraints                                  |
| Lessons FEAT-002           | Prefer tonal surfaces over white borders; use existing UI primitives                           | Phases 4-5 use Button/Card/Section patterns and no structural white borders                     |
| Lessons FEAT-003           | Use anchors for navigation CTAs; keep routes thin; fragment targets stabilize later            | Phases 4 and 6 use native links and provide exact `#pilot-access` anchor                        |
| Lessons FEAT-004           | Audit copy contracts before implementation; decorative icons need `aria-hidden`                | Phases 1, 2, 4, and 7 verify content and icon semantics                                         |
| Lessons FEAT-005           | Constants-first static content; barrel exports; static-section test pattern                    | Phases 2, 4, 6, and 7 follow landing architecture                                               |
| Lessons FEAT-006           | CSS import belongs in root; test CSS runtime baseline; account for SSR streaming               | Phases 0, 6, and 7 confirm CSS baseline remains intact before visual acceptance                 |

## Refinement decisions and assumptions

- **Pilot inbox assumption:** use `hello@hushvoting.com` as the launch-safe owner-assumed inbox unless an owner supplies a different approved destination before Phase 2 completes. The inbox must live in typed constants, not JSX.
- **Download overview decision:** no approved downloadable asset exists in the source documents. The refined safe interim behavior is a secondary link to `#protocol` with constants metadata indicating that the overview asset is pending. If an approved PDF/static asset or external document appears during Phase 1, update `planning-analysis-report.md` and constants before tests are finalized.
- **Placeholder content boundary:** utility page copy must be explicit pending-review scaffold copy and must avoid policy, legal, audit, certification, or production-readiness overclaims.
- **CSS baseline:** FEAT-006 fixed global CSS injection in `__root.tsx`; FEAT-007 must validate that this remains true before visual acceptance.
- **Route contract:** `/privacy`, `/terms`, and `/security` are static TanStack route files and must not introduce loaders, server functions, backend calls, or authentication.
- **Homepage composition:** final CTA belongs inside `<main>` after Platform Readiness; footer belongs outside `<main>` as the document-level footer landmark.
- **Responsive scope:** FEAT-007 must be independently usable on mobile, but full site-wide responsive optimization belongs to FEAT-008.

## Task inventory by phase

| Phase   | Focus              | Key tasks                                                                                                                                                                   | Status    |
| ------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Phase 0 | Health check       | Inspect repository status, source/test structure, CSS baseline dependency, existing FEAT-007 E2E artifacts, and tooling debt                                                | COMPLETED |
| Phase 1 | Planning analysis  | Create `planning-analysis-report.md`; confirm constants contract, overview CTA target, component boundaries, accessibility, responsive, and test strategy                   | COMPLETED |
| Phase 2 | Data layer         | Add typed FEAT-007 constants/types and constants-backed tests for CTA, mailto, overview target, footer links, utility pages, and no broken placeholders                     | COMPLETED |
| Phase 3 | Business logic     | Implement pure mailto href generation and utility-page selection helpers if needed; confirm no backend/contact-form logic is introduced                                     | COMPLETED |
| Phase 4 | Presentation logic | Create/export `FinalCtaSection`, `Footer`, shared utility page shell, and static route components with semantic markup                                                      | COMPLETED |
| Phase 5 | User interface     | Apply Sovereign Shield Button/Card/Section styling, glow card, footer layout, utility page surfaces, responsive stacking, hover/focus, and no-white-border treatment        | COMPLETED |
| Phase 6 | Integration        | Compose CTA/footer into homepage, add `/privacy` `/terms` `/security` routes, update barrel exports/route tree as required, and preserve navigation anchors                 | COMPLETED |
| Phase 7 | Testing and polish | Add/repair unit/component and FEAT-007 browser/Gherkin coverage, validate CSS baseline first, check accessibility/responsive/no-white-border behavior, format changed files | COMPLETED |
| Phase 8 | Final checkpoint   | Verify acceptance traceability, evidence completeness, code-review readiness, documentation consistency, and start-feature/complete-feature handoff quality                 | COMPLETED |

## Dependencies and assumptions

- FEAT-001 scaffold, package scripts, TanStack Start, TypeScript strict mode, Vitest, Testing Library, and Playwright/Gherkin infrastructure remain available.
- FEAT-002 Sovereign Shield tokens and UI primitives remain available, especially `Button`, `Card`, `Section`, `cn`, Material Symbols font integration, token color utilities, and focus styles.
- FEAT-003 Header and Hero already link to `#pilot-access`; FEAT-007 supplies the exact final target without redesigning navigation.
- FEAT-004, FEAT-005, and FEAT-006 sections are already composed on the homepage and establish static-section component, constants, barrel export, and test patterns.
- FEAT-006 CSS root import remains in place. If the CSS runtime baseline fails, implementation must resolve or document that prerequisite before accepting FEAT-007 visuals.
- Existing FEAT-007 E2E files may already be present; implementation should inspect and repair them rather than duplicating scenarios.
- No HushServerNode TwinTest is required for FEAT-007 unless implementation unexpectedly introduces backend/API behavior; if that happens, stop and re-plan before adding E2E coverage.
- Legal/privacy/security owners have not supplied final policy text; launch placeholder copy is intentionally conservative.
- The public website remains static/SSR and does not own authenticated election execution or a backend contact workflow.

## UI, data, API, and integration contracts

### Static data contract

Expected typed constants, preferably in `src/components/landing/constants.ts` or a clearly equivalent module:

- `FINAL_CTA_SECTION`
  - `id`: `pilot-access`
  - `heading`: `Bring protocol-bound voting to your organization.`
  - `description`: `Secure, private, and mathematically verifiable governance at scale.`
  - `placeholderNote`: `Pilot access requests currently open an email draft while onboarding is reviewed.`
  - action labels: `Request pilot access`, `Download overview`
- `PILOT_ACCESS_MAILTO`
  - `to`: `hello@hushvoting.com` unless owner-approved override appears before implementation
  - `subject`: `HushVoting pilot access request`
  - `body`: greeting, request for next review steps, and fields for Organization, Name, Role, Use case
- `DOWNLOAD_OVERVIEW_CTA`
  - label: `Download overview`
  - refined safe interim `href`: `#protocol` unless an approved asset/URL exists
  - metadata/note that overview asset is pending when safe interim behavior is used
- `FOOTER_LINKS`
  - `Privacy Policy` → `/privacy`
  - `Terms of Service` → `/terms`
  - `Security Audit` → `/security`
- `UTILITY_PAGES`
  - `/privacy`: `Privacy Policy`, status `Launch placeholder — final review pending.`, copy that final privacy policy is pending legal/privacy review and scaffold does not represent finalized approval
  - `/terms`: `Terms of Service`, status `Launch placeholder — final review pending.`, copy that final terms are pending legal review and placeholder is not a finalized service agreement
  - `/security`: `Security Audit`, status `Launch placeholder — final review pending.`, copy that security-audit references are pending review and page does not represent completed audit certification or final security approval

### UI contract

- `FinalCtaSection` renders `<section id="pilot-access" aria-labelledby="pilot-access-heading">` or an equivalent accessible section-heading relationship.
- The final CTA card uses `bg-surface-container`, large radius, generous spacing, and `glow-subtle` or equivalent atmospheric treatment; no white structural outline.
- `Request pilot access` is a native `<a>` with `href` beginning `mailto:` and accessible name matching visible text.
- `Download overview` is a native `<a>` using the secondary Button visual treatment and the refined non-broken target.
- Placeholder/subject-to-review copy is visible text, not only a title or screen-reader-only string.
- `Footer` renders a semantic `<footer>` landmark with brand text, tagline `HushVoting! is a product of HushNetwork.`, and a footer navigation region or real links.
- Footer links keep source labels title case for accessible names and apply uppercase visual styling through CSS classes.
- Utility pages use one `h1`, a visible pending-review status, concise body copy, and a visible keyboard-accessible back-home link.
- Utility pages use existing `Section` and `Card` primitives or equivalent tokenized surfaces without heavy nested cards.
- Decorative Material Symbols introduced by this FEAT must include `aria-hidden="true"` when paired with visible text.

### API contract

No backend API, server action, route loader, contact-form submission, CRM integration, email sending service, authentication, authorization, CMS, verifier, evidence lookup, analytics, or cookie-consent contract is introduced by FEAT-007.

### Integration contract

- Homepage section order becomes Header, Hero, Trust Model, Role Workflow, Protocol Evidence, Platform Readiness, Final CTA, then Footer outside `<main>`.
- Existing fragment-only links to `#pilot-access` should work without Header/Hero copy changes unless tests prove a regression.
- New landing components and relevant types/constants are exported through `src/components/landing/index.ts` where consistent with existing patterns.
- TanStack route files for `/privacy`, `/terms`, and `/security` follow the existing `createFileRoute` pattern.
- Tests should import constants wherever practical and avoid duplicating long strings.

## Verification evidence labels

Implementation phases must record declarative evidence labels rather than hardcoded shell commands:

- `repository-health`
- `css-runtime-baseline`
- `planning-analysis-report`
- `typecheck`
- `static-analysis`
- `unit-tests`
- `component-render-tests`
- `route-render-tests`
- `ui-tests`
- `gherkin-e2e`
- `visual-language-baseline`
- `responsive-review`
- `accessibility-review`
- `mailto-contract`
- `utility-route-contract`
- `no-white-border-regression`
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

Implementation workers must not mark a phase complete while any gate remains `missing`. Browser/UI behavior changes require `ui-tests` and/or `gherkin-e2e` evidence or a precise waiver. Production code changes require automated tests or a precise waiver. Code-relevant phases require a persisted code-review report or an explicit risk-based waiver. Refinement seeds gates; implementation owns satisfaction evidence.

## Completion handoff expectations

Before completing FEAT-007 implementation, the worker must ensure:

- the CSS runtime baseline passes before visual acceptance is claimed;
- typed constants exist for final CTA, mailto, overview behavior, footer links, and utility pages;
- homepage has exactly one final CTA target with `id="pilot-access"`;
- primary CTA is a native mailto anchor generated from constants and exposes accessible name `Request pilot access`;
- secondary overview CTA has a documented non-broken target and does not silently use `#`;
- footer renders brand, tagline, and three utility links with tokenized label-sm styling and hover/focus states;
- `/privacy`, `/terms`, and `/security` routes render pending-review scaffold pages and do not 404;
- placeholder copy does not imply final legal/privacy/terms/security/audit approval;
- CTA/footer/utility pages contain no `border-white` and avoid heavy nested cards;
- components/routes stay static and do not introduce backend/contact form behavior;
- component/unit tests and focused FEAT-007 browser/Gherkin tests cover constants, mailto, footer links, utility routes, CSS baseline, visual language, and accessibility-critical semantics, with no giant E2E suite run by default;
- changed source, tests, and MemoryBank docs are formatted;
- phase files contain exact evidence for changed files, tests, E2E/browser coverage, and review decisions;
- any remaining tooling or validation debt is recorded with exact scope and a phase-specific waiver rather than hidden.
