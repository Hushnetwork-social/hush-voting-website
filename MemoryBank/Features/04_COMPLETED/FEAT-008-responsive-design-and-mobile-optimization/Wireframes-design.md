# FEAT-008 Wireframes and Responsive Design

## Design Intent

FEAT-008 preserves the existing HushVoting landing page and makes each section behave correctly across mobile, tablet, and desktop. The design direction is an audit-and-patch pass: keep the same sections, same copy, same component boundaries, and same Sovereign Shield tonal language unless a focused responsive or accessibility defect requires adjustment.

## Breakpoint Contract

| Range        | Navigation                       | Layout expectation                                                                             |
| ------------ | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| 320px-767px  | Hamburger disclosure             | Single-column stacked sections, 16px horizontal gutters, vertically stacked CTAs where needed. |
| 768px-1023px | Hamburger disclosure             | Tablet grids may become 2 columns where specified; header must not switch to desktop.          |
| 1024px+      | Inline nav + inline Pilot Access | Desktop grids and full landing-page rhythm.                                                    |

Implementation should prefer Tailwind `lg:` for desktop navigation visibility so tablet remains in the disclosure model.

## Page-Level Wireframe

### Mobile, 320px-375px

```text
┌──────────────────────────────┐
│ [shield] HushVoting!     [☰] │ fixed header, h-16
├──────────────────────────────┤
│ nav panel when open           │ bg-surface-container-low
│ ─ subtle outline-variant top  │
│ [Trust Model] 48px target     │
│ [Roles]       48px target     │
│ [Evidence]    48px target     │
│ [Platform]    48px target     │
│ [Pilot Access] 48px target    │
├──────────────────────────────┤
│ HERO                          │ px 16
│      [responsive mark]        │
│ Governed remote voting...     │ clamp display
│ Subheadline text              │ clamp body
│ [Request pilot access]        │ 48px+
│ [View verifier model]         │ 48px+
├──────────────────────────────┤
│ TRUST MODEL                   │ px 16
│ eyebrow                       │
│ The Trust Model Hierarchy     │ clamp h2
│ supporting copy               │
│ ┌ HushVoting layer ┐          │ tonal fill
│ │ chips wrap       │          │
│ └──────────────────┘          │
│       vertical connector      │
│ ┌ HushNetwork layer┐          │ tonal fill
│ │ badges wrap      │          │
│ └──────────────────┘          │
├──────────────────────────────┤
│ ROLES                         │ px 16
│ [Organizations card]          │
│ [Voters card]                 │ single column
│ [Trustees card]               │
│ [Auditors card]               │
├──────────────────────────────┤
│ PROTOCOL EVIDENCE             │ bg surface-container-low
│ Protocol Omega copy           │
│ [verified badge]              │
│ [Evidence item]               │ single column
│ [Evidence item]               │
│ ...six total                  │
├──────────────────────────────┤
│ PLATFORM READINESS            │
│ [PWA card]                    │ single column
│ [Electrobun card]             │
│ [Mobile Native card]          │
│ [claim badges wrap]           │
├──────────────────────────────┤
│ FINAL CTA                     │
│ quiet glow panel              │
│ [Request pilot access]        │
│ [Download overview]           │
├──────────────────────────────┤
│ FOOTER                        │
│ brand + tagline               │
│ legal/security links wrap     │
└──────────────────────────────┘
```

### Tablet, 768px-1023px

```text
┌────────────────────────────────────────────┐
│ [shield] HushVoting!                  [☰] │ fixed header
├────────────────────────────────────────────┤
│ nav disclosure remains active              │
├────────────────────────────────────────────┤
│ Hero centered, broader line length          │
├────────────────────────────────────────────┤
│ Trust model remains stacked hierarchy       │
├────────────────────────────────────────────┤
│ Roles: 2-column grid                        │
│ [Organizations] [Voters]                    │
│ [Trustees]     [Auditors]                   │
├────────────────────────────────────────────┤
│ Protocol: narrative plus readable item grid │
├────────────────────────────────────────────┤
│ Platform: 2-column if needed; no crowding   │
├────────────────────────────────────────────┤
│ Footer may be side-by-side if width allows  │
└────────────────────────────────────────────┘
```

### Desktop, 1024px+

```text
┌─────────────────────────────────────────────────────────────────┐
│ [shield] HushVoting!  Trust Model Roles Evidence Platform [CTA] │ fixed header
├─────────────────────────────────────────────────────────────────┤
│ HERO: centered, full-width atmospheric surface                   │
├─────────────────────────────────────────────────────────────────┤
│ TRUST MODEL: centered max-width hierarchy                        │
├─────────────────────────────────────────────────────────────────┤
│ ROLES: four-card row                                             │
│ [Organizations] [Voters] [Trustees] [Auditors]                  │
├─────────────────────────────────────────────────────────────────┤
│ PROTOCOL EVIDENCE: left narrative / right 2x3 evidence grid      │
├─────────────────────────────────────────────────────────────────┤
│ PLATFORM: 3-column readiness cards + single-row/wrapping badges  │
├─────────────────────────────────────────────────────────────────┤
│ FINAL CTA: quiet glow panel with two inline CTAs                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER: brand/tagline left, legal/security links right           │
└─────────────────────────────────────────────────────────────────┘
```

## Component Boundaries

FEAT-008 should work within the existing component boundaries:

| Component                  | Boundary                                                                       | Responsive responsibility                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `Header`                   | Fixed shell, brand, desktop nav, desktop CTA, mobile disclosure placement.     | Switch desktop nav at 1024px+, keep disclosure below 1024px, maintain 48px touch targets.                       |
| `MobileNavDisclosure`      | Toggle state, panel visibility, mobile/tablet nav links, Escape/outside click. | Keep panel hidden from accessibility tree while closed; apply required tonal surface and divider; 48px targets. |
| `BrandMark`                | Token-based shield mark.                                                       | Support distinct header sizing and hero sizing via className/props or wrapper classes.                          |
| `HeroSection`              | Hero mark, headline, subheadline, CTAs.                                        | Maintain clamp typography, stacked mobile CTAs, no horizontal overflow, responsive mark dimensions.             |
| `TrustModelSection`        | Trust hierarchy section.                                                       | Preserve stacked hierarchy on mobile, readable chips/badges, tokenized gutters.                                 |
| `RoleWorkflowSection`      | Four role cards.                                                               | 1 column mobile, 2 columns tablet, 4 columns desktop.                                                           |
| `ProtocolEvidenceSection`  | Protocol narrative and six evidence items.                                     | 1 column mobile, 2-column evidence grid on desktop; no cramped item labels.                                     |
| `PlatformReadinessSection` | Three readiness cards plus claim boundary.                                     | 1 column mobile, 3 columns desktop; tablet can use 2 columns if readable.                                       |
| `ClaimBoundaryBar`         | Claim badges list.                                                             | Wrap badges cleanly on mobile; avoid horizontal overflow.                                                       |
| `FinalCtaSection`          | Pilot access CTA panel.                                                        | Stack or wrap actions safely; preserve glow panel as a quiet shell, not a heavy nested card.                    |
| `Footer`                   | Footer landmark and utility links.                                             | Stack mobile, side-by-side desktop, 48px interactive link area.                                                 |

## Navigation Detail Wireframes

### Closed mobile/tablet nav

```text
<header>
  <a href="/">brand home</a>
  <button aria-expanded="false" aria-controls="mobile-nav">
    hamburger icon
  </button>
  <div id="mobile-nav" invisible pointer-events-none max-h-0>
    <nav aria-label="Primary">...</nav>
  </div>
</header>
```

Expected behavior:

- Toggle remains at least 48px by 48px.
- Closed panel is not reachable by keyboard, pointer, or assistive tech.
- There is a single authoritative mobile nav landmark inside the panel; do not add duplicate region landmarks.

### Open mobile/tablet nav

```text
<header>
  <button aria-expanded="true">close icon</button>
  <div id="mobile-nav" class="bg-surface-container-low border-t border-outline-variant">
    <nav aria-label="Primary">
      <a h=48>Trust Model</a>
      <a h=48>Roles</a>
      <a h=48>Protocol Evidence</a>
      <a h=48>Platform</a>
      <a h=48>Pilot Access</a>
    </nav>
  </div>
</header>
```

Expected behavior:

- Escape closes and restores focus to the trigger.
- Link activation closes the panel.
- Panel uses tonal fill and the one allowed subtle divider.
- No `border-white` class or white structural outline.

### Desktop nav

```text
<header h=64>
  brand home link
  <nav aria-label="Primary">
    section links h>=48
  </nav>
  Pilot Access h>=48
</header>
```

Expected behavior:

- Desktop nav begins at 1024px.
- Hamburger is hidden at 1024px+.
- Header may retain a subtle low-contrast bottom treatment if it reads as shell separation, but FEAT-008 should not introduce strong white or heavy borders.

## Section Design Requirements

### Hero

Fields/content:

- Brand mark.
- H1: `Governed remote voting for serious organizations.`
- Subheadline.
- Primary CTA: Request pilot access.
- Secondary CTA: View verifier model.

Responsive behavior:

- Mobile gutters: 16px.
- Hero headline uses clamp around `2rem` to `display-lg`.
- Body/subheadline uses readable clamp or tokenized body scale.
- CTA row stacks on mobile and can render inline from small/tablet widths if no overflow.
- Hero mark should render as a meaningful larger brand anchor in the hero context while the header mark remains compact.

Validation:

- 320px: no clipped heading or CTA overflow.
- 375px: both CTAs are at least 48px tall.
- 1440px: headline remains capped within token scale.

### Trust Model Hierarchy

Fields/content:

- Eyebrow.
- Section heading.
- Supporting copy.
- HushVoting application layer card with capability chips.
- Connector.
- HushNetwork foundation layer card with trust badges.

Responsive behavior:

- Mobile: stacked cards, wrapped chips/badges, no overflow.
- Desktop: preserve centered hierarchy and connector.
- No additional heavy wrapper cards.

Validation:

- Cards remain vertically ordered at mobile widths.
- Chips and badges wrap within card width.
- Surface contrast remains visible between layers.

### Role Workflow

Fields/content:

- Eyebrow, heading, description.
- Four role cards: Organizations, Voters, Trustees, Auditors.
- Decorative Material Symbol icon, title, and description per card.

Responsive behavior:

- 320px-767px: 1 column.
- 768px-1023px: 2 columns.
- 1024px+: 4 columns when width permits.
- Cards are informational, not focusable.

Validation:

- Use bounding boxes to verify column count by row alignment.
- Cards should not become interactive unless a future feature changes scope.

### Protocol Evidence

Fields/content:

- Heading.
- Protocol Omega narrative.
- Verified badge.
- Six evidence items.

Responsive behavior:

- Mobile: narrative first, badge, then evidence items in one column.
- Desktop: narrative column plus 2-column evidence grid.
- Maintain `bg-surface-container-low` band as section-level tonal separation.

Validation:

- Evidence item text remains readable and not clipped.
- Inset wells remain tonal; no outline-heavy treatment.

### Platform Readiness and Claim Boundary

Fields/content:

- Heading and description.
- Three cards: PWA-First, Electrobun-Ready, Mobile Native.
- Claim badges.

Responsive behavior:

- Mobile: cards stack one column.
- Tablet: two columns acceptable if readable.
- Desktop: three cards in one row.
- Claim badges wrap on mobile and should fit one row where desktop width allows.

Validation:

- Badge row never creates horizontal overflow.
- Filled shield/check icons remain decorative.

### Final CTA

Fields/content:

- Heading.
- Description.
- Primary mailto CTA.
- Secondary overview CTA.
- Placeholder note.

Responsive behavior:

- Keep the glow container as a quiet shell.
- CTAs wrap or stack without overlap.
- Both actions remain native links and meet touch-target expectations.

Validation:

- Mailto and fragment links remain reachable by keyboard.
- Focus rings are visible against the container surface.

### Footer

Fields/content:

- Brand.
- Tagline.
- Privacy Policy, Terms of Service, Security Audit.

Responsive behavior:

- Mobile: brand/tagline centered, links wrap beneath.
- Desktop: brand/tagline left and links right.
- Footer links must expose 48px target height or equivalent padding.

Validation:

- Footer links do not become too small at 320px.
- Legal/security links wrap without overlap.

## Interaction and Validation States

| State             | Expected interaction                                | Validation method                                                   |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| Mobile nav closed | Button visible; panel hidden from a11y tree.        | `aria-expanded=false`, visibility/computed style, no visible links. |
| Mobile nav open   | Links and CTA visible; 48px targets.                | Click toggle, bounding boxes for links.                             |
| Tablet nav        | Same as mobile disclosure.                          | 768x1024 and 1023px width checks.                                   |
| Desktop nav       | Inline links and CTA visible; hamburger hidden.     | 1024px and 1440px checks.                                           |
| Focus state       | Ring visible on all links/buttons.                  | Keyboard/tab or Playwright focus checks.                            |
| Responsive grids  | Correct columns by breakpoint.                      | Bounding-box row/column assertions.                                 |
| Typography        | Clamp/tokenized computed values.                    | Computed style checks at 320px and 1440px.                          |
| Visual language   | No white border classes, tonal hierarchy preserved. | DOM class scan plus computed style checks for key surfaces.         |

## Responsive Edge Expectations

- No horizontal scroll at 320px, 375px, 768px, 1024px, 1440px, or 1920px widths.
- Header fixed positioning must not hide anchor destinations; `.section-anchor` remains required.
- Long labels such as `Protocol Evidence` and claim badges must wrap or receive enough width.
- Touch targets should be measured from actual bounding boxes.
- Avoid implementation changes that convert static informational cards into focusable elements.

## Test Coverage Design

The refinement plan should require package scripts or documented commands that run:

1. CSS baseline scenario first.
2. FEAT-008 responsive scenarios second.

Recommended scenario coverage:

- Mobile nav at 375px including surface/divider/no-white-border assertions.
- Desktop nav at 1440px.
- Tablet nav at 768px and/or 1023px.
- Role grid at 375px, 768px, and 1440px.
- Protocol evidence and platform grids at mobile and desktop widths.
- Touch target scan for all interactive elements.
- No `border-white` scan at 320px, 375px, 768px, 1440px.
- Section padding computed style at 375px and 1440px.
- Responsive typography computed style at 320px and 1440px.
