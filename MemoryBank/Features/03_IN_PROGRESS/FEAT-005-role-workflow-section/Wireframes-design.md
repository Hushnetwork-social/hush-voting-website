# Wireframes Design — FEAT-005 Role Workflow Section

**Feature:** FEAT-005 — Role Workflow Section  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Design Intent

Create a calm, static homepage section that explains the four HushVoting participant roles without turning the public website into an authenticated product workflow. The section should feel like the natural continuation of the Trust Model Hierarchy section and should prepare visitors for Protocol Evidence and Platform sections that follow in later FEATs.

## Component Boundary

Recommended implementation boundary:

```text
src/components/landing/RoleWorkflowSection.tsx
src/components/landing/constants.ts       // add ROLE_WORKFLOW_SECTION data
src/routes/index.tsx                      // compose <RoleWorkflowSection /> after TrustModelSection
```

The homepage route should remain a thin composition layer. Role data, icon names, and copy should live in landing constants or a local static data array, not inline inside the route.

## Section Boundary

```tsx
<section
  id="roles"
  aria-labelledby="roles-heading"
  className="section-anchor ..."
>
  <h2 id="roles-heading" className="sr-only or compact visible heading">
    Election roles and workflows
  </h2>
  <div role="list" className="responsive role-card grid">
    ...four cards...
  </div>
</section>
```

### Heading decision

- Minimum: include an accessible heading for the section.
- Preferred if visual rhythm allows: compact visible header above the grid.
- If matching the prototype exactly is prioritized: use a visually hidden heading and render the four cards directly.

Recommended visible header copy, if used:

- Eyebrow: `Role Workflow`
- Heading: `Four roles, one protocol-bound election flow.`
- Description: `HushVoting separates election governance, private participation, trustee safeguards, and audit review into clear responsibilities.`

The visible header is not required by the FEAT acceptance criteria, so refinement may choose the visually hidden heading path to stay closer to the prototype.

## Desktop Wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  [optional compact header]                                                  │
│  ROLE WORKFLOW                                                              │
│  Four roles, one protocol-bound election flow.                              │
│  HushVoting separates election governance, private participation, trustee   │
│  safeguards, and audit review into clear responsibilities.                  │
│                                                                            │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│  │ [corporate_fare]   │ │ [groups]           │ │ [key]              │ │ [rule]             │
│  │ Organizations      │ │ Voters             │ │ Trustees           │ │ Auditors           │
│  │                    │ │                    │ │                    │ │                    │
│  │ Create and govern  │ │ Securely claim     │ │ Approve governed   │ │ Review protocol    │
│  │ election           │ │ eligibility        │ │ actions and manage │ │ evidence and       │
│  │ parameters, define │ │ through private ID │ │ distributed        │ │ package integrity  │
│  │ voter rolls, and   │ │ providers and cast │ │ decryption keys.   │ │ through the        │
│  │ establish timing   │ │ cryptographically  │ │                    │ │ standalone         │
│  │ protocols.         │ │ masked ballots.    │ │                    │ │ verifier suite.    │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘ └────────────────────┘
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Desktop layout rules

- Container: max width `var(--spacing-max-width-content)`.
- Horizontal padding: `var(--spacing-gutter)`.
- Vertical padding: `var(--spacing-xl)`.
- Grid: `grid-cols-4` at large desktop widths.
- Gap: `var(--spacing-gutter)` or `var(--spacing-md)` depending on final card width.
- Card surface: `surface-container-high` or equivalent tonal Card composition.
- Avoid bright default borders. If a border-like accent is needed, use low-opacity primary on hover/focus only.

## Tablet Wireframe

```text
┌──────────────────────────────────────────────┐
│ [optional compact header]                     │
│ Four roles, one protocol-bound election flow. │
│                                               │
│ ┌────────────────────┐ ┌────────────────────┐ │
│ │ Organizations      │ │ Voters             │ │
│ │ icon + copy        │ │ icon + copy        │ │
│ └────────────────────┘ └────────────────────┘ │
│ ┌────────────────────┐ ┌────────────────────┐ │
│ │ Trustees           │ │ Auditors           │ │
│ │ icon + copy        │ │ icon + copy        │ │
│ └────────────────────┘ └────────────────────┘ │
└──────────────────────────────────────────────┘
```

### Tablet layout rules

- Grid: two columns.
- Keep card order row-major: Organizations, Voters, Trustees, Auditors.
- Do not collapse role descriptions into summaries; all text remains visible.

## Mobile Wireframe

```text
┌──────────────────────────┐
│ [optional compact header] │
│ Four roles, one protocol- │
│ bound election flow.      │
│                           │
│ ┌──────────────────────┐  │
│ │ [corporate_fare]     │  │
│ │ Organizations        │  │
│ │ Create and govern... │  │
│ └──────────────────────┘  │
│ ┌──────────────────────┐  │
│ │ [groups]             │  │
│ │ Voters               │  │
│ │ Securely claim...    │  │
│ └──────────────────────┘  │
│ ┌──────────────────────┐  │
│ │ [key]                │  │
│ │ Trustees             │  │
│ │ Approve governed...  │  │
│ └──────────────────────┘  │
│ ┌──────────────────────┐  │
│ │ [rule]               │  │
│ │ Auditors             │  │
│ │ Review protocol...   │  │
│ └──────────────────────┘  │
└──────────────────────────┘
```

### Mobile layout rules

- Grid: one column.
- Padding: `var(--spacing-margin-mobile)` horizontal and `var(--spacing-lg)` vertical.
- Maintain body text at `body-md`.
- Icons should remain decorative and not dominate card height.
- No hover-only affordances.

## Card Anatomy

```text
┌──────────────────────────────┐
│ Material Symbol icon          │ decorative, aria-hidden="true"
│                               │
│ Role title                    │ headline-md / Hanken Grotesk
│                               │
│ Role description              │ body-md / on-surface-variant
└──────────────────────────────┘
```

### Card field contract

| Field         | Requirement                                                             |
| ------------- | ----------------------------------------------------------------------- |
| Icon          | Material Symbol, decorative, `aria-hidden="true"`.                      |
| Title         | Visible text; one of the four approved role titles.                     |
| Description   | Approved copy from FEAT/EPIC source of truth.                           |
| Role in tests | Tests should assert all four titles and descriptions render.            |
| Interactivity | None in FEAT-005. Do not add links, buttons, modals, or click handlers. |

## Visual Styling Guidance

### Recommended classes/patterns

- Section shell: match FEAT-004 spacing and `section-anchor` usage.
- Card fill: `bg-surface-container-high` or `Card` with a slightly lifted tone.
- Icon color: `text-primary`.
- Title color: `text-on-surface`.
- Description color: `text-on-surface-variant`.
- Radius: `rounded-[var(--radius-lg)]` or existing Card radius if reused.
- Internal padding: `var(--spacing-md)` on desktop/tablet, `var(--spacing-sm)` acceptable on tight mobile if needed.

### Border policy

Do not use white/bright outlines as default card structure. If hover emphasis is needed, prefer one of:

1. Tonal lift: `hover:bg-surface-container-highest`.
2. Soft primary wash: a low-opacity primary background layer.
3. Very subtle outline only as a hover accent, not as the default layout separator.

Because cards are non-interactive, hover treatment should be optional and decorative.

## Interaction Behavior

### Section navigation

- Existing `href="#roles"` navigation should scroll to this section once implemented.
- No changes to Header or MobileNavDisclosure are required.
- Use the same `section-anchor` offset pattern as FEAT-004 so fixed navigation does not cover the section start.

### Card behavior

- Cards are informational.
- No click, no expand/collapse, no modal.
- No keyboard focus target for cards.
- If future refinement turns cards into links, use native `<a>` elements and update tests/accessibility expectations.

## State Sketches

### Default

```text
All four cards render with complete copy.
```

### Hover-capable pointer

```text
Pointer enters card → optional tonal lift only.
Pointer leaves card → card returns to default tonal surface.
No content changes.
```

### Keyboard navigation

```text
Tab order skips cards because they are not interactive.
Navigation links before/after the section retain their normal focus behavior.
```

### Reduced motion

```text
If hover transitions are used, they should be brief and non-essential.
No motion is required for understanding.
```

### Error fallback

```text
No FEAT-specific error UI.
If route rendering fails, existing route-level error boundary owns recovery.
```

## Testing Expectations for Refinement

Unit tests should verify:

- The homepage renders a section with `id="roles"`.
- Four role cards are rendered.
- The four approved role titles render exactly.
- The four approved descriptions render exactly.
- Icons are decorative, e.g. Material Symbol spans have `aria-hidden="true"` or equivalent.
- The section can be located semantically by its accessible heading if a visible or screen-reader heading is implemented.

Implementation can expose stable test selectors if needed, but prefer user-facing text queries first.

## Out-of-Scope Wireframe Items

Do not add these in FEAT-005:

- Role-specific landing pages.
- Card links or deep-link routing.
- Authenticated application workflow entry.
- Backend role state.
- Dynamic CMS-driven role content.
- Navigation rewrite or new mobile nav behavior.
