# Wireframes and Component Design — FEAT-002: Design System Implementation (Sovereign Shield)

## Purpose

FEAT-002 defines reusable primitives, not a finished public page. These wireframes are component-level and styleguide-level sketches that downstream FEATs can reuse for the HushVoting website landing page.

## Component Boundaries

Recommended implementation boundary:

```text
src/components/ui/
├── Button.tsx
├── Section.tsx
├── Card.tsx
├── InsetWell.tsx
├── MetricCard.tsx
├── StatusChip.tsx
├── IconLabel.tsx
└── index.ts

styles/app.css
STYLEGUIDE.md
tests/unit/design-system.test.tsx or equivalent
```

The exact filenames may change during refinement, but the public component set and documented usage must remain stable.

## Token Wireframe

```text
Sovereign Shield token contract
┌──────────────────────────────────────────────────────────────┐
│ styles/app.css @theme                                        │
│                                                              │
│ Colors                                                       │
│ - surface family: page, quiet sections, cards, inset wells   │
│ - primary/secondary/tertiary: CTA, labels, status accents    │
│ - error: warning/error states                                │
│ - outline: focus/selected/rare framing only                  │
│                                                              │
│ Typography                                                   │
│ - display-lg      hero-scale heading                         │
│ - headline-lg     section heading                            │
│ - headline-md     card/component heading                     │
│ - body-lg/md      explanatory copy                           │
│ - label-md/sm     mono labels/status/readouts                │
│                                                              │
│ Spacing + radius                                             │
│ - xs/sm/md/lg/xl/gutter                                      │
│ - sm/default/md/lg/xl/full                                   │
└──────────────────────────────────────────────────────────────┘
```

Token expectations:

- Preserve every token from `DESIGN.md`.
- Do not rename public tokens without documenting aliases.
- Use Tailwind v4 CSS-first `@theme` unless refinement documents a safer alternative.
- Keep external `@import url(...)` before `@import "tailwindcss"`.

## Styleguide Page Wireframe

`STYLEGUIDE.md` should be written as an implementation guide with copy/paste examples, component intent, variant table, and do/don't notes.

```text
STYLEGUIDE.md
┌──────────────────────────────────────────────────────────────┐
│ # HushVoting Website Styleguide                              │
│ Source documents + token contract                            │
├──────────────────────────────────────────────────────────────┤
│ ## Design Principles                                         │
│ tonal hierarchy | border restraint | typography | spacing    │
├──────────────────────────────────────────────────────────────┤
│ ## Tokens                                                    │
│ color table | typography table | spacing | radius            │
├──────────────────────────────────────────────────────────────┤
│ ## Components                                                │
│ Button                                                       │
│ Section                                                      │
│ Card                                                         │
│ InsetWell                                                    │
│ MetricCard                                                   │
│ StatusChip                                                   │
│ IconLabel                                                    │
├──────────────────────────────────────────────────────────────┤
│ ## Accessibility                                             │
│ focus | touch targets | icon labels | contrast               │
├──────────────────────────────────────────────────────────────┤
│ ## Do / Don't                                                │
│ surfaces over borders | no heavy nested cards                │
└──────────────────────────────────────────────────────────────┘
```

## Button Component

### Boundary

A reusable action primitive for CTAs and UI actions.

Suggested variants:

- `primary` — filled primary action.
- `secondary` — tonal filled secondary action.
- `ghost` — low-emphasis transparent/quiet action.

Suggested sizes:

- `md` default for inline controls.
- `lg` for hero/final CTA buttons.

### Default wireframes

```text
Primary
┌──────────────────────────┐
│ Request pilot access      │  fill: primary, text: on-primary
└──────────────────────────┘

Secondary
┌──────────────────────────┐
│ View verifier model       │  fill: surface-container-high, text: on-surface
└──────────────────────────┘

Ghost
  Learn more                  transparent/quiet fill, primary or on-surface text
```

### State wireframes

```text
Hover
┌──────────────────────────┐
│ Slight tonal shift        │  primary -> primary-container
└──────────────────────────┘

Focus
╔══════════════════════════╗  visible primary ring/outline, 2px offset
║ Request pilot access      ║
╚══════════════════════════╝

Disabled
┌──────────────────────────┐
│ Request pilot access      │  reduced opacity, not clickable
└──────────────────────────┘

Loading, if supported
┌──────────────────────────┐
│ [spinner optional] Saving │  aria-busy or disabled during pending action
└──────────────────────────┘
```

### Interaction behavior

- Use native `<button>` for actions.
- Use links for navigation; if a button-styled link is needed, refinement should decide whether to support a link wrapper or separate component.
- `disabled` prevents interaction and removes from tab order for native buttons.
- Focus ring is mandatory and may use border/ring because it conveys state.

## Section Component

### Boundary

A reusable content section shell that controls vertical rhythm, max width, optional heading, and optional actions.

### Wireframe

```text
<section>
┌──────────────────────────────────────────────────────────────┐
│ Eyebrow label (optional, label-sm, primary/secondary)        │
│ Section headline (headline-lg)                               │
│ Description text (optional, body-lg/body-md)                 │
│ [optional actions row]                                       │
│                                                              │
│ Slot content                                                  │
└──────────────────────────────────────────────────────────────┘
```

### Layout behavior

- Desktop: max-width content container around 1200px, generous `xl` vertical padding.
- Mobile: single-column rhythm, margin-mobile (16px), reduced heading scale where needed.
- Section may be full-width with an inner constrained content region for bands like Protocol Evidence.

## Card Component

### Boundary

A tonal content container for role cards, platform cards, trust layers, and CTA shells.

Suggested variants:

- `default` — `surface-container`.
- `high` — `surface-container-high` for prominent cards.
- `low` — `surface-container-low` or `surface-container-lowest` for quiet shells.
- `accent` — optional state/accent treatment using primary/secondary, used sparingly.

### Wireframe

```text
Card default
┌─────────────────────────────────────┐
│ Title                               │
│ Supporting text                     │
│ [slot content]                      │
└─────────────────────────────────────┘
fill: surface-container/high, radius: lg/xl, padding: md/lg, no default white border
```

### Border rule

- Default cards should not have white/bright borders.
- Optional subtle border is acceptable only for selected/focus/warning/error or rare framing.
- If an outer section already reads as a card, inner content should use quiet wells or sibling cards rather than another heavy card layer.

## InsetWell Component

### Boundary

A carved, darker content area for technical labels, compact evidence items, code/hash readouts, or metric values.

### Wireframe

```text
Inset well
┌─────────────────────────────┐
│ [icon] Evidence category     │  fill: surface-container-low/lowest
└─────────────────────────────┘
```

### Behavior

- Non-interactive by default.
- If used as an interactive control in a later FEAT, it must become a button/link with focus state.
- Should not add bright outlines by default.

## MetricCard Component

### Boundary

A card specialized for label + value presentation. It supports later landing-page metrics or readiness/status readouts.

### Wireframe

```text
MetricCard
┌─────────────────────────────┐
│ LABEL                       │  label-sm, mono, on-surface-variant
│ ┌─────────────────────────┐ │
│ │ 99.9% / Ready / —       │ │  darker InsetWell value area
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Fields

- `label`: required visible text.
- `value`: required, may be text/React node.
- `description`: optional supporting copy.
- `tone`: optional neutral/primary/secondary/error if refinement needs semantic emphasis.

### Edge states

- Empty metric value uses `—` or explicit text, not a blank box.
- Long values wrap or truncate only when documented.
- Technical hashes should use JetBrains Mono and allow copy behavior only if explicitly implemented later.

## StatusChip Component

### Boundary

A pill-shaped status label for verified/readiness/category states. Non-interactive by default.

Suggested tones:

- `neutral` — quiet surface chip.
- `primary` — important/verified status.
- `secondary` — informational status.
- `tertiary` — alternate technical emphasis.
- `error` — warning/error status.

### Wireframe

```text
Neutral                 Primary/verified              Error/warning
┌──────────────┐        ┌───────────────────┐          ┌──────────────┐
│ AUDIT-READY  │        │ VERIFIED MODEL     │          │ ACTION NEEDED│
└──────────────┘        └───────────────────┘          └──────────────┘
```

### Behavior

- Uses `rounded-full`.
- Includes visible text; optional icon is allowed only when paired with text.
- Does not invent success-green tokens; use copy/icons with approved token colors.

## IconLabel Component

### Boundary

A compact icon + text composition for capability chips, evidence categories, navigation hints, and role labels.

### Wireframe

```text
IconLabel
[material icon]  Label text
```

### Fields

- `icon`: Material Symbol name.
- `children` or `label`: visible text.
- `tone`: neutral/primary/secondary/error.
- `size`: sm/md where needed.

### Accessibility

- Icon is `aria-hidden` when visible text is present.
- If icon communicates unique meaning without text, that usage is out of scope for FEAT-002 or requires an accessible name.

## Example Composition: Trust Layer Card

This demonstrates how downstream FEAT-004 should compose primitives without hardcoding a one-off visual language.

```text
Section eyebrow: FOUNDATIONAL INTEGRITY
Section title: The Trust Model Hierarchy

Card high/accent
┌──────────────────────────────────────────────────────────────┐
│ HushVoting!                                                   │
│ Application Interface & Orchestration Layer                   │
│                                                              │
│ [InsetWell/IconLabel Eligibility] [Participation]             │
│ [InsetWell/IconLabel Private Choice] [Artifacts]              │
└──────────────────────────────────────────────────────────────┘
       │ subtle gradient connector
Card low
┌──────────────────────────────────────────────────────────────┐
│ HushNetwork                                                   │
│ Trust, Privacy, and Blockchain Foundation                     │
│ [StatusChip ZERO-KNOWLEDGE PROOFS] [IMMUTABLE LEDGER]         │
└──────────────────────────────────────────────────────────────┘
```

Design note: the top layer may use a primary accent/glow, but avoid a bright all-around border as the default structure.

## Example Composition: Role Card Grid

```text
Desktop
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ IconLabel    │ │ IconLabel    │ │ IconLabel    │ │ IconLabel    │
│ Organizations│ │ Voters       │ │ Trustees     │ │ Auditors     │
│ Body copy    │ │ Body copy    │ │ Body copy    │ │ Body copy    │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

Mobile
┌──────────────┐
│ Organizations│
└──────────────┘
┌──────────────┐
│ Voters       │
└──────────────┘
...
```

Design note: hover accent is allowed, but the card remains readable and complete without hover.

## Responsive Expectations

- Component primitives must not encode desktop-only widths.
- Cards and metric grids should stack naturally on mobile.
- Button groups should stack vertically on narrow screens unless the parent opts into wrapping.
- Touch targets for interactive elements should be at least 48px high where practical.
- Section gutters should use `margin-mobile` on small screens and `gutter`/larger spacing on desktop.

## Validation States to Preserve in Planning

| State            | Component impact                                                             |
| ---------------- | ---------------------------------------------------------------------------- |
| Default          | Every component has a calm non-bordered baseline                             |
| Hover            | Buttons/cards can use tonal shift; no hover-only information                 |
| Focus            | Buttons and interactive wrappers have visible primary focus ring             |
| Disabled         | Buttons visually mute and are non-interactive                                |
| Loading          | Styleguide documents skeleton/pending patterns even if no primitive is added |
| Empty            | Optional props safely omit regions; metric values have explicit fallback     |
| Error/warning    | Uses error tokens plus text/icon context                                     |
| Selected/current | Uses ring/border only because selection is meaningful state                  |

## Out-of-Scope Wireframes

- Full hero/navigation implementation belongs to FEAT-003.
- Trust hierarchy final page section belongs to FEAT-004.
- Role workflow final section belongs to FEAT-005.
- Protocol Evidence and Platform Readiness final sections belong to FEAT-006.
- Footer/contact/utility pages belong to FEAT-007.
- Device-specific site-wide responsive QA belongs to FEAT-008, though FEAT-002 components must be responsive-ready.
