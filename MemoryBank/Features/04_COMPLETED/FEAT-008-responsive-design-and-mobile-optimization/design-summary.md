# FEAT-008 Design Summary: Responsive Design and Mobile Optimization

## Final Design Decision

FEAT-008 will be implemented as a targeted responsive audit and patch pass over the existing HushVoting landing page. It must not redesign content, hierarchy, or component ownership. The final design preserves the current page structure and Sovereign Shield visual language while tightening breakpoint behavior, touch targets, typography, layout stacking, and validation coverage.

Primary design rule: mobile and tablet use the same HushVoting hierarchy as desktop, expressed through stacked rhythm and tonal surfaces rather than an alternate mobile visual language.

## Design Decisions

| Topic                 | Decision                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Scope                 | Patch existing sections only; do not rewrite the landing page.                                                              |
| Navigation breakpoint | Hamburger disclosure is used below 1024px; inline nav begins at 1024px+.                                                    |
| Mobile nav surface    | Use `bg-surface-container-low` with only a subtle `border-t border-outline-variant` divider.                                |
| Touch targets         | All interactive elements must expose at least 48px height and 48px width or equivalent interactive padding.                 |
| Typography            | Keep tokenized fluid typography using `clamp()` for hero and section headings; verify readability at 320px.                 |
| Section gutters       | Use 16px mobile gutters and 24px desktop gutters via Sovereign Shield spacing tokens.                                       |
| Layout grids          | Role cards: 1/2/4 columns for mobile/tablet/desktop. Evidence and readiness sections stack on mobile and expand on desktop. |
| Visual language       | No `border-white`; no heavy nested card wrappers; use fills, spacing, and radius for separation.                            |
| Testing               | CSS baseline must pass before FEAT-008 viewport tests; responsive checks use bounding boxes and computed styles.            |

## Implementation Checklist for Refinement

### Planning and source audit

- [ ] Confirm the FEAT-008 source snapshot and existing untracked E2E files before editing.
- [ ] Preserve existing content constants and section component boundaries.
- [ ] Record any pre-existing modified files separately from FEAT-008 implementation changes.
- [ ] Ensure global CSS remains imported from `src/routes/__root.tsx`, not from route-level files.

### Header and navigation

- [ ] Change desktop nav/CTA visibility from `md:` behavior to `lg:` behavior so tablet remains hamburger.
- [ ] Change mobile disclosure visibility from `md:hidden` to `lg:hidden` or equivalent.
- [ ] Keep the mobile panel hidden from the accessibility tree while closed.
- [ ] Preserve Escape-to-close and focus restoration behavior.
- [ ] Verify mobile nav panel uses `bg-surface-container-low border-t border-outline-variant` and not `border-white`.
- [ ] Ensure header links, hamburger button, and nav CTA satisfy 48px touch targets.

### Hero

- [ ] Verify hero heading uses fluid tokenized scaling and remains readable at 320px.
- [ ] Verify subheadline/body text remains readable at mobile and desktop widths.
- [ ] Ensure both hero CTAs are at least 48px tall and do not overflow at 320px.
- [ ] Review hero brand mark sizing against the FEAT-008 logo-size acceptance criterion; patch with contextual class sizing if needed.

### Existing sections

- [ ] Trust Model: maintain stacked hierarchy and wrapped chips/badges on mobile.
- [ ] Role Workflow: verify 1-column mobile, 2-column tablet, 4-column desktop.
- [ ] Protocol Evidence: verify mobile stacking and desktop 2-column evidence presentation.
- [ ] Platform Readiness: verify mobile stacking and desktop 3-column presentation.
- [ ] Claim Boundary: verify badges wrap without horizontal overflow.
- [ ] Final CTA: verify CTA links wrap/stack safely and remain native anchors.
- [ ] Footer: verify stacked mobile and side-by-side desktop behavior; enlarge footer link interactive area if needed.

### Visual language

- [ ] Assert no rendered element uses `border-white` at 320px, 375px, 768px, or 1440px.
- [ ] Do not add default white outlines to solve layout separation.
- [ ] Use tonal fills and spacing for any responsive patch.
- [ ] Keep borders limited to focus, warning/error/selected states, or the approved mobile-nav divider.

### Validation and scripts

- [ ] Add or update canonical package scripts for CSS baseline and FEAT-008 responsive checks.
- [ ] Run the CSS baseline before FEAT-008 checks.
- [ ] Expand `tests/e2e/features/responsive-layout.feature` to match the full FEAT-008 acceptance matrix.
- [ ] Expand `tests/e2e/responsive-layout.spec.ts` with computed-style and bounding-box checks.
- [ ] Include viewport checks at 320px, 375px, 768px, 1024px, 1440px, and where practical 1920px.
- [ ] Validate all interactive elements for touch target size and focus-visible rings.

## UI States Phase Planning Must Preserve

| State                           | Must preserve                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| CSS baseline loaded             | Stylesheet link present, design tokens resolved, body background and fonts correct.           |
| Mobile nav closed               | Hamburger visible; links hidden visually and from accessibility tree; `aria-expanded=false`.  |
| Mobile nav open                 | Links and CTA visible; Escape closes; link activation closes; approved tonal surface/divider. |
| Tablet nav                      | Same disclosure behavior as mobile through 1023px.                                            |
| Desktop nav                     | Inline nav and CTA visible at 1024px+; hamburger hidden.                                      |
| Anchor navigation               | Section anchors remain stable and are not hidden behind fixed header.                         |
| Static section default          | All sections render without data loading or empty-state dependencies.                         |
| Focus state                     | All links/buttons show visible primary focus ring with readable offset.                       |
| Responsive typography           | H1/body/section headings remain readable and within tokenized scale.                          |
| No-white-border visual baseline | No `border-white` at any tested viewport.                                                     |

## Known Refinement Risks

- **Breakpoint drift:** Existing source appears to use `md:` for header desktop navigation. This conflicts with the tablet hamburger requirement and should be treated as a likely first patch.
- **Touch target gaps:** Desktop nav and footer links may be visually smaller than 48px. Refinement should explicitly test all links/buttons rather than assuming CTAs are the only interactive controls.
- **Partial existing E2E coverage:** Existing responsive E2E files are present but do not cover the full acceptance matrix. They should be updated, not treated as complete.
- **CSS loading dependency:** Responsive classes and computed styles are meaningless if the Sovereign Shield CSS baseline fails. Keep baseline validation first.
- **Over-patching visual hierarchy:** Avoid adding wrapper cards or bright borders to force separation on mobile.

## Assumptions

- The current static landing-page content is approved for FEAT-008 and should not be rewritten.
- The token-based `BrandMark` remains acceptable unless a production logo asset is separately supplied.
- Tablet-specific section grids may use existing readable patterns except where FEAT-008 explicitly mandates behavior, especially navigation and Role Workflow.
- Manual device validation can be supplemented by Playwright viewport emulation, but the canonical automated matrix must be repeatable.

## Out of Scope

- New marketing copy.
- New product sections.
- Authenticated election workflow changes.
- Backend/API work.
- New analytics or cookie consent surfaces.
- Replacing the design system.
- Final legal/security content approval.

## Ready-for-Refinement Notes

FEAT-008 is ready for refinement with the artifacts created in this folder:

- `UX-research-report.md`
- `Wireframes-design.md`
- `design-summary.md`

Refinement should convert this design into `FeatureTasks.md` and phase files, with a strong emphasis on targeted responsive patches and explicit viewport validation.
