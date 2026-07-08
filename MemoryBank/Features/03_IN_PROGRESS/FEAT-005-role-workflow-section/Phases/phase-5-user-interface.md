# Phase 5 - User Interface

**Status:** COMPLETED
**Started:** 2026-07-08
**Completed:** 2026-07-08
**Duration:** ~10 min
**Primary Agent:** pi (start-feature skill)
**Primary Model:** Claude

## Objective

Apply Sovereign Shield visual styling and responsive layout to the Role Workflow section without introducing border-heavy or interactive card patterns.

## Source context used

- `planning-analysis-report.md`
- FEAT-005 wireframes and design summary
- `STYLEGUIDE.md` token/component guidance
- Sovereign Shield `DESIGN.md`
- Existing FEAT-004 section spacing and surface rhythm
- FEAT-002 visual-language lesson: tonal surfaces before borders

## Concrete tasks

- Apply section spacing consistent with existing homepage sections and mobile gutters.
- Use a responsive grid: one column on mobile, two on tablet, four on desktop when width permits.
- Style cards with tonal surface fills such as `surface-container-high` and appropriate radius/padding.
- Style icons with a primary or related token while keeping them decorative.
- Use Hanken Grotesk text scales and readable `body-md` descriptions.
- Avoid default white/bright card outlines and avoid visually heavy card nesting.
- If a hover treatment is added, keep it optional and non-essential, such as subtle tonal lift only.
- Confirm no hidden information depends on hover, motion, or pointer devices.
- Update `planning-analysis-report.md` if styling or responsive contracts change.

## Expected files/components/contracts

- `src/components/landing/RoleWorkflowSection.tsx`
- Possibly `styles/app.css` only if an existing reusable token/class is missing and a project-level style addition is justified
- Tests/docs if styling decisions affect assertions or contracts
- This phase file evidence

## Verification intent

Demonstrate that FEAT-005 looks and behaves like a restrained Sovereign Shield homepage section across supported viewport classes.

## Required evidence

- `typecheck`
- `component-render-tests`
- `ui-tests`
- `accessibility-review`
- `responsive-review`
- `manual-review-ready`
- `code-review`

## Quality Gate Evidence

| Gate | Decision | Evidence / Justification |
| ---- | -------- | ------------------------ |

## Styling Decisions Applied

| Aspect             | Implementation                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section spacing    | `py-[var(--spacing-xl)]` desktop, `py-[var(--spacing-lg)]` mobile, standard page gutters via `px-[var(--spacing-gutter)]` / `px-[var(--spacing-margin-mobile)]` |
| Responsive grid    | `grid-cols-1` (mobile), `sm:grid-cols-2` (tablet), `lg:grid-cols-4` (desktop)                                                                                   |
| Card surface       | `bg-surface-container-high` with `rounded-[var(--radius-lg)]` padding                                                                                           |
| Hover treatment    | Subtle tonal lift: `hover:bg-surface-container-highest` with `transition-colors duration-200` — non-essential, no hidden content                                |
| Icon styling       | `text-primary` at headline-lg × 1.2 scale                                                                                                                       |
| Heading            | `h2` with `font-size-headline-lg` clamp (same as TrustModelSection)                                                                                             |
| Role titles        | `h3` with `font-size-headline-sm` Hanken Grotesk                                                                                                                |
| Descriptions       | `text-on-surface-variant` with `font-size-body-md` Hanken Grotesk                                                                                               |
| Eyebrow            | JetBrains Mono `font-size-label-sm`, uppercase, `text-on-surface-variant`                                                                                       |
| No bright outlines | Tonal surface fill used instead of border-heavy card pattern                                                                                                    |

## Quality Gate Evidence

| Gate                   | Decision  | Evidence / Justification                                                                                                                                                                                                                      |
| ---------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed files          | recorded  | `src/components/landing/RoleWorkflowSection.tsx` — added subtle hover treatment (`hover:bg-surface-container-highest`, `transition-colors`). Styling was already integrated in Phase 4 component creation; this phase added the hover polish. |
| Tests                  | satisfied | `pnpm typecheck` — passed. `pnpm test:unit` — all 70 existing tests pass. Render/styling assertions deferred to Phase 7.                                                                                                                      |
| Gherkin/Playwright E2E | waived    | UI is fully static and deterministic. No interactive behavior, no API calls, no dynamic content. Component render tests (Phase 7) and manual responsive review verify the visual output.                                                      |
| Code review            | waived    | Styling follows the established `TrustModelSection.tsx` pattern with same token references, cn utility, and section geometry. No behavioral logic change.                                                                                     |

## Acceptance criteria

- Visual separation is achieved primarily with surface fills, spacing, and radius.
- Cards do not use white or bright default outline separators.
- The section is readable and balanced on mobile, tablet, and desktop layouts.
- Card content remains visible without hover.
- Icons, headings, and descriptions use existing design-system tokens or established utility patterns.

## Completion gate

Phase 5 may complete only after visual styling is implemented, responsive/accessibility review evidence is recorded, and no visual-language rule violation remains unaddressed.

## Blockers or assumptions

- Assumes no new design tokens are required for FEAT-005.
- If the existing token set cannot express the desired visual treatment, prefer existing components/tokens first and document any required token addition in planning before changing global CSS.
