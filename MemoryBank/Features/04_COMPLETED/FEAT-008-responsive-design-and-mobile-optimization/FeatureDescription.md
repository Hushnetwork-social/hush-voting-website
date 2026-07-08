# FEAT-008: Responsive Design and Mobile Optimization

**Feature ID**: FEAT-008
**Parent Epic**: EPIC-001
**Status**: Completed

## Summary

Ensure all existing sections and navigation are fully responsive and optimized for mobile, tablet, and desktop with proper touch targets, typography scaling, layout adjustments, and consistent HushVoting visual-language behavior.

FEAT-008 is an **audit and patch pass over the existing website sections**, not a redesign. Current content, section intent, and component structure should be preserved unless a responsive, accessibility, or visual-language defect requires a focused adjustment.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.

**Started**: 2026-07-09
**Completed**: 2026-07-09

## Hepha Deep-Dive Decisions

Recorded: 2026-07-08T23:22:07.226Z

Hepha applied these saved Deep-Dive answers directly because the full-document model rewrite did not finish.
Fallback reason: Source document is 13399 characters; deterministic update is used above 12000 characters.

### validation script contract

Question: How should FEAT-008 expose repeatable responsive validation without repeating prior canonical-script failures?

Decision: **dedicated canonical scripts** - Add package.json scripts that run the CSS baseline first and then the FEAT-008 responsive scenarios; refinement, implementation, and review use only these scripts.

### patch boundary

Question: When the audit finds responsive defects, what implementation boundary should FEAT-008 follow?

Decision: **focused component patches** - Patch existing components, spacing, classes, touch targets, and tests only where responsive, accessibility, or visual-language defects are found.

### viewport evidence matrix

Question: Which viewport coverage should be automated versus handled as manual responsive evidence?

Decision: **targeted automated matrix plus manual device sweep** - Automate 320, 375, 768, 1024, and 1440 checks with bounding-box and computed-style assertions; manually verify named phones, tablets, and 1920 desktop.

## Pre-Requisite

Same as FEAT-006 and FEAT-007: **The Sovereign Shield CSS must be loaded by the browser** before responsive layout rules can take effect. Without the CSS, mobile breakpoints (`max-sm:*`, `md:*`, `lg:*`), responsive grid classes, and typography scaling via `clamp()` are all inert.

The Gherkin baseline scenario in `tests/e2e/features/visual-language-baseline.feature` validates this prerequisite and must pass first.

## Scope

### In Scope

- Responsive audit and patching of existing website sections.
- Mobile, tablet, and desktop breakpoint behavior.
- Navigation disclosure behavior for mobile and tablet.
- Touch-target sizing for interactive elements.
- Responsive typography and spacing verification.
- Visual-language preservation across breakpoints.
- Targeted Playwright E2E coverage for FEAT-008 viewport behavior.
- Bounding-box checks for layout and touch-target assertions.
- Computed-style checks for typography, padding, and visual-language assertions.

### Out of Scope

- Rewriting section content.
- Redesigning section hierarchy or information architecture.
- Replacing current components unless required to fix a specific responsive defect.
- Introducing a separate mobile visual language.
- Broad visual redesign outside breakpoint, spacing, typography, touch-target, or visual-language compliance fixes.

## Acceptance Criteria

### CSS Loading Prerequisite

- [x] The Gherkin baseline test "Sovereign Shield CSS is loaded by the browser" passes before FEAT-008-specific scenarios are evaluated.

### Navigation Responsiveness

- [x] On mobile viewport (≤ 767px): navigation links are hidden behind a hamburger menu button.
- [x] On mobile: hamburger menu button is visible and clickable.
- [x] On mobile: clicking hamburger menu reveals navigation links and Pilot Access button.
- [x] On tablet (768px-1023px): navigation uses the same hamburger disclosure model as mobile.
- [x] On desktop (≥ 1024px): navigation links are visible inline and the hamburger is hidden.
- [x] On desktop: Pilot Access CTA button is visible inline in the nav bar.
- [x] Mobile nav uses `bg-surface-container-low` background with a subtle `border-t border-outline-variant` divider for disclosure separation.
- [x] Mobile nav does not use `border-white`.
- [x] Mobile nav links have touch target height ≥ 48px, using `h-12` or equivalent spacing.

### Layout Responsiveness

- [x] Trust Model Hierarchy: cards stack vertically on mobile and preserve side-by-side indicators on desktop.
- [x] Role Workflow: 4 cards render in a single column on mobile, 2 columns on tablet, and 4 columns on desktop.
- [x] Protocol Evidence: 6 items render in a single column on mobile and 2 columns on desktop.
- [x] Platform Readiness: 3 cards render in a single column on mobile and 3 columns on desktop.
- [x] Claim Boundary bar wraps cleanly on mobile and renders as a single row on desktop.
- [x] Footer stacks on mobile and renders side-by-side on desktop.
- [x] Existing content and component structure are preserved unless a focused responsive patch is required.

### Spacing Responsiveness

- [x] Section padding uses `px-margin-mobile` or equivalent 16px horizontal padding on mobile.
- [x] Section padding uses `px-gutter` or equivalent 24px horizontal padding on desktop.
- [x] Hero section remains full-width with proportional padding on all viewports.
- [x] Logo renders as `w-32 h-32` on mobile and `w-48 h-48` on tablet/desktop, or equivalent computed dimensions.

### Typography Responsiveness

- [x] Hero heading uses `clamp(2rem, 5vw, var(--font-size-display-lg))` or an equivalent tokenized fluid scaling rule.
- [x] Body text uses `clamp(1rem, 2vw, var(--font-size-body-lg))` or an equivalent tokenized fluid scaling rule.
- [x] Section headings use `clamp(1.5rem, 4vw, var(--font-size-headline-lg))` or an equivalent tokenized fluid scaling rule.
- [x] All text remains readable at 320px viewport width.

### Touch Targets

- [x] All interactive elements have minimum touch target height of 48px.
- [x] All interactive elements have minimum touch target width of 48px or equivalent padding that creates a 48px interactive area.
- [x] Focus-visible rings are visible on all interactive elements across mobile, tablet, and desktop viewports.

### Visual Language Compliance

- [x] No `border-white` appears at any viewport width.
- [x] Surface fill hierarchy is preserved at all breakpoints.
- [x] Mobile layouts do not collapse tonal contrast between section surfaces.
- [x] The HushVoting Visual Language rule "no heavy card stacking" is preserved on mobile.
- [x] Mobile uses the same visual language as desktop, expressed through stacked rhythm rather than alternate styling.
- [x] Borders are used primarily for focus, selected, warning, error, or subtle disclosure separation states, not as default section separators.

## Canonical Validation Matrix

FEAT-008 validation must be targeted and viewport-specific.

| Step | Validation                                           | Required Result                                                                        |
| ---- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1    | CSS baseline scenario                                | Sovereign Shield CSS is loaded by the browser before responsive checks run.            |
| 2    | Mobile viewport checks at 320px and 375px widths     | Navigation disclosure, stacking, spacing, touch targets, and readable typography pass. |
| 3    | Tablet viewport checks at 768px-1023px widths        | Hamburger navigation remains active and tablet grid behavior is correct.               |
| 4    | Desktop viewport checks at 1024px+ and 1440px widths | Inline navigation, desktop grids, desktop padding, and CTA placement pass.             |
| 5    | Visual-language checks                               | No `border-white`; tonal surface hierarchy remains intact.                             |
| 6    | Bounding-box checks                                  | Layout columns and touch targets meet required dimensions.                             |
| 7    | Computed-style checks                                | Padding, typography, and surface styles match responsive rules.                        |

Validation should be exposed through package.json scripts so refinement and implementation planning can rely on repeatable commands. The CSS baseline script must run before the FEAT-008 viewport scenario script.

## Gherkin E2E Tests

Feature file: `tests/e2e/features/responsive-layout.feature`

### `@VisualLanguage @FEAT-008` Scenario: Navigation switches to hamburger on mobile viewport

Given the HushVoting website is running
When I set the viewport to 375x812 pixels
Then I should not see inline navigation links
And I should see a hamburger menu button
When I click the hamburger menu button
Then I should see the navigation links
And each navigation link should have a minimum height of 48 pixels
And the mobile navigation surface should use `bg-surface-container-low`
And the mobile navigation divider should use `border-outline-variant`
And the mobile navigation should not use `border-white`

### `@VisualLanguage @FEAT-008` Scenario: Navigation shows inline links on desktop viewport

Given the HushVoting website is running
When I set the viewport to 1440x900 pixels
Then I should see inline navigation links for Trust Model, Roles, Protocol Evidence, and Platform
And the hamburger menu button should not be visible
And the Pilot Access button should be visible in the nav bar

### `@VisualLanguage @FEAT-008` Scenario: Tablet navigation uses hamburger disclosure

Given the HushVoting website is running
When I set the viewport to 768x1024 pixels
Then I should not see inline navigation links
And I should see a hamburger menu button
When I click the hamburger menu button
Then I should see the navigation links
And I should see the Pilot Access button

### `@VisualLanguage @FEAT-008` Scenario: Role cards stack in single column on mobile

Given the HushVoting website is running
When I set the viewport to 375x812 pixels
Then the role cards should be in a single column layout

### `@VisualLanguage @FEAT-008` Scenario: Role cards display in 2 columns on tablet

Given the HushVoting website is running
When I set the viewport to 768x1024 pixels
Then the role cards should be in a 2-column grid layout

### `@VisualLanguage @FEAT-008` Scenario: Role cards display in 4 columns on desktop

Given the HushVoting website is running
When I set the viewport to 1440x900 pixels
Then the role cards should be in a 4-column grid layout

### `@VisualLanguage @FEAT-008` Scenario: Touch targets meet minimum size

Given the HushVoting website is running
When I visit the homepage
Then all interactive elements should have a minimum height of 48 pixels
And all interactive elements should have a minimum width of 48 pixels or equivalent interactive padding

### `@VisualLanguage @FEAT-008` Scenario: No white borders at any viewport

Given the HushVoting website is running
When I check all rendered sections at 320px viewport width
Then no element should have a `border-white` CSS class
When I check all rendered sections at 375px viewport width
Then no element should have a `border-white` CSS class
When I check all rendered sections at 768px viewport width
Then no element should have a `border-white` CSS class
When I check all rendered sections at 1440px viewport width
Then no element should have a `border-white` CSS class

### `@VisualLanguage @FEAT-008` Scenario: Section padding adjusts for mobile and desktop

Given the HushVoting website is running
When I set the viewport to 375x812 pixels
Then sections should use 16px margin-mobile horizontal padding
When I set the viewport to 1440x900 pixels
Then sections should use 24px gutter horizontal padding

### `@VisualLanguage @FEAT-008` Scenario: Responsive typography remains readable

Given the HushVoting website is running
When I set the viewport to 320x568 pixels
Then the hero heading should use fluid display scaling
And body text should remain readable
And section headings should use fluid headline scaling
When I set the viewport to 1440x900 pixels
Then hero, body, and section heading typography should remain within the expected tokenized scale

## Validation

- [ ] CSS baseline validation passes before FEAT-008-specific checks.
- [ ] All FEAT-008 Gherkin E2E tests pass in headless Chromium at the specified viewport sizes.
- [ ] FEAT-008 scenarios are runnable through canonical package.json scripts.
- [ ] Bounding-box checks verify grid columns, wrapping behavior, and touch-target dimensions.
- [ ] Computed-style checks verify typography, padding, mobile nav surface, and divider styles.
- [ ] Manual testing covers iPhone SE, iPhone 14/15 Pro, Pixel 7, iPad, iPad Pro, desktop 1440x900, and desktop 1920x1080.
- [ ] No `border-white` regression appears at any breakpoint.
- [ ] Responsive typography is verified at 320px, 375px, 768px, 1024px, 1440px, and 1920px widths.
- [ ] Mobile and tablet navigation disclosure behavior is verified by click interaction, not only by static visibility checks.
- [ ] Existing section content and component intent are preserved after responsive patches.
