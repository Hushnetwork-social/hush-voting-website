# FEAT-006: Protocol Evidence and Platform Readiness

**Feature ID**: FEAT-006
**Parent Epic**: EPIC-001
**Status**: In Progress

## Summary

Resolve the Sovereign Shield CSS loading gap, then implement the homepage Protocol Evidence and Platform Readiness product sections.

The Protocol Evidence section introduces Protocol Omega with a left-column narrative and a right-column 2x3 grid of six recessed evidence category items. The Platform Readiness section presents three deployment readiness cards and a horizontal claim boundary bar with five filled-icon badges.

Implementation must keep the homepage route thin by adding reusable landing components, typed content constants, barrel exports, matching anchors, scoped unit tests, and tagged E2E coverage.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.

## Hepha Deep-Dive Decisions

Recorded: 2026-07-08T17:31:50.437Z

Hepha applied these saved Deep-Dive answers directly because the full-document model rewrite did not finish.
Fallback reason: Source document is 13783 characters; deterministic update is used above 12000 characters.

### CSS prerequisite gate

Question: How should FEAT-006 handle the Sovereign Shield CSS loading gap before section implementation starts?

Decision: **Blocking Phase 1 prerequisite** - Fix root layout stylesheet injection first, verify computed CSS tokens/body styles, then proceed to section components.

### Static content contract

Question: Which source should be authoritative for FEAT-006 labels, descriptions, and Material Symbol names?

Decision: **Freeze typed constants from FeatureDescription** - Treat the current Static Content Contract as final, create typed constants first, and have components/tests consume only that contract.

### Validation and E2E scope

Question: How should FEAT-006 validation be scoped to avoid repeated planning and CI/script failures?

Decision: **Scoped FEAT-006 validation with canonical scripts** - Audit/reuse existing FEAT-006 Gherkin files, run baseline plus @FEAT-006 E2E blocks, and verify canonical package scripts such as build, unit tests, and format check.

#

## Pre-Requisite

Before FEAT-006 can render correctly, **the Sovereign Shield CSS must be loaded by the browser**. The CSS file is correctly built and served at `/assets/index-*.css`, but the current TanStack Start client-side hydration does not inject the `<link rel="stylesheet">` tag into the document `<head>`. This causes all Tailwind utility classes and CSS custom properties (`--color-surface`, `--font-family-hanken`, etc.) to be inert at runtime.

This is a framework integration gap in the root layout (`__root.tsx` or `app.config.ts`), not a page-level styling bug. FEAT-006 must resolve this CSS loading gap as its first implementation step. Protocol Evidence and Platform Readiness work must not proceed until the computed Sovereign Shield baseline passes.

## Scope

FEAT-006 includes:

- Root layout CSS stylesheet injection fix for Sovereign Shield runtime styles.
- Protocol Evidence homepage section with `id="protocol"`.
- Platform Readiness homepage section with `id="platform"`.
- Claim boundary bar associated with the platform readiness area.
- Typed static content constants for labels, descriptions, and Material Symbol names.
- Reusable landing components and barrel exports.
- Thin homepage route composition.
- Unit tests for content rendering and structural behavior.
- Tagged E2E tests for CSS baseline, Protocol Evidence, Platform Readiness, and claim badges.

FEAT-006 does not include:

- New backend protocol APIs.
- Live cryptographic proof generation.
- New governance workflows.
- Multi-page navigation redesign.
- Production legal/compliance claims beyond the approved claim boundary copy.

## Static Content Contract

All FEAT-006 static copy and icon names must be defined in typed constants before components are implemented. Components and tests must consume this contract rather than duplicating strings.

Recommended location:

- `src/features/landing/protocolEvidenceContent.ts` or equivalent existing landing content module.

### Protocol Evidence Content

| Key | UI Label | Material Symbol | Description Intent |
| --- | --- | --- | --- |
| `cryptographicReceipts` | Cryptographic Receipts | `receipt_long` | Evidence that voting activity can produce voter-verifiable receipts without exposing vote choices. |
| `eligibilityProofs` | Eligibility Proofs | `how_to_reg` | Evidence that voter eligibility can be proven without turning the public result into an identity list. |
| `anonymousBallots` | Anonymous Ballots | `shield_lock` | Evidence that private ballot handling is a first-class protocol property. |
| `tamperEvidentRecords` | Tamper-Evident Records | `database` | Evidence that election records are structured for integrity checks and audit review. |
| `verifiableTally` | Verifiable Tally | `verified` | Evidence that outcomes are designed to be independently checked. |
| `auditEvidence` | Audit Evidence | `fact_check` | Evidence packages are designed to support organizational review and post-election audit workflows. |

Protocol evidence item labels should render uppercase in the UI.

### Protocol Omega Badge

| Label | Material Symbol | Notes |
| --- | --- | --- |
| 100% Mathematically Verifiable | `verified` | Badge appears in the Protocol Evidence left column. |

### Deployment Readiness Cards

| Key | Headline | Material Symbol | Description |
| --- | --- | --- | --- |
| `pwaFirst` | PWA-First | `install_mobile` | Installable web deployment path designed for fast access, broad device reach, and low operational friction. |
| `electrobunReady` | Electrobun-Ready | `desktop_windows` | Desktop packaging path prepared for secure organizational environments and dedicated election workstations. |
| `mobileNative` | Mobile Native | `phone_iphone` | Mobile-native delivery path reserved for future app-store distribution and device-specific voting experiences. |

### Claim Boundary Badges

Claim badges must use Material Symbols with `FILL 1`.

| Label | Material Symbol |
| --- | --- |
| Designed for organizational remote voting | `groups` |
| Privacy-first | `privacy_tip` |
| Verifiable outcomes | `verified` |
| Audit-ready evidence packages | `fact_check` |
| Enabled by HushNetwork | `hub` |

## Acceptance Criteria

### CSS Loading Prerequisite

- [ ] The document `<head>` contains a `<link rel="stylesheet">` tag pointing to the built Sovereign Shield CSS asset.
- [ ] The CSS custom property `--color-surface` on `document.documentElement` resolves to `#091422`.
- [ ] The CSS custom property `--font-family-hanken` on `document.documentElement` resolves to `"Hanken Grotesk", sans-serif`.
- [ ] The computed `background-color` of `<body>` is `rgb(9, 20, 34)` using the Sovereign Shield surface color.
- [ ] The computed `font-family` of the hero heading (`#hero-heading`) includes `"Hanken Grotesk"`.
- [ ] Section implementation work is blocked until the CSS loading prerequisite passes.

### Protocol Evidence Section

- [ ] Section with `id="protocol"` renders on the homepage.
- [ ] Section heading "Protocol Omega" is visible.
- [ ] The section uses a left-column Protocol Omega description and a right-column evidence grid on desktop.
- [ ] Six evidence category items render in a 2x3 grid layout on desktop.
- [ ] Evidence items stack responsively on smaller screens.
- [ ] Each evidence item uses an `InsetWell` component with recessed background fill and no white border.
- [ ] Each evidence item renders a Material Symbol icon and an uppercase label from the typed content contract.
- [ ] Section uses the `bg-surface-container-low` full-width background band for visual separation.
- [ ] The "100% Mathematically Verifiable" badge is visible with a `verified` Material Symbol icon.
- [ ] The homepage route imports and composes the section rather than embedding the section implementation inline.

### Platform Readiness Section

- [ ] Section with `id="platform"` renders on the homepage.
- [ ] Section heading "Universal Deployment Readiness" is visible.
- [ ] Three deployment cards render: PWA-First, Electrobun-Ready, and Mobile Native.
- [ ] Each card has an icon, headline, and description from the typed content contract.
- [ ] Cards use Sovereign Shield component primitives and token classes.
- [ ] Cards render in a 3-column grid on desktop and stack on mobile.
- [ ] Cards do not use white outline borders; separation is achieved through `bg-surface-container` fill, spacing, radius, and elevation/tonal contrast where available.
- [ ] The homepage route imports and composes the section rather than embedding the section implementation inline.

### Claim Boundary Bar

- [ ] Five claim badges render in a horizontal bar on desktop.
- [ ] Claim badges wrap or stack accessibly on smaller screens.
- [ ] Badge labels are exactly:
  - Designed for organizational remote voting
  - Privacy-first
  - Verifiable outcomes
  - Audit-ready evidence packages
  - Enabled by HushNetwork
- [ ] Each badge uses a filled Material Symbol icon with `FILL 1`.
- [ ] Claim boundary copy does not imply production certification, legal approval, or completed deployment beyond the approved labels.

### Component Architecture

- [ ] Landing components are placed under the existing landing/component structure or a clearly named landing feature folder.
- [ ] Static content is exported from a typed constants module.
- [ ] Protocol Evidence, Platform Readiness, and Claim Boundary components are exported through a barrel export.
- [ ] The homepage route remains thin and only composes imported landing components.
- [ ] Tests do not duplicate long static copy when they can import or reference the content contract.

### Visual Language Compliance

- [ ] All section elements use Sovereign Shield `--color-*` token classes or established theme utility classes, not hardcoded colors.
- [ ] Structural separation uses tonal fills (`bg-surface-*`) before borders.
- [ ] White borders (`border-white`) are absent from FEAT-006 sections.
- [ ] Typography follows the Sovereign Shield scale (`--font-size-display-lg`, `--font-size-headline-lg`, `--font-size-body-md`, `--font-size-label-sm`).
- [ ] JetBrains Mono monospace font is used for label/small text where the visual language calls for labels.
- [ ] Hanken Grotesk sans-serif font is used for headings and body text.
- [ ] The final implementation avoids visually heavy cards nested inside visually heavy cards.

## Gherkin E2E Tests

This FEAT must create and pass the following Gherkin test scenarios. These tests will fail until the CSS loading gap is fixed.

### Baseline Shared Prerequisite

Feature file: `tests/e2e/features/visual-language-baseline.feature`

    @VisualLanguage @Prerequisite
    Scenario: Sovereign Shield CSS is loaded by the browser
      Given the HushVoting website is running
      When I visit the homepage
      Then the document head should contain a stylesheet link element
      And the CSS custom property "--color-surface" should have value "#091422"
      And the body background-color should be "rgb(9, 20, 34)"
      And the hero heading font-family should include "Hanken Grotesk"

### FEAT-006 Specific

Feature file: `tests/e2e/features/protocol-evidence-section.feature`

    @VisualLanguage @FEAT-006
    Scenario: Protocol Evidence section renders with Sovereign Shield styling
      Given the HushVoting website is running
      When I visit the homepage
      Then I should see a section with id "protocol"
      And the section should have a left column with "Protocol Omega" heading
      And the section should have a right column with 6 evidence items
      And each evidence item should use an inset-well with recessed surface fill and no white border
      And the evidence section should use bg-surface-container-low background
      And I should see a "100% Mathematically Verifiable" badge with a verified icon

    @VisualLanguage @FEAT-006
    Scenario: Platform Readiness section renders 3 deployment cards
      Given the HushVoting website is running
      When I visit the homepage
      Then I should see a section with id "platform"
      And I should see "Universal Deployment Readiness" heading
      And I should see 3 deployment cards with PWA-First, Electrobun-Ready, and Mobile Native labels
      And each card should separate content by surface fill, not white borders

    @VisualLanguage @FEAT-006
    Scenario: Claim boundary bar renders with 5 badges
      Given the HushVoting website is running
      When I visit the homepage
      Then I should see a horizontal bar with claim badges
      And I should see exactly 5 claim badges
      And each badge should use filled Material Symbol icons

## Unit Test Expectations

- [ ] Static content contract exports exactly six protocol evidence items.
- [ ] Static content contract exports exactly three deployment readiness cards.
- [ ] Static content contract exports exactly five claim boundary badges.
- [ ] Protocol Evidence component renders all evidence labels from the content contract.
- [ ] Platform Readiness component renders all deployment card headlines from the content contract.
- [ ] Claim Boundary component renders all claim labels from the content contract.
- [ ] Component tests verify the expected section anchors: `protocol` and `platform`.
- [ ] Component tests verify FEAT-006 components do not render `border-white` classes.

## Validation

- [ ] CSS loading prerequisite E2E scenario passes in headless Chromium.
- [ ] FEAT-006 tagged Gherkin E2E scenarios pass in headless Chromium.
- [ ] `pnpm test:e2e:happy-path` succeeds, or the new scenarios are tagged and included in the appropriate scoped E2E command.
- [ ] Unit/component tests for FEAT-006 pass.
- [ ] Manual visual inspection confirms the sections match the prototype direction at `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html`.
- [ ] No white border regression: `border-white` does not appear in the sections' rendered HTML.
- [ ] All colors, fonts, and spacing are from the Sovereign Shield `@theme` block or established theme utilities.
- [ ] Homepage route remains thin after adding the new sections.
