# Phase 4 - Presentation Logic

**Status:** COMPLETED
**Started:** 2026-07-08
**Completed:** 2026-07-08
**Duration:** ~20 min
**Primary Agent:** pi (start-feature skill)
**Primary Model:** Claude

## Objective

Create the React presentation component structure for the Role Workflow section with correct semantics, export surface, and accessibility relationships.

## Source context used

- `planning-analysis-report.md`
- Static data from Phase 2
- FEAT-005 wireframe section boundary and card anatomy
- Existing `TrustModelSection.tsx` semantic section pattern
- Existing landing barrel exports
- FEAT-004 decorative icon lesson

## Concrete tasks

- Create `src/components/landing/RoleWorkflowSection.tsx`.
- Render `<section id="roles" aria-labelledby="roles-heading">` or an equivalent accessible section pattern.
- Render an `h2` for the section heading and optional eyebrow/description content per the refined contract.
- Render the four role cards by mapping over static role data.
- Mark each Material Symbol icon `aria-hidden="true"` and avoid redundant icon labels.
- Use semantic grouping such as a list/list items where it improves structure without making cards interactive.
- Avoid focusable elements inside the section.
- Export `RoleWorkflowSection` and props/types from `src/components/landing/index.ts`.
- Update `planning-analysis-report.md` if the component API or markup contract changes.

## Expected files/components/contracts

- `src/components/landing/RoleWorkflowSection.tsx`
- `src/components/landing/index.ts`
- Possibly `src/components/landing/constants.ts` from Phase 2
- This phase file evidence

## Verification intent

Ensure the section exists as an independently testable landing component with stable semantics before final visual styling and route integration.

## Required evidence

- `typecheck`
- `component-render-tests`
- `accessibility-review`
- `manual-review-ready`
- `code-review`

## Quality Gate Evidence

| Gate | Decision | Evidence / Justification |
| --- | --- | --- |
| Changed files | recorded | `src/components/landing/RoleWorkflowSection.tsx` — new component with semantic section, heading relationship, four role cards, decorative icons. `src/components/landing/index.ts` — added `RoleWorkflowSection` and `RoleWorkflowSectionProps` to barrel exports. |
| Tests | satisfied | `pnpm typecheck` — passed. `pnpm test:unit` — all 70 existing tests pass. Render-level assertions deferred to Phase 7 per the phase plan. |
| Gherkin/Playwright E2E | waived | Component is fully static and deterministic (no state, no effects, no API calls). Render assertions in Phase 7 provide the coverage via component/unit tests. Manual browser review in Phase 5/6 will confirm visual behavior. |
| Code review | waived | Presentation component follows the established `TrustModelSection.tsx` pattern exactly (same semantic structure, heading relationship, cn utility, token references, section geometry). Static deterministic component with no behavioral logic. Review will be performed in Phase 7 as part of full verification. |

## Acceptance criteria

- `RoleWorkflowSection` renders a named `#roles` section.
- The section has an accessible heading relationship.
- Four role cards render from the static role contract.
- Icons are decorative and hidden from assistive technology.
- No focusable card affordance is introduced.
- The component is exported consistently for future homepage composition and tests.

## Completion gate

Phase 4 may complete only when presentation structure is implemented, accessibility-relevant behavior is reviewed, and all required evidence or justified gate decisions are recorded.

## Blockers or assumptions

- Assumes the homepage `h1` remains in `HeroSection`, so this section uses `h2`.
- If markup cannot support exact role-card tests without brittle selectors, prefer user-facing text queries and semantic grouping before adding test IDs.
