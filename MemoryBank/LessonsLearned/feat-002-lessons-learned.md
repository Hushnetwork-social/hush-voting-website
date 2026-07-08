# FEAT-002 Lessons Learned

**Feature:** FEAT-002 — Design System Implementation (Sovereign Shield)
**Epic:** EPIC-001 — HushVoting Website Platform and Initial Design
**Date:** 2026-07-08

## Summary

FEAT-002 implemented the Sovereign Shield design system foundation: Tailwind v4 CSS-first tokens, 7 reusable React UI components, STYLEGUIDE.md documentation, and 34 unit tests. Key lessons emerged around Tailwind v4 CSS-first token configuration, component accessibility patterns, and test infrastructure setup for design-system components.

## Lessons

### Lesson 1: Tailwind v4 Fixed-Variant Color Tokens

**Failure pattern:** The initial planning audit identified 12 fixed-variant color tokens from `DESIGN.md` (primary-fixed, primary-fixed-dim, on-primary-fixed, on-primary-fixed-variant, etc.) that were not present in the original `styles/app.css`. These tokens were documented in the DESIGN.md color palette but had been omitted from the initial scaffold token set.

**Root cause:** The initial scaffold (FEAT-001) focused on the core surface/palette tokens and did not include the Material Design 3 fixed-variant color tokens that `DESIGN.md` explicitly defines.

**Successful fix:** Added all 12 fixed-variant color tokens plus `headline-lg-mobile` typography token to the `@theme` block in `styles/app.css` during Phase 2 (Data Layer).

**Prevention rule:** When implementing design tokens from a DESIGN.md specification, audit every color family section (including fixed-variant, container, and on-* token pairs) individually. Do not assume that a palette group header means all members are present. Compare the exact DESIGN.md YAML key list against the actual CSS variable declarations.

**Apply to:** Any FEAT that configures or audits Tailwind v4 CSS token definitions.

---

### Lesson 2: Component Type Safety — `cn()` Utility Structure

**Failure pattern:** Components initially imported `cn()` from a generic lib path. When the utility was moved to the local component directory for project simplicity, imports needed updating.

**Root cause:** The planning report assumed a shared `lib/cn.ts` pattern, but the project structure placed it in `src/components/ui/cn.ts`.

**Successful fix:** Created `src/components/ui/cn.ts` with a minimal classname merge utility (7 lines) and updated all component imports to `~/components/ui/cn`.

**Prevention rule:** Define shared utilities in a predictable, stable location early in the implementation. For UI component libraries, locate shared utilities (`cn`, types) adjacent to the components they serve (`src/components/ui/`). Document the chosen location in the planning report.

**Apply to:** FEATs building new component directories or shared utilities.

---

### Lesson 3: Testing Library Setup for Design-System Components

**Failure pattern:** The project had no `@testing-library/react` or jsdom configuration at Phase 3. Component contract tests could not be written during business-logic implementation, requiring a deferred testing phase.

**Root cause:** The initial FEAT-001 scaffold set up Vitest for unit tests but did not include jsdom environment or `@testing-library/react` — these are not needed for pure utility/scaffold tests but are essential for React component render testing.

**Successful fix:** Added `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` to devDependencies. Configured `vitest.config.ts` with `environment: "jsdom"` and `setupFiles`. Created `tests/unit/setup.ts` for jest-dom matchers.

**Prevention rule:** If a FEAT plan includes React component tests, add jsdom/render-library dependencies and configure the test environment in the same phase that creates the components — not deferred to a later testing phase. The project scaffolding phase (FEAT-001) should include these for any project with React UI components.

**Apply to:** FEAT-001-type scaffolding tasks, and any FEAT that introduces React component rendering.

---

### Lesson 4: HushVoting Visual Language — Border Restraint

**Prevention rule:** Components in the HushVoting design system must use tonal surface fills (surface-container-*) for separation before resorting to borders. Default Card rendering must not include a bright border. Borders are reserved for focus, selected, warning, error, or accent states. This rule was successfully followed in FEAT-002 and should be enforced in all downstream FEATs (FEAT-003 through FEAT-008).

**Failure pattern addressed:** The original prototype used white outline borders extensively. The card and inset-well implementations intentionally avoid this pattern.

**Successful outcome:** Card uses tonal fill without default border. InsetWell uses recessed fill. MetricCard uses a thin left border accent (appropriate state indicator). StatusChip uses tonal fills.

**Apply to:** All FEATs that create new UI surfaces or modify existing component styling.

---

### Lesson 5: Code Review — Approval with Non-Blocking Notes

**Failure pattern:** None — the Phase 3 code review resulted in APPROVED with only NOTE-level findings (Card accent class string interpolation, MetricCard fallback pattern, ButtonProps delegation). No changes were required.

**Prevention rule:** Document non-blocking findings as notes in the code review report rather than blocking approval. Future code reviews should follow the same pattern: clearly separate blocking (REQUIRED) from non-blocking (NOTE/SUGGESTION) findings.

**Apply to:** All FEAT code reviews.

---

### Lesson 6: Complete-Feature — Format Check Must Pass Before Git Operations

**Failure pattern:** During final validation, `pnpm format:check` reported 3 files with formatting issues. Two were FEAT-002 documentation files, one was an auto-generated file.

**Successful fix:** Ran `pnpm format --write` on the two FEAT-002 documentation files. The auto-generated `src/routeTree.gen.ts` is regenerated by the framework and its formatting is not controlled by our Prettier config.

**Prevention rule:** During complete-feature final validation, run `pnpm format:check` and fix any formatting issues before committing. Exclude auto-generated files (like `src/routeTree.gen.ts`, `pnpm-lock.yaml`) from formatting requirements or ensure they are regenerated with correct formatting. When using `pnpm format --write`, target specific files to avoid unintended changes.

**Apply to:** All complete-feature runs.

## Operational Rules Summary

| Context           | Rule                                                                     | Source   |
| ----------------- | ------------------------------------------------------------------------ | -------- |
| Token audit       | Audit every token family member individually against DESIGN.md YAML keys | Lesson 1 |
| Shared utilities  | Locate `cn` and types adjacent to UI components in same directory        | Lesson 2 |
| Test dependencies | Add jsdom and @testing-library/react when planning React component tests | Lesson 3 |
| Visual language   | Prefer tonal surface separation over borders; borders for state only     | Lesson 4 |
| Code review       | Clearly separate REQUIRED vs NOTE findings                               | Lesson 5 |
| Format check      | Run format check before git operations; auto-generated files exempt      | Lesson 6 |
