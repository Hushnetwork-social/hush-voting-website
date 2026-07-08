# UX Research Report — FEAT-003: Hero Section and Navigation

## Context

FEAT-003 delivers the first public product impression for the HushVoting website: a fixed blurred top navigation bar and responsive hero section. It must use the completed FEAT-002 Sovereign Shield tokens/components and preserve the HushVoting visual-language rule that hierarchy comes primarily from tonal surfaces, spacing, radius, and restrained glow — not bright structural borders.

Primary design references:

- `FeatureDescription.md` for FEAT-003 acceptance scope.
- `EPIC-001` landing-page wireframe and prototype reference.
- `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html` for content/layout reference.
- `STYLEGUIDE.md` and `src/components/ui/*` from FEAT-002 for implementation primitives.
- `HushVotingVisualLanguage.md` and `DesignBaseline.md` for HushVoting visual and privacy posture.

## Target Users and Jobs

| User | Job to be Done | Hero/Nav UX Need |
| --- | --- | --- |
| Organization representative | Quickly understand whether HushVoting fits serious organizational remote elections. | Immediate value proposition, trustworthy tone, obvious `Request pilot access` path. |
| Security/privacy evaluator | Find trust, role, protocol evidence, and platform-readiness explanations without searching. | Clear anchor navigation and secondary CTA toward verifier/evidence content. |
| Auditor/compliance stakeholder | Confirm the product exposes auditability and evidence boundaries. | Navigation labels that map to `Trust Model`, `Roles`, `Protocol Evidence`, and `Platform`. |
| Returning visitor | Re-enter the page and jump directly to a section. | Fixed navigation, stable anchors, keyboard-reachable links. |
| Mobile visitor | Learn the product from a phone without losing navigation or CTAs. | Compact header, accessible mobile menu/drawer, stacked CTA rhythm, 48px touch targets. |

## Primary Workflow and Entry Points

### Entry points

1. Direct visit to `/` or `https://www.hushvoting.com`.
2. Future campaign/referral links landing at `/` or section anchors such as `/#protocol`.
3. User scrolls page and uses fixed top navigation to move between planned landing-page sections.
4. CTA activation from nav or hero:
   - `Pilot Access` / `Request pilot access` should route to the FEAT-007 contact path once available.
   - Until FEAT-007 implements the final path, refinement may choose a safe placeholder anchor or mailto only if approved by the contact-path owner.
   - `View verifier model` should anchor to the planned Protocol Evidence section (`#protocol`) in this MVP.

### Primary visitor flow

```text
Open homepage
  → Fixed nav is visible and calm over dark surface
  → Visitor reads HushVoting brand and hero headline
  → Visitor scans subheadline for product promise
  → Visitor chooses:
      A. Request pilot access
      B. View verifier model / protocol evidence
      C. Jump to Trust Model, Roles, Protocol Evidence, or Platform via nav
  → Page remains navigable as the visitor scrolls to later sections
```

## Content Requirements

### Brand/identity

- Header brand text: `HushVoting!`.
- Hero brand treatment: approved brand mark/logo if an asset exists; otherwise use a token-based shield/mark placeholder that is accessible and does not depend on the external prototype image URL.
- Brand mark must not claim official certification beyond the product identity.

### Approved hero copy

- Headline: `Governed remote voting for serious organizations.`
- Subheadline: `HushVoting! helps organizations run private, auditable, protocol-bound votes with clear roles for voters, owners, trustees, and auditors.`

### Navigation labels and anchor targets

| Label | Target | Ownership Note |
| --- | --- | --- |
| Trust Model | `#trust` | FEAT-004 owns section content. |
| Roles | `#roles` | FEAT-005 owns section content. |
| Protocol Evidence | `#protocol` | FEAT-006 owns section content. |
| Platform | `#platform` | FEAT-006 owns platform-readiness section content. |

FEAT-003 may introduce anchor links to planned IDs but must not implement unrelated downstream sections.

## State Coverage

| State | UX Requirement |
| --- | --- |
| Default desktop | Header fixed at top; brand left, anchors centered, Pilot Access CTA right; hero centered with brand mark, headline, subheadline, and two CTAs. |
| Default tablet | Preserve nav if space allows; avoid cramped anchors. Header padding may reduce and hero content remains centered. |
| Default mobile | Header remains usable with brand and a menu control. Menu opens to section links and Pilot Access CTA. Hero stacks vertically with full-width or comfortably wrapped CTAs. |
| Mobile nav closed | Menu button has accessible name such as `Open navigation`; header still exposes brand and Pilot Access if space permits or exposes CTA inside menu. |
| Mobile nav open | Links and CTA are readable, keyboard reachable, dismissible, and do not trap users without an exit. Menu button changes accessible name/state (`aria-expanded`). |
| Loading/hydration | Static SSR content should render immediately. If a skeleton is used, it must preserve approximate nav/hero layout and avoid layout shift. |
| Empty | No data-empty state is expected because this is static marketing content. If logo asset is absent, render a deterministic brand mark fallback rather than an empty image. |
| Disabled/future target | If FEAT-007 contact path is not implemented, CTA must use a documented placeholder behavior and visible copy must not imply a working backend form. |
| Error/not found | Out of FEAT-003 page scope, but root route should not break if anchor targets are not yet present. Missing anchors should safely no-op until later FEATs add sections. |
| Reduced motion | Purple glow and menu transitions should not require motion. Respect reduced-motion preferences where animation is added. |

## Accessibility and Keyboard/Focus Considerations

- Use semantic landmarks:
  - `<header>` for top navigation.
  - `<nav aria-label="Primary">` for section links.
  - `<main>` around page content.
  - Hero section should contain the page `<h1>`.
- Interactive elements must be native `<a>` or `<button>` elements with visible names.
- The mobile menu control must expose `aria-expanded` and `aria-controls`.
- Keyboard order should be: brand/home link (if interactive), nav links/menu button, Pilot Access CTA, hero CTAs, then page content.
- Fixed header must not obscure anchor targets; refinement should include scroll-margin handling for planned section IDs or documented page-level CSS.
- All touch targets should be at least 48px high on mobile.
- Focus styling must use FEAT-002 primary focus ring behavior and must be visible on the dark surface.
- Decorative glow elements must be `aria-hidden` or CSS-only.
- Hero brand image requires meaningful `alt` text if it conveys the product identity; if adjacent visible text already says `HushVoting!`, the mark can be decorative with `alt=""` to avoid repetition.

## Visual Language Notes

- Use deep `surface` as the page floor.
- Header blur should read as a quiet glass/tonal layer, not as a bright bordered toolbar.
- Purple glow is acceptable as a restrained brand atmosphere behind the hero mark; avoid heavy shadows and saturated bloom that reduce text contrast.
- Secondary CTA should use FEAT-002 `Button` secondary or ghost treatment. Do not add default bright outlines just because the prototype secondary button contains a border.
- If the header needs edge separation, prefer translucent surface fill/backdrop blur and a very soft bottom tonal transition over a white line.

## Open Product Questions / Assumptions

1. **Pilot access final target:** Assumption for design is a placeholder anchor/mailto until FEAT-007 owns the contact path. Refinement should name the exact interim URL or mailto before implementation.
2. **Brand asset:** Assumption is that production should avoid the prototype's external Googleusercontent image. If no approved local logo exists, implement a token-based brand mark fallback.
3. **Mobile menu pattern:** Assumption is a simple accessible disclosure/drawer is sufficient for MVP; no complex app-shell navigation is required.
4. **Anchor targets before downstream sections exist:** Assumption is links may target planned IDs and safely no-op or scroll once those sections are implemented. Refinement should decide whether FEAT-003 adds temporary hidden anchors or waits for later FEAT sections.
5. **Analytics:** Out of scope unless already present; CTA click tracking should not be introduced by FEAT-003 alone.
