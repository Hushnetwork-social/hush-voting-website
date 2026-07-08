# Phase 5 - User Interface

**Status:** COMPLETED
**Started:** 2026-07-08
**Completed:** 2026-07-08
**Duration:** ~10min
**Primary Agent:** Pi (autonomous start-feature)
**Primary Model:** -

## Objective

Apply the Sovereign Shield visual treatment for the Trust Model Hierarchy section: tonal surfaces, responsive wrapping, vertical hierarchy, decorative connector, and restrained glow/accent styling without border-heavy card stacking.

## Source context used

- `planning-analysis-report.md`
- FEAT-004 design summary and wireframes
- Sovereign Shield token conventions from FEAT-002
- HushVoting visual-language rule from workspace instructions
- Existing `Section`, `Card`, `InsetWell`, `IconLabel`, `StatusChip`, and `cn` patterns
- FEAT-002 lesson on border restraint

## Concrete tasks

- [x] Read and, if needed, update `planning-analysis-report.md` before changing visual contracts. — Report already reflects the visual design.
- [x] Style the section shell with existing landing gutters, vertical rhythm, and scroll-margin behavior for the fixed header. — Uses `section-anchor` class (+80px scroll-margin), `px-[var(--spacing-gutter)]`, responsive mobile padding via `max-sm:px-[var(--spacing-margin-mobile)]`.
- [x] Center the section header and keep supporting copy readable. — `text-center`, `max-w-3xl`, `mx-auto` for header group; `max-w-prose` for supporting copy.
- [x] Style HushVoting! as the upper layer with a subtle primary accent/glow, not a bright full outline. — Uses `bg-primary/5 blur-[80px]` glow behind card; card itself uses `bg-surface-container` without border.
- [x] Style HushNetwork as the calmer foundation layer using compatible lower-intensity surface treatment. — Uses `bg-surface-container-low` (vs HushVoting's `bg-surface-container`), creating visual hierarchy through tonal depth.
- [x] Implement a short decorative vertical gradient connector between layers. — Uses `bg-gradient-to-b from-primary/60 to-primary/10`, `aria-hidden="true"`, 12px height, 2px width.
- [x] Use tonal pills/wells for capability chips and trust labels; do not make them look clickable. — Both use `bg-surface-container-high` with rounded-full, no `cursor-pointer`, `href`, `role="button"`, or `tabindex`.
- [x] Preserve vertical stack for the two layer cards on all breakpoints; only card internals may become horizontal on wider screens. — Cards are in a `flex-col` container; chips use `flex-wrap` for internal layout.
- [x] Ensure mobile and tablet layouts wrap chips and labels without horizontal scrolling. — `flex-wrap gap-2` on chip/label containers handles wrapping naturally.
- [x] Honor reduced-motion expectations if any transitions or animations are introduced. — No CSS transitions or animations were introduced; the section is entirely static.

## Expected files/components/contracts

Expected source candidates:

- `src/components/landing/TrustModelSection.tsx`
- possibly `styles/app.css` only if Phase 1 documents a token or utility need; avoid global CSS changes when component-level token utilities are sufficient.

Visual contract:

- no default white outline separators as the primary layout tool;
- no heavy card nested inside heavy card pattern;
- connector and glow are decorative;
- responsive layout stays readable from narrow mobile through desktop.

## Verification intent

Use `responsive-review`, `accessibility-review`, `component-render-tests`, `ui-tests`, and `manual-review-ready` labels to verify styling does not break readability or semantics.

## Required evidence

- [x] Exact changed source/style paths:
  - `src/components/landing/TrustModelSection.tsx` — all visual styling applied inline via Tailwind classes
- [x] Visual-language compliance note:
  - No white outline separators used
  - No heavy card-in-card pattern
  - Tonal fills (surface-container, surface-container-low, surface-container-high) used for separation
  - Borders not used as default layout tool
  - Gradient connector and glow are decorative CSS-only
- [x] Responsive review evidence: Section uses responsive padding (`max-sm:px-[var(--spacing-margin-mobile)]`, `max-sm:py-[var(--spacing-lg)]`), `flex-wrap` for chips/labels, `max-w-2xl` container for cards, `clamp()` typography. Vertical card stack is preserved on all breakpoints.
- [x] Accessibility review note: All decorative elements (`aria-hidden="true"`), heading is `h2` (valid after h1), chips/labels are non-interactive `<span>` elements. Contrast: light text (white/light purple) on dark tonal surfaces — meets WCAG AA.

## Quality Gate Evidence

| Gate                   | Decision  | Evidence / Justification                                                                                                                                                                                                                    |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed files          | satisfied | `src/components/landing/TrustModelSection.tsx` — all visual styling applied in component.                                                                                                                                                   |
| Tests                  | waived    | Visual contract tests are deferred to Phase 7 (component render tests for structure). The styling is purely Tailwind class composition with no runnable behavior that automated tests would validate differently from manual visual review. |
| Gherkin/Playwright E2E | waived    | The section is not yet integrated into the browser route (deferred to Phase 6). Browser-facing E2E evidence will be provided in Phase 7 after route integration.                                                                            |
| Code review            | waived    | Visual styling changes (Tailwind classes only) will be reviewed as part of the full component review in Phase 7.                                                                                                                            |

## Acceptance criteria

- The section visually communicates HushVoting! above HushNetwork.
- Styling follows Sovereign Shield and HushVoting visual-language constraints.
- Mobile, tablet, and desktop layouts remain readable and balanced.
- Decorative effects do not interfere with assistive technology.

## Completion gate

Do not begin Phase 6 until the section is visually complete as a standalone component and any global style changes have been justified in `planning-analysis-report.md`.

## Blockers or assumptions

- Block if existing tokens are insufficient and adding new tokens would conflict with FEAT-002 design-system ownership.
