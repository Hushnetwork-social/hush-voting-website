# Design Summary — FEAT-003: Hero Section and Navigation

## Final Design Decisions

1. **FEAT-003 owns only the landing-page top navigation and hero.** It must not implement trust, role, protocol, platform, footer, legal, contact, or backend behavior.
2. **Use the prototype copy as the MVP source.**
   - Headline: `Governed remote voting for serious organizations.`
   - Subheadline: `HushVoting! helps organizations run private, auditable, protocol-bound votes with clear roles for voters, owners, trustees, and auditors.`
3. **Use planned anchor IDs for navigation.** Desktop and mobile nav link to `#trust`, `#roles`, `#protocol`, and `#platform`, preserving downstream ownership by FEAT-004 through FEAT-006.
4. **CTA hierarchy is fixed.** `Request pilot access` / `Pilot Access` is primary. `View verifier model` is secondary and should point to `#protocol` for the MVP.
5. **Pilot access behavior needs an implementation-time interim decision.** FEAT-007 owns the final contact path; FEAT-003 refinement must choose a safe placeholder anchor or mailto and document it before implementation.
6. **Avoid external prototype assets.** If no approved local logo exists, implement a token-based HushVoting brand mark fallback rather than loading the external prototype image URL.
7. **Use FEAT-002 components and tokens.** Prefer `Button`, tokenized surfaces/typography/spacing, and any simple feature components composed around those primitives.
8. **Navigation is fixed and responsive.** Desktop uses brand + anchors + CTA. Mobile uses brand + accessible menu disclosure/drawer + links + CTA.
9. **Visual separation is tonal and atmospheric.** Header blur/translucency and hero glow are allowed; bright structural borders are not the default separator.
10. **Accessibility is a first-class acceptance condition.** Header/nav landmarks, a single hero `<h1>`, keyboard reachable controls, visible focus states, accessible menu state, and 48px mobile touch targets are required.

## Implementation Checklist for Refinement

### Content and structure

- [ ] Replace scaffold homepage content with a production-ready landing shell containing only nav + hero for this FEAT.
- [ ] Add semantic `<header>`, `<nav aria-label="Primary">`, `<main>`, and hero `<section>` structure.
- [ ] Ensure hero contains exactly one page-level `<h1>` for the approved headline.
- [ ] Add approved subheadline copy.
- [ ] Add brand identity in header and hero using local asset or token-based fallback.
- [ ] Do not introduce unrelated sections below the hero except minimal anchor placeholders only if refinement explicitly chooses that strategy.

### Navigation

- [ ] Implement fixed top navigation with blurred/translucent surface treatment.
- [ ] Constrain nav inner content to `max-width-content` while keeping the blur surface full-width.
- [ ] Add desktop anchor links: `Trust Model`, `Roles`, `Protocol Evidence`, `Platform`.
- [ ] Add prominent nav `Pilot Access` CTA.
- [ ] Implement mobile menu behavior with `aria-expanded`, `aria-controls`, accessible open/close labels, and keyboard-reachable links.
- [ ] Ensure mobile nav links close the menu after activation.
- [ ] Decide and document how missing downstream anchor targets behave until FEAT-004 through FEAT-006 land.

### Hero

- [ ] Use a min-height hero layout around the prototype's `80vh` intent while accounting for the fixed header.
- [ ] Add restrained purple glow behind the brand mark/headline area with decorative semantics (`aria-hidden` or CSS-only).
- [ ] Add primary CTA `Request pilot access`.
- [ ] Add secondary CTA `View verifier model` targeting `#protocol`.
- [ ] Use responsive typography: display-large on desktop, reduced headline scale on mobile.
- [ ] Keep text readable with bounded line lengths and adequate contrast.

### Visual language

- [ ] Use `surface`, `surface-container*`, `primary`, `on-surface`, and `on-surface-variant` tokens rather than hard-coded colors.
- [ ] Use FEAT-002 `Button` variants where possible.
- [ ] Do not add white outline separators to the header, hero, CTAs, or logo shell.
- [ ] Use border/ring only for focus, active/current, warning/error, or a deliberately documented accent state.
- [ ] Avoid heavy nested card treatment in the hero.

### Accessibility and behavior

- [ ] Ensure every link/button has an accessible name.
- [ ] Ensure focus states are visible on all interactive controls.
- [ ] Preserve a logical keyboard tab order on desktop and mobile.
- [ ] Ensure touch targets are at least 48px high/wide on mobile.
- [ ] Add reduced-motion-safe menu/glow behavior if transitions are used.
- [ ] Ensure the fixed header does not obscure anchor targets once downstream sections exist (`scroll-margin-top` strategy or equivalent).

### Tests and validation

- [ ] Add unit/component tests for nav/hero render contracts where practical: approved copy, links, CTA labels, and mobile menu state.
- [ ] Add or update E2E happy-path coverage for landing page visibility and CTA/link presence if the project pattern supports it.
- [ ] Validate with canonical scripts required by the project/FEAT, including `pnpm build`, `pnpm test:unit`, `pnpm typecheck`, and `pnpm lint` where available during implementation.
- [ ] Follow FEAT-001 lesson: use canonical package scripts, not direct tool commands.

## UI States Phase Planning Must Preserve

| State | Requirement |
| --- | --- |
| Desktop default | Fixed blurred header with brand, four anchors, Pilot Access CTA; centered hero with brand mark, headline, subheadline, two CTAs, and purple glow. |
| Tablet | Header remains readable; switch to menu if anchors crowd. Hero remains centered with comfortable line lengths. |
| Mobile closed nav | Brand and menu control visible; hero stacks; CTAs are full-width or otherwise 48px touch targets. |
| Mobile open nav | Section links and Pilot Access CTA are visible, keyboard reachable, and dismissible. `aria-expanded` reflects state. |
| Focus | All interactive controls use visible primary focus treatment. |
| Hover/active | Hover and active states are enhancements only; no information is hover-only. |
| Loading/hydration | SSR/static content should be available immediately; any skeleton must avoid layout shift. |
| Missing logo | Token-based brand mark fallback renders without broken image state. |
| Missing downstream anchors | Link activation must not crash; downstream FEATs add matching target sections later. |
| CTA target pending FEAT-007 | Use only approved placeholder/mailto behavior; do not imply a completed form submission path. |
| Reduced motion | Decorative effects and menu transitions remain usable with reduced motion. |

## Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Final pilot-access destination is not ready | CTA could mislead visitors | Refinement must choose and document a safe interim target; FEAT-007 owns final contact path. |
| Prototype external logo URL leaks into production | Privacy/performance/reliability issue | Use local approved asset or token-based fallback. |
| Header fixed positioning obscures anchor targets | Navigation feels broken once later sections exist | Add scroll-margin strategy during FEAT-003 or document a shared section class for later FEATs. |
| Mobile menu becomes inaccessible | Blocks mobile users from primary sections/CTA | Use native button, explicit aria state, keyboard tests, and 48px touch targets. |
| Border-heavy prototype details are copied directly | Violates HushVoting visual language | Use FEAT-002 Button/components and tonal surfaces; avoid default outline separators. |
| FEAT-003 expands into downstream landing content | Scope creep and ownership conflict | Keep implementation limited to nav/hero; only reference planned anchors. |

## Assumptions

- FEAT-002 design-system implementation remains available and is the styling/component baseline.
- The homepage route remains the landing page for the MVP.
- The public website does not perform authenticated election actions or backend pilot-access submission in FEAT-003.
- Later FEATs will implement the sections targeted by anchor navigation.
- Smooth scrolling may be implemented with CSS if it does not interfere with accessibility/reduced-motion preferences.

## Out of Scope

- Trust Model section content.
- Role workflow section content.
- Protocol evidence and platform readiness content.
- Footer, utility pages, contact form, download overview, or legal/security page content.
- Analytics instrumentation.
- Authenticated HushVoting app workflows.
- Backend integrations or live verifier execution.
- Moving FEAT-003 to Ready To Develop or creating `FeatureTasks.md` / phase files.

## Ready-for-Refinement Notes

FEAT-003 is sufficiently designed for refinement. The main refinement decisions are:

1. exact interim Pilot Access target before FEAT-007 exists;
2. local brand asset vs token-based brand mark fallback;
3. whether to add temporary anchor placeholders or allow planned anchor links to no-op until downstream sections are implemented;
4. the mobile menu implementation shape (simple disclosure vs drawer).
