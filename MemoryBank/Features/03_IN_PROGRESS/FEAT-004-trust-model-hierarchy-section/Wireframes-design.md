# Wireframes Design — FEAT-004: Trust Model Hierarchy Section

## Design intent

FEAT-004 adds one homepage section: the `#trust` Trust Model Hierarchy section. It should feel like a calm technical infographic, not an interactive workflow. The section explains that HushVoting! is the application/orchestration layer and HushNetwork is the privacy/blockchain foundation.

The approved prototype uses a vertical layered hierarchy. This design preserves that hierarchy on all breakpoints. On wider screens, only the content inside each card becomes horizontal.

## Component boundaries

```text
Homepage route (`src/routes/index.tsx`)
└─ existing FEAT-003 landing shell
   ├─ Header
   ├─ HeroSection
   └─ TrustModelSection                  ← FEAT-004
      ├─ Section header
      │  ├─ eyebrow
      │  ├─ h2
      │  └─ supporting paragraph
      ├─ TrustLayerCard: HushVoting!
      │  ├─ title/subtitle
      │  └─ capability chips
      ├─ DecorativeGradientConnector
      └─ TrustLayerCard: HushNetwork
         ├─ title/subtitle
         └─ trust labels
```

Recommended implementation shape:

- `src/components/landing/TrustModelSection.tsx`
- Export from `src/components/landing/index.ts`.
- Compose in `src/routes/index.tsx` after `HeroSection`.
- Keep copy/chip arrays as typed constants near the component or in `landing/constants.ts` if consistent with FEAT-003 conventions.

## Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ #trust                                                                     │
│                                                                            │
│                         FOUNDATIONAL INTEGRITY                             │
│                         The Trust Model Hierarchy                          │
│      HushVoting! coordinates election guarantees on top of HushNetwork...  │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ HushVoting!                                                [soft glow] │ │
│ │ The Application Interface & Orchestration Layer                         │ │
│ │                                                                        │ │
│ │                           [person_check Eligibility] [how_to_vote ...] │ │
│ │                           [security Private Choice] [inventory Artifacts]│ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                   │                                        │
│                         gradient connector                                 │
│                                   │                                        │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ HushNetwork                                                            │ │
│ │ The Trust, Privacy, and Blockchain Foundation                           │ │
│ │                                                                        │ │
│ │       ZERO-KNOWLEDGE PROOFS   IMMUTABLE LEDGER   ENCRYPTED SHARDS      │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Desktop layout rules

- Section max width uses `max-width-content` (1200px) and existing landing gutters.
- Header text is centered with a comfortable max line length for the supporting paragraph.
- Cards span the section width but should not look like heavy nested panels.
- Inside each card, use `md:flex-row` or equivalent:
  - left: layer title/subtitle;
  - right: chips or labels.
- Preserve vertical ordering: HushVoting! above HushNetwork.
- Use a short vertical connector centered between cards.
- Top layer may use a subtle primary glow/accent; bottom layer is calmer and foundation-like.

## Tablet wireframe

```text
┌───────────────────────────────────────────────┐
│ FOUNDATIONAL INTEGRITY                         │
│ The Trust Model Hierarchy                      │
│ supporting copy wraps to 2–3 lines             │
│                                               │
│ ┌───────────────────────────────────────────┐ │
│ │ HushVoting!                               │ │
│ │ Application Interface & Orchestration     │ │
│ │ [Eligibility] [Participation]             │ │
│ │ [Private Choice] [Artifacts]              │ │
│ └───────────────────────────────────────────┘ │
│                    │                          │
│ ┌───────────────────────────────────────────┐ │
│ │ HushNetwork                               │ │
│ │ Trust, Privacy, and Blockchain Foundation │ │
│ │ [ZERO-KNOWLEDGE PROOFS] [IMMUTABLE LEDGER]│ │
│ │ [ENCRYPTED SHARDS]                        │ │
│ └───────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

### Tablet layout rules

- Keep section centered and fluid.
- If chip rows become crowded, wrap instead of shrinking text below readable sizes.
- Do not switch to side-by-side layer cards; side-by-side weakens the hierarchy and conflicts with the connector.

## Mobile wireframe

```text
┌─────────────────────┐
│ FOUNDATIONAL        │
│ INTEGRITY           │
│ The Trust Model     │
│ Hierarchy           │
│ HushVoting! sits on │
│ top of HushNetwork… │
│                     │
│ ┌─────────────────┐ │
│ │ HushVoting!     │ │
│ │ Application &   │ │
│ │ orchestration   │ │
│ │                 │ │
│ │ [Eligibility]   │ │
│ │ [Participation] │ │
│ │ [Private Choice]│ │
│ │ [Artifacts]     │ │
│ └─────────────────┘ │
│          │          │
│ ┌─────────────────┐ │
│ │ HushNetwork     │ │
│ │ Trust/privacy/  │ │
│ │ blockchain      │ │
│ │                 │ │
│ │ ZERO-KNOWLEDGE  │ │
│ │ PROOFS          │ │
│ │ IMMUTABLE LEDGER│ │
│ │ ENCRYPTED SHARDS│ │
│ └─────────────────┘ │
└─────────────────────┘
```

### Mobile layout rules

- Use `margin-mobile` / 16px side gutters.
- Section vertical padding may reduce from desktop `xl` to mobile `lg` while preserving rhythm from FEAT-003.
- Heading uses the mobile headline token if needed.
- Chips should be full-width or natural wrap rows with readable spacing.
- Labels may stack vertically; do not force a 3-column row.
- No horizontal scrolling.

## Visual treatment details

### Section shell

- Background remains the page `surface` or current landing page background.
- The section itself should not be a heavy card.
- Use centered heading typography and monospaced uppercase eyebrow.
- Add `scroll-margin-top` to avoid fixed-header overlap.

### HushVoting! layer card

- Surface: `surface-container` or slightly elevated token surface.
- Accent: subtle primary top/left accent or soft glow; avoid a full bright outline.
- Title color: `primary`.
- Subtitle: `on-surface-variant`.
- Capability chips:
  - Use `InsetWell` or tonal pill/well styles.
  - Include decorative Material Symbol icons plus visible text.
  - Chips are not buttons and should not have hover/focus styles implying interaction.

### Connector

- A short vertical line or narrow rounded bar with `bg-gradient-to-b from-primary to-transparent` or equivalent tokenized gradient.
- Decorative only: `aria-hidden="true"`.
- It should visually connect but not dominate; keep it lower contrast than primary CTAs.

### HushNetwork layer card

- Surface: `surface-container-lowest` or `surface-container-low` to read as a foundation layer.
- Title color: `secondary`.
- Subtitle: `on-surface-variant`.
- Trust labels should be uppercase monospaced labels with restrained opacity/secondary tone.
- Labels can be simple filled badges or inline label text; avoid bright borders around each label.

## Field/action/validation behavior

This section has no form fields, no user actions, and no validation behavior.

| Element                 | Interactive?           | Behavior                                |
| ----------------------- | ---------------------- | --------------------------------------- |
| `#trust` section anchor | Navigation target only | Existing nav fragment scrolls here.     |
| Capability chips        | No                     | Informational labels; not focusable.    |
| Trust labels            | No                     | Informational labels; not focusable.    |
| Connector/glow          | No                     | Decorative; hidden from assistive tech. |

## Edge-state expectations

- Long text / browser zoom: cards grow vertically; chips wrap.
- Missing Material Symbols font: visible chip text still communicates meaning.
- Reduced motion: no essential animation.
- High contrast mode: text hierarchy must remain understandable from copy and structure, not glow alone.
- SSR without JavaScript: section content remains readable.

## Testable render contract

Component tests should verify that the section renders:

- `Foundational Integrity`.
- `The Trust Model Hierarchy`.
- `HushVoting!` and `The Application Interface & Orchestration Layer`.
- All four capability chips: `Eligibility`, `Participation`, `Private Choice`, `Artifacts`.
- `HushNetwork` and `The Trust, Privacy, and Blockchain Foundation`.
- All three trust labels: `ZERO-KNOWLEDGE PROOFS`, `IMMUTABLE LEDGER`, `ENCRYPTED SHARDS`.
- A section with `id="trust"`.

Tests should not assert brittle class strings beyond stable accessibility/semantic hooks where possible.
