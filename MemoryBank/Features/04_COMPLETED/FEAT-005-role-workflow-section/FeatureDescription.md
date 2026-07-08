# FEAT-005: Role Workflow Section

**Feature ID**: FEAT-005
**Parent Epic**: EPIC-001
**Status**: Completed

## Summary

Create a static Role Workflow homepage section with four responsive role cards: Organizations, Voters, Trustees, and Auditors. Each card includes a decorative Material Symbol icon, title, and approved description copy using the site design-system surfaces.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.

## Hepha Deep-Dive Decisions

- FEAT-005 is confirmed as a narrow static landing-section feature.
- The Approved Role Card Contract in this document is frozen for refinement, design decisions, implementation planning, and tests.
- Implementation must use the exact order, role titles, Material Symbol icon names, and approved descriptions from the Approved Role Card Contract with no copy changes.
- The section must be rendered on the homepage at `id="roles"` and remain compatible with the existing `#roles` navigation target.
- The visual model is a tonal responsive role-card grid using surface-container fills, spacing, radius, decorative icons, and no default bright borders.
- The implementation pattern is one deterministic landing component composed in the thin homepage route.
- Existing homepage navigation remains unchanged.
- The feature includes no navigation rewrite, backend work, user-specific workflow logic, or dynamic data loading.
- Verification scope includes unit tests plus canonical package-script validation.
- Unit tests must cover the section id, card order, exact copy, decorative icons, and non-interactivity.

## Scope

Implement a responsive homepage Role Workflow section containing four static role cards in this order:

1. Organizations
2. Voters
3. Trustees
4. Auditors

Each role card must include:

- A decorative Material Symbol icon.
- A role title.
- The exact approved role description copy from the contract below.
- Styling based on existing design-system surfaces, spacing, radius, and responsive layout patterns.

## Approved Role Card Contract

| Order | Role          | Material Symbol Icon | Approved Description                                                                               |
| ----- | ------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| 1     | Organizations | `corporate_fare`     | Create and govern election parameters, define voter rolls, and establish timing protocols.         |
| 2     | Voters        | `groups`             | Securely claim eligibility through private ID providers and cast cryptographically masked ballots. |
| 3     | Trustees      | `key`                | Approve governed actions and manage distributed decryption keys.                                   |
| 4     | Auditors      | `rule`               | Review protocol evidence and package integrity through the standalone verifier suite.              |

## Implementation Boundary

- Create one deterministic landing section component for the Role Workflow content.
- Compose the section in the thin homepage route.
- Set the outer section target to `id="roles"`.
- Leave existing homepage navigation and `#roles` links unchanged.
- Keep cards informational, static, non-interactive, and unfocusable.
- Do not introduce backend calls, dynamic data loading, content management, or role-specific application logic.

## Visual Requirements

- Use the existing site design-system visual language.
- Prefer tonal surface fills such as surface-container variants over default bright borders.
- Use spacing, radius, typography, and responsive layout patterns consistent with existing landing-page sections.
- Do not stack visually heavy cards inside visually heavy containers.
- Use borders only if needed for subtle state or emphasis, not as the default layout separator.
- Decorative icons must support the card’s visual identity without becoming primary content.
- The section should feel like a cohesive static landing-page section rather than an interactive workflow launcher.

## Accessibility Requirements

- Use a semantic section boundary.
- Provide an accessible section name.
- Preserve DOM order: Organizations, Voters, Trustees, Auditors.
- Render role titles and descriptions as visible text.
- Mark Material Symbol icons as decorative, for example with `aria-hidden="true"`, so they do not create redundant screen-reader output.
- Do not add card links, buttons, click handlers, or keyboard focus targets in this feature.
- Do not rely on hover to reveal or communicate required content.

## Responsive Requirements

- Mobile: cards stack in a single column.
- Tablet: cards may render as a two-column grid.
- Desktop: cards may render as a four-column grid when width permits.
- Text must wrap naturally without truncating approved descriptions.
- The section must remain usable across supported viewport sizes.

## Test Requirements

Unit tests must verify:

- The homepage renders a Role Workflow section with `id="roles"`.
- The section contains exactly four role cards.
- The cards render in this DOM and visual order:
  1. Organizations
  2. Voters
  3. Trustees
  4. Auditors
- Each card renders the exact approved role title, Material Symbol icon name, and approved description copy from the Approved Role Card Contract.
- Material Symbol icons are decorative and do not create redundant accessible names or screen-reader output.
- Cards are non-interactive and do not render links, buttons, click handlers, or keyboard focus targets.

Canonical package-script validation must pass for the changed frontend package.

## Out of Scope

- Backend APIs or data persistence.
- Authentication, authorization, or role-specific application flows.
- Navigation restructuring.
- Dynamic role content management.
- Interactive card workflows, links, modals, expand/collapse behavior, or role-specific routing.
- User-specific workflow logic.
- Protocol evidence, footer, legal pages, contact flows, or broader responsive-site cleanup.

## Acceptance Criteria

- The homepage includes a section with `id="roles"`.
- The existing `#roles` navigation target links to the Role Workflow section without requiring navigation changes.
- The section renders exactly four role cards in this order:
  - Organizations
  - Voters
  - Trustees
  - Auditors
- Each card includes the approved Material Symbol icon, title, and exact approved description copy from the Approved Role Card Contract.
- Icons are implemented accessibly as decorative elements and do not create redundant screen-reader output.
- Cards are static informational content and are not interactive or focusable.
- The section uses existing design-system surfaces and visual language rather than ad-hoc styling.
- The default visual treatment uses tonal surfaces, spacing, and radius rather than bright outline separators.
- The layout is responsive across supported viewport sizes.
- The implementation avoids adding backend, dynamic data, user-specific logic, or navigation rewrite scope.
- Unit tests verify that the section and all four role cards render correctly.
- Unit tests verify the exact approved role description copy.
- Unit tests verify decorative icon accessibility behavior.
- Unit tests verify card non-interactivity.
- Canonical package-script validation passes for the changed frontend package.

## Validation

Proceed with FEAT-005 as a confirmed static Role Workflow homepage section linked by the existing `#roles` navigation, with no navigation rewrite or backend scope. The Approved Role Card Contract in this document is authoritative and frozen for refinement, design decisions, implementation planning, and tests.

## Implementation Summary

FEAT-005 implemented a static, responsive Role Workflow homepage section at `id="roles"` with four role cards (Organizations, Voters, Trustees, Auditors).

**Files Created:**

- `src/components/landing/RoleWorkflowSection.tsx` — Presentation component

**Files Modified:**

- `src/components/landing/constants.ts` — Added `RoleCard` interface and `ROLE_WORKFLOW_SECTION` constant
- `src/components/landing/index.ts` — Added barrel exports
- `src/routes/index.tsx` — Composed `<RoleWorkflowSection />` after `<TrustModelSection />`
- `tests/unit/landing.test.tsx` — Added 18 tests

**Final Validation:**

- `pnpm format:check` — PASS
- `pnpm typecheck` — PASS
- `pnpm test:unit` — 88/88 PASS
- `pnpm build` — PASS
