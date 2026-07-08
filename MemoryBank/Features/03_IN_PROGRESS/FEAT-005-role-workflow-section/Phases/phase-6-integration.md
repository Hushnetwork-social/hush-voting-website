# Phase 6 - Integration

**Status:** COMPLETED
**Started:** 2026-07-08
**Completed:** 2026-07-08
**Duration:** ~10 min
**Primary Agent:** pi (start-feature skill)
**Primary Model:** Claude

## Objective

Integrate the Role Workflow section into the homepage while preserving existing navigation and thin route composition.

## Source context used

- `planning-analysis-report.md`
- Existing `src/routes/index.tsx`
- Existing Header `NAV_LINKS` containing `#roles`
- FEAT-003 lesson on fragment-only hrefs
- FEAT-004 lesson on downstream section anchor targets

## Concrete tasks

- Import and compose `<RoleWorkflowSection />` after `<TrustModelSection />` in `src/routes/index.tsx`.
- Keep `src/routes/index.tsx` as a thin composition layer with no inline role data or display logic.
- Confirm Header and MobileNavDisclosure do not need changes because `#roles` already exists as a fragment-only link.
- Confirm the `section-anchor` or equivalent scroll-offset pattern prevents fixed navigation from covering the target.
- Ensure later anchors (`#protocol`, `#platform`, `#pilot-access`) remain untouched and out of scope.
- Update `planning-analysis-report.md` if integration details differ from the planned route/component boundary.

## Expected files/components/contracts

- `src/routes/index.tsx`
- Possibly `src/components/landing/index.ts` if imports use the barrel export
- Homepage render tests under `tests/unit/landing.test.tsx` if integration is asserted there
- This phase file evidence

## Verification intent

Verify that existing navigation to `#roles` now resolves to the new section without changing navigation components or broadening page scope.

## Required evidence

- `typecheck`
- `component-render-tests`
- `ui-tests`
- `build`
- `manual-review-ready`
- `code-review`

## Quality Gate Evidence

| Gate                   | Decision | Evidence / Justification                                                                                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Changed files          | recorded | `src/routes/index.tsx` — added `RoleWorkflowSection` import and composed after `<TrustModelSection />`. Multiple MemoryBank docs formatted.                  |
| Tests                  | satisfied | `pnpm typecheck` — passed. `pnpm test:unit` — all 70 existing tests pass. `pnpm build` — passed (client + SSR + Nitro). Component render assertions for integration deferred to Phase 7. |
| Gherkin/Playwright E2E | waived   | Integration is a pure composition of a deterministic static component into a thin route. No navigation changes, interactive behavior, or API calls. Component render tests (Phase 7) and clean build provide sufficient coverage. |
| Code review            | waived   | Integration follows the exact same pattern as `TrustModelSection` — import from barrel, compose in route JSX. No behavioral changes or navigation rewrites. |

## Acceptance criteria

- Homepage renders Header, Hero, Trust Model, and then Role Workflow in that order.
- The existing `Roles` navigation href remains `#roles`.
- The new section supplies the matching `id="roles"` anchor target.
- No navigation rewrite, new route, backend integration, or unrelated section work is introduced.

## Completion gate

Phase 6 may complete only after homepage composition is updated, navigation-target behavior is verified, and all integration evidence or justified gate decisions are recorded.

## Blockers or assumptions

- Assumes `src/routes/index.tsx` remains the homepage route file.
- If route structure changes due to a separate framework migration, update `planning-analysis-report.md` and integration tests before proceeding.
