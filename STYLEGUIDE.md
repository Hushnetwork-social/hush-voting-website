# HushVoting Sovereign Shield Styleguide

> Design system foundation for the HushVoting public website.
> Source tokens: [DESIGN.md](MemoryBank/Overview/Prototype/stitch_hushvoting_privacy_governance_platform_072026/sovereign_shield/DESIGN.md)
> Visual Language: [HushVoting Visual Language](hush-memory-bank/Features/00_EPICS/EPIC-013-protocol-omega-governed-remote-voting/HushVotingVisualLanguage.md)

---

## Introduction

This styleguide documents the Sovereign Shield design system tokens, reusable components, and visual language rules for the HushVoting website. It is the single source of truth for design-system usage across FEAT-003 through FEAT-008.

### Design Principles

- **Calm surfaces** — Low-contrast transitions between deep blue and purple-grey backgrounds
- **Technical precision** — Clean typography with monospaced labels for technical readouts
- **Premium restraint** — No decorative shadows or excessive layering; depth through tonal shifts
- **Privacy-first** — Deep, atmospheric tones that communicate security and seriousness

---

## Token Reference

### Color Tokens

All colors are defined as CSS variables in `styles/app.css` and available as Tailwind utilities.

#### Surface Palette

| Token                     | CSS Variable                        | Tailwind Utility               | Hex       |
| ------------------------- | ----------------------------------- | ------------------------------ | --------- |
| Surface                   | `--color-surface`                   | `bg-surface`                   | `#091422` |
| Surface Dim               | `--color-surface-dim`               | `bg-surface-dim`               | `#091422` |
| Surface Bright            | `--color-surface-bright`            | `bg-surface-bright`            | `#303a49` |
| Surface Container Lowest  | `--color-surface-container-lowest`  | `bg-surface-container-lowest`  | `#050e1d` |
| Surface Container Low     | `--color-surface-container-low`     | `bg-surface-container-low`     | `#121c2a` |
| Surface Container         | `--color-surface-container`         | `bg-surface-container`         | `#16202f` |
| Surface Container High    | `--color-surface-container-high`    | `bg-surface-container-high`    | `#202a3a` |
| Surface Container Highest | `--color-surface-container-highest` | `bg-surface-container-highest` | `#2b3545` |
| On Surface                | `--color-on-surface`                | `text-on-surface`              | `#d9e3f7` |
| On Surface Variant        | `--color-on-surface-variant`        | `text-on-surface-variant`      | `#cac4d4` |
| Inverse Surface           | `--color-inverse-surface`           | `bg-inverse-surface`           | `#d9e3f7` |
| Inverse On Surface        | `--color-inverse-on-surface`        | `text-inverse-on-surface`      | `#273140` |

#### Primary Palette

| Token                    | CSS Variable                       | Tailwind Utility                | Hex       |
| ------------------------ | ---------------------------------- | ------------------------------- | --------- |
| Primary                  | `--color-primary`                  | `bg-primary` / `text-primary`   | `#cebdff` |
| On Primary               | `--color-on-primary`               | `text-on-primary`               | `#381385` |
| Primary Container        | `--color-primary-container`        | `bg-primary-container`          | `#a78bfa` |
| On Primary Container     | `--color-on-primary-container`     | `text-on-primary-container`     | `#3c1989` |
| Inverse Primary          | `--color-inverse-primary`          | `text-inverse-primary`          | `#674bb5` |
| Primary Fixed            | `--color-primary-fixed`            | `bg-primary-fixed`              | `#e8ddff` |
| Primary Fixed Dim        | `--color-primary-fixed-dim`        | `bg-primary-fixed-dim`          | `#cebdff` |
| On Primary Fixed         | `--color-on-primary-fixed`         | `text-on-primary-fixed`         | `#21005e` |
| On Primary Fixed Variant | `--color-on-primary-fixed-variant` | `text-on-primary-fixed-variant` | `#4f319c` |

#### Secondary Palette

| Token                      | CSS Variable                         | Tailwind Utility                  | Hex       |
| -------------------------- | ------------------------------------ | --------------------------------- | --------- |
| Secondary                  | `--color-secondary`                  | `bg-secondary`                    | `#b9c6e8` |
| On Secondary               | `--color-on-secondary`               | `text-on-secondary`               | `#23304b` |
| Secondary Container        | `--color-secondary-container`        | `bg-secondary-container`          | `#3c4965` |
| On Secondary Container     | `--color-on-secondary-container`     | `text-on-secondary-container`     | `#abb8da` |
| Secondary Fixed            | `--color-secondary-fixed`            | `bg-secondary-fixed`              | `#d8e2ff` |
| Secondary Fixed Dim        | `--color-secondary-fixed-dim`        | `bg-secondary-fixed-dim`          | `#b9c6e8` |
| On Secondary Fixed         | `--color-on-secondary-fixed`         | `text-on-secondary-fixed`         | `#0d1b35` |
| On Secondary Fixed Variant | `--color-on-secondary-fixed-variant` | `text-on-secondary-fixed-variant` | `#3a4763` |

#### Tertiary Palette

| Token                     | CSS Variable                        | Tailwind Utility                 | Hex       |
| ------------------------- | ----------------------------------- | -------------------------------- | --------- |
| Tertiary                  | `--color-tertiary`                  | `bg-tertiary`                    | `#d0bcff` |
| On Tertiary               | `--color-on-tertiary`               | `text-on-tertiary`               | `#3c0091` |
| Tertiary Container        | `--color-tertiary-container`        | `bg-tertiary-container`          | `#ab88ff` |
| On Tertiary Container     | `--color-on-tertiary-container`     | `text-on-tertiary-container`     | `#40009b` |
| Tertiary Fixed            | `--color-tertiary-fixed`            | `bg-tertiary-fixed`              | `#e9ddff` |
| Tertiary Fixed Dim        | `--color-tertiary-fixed-dim`        | `bg-tertiary-fixed-dim`          | `#d0bcff` |
| On Tertiary Fixed         | `--color-on-tertiary-fixed`         | `text-on-tertiary-fixed`         | `#23005c` |
| On Tertiary Fixed Variant | `--color-on-tertiary-fixed-variant` | `text-on-tertiary-fixed-variant` | `#5516be` |

#### Error Palette

| Token              | CSS Variable                 | Tailwind Utility          | Hex       |
| ------------------ | ---------------------------- | ------------------------- | --------- |
| Error              | `--color-error`              | `bg-error`                | `#ffb4ab` |
| On Error           | `--color-on-error`           | `text-on-error`           | `#690005` |
| Error Container    | `--color-error-container`    | `bg-error-container`      | `#93000a` |
| On Error Container | `--color-on-error-container` | `text-on-error-container` | `#ffdad6` |

#### Other Tokens

| Token           | CSS Variable              | Tailwind Utility         | Hex       |
| --------------- | ------------------------- | ------------------------ | --------- |
| Outline         | `--color-outline`         | `border-outline`         | `#948e9d` |
| Outline Variant | `--color-outline-variant` | `border-outline-variant` | `#494552` |
| Surface Tint    | `--color-surface-tint`    | `bg-surface-tint`        | `#cebdff` |
| Background      | `--color-background`      | `bg-background`          | `#091422` |
| On Background   | `--color-on-background`   | `text-on-background`     | `#d9e3f7` |
| Surface Variant | `--color-surface-variant` | `bg-surface-variant`     | `#2b3545` |

### Typography Scale

| Token                 | Family         | Size | Weight | Line Height | Letter Spacing |
| --------------------- | -------------- | ---- | ------ | ----------- | -------------- |
| Display Large         | Hanken Grotesk | 48px | 700    | 56px        | -0.02em        |
| Headline Large        | Hanken Grotesk | 32px | 600    | 40px        | normal         |
| Headline Large Mobile | Hanken Grotesk | 24px | 600    | 32px        | normal         |
| Headline Medium       | Hanken Grotesk | 24px | 500    | 32px        | normal         |
| Body Large            | Hanken Grotesk | 18px | 400    | 28px        | normal         |
| Body Medium           | Hanken Grotesk | 16px | 400    | 24px        | normal         |
| Label Medium          | JetBrains Mono | 14px | 500    | 20px        | 0.05em         |
| Label Small           | JetBrains Mono | 12px | 500    | 16px        | 0.05em         |

**Usage notes:**

- Headlines use `Hanken Grotesk` for communication typography.
- Labels and status readouts use `JetBrains Mono` for technical/cryptographic feel.
- Use `headline-lg-mobile` for page titles on small screens (max-sm breakpoint).
- Body copy should never fall below `body-md` for readability.

### Spacing Scale

| Token                         | Value  | Usage                            |
| ----------------------------- | ------ | -------------------------------- |
| `--spacing-base`              | 4px    | Base unit                        |
| `--spacing-xs`                | 8px    | Tight spacing, icon gaps         |
| `--spacing-sm`                | 16px   | Component internal padding       |
| `--spacing-md`                | 24px   | Card/panel padding, section gaps |
| `--spacing-lg`                | 40px   | Large section padding            |
| `--spacing-xl`                | 64px   | Page section vertical rhythm     |
| `--spacing-gutter`            | 24px   | Desktop page gutters             |
| `--spacing-margin-mobile`     | 16px   | Mobile page margins              |
| `--spacing-max-width-content` | 1200px | Max content width                |

### Border Radius Scale

| Token              | Value          | Usage                           |
| ------------------ | -------------- | ------------------------------- |
| `--radius-sm`      | 0.25rem (4px)  | Small elements                  |
| `--radius-default` | 0.5rem (8px)   | Cards, panels, buttons          |
| `--radius-md`      | 0.75rem (12px) | Larger containers               |
| `--radius-lg`      | 1rem (16px)    | Main content containers, Booths |
| `--radius-xl`      | 1.5rem (24px)  | Hero containers                 |
| `--radius-full`    | 9999px         | Chips, pills                    |

---

## Visual Language Rules

### Surface Hierarchy (Not Borders)

Use tonal surface fills to create visual separation, not borders. The page background is `--color-surface` (`#091422`). Stack containers using progressively lighter surface fills:

```
Level 0 (Page):    --color-surface          (#091422)
Level 1 (Card):    --color-surface-container (#16202f)
Level 2 (Well):    --color-surface-container-low (#121c2a) or lowest (#050e1d)
```

### When to Use Borders

Borders are acceptable **only** for:

- **Focus states** — 2px solid `--color-primary` ring
- **Selected/current** — Thin top or left accent border in tone color
- **Warning/error states** — Tone-colored border with supporting text/icon
- **Status indicators** — Left border accent on MetricCard tones

**Never** use white or bright borders as default layout separators.

### Card Nesting Rule

Avoid stacking visually heavy cards inside cards. If nested content is needed, use `InsetWell` (recessed surface) inside a `Card` (raised surface) rather than Card-inside-Card.

### Spacing Rhythm

- Section padding: `--spacing-xl` (64px) vertical, `--spacing-gutter` (24px) horizontal
- Mobile section padding: `--spacing-lg` (40px) vertical, `--spacing-margin-mobile` (16px) horizontal
- Card internal padding: `--spacing-md` (24px)
- InsetWell internal padding: `--spacing-sm` (16px)

---

## Components

### Button

A native button element supporting variants, sizes, and loading state.

```tsx
import { Button } from "~/components/ui";

// Primary (default)
<Button>Submit Vote</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// Ghost
<Button variant="ghost">Learn More</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading State
<Button isLoading>Processing…</Button>

// Disabled
<Button disabled>Not Available</Button>
```

**Props:**

| Prop        | Type                                  | Default     | Description                         |
| ----------- | ------------------------------------- | ----------- | ----------------------------------- |
| `variant`   | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Visual variant                      |
| `size`      | `"sm" \| "md" \| "lg"`                | `"md"`      | Button size                         |
| `isLoading` | `boolean`                             | `false`     | Shows spinner, disables interaction |
| `disabled`  | `boolean`                             | —           | Native disabled attribute           |

**States:**

| State    | Visual                                 |
| -------- | -------------------------------------- |
| Default  | Filled with variant color              |
| Hover    | Brightness enhancement                 |
| Focus    | 2px `--color-primary` ring with offset |
| Active   | Subtle scale (`scale-[0.98]`)          |
| Disabled | 50% opacity, no pointer events         |
| Loading  | Spinner + text, `aria-busy`            |

**Accessibility:**

- Native `<button>` element with native disabled behavior
- Visible focus ring (focus-visible)
- Loading state announces via `aria-busy`
- Button text always visible for context

---

### Section

A layout primitive for page sections with optional header content.

```tsx
import { Section } from "~/components/ui";

// Minimal
<Section>
  <p>Content here</p>
</Section>

// With header
<Section
  eyebrow="About"
  title="How HushVoting Works"
  description="A step-by-step guide to privacy-first remote voting."
  actions={<Button>Get Started</Button>}
>
  <p>Section content…</p>
</Section>
```

**Props:**

| Prop          | Type                 | Default     | Description                       |
| ------------- | -------------------- | ----------- | --------------------------------- |
| `eyebrow`     | `string`             | —           | Small monospace label above title |
| `title`       | `string`             | —           | Section heading                   |
| `description` | `string`             | —           | Supporting paragraph              |
| `actions`     | `React.ReactNode`    | —           | Action area (buttons, links)      |
| `as`          | `"section" \| "div"` | `"section"` | Semantic element                  |
| `className`   | `string`             | —           | Additional classes                |

**Accessibility:**

- Defaults to semantic `<section>` element
- Headings use `<h2>` for proper document outline
- All optional props remove cleanly — no empty wrapper elements

---

### Card

A tonal content surface with optional state accent.

```tsx
import { Card } from "~/components/ui";

// Default (no border)
<Card>
  <p>Content surface</p>
</Card>

// With accent top border
<Card accent>
  <p>Featured content</p>
</Card>

// Tone variants
<Card tone="primary">Primary card</Card>
<Card tone="warning">Warning card</Card>
<Card tone="error">Error card</Card>
```

**Props:**

| Prop        | Type                                             | Default     | Description            |
| ----------- | ------------------------------------------------ | ----------- | ---------------------- |
| `tone`      | `"default" \| "primary" \| "warning" \| "error"` | `"default"` | Surface tone           |
| `accent`    | `boolean`                                        | `false`     | Adds top accent border |
| `className` | `string`                                         | —           | Additional classes     |

**Do:**

- Use Cards for grouping related content
- Use `tone` to convey context (primary, warning, error)
- Use `accent` sparingly for featured/selected items

**Don't:**

- Stack Cards inside Cards (use InsetWell for nested content)
- Add default borders — use tonal fill for separation

---

### InsetWell

A recessed surface for supporting content, evidence, metrics, or readouts.

```tsx
import { InsetWell } from "~/components/ui";

<InsetWell>
  <p>Verification hash: a1b2c3d4...</p>
</InsetWell>;
```

**Props:**

| Prop        | Type     | Default | Description        |
| ----------- | -------- | ------- | ------------------ |
| `className` | `string` | —       | Additional classes |

**Usage:**

- Use inside Cards for nested supporting content
- Ideal for code blocks, technical readouts, evidence hashes
- Creates a "carved-out" visual effect with the darkest surface fill

---

### MetricCard

A data display for key numbers with label, value, and optional description.

```tsx
import { MetricCard } from "~/components/ui";

// Basic
<MetricCard
  label="Total Voters"
  value={1024}
/>

// With description and tone
<MetricCard
  label="Approval Rate"
  value="87.3%"
  description="Above the 66% quorum threshold"
  tone="primary"
/>

// Empty fallback
<MetricCard
  label="Pending Results"
  value={null as any}
  description="Awaiting tally"
/> {/* Renders "—" as value */}
```

**Props:**

| Prop          | Type                                             | Default     | Description                         |
| ------------- | ------------------------------------------------ | ----------- | ----------------------------------- |
| `label`       | `string`                                         | —           | Metric label (monospace, uppercase) |
| `value`       | `string \| number`                               | —           | Metric value                        |
| `description` | `string`                                         | —           | Supporting context                  |
| `tone`        | `"default" \| "primary" \| "warning" \| "error"` | `"default"` | Left accent color                   |
| `className`   | `string`                                         | —           | Additional classes                  |

**Behavior:**

- Empty/null/undefined values render an em-dash (—) as fallback
- Left border accent conveys tone/context
- Label always visible in monospace

---

### StatusChip

A compact non-interactive pill indicator for status labels.

```tsx
import { StatusChip } from "~/components/ui";

// Neutral
<StatusChip label="Pending" />

// With tone
<StatusChip label="Verified" tone="primary" />
<StatusChip label="Warning" tone="warning" />
<StatusChip label="Error" tone="error" />

// With icon
<StatusChip label="Confirmed" tone="primary" icon="check_circle" />
```

**Props:**

| Prop        | Type                                             | Default     | Description                     |
| ----------- | ------------------------------------------------ | ----------- | ------------------------------- |
| `label`     | `string`                                         | —           | Visible text                    |
| `tone`      | `"neutral" \| "primary" \| "warning" \| "error"` | `"neutral"` | Tone variant                    |
| `icon`      | `string`                                         | —           | Material Symbol name (optional) |
| `className` | `string`                                         | —           | Additional classes              |

**Accessibility:**

- Rendered as `<span>` — non-interactive by design
- Optional icon is `aria-hidden` (text label provides meaning)
- Tone conveyed via color + text context (not color alone)

---

### IconLabel

An inline icon and text pair for feature descriptions and metadata.

```tsx
import { IconLabel } from "~/components/ui";

<IconLabel icon="lock">End-to-end encrypted</IconLabel>
<IconLabel icon="verified">Audited by third parties</IconLabel>
<IconLabel icon="group">1,024 voters</IconLabel>
```

**Props:**

| Prop        | Type              | Default | Description                     |
| ----------- | ----------------- | ------- | ------------------------------- |
| `icon`      | `string`          | —       | Material Symbol name (required) |
| `children`  | `React.ReactNode` | —       | Visible text                    |
| `className` | `string`          | —       | Additional classes              |

**Accessibility:**

- Icon has `aria-hidden="true"` — visible text is always present
- Never use IconLabel without children (textless icon would be inaccessible)

---

## Composition Examples

These examples show how to compose primitives for FEAT-003 through FEAT-008. They are **illustrative** — actual production implementations live in their respective FEATs.

### Trust Card (for FEAT-004)

```tsx
<Card accent tone="primary">
  <IconLabel icon="verified_user">Audited by Open Source Community</IconLabel>
  <p className="mt-2 text-body-md text-on-surface-variant">
    All cryptographic operations are publicly verifiable.
  </p>
  <StatusChip
    className="mt-4"
    label="Active"
    tone="primary"
    icon="check_circle"
  />
</Card>
```

### Evidence Well (for FEAT-006)

```tsx
<Card>
  <InsetWell>
    <MetricCard label="Blocks Verified" value="12,847" tone="primary" />
    <MetricCard
      className="mt-4"
      label="Pending Audit"
      value="3"
      tone="warning"
    />
  </InsetWell>
  <Button className="mt-4" variant="secondary">
    Verify Now
  </Button>
</Card>
```

### CTA Section (for FEAT-003 / FEAT-007)

```tsx
<Section
  title="Ready to Get Started?"
  description="Join organizations that trust HushVoting for their governance."
  actions={
    <>
      <Button size="lg">Create Your First Election</Button>
      <Button variant="ghost" size="lg">
        Learn More
      </Button>
    </>
  }
/>
```

---

## Do's and Don'ts

| Do                                                            | Don't                                                    |
| ------------------------------------------------------------- | -------------------------------------------------------- |
| Use tonal surface fills for section separation                | Use white or bright borders as default layout separators |
| Use `InsetWell` inside `Card` for nested content              | Stack Cards inside Cards                                 |
| Use `accent` on Cards for featured/selected state             | Add borders to every Card by default                     |
| Use Material Symbols as decorative elements with visible text | Use icons as the sole identifier without text            |
| Use `StatusChip` tones for semantic meaning + text context    | Convey status through color alone                        |
| Use `MetricCard` with explicit value fallback for empty data  | Render blank or missing metric values                    |
| Keep buttons native `<button>` elements                       | Use `<div>` + ARIA for button behavior                   |

---

## Change Log

| Date       | Change                                                 |
| ---------- | ------------------------------------------------------ |
| 2026-07-08 | Initial styleguide created for FEAT-002 implementation |
