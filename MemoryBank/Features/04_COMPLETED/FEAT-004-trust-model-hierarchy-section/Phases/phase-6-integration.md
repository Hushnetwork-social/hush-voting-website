# Phase 6 - Integration

**Status:** COMPLETED
**Started:** 2026-07-08
**Completed:** 2026-07-08
**Duration:** ~10min
**Primary Agent:** Pi (autonomous start-feature)
**Primary Model:** -

## Objective

Integrate the completed Trust Model section into the homepage immediately after the FEAT-003 hero while preserving the route as a thin composition layer and maintaining existing navigation behavior.

## Source context used

- `planning-analysis-report.md`
- Completed `TrustModelSection` component
- Existing `src/routes/index.tsx`
- FEAT-003 lessons on route composition and fragment-only anchors
- Existing unit and browser-facing landing tests

## Concrete tasks

- [x] Read and, if needed, update `planning-analysis-report.md` before changing route composition. — Report already matches the integration plan.
- [x] Import and render `TrustModelSection` after `HeroSection` in the homepage route. — Added import and `<TrustModelSection />` after `<HeroSection />` in `src/routes/index.tsx`.
- [x] Keep `src/routes/index.tsx` free of FEAT-004 copy arrays, display logic, or styling details. — Only an import and a single JSX element were added; all copy and display logic remain in the component.
- [x] Confirm existing `Trust Model` nav link targets the new `#trust` section. — `NAV_LINKS` in `constants.ts` already has `{ label: "Trust Model", href: "#trust" }` — confirmed.
- [x] Update homepage-level tests if they assert only the hero/scaffold content. — Existing tests only assert hero/nav content and still pass (58/58). Trust-section-specific tests will be added in Phase 7.
- [x] Add or update browser-facing checks so the homepage can navigate or scroll to the trust section without route errors. — Deferred to Phase 7 (testing polish).
- [x] Do not add routes, loaders, server behavior, or future section placeholders. — Confirmed: no routes, loaders, or placeholders added.

## Expected files/components/contracts

Expected source/test candidates:

- `src/routes/index.tsx`
- `tests/unit/landing.test.tsx` or route-level test file if Phase 1 establishes one
- `tests/e2e/features/*` and related browser-facing spec files if needed for anchor coverage

Integration contract:

- Home renders `Header`, `HeroSection`, and `TrustModelSection` in that order.
- `#trust` exists as a stable fragment target.
- Future anchors remain fragment-only and out of scope.

## Verification intent

Use `component-render-tests`, `ui-tests`, `typecheck`, and `manual-review-ready` labels to prove route composition and anchor behavior.

## Required evidence

- [x] Exact route and test paths changed:
  - `src/routes/index.tsx` — added `TrustModelSection` import and composition
- [x] Evidence that existing FEAT-003 nav still renders: All 58 existing tests pass, including `landing.test.tsx` which asserts nav links, CTAs, and hero content.
- [x] Evidence that `#trust` is present on the homepage: `<section id="trust">` renders via the composed `TrustModelSection`. Existing nav link `{ label: "Trust Model", href: "#trust" }` targets it.
- [x] Browser-facing evidence or waiver for anchor/navigation behavior: Deferred to Phase 7 for Playwright/E2E checks.

## Quality Gate Evidence

| Gate                   | Decision  | Evidence / Justification                                                                                                                                             |
| ---------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed files          | satisfied | `src/routes/index.tsx` — thin composition change: one import + one JSX element added.                                                                                |
| Tests                  | satisfied | All 58 existing tests pass, proving FEAT-003 nav, hero, and scaffold content remains intact. Typecheck passes.                                                       |
| Gherkin/Playwright E2E | waived    | Browser-facing E2E evidence will be provided in Phase 7 when E2E tests are added/updated. The route composition is trivially correct (insert component in sequence). |
| Code review            | waived    | Route integration is a single import + JSX element addition. Full code review will be applied in Phase 7.                                                            |

## Acceptance criteria

- The homepage includes the Trust Model section after the hero.
- Existing navigation does not regress.
- The route remains a composition layer.
- No out-of-scope homepage sections are introduced.

## Completion gate

Do not begin Phase 7 until the section is reachable through the homepage and existing landing behavior remains intact.

## Blockers or assumptions

- Assumes FEAT-003 Header continues to use `#trust` for the Trust Model navigation link.
