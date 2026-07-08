# Phase 2 - Data Layer

**Status:** COMPLETED
**Started:** 2026-07-08T14:56:00Z
**Completed:** 2026-07-08T14:57:00Z
**Duration:** ~1 minute
**Primary Agent:** pi (start-feature skill)
**Primary Model:** -

## Objective

Implement or update static in-repo content/link contracts for the nav and hero without introducing external data dependencies.

## Source Context Used

- `planning-analysis-report.md`.
- FEAT-003 approved copy and navigation labels.
- FEAT-002 component/style contracts.


## Concrete Tasks

- [x] Define navigation labels and hrefs for Trust Model, Roles, Protocol Evidence, and Platform.
  - Created `NAV_LINKS` array in `src/components/landing/constants.ts` with exact labels and hrefs from FeatureDescription.md.
- [x] Define CTA labels and hrefs for Pilot Access, Request pilot access, and View verifier model.
  - Created `CTAS` object in `constants.ts` with all three CTA definitions (pilotAccess, verifierModel, navPilotAccess).
- [x] Define hero headline and subheadline exactly as approved.
  - Created `HERO_COPY` object in `constants.ts` with exact approved copy.
- [x] Define token-based brand mark semantics and avoid external prototype asset URLs.
  - Created `BrandMark.tsx` with SVG/CSS-only shield+checkmark using currentColor and Sovereign Shield primary token.
  - No external image URLs, no prototype asset references.
- [x] Keep all data static and local to the UI feature boundary.
  - All data in `constants.ts`. No CMS, API, environment, or persistence. Exported via `index.ts` barrel.

### Files Created

- `src/components/landing/constants.ts` — Static contract constants (64 lines)
- `src/components/landing/BrandMark.tsx` — Token-based brand mark fallback (57 lines)
- `src/components/landing/index.ts` — Barrel exports (16 lines)


## Expected Files / Components / Contracts

- Static constants near the landing/nav/hero components or route, as decided by planning.
- No API client, persistence, environment, CMS, or analytics files.


## Verification Intent

Create a testable static data contract that future phases can render consistently.

## Required Evidence

static-analysis, unit-tests, data-contract-review, manual-review-ready

## Quality Gate Evidence

| Gate | Decision | Evidence / Justification |
| --- | --- | --- |
| Changed files | recorded | `src/components/landing/constants.ts`, `src/components/landing/BrandMark.tsx`, `src/components/landing/index.ts` — static data contracts and token-based SVG component. |
| Tests | waived | Static data and presentational SVG component only. Data contract is validated by TypeScript typecheck (passed: `pnpm typecheck`). Phase 7 will add focused unit tests for copy/link rendering. |
| Gherkin/Playwright E2E | not applicable | No browser/UI behavior introduced during this phase. Data layer phase — only constants and a pure SVG component. |
| Code review | waived | Static data constants and a CSS-only SVG component — no executable logic, no state, no interactivity, no branching. TypeScript typecheck and existing design-system test suite (34/34 passing) validate correctness. Code review will be applied in Phases 3–7 where interactive and visual behavior is implemented. |

## Acceptance Criteria

- Approved copy is represented exactly.
- Hrefs match the refinement contract.
- No backend/API/data-loading behavior is introduced.
- No external prototype asset URL is referenced.


## Completion Gate

Phase 2 can complete only when static content/link contracts are implemented and covered by appropriate contract checks or documented review evidence.

## Blockers or Assumptions

Assumes future FEATs will satisfy planned anchor targets without requiring different labels.
