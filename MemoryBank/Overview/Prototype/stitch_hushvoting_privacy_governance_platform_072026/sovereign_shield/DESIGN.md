---
name: Sovereign Shield
colors:
  surface: "#091422"
  surface-dim: "#091422"
  surface-bright: "#303a49"
  surface-container-lowest: "#050e1d"
  surface-container-low: "#121c2a"
  surface-container: "#16202f"
  surface-container-high: "#202a3a"
  surface-container-highest: "#2b3545"
  on-surface: "#d9e3f7"
  on-surface-variant: "#cac4d4"
  inverse-surface: "#d9e3f7"
  inverse-on-surface: "#273140"
  outline: "#948e9d"
  outline-variant: "#494552"
  surface-tint: "#cebdff"
  primary: "#cebdff"
  on-primary: "#381385"
  primary-container: "#a78bfa"
  on-primary-container: "#3c1989"
  inverse-primary: "#674bb5"
  secondary: "#b9c6e8"
  on-secondary: "#23304b"
  secondary-container: "#3c4965"
  on-secondary-container: "#abb8da"
  tertiary: "#d0bcff"
  on-tertiary: "#3c0091"
  tertiary-container: "#ab88ff"
  on-tertiary-container: "#40009b"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#e8ddff"
  primary-fixed-dim: "#cebdff"
  on-primary-fixed: "#21005e"
  on-primary-fixed-variant: "#4f319c"
  secondary-fixed: "#d8e2ff"
  secondary-fixed-dim: "#b9c6e8"
  on-secondary-fixed: "#0d1b35"
  on-secondary-fixed-variant: "#3a4763"
  tertiary-fixed: "#e9ddff"
  tertiary-fixed-dim: "#d0bcff"
  on-tertiary-fixed: "#23005c"
  on-tertiary-fixed-variant: "#5516be"
  background: "#091422"
  on-background: "#d9e3f7"
  surface-variant: "#2b3545"
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "500"
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  max-width-content: 1200px
---

## Brand & Style

This design system is engineered for high-stakes digital governance where privacy and technical integrity are paramount. The aesthetic is **Corporate / Modern** with a lean toward **Minimalism**, emphasizing a "privacy-first" atmosphere through deep, atmospheric tones and precise typography.

The personality is calm, serious, and institutionally credible. It avoids the frantic energy of typical consumer apps in favor of a measured, rhythmic interface that respects the user's focus during the voting process. Visual metaphors are rooted in security—shielding, enclosure, and clarity—to reassure the user that their intent is protected by robust cryptography.

Key stylistic pillars:

- **Calm surfaces:** Low-contrast transitions between deep blue and purple-grey backgrounds.
- **Technical precision:** Monospaced-inspired alignment without the clutter, utilizing clean sans-serif type.
- **Premium restraint:** No decorative shadows or excessive layering; depth is communicated through tonal shifts.

## Colors

The palette is anchored in a spectrum of deep night-blues and technical purples, creating a "dark value" environment that minimizes eye strain and maximizes the feeling of a secure vault.

- **Primary Purple (#A78BFA):** Reserved for primary actions, focus states, and the brand mark representation. It provides high legibility against the dark backgrounds.
- **Surface Strategy:** We use a tiered system of dark values rather than shadows. The `background_deep` serves as the canvas, while `surface_main` and `surface_secondary` define functional areas.
- **The "Well":** `well_dark` is used for inset content, like input fields or data readouts, creating a "carved-out" look that suggests stability.
- **Typography:** `text_primary` is a tinted white, preventing the harsh vibration often found in pure #FFFFFF on dark backgrounds.

## Typography

This design system uses **Hanken Grotesk** for its primary communication. Its sharp, contemporary geometry fits the "technically credible" brand persona. For technical metadata, receipt hashes, and status labels, we introduce **JetBrains Mono** to reinforce the cryptographic and procedural nature of the product.

- **Headlines:** Should be set with tight letter-spacing to feel impactful and authoritative.
- **Labels:** Use the monospaced font in uppercase for a "government-issue" or "technical-readout" feel.
- **Hierarchy:** Maintain clear vertical rhythm. Use `body-lg` for preamble text in voting sections to ensure maximum readability for all demographics.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with fixed constraints for readability. We use a generous 8pt-based spacing system to ensure the UI feels "airy" and unhurried.

- **Desktop Layout:** Center-aligned content with a maximum width of 1200px. Use a 12-column grid. Full-width sections should be used for operational transitions (e.g., the voting booth floor).
- **Mobile Layout:** Single-column stack. Margins shrink to 16px. Ensure all touch targets maintain a minimum 48px height.
- **Operational Sections:** Functional areas (like a ballot card) should have internal padding of `lg` (40px) to give the content "room to breathe," signaling that the task at hand is important.

## Elevation & Depth

This design system eschews traditional drop shadows to maintain its "flat-technical" aesthetic. Depth is achieved through **Tonal Layering**:

1.  **Floor (Level 0):** `#111827` – The base application background.
2.  **Panels (Level 1):** `#23304B` – Used for the primary container of a page.
3.  **Components (Level 2):** `#2A2A3E` – Used for cards, secondary buttons, or floating navigation.
4.  **Inset Wells:** `#151C33` – Used for "carved" elements like input fields or code blocks.

**Borders:** Use borders sparingly. A 1px border using `#374151` is acceptable only for defining input states (Focus) or distinct status boundaries. Never use white borders; if a border is needed for emphasis, use a low-opacity version of the Primary Purple.

## Shapes

The shape language is **Rounded**, balancing the technical seriousness with an approachable, human-centric feel.

- **Standard Radius:** 0.5rem (8px) for cards, panels, and large buttons.
- **Large Radius:** 1rem (16px) for main content containers and "Booths."
- **Full Radius:** Used only for status chips (pill-shaped) to distinguish them from actionable buttons.
- **Input Fields:** Should match the Standard Radius (8px) for consistency with buttons.

## Components

### Buttons

- **Primary:** Filled with `Primary Purple`, text in `Deep Background`. No shadow. On hover, brighten to `Light Purple`.
- **Secondary:** Filled with `Surface Secondary`, text in `Text Primary`.
- **Keyboard Focus:** A 2px solid `Primary Purple` ring with a 2px offset.

### Calm Panels (Cards)

- Avoid stacking cards. Use large, full-width or half-width panels with `#23304B` fill.
- No borders. Use the tonal difference against the `#111827` background to define the edge.

### Input Fields

- Use the `well_dark` (#151C33) background.
- Labels are always positioned above the field using `label-sm` in Monospace.
- Internal padding should be generous (12px 16px).

### Voting Chips

- Used for selecting candidates. These should behave like large, toggleable buttons.
- **Unselected:** `surface_secondary` fill.
- **Selected:** `well_dark` fill with a `Primary Purple` 2px border and a checkmark icon.

### Technical Info-Graphics

- Use clean, vector-based strokes in `Primary Purple` and `Neutral`.
- Avoid gradients or skeuomorphism. Keep data visualizations flat and geometric.
