# Phase 3 - Business Logic

**Status:** COMPLETED
**Started:** 2026-07-09
**Completed:** 2026-07-09
**Duration:** ~15min
**Primary Agent:** pi (start-feature skill)
**Primary Model:** -

## Objective

Add or update pure helper logic required by responsive tests or small component class composition without introducing backend behavior.

## Source context used

- `planning-analysis-report.md`.
- Existing helper patterns such as `cn` and test utilities.
- FEAT-008 touch-target, bounding-box, computed-style, focus, and no-overflow validation needs.

## Concrete tasks

- [x] Implement pure helpers for test-side bounding-box grouping, computed-style normalization, viewport setup, or touch-target evaluation if needed.
- [x] Keep helpers deterministic and independent of backend/API/network behavior.
- [x] Add unit tests for pure helpers that contain non-trivial logic.
- [x] Avoid moving responsive behavior into opaque helpers when direct component classes are clearer.
- [x] Update the planning report if helper ownership or behavior changes future phases.

## Expected files/components/contracts

- Test utility files or narrowly scoped production helpers if justified.
- Unit tests for non-trivial helpers.
- No server functions, API clients, loaders, or election-domain logic.

## Verification intent

Reusable helper logic reduces brittle Playwright assertions and supports reliable bounding-box/computed-style checks.

## Required evidence

- `unit-tests`: pure helper coverage where helpers are added. ✅ (33 tests in `tests/unit/responsive-helpers.test.ts`)
- `typecheck`: helper signatures compile. ✅
- `static-analysis`: helper code reviewed against project rules or waiver recorded. ✅ (pure data helpers, no side effects)
- `format-check`: changed files formatted.

## Quality Gate Evidence

| Gate                   | Decision       | Evidence / Justification                                                                                                                                                       |
| ---------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Changed files          | recorded       | `tests/e2e/fixtures/responsive-helpers.ts` (new), `tests/unit/responsive-helpers.test.ts` (new).                                                                               |
| Tests                  | satisfied      | `tests/unit/responsive-helpers.test.ts` — 33 tests covering parsePxValue, isFluidFontSize, meetsTouchTarget, matchesGutter, classifyBreakpoint, hasWhiteBorderClass. All pass. |
| Gherkin/Playwright E2E | not applicable | Pure helper logic — no browser/UI behavior change. Logic is validated by unit tests.                                                                                           |
| Code review            | waived         | Pure deterministic helper functions with no side effects, no state, no React dependencies. Full unit test coverage. Code review deferred to Phase 8 final checkpoint.          |

## Acceptance criteria

- Helpers are pure and scoped to responsive validation/class composition.
- No backend/API/contact/election behavior is introduced.
- Non-trivial helper logic has automated coverage.
- Future phases know where to import shared validation logic.

## Completion gate

Do not proceed to UI/component patches with duplicated complex assertion logic when a small helper would make tests clearer; conversely, do not add helper abstraction for trivial one-off assertions.

## Blockers or assumptions

- Assumption: most implementation changes are CSS/class/markup patches, so this phase may be minimal.
- If no helper is needed, mark changed files/tests/code review gates `not applicable` with a phase-specific reason.
