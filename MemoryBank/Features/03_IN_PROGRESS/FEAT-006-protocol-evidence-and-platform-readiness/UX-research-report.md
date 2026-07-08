# UX Research Report — FEAT-006 Protocol Evidence and Platform Readiness

**Feature:** FEAT-006 — Protocol Evidence and Platform Readiness  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Source Context

This design is based on:

- `FeatureDescription.md` for FEAT-006.
- `EPIC-001-hushvoting-website-platform/EpicDescription.md`.
- The high-fidelity prototype at `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html`.
- Sovereign Shield design tokens in `MemoryBank/Overview/Prototype/.../sovereign_shield/DESIGN.md`.
- HushVoting shared design baseline and visual-language rules from `hush-memory-bank`.
- Existing landing implementation patterns from FEAT-003 through FEAT-005.
- Lessons learned from FEAT-002, FEAT-004, and FEAT-005.

## Target Users and Jobs

### Technical evaluators

**Who:** Security-minded buyers, engineering leaders, election technology reviewers, and protocol reviewers.  
**Job:** Understand that HushVoting is designed around verifiable election evidence, not just a conventional form-based voting UI.

### Organization decision-makers

**Who:** Governance leads, association officers, company administrators, and prospective pilot sponsors.  
**Job:** Assess whether HushVoting can credibly support organizational remote voting across web, desktop, and future mobile deployment paths.

### Trustees and auditors

**Who:** People who may later approve governed election actions or review audit materials in the authenticated product.  
**Job:** See that Protocol Omega produces evidence packages and reviewable artifacts without implying trustees can inspect arbitrary ballots or that public visitors can access live election data here.

### Voters and privacy-conscious visitors

**Who:** Election participants or public visitors concerned with privacy and outcome trust.  
**Job:** Learn that privacy, eligibility, receipts, and verifiable outcomes are designed as protocol properties while avoiding overclaims such as “total anonymity.”

## Primary Workflow and Entry Points

### Entry points

- Existing top navigation link: `#protocol`.
- Existing top navigation link: `#platform`.
- Existing hero secondary CTA: `View verifier model`, targeting `#protocol`.
- Natural scroll progression from Hero → Trust Model → Roles → Protocol Evidence → Platform Readiness.

### Primary workflow

1. Visitor lands on the homepage.
2. Visitor selects **Protocol Evidence** in navigation, uses **View verifier model**, or scrolls below Role Workflow.
3. Browser lands at `section#protocol`.
4. Visitor scans the left-column Protocol Omega summary and the “100% Mathematically Verifiable” badge.
5. Visitor scans the six evidence categories in the right-column grid.
6. Visitor continues to `section#platform`.
7. Visitor reviews the three deployment readiness cards and the five claim boundary badges.
8. Visitor continues toward FEAT-007 footer/contact surfaces when available.

## Content and Claim Boundary

FEAT-006 must use the static content contract in `FeatureDescription.md` as the implementation source of truth. The prototype contains older labels such as “Election record” and “Standalone verifier”; FEAT-006 uses the clarified labels below instead.

### Protocol evidence categories

| Order | Key                     | UI label               | Material Symbol | Intent                                                                             |
| ----- | ----------------------- | ---------------------- | --------------- | ---------------------------------------------------------------------------------- |
| 1     | `cryptographicReceipts` | Cryptographic Receipts | `receipt_long`  | Voter-verifiable receipt evidence without exposing vote choices.                   |
| 2     | `eligibilityProofs`     | Eligibility Proofs     | `how_to_reg`    | Eligibility can be proven without turning the public result into an identity list. |
| 3     | `anonymousBallots`      | Anonymous Ballots      | `shield_lock`   | Private ballot handling is a first-class protocol property.                        |
| 4     | `tamperEvidentRecords`  | Tamper-Evident Records | `database`      | Election records are structured for integrity checks and audit review.             |
| 5     | `verifiableTally`       | Verifiable Tally       | `verified`      | Outcomes are designed to be independently checked.                                 |
| 6     | `auditEvidence`         | Audit Evidence         | `fact_check`    | Evidence packages support organizational review and post-election audit workflows. |

Evidence labels render uppercase in the UI. Supporting copy must avoid claiming production certification, legal approval, or universal anonymity.

### Platform readiness and claims

- Deployment cards: PWA-First, Electrobun-Ready, Mobile Native.
- Claim badges: Designed for organizational remote voting, Privacy-first, Verifiable outcomes, Audit-ready evidence packages, Enabled by HushNetwork.
- Claim badges must use filled Material Symbols (`FILL 1`) and must remain boundary statements, not certification claims.

## States

### Blocking prerequisite state — CSS baseline

FEAT-006 has a required technical prerequisite: Sovereign Shield CSS must be loaded by the browser before the new sections are considered implemented. This is not a visual enhancement; it is a launch blocker for this feature.

The design relies on these runtime conditions:

- The document head contains a stylesheet link for the built CSS asset.
- `--color-surface` resolves to `#091422`.
- `--font-family-hanken` resolves to `"Hanken Grotesk", sans-serif`.
- The body background uses `rgb(9, 20, 34)`.
- The hero heading uses Hanken Grotesk.

If these fail, implementation should stop and fix root stylesheet injection before adding or validating the FEAT-006 sections.

### Default state

- `#protocol` is visible as a full-width `bg-surface-container-low` band.
- Protocol content appears as a left narrative column and right evidence grid on desktop.
- Six evidence items render from the typed content contract.
- `#platform` renders a centered heading, three readiness cards, and the claim boundary bar.
- No white structural borders are used in FEAT-006 sections.

### Loading state

- No FEAT-specific loading spinner is needed because the content is static and SSR-friendly.
- Page-level framework loading remains outside this FEAT.
- A flash of unstyled content caused by missing CSS is not an acceptable loading state; it is the CSS prerequisite failure.

### Empty state

- No empty state is expected. The static arrays must always contain exactly six evidence items, three deployment cards, and five claim badges.
- If any array is empty or length-mismatched, tests should fail rather than rendering a partial public section.

### Disabled state

- The sections are informational and non-interactive.
- Cards and badges should not appear disabled.
- “Mobile Native” may describe a future/reserved delivery path, but it should remain a readiness card rather than a disabled action.

### Error state

- No FEAT-specific network/data error state is needed.
- Route-level error and not-found boundaries remain responsible for application errors.
- CSS baseline failure is validated via tests and should block implementation completion.

### Hover state

- Evidence items and readiness cards may use subtle tonal lift only if desired.
- Hover must not reveal required copy or imply clickability.
- Do not use bright outline hover treatment as the primary separator.

### Focus and keyboard state

- Sections, cards, and badges are non-interactive and should not receive `tabIndex`.
- Existing navigation and CTA links keep their normal keyboard behavior and focus rings.
- Fragment navigation to `#protocol` and `#platform` must land at sections with fixed-header-safe scroll offset.

## Accessibility Considerations

- Use semantic section boundaries:
  - `<section id="protocol" aria-labelledby="protocol-heading">`
  - `<section id="platform" aria-labelledby="platform-heading">`
- Use a real `h2` for “Protocol Omega” and “Universal Deployment Readiness”.
- Render evidence items, deployment cards, and claim badges as list structures (`ul/li` or equivalent semantic grouping) where practical.
- Material Symbol icons are decorative because visible labels provide meaning; mark icons `aria-hidden="true"`.
- Filled claim icons still remain decorative and should not duplicate label text for screen readers.
- Preserve DOM order:
  1. Protocol narrative
  2. Evidence grid items in the approved order
  3. Platform heading
  4. Deployment cards in the approved order
  5. Claim badges in the approved order
- Use Sovereign Shield contrast tokens: headings in `on-surface`, supporting copy in `on-surface-variant`, icon accents in `primary`/`secondary`.
- Do not rely on hover-only interaction or desktop-only layout.

## Responsive Expectations

- Mobile: protocol columns stack, evidence items stack in one column, deployment cards stack, claim badges wrap or stack with readable spacing.
- Tablet: evidence grid may use two columns; deployment cards may use one or three columns depending on width, but text must remain readable.
- Desktop: protocol uses a left narrative column and a right 2x3 evidence grid; deployment cards use a three-column grid; claim badges render as a horizontal wrapping bar.
- Use `spacing-margin-mobile` for mobile gutters and `spacing-gutter`/`spacing-xl` rhythms for larger screens.
- FEAT-008 may later perform broader responsive polish, but FEAT-006 must be responsive enough to pass its own tests.

## Product Assumptions

1. FEAT-006 remains a static public homepage feature; it does not expose live protocol APIs, proof generation, or evidence downloads.
2. Authenticated election execution, artifact review, and verifier workflows live outside this public website.
3. The typed static content contract is the single source of truth for labels, descriptions, and icons.
4. Existing navigation already includes `#protocol` and `#platform`; FEAT-006 only needs to provide matching anchors unless implementation discovers broken imports.
5. Claim badge copy is approved boundary language and must not be expanded into compliance or certification claims.

## Open Product Questions

No blocker-level product questions remain for design. Non-blocking follow-ups for later FEATs:

- Should a future protocol explainer page provide deeper definitions for each evidence category?
- Should “100% Mathematically Verifiable” eventually link to a formal verifier model or whitepaper?
- Should platform readiness cards eventually include status labels such as “available now” vs “planned,” or would that overcomplicate the initial launch surface?
- Should the public site later expose downloadable sample audit packages, and if so, under which evidence/legal review process?

## UX Risks

| Risk                                                             | Mitigation                                                                                                                   |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| CSS not loaded, causing all token classes to be inert            | Treat stylesheet injection as the first blocking implementation step and test computed CSS values before section validation. |
| Overclaiming protocol maturity                                   | Use only approved static labels/descriptions and claim badges; avoid certification/legal/production deployment claims.       |
| “Anonymous Ballots” implying total anonymity                     | Keep supporting copy focused on private ballot handling and avoid “total anonymity” language.                                |
| Outline-heavy visual drift                                       | Use Sovereign Shield tonal fills, `InsetWell`, spacing, and radius; do not use `border-white`.                               |
| Static copy drift between docs, constants, components, and tests | Create typed constants first and have components/tests consume the same contract.                                            |
| Heavy card stacking                                              | Keep Protocol Evidence as a quiet section band with recessed evidence wells; do not nest heavy cards inside heavy cards.     |
