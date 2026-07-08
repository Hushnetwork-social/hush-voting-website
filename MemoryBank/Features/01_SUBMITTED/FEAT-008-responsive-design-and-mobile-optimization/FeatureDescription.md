# FEAT-008: Responsive Design and Mobile Optimization

**Feature ID**: FEAT-008
**Parent Epic**: EPIC-001
**Status**: Submitted

## Summary

Ensure all sections and navigation are fully responsive and optimized for mobile, tablet, and desktop with proper touch targets, typography scaling, and layout adjustments.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.

## Pre-Requisite

Same as FEAT-006 and FEAT-007: **The Sovereign Shield CSS must be loaded by the browser** before responsive layout rules can take effect. Without the CSS, mobile breakpoints (`max-sm:*`, `md:*`, `lg:*`), responsive grid classes, and typography scaling via `clamp()` are all inert.

The Gherkin baseline scenario in `tests/e2e/features/visual-language-baseline.feature` validates this prerequisite and must pass first.

## Acceptance Criteria

### CSS Loading (Prerequisite — shared with all FEATs)

- [ ] The Gherkin baseline test "Sovereign Shield CSS is loaded by the browser" passes.

### Navigation Responsiveness

- [ ] On mobile viewport (≤ 767px): navigation links are hidden behind a hamburger menu button.
- [ ] On mobile: hamburger menu button is visible and clickable.
- [ ] On mobile: clicking hamburger menu reveals navigation links and Pilot Access button.
- [ ] On tablet (768px-1023px): same as mobile (hamburger).
- [ ] On desktop (≥ 1024px): navigation links are visible inline, hamburger is hidden.
- [ ] On desktop: Pilot Access CTA button is visible inline in the nav bar.
- [ ] Mobile nav uses `bg-surface-container-low` background with `border-t border-outline-variant` — not white borders.
- [ ] Mobile nav links have touch target height ≥ 48px (12 `h-12`).

### Layout Responsiveness

- [ ] Trust Model Hierarchy: cards stack vertically on mobile, side-by-side indicators on desktop.
- [ ] Role Workflow (4 cards): single column on mobile, 2-column on tablet, 4-column on desktop.
- [ ] Protocol Evidence (6 items): single column on mobile, 2-column on desktop.
- [ ] Platform Readiness (3 cards): single column on mobile, 3-column on desktop.
- [ ] Claim Boundary bar: wraps on mobile, single-row on desktop.
- [ ] Footer: stacked on mobile, side-by-side on desktop.

### Spacing Responsiveness

- [ ] Section padding: `px-gutter` (24px) on desktop, `px-margin-mobile` (16px) on mobile.
- [ ] Hero section: full-width with proportional padding on all viewports.
- [ ] Logo: `w-32 h-32` on mobile, `w-48 h-48` on tablet/desktop.

### Typography Responsiveness

- [ ] Hero heading uses `clamp(2rem, 5vw, var(--font-size-display-lg))` for fluid scaling.
- [ ] Body text uses `clamp(1rem, 2vw, var(--font-size-body-lg))` for fluid scaling.
- [ ] Section headings use `clamp(1.5rem, 4vw, var(--font-size-headline-lg))` for fluid scaling.
- [ ] All text remains readable at 320px viewport width (iPhone SE).

### Touch Targets

- [ ] All interactive elements have minimum touch target of 48px height.
- [ ] All interactive elements have minimum touch target of 48px width (or adequate padding).
- [ ] Focus-visible rings are visible on all interactive elements across viewports.

### Visual Language Compliance (Responsive Context)

- [ ] No `border-white` appears at any viewport width.
- [ ] Surface fill hierarchy is preserved at all breakpoints (no loss of tonal contrast on mobile).
- [ ] The HushVoting Visual Language rule "no heavy card stacking" is preserved on mobile.
- [ ] Mobile does not use a different visual language — same hierarchy, stacked rhythm.

## Gherkin E2E Tests

### FEAT-008 Specific

Feature file: `tests/e2e/features/responsive-layout.feature`

```gherkin
@VisualLanguage @FEAT-008
Scenario: Navigation switches to hamburger on mobile viewport
  Given the HushVoting website is running
  When I set the viewport to 375x812 pixels
  Then I should not see inline navigation links
  And I should see a hamburger menu button
  When I click the hamburger menu button
  Then I should see the navigation links
  And each navigation link should have a minimum height of 48 pixels

Scenario: Navigation shows inline links on desktop viewport
  Given the HushVoting website is running
  When I set the viewport to 1440x900 pixels
  Then I should see inline navigation links for Trust Model, Roles, Protocol Evidence, and Platform
  And the hamburger menu button should not be visible
  And the Pilot Access button should be visible in the nav bar

Scenario: Role cards stack in single column on mobile
  Given the HushVoting website is running
  When I set the viewport to 375x812 pixels
  Then the role cards should be in a single column layout

Scenario: Role cards display in 4 columns on desktop
  Given the HushVoting website is running
  When I set the viewport to 1440x900 pixels
  Then the role cards should be in a 4-column grid layout

Scenario: Touch targets meet minimum size
  Given the HushVoting website is running
  When I visit the homepage
  Then all interactive elements should have a minimum height of 48 pixels

Scenario: No white borders at any viewport
  Given the HushVoting website is running
  When I check all rendered sections at 375px viewport width
  Then no element should have a "border-white" CSS class
  When I check all rendered sections at 1440px viewport width
  Then no element should have a "border-white" CSS class

Scenario: Section padding adjusts for mobile
  Given the HushVoting website is running
  When I set the viewport to 375x812 pixels
  Then sections should use 16px margin-mobile padding
  When I set the viewport to 1440x900 pixels
  Then sections should use 24px gutter padding
```

## Validation

- [ ] All Gherkin E2E tests pass in headless Chromium at specified viewport sizes.
- [ ] `pnpm test:e2e:happy-path` succeeds (or scenarios tagged `@FEAT-008` are included).
- [ ] Manual testing on iPhone SE, iPhone 14/15 Pro, Pixel 7, iPad, iPad Pro, desktop 1920x1080.
- [ ] No `border-white` regression at any breakpoint.
- [ ] Touch targets verified via Playwright bounding-box checks.
- [ ] Responsive typography verified via Playwright computed style checks at multiple viewports.
