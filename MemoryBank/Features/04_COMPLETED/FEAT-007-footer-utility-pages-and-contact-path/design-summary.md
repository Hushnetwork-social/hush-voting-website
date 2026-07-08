# Design Summary — FEAT-007 Footer, Utility Pages and Contact Path

**Feature:** FEAT-007 — Footer, Utility Pages and Contact Path  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Final Design Decisions

1. **FEAT-007 owns the final `#pilot-access` anchor.**  
   Render a homepage final CTA section above the footer with `id="pilot-access"` so existing hero/nav fragment links resolve to a real section.

2. **Use a mailto contact path, not a contact form.**  
   The primary CTA is a native anchor with visible text `Request pilot access` and a constants-generated `mailto:` href. This avoids introducing an unowned backend or form workflow.

3. **Make launch-placeholder status visible.**  
   The final CTA must visibly state that pilot access requests currently open an email draft while onboarding is reviewed. The utility pages must visibly state that final review is pending.

4. **Use typed constants before components.**  
   Add typed constants for final CTA copy, section id, mailto config, download overview behavior, footer links, utility routes, and utility page copy before implementing components. Components and tests should consume the same constants.

5. **Footer is document-level chrome; final CTA is main content.**  
   Compose `<FinalCtaSection />` inside `<main>` after `PlatformReadinessSection`. Render `<Footer />` after `</main>` as a semantic footer landmark.

6. **Utility pages are scaffold pages, not final policy documents.**  
   Create `/privacy`, `/terms`, and `/security` with concise legal/security-review-pending copy. Do not imply final approval, completed audit certification, or finalized terms.

7. **Use existing Sovereign Shield primitives.**  
   Final CTA should use Button visual variants for links. Utility pages should use existing `Section` and `Card` primitives. Footer should use tokenized typography and surface colors.

8. **Avoid white structural borders.**  
   CTA, footer, and utility pages use surface fills, spacing, radius, and glow for separation. Do not use `border-white`.

9. **Resolve the `Download overview` target during refinement.**  
   The button must render as required, but no approved downloadable asset is identified in the source docs. Refinement must choose an approved static asset, owner-provided URL, or documented safe interim behavior before implementation.

10. **Preserve CSS loading as a shared prerequisite.**  
    FEAT-007 visual validation assumes the FEAT-006 stylesheet injection fix remains in place. If Sovereign Shield CSS is not loaded, stop and fix that before validating this feature.

## Approved Content Contract

### Final CTA section

| Field            | Value                                                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| Section id       | `pilot-access`                                                                      |
| Heading          | `Bring protocol-bound voting to your organization.`                                 |
| Description      | `Secure, private, and mathematically verifiable governance at scale.`               |
| Primary CTA      | `Request pilot access`                                                              |
| Secondary CTA    | `Download overview`                                                                 |
| Placeholder note | `Pilot access requests currently open an email draft while onboarding is reviewed.` |

### Pilot access mailto

| Field   | Value                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------ |
| To      | `hello@hushvoting.com` unless the owner supplies a different approved inbox during refinement          |
| Subject | `HushVoting pilot access request`                                                                      |
| Body    | Include greeting, request for next review steps, and fields for Organization, Name, Role, and Use case |

### Footer

| Field           | Value                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------- |
| Brand           | `HushVoting!`                                                                                |
| Tagline         | `HushVoting! is a product of HushNetwork.`                                                   |
| Background      | `bg-surface-container-lowest`                                                                |
| Links           | `Privacy Policy` → `/privacy`; `Terms of Service` → `/terms`; `Security Audit` → `/security` |
| Link typography | label-sm: JetBrains Mono, 12px, uppercase visual treatment                                   |

### Utility pages

| Route       | Title              | Status                                       | Required copy boundary                                                                                                          |
| ----------- | ------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/privacy`  | `Privacy Policy`   | `Launch placeholder — final review pending.` | Final privacy policy is pending legal/privacy review; scaffold does not represent finalized privacy approval.                   |
| `/terms`    | `Terms of Service` | `Launch placeholder — final review pending.` | Final terms are pending legal review; placeholder is not a finalized service agreement.                                         |
| `/security` | `Security Audit`   | `Launch placeholder — final review pending.` | Security-audit references are pending review; page does not represent completed audit certification or final security approval. |

## Implementation Checklist for Refinement

- [ ] Verify the Sovereign Shield CSS baseline still passes before FEAT-007 visual work.
- [ ] Add FEAT-007 constants for final CTA, mailto, overview CTA behavior, footer links, and utility pages.
- [ ] Confirm or replace the assumed pilot access inbox (`hello@hushvoting.com`) with an owner-approved value.
- [ ] Resolve the `Download overview` target; do not ship a broken `href="#"` download.
- [ ] Create `FinalCtaSection` in `src/components/landing/`.
- [ ] Create `Footer` in `src/components/landing/` or another clearly named layout/landing module.
- [ ] Add barrel exports for new landing components and constants.
- [ ] Compose `FinalCtaSection` after `PlatformReadinessSection` in `src/routes/index.tsx`.
- [ ] Compose `Footer` after the homepage `<main>`.
- [ ] Ensure `FinalCtaSection` renders `<section id="pilot-access">` with a real heading.
- [ ] Implement the primary CTA as a native anchor with `mailto:` href and Button primary styling.
- [ ] Implement the secondary CTA with Button secondary styling and a documented target/placeholder behavior.
- [ ] Render visible placeholder/subject-to-review copy near the CTA actions.
- [ ] Create `/privacy`, `/terms`, and `/security` TanStack route files.
- [ ] Use a shared utility page shell if practical to keep route copy and styling consistent.
- [ ] Add a visible `Back to home` or `Return home` link on each utility page.
- [ ] Use `Section` and `Card` primitives for utility page layout.
- [ ] Style footer links with label-sm typography and `hover:text-primary`.
- [ ] Ensure mobile CTA and footer links meet 48px touch target expectations where practical.
- [ ] Add unit/component tests for constants, CTA mailto generation, footer links, utility page copy, and no-white-border regression.
- [ ] Add or update focused FEAT-007 E2E coverage for final CTA, footer, and utility routes.

## UI States Phase Planning Must Preserve

| State            | Required behavior                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSS prerequisite | Browser-loaded Sovereign Shield CSS is required before visual acceptance.                                                                           |
| Homepage default | Final CTA appears above footer with correct copy, two CTAs, placeholder note, and `id="pilot-access"`.                                              |
| Contact path     | `Request pilot access` opens a mailto link and has accessible name matching visible text.                                                           |
| Footer default   | Footer displays brand, tagline, and three utility links with `bg-surface-container-lowest`.                                                         |
| Utility default  | Each utility route renders one clear page title, pending-review status, concise copy, and back-home link.                                           |
| Mobile           | CTA actions stack or remain comfortably tappable; footer stacks; utility pages use mobile gutters.                                                  |
| Desktop          | CTA actions align as a pair; footer brand/tagline and links sit side-by-side.                                                                       |
| Hover            | Footer links transition to primary; CTA hover states follow Button variants.                                                                        |
| Focus            | All links have visible primary focus treatment.                                                                                                     |
| Loading          | No FEAT-specific loading UI; static SSR content should be available without data fetches.                                                           |
| Empty            | Not applicable; missing constants should fail tests rather than render empty shells.                                                                |
| Disabled         | Primary contact and footer links are not disabled. Download overview behavior must be resolved, not silently disabled without documented rationale. |
| Error            | Utility routes must not 404; unknown routes remain handled by root not-found behavior.                                                              |

## Accessibility Requirements

- Final CTA uses a semantic section with `aria-labelledby`.
- Footer uses a semantic `<footer>` landmark.
- Footer links are real anchors or router links that render anchors.
- Primary CTA uses anchor semantics for `mailto:` navigation.
- Placeholder/legal-review-pending status is visible text.
- Utility pages use one `h1` each.
- Utility pages include a visible, keyboard-accessible back-home link.
- Decorative icons, if introduced, are `aria-hidden="true"` when paired with visible text.
- Do not add focusable wrappers around non-interactive cards/panels.
- Preserve logical tab order through CTA links, footer links, and utility page navigation.

## Responsive Requirements

- Use existing homepage `section-anchor` behavior for `#pilot-access` so fixed header does not hide the section.
- Use mobile-first stacking for CTA action rows and footer layout.
- Avoid horizontal overflow on long utility page copy.
- Keep legal/security placeholder pages in a readable column rather than full-width dense text.
- FEAT-008 can polish global responsiveness later, but FEAT-007 must pass baseline mobile usability independently.

## Risks and Mitigations

| Risk                                                        | Mitigation                                                                                         |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Pilot inbox is not approved                                 | Treat `hello@hushvoting.com` as an assumption to confirm during refinement; keep it in constants.  |
| Download overview has no asset                              | Resolve target before implementation; if no asset exists, choose documented safe interim behavior. |
| Placeholder pages read like final legal content             | Use explicit pending-review status and avoid finalized legal language.                             |
| Tests duplicate strings and drift                           | Import typed constants in tests wherever practical.                                                |
| Visual regression to outline-heavy prototype styling        | Prefer tonal surfaces, spacing, radius, and glow; add no-`border-white` assertions.                |
| Homepage route grows too large                              | Keep components in `src/components/landing/`; route only composes.                                 |
| Footer link accessible names break due to uppercase styling | Keep source labels title case; use CSS uppercase for visual treatment.                             |

## Assumptions

- The website is static/SSR for this feature and does not require new backend services.
- FEAT-006 completed the CSS loading prerequisite; if it regresses, FEAT-007 implementation must fix it first.
- The project will keep static landing content in `src/components/landing/constants.ts` unless refinement creates a clearer equivalent constants module.
- TanStack route files can be added for `/privacy`, `/terms`, and `/security` following the existing `createFileRoute` pattern.
- Placeholder content is acceptable for launch only because it is explicitly marked pending review.

## Out of Scope

- Contact form implementation.
- Backend APIs, CRM integration, email sending services, or spam protection.
- Final legal/privacy/terms authoring.
- Completed security audit reporting or certification claims.
- Authenticated app workflows.
- Election creation, voting, trustee approval, auditor review, or verifier execution.
- Broad FEAT-008 responsive optimization beyond FEAT-007 baseline usability.
- Creating `FeatureTasks.md`, phase files, or moving the FEAT to Ready To Develop.

## Ready for Refinement

FEAT-007 has sufficient UX and design detail for `refine-feature` with two refinement-time confirmations:

1. confirm the pilot access mailto inbox; and
2. resolve the `Download overview` target or document the safe interim behavior.

Neither requires redesigning the feature. They should be captured as explicit refinement tasks before implementation begins.
