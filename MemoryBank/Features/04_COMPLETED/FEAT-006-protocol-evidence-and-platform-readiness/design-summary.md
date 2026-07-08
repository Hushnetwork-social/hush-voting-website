# Design Summary — FEAT-006 Protocol Evidence and Platform Readiness

**Feature:** FEAT-006 — Protocol Evidence and Platform Readiness  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Final Design Decisions

1. **Fix Sovereign Shield CSS loading before section work.**  
   Runtime stylesheet injection is a blocking prerequisite. FEAT-006 cannot be accepted while the browser lacks the built CSS `<link>` or while core CSS variables/body styles are unresolved.

2. **Implement two homepage anchors: `#protocol` and `#platform`.**  
   These match existing navigation/CTA targets from earlier FEATs. No navigation redesign is required.

3. **Protocol Evidence uses a full-width tonal band.**  
   Use `bg-surface-container-low` or equivalent tokenized surface fill for section separation. Do not use white outline separators.

4. **Protocol Evidence uses a two-column desktop layout.**  
   Left column: Protocol Omega heading, short narrative, verified badge. Right column: exactly six evidence items in a 2x3 desktop grid.

5. **Evidence items use recessed wells.**  
   Use the existing `InsetWell` primitive or equivalent recessed surface fill. Items render a decorative Material Symbol icon and uppercase label from typed constants.

6. **Platform Readiness uses three informational cards.**  
   Render PWA-First, Electrobun-Ready, and Mobile Native in a three-column desktop grid, stacking responsively.

7. **Claim boundary is part of the Platform area.**  
   Render five filled-icon badges after the deployment cards. Badge copy remains constrained and must not become certification, legal approval, or completed-production-deployment language.

8. **Use a typed static content contract as the source of truth.**  
   Labels, descriptions, and Material Symbol names should live in `src/components/landing/constants.ts` or an equivalent landing content module before component implementation. Components and tests consume that same contract.

9. **Keep all FEAT-006 surfaces informational.**  
   No links, buttons, backend calls, modals, verifier execution, proof generation, or dynamic evidence lookup in this feature.

10. **Keep the homepage route thin.**  
    Add landing components and barrel exports, then compose imported components in the route.

## Approved Content Contract

### Protocol evidence items

| Order | Key                     | Label                  | Icon           | Description intent                                                                                     |
| ----- | ----------------------- | ---------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| 1     | `cryptographicReceipts` | Cryptographic Receipts | `receipt_long` | Evidence that voting activity can produce voter-verifiable receipts without exposing vote choices.     |
| 2     | `eligibilityProofs`     | Eligibility Proofs     | `how_to_reg`   | Evidence that voter eligibility can be proven without turning the public result into an identity list. |
| 3     | `anonymousBallots`      | Anonymous Ballots      | `shield_lock`  | Evidence that private ballot handling is a first-class protocol property.                              |
| 4     | `tamperEvidentRecords`  | Tamper-Evident Records | `database`     | Evidence that election records are structured for integrity checks and audit review.                   |
| 5     | `verifiableTally`       | Verifiable Tally       | `verified`     | Evidence that outcomes are designed to be independently checked.                                       |
| 6     | `auditEvidence`         | Audit Evidence         | `fact_check`   | Evidence packages support organizational review and post-election audit workflows.                     |

### Protocol badge

| Label                          | Icon       |
| ------------------------------ | ---------- |
| 100% Mathematically Verifiable | `verified` |

### Deployment readiness cards

| Order | Key               | Headline         | Icon              | Description                                                                                                    |
| ----- | ----------------- | ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| 1     | `pwaFirst`        | PWA-First        | `install_mobile`  | Installable web deployment path designed for fast access, broad device reach, and low operational friction.    |
| 2     | `electrobunReady` | Electrobun-Ready | `desktop_windows` | Desktop packaging path prepared for secure organizational environments and dedicated election workstations.    |
| 3     | `mobileNative`    | Mobile Native    | `phone_iphone`    | Mobile-native delivery path reserved for future app-store distribution and device-specific voting experiences. |

### Claim boundary badges

| Order | Label                                     | Icon          |
| ----- | ----------------------------------------- | ------------- |
| 1     | Designed for organizational remote voting | `groups`      |
| 2     | Privacy-first                             | `privacy_tip` |
| 3     | Verifiable outcomes                       | `verified`    |
| 4     | Audit-ready evidence packages             | `fact_check`  |
| 5     | Enabled by HushNetwork                    | `hub`         |

All claim badge icons must use Material Symbols with `FILL 1`.

## Implementation Checklist for Refinement

- [ ] Add or fix root/app-level stylesheet injection so the browser emits a CSS `<link>` for the built Sovereign Shield CSS asset.
- [ ] Validate CSS baseline before implementing FEAT-006 sections:
  - [ ] stylesheet link in `<head>`
  - [ ] `--color-surface` resolves to `#091422`
  - [ ] `--font-family-hanken` resolves to `"Hanken Grotesk", sans-serif`
  - [ ] body background is `rgb(9, 20, 34)`
  - [ ] hero heading font includes Hanken Grotesk
- [ ] Add typed FEAT-006 content constants for protocol evidence, deployment readiness, and claim badges.
- [ ] Create `ProtocolEvidenceSection` under `src/components/landing/`.
- [ ] Create `PlatformReadinessSection` under `src/components/landing/`.
- [ ] Create `ClaimBoundaryBar` as a separate landing component or an internal child of `PlatformReadinessSection`.
- [ ] Export new components and relevant types/content from `src/components/landing/index.ts`.
- [ ] Compose the new sections after `RoleWorkflowSection` in the homepage route.
- [ ] Ensure `ProtocolEvidenceSection` renders `<section id="protocol">`.
- [ ] Ensure `PlatformReadinessSection` renders `<section id="platform">`.
- [ ] Render exactly six protocol evidence items in the approved order.
- [ ] Render exactly three deployment cards in the approved order.
- [ ] Render exactly five claim badges in the approved order.
- [ ] Mark decorative icons `aria-hidden="true"`.
- [ ] Apply `FILL 1` only where required for claim badges.
- [ ] Use Sovereign Shield token classes/variables for surfaces, typography, spacing, and icon colors.
- [ ] Avoid `border-white` and outline-heavy structural separation.
- [ ] Add scoped unit/component tests for constants, anchors, rendered content, icon accessibility, and no-white-border regression.
- [ ] Add or preserve tagged E2E/Gherkin coverage for CSS baseline, Protocol Evidence, Platform Readiness, and claim badges.

## UI States Phase Planning Must Preserve

| State            | Required behavior                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| CSS prerequisite | Implementation is blocked until runtime stylesheet link and computed Sovereign Shield baseline pass.                                       |
| Default          | Protocol Evidence and Platform Readiness render complete approved static content.                                                          |
| Mobile           | Protocol columns stack; evidence items, deployment cards, and claim badges stack/wrap without horizontal overflow.                         |
| Tablet           | Evidence grid may use two columns; deployment cards may use two or three columns if readable.                                              |
| Desktop          | Protocol uses left narrative + right 2x3 evidence grid; platform uses three deployment cards; claim badges form a horizontal wrapping bar. |
| Hover            | Optional tonal lift only; no hidden content or click affordance.                                                                           |
| Keyboard         | FEAT-006 cards/badges are skipped because they are non-interactive; existing nav/CTA links retain focus behavior.                          |
| Loading          | No FEAT-specific loading state; static SSR content. CSS failure is not a loading state.                                                    |
| Empty            | Not applicable; missing constants should fail tests.                                                                                       |
| Error            | No FEAT-specific error UI; route-level error boundaries remain responsible.                                                                |
| Disabled         | Not applicable; cards and badges are informational and should not appear disabled.                                                         |

## Accessibility Requirements

- Use semantic section boundaries with accessible heading labels.
- Preserve exact fragment anchors for `#protocol` and `#platform`.
- Keep headings visible and ordered after prior homepage sections.
- Use list semantics for repeated evidence items, cards, and badges where practical.
- Mark icon-only visual aids `aria-hidden="true"` because visible labels provide the accessible names.
- Do not add focusable wrappers to informational surfaces.
- Preserve DOM order to match visual scan order.
- Do not rely on color alone for any required distinction.
- Preserve readable body text and label contrast against dark Sovereign Shield surfaces.

## Responsive Requirements

- Mobile-first layout.
- No horizontal scroll at narrow widths.
- Evidence labels may wrap but must remain uppercase and readable.
- Claim badges may wrap to multiple rows or stack vertically.
- Use standard homepage gutters and section anchor offset behavior.
- FEAT-008 may later optimize responsive polish, but FEAT-006 must be independently usable on mobile, tablet, and desktop.

## Risks and Mitigations

| Risk                                                      | Mitigation                                                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| CSS loading prerequisite remains unresolved               | Make it the first refinement/implementation task and first E2E prerequisite scenario.                         |
| Copy drift from prototype labels                          | Use FEAT-006 `FeatureDescription.md` content contract, not older prototype evidence labels.                   |
| Overclaiming privacy, certification, or deployment status | Keep claim badge labels exact; do not add legal/compliance claims or “total anonymity” language.              |
| White-border visual regression                            | Use tonal fills and existing `InsetWell`/`Card`; add tests/assertions for absence of `border-white`.          |
| Heavy nested-card appearance                              | Make Protocol Evidence a quiet band and evidence items recessed wells; keep Platform cards as sibling panels. |
| Tests duplicating static strings                          | Import or reference typed constants in unit/component tests wherever possible.                                |
| Homepage route becoming implementation-heavy              | Use landing components and barrel exports; route should only compose.                                         |

## Assumptions

- FEAT-003 already introduced navigation/CTA targets for `#protocol` and `#platform`.
- FEAT-002 already provides the Sovereign Shield tokens and UI primitives, but FEAT-006 must fix browser stylesheet injection if the current app integration does not emit the CSS link.
- FEAT-004 and FEAT-005 establish the landing component and static-section testing patterns to reuse.
- The public website remains separate from authenticated election execution and live verifier workflows.
- Static content is approved for initial launch posture when constrained to the exact copy in this design and `FeatureDescription.md`.

## Out of Scope

- New backend protocol APIs.
- Live cryptographic proof generation.
- Public evidence package download or lookup.
- Authenticated verifier execution.
- Governance workflows or role-specific election screens.
- Legal/compliance certification claims.
- Navigation redesign beyond matching existing anchors.
- Footer, utility pages, contact path, or pilot access behavior.
- Broader site-wide responsive optimization beyond FEAT-006 sections.

## Ready for Refinement

FEAT-006 has sufficient design detail for `refine-feature`. No blocker-level product questions remain. Refinement should translate this design into implementation tasks and tests, with the CSS loading prerequisite as the first blocking task before Protocol Evidence and Platform Readiness component work.
