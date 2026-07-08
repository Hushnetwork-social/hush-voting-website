# FEAT-003: Hero Section and Navigation

**Feature ID**: FEAT-003  
**Parent Epic**: EPIC-001  
**Status**: In Progress

## Summary

Implement the website top navigation bar and hero section for the HushVoting website MVP. The feature includes a fixed blurred navigation header with section anchors and a Pilot Access CTA, plus a responsive hero section with the brand mark, approved headline, approved subheadline, two hero CTAs, and a restrained purple glow treatment.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.

## Dependencies

- FEAT-002: Design System Implementation (Sovereign Shield)

## Scope

FEAT-003 is limited to the top navigation and hero section.

Included:

- Fixed top navigation bar.
- Blurred/backdrop navigation surface.
- HushVoting brand identity treatment.
- Desktop section anchor links.
- Accessible mobile disclosure navigation.
- Primary navigation CTA for Pilot Access.
- Hero brand mark or token-based fallback.
- Hero headline.
- Hero subheadline.
- Two hero CTAs.
- Purple glow visual effect.
- Responsive layout states.
- Accessible semantic structure.
- Focused React component implementation for the header and hero.
- React Testing Library coverage for landmarks, links, CTAs, and accessibility basics.

Out of scope:

- Additional page sections below the hero.
- Implementation of Trust Model, Roles, Protocol Evidence, Platform, or Pilot Access target sections.
- Dynamic CMS/content editing.
- Authentication or real pilot-access workflow implementation.
- Backend integrations.
- Analytics instrumentation unless already provided by the platform baseline.
- E2E expansion beyond the project’s established happy-path coverage unless refinement explicitly adds it.

## Design and Implementation Constraints

- Use FEAT-002 design-system components, tokens, and styling conventions.
- Prefer tonal surface separation, spacing, radius, and elevation over default bright border separators.
- Do not use white outline borders as the default section separation treatment.
- Keep the hero/navigation implementation static and production-ready for the MVP.
- Anchor links may target existing or planned page section IDs but must not introduce unrelated sections in this feature.
- Missing anchor targets must not crash, throw route errors, or imply a completed downstream workflow.
- Use local approved assets when available. If no approved production logo/mark asset exists, render a deterministic token-based brand mark fallback.
- Decorative glow elements must be CSS-only or `aria-hidden` and must not reduce text contrast.
- Respect reduced-motion preferences for any menu or glow transitions.

## Content and Link Contract

### Brand Identity

| Placement | Text / Treatment | Target | Notes |
| --- | --- | --- | --- |
| Header brand | `HushVoting!` | `/` | Prefer a home link with accessible name `HushVoting home`. Static text is acceptable only if the header is strictly home-page scoped. |
| Hero brand mark | Approved HushVoting mark, or token-based brand mark fallback | None required | If adjacent visible text already identifies HushVoting, the mark may be decorative. Do not load external prototype image URLs. |

### Hero Copy

| Element | Approved Copy |
| --- | --- |
| Headline | `Governed remote voting for serious organizations.` |
| Subheadline | `HushVoting! helps organizations run private, auditable, protocol-bound votes with clear roles for voters, owners, trustees, and auditors.` |

### Navigation Links

| Label | Href | Ownership |
| --- | --- | --- |
| Trust Model | `#trust` | FEAT-004 owns the target section content. |
| Roles | `#roles` | FEAT-005 owns the target section content. |
| Protocol Evidence | `#protocol` | FEAT-006 owns the target section content. |
| Platform | `#platform` | FEAT-006 owns the platform-readiness target content. |
| Pilot Access | `#pilot-access` | FEAT-007 owns the real contact path/section. FEAT-003 only provides the stable interim link target. |

### Hero CTAs

| Label | Emphasis | Href | Notes |
| --- | --- | --- | --- |
| Request pilot access | Primary | `#pilot-access` | Same target as the nav Pilot Access CTA. Do not imply a working form or completed submission path. |
| View verifier model | Secondary | `#protocol` | Anchors to the planned Protocol Evidence section. No verifier execution or backend integration is included. |

## Responsive Navigation Contract

Desktop and wide tablet navigation should show the brand, section anchors, and Pilot Access CTA in the fixed header when labels fit comfortably.

Mobile and constrained tablet layouts must use an accessible disclosure menu:

- Use a native `button` for the menu trigger.
- The trigger must have an accessible name such as `Open navigation` / `Close navigation`.
- The trigger must expose `aria-expanded` and `aria-controls`.
- The opened menu must use a tonal dropdown or sheet treatment consistent with FEAT-002 tokens.
- The opened menu must include the same section links and the Pilot Access CTA.
- Menu links and the Pilot Access CTA must be keyboard reachable.
- Activating any menu link or CTA should close the menu.
- Escape should close the menu when focus is inside the opened disclosure.
- Focus order must remain logical and visible.
- Do not create a hidden focus trap unless the implementation intentionally uses a modal dialog pattern.
- Touch targets should be at least 48px high on mobile.

## Implementation Contract

Refinement should plan focused landing components for the static hero/navigation surface. Suggested component boundaries:

- `Header`, `TopNavigation`, or `LandingHeader`
- `HeroSection` or `LandingHero`
- Optional `BrandMark`
- Optional `MobileNavigationDisclosure`

Implementation requirements:

- Use FEAT-002 `Button` or equivalent approved primitives for `Pilot Access`, `Request pilot access`, and `View verifier model`.
- Use FEAT-002 tokens for surfaces, typography, spacing, radius, focus rings, and color.
- Keep CTA/link data centralized enough that desktop nav, mobile nav, and hero CTAs cannot drift.
- Keep semantic structure clear:
  - `<header>` for the fixed top header.
  - `<nav aria-label="Primary">` for primary navigation.
  - `<main>` for the page content.
  - A single page `<h1>` in the hero section.
- Fixed header layout must not cover the top of hero content.
- Future sections should be able to add `scroll-margin-top` or equivalent so anchor targets are not hidden behind the fixed header.
- Use a restrained purple glow behind the hero brand/headline area; the glow must be decorative and non-interactive.

## Verification Contract

Add React Testing Library coverage for the static hero/nav behavior:

- Header/banner landmark renders.
- Primary navigation landmark renders.
- Brand identity renders with the expected text and accessible home behavior when linked.
- Desktop/navigation link labels and hrefs match the Content and Link Contract.
- Pilot Access CTA renders with href `#pilot-access`.
- Hero headline and subheadline render exactly as approved.
- Hero CTAs render with labels and hrefs from the Content and Link Contract.
- Mobile disclosure trigger exposes accessible name, `aria-expanded`, and `aria-controls`.
- Opening the mobile menu reveals the section links and Pilot Access CTA.
- Menu items are keyboard reachable and can close the menu after activation where supported by the implementation.
- Decorative glow/brand elements do not introduce inaccessible interactive content.

Verify through canonical package scripts where available:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:unit`
- `pnpm build`

## Acceptance Criteria

1. The page renders a fixed top navigation bar that remains visible while scrolling.
2. The navigation uses a blurred/backdrop tonal surface treatment consistent with the FEAT-002 design system.
3. The navigation includes the HushVoting brand identity text `HushVoting!`.
4. The header brand links to `/` with an accessible home name when implemented as an anchor.
5. The navigation includes section anchor links with these exact labels and hrefs: `Trust Model` → `#trust`, `Roles` → `#roles`, `Protocol Evidence` → `#protocol`, `Platform` → `#platform`.
6. The navigation includes a prominent `Pilot Access` CTA linking to `#pilot-access`.
7. The hero section includes the approved brand mark or a token-based brand mark fallback.
8. The hero section includes the exact headline: `Governed remote voting for serious organizations.`
9. The hero section includes the exact subheadline: `HushVoting! helps organizations run private, auditable, protocol-bound votes with clear roles for voters, owners, trustees, and auditors.`
10. The hero section includes a primary CTA labeled `Request pilot access` linking to `#pilot-access`.
11. The hero section includes a secondary CTA labeled `View verifier model` linking to `#protocol`.
12. The hero section includes the intended restrained purple glow visual treatment.
13. The navigation and hero are responsive across desktop, tablet, and mobile breakpoints.
14. The mobile navigation uses an accessible disclosure menu with keyboard support, accessible names, `aria-expanded`, `aria-controls`, visible focus, and usable touch targets.
15. Mobile menu links and CTA remain readable, keyboard reachable, and dismissible after activation.
16. Semantic HTML landmarks and heading hierarchy are used appropriately.
17. Interactive elements are keyboard reachable and have accessible names.
18. Decorative elements are not exposed as confusing interactive or duplicate screen-reader content.
19. The implementation uses FEAT-002 tokens/components rather than hard-coded one-off visual styles where reusable primitives exist.
20. The implementation avoids default bright borders as the primary layout separation mechanism.
21. Focused React Testing Library tests cover landmarks, links, CTAs, copy, hrefs, mobile disclosure basics, and accessibility basics.
22. The feature can be verified through the project’s canonical package scripts for build, lint, type-checking, and unit tests where available.

## Validation

The FEAT-003 scope is confirmed as constrained to the top navigation and hero section only.

The selected delivery target is a responsive static hero/navigation MVP using FEAT-002 design-system components and tokens. The feature is ready for refinement into implementation tasks without expanding into additional landing-page sections or backend behavior.

The exact MVP copy and hrefs are locked in this document. FEAT-003 may link to planned IDs owned by later features, but it must not implement those downstream sections or imply that `#pilot-access` is a completed pilot workflow. FEAT-007 owns the final contact path and may later replace or satisfy the `#pilot-access` target.

## Hepha Deep-Dive Decisions

| Topic | Decision |
| --- | --- |
| Acceptance Criteria | Use the “Responsive static hero/nav MVP” acceptance scope: fixed blurred navigation, section anchors, Pilot Access CTA, brand mark, headline, subheadline, two hero CTAs, purple glow, responsive states, accessible semantics, and verification through canonical package scripts. |
| Validation | Keep FEAT-003 limited to the top navigation and hero section. Use FEAT-002 design-system components/tokens and tonal surface separation without default bright borders. |
| Copy and Link Contract | Freeze explicit MVP copy and hrefs before task planning. Use `HushVoting!`, `Governed remote voting for serious organizations.`, the approved subheadline, nav targets `#trust`, `#roles`, `#protocol`, `#platform`, Pilot Access target `#pilot-access`, and secondary verifier CTA target `#protocol`. |
| Mobile Navigation Pattern | Use an accessible disclosure menu with a tonal dropdown/sheet, keyboard support, accessible names, `aria-expanded`, `aria-controls`, focus handling, and dismiss behavior. |
| Implementation and Verification Contract | Create focused Header/Hero landing components using FEAT-002 tokens/components, add React Testing Library coverage for landmarks, links, CTAs, and accessibility basics, then verify via canonical package scripts. |
