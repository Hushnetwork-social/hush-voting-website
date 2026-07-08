# Planning Analysis Report — FEAT-004: Trust Model Hierarchy Section

**Date:** 2026-07-08
**Author:** Pi (autonomous start-feature skill)
**Source:** FEAT-004 FeatureDescription.md, FeatureTasks.md, UX-research-report.md, Wireframes-design.md, design-summary.md, EPIC-001, FEAT-002/003 lessons learned, codebase inspection

## Product Scope

Add a static, responsive **Trust Model Hierarchy section** to the homepage at `#trust`. The section visually explains how HushVoting! (application interface & orchestration layer) sits on top of HushNetwork (trust, privacy, and blockchain foundation).

### In Scope

- Homepage `#trust` section after the FEAT-003 hero
- Eyebrow label, headline, supporting copy (FEAT-local static copy contract)
- Two layered cards: HushVoting! and HushNetwork
- Capability chips with decorative Material Symbol icons
- Trust labels (uppercase informational text badges)
- Decorative gradient connector between layers
- Subtle glow/accent treatment
- Responsive layout (mobile, tablet, desktop)
- Accessibility: semantic section, valid heading order, decorative elements hidden
- Component tests for all rendered content
- Canonical `pnpm` validation scripts

### Out of Scope

- Additional homepage sections (`#roles`, `#protocol`, `#platform`, `#pilot-access`)
- New route architecture beyond homepage composition
- Interactive trust-model flows
- Backend or protocol changes
- Documentation pages outside the homepage section
- Dynamic content loading or CMS integration
- Broader design-system rewrites
- Broader tooling cleanup (except ESLint flat-config fix if it blocks FEAT-004 validation)

## Copy Contract

All copy is locked for FEAT-004. Based on FeatureTasks.md and FeatureDescription.md refinement decisions:

### Section Header

| Element         | Value                                                                                                                                                            | Notes                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Section anchor  | `#trust`                                                                                                                                                         | Stable fragment target (already linked from FEAT-003 nav) |
| Eyebrow label   | `Foundational Integrity`                                                                                                                                         |                                                           |
| Heading (h2)    | `The Trust Model Hierarchy`                                                                                                                                      | FEAT-003 owns h1, this is h2                              |
| Supporting copy | `HushVoting! coordinates election eligibility, participation, private choice, and evidence artifacts on top of HushNetwork's privacy and blockchain foundation.` | Refinement-accepted supporting copy                       |

### HushVoting! Layer (Upper Card)

| Element                      | Value                                             |
| ---------------------------- | ------------------------------------------------- |
| Layer title                  | `HushVoting!`                                     |
| Layer subtitle (trust label) | `The Application Interface & Orchestration Layer` |
| Capability chip 1            | `Eligibility` → icon: `person_check`              |
| Capability chip 2            | `Participation` → icon: `how_to_vote`             |
| Capability chip 3            | `Private Choice` → icon: `security`               |
| Capability chip 4            | `Artifacts` → icon: `inventory_2`                 |

### HushNetwork Layer (Lower Card)

| Element                      | Value                                           |
| ---------------------------- | ----------------------------------------------- |
| Layer title                  | `HushNetwork`                                   |
| Layer subtitle (trust label) | `The Trust, Privacy, and Blockchain Foundation` |
| Trust label 1                | `ZERO-KNOWLEDGE PROOFS`                         |
| Trust label 2                | `IMMUTABLE LEDGER`                              |
| Trust label 3                | `ENCRYPTED SHARDS`                              |

Note: Trust labels are plain informational text badges — no icons for FEAT-004. Material Symbol icons on capability chips are `aria-hidden="true"` (decorative, since each chip has visible text).

## Target File Map

### New Files

| File                                           | Purpose                | Phase                            |
| ---------------------------------------------- | ---------------------- | -------------------------------- |
| `src/components/landing/TrustModelSection.tsx` | Main section component | Phases 3-5 create and style this |

### Modified Files

| File                                             | Purpose                                                | Phase              |
| ------------------------------------------------ | ------------------------------------------------------ | ------------------ |
| `src/components/landing/constants.ts`            | Add trust-section static data constants                | Phase 2            |
| `src/components/landing/index.ts`                | Export TrustModelSection                               | Phase 4            |
| `src/routes/index.tsx`                           | Import and compose TrustModelSection after HeroSection | Phase 6            |
| `tests/unit/landing.test.tsx`                    | Add trust-section component render tests               | Phase 7            |
| `tests/e2e/features/scaffold-happy-path.feature` | Add trust-section scenario                             | Phase 7 (waivable) |
| `tests/e2e/scaffold-happy-path.spec.ts`          | Add trust-section browser checks                       | Phase 7 (waivable) |

## Architecture Decision

### Data Constants Location

Add trust-section-specific constants to `src/components/landing/constants.ts` alongside existing FEAT-003 constants. The alternative (local constants in TrustModelSection.tsx) would make them harder to test independently and less discoverable for future FEATs.

The typed export shape will be:

```typescript
export const TRUST_SECTION = {
  eyebrow: "Foundational Integrity",
  heading: "The Trust Model Hierarchy",
  supportingCopy: "...",
  hushVoting: {
    title: "HushVoting!",
    subtitle: "The Application Interface & Orchestration Layer",
    capabilities: [
      { label: "Eligibility", icon: "person_check" },
      { label: "Participation", icon: "how_to_vote" },
      { label: "Private Choice", icon: "security" },
      { label: "Artifacts", icon: "inventory_2" },
    ] as const,
  },
  hushNetwork: {
    title: "HushNetwork",
    subtitle: "The Trust, Privacy, and Blockchain Foundation",
    trustLabels: [
      "ZERO-KNOWLEDGE PROOFS",
      "IMMUTABLE LEDGER",
      "ENCRYPTED SHARDS",
    ] as const,
  },
} as const;
```

### Component Architecture

`TrustModelSection` is a single stateless component:

- Uses `<section id="trust" aria-labelledby="trust-heading" className="section-anchor">`
- Contains an inner `<Section>` (from UI primitives) for the eyebrow/heading/supporting copy
- Two cards using existing `<Card>` component with appropriate tones
- Decorative connector as a CSS element (`aria-hidden="true"`)
- Capability chips using `<StatusChip>` with icon prop
- Trust labels as simple `<span>` using monospace styling
- Restrained glow using CSS background/blur (similar to HeroSection pattern)

### Route Integration

In `src/routes/index.tsx`, add:

```tsx
import { TrustModelSection } from "~/components/landing/TrustModelSection";
// ...
<main>
  <HeroSection />
  <TrustModelSection />
</main>;
```

No other route changes needed. The `#trust` anchor is already targeted by the FEAT-003 nav link.

## Responsive Strategy

- Cards remain vertically stacked on all breakpoints (HushVoting! above HushNetwork)
- Only card internals (chips/labels) may wrap horizontally on wider screens
- Mobile: chips and labels wrap naturally without horizontal scrolling
- Tablet: same vertical stack, slightly wider layout
- Desktop: centered max-width content container, balanced spacing
- Section uses `section-anchor` class for scroll-margin-top (80px) to clear fixed header

## Accessibility Requirements

- Semantic `<section>` with `id="trust"` and `aria-labelledby` pointing to the heading
- Heading is `<h2>` (FEAT-003 owns the page `<h1>`)
- Decorative connector and glow elements: `aria-hidden="true"`, `pointer-events-none`
- Capability chip icons: `aria-hidden="true"` (decorative, text labels convey meaning)
- Trust labels: plain `<span>` text, not buttons or links, not focusable
- Text contrast must be acceptable on chosen tonal surfaces
- No duplicate landmark roles

## Visual Language Compliance

Per HushVoting visual language rules:

- **No default white outline separators** as the primary layout tool
- **No heavy card nested inside heavy card** pattern
- Use tonal surface fills for separation (`bg-surface-container`, `bg-surface-container-low`, etc.)
- Gradient connector is decorative CSS-only
- Restrained glow via `bg-primary/10 blur-[120px]` (same pattern as HeroSection)
- Borders only for focus, selected, warning, error, or accent state

## Validation Labels

| Label                    | Command                                                          | Phase           |
| ------------------------ | ---------------------------------------------------------------- | --------------- |
| `typecheck`              | `pnpm typecheck`                                                 | 7               |
| `unit-tests`             | `pnpm test:unit`                                                 | 7               |
| `build`                  | `pnpm build`                                                     | 7               |
| `format-check`           | `pnpm format:check`                                              | 7               |
| `component-render-tests` | `pnpm test:unit` (includes component tests)                      | 7               |
| `ui-tests`               | `pnpm test:e2e:happy-path` (or manual browser)                   | 7               |
| `static-analysis`        | `pnpm lint` (known to fail — pre-existing ESLint config missing) | 7               |
| `manual-review-ready`    | Manual review                                                    | 7               |
| `accessibility-review`   | Manual review                                                    | 7               |
| `responsive-review`      | Manual review                                                    | 7               |
| `code-review`            | Dedicated code review report                                     | Each code phase |

## Known Tooling Debt

- **ESLint flat-config missing:** ESLint 9.x is a devDependency but no `eslint.config.js` exists. The `pnpm lint` command will fail. This is a pre-existing scaffold issue from FEAT-001. FEAT-004 will run `pnpm typecheck`, `pnpm test:unit`, `pnpm build`, and `pnpm format:check` as primary validation. If the lint failure is the only blocker for final validation, a waiver will be recorded with exact evidence.

## Risk Assessment

| Risk                                             | Mitigation                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Copy changes between planning and implementation | Use locked copy from FeatureTasks.md; update this report if product owner provides replacement       |
| Token gaps for intended visual treatment         | Use existing Sovereign Shield tokens (surface-container-*, primary, etc.); avoid new custom tokens   |
| Decorative connector breaks accessibility        | CSS-only gradient with `aria-hidden="true"`; verify with axe or manual review                        |
| ESLint config blocks validation                  | Record waiver with exact failure evidence; do not broaden scope to fix it unless minimal fix is safe |
| Responsive overflow on narrow screens            | Use `flex-wrap`, `gap`, and responsive padding; test at 320px width                                  |
