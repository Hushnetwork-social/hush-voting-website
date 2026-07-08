# Design Summary — FEAT-002: Design System Implementation (Sovereign Shield)

## Final Design Decisions

1. **FEAT-002 is a foundation feature.** It delivers production-ready design tokens, reusable UI primitives, and documentation. It must not implement the full landing page sections owned by FEAT-003 through FEAT-008.
2. **Sovereign Shield is the token source of truth.** All colors, typography scales, spacing tokens, and radius tokens from `DESIGN.md` must be represented in Tailwind v4 CSS-first configuration.
3. **The HushVoting visual language is mandatory.** Separation should come from complementary surface fills, spacing, and radius before borders. Borders are mainly for focus, selected, warning, or error states.
4. **Component library scope is fixed to the FEAT description.** Required components are `Button`, `Section`, `Card`, `InsetWell`, `MetricCard`, `StatusChip`, and `IconLabel`.
5. **Documentation is part of the deliverable.** `STYLEGUIDE.md` must explain token usage, component variants, accessibility expectations, and do/don't examples.
6. **No new semantic palette should be invented.** If a later section wants a success/verified concept, map it to approved primary/secondary/tertiary tokens plus clear copy/icons rather than adding ad-hoc green.
7. **Material Symbols are the icon baseline.** Icons should be decorative when paired with visible text and must not replace accessible labels.
8. **Canonical validation matters.** Refinement/implementation must use the package scripts named in the FEAT: `pnpm build` and `pnpm test:unit`.

## Implementation Checklist for Refinement

### Token contract

- [ ] Audit `styles/app.css` against every token in `DESIGN.md`.
- [ ] Preserve Tailwind v4 CSS import ordering: external font import before `@import "tailwindcss"`.
- [ ] Confirm all color tokens are available as Tailwind utilities.
- [ ] Confirm typography utilities exist or document how components apply font size, line height, weight, and letter spacing.
- [ ] Confirm spacing and radius tokens are available and named predictably.
- [ ] Avoid replacing the CSS-first Tailwind v4 setup unless a blocker is documented.

### Components

- [ ] Create required component library in a stable UI folder.
- [ ] Export components through a central index if compatible with project conventions.
- [ ] `Button`: variants `primary`, `secondary`, `ghost`; visible focus, hover/active, disabled states.
- [ ] `Section`: max-width, vertical rhythm, optional eyebrow/title/description/actions, responsive gutters.
- [ ] `Card`: tonal variants without default bright borders; optional accent/state treatment.
- [ ] `InsetWell`: darker carved content area for evidence/metrics/readouts.
- [ ] `MetricCard`: label + value well + optional description; safe fallback for empty value.
- [ ] `StatusChip`: pill status label with approved token tones and optional icon.
- [ ] `IconLabel`: Material Symbol + visible text with accessible icon behavior.

### Documentation

- [ ] Add `STYLEGUIDE.md` with token tables, component examples, variant guidance, accessibility notes, and visual-language rules.
- [ ] Include examples showing how later FEATs compose trust cards, role cards, evidence wells, and CTA buttons from primitives.
- [ ] Explicitly warn against white-outline-everywhere layouts and heavy nested cards.
- [ ] Document which states each component supports.

### Tests and validation

- [ ] Add unit tests for component render contracts, variants, disabled behavior, and accessible labels where practical.
- [ ] Add token/style contract tests if practical without brittle CSS parsing.
- [ ] Run `pnpm build`.
- [ ] Run `pnpm test:unit`.
- [ ] Do not substitute direct tool commands for canonical scripts.

## UI States Phase Planning Must Preserve

| State            | Requirement                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Default          | Components use calm tonal fills and readable typography on the deep background.                         |
| Hover            | Hover is a tonal enhancement only; no required information is hover-only.                               |
| Focus            | Every interactive component has a visible primary focus ring.                                           |
| Active/pressed   | Buttons may use subtle scale or tonal shift without causing layout shift.                               |
| Disabled         | Disabled controls are visibly muted and non-interactive.                                                |
| Loading          | Styleguide documents skeleton/pending treatment; optional primitive may be added if refinement chooses. |
| Empty            | Optional component regions can be omitted cleanly; metrics use explicit fallback values.                |
| Error/warning    | Uses error tokens plus text/icon context, not color alone.                                              |
| Selected/current | Ring/border is allowed because it conveys state; pair with text or ARIA where interactive.              |
| Responsive       | Components stack/wrap on mobile and preserve 48px touch targets for interactive controls.               |

## Risks and Mitigations

| Risk                                         | Impact                                                                   | Mitigation                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Token drift from `DESIGN.md`                 | Later FEATs style inconsistently                                         | Treat token audit as a required task and document exact mappings in `STYLEGUIDE.md`.      |
| Prototype border habits leak into production | Site becomes outline-heavy and conflicts with HushVoting visual language | Make default components borderless/tonal; allow borders only for meaningful states.       |
| Component APIs over-generalize too early     | FEAT-002 becomes slow and hard to test                                   | Keep APIs small and aligned to known FEAT-003–FEAT-008 needs.                             |
| Missing focus/disabled states                | Accessibility regressions across all future pages                        | Test Button and interactive patterns early; document focus expectations.                  |
| Ad-hoc semantic colors                       | Brand inconsistency and contrast uncertainty                             | Use only Sovereign Shield tokens unless a future design-system update approves additions. |
| Build validation mismatch                    | Broken canonical scripts can survive implementation                      | Follow FEAT-001 lesson: validate with `pnpm build` and `pnpm test:unit`.                  |

## Assumptions

- The current TanStack Start + Tailwind v4 scaffold from FEAT-001 remains the implementation base.
- The public website does not require authenticated election UI primitives in FEAT-002.
- `STYLEGUIDE.md` is developer-facing Markdown, not a route/page.
- Components may use utility classes directly; no separate styling library is required unless refinement identifies a concrete need.
- No visual screenshot test is required for FEAT-002 unless the team adds one during refinement.

## Out of Scope

- Full navigation and hero implementation.
- Landing-page content section implementation.
- Utility pages, contact forms, mailto behavior, and download assets.
- Authenticated election execution, voting, trustee approval, or auditor workflow UI.
- Moving the feature to Ready To Develop or creating phase/task files.

## Ready-for-Refinement Notes

FEAT-002 is sufficiently designed for `refine-feature`. The refinement should break work into token audit, component implementation, styleguide documentation, tests, and canonical validation while preserving the visual-language rules above.
