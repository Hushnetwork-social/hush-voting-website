# Planning Analysis Report — FEAT-005: Role Workflow Section

**Date:** 2026-07-08
**Branch:** `feat/FEAT-005-role-workflow-section`
**Source:** `FeatureDescription.md`, `FeatureTasks.md`, `design-summary.md`, `UX-research-report.md`, `Wireframes-design.md`

## 1. Content Contract

### Section Header

| Field | Value |
|-------|-------|
| Eyebrow | `Role Workflow` |
| Heading (h2) | `Four roles, one protocol-bound election flow.` |
| Description | `HushVoting separates election governance, private participation, trustee safeguards, and audit review into clear responsibilities.` |

### Role Cards (exact order)

| # | Role | Icon | Description |
|---|------|------|-------------|
| 1 | Organizations | `corporate_fare` | Create and govern election parameters, define voter rolls, and establish timing protocols. |
| 2 | Voters | `groups` | Securely claim eligibility through private ID providers and cast cryptographically masked ballots. |
| 3 | Trustees | `key` | Approve governed actions and manage distributed decryption keys. |
| 4 | Auditors | `rule` | Review protocol evidence and package integrity through the standalone verifier suite. |

## 2. Target Files

### New Files
- `src/components/landing/RoleWorkflowSection.tsx` — Presentation component

### Modified Files
- `src/components/landing/constants.ts` — Add role workflow static data
- `src/components/landing/index.ts` — Barrel export for `RoleWorkflowSection` and types/constants
- `src/routes/index.tsx` — Compose `<RoleWorkflowSection />` after `<TrustModelSection />`
- `tests/unit/landing.test.tsx` — Add role workflow tests

### Documentation
- `planning-analysis-report.md` (this file) — Planning artifact
- Phase files (0-8) — Evidence and status updates

## 3. Accessibility Model

- Section: `<section id="roles" aria-labelledby="roles-heading">`
- Heading relationship: `<h2 id="roles-heading">` provides the accessible name
- Decorative icons: All Material Symbol spans use `aria-hidden="true"`; no redundant `aria-label`
- Cards: Non-interactive `<div>` or `<li>` elements — no `button`, `a`, `tabindex`, or click handlers
- DOM order: Organizations, Voters, Trustees, Auditors — matching visual order
- Focus: Only surrounding navigation links get focus; role cards are skipped
- Text contrast: Titles use `on-surface`, descriptions use `on-surface-variant`, icons use `primary` or related token
- Hover: Optional subtle tonal lift only; no hover-dependent content

## 4. Responsive Strategy

| Viewport | Layout | Grid Classes |
|----------|--------|-------------|
| Mobile (< 640px) | 1 column | `grid-cols-1` |
| Tablet (640px - 1023px) | 2 columns | `grid-cols-2` |
| Desktop (1024px+) | 4 columns | `grid-cols-4` |

Use existing section spacing:
- Vertical padding: `py-[var(--spacing-xl)]` desktop, `py-[var(--spacing-lg)]` mobile
- Horizontal gutters: `px-[var(--spacing-gutter)]` desktop, `px-[var(--spacing-margin-mobile)]` mobile
- Max width: `max-w-[var(--spacing-max-width-content)]`
- Cards equal-height within rows where practical; descriptions wrap naturally

## 5. Component Architecture

```
src/components/landing/RoleWorkflowSection.tsx
  ├── <section id="roles" aria-labelledby="roles-heading">
  │   ├── Section header (eyebrow, h2 heading, description)
  │   │   Pattern: same as TrustModelSection header
  │   └── Role card grid (CSS grid)
  │       ├── Card (for each role)
  │       │   ├── Material Symbol icon (decorative, aria-hidden)
  │       │   ├── Role title (visible text)
  │       │   └── Role description (visible text)
```

### Data flow
- Static constants defined in `src/components/landing/constants.ts`
- Component imports data directly — no props, no state, no hooks
- Icons rendered as `<span class="material-symbols-outlined" aria-hidden="true">{icon}</span>`

## 6. Test Strategy

### Test File
- `tests/unit/landing.test.tsx` — Add a `describe("RoleWorkflowSection", ...)` block

### Assertions
| Assertion | Type |
|-----------|------|
| Section renders with `id="roles"` | Render query |
| Section heading is `h2` with approved text | `getByRole("heading", { level: 2 })` |
| Eyebrow renders | `getByText` |
| Section description renders | `getByText` |
| Exactly 4 role titles render | `getAllByRole("heading", { level: 3 })` or text queries |
| Each approved role title renders | `getByText` |
| Each approved role description renders | `getByText` |
| Exactly 4 role descriptions render | Text queries |
| Card icons have `aria-hidden="true"` | `querySelectorAll('[aria-hidden="true"]')` |
| No buttons, links, or focusable elements in section | `querySelectorAll('button, a, [tabindex]')` |
| Decorative icons do not have `aria-label` | Check icon spans lack aria-label |

### Validation Labels Required
- `typecheck` — `pnpm typecheck` or `tsc --noEmit`
- `component-render-tests` — `pnpm test:unit` (specific test file)
- `ui-tests` — Manual browser check or defer to component coverage (see Phase 5/6)
- `build` — `pnpm build`
- `format-check` — `pnpm format:check`
- `accessibility-review` — Manual + axe-core or similar
- `responsive-review` — Manual viewport checks
- `code-review` — Persisted review report under `code-reviews/`

## 7. Implementation Order and Boundaries

| Phase | Scope | Output |
|-------|-------|--------|
| 0 | Health check | Repository and artifact inspection |
| 1 | Planning | This report |
| 2 | Data layer | Static constants in `constants.ts` |
| 3 | Business logic | Confirmation-only — no behavioral code changes |
| 4 | Presentation logic | `RoleWorkflowSection.tsx` with semantics + barrel export |
| 5 | UI styling | Tailwind classes, responsive grid, tonal surfaces, icon styling |
| 6 | Integration | Compose in `index.tsx` |
| 7 | Testing | Add/run tests, format, run validation |
| 8 | Final checkpoint | Audit traceability, evidence completeness |

## 8. Lessons Learned Applied

| Lesson | Application |
|--------|-------------|
| FEAT-004 L1 (copy contract staleness) | FeatureDescription.md already audited and updated to In Progress; copy in this report is the single source of truth |
| FEAT-004 L4 (fragment anchor) | No navigation changes needed — `#roles` already in `NAV_LINKS` from FEAT-003 |
| FEAT-004 L5 (decorative icons) | All card icons marked `aria-hidden="true"` — visible title text conveys meaning |
| FEAT-002 (tonal surfaces over borders) | Cards use `surface-container-high` or similar fills; no default bright outlines |

## 9. Risks

- **Copy drift:** Centralized constants + exact-copy tests prevent undetected changes
- **Scope creep:** Phase 3 explicitly confirms no behavioral logic; cards remain informational
- **ESLint gap:** Known pre-existing validation issue; record exact evidence but do not block on it
- **Responsive consistency:** FEAT-005 must be independently responsive; FEAT-008 will polish later

## 10. Update Policy

If any later phase changes a contract that future phases consume (copy, icon names, component API, responsive strategy, test strategy), that phase **must** update this report to reflect the new reality before marking its phase complete.
