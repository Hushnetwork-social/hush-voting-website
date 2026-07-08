# Wireframes Design — FEAT-003: Hero Section and Navigation

## Scope Boundary

FEAT-003 designs only the fixed top navigation and hero section. It may reference planned section anchors (`#trust`, `#roles`, `#protocol`, `#platform`) but must not implement the downstream landing-page sections owned by FEAT-004 through FEAT-006 or the contact path owned by FEAT-007.

## Reusable Components and Primitives

Use FEAT-002 primitives where practical:

- `Button` for `Pilot Access`, `Request pilot access`, and `View verifier model`.
- `Section` or equivalent section shell for hero spacing/max width.
- `IconLabel` only if the brand mark fallback needs icon + text treatment.
- Design tokens from `styles/app.css` for typography, spacing, radius, color, focus, and surface treatment.

FEAT-specific components that refinement may create:

- `TopNavigation` or `LandingNav`.
- `HeroSection`.
- `BrandMark` fallback if no approved image asset exists.
- `MobileNavigationDisclosure` if the nav is split into smaller components.

## Desktop Wireframe

```text
Viewport: >= 1024px

┌──────────────────────────────────────────────────────────────────────────────┐
│ fixed header, backdrop blur, translucent surface                             │
│                                                                              │
│ [HushVoting!]        Trust Model   Roles   Protocol Evidence   Platform      │
│                                                                       [Pilot Access]
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│ main / hero section, min-height ~80vh, padded below fixed header             │
│                                                                              │
│                         (purple glow, decorative)                            │
│                                                                              │
│                              [Brand mark]                                     │
│                                                                              │
│          Governed remote voting for serious organizations.                   │
│                                                                              │
│      HushVoting! helps organizations run private, auditable,                 │
│      protocol-bound votes with clear roles for voters, owners,               │
│      trustees, and auditors.                                                 │
│                                                                              │
│                  [Request pilot access]  [View verifier model]               │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Desktop layout requirements

- Header is fixed at top and spans viewport width.
- Header content is constrained to `max-width-content` and centered within the full-width blur surface.
- Brand sits left and should remain readable without relying on the hero mark.
- Anchor links sit in the middle area with balanced spacing.
- Pilot Access CTA sits right and remains prominent.
- Hero content is centered and vertically balanced below the fixed header.
- Hero headline uses display-scale typography with mobile-safe wrapping.
- Hero CTA row uses primary and secondary emphasis.
- The purple glow sits behind the brand mark/headline area and must not reduce text contrast.

## Tablet Wireframe

```text
Viewport: ~768px–1023px

┌─────────────────────────────────────────────────────────────┐
│ [HushVoting!]   Trust   Roles   Evidence   Platform [Pilot] │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         [Brand mark]                        │
│      Governed remote voting for serious organizations.      │
│   HushVoting! helps organizations run private, auditable...  │
│             [Request pilot access] [View verifier model]    │
└─────────────────────────────────────────────────────────────┘
```

### Tablet behavior

- If full labels fit, keep desktop nav visible.
- If labels crowd or wrap, switch to mobile disclosure earlier than the default breakpoint.
- Hero CTAs may remain side-by-side when each keeps a comfortable touch area.

## Mobile Wireframe — Nav Closed

```text
Viewport: <= 767px

┌──────────────────────────────┐
│ [HushVoting!]          [Menu]│
└──────────────────────────────┘

┌──────────────────────────────┐
│          [Brand mark]        │
│                              │
│ Governed remote voting for   │
│ serious organizations.       │
│                              │
│ HushVoting! helps            │
│ organizations run private,   │
│ auditable, protocol-bound    │
│ votes with clear roles...    │
│                              │
│ [Request pilot access]       │
│ [View verifier model]        │
└──────────────────────────────┘
```

### Mobile nav closed requirements

- Header uses mobile horizontal padding (`margin-mobile`).
- Brand remains visible.
- Menu button is at least 48px high/wide and has an accessible name.
- Fixed header must not cover the top of hero content.

## Mobile Wireframe — Nav Open

```text
┌──────────────────────────────┐
│ [HushVoting!]         [Close]│
├──────────────────────────────┤
│ Primary navigation            │
│                              │
│ → Trust Model                 │
│ → Roles                       │
│ → Protocol Evidence           │
│ → Platform                    │
│                              │
│ [Pilot Access]                │
└──────────────────────────────┘
```

### Mobile nav open behavior

- Menu may be a disclosure panel below the header or a compact drawer; choose the simplest accessible implementation.
- Opening menu sets `aria-expanded="true"` on the trigger.
- Links close the menu after activation.
- `Escape` should close the menu if implementation uses a drawer/dialog pattern.
- Focus must remain visible and logical; do not create a hidden focus trap unless the menu is a modal dialog.
- Background hero content can remain visible under a tonal overlay only if contrast and readability remain acceptable.

## Interaction Behavior

| Element | Behavior | Notes |
| --- | --- | --- |
| Brand | Prefer link to `/` if the nav component is reusable; static text is acceptable on home-only MVP. | Accessible name should be `HushVoting home` if linked. |
| Trust Model link | Anchor to `#trust`. | Later FEAT-004 owns the target section. |
| Roles link | Anchor to `#roles`. | Later FEAT-005 owns the target section. |
| Protocol Evidence link | Anchor to `#protocol`. | Hero secondary CTA may share this target. |
| Platform link | Anchor to `#platform`. | Later FEAT-006 owns target content. |
| Pilot Access | Navigate to contact path or safe interim mailto/anchor. | Final path owned by FEAT-007; refinement must decide interim behavior. |
| Request pilot access | Same target as nav CTA. | Primary hero action. |
| View verifier model | Anchor to `#protocol`. | Secondary action; no backend verifier integration in FEAT-003. |
| Menu button | Toggle mobile nav. | Use native `button`; `aria-controls`, `aria-expanded`. |

## Validation and Error States

### Anchor targets missing

```text
User clicks `Protocol Evidence` before FEAT-006 content exists
  → Browser may update URL hash or stay in place
  → No crash, no thrown route error
  → Later FEAT adds real target section with matching ID
```

Recommendation for refinement: add `scroll-margin-top` to future sections or a global class so fixed header does not cover target headings.

### CTA target not final

```text
User clicks `Request pilot access`
  → If FEAT-007 contact path is unavailable, open approved mailto or temporary anchor
  → Do not display a fake form or imply submission happened
```

### Logo asset missing

```text
No approved production logo file exists
  → Render accessible token-based brand mark fallback
  → Keep hero layout stable
  → Do not load external prototype image URL
```

### Reduced motion

```text
User has prefers-reduced-motion
  → No required motion for glow/menu
  → Transitions can be reduced/removed
```

## Responsive Size Expectations

| Breakpoint | Header | Hero | CTAs |
| --- | --- | --- | --- |
| Mobile | Brand + menu; disclosure links. | Single-column, centered or slightly left-balanced copy; generous top padding. | Stack vertically; full-width or min 48px height. |
| Tablet | Full nav if it fits; otherwise mobile menu. | Centered, narrower line lengths. | Side-by-side when comfortable. |
| Desktop | Full fixed nav with centered anchors. | Min-height around 80vh; hero content centered within 1200px. | Side-by-side. |
| Wide desktop | Do not stretch text beyond readable max widths. | Keep content max-width bounded; glow may extend decoratively. | Keep CTA row compact. |

## Visual Treatment Details

- Header surface: `bg-surface/80` or equivalent token-driven translucent layer with `backdrop-blur`.
- Header separation: use tonal translucency; avoid bright bottom borders. A soft low-opacity line is acceptable only if refinement finds blur insufficient.
- Hero floor: `surface` / `background`.
- Hero glow: large blurred primary/tertiary token-tinted pseudo-element, low opacity, pointer-events none, `aria-hidden`.
- Brand mark: use primary/tertiary tones; keep it calm and geometric.
- Headline: display-large on desktop; reduce to headline-large/mobile scale on small screens.
- Subheadline: body-large/body-md with `on-surface-variant` color.
- Secondary CTA: FEAT-002 secondary or ghost button; avoid adding a default bright structural outline.

## Accessibility Acceptance Sketch

```text
Tab order:
1. HushVoting home/brand link (if linked)
2. Trust Model / Roles / Protocol Evidence / Platform links (desktop)
   OR Menu button then menu links (mobile)
3. Pilot Access CTA
4. Request pilot access CTA
5. View verifier model CTA

Screen reader landmarks:
- banner/header
- primary navigation
- main
- hero h1
```

## Out-of-Scope Sketches

The following are intentionally not designed in FEAT-003:

- Trust Model hierarchy content cards.
- Role workflow cards.
- Protocol evidence grid.
- Platform readiness cards.
- Footer, legal utility pages, contact form, or download overview behavior.
- Authenticated election execution, verifier execution, or backend integration.
