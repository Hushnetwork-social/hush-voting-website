# FEAT-008 UX Research Report: Responsive Design and Mobile Optimization

## Purpose

FEAT-008 is a responsive audit and focused patch pass over the existing HushVoting public website. It must preserve the current landing-page content, information architecture, and component ownership while making mobile, tablet, and desktop behavior reliable, readable, touch-safe, and compliant with the HushVoting visual language.

This is not a redesign. Responsive fixes should be narrow and evidence-driven.

## Context Sources

- `FeatureDescription.md` for FEAT-008.
- EPIC-001 HushVoting Website Platform and Initial Design.
- Sovereign Shield design system `DESIGN.md`.
- EPIC-013 `DesignBaseline.md` and `HushVotingVisualLanguage.md`.
- Prior lessons learned from FEAT-001 through FEAT-007.
- Current landing components in `src/components/landing/`.
- Existing responsive and visual-language E2E feature/spec files.

## Target Users and Jobs

### Prospective organization representative

**Job:** Understand whether HushVoting is credible for governed remote voting from a phone, tablet, or desktop.

Needs:

- Read the value proposition without zooming or horizontal scroll.
- Navigate quickly to Trust Model, Roles, Protocol Evidence, and Platform sections.
- Find and use Pilot Access on mobile and desktop.
- Perceive institutional trust and calm technical restraint at every viewport.

### Technical evaluator or auditor

**Job:** Review Protocol Omega evidence and platform-readiness claims from a small or large screen.

Needs:

- Scan evidence categories without cramped labels.
- Verify the platform-readiness and claim-boundary messages remain legible.
- See visual hierarchy through tonal surfaces, not outline-heavy boxes.

### Mobile-first visitor

**Job:** Explore the website on a phone while retaining the same product hierarchy as desktop.

Needs:

- Hamburger navigation that is discoverable, keyboard accessible, and not present in the accessibility tree while closed.
- Links and CTAs with at least 48px touch targets.
- Section rhythm that stacks cleanly at 320px and 375px widths.

### Internal implementation and QA users

**Job:** Reliably validate responsive behavior through canonical scripts.

Needs:

- A CSS baseline check before responsive assertions.
- Viewport-specific Playwright checks for mobile, tablet, and desktop.
- Bounding-box and computed-style checks that fail on real regressions, not only static class snapshots.

## Primary Workflow and Entry Points

### Landing-page exploration workflow

1. User opens `/` on a mobile, tablet, or desktop viewport.
2. CSS baseline must load first: Sovereign Shield variables, fonts, Tailwind utilities, and body surface color are present.
3. User sees fixed header and hero content.
4. On mobile/tablet, user opens hamburger disclosure.
5. User selects section anchors:
   - Trust Model
   - Roles
   - Protocol Evidence
   - Platform
   - Pilot Access
6. User scans stacked or gridded content according to viewport.
7. User reaches final CTA/footer and legal/security links.

### Implementation validation workflow

1. Run visual-language CSS baseline.
2. Run FEAT-008 responsive viewport scenarios.
3. Validate mobile widths at 320px and 375px.
4. Validate tablet behavior at 768px through 1023px.
5. Validate desktop behavior at 1024px+ and 1440px.
6. Verify no `border-white` class appears at any viewport.
7. Verify interactive elements meet touch-target and focus-visible requirements.

## Current-State UX Observations

The existing landing implementation already uses many correct patterns: typed constants, semantic sections, tokenized surfaces, clamp-based hero typography, `visibility: hidden` for a closed mobile panel, native links for navigation, and no default white borders.

The design pass should preserve these strengths while planning targeted fixes. Known areas for refinement to verify during implementation:

| Area                        | UX concern                                                                                                                                                | Design requirement                                                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Header breakpoint           | Current source uses `md:` navigation visibility, which makes inline nav appear at 768px. FEAT-008 requires tablet hamburger through 1023px.               | Use mobile/tablet disclosure below `lg`; inline nav starts at `lg`/1024px.                                                                    |
| Touch targets               | Desktop nav links and footer links may be under 48px high.                                                                                                | All interactive controls must expose at least 48px height or equivalent interactive padding.                                                  |
| Brand/logo size             | Current fallback mark is a small header/hero SVG. FEAT-008 acceptance asks for a larger responsive hero logo dimension or equivalent computed dimensions. | Verify or patch hero mark sizing so the visual brand anchor scales intentionally without disrupting header mark sizing.                       |
| Existing FEAT-008 E2E files | Existing untracked responsive tests cover only part of the full acceptance matrix.                                                                        | Expand tests to include tablet hamburger, 320px typography, mobile nav surface/divider, full touch targets, and all required viewport checks. |

## Responsive UX Requirements by Viewport

### 320px mobile

- No horizontal overflow.
- Header brand and hamburger fit on one row.
- Hamburger trigger is visible and at least 48px by 48px.
- Closed mobile panel is not reachable by pointer, keyboard, or assistive technology.
- Hero headline remains readable and does not clip.
- CTAs stack vertically and maintain comfortable tap areas.
- Multi-column sections collapse to a single column.
- Claim badges wrap without squeezing text below readable width.

### 375px mobile

- Same behavior as 320px, with slightly more comfortable line length.
- Mobile nav links and Pilot Access appear after disclosure.
- Mobile disclosure surface uses `bg-surface-container-low` and only a subtle `border-outline-variant` top divider.
- Section gutters use the 16px mobile margin token.

### 768px-1023px tablet

- Header still uses hamburger disclosure, not inline desktop nav.
- Role cards use a 2-column grid.
- Tablet layouts may use 2-column supportive grids where specified, but must not make the header switch to desktop early.
- Touch targets remain 48px minimum.
- Surface hierarchy and spacing should feel wider than phone while preserving stacked rhythm where required.

### 1024px+ desktop

- Inline navigation links are visible.
- Hamburger trigger is hidden.
- Pilot Access CTA is visible inline in the nav bar.
- Role cards render as 4 columns at wide desktop.
- Protocol Evidence renders as narrative plus evidence grid.
- Platform Readiness renders as 3 columns where width permits.
- Footer renders brand/tagline and legal links side-by-side.

## UI States

### Default loaded state

- SSR-rendered static landing page with all sections present.
- Header is fixed and section anchors account for header height using `.section-anchor` scroll margin.
- Tonal surfaces provide hierarchy.

### Mobile/tablet navigation closed

- Hamburger button has `aria-expanded="false"`.
- Panel is visually hidden and removed from the accessibility tree with visibility/display-equivalent behavior.
- Closed links are not pointer-interactive.

### Mobile/tablet navigation open

- Hamburger button has `aria-expanded="true"`.
- Panel appears beneath the fixed header.
- Panel contains section links and Pilot Access.
- Surface: `bg-surface-container-low`.
- Divider: subtle `border-t border-outline-variant` only.
- Links are at least 48px tall.
- Escape closes the panel and returns focus to the trigger.
- Selecting a link closes the panel.

### Loading state

The site is primarily static and SSR-rendered; no application data loading state is expected for FEAT-008. Validation should still account for font/CSS loading:

- CSS baseline must pass before responsive checks.
- Tests should wait for document readiness and computed styles rather than assuming class names are enough.

### Empty state

No user-generated content lists exist in FEAT-008. Empty-state work is out of scope. Static sections should not disappear at narrow viewports.

### Disabled state

No disabled controls are introduced by FEAT-008. If any future CTA is not ready, it should remain a safe link or visible placeholder from FEAT-007 rather than a disabled inaccessible button.

### Error state

- Route-level 404/error fallback remains owned by the existing app shell and utility-page scaffolding.
- FEAT-008 should not introduce new network error states.
- Responsive validation should include that the site does not create horizontal overflow or clipped fixed-header content if a route boundary renders.

## Accessibility and Keyboard Considerations

- Use native `<a>` for navigation and CTA links; use native `<button>` only for the hamburger toggle.
- All interactive elements must have visible focus rings using primary focus color and appropriate ring offset.
- Keyboard tab order should be: brand/home, hamburger or desktop links, Pilot Access, page content links.
- Closed mobile nav content must not be reachable by keyboard or assistive technology.
- Escape closes the mobile/tablet disclosure and restores focus to the toggle.
- Icons accompanying visible text remain decorative with `aria-hidden="true"`.
- Text remains readable at 320px; no line height collapse or content clipping.
- Avoid horizontal scrolling caused by fixed-width cards, badges, or CTA rows.
- Touch target validation should inspect actual bounding boxes, not only classes.

## Visual-Language Constraints

- No `border-white` at any breakpoint.
- Prefer surface fills, spacing, radius, and stacked rhythm over outline separators.
- Borders are acceptable for focus rings and the specific mobile-nav disclosure divider.
- Do not add heavy outer cards around existing sections to solve responsive issues.
- Mobile is not a separate visual language; it is the same hierarchy stacked vertically.
- Avoid card-inside-card visual weight when wrapping or stacking existing components.

## Open Product Questions and Assumptions

These are non-blocking for refinement because FEAT-008 can safely proceed with current decisions.

1. **Final logo asset:** The current `BrandMark` is a token-based fallback. Assumption: FEAT-008 may adjust responsive sizing of the existing mark but does not wait for a production logo asset.
2. **Download overview CTA:** FEAT-007 uses a safe interim target. Assumption: FEAT-008 only verifies touch target and layout behavior, not final asset availability.
3. **Tablet layout exactness outside nav:** The feature requires tablet hamburger and role 2-column behavior. Other tablet grids may use existing responsive patterns if readable and visually compliant.
4. **Manual device list:** Implementation should record manual or Playwright-emulated checks for iPhone SE, iPhone 14/15 Pro, Pixel 7, iPad, iPad Pro, 1440x900, and 1920x1080, but no new device-specific design variant is introduced.
