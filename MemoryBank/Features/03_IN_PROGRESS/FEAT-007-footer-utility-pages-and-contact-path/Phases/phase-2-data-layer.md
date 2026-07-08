# Phase 2 - Data Layer

**Status:** COMPLETED
**Started:** 2026-07-08T22:50Z
**Completed:** 2026-07-08T23:18Z
**Duration:** ~28min
**Primary Agent:** Pi (start-feature skill, autonomous mode)
**Primary Model:** -

## Objective

Add the typed static constants and pure data contracts that drive FEAT-007 components, routes, and tests.

## Source context used

- `planning-analysis-report.md` created in Phase 1.
- FEAT-007 design summary and data contract wireframe.
- Existing `src/components/landing/constants.ts` and FEAT-003 through FEAT-006 constants patterns.
- Existing static-section unit test patterns in `tests/unit/landing.test.tsx`.

## Concrete tasks

- [x] Add typed constants/types for `FINAL_CTA_SECTION`.
- [x] Add typed constants/types for `PILOT_ACCESS_MAILTO`.
- [x] Add typed constants/types for `DOWNLOAD_OVERVIEW_CTA`, using `#protocol` as safe interim.
- [x] Add typed constants/types for `FOOTER_LINKS` and utility route definitions.
- [x] Add typed constants/types for `UTILITY_PAGES` including pending-review status and safe placeholder body copy.
- [x] Add or update constants-backed tests for labels, routes, order, copy, mailto fields, and absence of broken `href="#"` placeholder behavior.
- [x] Keep long copy assertions imported from constants where practical to avoid drift.
- [x] Update `planning-analysis-report.md` if any constant contract changes (no changes were needed).

## Expected files/components/contracts

- `src/components/landing/constants.ts` or a clearly equivalent constants module.
- `tests/unit/landing.test.tsx` or a FEAT-007-specific unit test file.
- Optional small type exports if existing patterns require them.
- No rendered UI components are required in this phase.

## Verification intent

The static content source of truth exists before component implementation and tests can fail early on copy, route, or placeholder-target drift.

## Required evidence

- `typecheck`: typed constants compile without widening or unsafe `any` usage.
- `unit-tests`: constants-backed tests cover CTA, mailto fields, overview target, footer links, and utility page copy.
- `mailto-contract`: subject/body/to values live in constants.
- `utility-route-contract`: all utility routes and copy live in constants.
- `no-white-border-regression`: if component markup is not yet present, record why the regression belongs to Phase 5/7.

## Quality Gate Evidence

| Gate                   | Decision       | Evidence / Justification                                                                                                                                                                                  |
| ---------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed files          | recorded       | `src/components/landing/constants.ts` (added FEAT-007 typed constants + types), `src/components/landing/index.ts` (added barrel exports), `tests/unit/landing.test.tsx` (added constants contract tests). |
| Tests                  | satisfied      | `pnpm test:unit` — 136/136 tests pass including 17 new FEAT-007 constants tests. `pnpm typecheck` — clean (no errors).                                                                                    |
| Gherkin/Playwright E2E | not applicable | Phase 2 is data/constants-only; browser/UI behavior is introduced in later phases.                                                                                                                        |
| Code review            | waived         | Constants are simple `as const` objects with no branching, logic, or side effects. TypeScript catches any type-level drift. Review gates will be enforced in code-relevant Phases 4-7.                    |

## Acceptance criteria

- All FEAT-007 copy, links, routes, and mailto configuration have typed constants.
- Tests assert the constants contract and prevent `Download overview` from becoming `href="#"`.
- Components can consume constants without duplicating source-of-truth strings.

## Completion gate

Do not proceed to Phase 3 until the constants contract is typed, tested, and aligned with the planning report.

## Blockers or assumptions

- If owner changes pilot inbox or overview target, update constants and planning-analysis before completing this phase.
