# Wireframes Design — FEAT-006 Protocol Evidence and Platform Readiness

**Feature:** FEAT-006 — Protocol Evidence and Platform Readiness  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Design Intent

Add the next two homepage product sections after Role Workflow:

1. **Protocol Evidence** — explain Protocol Omega as the evidence and verifier foundation.
2. **Platform Readiness** — show deployment readiness and a constrained claim boundary.

The sections must feel like one continuous Sovereign Shield homepage, not isolated outline-heavy cards. Protocol Evidence uses a full-width tonal background band for separation. Platform Readiness returns to the standard page container and ends with a calm claim badge bar.

## Component Boundary

Recommended implementation boundary:

```text
src/components/landing/constants.ts
  // add typed FEAT-006 content contracts

src/components/landing/ProtocolEvidenceSection.tsx
src/components/landing/PlatformReadinessSection.tsx
src/components/landing/ClaimBoundaryBar.tsx        // may be separate or local to PlatformReadinessSection
src/components/landing/index.ts                    // barrel exports
src/routes/index.tsx                               // thin composition only
src/routes/__root.tsx or app-level config          // CSS loading prerequisite fix
```

The homepage route should compose imported landing components only, in this order:

```tsx
<Header />
<main>
  <HeroSection />
  <TrustModelSection />
  <RoleWorkflowSection />
  <ProtocolEvidenceSection />
  <PlatformReadinessSection />
</main>
```

If `ClaimBoundaryBar` is exported separately, it should still be rendered as part of the Platform Readiness area, not as unrelated page chrome.

## CSS Loading Prerequisite Wireframe

Before validating either section, runtime CSS must be visible to the browser:

```text
<head>
  ...
  <link rel="stylesheet" href="/assets/index-[hash].css">
</head>

:root
  --color-surface = #091422
  --font-family-hanken = "Hanken Grotesk", sans-serif

<body>
  background-color = rgb(9, 20, 34)
```

Implementation should not begin visual section polish until this prerequisite is passing. A missing stylesheet link invalidates the design because all token classes, font utilities, and surface fills are inert.

## Section 1 — Protocol Evidence

### Section boundary

```tsx
<section
  id="protocol"
  aria-labelledby="protocol-heading"
  className="section-anchor bg-surface-container-low ..."
>
  <div className="max-width content shell">
    <div className="protocol two-column layout">
      <div className="left narrative column">...</div>
      <ul className="right evidence grid">...</ul>
    </div>
  </div>
</section>
```

### Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ bg-surface-container-low full-width band                                   │
│                                                                            │
│  ┌────────────────────────────┐   ┌──────────────────────────────────────┐ │
│  │ Protocol Omega              │   │ ┌────────────────┐ ┌──────────────┐ │ │
│  │                              │   │ │ [receipt_long] │ │ [how_to_reg] │ │ │
│  │ A meticulous audit workspace │   │ │ CRYPTOGRAPHIC  │ │ ELIGIBILITY  │ │ │
│  │ designed for institutional   │   │ │ RECEIPTS       │ │ PROOFS       │ │ │
│  │ scrutiny. Every phase of the │   │ └────────────────┘ └──────────────┘ │ │
│  │ election generates evidence  │   │ ┌────────────────┐ ┌──────────────┐ │ │
│  │ designed for review.         │   │ │ [shield_lock]  │ │ [database]   │ │ │
│  │                              │   │ │ ANONYMOUS      │ │ TAMPER-      │ │ │
│  │ [verified] 100%              │   │ │ BALLOTS        │ │ EVIDENT      │ │ │
│  │ Mathematically Verifiable    │   │ │                │ │ RECORDS      │ │ │
│  └────────────────────────────┘   │ └────────────────┘ └──────────────┘ │ │
│                                   │ ┌────────────────┐ ┌──────────────┐ │ │
│                                   │ │ [verified]     │ │ [fact_check] │ │ │
│                                   │ │ VERIFIABLE     │ │ AUDIT        │ │ │
│                                   │ │ TALLY          │ │ EVIDENCE     │ │ │
│                                   │ └────────────────┘ └──────────────┘ │ │
│                                   └──────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Desktop layout rules

- Full-width section band: `bg-surface-container-low`.
- Content max width: `var(--spacing-max-width-content)`.
- Left column: approximately one-third width.
- Right grid: approximately two-thirds width.
- Evidence grid: two columns by three rows.
- Gap: `var(--spacing-md)` between evidence wells; `var(--spacing-xl)` between columns.
- Use `InsetWell` or an equivalent recessed `bg-surface-container-lowest`/quiet well.
- Do not use white borders. If `InsetWell` already has no border, prefer it unchanged.

### Tablet wireframe

```text
┌──────────────────────────────────────────────┐
│ bg-surface-container-low                      │
│ Protocol Omega                                │
│ Copy + verified badge                         │
│                                               │
│ ┌──────────────────┐ ┌──────────────────┐     │
│ │ CRYPTOGRAPHIC    │ │ ELIGIBILITY      │     │
│ │ RECEIPTS         │ │ PROOFS           │     │
│ └──────────────────┘ └──────────────────┘     │
│ ┌──────────────────┐ ┌──────────────────┐     │
│ │ ANONYMOUS        │ │ TAMPER-EVIDENT   │     │
│ │ BALLOTS          │ │ RECORDS          │     │
│ └──────────────────┘ └──────────────────┘     │
│ ┌──────────────────┐ ┌──────────────────┐     │
│ │ VERIFIABLE TALLY │ │ AUDIT EVIDENCE   │     │
│ └──────────────────┘ └──────────────────┘     │
└──────────────────────────────────────────────┘
```

### Mobile wireframe

```text
┌────────────────────────────┐
│ bg-surface-container-low    │
│ Protocol Omega              │
│ A meticulous audit...       │
│ [verified] 100%             │
│ Mathematically Verifiable   │
│                             │
│ ┌────────────────────────┐  │
│ │ [receipt_long]         │  │
│ │ CRYPTOGRAPHIC RECEIPTS │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ [how_to_reg]           │  │
│ │ ELIGIBILITY PROOFS     │  │
│ └────────────────────────┘  │
│ ...four more wells...       │
└────────────────────────────┘
```

### Protocol item anatomy

```text
┌──────────────────────────────────────────┐
│ [icon well]  UPPERCASE LABEL              │
│              Optional short description   │
└──────────────────────────────────────────┘
```

The FEAT acceptance criteria require icon + uppercase label. The description intent may be included visually if refinement determines there is room without making the grid noisy. If descriptions are omitted visually, they must still live in the typed content contract for future explainers and tests can assert labels/icons/counts.

### Protocol content fields

| Field          | Requirement                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| Section id     | `protocol`                                                                                               |
| Heading        | `Protocol Omega`                                                                                         |
| Narrative      | Short public explanation of evidence generation and institutional review; no legal/certification claims. |
| Badge          | `verified` icon + `100% Mathematically Verifiable`                                                       |
| Evidence items | Exactly six, in approved order, sourced from typed constants.                                            |
| Icons          | Material Symbols, decorative, `aria-hidden="true"`.                                                      |
| Labels         | Uppercase rendering. Source labels remain title case in constants.                                       |
| Interactivity  | None in FEAT-006. No links, modals, expand/collapse, or verifier execution.                              |

## Section 2 — Platform Readiness

### Section boundary

```tsx
<section
  id="platform"
  aria-labelledby="platform-heading"
  className="section-anchor ..."
>
  <div className="max-width content shell">
    <h2 id="platform-heading">Universal Deployment Readiness</h2>
    <ul className="deployment card grid">...</ul>
    <ClaimBoundaryBar />
  </div>
</section>
```

### Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Universal Deployment Readiness                                             │
│                                                                            │
│ ┌────────────────────────┐ ┌────────────────────────┐ ┌──────────────────┐ │
│ │ [install_mobile]       │ │ [desktop_windows]      │ │ [phone_iphone]   │ │
│ │ PWA-First              │ │ Electrobun-Ready       │ │ Mobile Native    │ │
│ │ Installable web        │ │ Desktop packaging path │ │ Future mobile    │ │
│ │ deployment path...     │ │ prepared for secure... │ │ native path...   │ │
│ └────────────────────────┘ └────────────────────────┘ └──────────────────┘ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ [groups] Designed...  [privacy_tip] Privacy-first  [verified] ...     │ │
│ │ [fact_check] Audit-ready evidence packages  [hub] Enabled by...       │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Desktop layout rules

- Standard section shell, centered within max content width.
- Heading centered or left-aligned depending on existing landing rhythm; prototype centers this section, so centered is acceptable.
- Deployment grid: three columns on desktop.
- Card fill: `bg-surface-container` or existing `Card` primitive tone.
- Separate cards through fill, spacing, and radius, not white borders.
- Claim boundary bar: quiet tonal surface such as `bg-surface-container-high` or `bg-surface-container-highest`, rounded container, wrapping row of badges.

### Tablet wireframe

```text
┌──────────────────────────────────────────────┐
│ Universal Deployment Readiness                │
│                                               │
│ ┌────────────────────┐ ┌────────────────────┐ │
│ │ PWA-First          │ │ Electrobun-Ready    │ │
│ └────────────────────┘ └────────────────────┘ │
│ ┌────────────────────┐                        │
│ │ Mobile Native      │                        │
│ └────────────────────┘                        │
│                                               │
│ [claim badges wrap into two rows]              │
└──────────────────────────────────────────────┘
```

Tablet may use two columns for cards if three columns becomes cramped. FEAT-008 may later tune breakpoints.

### Mobile wireframe

```text
┌────────────────────────────┐
│ Universal Deployment        │
│ Readiness                   │
│                             │
│ ┌────────────────────────┐  │
│ │ [install_mobile]       │  │
│ │ PWA-First              │  │
│ │ Installable web...     │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ Electrobun-Ready       │  │
│ └────────────────────────┘  │
│ ┌────────────────────────┐  │
│ │ Mobile Native          │  │
│ └────────────────────────┘  │
│                             │
│ ┌────────────────────────┐  │
│ │ [groups] Designed...   │  │
│ │ [privacy_tip] Privacy  │  │
│ │ [verified] Verifiable  │  │
│ │ [fact_check] Audit...  │  │
│ │ [hub] Enabled...       │  │
│ └────────────────────────┘  │
└────────────────────────────┘
```

## Deployment card anatomy

```text
┌────────────────────────────────────────┐
│ Material Symbol icon                    │ decorative, secondary/accent token
│                                        │
│ Card headline                           │ headline-md
│                                        │
│ Approved description                    │ body-md / on-surface-variant
└────────────────────────────────────────┘
```

### Deployment card content fields

| Order | Key               | Headline         | Icon              | Description source     |
| ----- | ----------------- | ---------------- | ----------------- | ---------------------- |
| 1     | `pwaFirst`        | PWA-First        | `install_mobile`  | Typed static contract. |
| 2     | `electrobunReady` | Electrobun-Ready | `desktop_windows` | Typed static contract. |
| 3     | `mobileNative`    | Mobile Native    | `phone_iphone`    | Typed static contract. |

## Claim boundary bar anatomy

```text
┌────────────────────────────────────────────────────────────────────┐
│ [filled icon] Claim label   [filled icon] Claim label   ...        │
└────────────────────────────────────────────────────────────────────┘
```

### Claim badge content fields

| Order | Label                                     | Icon          | Icon fill |
| ----- | ----------------------------------------- | ------------- | --------- |
| 1     | Designed for organizational remote voting | `groups`      | `FILL 1`  |
| 2     | Privacy-first                             | `privacy_tip` | `FILL 1`  |
| 3     | Verifiable outcomes                       | `verified`    | `FILL 1`  |
| 4     | Audit-ready evidence packages             | `fact_check`  | `FILL 1`  |
| 5     | Enabled by HushNetwork                    | `hub`         | `FILL 1`  |

## Interaction Behavior

### Section navigation

- Existing `href="#protocol"` and `href="#platform"` navigation should scroll to these sections.
- Use the established `section-anchor` offset pattern so the fixed header does not cover headings.
- No new navigation items are required.

### Cards and badges

- Evidence items, readiness cards, and claim badges are informational.
- Do not add click handlers, buttons, links, modals, tooltips, or hover-only details.
- Do not add keyboard focus targets for non-interactive surfaces.

### Validation behavior

- There are no form fields and no user input validation.
- Validation is test-driven structural validation:
  - CSS baseline values present.
  - Section anchors exist.
  - Static arrays have exact lengths.
  - Approved labels render.
  - No `border-white` in FEAT-006 rendered markup.
  - Claim icons use filled Material Symbol settings.

## State Sketches

### Default

```text
All FEAT-006 content renders from typed constants.
Protocol evidence shows six items.
Platform readiness shows three cards and five claim badges.
```

### CSS failure

```text
Stylesheet link missing or CSS variables unresolved.
Design is invalid; implementation must fix root stylesheet injection before section work proceeds.
```

### Mobile

```text
Protocol narrative stacks above evidence wells.
Evidence wells, deployment cards, and claim badges stack/wrap without horizontal scroll.
```

### Empty/missing data

```text
No user-facing empty state.
Tests fail if constants do not contain exact approved counts.
```

### Error

```text
No FEAT-specific error UI.
Route-level error boundaries remain responsible.
```

### Disabled

```text
No disabled visuals.
All cards are informational statements, not unavailable actions.
```

## Visual Styling Guidance

### Recommended patterns

- `ProtocolEvidenceSection`: full-width `bg-surface-container-low` band with inner max-width shell.
- `InsetWell`: use the existing UI primitive for evidence rows/items.
- `PlatformReadinessSection`: standard landing `Section` shell or equivalent spacing.
- Deployment cards: existing `Card` primitive or `bg-surface-container` rounded panels.
- Claim bar: a quiet rounded fill container, not a bordered alert.
- Typography:
  - Hanken Grotesk for headings and body copy.
  - JetBrains Mono for labels, badges, and uppercase evidence labels.
- Icons: Material Symbols with `aria-hidden="true"`.

### Border policy

- Do not use `border-white`.
- Do not use white/bright outlines as default structure.
- Prefer tonal fills, spacing, and radius.
- Borders, if unavoidable, must be subtle, token-based, and state/accent-specific, not the primary layout separator.

## Responsive and Edge-State Expectations

- Use mobile-first layout and progressively enhance to tablet/desktop grids.
- Avoid text truncation for labels and descriptions.
- Claim badges may wrap; they do not need to stay on one line.
- Evidence labels can wrap to two lines if needed; do not reduce font below the design token scale.
- Ensure no horizontal overflow at narrow mobile widths.
- Keep touch target rules intact for existing navigation/CTA links; FEAT-006 surfaces themselves are not touch actions.

## Testability Notes for Refinement

Refinement should plan unit/component tests that import the typed content contract instead of duplicating long strings. Minimum tests:

- Six protocol evidence items exported.
- Three deployment cards exported.
- Five claim badges exported.
- `ProtocolEvidenceSection` renders `id="protocol"`, heading, badge, and all labels.
- `PlatformReadinessSection` renders `id="platform"`, heading, cards, and claim badges.
- Decorative icons use `aria-hidden="true"`.
- Filled claim icons include `FILL 1` configuration.
- FEAT-006 sections do not render `border-white`.

Refinement should also preserve the FEAT-provided Gherkin scenarios for the CSS baseline, protocol section, platform section, and claim boundary bar.
