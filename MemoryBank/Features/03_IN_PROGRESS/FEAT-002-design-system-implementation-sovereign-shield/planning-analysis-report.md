# FEAT-002 Planning Analysis Report

**Feature**: FEAT-002 — Design System Implementation (Sovereign Shield)
**Date**: 2026-07-08
**Based on**: Phase 0 Health Check, FEAT-002 description/design artifacts, EPIC-001, DESIGN.md, HushVoting Visual Language

---

## 1. Token Audit — DESIGN.md to Implementation Strategy

### 1.1 Color Tokens

| DESIGN.md Family                                                                         | Current app.css Status | Implementation Strategy                                                                                          |
| ---------------------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| core surface colors (surface, surface-dim, surface-bright, surface-container-*)          | ✅ Present             | Keep as-is                                                                                                       |
| on-surface, on-surface-variant, inverse-surface, inverse-on-surface                      | ✅ Present             | Keep as-is                                                                                                       |
| outline, outline-variant, surface-tint                                                   | ✅ Present             | Keep as-is                                                                                                       |
| primary, on-primary, primary-container, on-primary-container, inverse-primary            | ✅ Present             | Keep as-is                                                                                                       |
| secondary, on-secondary, secondary-container, on-secondary-container                     | ✅ Present             | Keep as-is                                                                                                       |
| tertiary, on-tertiary, tertiary-container, on-tertiary-container                         | ✅ Present             | Keep as-is                                                                                                       |
| error, on-error, error-container, on-error-container                                     | ✅ Present             | Keep as-is                                                                                                       |
| background, on-background, surface-variant                                               | ✅ Present             | Keep as-is                                                                                                       |
| **primary-fixed, primary-fixed-dim, on-primary-fixed, on-primary-fixed-variant**         | ❌ Missing             | Add these 4 tokens to `@theme` in `styles/app.css`. These provide fixed-tone variants for chip/chip-state usage. |
| **secondary-fixed, secondary-fixed-dim, on-secondary-fixed, on-secondary-fixed-variant** | ❌ Missing             | Add these 4 tokens to `@theme` in `styles/app.css`. These provide secondary fixed-tone variants.                 |
| **tertiary-fixed, tertiary-fixed-dim, on-tertiary-fixed, on-tertiary-fixed-variant**     | ❌ Missing             | Add these 4 tokens to `@theme` in `styles/app.css`. These provide tertiary fixed-tone variants.                  |

### 1.2 Typography Tokens

| DESIGN.md Token        | Current app.css Status | Implementation Strategy                                                                                                          |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| display-lg             | ✅ Present             | Keep as-is                                                                                                                       |
| headline-lg            | ✅ Present             | Keep as-is                                                                                                                       |
| **headline-lg-mobile** | ❌ Missing             | Add as `--font-size-headline-lg-mobile: 24px`, `--font-weight-headline-lg-mobile: 600`, `--line-height-headline-lg-mobile: 32px` |
| headline-md            | ✅ Present             | Keep as-is                                                                                                                       |
| body-lg                | ✅ Present             | Keep as-is                                                                                                                       |
| body-md                | ✅ Present             | Keep as-is                                                                                                                       |
| label-md               | ✅ Present             | Keep as-is                                                                                                                       |
| label-sm               | ✅ Present             | Keep as-is                                                                                                                       |

### 1.3 Spacing Tokens

| DESIGN.md Token            | Current app.css Status | Implementation Strategy |
| -------------------------- | ---------------------- | ----------------------- |
| base (4px)                 | ✅ Present             | Keep as-is              |
| xs (8px)                   | ✅ Present             | Keep as-is              |
| sm (16px)                  | ✅ Present             | Keep as-is              |
| md (24px)                  | ✅ Present             | Keep as-is              |
| lg (40px)                  | ✅ Present             | Keep as-is              |
| xl (64px)                  | ✅ Present             | Keep as-is              |
| gutter (24px)              | ✅ Present             | Keep as-is              |
| margin-mobile (16px)       | ✅ Present             | Keep as-is              |
| max-width-content (1200px) | ✅ Present             | Keep as-is              |

### 1.4 Border Radius Tokens

| DESIGN.md Token  | Current app.css Status | Implementation Strategy |
| ---------------- | ---------------------- | ----------------------- |
| sm (0.25rem)     | ✅ Present             | Keep as-is              |
| DEFAULT (0.5rem) | ✅ Present             | Keep as-is              |
| md (0.75rem)     | ✅ Present             | Keep as-is              |
| lg (1rem)        | ✅ Present             | Keep as-is              |
| xl (1.5rem)      | ✅ Present             | Keep as-is              |
| full (9999px)    | ✅ Present             | Keep as-is              |

### 1.5 Font Family Tokens

| DESIGN.md Token | Current app.css Status | Implementation Strategy |
| --------------- | ---------------------- | ----------------------- |
| Hanken Grotesk  | ✅ Present             | Keep as-is              |
| JetBrains Mono  | ✅ Present             | Keep as-is              |

### 1.6 Token Audit Summary

- **Total tokens in DESIGN.md**: ~70 individual tokens
- **Present in app.css**: ~56 (via --color-_, --font-_, --spacing-_, --radius-_ variables)
- **Missing**: 12 fixed-variant color tokens + 1 typography token = 13 tokens
- All missing tokens will be added in Phase 2

---

## 2. Component API Design

### 2.1 Export Boundary

```
src/components/ui/
  index.ts          — central re-export barrel
  Button.tsx        — Button component
  Section.tsx       — Section layout primitive
  Card.tsx          — Card content surface
  InsetWell.tsx     — InsetWell recessed surface
  MetricCard.tsx    — MetricCard data display
  StatusChip.tsx    — StatusChip pill indicator
  IconLabel.tsx     — IconLabel icon+text pair
  types.ts          — shared types (variant/tone enums)
  cn.ts             — minimal classname utility (or use a lib)
```

### 2.2 Button

```typescript
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // default: "primary"
  size?: ButtonSize; // default: "md"
  isLoading?: boolean; // shows pending state
  // All native button props forwarded (disabled, onClick, type, etc.)
}
```

**Variants**:

- `primary` — filled with primary token, text on-primary
- `secondary` — filled with surface-container-high, text on-surface
- `ghost` — transparent background, text on-surface-variant, hover shows subtle fill

**States**: default, hover, focus-visible (2px primary ring + offset), active (subtle scale/tonal shift), disabled (muted opacity ~0.5, cursor not-allowed), loading (disabled + spinner/indicator)

**Accessibility**: native `<button>` element, visible focus ring, disabled uses native disabled attribute, loading state announced via aria-busy

### 2.3 Section

```typescript
export interface SectionProps {
  children: React.ReactNode;
  eyebrow?: string; // optional label-sm monospace eyebrow text
  title?: string; // optional headline text
  description?: string; // optional body text
  actions?: React.ReactNode; // optional action area (e.g., button group)
  className?: string; // additional classes
  as?: "section" | "div"; // semantic element, default "section"
}
```

**Behavior**: Centered max-width content container with vertical rhythm. Eyebrow rendered above title in monospace. Actions rendered after title but before children. Responsive gutters (`--spacing-gutter` on desktop, `--spacing-margin-mobile` on mobile).

### 2.4 Card

```typescript
export type CardTone = "default" | "primary" | "warning" | "error";

export interface CardProps {
  children: React.ReactNode;
  tone?: CardTone; // default: "default" (surface-container fill)
  accent?: boolean; // adds subtle top accent border using tone color
  className?: string;
}
```

**Behavior**: Non-interactive content container using `--color-surface-container` as default fill. No default border. Tonal surfaces separate from the page background. `accent` adds a thin top border for selected/featured state using the tone's primary color.

### 2.5 InsetWell

```typescript
export interface InsetWellProps {
  children: React.ReactNode;
  className?: string;
}
```

**Behavior**: Recessed/carved-out surface using `--color-surface-container-lowest` or `--color-surface-container-low` as fill. Used for evidence, metrics, code readouts. No border by default. Slightly smaller internal padding than Card.

### 2.6 MetricCard

```typescript
export interface MetricCardProps {
  label: string; // always visible label
  value: string | number; // metric value
  description?: string; // optional supporting text
  tone?: "default" | "primary" | "warning" | "error"; // default: "default"
  className?: string;
}
```

**Behavior**: Composes a Card/InsetWell internally. Label rendered in monospace label-sm. Value rendered in headline-lg/display-lg. Description rendered below in body-md on-surface-variant. Empty/null/undefined value renders "—" as explicit fallback.

### 2.7 StatusChip

```typescript
export type StatusTone = "neutral" | "primary" | "warning" | "error";

export interface StatusChipProps {
  label: string; // visible text label
  tone?: StatusTone; // default: "neutral"
  icon?: string; // optional Material Symbol name
  className?: string;
}
```

**Behavior**: Non-interactive pill-shaped indicator. Uses `--radius-full` for pill shape. Background colored by tone (neutral → surface-container-high, primary → primary-container, warning → tertiary-container, error → error-container). Text colored by on-* counterpart. Optional Material Symbol icon before label.

### 2.8 IconLabel

```typescript
export interface IconLabelProps {
  icon: string; // Material Symbol name (required)
  children: React.ReactNode; // visible text
  className?: string;
}
```

**Behavior**: Inline flex container with Material Symbol icon + text. Icon is marked `aria-hidden="true"` because visible text is always present. Uses `--color-on-surface-variant` as default icon/text color.

---

## 3. Documentation Plan

### 3.1 STYLEGUIDE.md Location

`/home/esqueleto/myWork/HushNetworkOrg/hush-voting-website/STYLEGUIDE.md` (repository root)

### 3.2 STYLEGUIDE.md Structure

| Section               | Content                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Introduction          | Purpose of the styleguide, link to DESIGN.md and Visual Language docs                                                                 |
| Token Reference       | Table of all Sovereign Shield tokens with CSS variable names, Tailwind utility names, and descriptions                                |
| Color Tokens          | Color palette table showing all surface, primary, secondary, tertiary, error, and fixed-variant tokens                                |
| Typography            | Type scale with usage guidance, font-family assignments, and responsive notes                                                         |
| Spacing & Radius      | Spacing scale usage and radius application guide                                                                                      |
| Component: Button     | Variants, sizes, states, accessibility, do/don't examples                                                                             |
| Component: Section    | Layout rules, optional content slots, responsive behavior                                                                             |
| Component: Card       | Tone variants, accent usage, composition rules (avoid card-in-card)                                                                   |
| Component: InsetWell  | Recessed surface usage, typical content patterns                                                                                      |
| Component: MetricCard | Label/value/description patterns, empty fallback behavior                                                                             |
| Component: StatusChip | Tone mapping, icon usage, accessible text expectations                                                                                |
| Component: IconLabel  | Icon behavior, accessible hiding, composition examples                                                                                |
| Visual Language Rules | Surface hierarchy preference over borders, correct border usage, spacing/radius guidelines                                            |
| Future Composition    | Examples of composing these primitives into trust cards, role cards, evidence wells, CTA sections (markdown-only, no production code) |

### 3.3 Documentation Format

Plain Markdown. No special rendering tooling. Examples use code blocks with JSX/TSX syntax highlighting.

---

## 4. Testing Strategy

### 4.1 Token Contract Tests

- **Approach**: Create `tests/unit/design-tokens.test.ts` that imports CSS module or checks computed styles from `styles/app.css` by reading the CSS variable values via a small helper.
- **Scope**: Verify that key color tokens, typography tokens, spacing tokens, and radius tokens exist and have expected values.
- **Limitation**: Pure CSS variable testing is limited without a browser DOM. Will verify at the CSS-parsing level using a small script. If this proves too brittle, mark as `waived` with rationale and rely on manual review and build-time validation.

### 4.2 Component Unit Tests

- **File**: `tests/unit/design-system.test.tsx` (component rendering tests)
- **Framework**: Vitest with `@testing-library/react` for component rendering
- **Coverage Targets**:
  | Component  | Test Areas                                                                                                   |
  | ---------- | ------------------------------------------------------------------------------------------------------------ |
  | Button     | Renders variants, applies correct classes, disabled behavior, focus-visible, loading state, renders children |
  | Section    | Renders with/without optional props, correct semantic element                                                |
  | Card       | Renders children, applies tone classes, accent class                                                         |
  | InsetWell  | Renders children, applies recessed surface classes                                                           |
  | MetricCard | Renders label/value, empty fallback, optional description                                                    |
  | StatusChip | Renders label, tone classes, optional icon                                                                   |
  | IconLabel  | Renders icon + text, aria-hidden on icon                                                                     |
- **What NOT to test**: Exact CSS property values or visual snapshots. Focus on class application and render contract.

### 4.3 Gherkin/Playwright E2E

- **Decision**: Not required for FEAT-002.
- **Rationale**: FEAT-002 is a design-system/component-library feature with no routed interactive behavior. All component behavior changes are verified through unit tests. E2E coverage for composition patterns will belong to downstream FEATs (FEAT-003 through FEAT-008) that render actual landing-page sections.

### 4.4 Manual Review

- Each component variant/tone/state should be manually reviewed through a temporary developer route or by composing examples in STYLEGUIDE.md.
- Visual alignment with Sovereign Shield tokens should be confirmed by manual inspection.
- Focus states should be verified via keyboard navigation.

---

## 5. Scope Boundaries

### 5.1 In Scope for FEAT-002

| Item                                                        | Phase      |
| ----------------------------------------------------------- | ---------- |
| Complete Tailwind v4 CSS-first token mapping                | Phase 2    |
| Create `src/components/ui/` with exports                    | Phase 3    |
| `Button` with primary/secondary/ghost, sizes, loading state | Phases 3-5 |
| `Section` with optional slots                               | Phases 3-5 |
| `Card` with tones, accent option                            | Phases 3-5 |
| `InsetWell` recessed surface                                | Phases 3-5 |
| `MetricCard` with value fallback                            | Phases 3-5 |
| `StatusChip` with tones, optional icon                      | Phases 3-5 |
| `IconLabel` with accessible icon hiding                     | Phases 3-5 |
| `STYLEGUIDE.md` documentation                               | Phase 5    |
| Unit tests for component render contracts                   | Phase 7    |
| Token contract tests                                        | Phase 7    |
| Canonical validation (build, test:unit)                     | Phase 7    |

### 5.2 Out of Scope for FEAT-002

| Item                           | Belongs To              |
| ------------------------------ | ----------------------- |
| Full landing page hero section | FEAT-003                |
| Navigation/header component    | FEAT-003                |
| Trust model hierarchy section  | FEAT-004                |
| Role workflow section          | FEAT-005                |
| Protocol evidence section      | FEAT-006                |
| Footer, utility pages, contact | FEAT-007                |
| Responsive optimization        | FEAT-008                |
| Backend API integration        | N/A (website is static) |
| Authenticated election UI      | Future EPIC             |
| Animated transitions           | Not planned             |
| Visual regression tests        | Not planned             |

### 5.3 Future FEAT Composition Support

- FEAT-003 will use: `Section`, `Button`, `IconLabel`
- FEAT-004 will use: `Section`, `Card`, `IconLabel`
- FEAT-005 will use: `Section`, `Card`, `StatusChip`, `Button`
- FEAT-006 will use: `Section`, `InsetWell`, `MetricCard`, `StatusChip`, `IconLabel`
- FEAT-007 will use: `Section`, `Card`, `Button`, `IconLabel`
- FEAT-008 will use: all components with responsive overrides

---

## 6. Phase Dependency Flow

```
Phase 0: Health Check ──► (COMPLETED)
Phase 1: Planning      ──► (CURRENT)
  │
  ▼
Phase 2: Data Layer    ──► Complete tokens in styles/app.css
  │
  ▼
Phase 3: Business Logic ─► Create component files, type-safe props
  │
  ▼
Phase 4: Presentation   ─► Semantic rendering, accessibility
  │
  ▼
Phase 5: UI             ─► Visual styling, STYLEGUIDE.md
  │
  ▼
Phase 6: Integration    ─► Verify exports, global styles, scaffold compatibility
  │
  ▼
Phase 7: Testing/Polish ─► Unit tests, validation, polish
  │
  ▼
Phase 8: Final Checkpoint ─► Acceptance traceability, handoff
```

---

## 7. Plan Update Rules

If any downstream phase changes a contract that future phases consume (e.g., renaming a prop, changing a token name, restructuring exports), this planning report must be updated to reflect the new reality. The updating phase should add a note at the bottom of the relevant section and bump the `Last updated` date.

**Last updated**: 2026-07-08

---

## 8. Key Decisions

1. **CSS class composition**: Components will use Tailwind utility classes directly in JSX. No CSS Modules or styled-components for this feature.
2. **cn utility**: A minimal `cn()` helper (ported from `clsx` + `tailwind-merge` pattern or a small inline version) will be used in `src/components/ui/cn.ts` to merge class names cleanly.
3. **Testing library**: `@testing-library/react` is the standard for component tests. Verify if already installed; install if needed.
4. **Button loading state**: Uses `aria-busy="true"` and visual spinner (simple CSS animation or a small SVG). Text remains visible for context.
5. **No demo route**: No routed demo page will be created. Component examples live in `STYLEGUIDE.md` only. Integration verification uses the existing scaffold route.
6. **Material Symbols**: Already loaded via Google Fonts link in `styles/app.css`. Components use the `material-symbols-outlined` class with icon name as text content.
