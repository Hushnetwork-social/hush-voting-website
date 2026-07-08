# Phase 4 - Presentation Logic

**Status:** PENDING
**Started:** -
**Completed:** -
**Duration:** -
**Primary Agent:** -
**Primary Model:** -

## Objective

Create semantic, deterministic FEAT-006 landing components that render the typed content contract without final visual polish becoming embedded in the route.

## Source context used

- `planning-analysis-report.md` component boundary and accessibility model.
- Typed constants created in Phase 2.
- Existing `TrustModelSection.tsx`, `RoleWorkflowSection.tsx`, UI primitive import patterns, and landing barrel exports.
- FEAT-006 wireframes and acceptance criteria.

## Concrete tasks

- Create `ProtocolEvidenceSection` with `section#protocol`, accessible heading relationship, narrative column, protocol badge, and evidence item list/grid markup.
- Create `PlatformReadinessSection` with `section#platform`, accessible heading relationship, deployment card list, and claim boundary area.
- Create `ClaimBoundaryBar` as a separate component or local child if that improves testability while keeping it part of platform readiness.
- Render all labels, descriptions, headlines, icons, and badge metadata from typed constants.
- Mark decorative icon spans `aria-hidden="true"` and avoid redundant `aria-label` values.
- Keep evidence items, cards, and badges non-interactive: no links, buttons, click handlers, modals, tooltips, or focusable wrappers.
- Export new components and Props types through `src/components/landing/index.ts`.
- Add component tests for section anchors, headings, counts, content rendering, decorative icons, claim icon fill metadata/classes, and no focusable controls.
- Update `planning-analysis-report.md` if component boundaries differ from plan.

## Expected files/components/contracts

- `src/components/landing/ProtocolEvidenceSection.tsx`.
- `src/components/landing/PlatformReadinessSection.tsx`.
- Optional `src/components/landing/ClaimBoundaryBar.tsx`.
- `src/components/landing/index.ts` barrel exports.
- `tests/unit/landing.test.tsx` or equivalent component render tests.

## Verification intent

Establish accessible static markup and testable component boundaries before detailed visual styling and route integration.

## Required evidence

- typecheck
- unit-tests
- component-render-tests
- accessibility-review
- format-check

- `ProtocolEvidenceSection` renders exactly one `section#protocol` with `Protocol Omega` as a section heading.
- `PlatformReadinessSection` renders exactly one `section#platform` with `Universal Deployment Readiness` as a section heading.
- All six evidence labels, three deployment headlines, and five claim labels render from constants.
- Decorative icons are hidden from assistive technology and do not duplicate accessible names.
- No FEAT-006 informational surface is focusable or interactive.
- New components and types are exported consistently through the landing barrel.

## Acceptance criteria

## Quality Gate Evidence

| Gate | Decision | Evidence / Justification |
| --- | --- | --- |
| Changed files | missing | Implementation worker must replace this with exact production, test, and documentation paths changed in this phase, or `not applicable` with a phase-specific reason when no files change. |
| Tests | missing | Implementation worker must record exact automated test files and commands, or change this to `waived`/`not applicable` with a phase-specific reason. |
| Gherkin/Playwright E2E | missing | Required for browser/UI behavior changes; otherwise implementation worker must change this to `waived`/`not applicable` and explain why unit, contract, or integration coverage is enough. |
| Code review | missing | Implementation worker must record the phase review report path, or change this to `waived`/`not applicable` with an explicit risk rationale. |


## Completion gate

Phase 4 may complete only when every task above is done, required evidence is recorded, and all quality gate rows are satisfied, not applicable, or waived with phase-specific justification.

## Blockers or assumptions

- If a requirement for interactive evidence details appears, stop and request a separate/refined FEAT because that changes scope.
- If component line length approaches unmaintainable size with duplicated patterns, extract small local subcomponents rather than moving logic into the route.
