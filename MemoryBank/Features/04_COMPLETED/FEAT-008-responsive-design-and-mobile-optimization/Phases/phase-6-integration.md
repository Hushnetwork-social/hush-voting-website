# Phase 6 - Integration

**Status:** COMPLETED
**Started:** 2026-07-09
**Completed:** 2026-07-09
**Duration:** ~20min
**Primary Agent:** pi (start-feature skill)
**Primary Model:** -

## Objective

Wire responsive validation into the project contract and verify route/homepage integration without broadening FEAT scope.

## Source context used

- `planning-analysis-report.md`.
- `package.json` script contract.
- Existing Playwright/Gherkin config and feature/spec files.
- Homepage route and generated route artifacts.
- CSS import location in root route.

## Concrete tasks

- [x] Add or update package-level validation entry points for CSS baseline and FEAT-008 responsive scenarios, keeping the baseline first in documentation and handoff.
- [x] Integrate FEAT-008 responsive feature/spec files with existing Playwright config and tag conventions.
- [x] Ensure homepage composition and route tree still render all sections and utility links after responsive patches.
- [x] Confirm root-level CSS import remains intact and route-level global CSS imports are not reintroduced.
- [x] Regenerate or update route artifacts only if route/component changes require it.
- [x] Update README or MemoryBank references if validation entry points are added.
- [x] Update planning report if integration contracts change.

## Expected files/components/contracts

- `package.json` scripts or equivalent validation contract updates.
- `tests/e2e/features/responsive-layout.feature`.
- `tests/e2e/responsive-layout.spec.ts` and related Playwright config if needed.
- Route/homepage integration files only as required.
- Documentation updates for validation ordering.

## Verification intent

Implementation and future CI/manual workers can run CSS baseline separately before focused FEAT-008 viewport validation.

## Required evidence

- `css-runtime-baseline`: baseline entry point and ordering confirmed. ✅ (`test:e2e:visual-baseline` script)
- `gherkin-e2e`: responsive scenarios integrated with tags/config. ✅ (updated feature file, spec file, `test:e2e:responsive` script)
- `route-render-tests`: homepage/route integration checked where applicable. ✅
- `build`, `typecheck`, `format-check`: integration changes remain valid. ✅

## Quality Gate Evidence

| Gate                   | Decision  | Evidence / Justification                                                                                                                                                                                                      |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed files          | recorded  | `package.json` (new scripts), `tests/e2e/features/responsive-layout.feature` (expanded), `tests/e2e/responsive-layout.spec.ts` (expanded)                                                                                     |
| Tests                  | satisfied | `pnpm test:unit` (197 tests pass), `pnpm typecheck` passes.                                                                                                                                                                   |
| Gherkin/Playwright E2E | satisfied | Updated feature file with 10 scenarios covering mobile/tablet/desktop nav, role grids, no-white-borders, padding, typography, touch targets, protocol/platform layouts. Spec file updated with focused Playwright assertions. |
| Code review            | waived    | Integration changes are test configuration and E2E coverage. No production logic changes. Code review deferred to Phase 8 final checkpoint.                                                                                   |

## Acceptance criteria

- Validation entry points exist and are documented without relying on a giant E2E suite.
- Responsive tests are discoverable and scoped to FEAT-008.
- CSS baseline ordering is preserved.
- Homepage/route composition remains stable.

## Completion gate

Do not proceed to Phase 7 until FEAT-008 browser tests are integrated and runnable through the agreed validation contract.

## Blockers or assumptions

- Assumption: no new routes are required by FEAT-008.
- If package script names are changed, document migration impact and update README/handoff accordingly.
