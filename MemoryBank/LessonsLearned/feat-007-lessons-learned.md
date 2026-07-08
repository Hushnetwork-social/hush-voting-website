# FEAT-007 Lessons Learned

**Feature:** FEAT-007 — Footer, Utility Pages and Contact Path
**Epic:** EPIC-001 — HushVoting Website Platform and Initial Design
**Date:** 2026-07-08

## Summary

FEAT-007 completed the first public HushVoting website journey by adding the final conversion CTA, semantic footer, conservative utility page scaffolds, and a launch-safe pilot contact path. Key lessons emerged around constants-first patterns for footer/CTA content, shared utility page shell pattern for multi-route scaffolds, mailto href builder pattern, and the importance of E2E test file integration with pre-existing untracked test files.

## Lessons

### Lesson 1: Constants-First Continues to Prevent Copy Drift for Footer/CTA Content

**Observation:** Following the FEAT-005 and FEAT-006 lessons, FEAT-007 created typed content constants (`FINAL_CTA_SECTION`, `PILOT_ACCESS_MAILTO`, `DOWNLOAD_OVERVIEW_CTA`, `FOOTER`, `UTILITY_PAGES`) in Phase 2 (Data Layer) before any component implementation began. This ensured all CTA copy, mailto config, footer links, utility routes, and placeholder copy used exact values from the approved content contract. Components, routes, and tests all consumed the same constant references, preventing copy drift across phases.

**Successful pattern:** Create typed static constants immediately after refinement approves the content contract, before component implementation begins. For FEAT-007, this was especially valuable for the mailto configuration (recipient, subject, body), which is consumed by the CTA component, mailto helper, and constants contract tests.

**Prevention rule:** For static-content features including footer, CTA, and utility page copy, create typed constants in a dedicated Data Layer phase before Presentation Logic. Verify the constants once against the refinement source of truth, then all downstream work (component rendering, routes, tests) references the same typed constant.

**Apply to:** Any FEAT with static copy content, especially footer/CTA content or multi-page scaffold content.

---

### Lesson 2: Shared Utility Page Shell Reduces Route Boilerplate

**Observation:** The `UtilityPageShell` component (wrapping `Section` + `Card` primitives) allowed three utility routes (`/privacy`, `/terms`, `/security`) to be implemented as ~10-line route files that only pass a constants-backed config. This avoided duplicating layout, styling, and accessibility attributes across three route components.

**Successful pattern:** When multiple routes share the same layout and component structure but differ only in typed content, create a single shared shell component that accepts a typed config object. Route files become thin composition layers.

**Prevention rule:** For multi-route scaffold features (legal/security pages, documentation pages, status pages), create a shared shell component that renders the common layout from a typed config object. Each route file passes the appropriate config from constants. Do not create separate layout components per route.

**Apply to:** Any FEAT creating multiple routes with shared layout and styling but different typed content.

---

### Lesson 3: Pure Mailto Href Builder Is a Testable Abstraction

**Observation:** The `buildMailtoHref` pure function in `mailto.ts` encapsulates `mailto:` href construction using `encodeURIComponent` for subject and body. This function has 8 dedicated unit tests covering recipient inclusion, encoding, special characters, and constants integration. The function is consumed by `FinalCtaSection` to generate the primary CTA href.

**Successful pattern:** For URL construction that involves encoding, parameter ordering, or string concatenation with special characters, extract a pure function with dedicated tests. This isolates the encoding logic from the component and makes encoding correctness independently verifiable.

**Prevention rule:** When building URLs that involve query parameters and encoding (mailto links, tel links, SMS links, deep links), extract the URL construction into a pure function with its own test suite. Verify encoding correctness, parameter ordering, and edge cases (special characters, newlines, ampersands) at the unit level.

**Apply to:** Any FEAT that constructs URLs with encoded parameters, especially mailto, tel, or custom scheme links.

---

### Lesson 4: E2E Test Files for Downstream FEAT Continue to Accumulate

**Observation:** Untracked E2E test files for FEAT-008 (`tests/e2e/features/responsive-layout.feature`, `responsive-layout.spec.ts`) and the shared visual-language-baseline were present in the working tree from prior implementation sessions. FEAT-007 created its own E2E files (`footer-section.feature`, `footer-section.spec.ts`) as new untracked files.

**Prevention rule:** When encountering untracked files from downstream FEATs during complete-feature, leave them in place. Do not commit them as part of the current FEAT unless explicitly part of the FEAT scope. Track which files belong to which FEAT in the completion report's pre-existing untracked state section.

**Apply to:** All complete-feature runs where prior sessions may have left behind future-FEAT E2E artifacts.

---

### Lesson 5: CTA Sections with Both Navigation and Action Links Need Careful Semantics

**Observation:** The `FinalCtaSection` renders two CTA links — one is a `mailto:` href (action link) and one is a `#protocol` fragment link (navigation link). Both are implemented as native `<a>` elements styled with Button visual variants. This follows the FEAT-003 Lesson 6 pattern of using `<a>` for navigation and action links, reserving `<button>` for non-navigation actions.

**Successful pattern:** Mailto links are implemented as `<a href="mailto:...">` because they represent a resource (the user's email client) rather than a page-local action. The accessible name matches the visible text for both CTAs.

**Prevention rule:** When implementing CTAs that open external protocols (mailto, tel, sms), always use native `<a>` elements with `href` attributes, not `<button>` elements with JavaScript. This preserves right-click/Open in new tab behavior, keyboard semantics, and screen reader link identification. Style via class objects rather than wrapping in button components.

**Apply to:** Any FEAT implementing CTAs with mailto, tel, or external protocol links.

---

### Lesson 6: Fragment-Anchored CTA From Upstream FEAT Works Automatically

**Observation:** The FEAT-003 hero section already included a "Request pilot access" CTA linking to `#pilot-access` via `CTAS.pilotAccess.href = "#pilot-access"`. When FEAT-007 rendered `<section id="pilot-access">`, the existing hero link started working without any navigation changes. This follows the FEAT-004 Lesson 4 pattern.

**Successful pattern:** The upstream FEAT used fragment-only hrefs for planned-but-not-implemented sections. The downstream FEAT only needed to render the matching `id` attribute on the section element. No navigation component changes were required.

**Prevention rule:** When planning a downstream FEAT that implements a section already linked via a fragment-only href from an upstream FEAT, verify the section `id` matches the existing fragment target. Document this to avoid unnecessary navigation modification work.

**Apply to:** Any FEAT implementing a section targeted by existing fragment links.

---

### Lesson 7: Format Check Stale Files From Prior FEATs Persist

**Observation:** During complete-feature format check, 14 files needed formatting fixes. This included FEAT-007 phase documents, the EPIC description document, the FEAT-006 completion report, FEAT-006 lessons learned, FEAT-007 source files, and the unit test file. This matches the pattern observed in FEAT-004, FEAT-005, and FEAT-006 lessons.

**Successful fix:** Ran `npx prettier --write` on all 13 non-auto-generated files. Auto-generated `src/routeTree.gen.ts` was excluded per prior FEAT convention.

**Prevention rule:** During complete-feature final validation, when `pnpm format:check` reports failures, inspect whether the failures are:

- FEAT-owned files (must fix before completion)
- Prior-FEAT stale files (fix as Boy Scout cleanup)
- Auto-generated files (exclude from format check)

Fix all non-auto-generated files regardless of which FEAT created them. This keeps the project consistently formatted across FEAT boundaries.

**Apply to:** All complete-feature runs.

## Operational Rules Summary

| Context                | Rule                                                                             | Source   |
| ---------------------- | -------------------------------------------------------------------------------- | -------- |
| Static footer/CTA copy | Create typed constants in Data Layer phase before Presentation Logic             | Lesson 1 |
| Multi-route scaffolds  | Use shared shell component with typed config for each route                      | Lesson 2 |
| URL encoding           | Extract URL construction to pure function with dedicated tests                   | Lesson 3 |
| E2E test accumulation  | Leave downstream-FEAT E2E files untracked; document in completion report         | Lesson 4 |
| External protocol CTAs | Use native `<a>` for mailto/tel/sms links, not `<button>`                        | Lesson 5 |
| Fragment anchors       | Upstream fragment-only hrefs work automatically when matching `id` is rendered   | Lesson 6 |
| Format stale docs      | Fix all non-auto-generated format failures from any FEAT during complete-feature | Lesson 7 |
