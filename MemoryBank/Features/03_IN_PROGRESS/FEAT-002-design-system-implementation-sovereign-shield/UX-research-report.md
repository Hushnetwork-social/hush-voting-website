# UX Research Report — FEAT-002: Design System Implementation (Sovereign Shield)

## Context

FEAT-002 creates the reusable visual foundation for the HushVoting public website. The design system must translate the Sovereign Shield token contract from `MemoryBank/Overview/Prototype/.../sovereign_shield/DESIGN.md` into production Tailwind v4 CSS tokens and reusable React components while preserving the HushVoting visual language: calm dark surfaces, tonal hierarchy, generous spacing, rounded shapes, and restrained borders.

Primary references:

- FEAT-002 `FeatureDescription.md`
- EPIC-001 `EpicDescription.md`
- `DESIGN.md` Sovereign Shield token contract
- Prototype landing page HTML in `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html`
- HushVoting Visual Language and EPIC-013 Design Baseline
- FEAT-001 lessons learned for canonical validation and Tailwind v4 CSS import ordering

## Target Users and Jobs

### Primary implementation users

| User                          | Job to be done                                                                  | Design-system need                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| HushVoting website developers | Build FEAT-003 through FEAT-008 quickly and consistently                        | Typed reusable components with clear variants, examples, and minimal one-off utility duplication    |
| Product/design reviewers      | Confirm the public site feels serious, trustworthy, and aligned with HushVoting | Components that visibly follow Sovereign Shield surfaces, typography, spacing, and border restraint |
| QA/manual testers             | Validate visible states and accessibility behavior                              | Predictable focus, disabled, loading, and responsive behavior across all components                 |

### External end users indirectly served

| User                                          | Job to be done                                                  | UX concern                                                                        |
| --------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Prospective organization representatives      | Understand HushVoting value and request pilot access            | Clear hierarchy, credible calls to action, no noisy decorative styling            |
| Technical evaluators/auditors                 | Evaluate protocol/evidence claims                               | Technical labels, metrics, chips, and wells must read as stable evidence surfaces |
| Voters/trustees/auditors learning the product | Recognize the role model without entering the authenticated app | Icon-label and card patterns must be accessible, readable, and non-misleading     |

## Primary Workflow and Entry Points

FEAT-002 is not a user-facing page by itself. Its primary workflow is an implementation workflow used by later page FEATs:

1. Developer opens `STYLEGUIDE.md` to choose a token or component.
2. Developer imports a reusable component from the design-system component library.
3. Developer composes page sections using `Section`, `Card`, `InsetWell`, `MetricCard`, `StatusChip`, `IconLabel`, and `Button`.
4. Developer validates visual behavior through unit tests and canonical scripts (`pnpm build`, `pnpm test:unit`).
5. Later FEATs use the same primitives for hero, navigation, trust hierarchy, role cards, protocol evidence, platform readiness, CTA, footer, and utility pages.

Expected code entry points for refinement:

- `styles/app.css` for CSS-first Tailwind v4 theme tokens and base utility conventions.
- `src/components/ui/` or an equivalent UI folder for reusable primitives.
- `STYLEGUIDE.md` at the repository root or another clearly documented project-level location.
- Unit tests under `tests/unit/` for token/component contracts.

## Design Principles to Preserve

1. **Tonal hierarchy before outlines** — separate surfaces through `surface`, `surface-container-*`, and inset wells before adding borders.
2. **Borders are state, not scaffolding** — reserve borders for focus, selected, warning/error, or rare low-contrast framing.
3. **Calm technical credibility** — use Hanken Grotesk for readable communication and JetBrains Mono for labels/status metadata.
4. **No heavy card-in-card stacking** — if a section shell contains cards, the shell must be quiet and visually subordinate.
5. **Static marketing site, operational seriousness** — components should feel compatible with high-stakes voting without implying authenticated election execution on the public site.
6. **No unapproved semantic colors** — do not invent green/success palettes outside the Sovereign Shield token set; use primary/secondary/tertiary/error/neutral tones plus copy/icons.

## State Coverage

### Default state

- Components render on the deep `surface` background with `on-surface` text.
- Component hierarchy is visible through tonal fills and spacing.
- Default cards and wells do not rely on bright outlines.

### Hover/active state

- Buttons and interactive cards may shift to a nearby tonal token (`primary-container`, `surface-container-highest`) or subtle transform.
- Hover is enhancement only; no primary information or affordance may be hover-only.

### Focus state

- Every interactive component must expose a visible keyboard focus ring using the primary token.
- Focus rings may be outline/ring based because focus is a valid border use case.
- Focus state must be visible against all supported component backgrounds.

### Disabled state

- Disabled buttons/controls use reduced opacity and/or muted surface tokens.
- Disabled controls remain readable enough to explain availability when paired with text.
- Disabled controls must not be focusable unless using an ARIA pattern that requires roving focus; simple disabled buttons should use native `disabled`.

### Loading state

- Design-system primitives should support page-level skeletons without requiring a dedicated FEAT-002 skeleton component unless refinement chooses to add one.
- Recommended loading treatment: quiet `surface-container-low`/`surface-container` blocks with rounded corners and optional `aria-busy` at the containing region.
- Loading should preserve layout dimensions to prevent large shifts.

### Empty state

- FEAT-002 itself has no data-empty view, but components must support empty textual values safely.
- `MetricCard` should allow `value` fallback such as `—` when later FEATs lack a metric.
- `Section` can render without optional eyebrow/description/actions.

### Error and warning state

- Use `error`, `error-container`, and `on-error-container` tokens for true error/warning emphasis.
- Do not treat warnings as decorative borders only; include text and/or icon context.
- Buttons that perform destructive or launch-blocking behavior are out of scope for FEAT-002 unless later FEATs require them.

### Selected/current state

- Status chips or icon labels that represent current/verified status may use primary or secondary filled tokens.
- Selection may use a border/ring because it conveys state.
- Avoid making selected state depend on color alone; pair with text, icon, or ARIA state where interactive.

## Accessibility and Keyboard/Focus Considerations

- Components must use semantic HTML first: `<button>` for button actions, `<a>` for navigation links, `<section>`/headings for section structure.
- Button visible labels are required. Icon-only buttons are not part of FEAT-002 unless they include an accessible name.
- Material Symbols inside `IconLabel` should be `aria-hidden="true"` when paired with visible text.
- `StatusChip` should be non-interactive by default. If later used interactively, it must expose button/link semantics and selected state explicitly.
- Minimum touch target for interactive controls: 48px height where practical, especially buttons and nav CTAs.
- Keyboard focus order should follow visual order.
- Color contrast must be checked for token pairings used by components, especially `on-primary` on `primary`, muted label text on dark surfaces, and error text combinations.
- Motion/scale effects should be subtle and non-essential. Avoid motion-heavy affordances in the core primitives.

## Open Product Questions and Assumptions

### Assumptions safe for FEAT-002 refinement

- The authoritative visual baseline is the combination of `DESIGN.md`, the approved prototype, and HushVoting Visual Language.
- FEAT-002 may define component APIs and documentation but must not implement landing-page content sections beyond examples.
- `STYLEGUIDE.md` is a developer-facing artifact, not a polished public page.
- The current Tailwind v4 CSS-first token approach in `styles/app.css` is acceptable and should be audited/completed rather than replaced without cause.
- Material Symbols are acceptable for iconography because the prototype and README reference them.

### Questions to decide during refinement or implementation

1. Should `STYLEGUIDE.md` live at repository root, `MemoryBank`, or `src/components/ui/`? Recommendation: repository root for easy developer discovery.
2. Should component exports be centralized through `src/components/ui/index.ts`? Recommendation: yes, to keep later FEAT imports stable.
3. Should `Button` include an `asChild`/link composition pattern now, or should links use a separate component later? Recommendation: keep FEAT-002 simple unless navigation FEATs require polymorphism.
4. Should `StatusChip` include only neutral/primary/secondary/error tones, or also a semantic `verified` alias? Recommendation: include semantic aliases only when they map clearly to existing tokens.
5. Should a reusable skeleton primitive be added now? Recommendation: optional; not required by FEAT-002 acceptance criteria, but style guidance for skeleton states should be documented.

## UX Acceptance Notes for Refinement

- Refinement should preserve FEAT-002 as a foundation feature: tokens, components, states, docs, and tests.
- It should not pull in full FEAT-003+ landing page implementation.
- Component examples in `STYLEGUIDE.md` should demonstrate visual language rules, especially tonal surfaces over borders.
- Unit tests should verify class/state contract and basic render/accessibility expectations rather than visual pixel parity.
