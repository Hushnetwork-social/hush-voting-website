# FEAT-003 Lessons Learned

**Feature:** FEAT-003 — Hero Section and Navigation
**Epic:** EPIC-001 — HushVoting Website Platform and Initial Design
**Date:** 2026-07-08

## Summary

FEAT-003 implemented the landing page top navigation bar and hero section for the HushVoting website MVP. Key lessons emerged around mobile disclosure accessibility patterns, HeroSection versus TopNavigation component positioning, and canonical script verification during complete-feature.

## Lessons

### Lesson 1: Mobile Disclosure Accessibility — Region Landmark vs. Inner Nav

**Failure pattern:** The initial MobileNavDisclosure implementation had `role="region" aria-label="Primary navigation"` on the panel wrapper div, creating a redundant landmark alongside the inner `<nav aria-label="Primary">` element. This caused duplicate landmark exposure to assistive technology.

**Root cause:** The wrapper was treated as a landmark container, but the inner `<nav>` already provided the primary navigation landmark. The extra `role="region"` was unnecessary and potentially confusing for screen reader users.

**Successful fix:** Removed `role="region"` from the panel wrapper. The inner `<nav aria-label="Primary">` is the single authoritative navigation landmark for both desktop and mobile views.

**Prevention rule:** When implementing a mobile disclosure that wraps an inner `<nav>` element, do not add `role="region"` or `aria-label` to the panel wrapper. The inner `<nav>` already provides the navigation landmark. Duplicate landmarks create confusion for assistive technology users.

**Apply to:** Any FEAT implementing responsive navigation or disclosure panels.

---

### Lesson 2: Mobile Panel Visibility — Accessibility Tree Hiding

**Failure pattern:** The mobile panel initially used `max-h-0 opacity-0 pointer-events-none` when closed, which kept the panel content in the accessibility tree even when visually hidden. Screen readers could still navigate to closed panel links.

**Root cause:** Tailwind's `opacity-0` and `pointer-events-none` hide content visually and prevent interaction, but the DOM subtree still exists in the accessibility tree. Content needs `visibility: hidden` or `display: none` to be removed from the accessibility tree.

**Successful fix:** Added the `invisible` class (Tailwind `visibility: hidden`) to the panel when closed. Combined with `max-h-0 opacity-0 pointer-events-none` this fully removes the panel from the accessibility tree.

**Prevention rule:** When visually hiding a navigation panel that should not be reachable by assistive technology, always add `visibility: hidden` (Tailwind `invisible`) in addition to `opacity-0` and `pointer-events-none`. Use `display: none` only when CSS transitions are not needed.

**Apply to:** Any FEAT implementing collapsible/disclosure UI patterns.

---

### Lesson 3: Complete-Feature — Format Must Pass Before Git Operations

**Failure pattern:** During complete-feature final validation, 23 FEAT-003-related files had formatting issues detected by Prettier. This included source files (.tsx), test files, and all MemoryBank documentation (.md).

**Root cause:** The implementation phases used `pnpm format` or no formatting at all, but the complete-feature gate enforces `prettier --check`. The formatting drift accumulated across phases.

**Successful fix:** Ran `npx prettier --write` on the affected FEAT-003 source, test, and MemoryBank documentation files before git operations.

**Prevention rule:** Run `npx prettier --check` on changed files at phase boundaries, not just at complete-feature. When using `pnpm format --write`, target specific files or directories to avoid unintended changes to auto-generated files (like `src/routeTree.gen.ts`).

**Apply to:** All FEAT phases that create or modify source files or documentation.

---

### Lesson 4: Hero Section Integration — Route File as Composition Point

**Observation:** The homepage route (`src/routes/index.tsx`) was the correct composition point for Header and HeroSection. This kept the route focused on layout composition and allowed the landing components to remain independently testable and importable by future FEATs.

**Successful pattern:** The route file imports and composes feature components from `src/components/landing/` without containing any direct display logic, copy constants, or behavior code. Future FEATs (FEAT-004 through FEAT-007) can add sections to the homepage route by composing additional landing components without modifying existing FEAT-003 components.

**Prevention rule:** Keep the homepage route as a thin composition layer. Feature-specific display logic, constants, and behavior belong in `src/components/landing/` or feature-specific directories, not in the route file.

**Apply to:** Any FEAT that adds sections or components to the homepage route.

---

### Lesson 5: Anchor Target Stability — Fragment-Only Hrefs

**Observation:** All navigation link targets and CTA hrefs use fragment-only URLs (`#trust`, `#roles`, `#protocol`, `#platform`, `#pilot-access`). This design ensures that missing targets do not cause route errors, 404 pages, or navigation failures. The browser simply scrolls to nothing if the anchor ID does not exist.

**Prevention rule:** For interim navigation targets where downstream sections are planned but not yet implemented, always use fragment-only hrefs (`#section-id`). Do not use route paths (`/trust-model`) that would require route handlers or produce 404 errors. Document the owner FEAT for each anchor target.

**Apply to:** Any FEAT implementing navigation links to sections owned by future FEATs.

---

### Lesson 6: CTA Rendering — Styled `<a>` vs `<button>` for Navigation

**Observation:** All CTAs and nav links in FEAT-003 are rendered as native `<a>` elements with hrefs, styled to match FEAT-002 Button visual variants via a shared class object. Only the mobile menu toggle is a native `<button>`. This preserves correct link semantics (right-click/Open in new tab, keyboard enter behavior, screen reader link identification) while maintaining visual consistency.

**Prevention rule:** Use native `<a>` elements for navigation and CTA links, even when they look like buttons. Reserve native `<button>` for actions that do not navigate (menu toggles, form submissions, etc.). Apply Button visual styles via shared class objects rather than wrapping `<a>` inside `<button>`.

**Apply to:** Any FEAT implementing links, CTAs, or interactive navigation elements.

---

### Lesson 7: Complete-Feature — Pre-existing ESLint Config Missing

**Observation:** The project has ESLint 9.x installed as a devDependency and a `pnpm lint` script, but no `eslint.config.js` (or `.eslintrc.*`) file exists. This is a pre-existing issue inherited from FEAT-001 scaffolding that was never resolved. The `pnpm lint` command fails with "ESLint couldn't find an eslint.config.(js|mjs|cjs) file."

**Prevention rule:** During FEAT-001 (scaffolding) or the first FEAT that adds lint commands, ensure the ESLint configuration file exists and is compatible with the installed ESLint major version. For ESLint v9+, this is `eslint.config.js` (flat config). Document this as a known pre-existing issue with a clear fix path.

**Apply to:** Future complete-feature runs, and the next FEAT that touches build tooling configuration.

## Operational Rules Summary

| Context | Rule | Source |
|---------|------|--------|
| Mobile disclosure | Do not add `role="region"` on wrapper when inner `<nav>` exists | Lesson 1 |
| Hidden panels | Use `visibility: hidden` (plus opacity/pointer-events) to remove from a11y tree | Lesson 2 |
| Format check | Run prettier check at phase boundaries, not just complete-feature | Lesson 3 |
| Route composition | Keep routes as thin composition layers; feature logic in component directories | Lesson 4 |
| Interim anchors | Use fragment-only hrefs for planned-but-not-implemented sections | Lesson 5 |
| CTA elements | Use `<a>` for navigation links, `<button>` for actions only | Lesson 6 |
| ESLint config | Ensure eslint.config.js exists when ESLint 9+ is installed | Lesson 7 |
