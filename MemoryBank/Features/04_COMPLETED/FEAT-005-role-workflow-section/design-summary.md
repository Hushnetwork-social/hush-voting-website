# Design Summary — FEAT-005 Role Workflow Section

**Feature:** FEAT-005 — Role Workflow Section  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Final Design Decisions

1. **Implement a static homepage section at `id="roles"`.**  
   This satisfies the existing `#roles` navigation target without changing Header or MobileNavDisclosure.

2. **Render exactly four informational role cards.**  
   The cards are Organizations, Voters, Trustees, and Auditors, in that order.

3. **Use Material Symbol icons decoratively.**  
   Icons are visual aids only and must be hidden from assistive technology with `aria-hidden="true"` because card titles already provide the accessible role names.

4. **Do not make cards interactive in FEAT-005.**  
   No links, click handlers, modals, expand/collapse behavior, backend state, or role-specific app routing.

5. **Prefer Sovereign Shield tonal surfaces over structural borders.**  
   Cards should use calm surface fills such as `surface-container-high`; hover emphasis, if any, should be subtle and non-essential.

6. **Keep the homepage route as composition only.**  
   Add a `RoleWorkflowSection` landing component and compose it after `TrustModelSection` in `src/routes/index.tsx`.

7. **Use the EPIC/FEAT copy contract over the prototype’s extended trustee sentence.**  
   The approved trustee description is: `Approve governed actions and manage distributed decryption keys.`

## Approved Role Card Contract

| Order | Role          | Icon             | Description                                                                                        |
| ----- | ------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| 1     | Organizations | `corporate_fare` | Create and govern election parameters, define voter rolls, and establish timing protocols.         |
| 2     | Voters        | `groups`         | Securely claim eligibility through private ID providers and cast cryptographically masked ballots. |
| 3     | Trustees      | `key`            | Approve governed actions and manage distributed decryption keys.                                   |
| 4     | Auditors      | `rule`           | Review protocol evidence and package integrity through the standalone verifier suite.              |

## Implementation Checklist for Refinement

- [ ] Create `RoleWorkflowSection` in `src/components/landing/`.
- [ ] Add role card data to `src/components/landing/constants.ts` or a local constant in the component.
- [ ] Compose `<RoleWorkflowSection />` after `<TrustModelSection />` in `src/routes/index.tsx`.
- [ ] Ensure the outer section has `id="roles"`.
- [ ] Add an accessible section heading, visible or visually hidden.
- [ ] Render exactly four role cards in the approved order.
- [ ] Mark all decorative Material Symbol icons `aria-hidden="true"`.
- [ ] Keep cards non-interactive and unfocusable.
- [ ] Use existing design-system tokens, spacing, and radius values.
- [ ] Avoid default white/bright card borders.
- [ ] Add unit tests for the section, all four cards, exact copy, and decorative icon accessibility.
- [ ] Run canonical validation scripts required by refinement/implementation, especially `pnpm test:unit` and any package-level build/typecheck commands requested by the FEAT plan.

## UI States Phase Planning Must Preserve

| State    | Required behavior                                                                               |
| -------- | ----------------------------------------------------------------------------------------------- |
| Default  | Four static cards render with complete approved copy.                                           |
| Mobile   | Cards stack in one column with readable `body-md` descriptions.                                 |
| Tablet   | Cards render in a two-column grid.                                                              |
| Desktop  | Cards render in a four-column grid when width permits.                                          |
| Hover    | Optional tonal lift only; no hidden content or required behavior.                               |
| Keyboard | Cards are skipped because they are informational; surrounding links keep normal focus behavior. |
| Loading  | No FEAT-specific loading state; static SSR content.                                             |
| Empty    | Not applicable; missing role data should fail tests.                                            |
| Error    | No FEAT-specific network/data error; route-level boundaries remain responsible.                 |
| Disabled | Not applicable; cards are not actions.                                                          |

## Accessibility Requirements

- Use a semantic section boundary.
- Preserve the `#roles` fragment target.
- Provide an accessible section name via heading.
- Keep DOM order aligned with visual order.
- Use visible text for role titles and descriptions.
- Hide decorative icons from assistive technology.
- Do not rely on hover to communicate content.
- Do not add focusable elements unless cards become real links in a future FEAT.

## Responsive Requirements

- One-column mobile stack.
- Two-column tablet grid.
- Four-column desktop grid.
- Section spacing should align with FEAT-004: `spacing-xl` desktop vertical rhythm, `spacing-lg` mobile vertical rhythm, and standard page gutters.
- Card spacing should allow descriptions to wrap naturally without truncation.

## Risks and Mitigations

| Risk                                                           | Mitigation                                                                                     |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Visual drift into outline-heavy cards                          | Use surface fills first; reserve borders for state or very subtle hover accent only.           |
| Scope creep into app workflow                                  | Keep cards static and non-interactive; future role explainers require a separate FEAT.         |
| Copy drift from approved source                                | Centralize role data and assert exact copy in tests.                                           |
| Abrupt section start because prototype lacks a visible heading | Include at least a semantic heading; refinement may choose a compact visible header if needed. |
| Accessibility noise from icons                                 | Mark all card icons `aria-hidden="true"`.                                                      |

## Assumptions

- FEAT-003 already provides the `#roles` navigation link.
- FEAT-004 already establishes section spacing patterns and the homepage composition approach.
- FEAT-008 will perform broader cross-section responsive optimization, but FEAT-005 must still be responsive on its own.
- The public website explains role responsibilities only; authenticated execution lives in the separate HushVoting app client.

## Out of Scope

- Backend APIs or persistence.
- Authentication or authorization.
- Role-specific user journeys.
- Card navigation, modal dialogs, or deep links.
- Navigation restructuring.
- Dynamic content management.
- Protocol evidence, platform readiness, footer, legal pages, or contact paths.

## Ready for Refinement

FEAT-005 has sufficient design detail for `refine-feature`. No blocker-level product questions remain. Refinement should convert this design into implementation tasks and tests without creating phase work for backend, navigation rewrites, or authenticated workflows.
