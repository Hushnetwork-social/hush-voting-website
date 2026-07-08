# FEAT-005 Lessons Learned

**Feature:** FEAT-005 — Role Workflow Section
**Epic:** EPIC-001 — HushVoting Website Platform and Initial Design
**Date:** 2026-07-08

## Summary

FEAT-005 implemented a static, responsive Role Workflow homepage section with four role cards (Organizations, Voters, Trustees, Auditors). The implementation was smooth with no blocking issues. Key lessons emerged around copy contract alignment between FeatureTasks.md constants and final tests, and the continued successful application of prior FEAT lessons about tonal surfaces and fragment-only anchors.

## Lessons

### Lesson 1: FeatureTasks.md Copy Must Match Final Constants Contract

**Observation:** The FeatureTasks.md Content Contract table and the `ROLE_WORKFLOW_SECTION` constant in `constants.ts` were created from the same refinement source (planning-analysis-report.md, design-summary.md). They matched at creation time and remained consistent through all phases. This contrasts with FEAT-004 where the FeatureDescription.md diverged from refinement.

**Successful pattern:** When the planning-analysis-report.md and design-summary.md define the copy contract and the FeatureTasks.md references it without duplicating the full copy table, there is only one source of truth. In FEAT-005, all documents (planning-analysis-report.md, design-summary.md, FeatureTasks.md, constants.ts) aligned because constants were created directly from the refinement documents before any implementation drift.

**Prevention rule:** For static-content features, create the constants (typed static data objects) immediately after refinement approves the content contract, before component implementation begins. Verify the constants once against the refinement source of truth, then all downstream work (component rendering, tests) references the same typed constant. This prevents copy drift across phases.

**Apply to:** Any FEAT with static copy content, especially FEAT-006, FEAT-007, FEAT-008.

---

### Lesson 2: Barrel Export Pattern for New Landing Components

**Observation:** Adding `RoleWorkflowSection` to the `src/components/landing/index.ts` barrel followed the exact same pattern as FEAT-004's `TrustModelSection`. The barrel already existed and the import was straightforward.

**Successful pattern:** The barrel export pattern (`export { RoleWorkflowSection } from "./RoleWorkflowSection"`) is maintained with each new landing component. This keeps the homepage route import clean and consistent: `import { Header, HeroSection, TrustModelSection, RoleWorkflowSection } from "~/components/landing/"`.

**Prevention rule:** Always add new landing components to the existing barrel export file (`src/components/landing/index.ts`) using the same pattern as prior components. Include both the component and its Props type export. Do not create separate barrel files per feature.

**Apply to:** FEAT-006 (ProtocolEvidenceSection), FEAT-007 (FooterSection, FinalCtaSection), and any future landing page component.

---

### Lesson 3: Static Section Test Pattern Maturation

**Observation:** The 18 new tests for `RoleWorkflowSection` followed the exact pattern established by FEAT-004's `TrustModelSection` tests. This meant zero custom test infrastructure was needed — the same patterns for section landmark assertions, heading level checks, aria-hidden verification, and non-interactivity checks applied directly.

**Successful pattern:** When a new section follows the same component architecture (deterministic static render with semantic heading, decorative icons, non-interactive cards), the test pattern is fully reusable. The only new assertions were for exact role card count and order (h3 heading arrays) and constants contract tests for exact approved copy.

**Prevention rule:** When adding tests for a new static landing section that follows the established component architecture pattern, copy the existing test `describe` block structure and modify only:
- The section `id` query and expected value
- The heading level (h2 for section, h3 for sub-elements)
- The constant reference (TRUST_SECTION → ROLE_WORKFLOW_SECTION)
- Any count assertions (2 trust cards → 4 role cards)
- Add constants contract tests for exact approved copy

**Apply to:** FEAT-006, FEAT-007, FEAT-008, and any future landing page component test additions.

---

### Lesson 4: E2E Gherkin Test Files for Downstream FEATs Already Present

**Observation:** Untracked E2E test files already existed in the working tree (`tests/e2e/features/footer-section.feature`, `protocol-evidence-section.feature`, `responsive-layout.feature`, `visual-language-baseline.feature` and their `.spec.ts` counterparts) from a previous implementation session. These files belong to upcoming FEATs (FEAT-006, FEAT-007, FEAT-008) and were not created by FEAT-005.

**Prevention rule:** When encountering untracked files from downstream FEATs during complete-feature, leave them in place. Do not commit them as part of the current FEAT unless explicitly part of the FEAT scope. Document their presence in the completion report as pre-existing untracked state.

**Apply to:** All complete-feature runs where prior sessions may have left behind future-FEAT artifacts.

---

### Lesson 5: Prior Lessons Applied Correctly

**Observation:** All prior FEAT lessons that applied to FEAT-005 were successfully followed without incident:
- FEAT-002 Lesson 4: Tonal surfaces (bg-surface-container-high) instead of white borders — ✅
- FEAT-003 Lesson 5: Fragment-only hrefs for planned sections — `#roles` anchor works automatically from FEAT-003 nav — ✅
- FEAT-004 Lesson 4: Fragment anchor matching — section `id="roles"` matches existing `#roles` nav link — ✅
- FEAT-004 Lesson 1: FeatureDescription.md Content Contract kept in sync — ✅ (verified before finalization)

**Prevention rule:** Before starting implementation of a new FEAT, review all previous FEAT lessons learned and create a checklist of applicable prevention rules. Apply them as executable constraints, not historical notes. This practice ensures continuous improvement across FEAT boundaries.

**Apply to:** FEAT-006, FEAT-007, FEAT-008, and all future FEATs in this and other projects.

## Operational Rules Summary

| Context | Rule | Source |
|---------|------|--------|
| Static copy contracts | Create typed constants immediately after refinement, verify once, then all downstream work references the same constants | Lesson 1 |
| Barrel exports | Always add new landing components to the existing `src/components/landing/index.ts` barrel | Lesson 2 |
| Test patterns | Copy existing static-section test pattern, modify only section-specific assertions and constants references | Lesson 3 |
| Downstream untracked files | Do not commit downstream FEAT artifacts with current FEAT; document in completion report | Lesson 4 |
| Prior lessons as constraints | Review all prior FEAT lessons before starting a new FEAT; apply as executable prevention rules | Lesson 5 |
