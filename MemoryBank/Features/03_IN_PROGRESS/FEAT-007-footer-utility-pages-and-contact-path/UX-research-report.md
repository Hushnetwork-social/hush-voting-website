# UX Research Report — FEAT-007 Footer, Utility Pages and Contact Path

**Feature:** FEAT-007 — Footer, Utility Pages and Contact Path  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Source Context

This design is based on:

- `FeatureDescription.md` for FEAT-007.
- `EPIC-001-hushvoting-website-platform/EpicDescription.md` and its Deep-Dive decisions.
- The high-fidelity prototype at `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html`.
- Sovereign Shield tokens in `MemoryBank/Overview/Prototype/.../sovereign_shield/DESIGN.md`.
- Existing landing implementation and constants patterns from FEAT-003 through FEAT-006.
- Lessons learned from FEAT-002 through FEAT-006, especially constants-first static content, thin route composition, fragment-anchor stability, and tonal surface separation over white borders.

## Target Users and Jobs

### Organization decision-makers and pilot sponsors

**Who:** Governance leaders, association officers, company administrators, and prospective HushVoting pilot owners.  
**Job:** Reach a credible contact path after reading the product story without being misled into thinking a production onboarding portal or legal contract is already live.

### Security and compliance evaluators

**Who:** Technical reviewers, audit stakeholders, counsel, privacy leads, and procurement participants.  
**Job:** Find the privacy, terms, and security-audit entry points quickly, while clearly understanding that these pages are launch scaffolds pending final review.

### General public visitors

**Who:** Voters, ecosystem participants, and HushNetwork visitors.  
**Job:** Confirm that HushVoting is a HushNetwork product and find a stable footer with expected legal/security links.

### Keyboard and assistive-technology users

**Who:** Visitors navigating with keyboard, screen readers, or reduced-motion preferences.  
**Job:** Reach the final CTA, mailto link, footer links, utility routes, and back-home navigation with correct semantics and visible focus states.

## Primary Workflow and Entry Points

### Entry points

- Existing nav and hero CTA fragments that target `#pilot-access`.
- Natural scroll path after Platform Readiness.
- Footer links to `/privacy`, `/terms`, and `/security`.
- Direct navigation to utility URLs from external links or search indexing.

### Primary homepage workflow

1. Visitor lands on the homepage and reads the hero, trust, roles, protocol, and platform sections.
2. Visitor reaches the final CTA section above the footer.
3. The section anchor is exactly `id="pilot-access"` so upstream fragment links resolve.
4. Visitor sees the headline: `Bring protocol-bound voting to your organization.`
5. Visitor sees the description: `Secure, private, and mathematically verifiable governance at scale.`
6. Visitor can activate `Request pilot access`, which opens a `mailto:` link.
7. The UI makes the pilot contact path explicitly placeholder/subject-to-review.
8. Visitor can activate `Download overview`; see the overview-link decision below.
9. Visitor reaches the footer and can navigate to utility pages.

### Utility page workflow

1. Visitor selects `Privacy Policy`, `Terms of Service`, or `Security Audit` in the footer.
2. Visitor lands on `/privacy`, `/terms`, or `/security`.
3. The page uses Sovereign Shield typography and surfaces, not a browser-default unstyled page.
4. The page clearly states that final legal/security/audit content is pending review.
5. The page offers a visible, keyboard-accessible back-to-home link.

## Content and Claim Boundary

FEAT-007 is intentionally launch-safe and conservative. It must not imply:

- final legal approval;
- final privacy-policy approval;
- final terms approval;
- completed security audit approval;
- a production onboarding form;
- a guaranteed pilot acceptance process;
- that the public website handles authenticated election execution.

### Final CTA content contract

| Field       | Required value                                                                      |
| ----------- | ----------------------------------------------------------------------------------- |
| Section id  | `pilot-access`                                                                      |
| Heading     | `Bring protocol-bound voting to your organization.`                                 |
| Description | `Secure, private, and mathematically verifiable governance at scale.`               |
| Primary CTA | `Request pilot access`                                                              |
| Secondary   | `Download overview`                                                                 |
| UI note     | `Pilot access requests currently open an email draft while onboarding is reviewed.` |

The UI note may use slightly shorter wording if needed for layout, but it must clearly communicate placeholder/subject-to-review status.

### Mailto contact contract

Because FEAT-007 specifies a mailto path but does not provide a production contact form, refinement should define typed constants before component implementation:

| Constant field | Recommended launch-safe value                                                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `to`           | `hello@hushvoting.com` unless the owner supplies a different approved inbox before implementation.                                                                                            |
| `subject`      | `HushVoting pilot access request`                                                                                                                                                             |
| `body`         | `Hello HushVoting team,%0D%0A%0D%0AWe are interested in pilot access for HushVoting. Please share the next review steps.%0D%0A%0D%0AOrganization:%0D%0AName:%0D%0ARole:%0D%0AUse case:%0D%0A` |

If `hello@hushvoting.com` is not owner-approved during refinement, use a clearly approved placeholder inbox supplied by the owner. The destination must not be hidden in component code; it belongs in typed constants and tests.

### Download overview decision

The prototype and acceptance criteria require a visible `Download overview` secondary CTA but do not identify an approved downloadable asset. To avoid broken or misleading downloads, refinement must choose one implementation posture before coding:

1. **Preferred:** add an approved static overview asset under the public assets directory and set a constants-backed `href` plus `download` filename; or
2. **Safe interim:** keep the CTA as a secondary link to an approved internal explanatory anchor such as `#protocol` while marking the overview asset as pending in constants/tests; or
3. **Owner-supplied:** wire the CTA to an owner-approved external document URL.

Do not create a fake download endpoint. Do not silently point the CTA to `#` without a documented placeholder state.

### Footer content contract

| Field   | Required value                                                                      |
| ------- | ----------------------------------------------------------------------------------- |
| Brand   | `HushVoting!`                                                                       |
| Tagline | `HushVoting! is a product of HushNetwork.`                                          |
| Links   | `Privacy Policy`, `Terms of Service`, `Security Audit`                              |
| Routes  | `/privacy`, `/terms`, `/security`                                                   |
| Styling | `bg-surface-container-lowest`; label-sm typography: JetBrains Mono, 12px, uppercase |

### Utility page copy contract

Each page should be concise and explicit.

| Route       | Page title         | Required copy intent                                                                                                                            |
| ----------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `/privacy`  | `Privacy Policy`   | State that final privacy policy content is pending legal/privacy review and that the public website currently contains launch scaffold content. |
| `/terms`    | `Terms of Service` | State that final terms are pending legal review and that placeholder text is not a finalized service agreement.                                 |
| `/security` | `Security Audit`   | State that final security audit references are pending review and that the page does not represent completed audit certification.               |

Recommended shared status line: `Launch placeholder — final review pending.`

## States

### CSS prerequisite state

FEAT-007 shares the site-wide prerequisite from FEAT-006: Sovereign Shield CSS must be loaded by the browser. A missing stylesheet link or unresolved CSS variables makes all footer, CTA, and utility-page visual assertions meaningless and must be fixed before accepting this feature.

### Default homepage state

- Final CTA renders after Platform Readiness and before the footer.
- CTA card uses `bg-surface-container`, rounded large radius, spacing, and `glow-subtle` or equivalent atmospheric treatment.
- No white outline border appears around the CTA card.
- Primary mailto CTA and secondary overview CTA are visible and keyboard accessible.
- Footer renders brand, tagline, and three utility links.
- Footer uses `bg-surface-container-lowest` and responsive layout.

### Default utility-page state

- Page renders as a simple legal/security scaffold, not a marketing card stack.
- Page has a semantic heading, status chip/label, concise pending-review copy, and back-home link.
- Use existing `Section` and `Card` primitives.
- Do not use white borders for page structure.

### Loading state

No FEAT-specific loading state is needed. Content is static and SSR-friendly. If a utility route temporarily streams during SSR, it should still resolve to complete static content without client-side data loading.

### Empty state

No empty data state is expected. Missing CTA/footer/utility constants should fail tests. Utility pages must not render blank placeholder shells.

### Disabled state

- `Request pilot access` must not be disabled; it is the primary functional contact path.
- `Download overview` must not pretend to download if no asset exists. If no approved target is available, refinement must explicitly choose a safe interim behavior and test it.
- Footer links must not be disabled.

### Error state

- Unknown routes remain handled by the root not-found boundary.
- `/privacy`, `/terms`, and `/security` must not 404.
- Mail client failure is outside browser control; the UI only needs a valid `mailto:` href and clear placeholder note.

### Hover, active, and focus states

- CTAs inherit Sovereign Shield Button hover/active/focus behavior.
- Footer links use `hover:text-primary` with transition.
- Keyboard focus rings use the existing primary focus treatment.
- No required information appears only on hover.

## Accessibility Considerations

- Use a semantic `<section id="pilot-access" aria-labelledby="pilot-access-heading">` for the final CTA.
- Use a semantic `<footer>` landmark.
- Use real links for mailto, overview, utility pages, and back-home navigation.
- The accessible name for the primary mailto link must match visible text: `Request pilot access`.
- Placeholder/subject-to-review text must be visible, not only in `title` attributes or screen-reader-only copy.
- Footer link text should remain readable when transformed uppercase; do not rely on text transform for accessible names if tests require exact label matching.
- Material Symbols, if any are added for utility page status or CTA decoration, must be `aria-hidden="true"` when paired with visible text.
- Maintain logical tab order: CTA primary, CTA secondary, footer links, then route-specific utility page links when navigated.
- Utility pages need one clear `h1` and no duplicate primary page heading.

## Responsive Expectations

- Mobile final CTA: card content stacks; CTA links are full-width or at least 48px high with comfortable tap targets.
- Desktop final CTA: centered heading/description with two CTAs in a row.
- Mobile footer: brand/tagline stack above utility links; links may wrap or stack but remain tappable.
- Desktop footer: brand/tagline left, utility links right.
- Utility pages: readable single-column content with mobile gutters from Sovereign Shield spacing.
- FEAT-008 may polish global breakpoints, but FEAT-007 must be independently usable on mobile.

## Product Assumptions

1. The public website remains static/SSR and does not own authenticated election execution.
2. A mailto contact path is acceptable for launch scaffolding and is safer than building an unowned contact form.
3. Owner-approved placeholder legal/security pages are acceptable only if they are clearly marked pending review.
4. The final CTA owns the real `#pilot-access` anchor; earlier hero/nav fragment links should now resolve to this section.
5. Typed constants in `src/components/landing/constants.ts` or an equivalent constants module are the source of truth for copy, routes, CTA labels, and mailto configuration.

## Open Product Questions and Assumptions

No blocker-level product questions remain for a conservative implementation if refinement accepts the assumptions above. The following must be resolved or explicitly documented during refinement:

- Confirm the owner-approved pilot contact inbox. Default assumption: `hello@hushvoting.com`.
- Confirm whether an approved overview asset exists for `Download overview`. If not, choose a safe interim target and document it.
- Confirm whether utility page placeholder wording requires counsel/privacy/security owner review before public deployment.
- Confirm whether footer should link `HushNetwork` to the broader HushNetwork website; not required for FEAT-007 acceptance.

## UX Risks

| Risk                                                         | Mitigation                                                                             |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Mailto destination or body copy changes after implementation | Define constants first and make tests assert constants rather than duplicated strings. |
| Utility pages imply final legal/security approval            | Use explicit pending-review copy and avoid legalese that reads like finalized policy.  |
| Download CTA becomes a broken link                           | Resolve overview target during refinement; do not use `#` silently.                    |
| White-border visual regression from prototype copy-paste     | Use tonal fills, spacing, radius, and glow; add no-`border-white` tests.               |
| Footer link typography drifts                                | Assert label-sm font family/size/uppercase styling in static tests or E2E.             |
| Homepage route becomes implementation-heavy                  | Keep route as composition only; place components and constants in landing modules.     |
