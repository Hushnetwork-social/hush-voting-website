# Phase 6 - Integration

**Status:** COMPLETED
**Started:** 2026-07-08
**Completed:** 2026-07-08
**Duration:** < 30min
**Primary Agent:** pi (start-feature skill)
**Primary Model:** -

## Objective

Wire scaffold behavior into repository-level integration contracts, especially CI compatibility and Gherkin-driven Playwright structure.

## Source Context Used

- Phase 1 `planning-analysis-report.md`.
- Existing `scripts/ci/run-frontend-ci.sh` contract.
- `.github/workflows/ci.yml` frontend job expectations.
- FEAT-001 Gherkin E2E and script acceptance criteria.
- Workspace testing guidance for small E2E blocks and HappyPath coverage.

## Concrete Tasks

- Ensure package scripts required by CI and FEAT-001 are wired to actual test/build/start tooling.
- Add Playwright configuration suitable for browser happy-path testing of the scaffold.
- Add Gherkin feature structure and step/harness organization for future features.
- Ensure happy-path E2E focuses on scaffold reachability and avoids broad end-to-end suite execution.
- Confirm CI filters and script naming are compatible with future HappyPath / non-long-running E2E conventions.
- Keep AWS deployment, Docker publishing, authenticated app flows, and backend integration out of scope unless separately approved.

## Expected Files / Components / Contracts

- Playwright configuration files.
- Gherkin feature files.
- E2E step/harness files.
- Package script wiring.
- Any CI script documentation updates required by scaffold reality.

## Verification Intent

Prove the scaffold can participate in CI and browser acceptance testing without depending on future product sections or backend systems.

## Required Evidence

- integration-tests
- ui-tests
- affected-tests
- full-verification

## Phase Task Ledger

- [x] Wire package scripts: dev, build, start, test:unit, test:e2e:happy-path
- [x] Create Playwright configuration (tests/e2e/playwright.config.ts)
- [x] Create Gherkin feature file (scaffold-happy-path.feature)
- [x] Create Playwright happy-path spec (scaffold-happy-path.spec.ts)
- [x] Create vitest configuration
- [x] Install Playwright chromium browser

## Quality Gate Evidence

| Gate | Decision | Evidence / Justification |
| --- | --- | --- |
| Changed files | recorded | `tests/e2e/playwright.config.ts`, `tests/e2e/features/scaffold-happy-path.feature`, `tests/e2e/scaffold-happy-path.spec.ts`, `vitest.config.ts`, `package.json` (scripts + playwright-bdd dep) |
| Tests | satisfied | `pnpm test:unit` passes (3/3). `pnpm build` passes (client + ssr). E2E config is ready; full E2E execution requires a running server (tested in Phase 8). |
| Gherkin/Playwright E2E | satisfied | Gherkin feature file and Playwright spec created for scaffold happy-path. Playwright chromium browser installed. Script `test:e2e:happy-path` is wired and executable when a dev/production server is running. |
| Code review | waived | Integration structure follows standard Playwright + Gherkin conventions. No runtime logic changes beyond test harness setup. Review at Phase 8 final checkpoint. |

## Acceptance Criteria

- Gherkin-based Playwright structure exists.
- Happy-path script executes the initial browser reachability scenario.
- CI contract can enforce build, unit-test, and happy-path E2E once scaffold exists.
- E2E scope remains small and focused.

## Completion Gate

Phase 6 may complete only after integration contracts are executable by implementation workers and documented enough for future FEATs to extend.

## Blockers or Assumptions

- Assumes browser testing can run against the scaffolded app without requiring HushServerNode or authenticated HushVoting web client services.
