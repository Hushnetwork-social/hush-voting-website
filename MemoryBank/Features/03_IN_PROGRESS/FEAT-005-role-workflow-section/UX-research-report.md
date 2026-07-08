# UX Research Report — FEAT-005 Role Workflow Section

**Feature:** FEAT-005 — Role Workflow Section  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Source Context

This design is based on:

- `FeatureDescription.md` for FEAT-005.
- `EPIC-001-hushvoting-website-platform/EpicDescription.md`.
- The high-fidelity prototype at `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html`.
- Sovereign Shield tokens and component guidance in `STYLEGUIDE.md` and `DESIGN.md`.
- HushVoting visual-language rules from the shared HushNetwork memory bank.
- Lessons learned from FEAT-002, FEAT-003, and FEAT-004.

## Target Users and Jobs

### Organization evaluators

**Who:** Governance leads, association officers, company administrators, and prospective pilot sponsors.  
**Job:** Quickly understand that HushVoting supports an organization-owned election setup without implying a full organization-management backend on this public site.

### Voters

**Who:** People invited to participate in a governed election.  
**Job:** Understand that eligibility claiming and ballot casting are private and protocol-bound, while authenticated voting remains outside this marketing site.

### Trustees

**Who:** People responsible for approving governed actions and managing distributed decryption-key responsibilities in the real product.  
**Job:** Understand that trustees are a distinct safeguard role, not ordinary administrators and not arbitrary ballot inspectors.

### Auditors

**Who:** Internal reviewers, compliance reviewers, designated auditors, and technical evaluators.  
**Job:** Understand that auditability is a first-class role supported by protocol evidence and standalone verifier materials.

## Primary Workflow and Entry Points

### Entry points

- Existing top navigation link: `#roles`.
- Scroll progression from FEAT-004 Trust Model Hierarchy into this role overview.
- Future links from body copy or CTAs may also target `#roles`, but FEAT-005 does not change navigation.

### Primary user workflow

1. Visitor lands on the homepage.
2. Visitor selects **Roles** in the existing navigation or scrolls below the Trust Model section.
3. Browser lands on the homepage section with `id="roles"`.
4. Visitor scans four role cards in this order:
   1. Organizations
   2. Voters
   3. Trustees
   4. Auditors
5. Visitor understands the product role model at a high level and can continue to Protocol Evidence or Platform sections when those sections are implemented.

## Content Contract

Use this copy as the implementation source of truth for FEAT-005.

| Role          | Decorative icon  | Description                                                                                        |
| ------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| Organizations | `corporate_fare` | Create and govern election parameters, define voter rolls, and establish timing protocols.         |
| Voters        | `groups`         | Securely claim eligibility through private ID providers and cast cryptographically masked ballots. |
| Trustees      | `key`            | Approve governed actions and manage distributed decryption keys.                                   |
| Auditors      | `rule`           | Review protocol evidence and package integrity through the standalone verifier suite.              |

**Copy decision:** The prototype includes a longer trustee sentence ending with “to finalize results without compromising secrecy.” For FEAT-005, use the shorter EPIC-approved wording above to avoid adding protocol claims beyond the current FeatureDescription/EPIC copy contract.

## States

### Default state

- Four static role cards are visible.
- Cards use Sovereign Shield surface tokens and calm tonal separation.
- Icons are visible but decorative.

### Hover state

- If a hover treatment is used, it must be subtle and decorative only.
- Recommended treatment: slight tonal lift or primary-tinted emphasis, not a bright default border around every card.
- No critical information may appear only on hover.

### Focus state

- Role cards are informational and non-interactive; they should not be focusable by default.
- If implementation later turns cards into links, they must become native `<a>` elements with visible focus rings and clear accessible names.

### Empty state

- No empty data state is needed. The section is static and must always render all four cards.
- If the role data array is accidentally empty in implementation, tests should fail rather than rendering an empty section.

### Loading state

- No FEAT-specific loading state is needed. The content is SSR/static and has no API dependency.
- Page-level shell loading behavior remains outside FEAT-005.

### Disabled state

- No disabled state is needed because the cards are non-interactive.
- Do not visually imply any role is unavailable or gated.

### Error state

- No FEAT-specific network or data error state is needed.
- Route-level error and not-found handling remain outside FEAT-005.

## Accessibility Considerations

- The section must expose `id="roles"` for the existing navigation target.
- Provide a semantic section boundary, preferably `<section id="roles" aria-labelledby="roles-heading">`.
- Include a section heading. If the visual design intentionally follows the prototype’s direct-card layout, the heading may be visually hidden but must remain accessible to assistive technology.
- Material Symbol icons are decorative and must use `aria-hidden="true"`.
- Do not add `aria-label` to decorative icons; the visible title and description already provide meaning.
- Cards are non-interactive and should not receive `tabIndex`.
- The DOM reading order must match the visual order: Organizations, Voters, Trustees, Auditors.
- Text contrast must follow Sovereign Shield dark-surface expectations: role titles in `on-surface`, descriptions in `on-surface-variant`, icons in `primary` or a related token.
- Layout must not depend on hover. Mobile and keyboard users should receive the same information.

## Responsive Expectations

- Mobile: one card per row.
- Tablet: two-column grid.
- Desktop: four-column grid when width permits.
- Use `max-width-content` and homepage section gutters consistent with FEAT-004.
- Cards should remain equal-height within rows where practical, but should not force cramped text.
- Preserve readable line lengths and avoid shrinking text below `body-md`.

## Product Assumptions

1. FEAT-005 is a static marketing/information section, not a workflow launcher.
2. The section does not authenticate users or route them into role-specific app flows.
3. The public website may explain roles without exposing election-specific permissions, rosters, trustee actions, or audit package data.
4. Existing fragment navigation already owns the `#roles` link; this FEAT only provides the target.
5. FEAT-008 will provide broader responsive polish, but FEAT-005 must still be responsive at implementation time.

## Open Product Questions

No blocker-level product questions remain for FEAT-005. Non-blocking follow-ups for future FEATs:

- Should future marketing pages link each role card to deeper role-specific explainers?
- Should the public website eventually distinguish “organization owner/admin” from broader “Organizations” wording?
- Should trustee copy become more explicit about “no arbitrary ballot inspection” on a later protocol explainer page?

## UX Risks

- **Overclaiming risk:** Role copy must stay high level and should not imply live authenticated workflows on this site.
- **Border-noise risk:** The prototype used subtle outlines; implementation must adapt to the current design-system rule of tonal separation first.
- **Discoverability risk:** The prototype has no obvious visible section title for roles. If the grid feels abrupt after Trust Model, refinement may choose a compact visible header, but a semantic heading is required either way.
- **Scope creep risk:** Do not add card links, modals, dynamic role data, backend calls, or navigation changes during FEAT-005 implementation.
