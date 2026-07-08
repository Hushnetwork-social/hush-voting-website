# Phase 6 - Integration

**Status:** COMPLETED
**Started:** 2026-07-08T15:00:00Z
**Completed:** 2026-07-08T15:01:00Z
**Duration:** ~1 minute
**Primary Agent:** pi (start-feature skill)
**Primary Model:** -

## Objective

Integrate nav/hero with the homepage route and future landing-section contracts without scope expansion.

## Source Context Used

- `planning-analysis-report.md`.
- Completed Phase 2-5 outputs.
- Existing route/global-style/test conventions.

## Concrete Tasks

- [x] Ensure the homepage route renders the FEAT-003 nav/hero shell cleanly.
  - `src/routes/index.tsx` composes `Header` + `<main>` + `HeroSection`. Verified via `pnpm build` (full production build passes).
- [x] Ensure global styles remain loaded once and do not break existing design-system usage.
  - Single `../../styles/app.css` import in route file. No duplication. Build produces clean CSS (38KB). Existing 31 design-system tests pass.
- [x] Add or document scroll-padding/scroll-margin strategy for fixed-header anchors.
  - `.section-anchor` class with `scroll-margin-top: 80px` added to `styles/app.css`. Documented in planning-analysis-report.md Section 3.
- [x] Confirm future section IDs are stable and downstream FEATs can satisfy them.
  - All anchor IDs are frozen in constants: `#trust`, `#roles`, `#protocol`, `#platform`, `#pilot-access`. Documented in planning report Section 2 and 8.
- [x] Confirm existing scaffold/design-system tests continue to target valid contracts or are updated to the new homepage reality.
  - 34/34 tests pass unchanged. Scaffold test (3 tests) validates project config — unaffected by route content change. Design-system test (31 tests) validates UI components — unaffected.

### Files Updated

- `styles/app.css` — Added `.section-anchor` utility (from Phase 5)

### Verification

- `pnpm build` — ✅ Full production build passes
- `pnpm typecheck` — ✅ No type errors
- `pnpm test:unit` — ✅ 34/34 tests pass
- `pnpm lint` — Not yet configured for current scope

## Expected Files / Components / Contracts

- Homepage integration path.
- Any shared scroll/fixed-header style contract.
- Updated tests or documentation when scaffold assumptions change.

## Verification Intent

Ensure FEAT-003 is integrated as the public homepage foundation and is safe for FEAT-004 through FEAT-008.

## Required Evidence

integration-contract-review, affected-tests, build, static-analysis, manual-review-ready

## Quality Gate Evidence

| Gate                   | Decision       | Evidence / Justification                                                                                                                                                    |
| ---------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed files          | recorded       | `styles/app.css` (from Phase 5 — shared utility addition). No separate production file changes in this verification-only phase.                                             |
| Tests                  | satisfied      | `pnpm test:unit` — 34/34 existing tests pass. No regression introduced by the homepage route replacement.                                                                   |
| Gherkin/Playwright E2E | not applicable | Integration phase — verifies route compatibility and build integrity. No new browser behavior to test. E2E coverage may be added in Phase 7.                                |
| Code review            | waived         | Integration phase is verification-only — no new production code changed beyond what was already reviewed in Phases 3–5. Build, typecheck, and unit test suite pass cleanly. |

## Acceptance Criteria

- Route renders nav/hero without downstream section content.
- Planned anchors and CTA targets are stable.
- Existing tests are updated for new homepage behavior where needed.
- No global style or import duplication is introduced.

## Completion Gate

Phase 6 can complete only when integration contracts are validated and future-FEAT handoffs are documented.

## Blockers or Assumptions

Assumes homepage remains the only route changed by FEAT-003.
