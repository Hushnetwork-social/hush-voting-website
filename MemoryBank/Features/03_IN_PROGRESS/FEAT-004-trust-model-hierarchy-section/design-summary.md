# Design Summary — FEAT-004: Trust Model Hierarchy Section

## Final design decisions

1. **FEAT-004 owns only the homepage `#trust` section.** It must not implement roles, protocol evidence, platform readiness, footer, contact, legal pages, authenticated voting flows, or backend behavior.
2. **Use a vertical layered trust hierarchy.** HushVoting! appears above HushNetwork, connected by a decorative gradient connector. This follows the prototype and better communicates dependency/foundation than a side-by-side card layout.
3. **Only card internals become responsive columns.** On desktop/tablet, each layer card may place title/subtitle on the left and chips/labels on the right. The two layer cards remain vertically stacked across breakpoints.
4. **Use approved prototype labels.** Preserve `Foundational Integrity`, `The Trust Model Hierarchy`, `HushVoting!`, `The Application Interface & Orchestration Layer`, `HushNetwork`, and `The Trust, Privacy, and Blockchain Foundation`.
5. **Add or confirm one short supporting sentence.** The heading names the hierarchy but does not fully explain it. Refinement should either accept the proposed sentence from `UX-research-report.md` or replace it with owner-approved copy.
6. **Capability chips and trust labels are informational.** They must not behave or look like clickable controls.
7. **Visual separation must be tonal.** Use Sovereign Shield surfaces, spacing, radius, a restrained glow, and at most a subtle primary accent. Do not copy the prototype's border-heavy treatment as-is.
8. **Decorative elements stay silent.** Glow, connector, and Material Symbol icons are decorative and must not add noisy screen-reader output.
9. **Homepage route stays a thin composition layer.** Add a landing component and compose it after the FEAT-003 hero, following the FEAT-003 lesson.
10. **Validation uses canonical scripts.** Plan for `pnpm typecheck`, `pnpm test:unit`, `pnpm build`, and lint handling. The known pre-existing ESLint 9 config issue must be resolved or explicitly documented during refinement.

## Implementation checklist for refinement

### Component and composition

- [ ] Create `src/components/landing/TrustModelSection.tsx`.
- [ ] Export it from `src/components/landing/index.ts`.
- [ ] Compose it in `src/routes/index.tsx` directly after `HeroSection`.
- [ ] Keep route logic thin; no copy arrays or display logic in the route file.
- [ ] Use typed constants for capability chips and trust labels.

### Content

- [ ] Add `<section id="trust">` with a stable anchor and scroll margin for the fixed header.
- [ ] Add eyebrow `Foundational Integrity`.
- [ ] Add `<h2>` heading `The Trust Model Hierarchy`.
- [ ] Confirm and add concise supporting copy explaining HushVoting! on top of HushNetwork.
- [ ] Add HushVoting! layer title/subtitle.
- [ ] Add capability chips: Eligibility, Participation, Private Choice, Artifacts.
- [ ] Add HushNetwork layer title/subtitle.
- [ ] Add trust labels: ZERO-KNOWLEDGE PROOFS, IMMUTABLE LEDGER, ENCRYPTED SHARDS.

### Visual implementation

- [ ] Use FEAT-002 primitives where appropriate (`Section`, `Card`, `InsetWell`, `IconLabel`, `StatusChip`) without forcing card-inside-card heaviness.
- [ ] Use tokenized Tailwind utilities from Sovereign Shield only.
- [ ] Keep section shell quiet; do not wrap the whole section in another heavy card.
- [ ] Use a restrained primary glow/accent on the HushVoting! card.
- [ ] Use a calmer foundation surface for HushNetwork.
- [ ] Implement a centered decorative gradient connector between layers.
- [ ] Avoid white outline separators as default structure.
- [ ] Ensure chip/label wrapping stays balanced on narrow widths.

### Accessibility

- [ ] Use `aria-labelledby` or equivalent to associate the section with the `<h2>`.
- [ ] Keep heading order valid under the FEAT-003 page `<h1>`.
- [ ] Mark connector and glow as decorative (`aria-hidden` or CSS-only).
- [ ] Mark Material Symbol icons in chips as decorative when visible text is present.
- [ ] Do not make chips or labels focusable.
- [ ] Verify contrast for text on all chosen surfaces.
- [ ] Ensure the anchor target is not hidden under the fixed header.

### Tests and validation

- [ ] Add component tests for the section's stable content and `#trust` anchor.
- [ ] Avoid brittle class-string assertions; prefer text, role, heading, and id checks.
- [ ] Update homepage tests if they assert exact scaffold/hero-only content.
- [ ] Run `pnpm test:unit`.
- [ ] Run `pnpm typecheck`.
- [ ] Run `pnpm build`.
- [ ] Handle `pnpm lint` according to project policy; FEAT-003 recorded a pre-existing missing ESLint flat config.
- [ ] Run formatting on changed source, tests, and MemoryBank docs before completion.

## UI states that phase planning must preserve

| State                | Requirement                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Desktop default      | Centered section header; full-width vertical layer cards; top card with subtle glow/accent; bottom foundation card; centered gradient connector. |
| Tablet               | Same vertical hierarchy; internal card content can wrap or stack; no crowded chip rows.                                                          |
| Mobile               | Single-column cards; chips and labels wrap/stack; no horizontal overflow; heading remains readable.                                              |
| Anchor navigation    | Existing `#trust` link scrolls to the section without fixed-header overlap.                                                                      |
| Loading/hydration    | Static content renders immediately; no required loading skeleton.                                                                                |
| Empty                | Not applicable; missing chip/label constants should be caught by tests.                                                                          |
| Disabled             | Not applicable; informational elements must not appear disabled or actionable.                                                                   |
| Error                | No local error state; route-level errors remain outside this FEAT.                                                                               |
| Reduced motion       | Decorative effects do not rely on animation; any later animation must respect reduced motion.                                                    |
| Assistive technology | Screen readers encounter a clear section, heading, explanatory text, layer titles, and labels without decorative noise.                          |

## Risks and mitigations

| Risk                                                        | Impact                                    | Mitigation                                                                                                |
| ----------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Prototype borders are copied directly                       | Violates HushVoting visual-language rules | Use tonal fills and restrained accent only; do not add bright borders around every chip/card.             |
| Side-by-side layer interpretation returns during refinement | Weakens hierarchy and connector meaning   | Treat vertical layer stack as final design; only card internals become horizontal on larger screens.      |
| Supporting copy is not owner-approved                       | Public trust claim may be imprecise       | Refinement must confirm the sentence or replace it with approved launch copy before implementation.       |
| Chips look clickable                                        | Users may expect interaction              | Use informational styling, no button semantics, no hover/focus affordance.                                |
| Fixed header covers anchor target                           | Navigation feels broken                   | Use scroll-margin strategy on the section.                                                                |
| Known `pnpm lint` issue remains                             | Validation ambiguity                      | Decide during refinement whether FEAT-004 fixes ESLint config or records it as pre-existing tooling debt. |

## Assumptions

- FEAT-002 components and token utilities are available and remain the design-system baseline.
- FEAT-003 navigation already includes a fragment-only `#trust` link.
- The website is static/SSR for this section; no API data is needed.
- Material Symbols font integration remains available from the design system / FEAT-003 setup.
- Later FEATs will add the `#roles`, `#protocol`, and `#platform` sections.

## Out of scope

- Interactive trust-model diagrams or expandable flows.
- Verifier execution, evidence lookup, blockchain calls, or backend integration.
- Role workflow, protocol evidence, platform readiness, footer, utility pages, and contact path.
- New route architecture beyond composing this homepage section.
- Moving FEAT-004 to Ready To Develop.
- Creating `FeatureTasks.md` or implementation phase files.

## Ready-for-refinement notes

FEAT-004 is sufficiently designed for `refine-feature`. The only product/design confirmation needed during refinement is the final supporting sentence under the heading and the validation handling for the known lint configuration issue.
