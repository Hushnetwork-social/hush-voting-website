# Phase 2 - Data Layer

**Status:** COMPLETED
**Started:** 2026-07-08
**Completed:** 2026-07-08
**Duration:** ~15 min
**Primary Agent:** pi (start-feature skill)
**Primary Model:** Claude

## Objective

Add the static, typed role workflow content contract that the presentation component and tests will consume.

## Source context used

- `planning-analysis-report.md` from Phase 1
- `FeatureTasks.md` static data contract
- FEAT-005 `design-summary.md` approved role-card contract
- Existing landing constants pattern in `src/components/landing/constants.ts`
- FEAT-004 lesson about copy-contract drift

## Concrete tasks

- Add a typed role-card model for FEAT-005 if useful for maintainability.
- Add `ROLE_WORKFLOW_SECTION` or equivalent static data containing section header copy and four role cards.
- Preserve role order: Organizations, Voters, Trustees, Auditors.
- Preserve exact approved descriptions and icon names.
- Keep data static and local to the frontend; do not introduce CMS, route loader, API, environment-variable, or backend data dependencies.
- Update exports from `src/components/landing/index.ts` if constants/types are intended to be shared with tests.
- Update `planning-analysis-report.md` if any data-contract reality differs from the plan.

## Expected files/components/contracts

- `src/components/landing/constants.ts`
- `src/components/landing/index.ts` if constants/types are exported
- `planning-analysis-report.md` if contract adjustments are required
- This phase file evidence

## Verification intent

Ensure the role workflow copy and icons are centralized, stable, type-safe, and ready for component rendering and exact-copy tests.

## Required evidence

- `typecheck`
- `unit-tests` or a phase-specific explanation if render tests are deferred to Phase 7
- `manual-review-ready`

## Quality Gate Evidence

| Gate | Decision | Evidence / Justification |
| --- | --- | --- |
| Changed files | recorded | `src/components/landing/constants.ts` — added `RoleCard` interface and `ROLE_WORKFLOW_SECTION` constant with section header copy and four role cards. `src/components/landing/index.ts` — added `ROLE_WORKFLOW_SECTION` and `RoleCard` to barrel exports. |
| Tests | satisfied | `pnpm typecheck` — passed (no errors). `pnpm test:unit` — all 70 existing tests pass; static data changes are type-safe and do not break existing coverage. |
| Gherkin/Playwright E2E | not applicable | Phase 2 changes static data only and does not yet introduce browser-rendered UI behavior. |
| Code review | waived | Static data addition only — no behavioral logic, no conditional rendering code. The data is fully deterministic (`as const`) and type-checked. Component/render tests (Phase 7) will assert exact copy. |

## Acceptance criteria

- Static role workflow data exists with exact approved role order, titles, icons, and descriptions.
- No dynamic data source, backend contract, or route loader is introduced.
- Types or `as const` constraints preserve stable literal data where practical.
- Future tests can import the contract without duplicating copy unnecessarily.

## Completion gate

Phase 2 may complete only when the static data contract is implemented, evidence is recorded, and any deviation from the refinement plan is reflected in `planning-analysis-report.md`.

## Blockers or assumptions

- Assumes existing Material Symbol icon font setup supports `corporate_fare`, `groups`, `key`, and `rule`.
- If icon names change, update data, planning, and tests together.
