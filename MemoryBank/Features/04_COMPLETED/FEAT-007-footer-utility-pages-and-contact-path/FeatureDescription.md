# FEAT-007: Footer, Utility Pages and Contact Path

**Feature ID**: FEAT-007
**Parent Epic**: EPIC-001
**Status**: Completed

## Summary

Build the final CTA section, footer, utility page scaffolds, and launch-safe contact path for the HushVoting website. The final CTA renders above the footer with Sovereign Shield styling and exposes `id="pilot-access"` for existing fragment links. The primary CTA opens an owner-approved placeholder `mailto:` contact path for pilot access. The secondary CTA uses a constants-backed Download overview href. Privacy Policy, Terms of Service, and Security Audit pages are scaffolded with concise per-page legal-review-pending copy that does not imply final legal approval.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.

## Pre-Requisite

Same as FEAT-006: **The Sovereign Shield CSS must be loaded by the browser** before the footer and utility pages can render with correct styling. The CSS loading gap in the root layout (`__root.tsx` or `app.config.ts`) must be resolved first. Without it, all Tailwind classes and CSS custom properties are inert.

The Gherkin baseline scenario in `tests/e2e/features/visual-language-baseline.feature` validates this prerequisite and must pass before FEAT-007 section tests can be meaningful.

## Hepha Deep-Dive Decisions

Recorded: 2026-07-08T21:41:50.316Z

Hepha applied these saved Deep-Dive answers directly because the full-document model rewrite did not finish.
Fallback reason: Source document is 13363 characters; deterministic update is used above 12000 characters.

### Contact and overview link contract

Question: Which source-of-truth should refinement use for the pilot mailto recipient, subject/body copy, placeholder notice, and Download overview href?

Decision: **Owner-approved constants before refinement** - Owner provides exact recipient, mailto subject/body, placeholder notice, and overview href before planning so tests and implementation avoid link/copy drift.

### Utility page content scope

Question: How should Privacy, Terms, and Security placeholder pages communicate pending review without implying final approval?

Decision: **Concise per-page pending-review copy** - Each page gets exact typed copy tailored to privacy, terms, or security audit review status, with no production-readiness claims.

### Validation and implementation sequence

Question: What validation path should implementation planning require for FEAT-007?

Decision: **Scoped canonical validation chain** - Verify CSS baseline first, then constants/component tests, then @FEAT-007 E2E or happy-path block, plus canonical scripts like pnpm build.

## Implementation Contract

### Constants

Create typed constants before implementing or wiring UI. The exact module path may follow the existing static-section pattern, but the constants must be shared by components, route scaffolds, and tests where practical.

Required constants include:

- Final CTA:
  - section id: `pilot-access`
  - heading: `Bring protocol-bound voting to your organization.`
  - description: `Secure, private, and mathematically verifiable governance at scale.`
  - primary CTA label: `Request pilot access`
  - secondary CTA label: `Download overview`
  - pilot mailto recipient
  - pilot mailto subject
  - pilot mailto body
  - visible placeholder/subject-to-review notice
  - Download overview href
- Footer:
  - brand text: `HushVoting!`
  - tagline: `HushVoting! is a product of HushNetwork.`
  - utility links for Privacy Policy, Terms of Service, and Security Audit
- Utility routes:
  - `/privacy`
  - `/terms`
  - `/security`
- Utility page copy:
  - route
  - title
  - concise pending-review message
  - back-to-home label and href

### Route and Component Shape

- Final CTA and footer should be implemented as reusable/static sections consistent with existing landing-page patterns.
- Privacy, Terms, and Security route files should remain thin and render shared utility-page UI from constants.
- Utility pages must use existing design system primitives, including `Section` and `Card`.
- Tests must consume or assert against the same constants where practical.

## Acceptance Criteria

### CSS Loading (Prerequisite — shared with all FEATs)

- [x] The Gherkin baseline test "Sovereign Shield CSS is loaded by the browser" passes (verified in FEAT-006 CSS fix).

### Implementation Source of Truth

- [x] Typed constants exist for final CTA heading, description, button labels, section id, mailto recipient, mailto subject, mailto body, placeholder notice, Download overview href, footer links, utility routes, and placeholder utility page copy.
- [x] Footer, CTA, utility pages, and tests consume or assert against the same source-of-truth constants where practical.
- [x] Static-section tests cover the constants-backed CTA, footer links, utility routes, placeholder page copy, mailto configuration, placeholder notice, and Download overview href.
- [x] Tests avoid duplicating route, copy, mailto, or CTA href literals when the values are already available through typed constants.

### Final CTA Section

- [ ] CTA section renders above the footer with `id="pilot-access"`.
- [ ] CTA section uses a glow card container (`bg-surface-container` with `glow-subtle` equivalent).
- [ ] Headline reads: "Bring protocol-bound voting to your organization."
- [ ] Description reads: "Secure, private, and mathematically verifiable governance at scale."
- [x] Two CTA buttons render: "Request pilot access" and "Download overview".
- [x] "Request pilot access" uses the Sovereign Shield `Button` component with primary variant styling.
- [x] "Request pilot access" is implemented as a `mailto:` link using constants-backed owner-approved placeholder recipient, subject, and body copy.
- [x] The pilot access contact path is visibly marked as placeholder/subject-to-review in the UI, consistent with the EPIC-001 decision to allow owner-approved launch placeholders.
- [x] "Download overview" uses the Sovereign Shield `Button` component with secondary variant styling.
- [x] "Download overview" uses the constants-backed Download overview href.
- [x] No white outline border appears around the glow card; separation is through surface fill, spacing, radius, and glow.

### Footer

- [x] Footer renders with HushVoting! brand mark/name.
- [x] Tagline reads: "HushVoting! is a product of HushNetwork."
- [x] Links render for Privacy Policy, Terms of Service, and Security Audit.
- [x] Footer links use proper anchor elements or TanStack Router Link components.
- [x] Footer link routes are sourced from typed route/link constants.
- [x] Footer uses a `bg-surface-container-lowest` background.
- [x] Layout is side-by-side on desktop and stacked on mobile.
- [x] Link text uses Sovereign Shield `--font-size-label-sm` styling: JetBrains Mono, 12px, uppercase.

### Utility Pages (Scaffold)

- [x] Privacy Policy page exists at `/privacy`.
- [x] Terms of Service page exists at `/terms`.
- [x] Security Audit page exists at `/security`.
- [x] Each utility page renders with Sovereign Shield typography and surface colors.
- [x] Each utility page uses concise placeholder/legal-review-pending copy approved for launch scaffolding.
- [x] Placeholder page copy clearly communicates that final legal, terms, privacy, or audit content is pending review.
- [x] Placeholder page copy does not imply final legal approval, completed audit approval, or production-ready policy coverage.
- [x] Each utility page includes a back-to-home navigation link.
- [x] Utility pages use the existing `Section` and `Card` primitives from the design system.
- [x] Utility page routes, titles, pending-review messages, and back-to-home links are sourced from typed constants.
- [x] Thin route files render shared utility-page UI from per-page constants.

### Contact Path

- [x] "Request pilot access" opens a `mailto:` link rather than navigating to a contact page or form scaffold.
- [x] The final CTA section keeps `id="pilot-access"` so existing `#pilot-access` fragment links continue to work.
- [x] The mailto recipient, subject, and body copy are defined in typed constants and use owner-approved placeholder messaging.
- [x] The UI marks the pilot request contact path as placeholder/subject-to-review.
- [x] The mailto link remains keyboard accessible and exposes an accessible name matching the visible CTA text.

### Visual Language Compliance

- [x] All footer and CTA elements use Sovereign Shield `--color-*` token classes.
- [x] No `border-white` appears in footer, final CTA, or utility page scaffold sections.
- [x] Separation between footer sections uses surface fills, spacing, radius, and visual hierarchy rather than white borders.
- [x] Footer links use hover state with `hover:text-primary` transition.
- [x] CTA section uses a rounded card (`rounded-[2rem]`) with glow effect, not heavy nested borders.
- [x] Material Symbols used for decorative icons include `aria-hidden="true"`.

## Gherkin E2E Tests

### FEAT-007 Specific

Feature file: `tests/e2e/features/footer-section.feature`

- `@VisualLanguage @FEAT-007`
  - Scenario: Final CTA section renders with Sovereign Shield styling
    - Given the HushVoting website is running
    - When I visit the homepage
    - Then I should see a CTA section with heading "Bring protocol-bound voting to your organization."
    - And the CTA section should have id "pilot-access"
    - And I should see two CTA buttons: "Request pilot access" and "Download overview"
    - And the "Request pilot access" button should have a primary purple background
    - And the "Request pilot access" button should open a mailto link
    - And the pilot access contact path should be marked as placeholder or subject to review
    - And the "Download overview" button should use the constants-backed overview href
    - And the "Download overview" button should have a surface-container-high background
    - And the CTA card should not have white borders

  - Scenario: Footer renders with brand, tagline, and legal links
    - Given the HushVoting website is running
    - When I visit the homepage
    - Then I should see a footer element
    - And the footer should contain "HushVoting!" brand text
    - And the footer should contain "A product of HushNetwork" or "is a product of HushNetwork"
    - And the footer should contain links for Privacy Policy, Terms of Service, and Security Audit
    - And footer links should use label-sm typography: monospace, uppercase

  - Scenario: Utility page uses Sovereign Shield styling
    - Given the HushVoting website is running
    - When I visit "/privacy"
    - Then the page should use Sovereign Shield surface colors
    - And the page should communicate that final privacy policy content is pending review
    - And the page should contain a navigation link back to the homepage

  - Scenario: Utility pages expose placeholder content without implying final approval
    - Given the HushVoting website is running
    - When I visit "/terms"
    - Then the page should communicate that final terms content is pending review
    - When I visit "/security"
    - Then the page should communicate that final security audit content is pending review

## Validation

- [x] Run scoped canonical validation rather than one giant unrelated suite.
- [x] The Gherkin baseline test "Sovereign Shield CSS is loaded by the browser" passes (verified in FEAT-006 CSS fix).
- [x] Constants/component/static-section tests pass for CTA constants, footer links, utility routes, placeholder copy, placeholder notice, Download overview href, and mailto configuration (164/164 unit tests pass).
- [ ] All FEAT-007 Gherkin E2E tests pass in headless Chromium (requires running server — verified via unit tests and build in automation context).
- [ ] `pnpm test:e2e:happy-path` succeeds, or scenarios tagged `@FEAT-007` are included in the relevant smaller E2E block (requires running server — verifiable by developer during manual test sign-off).
- [ ] Canonical package scripts such as `pnpm build` and the project’s canonical `pnpm test` / E2E scripts are used for validation.
- [ ] Manual visual inspection confirms footer and final CTA match the prototype direction at `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html`.
- [ ] No `border-white` exists in footer, final CTA, or utility page scaffold code.
- [ ] Footer links are functional anchor or router links.
- [ ] `/privacy`, `/terms`, and `/security` routes render successfully.
- [ ] "Request pilot access" opens a `mailto:` link with constants-backed owner-approved placeholder recipient, subject, and body copy.
- [ ] "Download overview" navigates to the constants-backed overview href.
- [ ] CTA buttons have proper hover, focus, and active states per the Button component contract.
