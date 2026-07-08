# FEAT-008 Lessons Learned

**Feature:** FEAT-008 — Responsive Design and Mobile Optimization
**Epic:** EPIC-001 — HushVoting Website Platform and Initial Design
**Date:** 2026-07-09

## Summary

FEAT-008 implemented a targeted responsive audit and patch pass over the existing HushVoting landing page, covering grid layout corrections, navigation breakpoint adjustments, touch-target compliance, typography scaling, visual-language border-restraint verification, and viewport-specific E2E coverage. Key lessons emerged around responsive E2E architecture patterns, viewport fixture typing, Gherkin scenario design for computed-style assertions, and successful application of prior FEAT lessons about tonal surfaces, breakpoint contracts, and format-check discipline.

## Lessons

### Lesson 1: Responsive E2E Fixtures — Typed Viewport Constants Prevent Magic Numbers

**Observation:** The `tests/e2e/fixtures/responsive.ts` file defines typed viewport constants (`VIEWPORT_320`, `VIEWPORT_375`, `VIEWPORT_768`, `VIEWPORT_1024`, `VIEWPORT_1440`, `VIEWPORT_1920`) with explicit width/height values. These constants are consumed by both the Gherkin feature file steps and the Playwright spec file, eliminating magic-number duplication.

**Successful pattern:** Define ALL viewport dimensions as typed constants in a single fixtures file before writing any E2E scenarios or spec implementations. Include a `VIEWPORT_LABELS` or `ALL_VIEWPORTS` array for iteration-based assertions (e.g., no-white-borders check across all viewports). Include a `BREAKPOINT` map (`mobile ≤ 767px`, `tablet 768–1023px`, `desktop ≥ 1024px`) that both scenario writers and spec implementers reference.

**Prevention rule:** For any responsive E2E coverage, create typed viewport constant fixtures before writing Gherkin features or spec implementations. Reference these constants in all assertion logic. Do not hardcode viewport dimensions in individual test files.

**Apply to:** Any FEAT adding or modifying responsive E2E coverage.

---

### Lesson 2: Responsive Helper Utilities — Pure Functions Enable Unit Testing of Assertion Logic

**Observation:** The `tests/e2e/fixtures/responsive-helpers.ts` file contains pure functions (`parsePxValue`, `hasWhiteBorderClass`, `matchesGutter`) that encapsulate DOM-string parsing and computed-style comparison logic. These functions have 33 dedicated unit tests in `tests/unit/responsive-helpers.test.ts`, making the assertion logic independently verifiable without a browser.

**Successful pattern:** Extract DOM-string parsing (px value extraction, class name inspection, computed-style comparison) into pure functions that are:

1. Independently unit-testable
2. Used by both E2E spec tests and potentially by Gherkin step definitions
3. Located alongside the viewport fixtures for discoverability

**Prevention rule:** When E2E tests need to parse CSS values, inspect class strings, or compare computed styles, extract the parsing logic into pure helper functions with dedicated unit tests. This ensures the assertion logic is correct before it's used in browser-based tests.

**Apply to:** Any FEAT adding E2E tests with computed-style or class-string assertions.

---

### Lesson 3: Breakpoint Contract in Constant Form Prevents Phase Drift

**Observation:** FEAT-008 defined its breakpoint contract (mobile ≤767px hamburger, tablet 768–1023px hamburger, desktop ≥1024px inline nav) as explicit constants in the planning-analysis-report.md, FeatureDescription.md, design-summary.md, and responsive fixtures. This single-source-of-truth approach prevented drift between planning documents and implementation. When the nav breakpoint was changed from `md:` (768px) to `lg:` (1024px) in Phase 4, the constant contract made the change self-verifying.

**Successful pattern:** Define the breakpoint contract as a typed constant or data structure early in planning, then reference it in all downstream documents and code. When implementation needs to change a breakpoint, the constant change makes the impact visible across all consumers.

**Prevention rule:** For any FEAT with responsive breakpoint requirements, define the breakpoint contract (label, min-width, max-width, navigation mode, layout mode) as typed constants in the first planning phase. Reference these constants throughout implementation and tests. Update the constant contract when breakpoints change, not just individual component classes.

**Apply to:** Any FEAT defining or modifying responsive breakpoint behavior.

---

### Lesson 4: Canonical Validation Scripts for Targeted E2E Runs

**Observation:** The `package.json` scripts `test:e2e:visual-baseline` and `test:e2e:responsive` use `--grep @Prerequisite` and `--grep @FEAT-008` respectively. This enables running the CSS baseline check separately from the responsive viewport tests, keeping validation ordering explicit and avoiding full-suite E2E runs during iterative development.

**Successful pattern:** Define per-area E2E scripts that target specific Gherkin tags. The CSS baseline (`@Prerequisite`) always runs first, and FEAT-specific responsive tests (`@FEAT-008`) run after. This enables the FEAT-008 validation matrix to be executed in isolation without running unrelated scenarios.

**Prevention rule:** When adding E2E coverage for a new feature area, add canonical `test:e2e:<area>` scripts to `package.json` that use `--grep` targeting a dedicated tag. Tag the feature's Gherkin scenarios consistently. Document the validation order (prerequisites first) in the script naming convention.

**Apply to:** All FEATs that add E2E test scenarios.

---

### Lesson 5: No-White-Borders Assertion Across Viewports — Iterative Pattern for Visual-Language Compliance

**Observation:** The "No white borders at any viewport" Gherkin scenario iterates across `[320, 375, 768, 1440]` width viewports in a single scenario, checking that no element with `border-white` class exists at any viewport. This is implemented in the spec via `ALL_VIEWPORTS` iteration. This pattern makes the no-regression check concise and exhaustive.

**Successful pattern:** For visual-language compliance assertions that must hold at all viewports, use an iterative Gherkin scenario with computed-style or class-name assertions at each width. The Playwright spec implements this with a `for` loop over `ALL_VIEWPORTS`. This avoids duplicating the same assertion across multiple scenarios.

**Prevention rule:** When asserting visual-language invariants (no `border-white`, correct surface tokens, correct divider tokens) across viewports, use a single iterative scenario that checks each viewport. Tag it appropriately so it runs in the responsive validation suite. Do not create separate scenarios per viewport for the same invariant.

**Apply to:** Any FEAT with visual-language invariants that must hold across all viewports.

---

### Lesson 6: Touch Target E2E Assertions — Bounding Box Computation

**Observation:** The touch-target E2E assertions use `boundingBox()` to get absolute element dimensions and compare against `TOUCH_TARGET_MIN_HEIGHT` (48px) and `TOUCH_TARGET_MIN_WIDTH` (48px). The assertion allows either dimension to be sufficient (a tall narrow link or wide short link may still be usable) but flags both-below-threshold for failure.

**Successful pattern:** Use Playwright's `boundingBox()` for touch-target assertions rather than reading computed styles or CSS classes. The bounding box reflects the actual rendered interactive area including padding, borders, and transforms.

**Prevention rule:** For touch-target E2E assertions, use `boundingBox()` (which returns the full rendered pixel dimensions) rather than CSS class inspection or computed-style height/width. Set the threshold to 48px per WCAG 2.2 target size requirements. Consider both-or-nothing logic: fail only when both dimensions are below threshold.

**Apply to:** Any FEAT adding touch-target or accessibility size assertions.

---

### Lesson 7: Prior Lessons Applied Correctly

**Observation:** All prior FEAT lessons that applied to FEAT-008 were successfully followed without incident:

- FEAT-002 Lesson 4 (FEAT-003 Lesson 4): Tonal surfaces instead of white borders — ✅ (No `border-white` introduced)
- FEAT-002 Lesson 4: Border restraint — ✅ (Only `border-t border-outline-variant` for mobile nav divider)
- FEAT-003 Lesson 1: No duplicate landmarks in mobile disclosure — ✅ (Inner `<nav>` is the single landmark)
- FEAT-003 Lesson 2: Accessibility tree hiding with `invisible`+`visible` classes — ✅ (preserved from FEAT-003)
- FEAT-003 Lesson 5: Fragment-only hrefs for planned sections — ✅ (All nav links use `#section-id`)
- FEAT-004 Lesson 4: Fragment anchor matching — ✅ (Nav `#trust`, `#roles`, `#protocol`, `#platform` all match rendered section IDs)
- FEAT-005 Lesson 1: Constants-first pattern for static content — ✅ (Responsive fixture constants created in Phase 2)
- FEAT-005 Lesson 2: Barrel export pattern — ✅ (No new barrel changes needed)
- FEAT-006 Lesson 1: CSS import in `__root.tsx` — ✅ (No CSS import changes needed)
- FEAT-007 Lesson 3: Pure function for URL/string construction — ✅ (responsive-helpers pure functions with unit tests)

**Prevention rule:** Before starting implementation of a new FEAT, review all previous FEAT lessons learned and create a checklist of applicable prevention rules. Apply them as executable constraints, not historical notes. For responsive FEATs specifically, review FEAT-003 (nav accessibility), FEAT-002 (visual language), and FEAT-006 (CSS loading) lessons.

**Apply to:** All FEATs.

## Operational Rules Summary

| Context                     | Rule                                                                      | Source   |
| --------------------------- | ------------------------------------------------------------------------- | -------- |
| Responsive E2E fixtures     | Create typed viewport constants before writing Gherkin or spec tests      | Lesson 1 |
| Responsive helper utilities | Extract DOM-string parsing into pure functions with unit tests            | Lesson 2 |
| Breakpoint contracts        | Define breakpoint contracts as typed constants before implementation      | Lesson 3 |
| E2E scripts                 | Add per-area `test:e2e:<area>` canonical scripts using `--grep`           | Lesson 4 |
| Visual-language invariants  | Use iterative viewport scenarios for invariants that must hold everywhere | Lesson 5 |
| Touch target assertions     | Use `boundingBox()` for touch-target measurements                         | Lesson 6 |
| Prior lessons application   | Create applicability checklist from prior lessons before each FEAT        | Lesson 7 |
