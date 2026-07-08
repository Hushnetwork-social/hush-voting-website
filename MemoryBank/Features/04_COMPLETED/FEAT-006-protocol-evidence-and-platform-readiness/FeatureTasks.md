# FeatureTasks — FEAT-006: Protocol Evidence and Platform Readiness

## Scope summary

FEAT-006 resolves the runtime Sovereign Shield stylesheet loading gap, then adds the public homepage Protocol Evidence and Platform Readiness sections.

Implementation must preserve a narrow public-website boundary:

- fix root/app-level CSS injection so the browser emits the built stylesheet link and computed Sovereign Shield baseline values are present before section work proceeds;
- add a semantic `#protocol` section after the Role Workflow section with Protocol Omega narrative copy, the verified protocol badge, and exactly six evidence items from a typed content contract;
- add a semantic `#platform` section with three deployment readiness cards and a five-badge claim boundary bar from the same typed content contract;
- keep the homepage route as a thin composition layer using landing components and barrel exports;
- use Sovereign Shield tokenized surfaces, typography, spacing, radius, and Material Symbols without white structural borders or heavy nested cards;
- add scoped unit/component coverage and tagged browser coverage for the CSS prerequisite, content contracts, anchors, rendered sections, claim badges, decorative icons, responsive layout, and no-white-border regression;
- avoid backend APIs, live cryptographic proof generation, authenticated election workflows, verifier execution, evidence downloads, legal/compliance certification claims, navigation redesign, and FEAT-007/FEAT-008 scope.

## Linked EPIC and acceptance traceability

| Source                          | Requirement                                                                                                       | Planned coverage                                                                                              |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| EPIC-001 Success Criteria       | Landing page communicates protocol evidence capabilities and platform readiness                                   | Phases 2-6 define, render, style, and integrate Protocol Evidence and Platform Readiness sections             |
| EPIC-001 Navigation Criterion   | Navigation to Protocol Evidence and Platform anchors works via top nav                                            | Phases 1 and 6 verify existing fragment links and supply exact `#protocol`/`#platform` targets                |
| FEAT-006 CSS prerequisite       | Browser document head contains a stylesheet link for the built Sovereign Shield CSS asset                         | Phases 1, 3, 6, and 7 plan, fix, integrate, and validate root/app-level stylesheet injection                  |
| FEAT-006 CSS prerequisite       | Core CSS variables and body/hero computed styles resolve at runtime                                               | Phases 3 and 7 require computed-style browser validation before accepting sections                            |
| FEAT-006 Protocol Evidence      | `section#protocol` renders with heading `Protocol Omega`, left narrative, badge, and right evidence grid          | Phases 2, 4, 5, 6, and 7 define data, component markup, styling, composition, and tests                       |
| FEAT-006 Protocol Evidence      | Exactly six evidence items render in approved order with decorative Material Symbol icons and uppercase labels    | Phases 2, 4, 5, and 7 centralize constants and assert content count, order, labels, icons, and accessibility  |
| FEAT-006 Protocol Evidence      | Evidence items use `InsetWell`/recessed fill and full-width `bg-surface-container-low` band without white borders | Phases 4, 5, and 7 use existing UI primitives/token classes and test rendered markup/style regression         |
| FEAT-006 Platform Readiness     | `section#platform` renders heading `Universal Deployment Readiness` and three deployment cards                    | Phases 2, 4, 5, 6, and 7 define the readiness contract and verify the card grid                               |
| FEAT-006 Claim Boundary         | Five exact claim badges render with Material Symbols using `FILL 1`                                               | Phases 2, 4, 5, and 7 define data, component markup, icon fill configuration, and tests                       |
| FEAT-006 Component Architecture | Landing components, typed static constants, barrel exports, and thin homepage route                               | Phases 2, 4, and 6 update `src/components/landing/` and route composition without inline implementation logic |
| FEAT-006 Visual Language        | Tokenized colors/fonts/spacing, no `border-white`, tonal fills before borders, no heavy card nesting              | Phases 1, 5, and 7 apply design rules and regression coverage                                                 |
| FEAT-006 E2E                    | Gherkin/Playwright coverage for visual baseline, protocol, platform, and claims                                   | Phase 7 owns tagged browser coverage and prerequisite ordering                                                |
| Lessons FEAT-002                | Prefer tonal surfaces over bright borders; test React components with jsdom/render utilities                      | Phases 5 and 7 reuse tonal UI primitives and component-test infrastructure                                    |
| Lessons FEAT-003                | Keep homepage route thin; fragment-only anchors work when matching sections exist                                 | Phases 4 and 6 add components and exact anchors without navigation rewrites                                   |
| Lessons FEAT-004                | Audit copy contracts before implementation; mark text-accompanied icons decorative                                | Phases 1, 2, 4, and 7 verify static content and `aria-hidden` icons                                           |
| Lessons FEAT-005                | Create typed constants before components; use barrel exports; reuse static-section test patterns                  | Phases 2, 4, 6, and 7 follow the existing landing architecture                                                |

## Final refinement decisions

- CSS loading is the blocking first implementation concern. No Protocol Evidence or Platform Readiness acceptance can be claimed until the runtime stylesheet link and computed Sovereign Shield baseline pass.
- The static content source of truth is the FEAT-006 `FeatureDescription.md` / design-summary contract, not older prototype evidence labels.
- FEAT-006 content lives with existing landing content, preferably `src/components/landing/constants.ts`, using typed arrays for protocol evidence items, deployment readiness cards, and claim boundary badges.
- Components should be placed under `src/components/landing/` as `ProtocolEvidenceSection`, `PlatformReadinessSection`, and a separate or locally scoped `ClaimBoundaryBar`.
- `ClaimBoundaryBar` may be exported separately only if useful for testing/reuse; it remains visually part of the Platform Readiness area.
- Evidence items, readiness cards, and claim badges are static, non-interactive information surfaces. They must not be links, buttons, modal triggers, tooltips, backend calls, or focus targets in this FEAT.
- Material Symbol icons are decorative when visible labels are present; claim badge icons must use filled icon styling (`FILL 1`) without adding redundant screen-reader names.
- The homepage route should import from the landing barrel and compose existing sections plus FEAT-006 sections in order: Header, Hero, Trust Model, Role Workflow, Protocol Evidence, Platform Readiness.
- Browser tests for FEAT-006 should treat the visual-language baseline as a prerequisite. If the baseline fails while unit/component tests pass, investigate root CSS/framework integration before component styling.
- If the known ESLint flat-config tooling gap still exists, implementation must record exact static-analysis evidence and use a precise phase-specific waiver or safe fix only if explicitly within scope.

## Task inventory by phase

| Phase   | Focus              | Key tasks                                                                                                                                                          | Status    |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| Phase 0 | Health check       | Inspect repo status, current CSS injection behavior, existing landing components, tests, untracked E2E artifacts, design-system primitives, and known tooling debt | COMPLETED |
| Phase 1 | Planning analysis  | Create `planning-analysis-report.md`, confirm source-of-truth copy, CSS prerequisite plan, component boundaries, accessibility, responsive strategy, and test plan | COMPLETED |
| Phase 2 | Data layer         | Add typed FEAT-006 constants/types for protocol evidence, protocol badge, deployment cards, and claim badges in approved order                                     | COMPLETED |
| Phase 3 | Business logic     | Resolve root/app-level stylesheet injection and confirm no dynamic protocol/backend/election workflow logic is introduced                                          | COMPLETED |
| Phase 4 | Presentation logic | Create/export semantic landing components with section anchors, lists, heading relationships, decorative icons, and non-focusable informational markup             | COMPLETED |
| Phase 5 | User interface     | Apply Sovereign Shield section band, recessed wells, cards, claim bar, typography, spacing, responsive grids, icon styling, and no-white-border policy             | COMPLETED |
| Phase 6 | Integration        | Compose FEAT-006 sections after Role Workflow, preserve Header/navigation behavior, wire barrel exports, and confirm CSS fix works in application runtime          | COMPLETED |
| Phase 7 | Testing and polish | Add/update unit/component tests and tagged browser/Gherkin coverage, validate CSS baseline first, check responsive/no-white-border behavior, format changed files  | COMPLETED |
| Phase 8 | Final checkpoint   | Verify acceptance traceability, evidence completeness, documentation consistency, review readiness, and start-feature handoff quality                              | COMPLETED |

## Dependencies and assumptions

- FEAT-001 scaffold, TanStack Start runtime, Vite/Tailwind build pipeline, TypeScript strict mode, Vitest, and Playwright infrastructure remain in place.
- FEAT-002 Sovereign Shield tokens and UI primitives remain available, especially `Card`, `InsetWell`, `cn`, Material Symbols font integration, and token utility classes.
- FEAT-003 Header already contains fragment-only links for `#protocol` and `#platform`; FEAT-006 supplies targets and does not redesign navigation.
- FEAT-004 and FEAT-005 are already composed on the homepage and establish section order, spacing rhythm, static-section component patterns, and unit-test conventions.
- FEAT-006 owns the CSS stylesheet injection fix because the design cannot be validated while Tailwind/token CSS is inert in the browser.
- Existing downstream E2E files for FEAT-006 may already be present from earlier work; implementation should inspect and repair them rather than blindly duplicate coverage.
- FEAT-008 will perform broader site-wide responsive optimization, but FEAT-006 sections must still be responsive and usable independently.
- Public website content remains static and informational; authenticated election execution, live evidence review, proof generation, and protocol APIs remain outside this repository/FEAT.

## UI, data, API, and integration contracts

### UI contract

- `ProtocolEvidenceSection` renders `<section id="protocol" aria-labelledby="protocol-heading">` or an equivalent accessible section-heading relationship.
- Protocol heading text is `Protocol Omega` and should be an `h2` because the homepage `h1` is owned by the hero.
- Protocol content uses a left narrative column and right evidence list/grid on desktop, stacking on smaller viewports.
- Protocol section uses a full-width tonal band equivalent to `bg-surface-container-low`.
- Evidence items use `InsetWell` or equivalent recessed tonal fill, no `border-white`, decorative Material Symbol icon spans, and uppercase visible labels.
- Protocol badge label is exactly `100% Mathematically Verifiable` with `verified` icon.
- `PlatformReadinessSection` renders `<section id="platform" aria-labelledby="platform-heading">` or an equivalent accessible section-heading relationship.
- Platform heading text is `Universal Deployment Readiness` and should be an `h2`.
- Deployment cards render as informational list items/cards with icon, `h3` headline, and approved description.
- `ClaimBoundaryBar` renders five claim badges as a list or equivalent semantic group; icons are filled Material Symbols and decorative.
- FEAT-006 surfaces are not interactive and must not introduce `button`, `a`, click handlers, route links, modal triggers, or `tabIndex` wrappers.
- Use established `section-anchor` offset behavior so fixed navigation does not cover fragment targets.

### Static data contract

Protocol evidence items, in order:

| Key                     | Label                  | Icon           | Description intent                                                                                     |
| ----------------------- | ---------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `cryptographicReceipts` | Cryptographic Receipts | `receipt_long` | Evidence that voting activity can produce voter-verifiable receipts without exposing vote choices.     |
| `eligibilityProofs`     | Eligibility Proofs     | `how_to_reg`   | Evidence that voter eligibility can be proven without turning the public result into an identity list. |
| `anonymousBallots`      | Anonymous Ballots      | `shield_lock`  | Evidence that private ballot handling is a first-class protocol property.                              |
| `tamperEvidentRecords`  | Tamper-Evident Records | `database`     | Evidence that election records are structured for integrity checks and audit review.                   |
| `verifiableTally`       | Verifiable Tally       | `verified`     | Evidence that outcomes are designed to be independently checked.                                       |
| `auditEvidence`         | Audit Evidence         | `fact_check`   | Evidence packages are designed to support organizational review and post-election audit workflows.     |

Protocol badge:

| Label                            | Icon       |
| -------------------------------- | ---------- |
| `100% Mathematically Verifiable` | `verified` |

Deployment readiness cards, in order:

| Key               | Headline         | Icon              | Description                                                                                                    |
| ----------------- | ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `pwaFirst`        | PWA-First        | `install_mobile`  | Installable web deployment path designed for fast access, broad device reach, and low operational friction.    |
| `electrobunReady` | Electrobun-Ready | `desktop_windows` | Desktop packaging path prepared for secure organizational environments and dedicated election workstations.    |
| `mobileNative`    | Mobile Native    | `phone_iphone`    | Mobile-native delivery path reserved for future app-store distribution and device-specific voting experiences. |

Claim boundary badges, in order:

| Label                                     | Icon          | Fill     |
| ----------------------------------------- | ------------- | -------- |
| Designed for organizational remote voting | `groups`      | `FILL 1` |
| Privacy-first                             | `privacy_tip` | `FILL 1` |
| Verifiable outcomes                       | `verified`    | `FILL 1` |
| Audit-ready evidence packages             | `fact_check`  | `FILL 1` |
| Enabled by HushNetwork                    | `hub`         | `FILL 1` |

### CSS/runtime contract

- Root/app integration must cause the built Sovereign Shield CSS asset to be linked in the document head at runtime.
- Browser-computed `--color-surface` on `document.documentElement` must resolve to `#091422`.
- Browser-computed `--font-family-hanken` on `document.documentElement` must resolve to `"Hanken Grotesk", sans-serif` or an equivalent computed string containing that family.
- Browser-computed body background must be `rgb(9, 20, 34)`.
- Browser-computed hero heading font family for `#hero-heading` must include `Hanken Grotesk`.
- FEAT-006 section acceptance is blocked until this contract passes.

### API contract

No application API, backend API, server action, route loader, data persistence, CMS, authentication, authorization, live verifier, cryptographic proof, or evidence package contract is introduced by this FEAT.

### Integration contract

- Existing navigation links for `#protocol` and `#platform` remain fragment-only anchors.
- The homepage route composes `ProtocolEvidenceSection` after `RoleWorkflowSection`, then `PlatformReadinessSection` after Protocol Evidence.
- New landing components and any exported constants/types are available through `src/components/landing/index.ts`.
- Tests should import the content contract rather than duplicate long static copy where practical.
- FEAT-007 footer/contact surfaces and FEAT-008 broad responsive pass remain out of scope.

## Verification evidence labels

Implementation phases must record evidence using declarative labels, not hardcoded executable commands:

- `repository-health`
- `css-runtime-baseline`
- `planning-analysis-report`
- `typecheck`
- `static-analysis`
- `unit-tests`
- `component-render-tests`
- `ui-tests`
- `gherkin-e2e`
- `visual-language-baseline`
- `responsive-review`
- `accessibility-review`
- `no-white-border-regression`
- `build`
- `format-check`
- `manual-review-ready`
- `code-review`
- `full-verification`

## Phase quality-gate policy

A phase cannot be marked complete until every quality gate in that phase file is one of:

- `satisfied`, with exact evidence paths and verification labels recorded by the implementation worker;
- `not applicable`, with a phase-specific reason explaining why the gate does not apply;
- `waived`, with a phase-specific risk rationale and owner/agent justification.

Implementation workers must not mark a phase complete while any gate remains `missing`. Browser/UI behavior changes require `ui-tests` and/or `gherkin-e2e` evidence or a precise waiver. Production code changes require automated tests or a precise waiver. Code-relevant phases require a persisted code-review report or an explicit risk-based waiver.

## Completion handoff expectations

Before completing FEAT-006 implementation, the worker must ensure:

- the CSS runtime baseline passes before section acceptance is claimed;
- the homepage has exactly one `#protocol` and one `#platform` section;
- the six protocol evidence items, three deployment cards, and five claim badges render from typed constants in approved order;
- Protocol Evidence uses a tonal full-width band and recessed evidence wells without white borders;
- Platform Readiness uses tonal card separation and claim badges with filled decorative Material Symbols;
- FEAT-006 does not introduce interactive surfaces, backend calls, dynamic proof/evidence behavior, or overclaiming copy;
- route composition remains thin and barrel exports are updated;
- component/unit and browser coverage include CSS baseline, anchors, counts, labels, decorative icons, filled claim icons, and no-white-border regression;
- changed source, tests, and MemoryBank docs are formatted;
- phase files contain exact evidence for changed files, tests, E2E/browser coverage, and review decisions;
- any remaining tooling or validation debt is recorded with exact scope and a phase-specific waiver rather than hidden.
