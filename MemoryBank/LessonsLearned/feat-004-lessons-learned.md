# FEAT-004 Lessons Learned

**Feature:** FEAT-004 — Trust Model Hierarchy Section
**Epic:** EPIC-001 — HushVoting Website Platform and Initial Design
**Date:** 2026-07-08

## Summary

FEAT-004 implemented the static, responsive Trust Model Hierarchy section for the HushVoting! homepage. Key lessons emerged around copy contract staleness tracking across multiple refinement iterations, component size boundaries for static sections, and the importance of fixing formatting for stale docs from prior FEATs during complete-feature.

## Lessons

### Lesson 1: Copy Contract Staleness — FeatureDescription.md Can Diverge From Refinement

**Failure pattern:** The FeatureDescription.md `Content Contract` table and `Acceptance Criteria` section contained an earlier version of the copy (eyebrow: `Trust model hierarchy`, chips: `Remote elections`, `Governed participation`, `Verifiable outcomes`, etc.) that did not match the refined copy used in implementation (eyebrow: `Foundational Integrity`, chips: `Eligibility`, `Participation`, `Private Choice`, `Artifacts`). The implementation correctly followed the planning-analysis-report.md and UX-research-report.md which had been updated during refinement, but the FeatureDescription.md was never updated.

**Root cause:** The FeatureDescription.md is created during EPIC deep-dive / FEAT discovery and may contain a preliminary content contract. When refinement or subsequent Deep-Dive stages update the copy, the FeatureDescription.md may not be updated if the refinement planning creates separate documents (planning-analysis-report.md, FeatureTasks.md) that become the implementation source of truth. The FeatureDescription.md Content Contract table becomes stale.

**Successful fix:** Updated the FeatureDescription.md Content Contract table, Acceptance Criteria section, and status during complete-feature to match the implemented copy.

**Prevention rule:** Before the first implementation phase, audit the FeatureDescription.md Content Contract table against the refinement decisions in planning-analysis-report.md, FeatureTasks.md, or the latest Deep-Dive answers. If they diverge, update FeatureDescription.md to match the refinement source of truth before Phase 1 begins. This ensures that anyone reading FeatureDescription.md sees the same copy that tests assert and components render.

**Apply to:** All FEATs where a FeatureDescription.md Content Contract table exists and refinement later updated the copy contract.

---

### Lesson 2: Complete-Feature — Format Stale Files From Prior FEATs

**Failure pattern:** During complete-feature format-check, 6 files failed: the EPIC description document, prior FEAT completion reports (FEAT-002, FEAT-003), and prior lessons learned documents (feat-002, feat-003). These files were created or last edited by prior FEAT implementations and had formatting drift.

**Root cause:** Prior FEAT implementations may have completed without fixing formatting on all MemoryBank documents, or subsequent edits by later FEATs caused drift. The `pnpm format:check` runs across the entire project and catches all formatting issues regardless of which FEAT created them.

**Successful fix:** Ran `npx prettier --write` on the 5 non-auto-generated files that failed formatting. Auto-generated `src/routeTree.gen.ts` was excluded per prior lesson.

**Prevention rule:** During complete-feature final validation, when `pnpm format:check` reports failures, inspect whether the failures are:

- FEAT-owned files (must fix before completion)
- Prior-FEAT stale files (fix as Boy Scout cleanup)
- Auto-generated files (exclude from format check)

Fix all non-auto-generated files regardless of which FEAT created them. This keeps the project consistently formatted across FEAT boundaries.

**Apply to:** All complete-feature runs.

---

### Lesson 3: Static Section Component Size — 150 Lines Is Acceptable

**Observation:** The `TrustModelSection.tsx` component is ~150 lines. While this is not "thin" in the traditional sense, it is acceptable because:

- The component is fully deterministic (no state, no hooks, no effects, no data loading)
- It renders two cards, a connector, glow, and section header with clear comment separators
- The alternative (splitting into sub-components for what is essentially one render tree) would add abstraction overhead without meaningful reuse

**Prevention rule:** For static sections that render 2-3 sub-elements with a clear vertical hierarchy, a single component up to ~200 lines is acceptable if it is:

- Fully deterministic (no `useState`, `useEffect`, `useReducer`, etc.)
- Clearly sectioned with comments
- Not duplicating any existing reusable pattern
- Exporting only via a barrel that consumers import

Future FEATs that notice duplication between sections (e.g., common card patterns) should extract shared sub-components at that point.

**Apply to:** Any FEAT creating static informational sections on the landing page.

---

### Lesson 4: Fragment Anchor for Trust Model — Already Linked From FEAT-003 Nav

**Observation:** The FEAT-003 navigation already included `#trust` as a fragment-only anchor pointing to this section. This meant FEAT-004 did not need to modify any navigation component — adding the `<section id="trust">` was sufficient to make the existing nav link functional.

**Successful pattern:** The FEAT-003 lesson about fragment-only hrefs for planned-but-not-implemented sections paid off: the FEAT-003 nav link to `#trust` worked automatically once FEAT-004 rendered the matching ID.

**Prevention rule:** When a downstream FEAT implements a section that is already linked via a fragment-only href from an upstream FEAT (e.g., navigation), ensure the section element has the exact matching `id` attribute. No navigation changes are needed — the existing link just works. Document this in the downstream FEAT's planning to avoid unnecessary nav modification work.

**Apply to:** FEAT-005 (Role Workflow → `#roles`), FEAT-006 (Protocol Evidence → `#protocol`), FEAT-007 (Footer → `#pilot-access`).

---

### Lesson 5: Capability Chip Icons — Decorative Because Text Is Present

**Observation:** Material Symbol icons on capability chips are marked `aria-hidden="true"` because each chip already has visible text that conveys the same information. This is the correct accessibility pattern for decorative icons with accompanying text labels.

**Prevention rule:** When a visual element (icon, glyph, symbol) accompanies visible text that fully conveys the meaning, mark the visual element as `aria-hidden="true"`. Do not add `aria-label` or screen-reader text to the icon — the visible text already serves that purpose. This applies to:

- Capability chip icons
- Trust labels (plain text, no icons needed)
- Any future icon+text combination where the text is unambiguous

**Apply to:** All FEATs adding icon+text visual elements to the landing page.

## Operational Rules Summary

| Context               | Rule                                                                                     | Source   |
| --------------------- | ---------------------------------------------------------------------------------------- | -------- |
| Copy contract         | Audit FeatureDescription.md Content Contract against refinement decisions before Phase 1 | Lesson 1 |
| Format check          | Fix formatting in all non-auto-generated files, including stale prior-FEAT docs          | Lesson 2 |
| Static component size | Up to ~200 lines is acceptable for fully deterministic, sectioned components             | Lesson 3 |
| Fragment anchor       | No navigation changes needed when upstream FEAT already linked the fragment              | Lesson 4 |
| Decorative icons      | Mark icons `aria-hidden="true"` when accompanied by visible text                         | Lesson 5 |
