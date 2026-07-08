# FEAT-006 Lessons Learned

**Feature:** FEAT-006 — Protocol Evidence and Platform Readiness
**Epic:** EPIC-001 — HushVoting Website Platform and Initial Design
**Date:** 2026-07-08

## Summary

FEAT-006 resolved the Sovereign Shield CSS loading gap then implemented Protocol Evidence and Platform Readiness homepage sections with typed constants, three new components, scoped tests, and E2E Gherkin coverage. Key lessons emerged around TanStack Start CSS injection patterns, streaming SSR timing, serialized pnpm command execution, and the continued importance of format-check adherence across all MemoryBank docs.

## Lessons

### Lesson 1: TanStack Start CSS Import Placement for SSR `<link>` Injection

**Failure pattern:** CSS imported in a route-level file (`src/routes/index.tsx`) via `import "../../styles/app.css"` does not produce a `<link rel="stylesheet">` tag in the server-rendered HTML `<head>`. The CSS is built and served at `/assets/index-*.css`, but the framework integration point is missing for route-scoped imports. This caused all Sovereign Shield CSS custom properties and Tailwind utility classes to be inert at runtime.

**Root cause:** In TanStack Start (React Router framework mode), CSS imported inside a route component or module does not inject a `<link>` into the SSR document `<head>`. The stylesheet must be imported in the root layout (`__root.tsx`) or included via a framework `links` API on the root route configuration.

**Successful fix:** Moved the `import "../../styles/app.css"` statement from `src/routes/index.tsx` to `src/routes/__root.tsx`. After the move, the SSR manifest includes the CSS asset, and the browser receives the correct `<link rel="stylesheet">` tag.

**Prevention rule:** In TanStack Start / React Router framework mode, all global CSS imports that must appear as `<link>` tags in SSR output must be placed in `__root.tsx` (the root layout), not in route-level files. Route-level imports only work for CSS module patterns, not global stylesheet injection. When setting up a new TanStack Start project, verify CSS injection in production SSR output (not just dev HMR) before assuming styles work.

**Apply to:** All FEATs modifying CSS imports or adding stylesheets in TanStack Start projects.

---

### Lesson 2: Streaming SSR Timing — Agent-Based Verification Needs Adequate Wait

**Failure pattern:** Initial agent-based curl tests against the production SSR server (`pnpm start`) returned empty or partial HTML because the response streams progressively. A production SSR server using Nitro + TanStack Start takes ~5 seconds to fully stream all page content including deferred/suspense boundaries.

**Root cause:** TanStack Start uses progressive streaming SSR. HTTP response headers are sent immediately, but the full HTML content (including sections rendered after suspense boundaries) arrives over a stream. A quick curl that reads until EOF without waiting for the stream to finish gets truncated output.

**Successful fix:** When verifying SSR output in agent context, either:

1. Use `curl --max-time 10 --retry 3` with adequate timeout (≥5s), or
2. Use the build output manifest (`.output/nitro.json`, SSR route tree) to verify structural correctness, or
3. Verify CSS runtime behavior via the SSR build manifest rather than streaming HTML.

**Prevention rule:** When verifying TanStack Start SSR output in agent/automation context, do not rely on fast curl reads. Use build-manifest inspection for structural verification, or set `curl --max-time 10` for full-stream capture. Document the expected streaming delay in verification scripts.

**Apply to:** Any FEAT that needs to verify SSR output in agent or CI context.

---

### Lesson 3: Format Check — MemoryBank Documentation Drifts Across Phase Boundaries

**Failure pattern:** Multiple MemoryBank documentation files (.md) had formatting drift detected by `prettier --check` during complete-feature final validation. These included FEAT-006 phase files, design documents, planning reports, and stale prior-FEAT documents (FEAT-005 completion report, EPIC description, prior lessons learned).

**Root cause:** Phase implementations created or modified Markdown documentation without running `prettier --write` afterward. Each phase's formatting drift accumulated, resulting in 18 files failing format check at the final gate.

**Successful fix:** Ran `npx prettier --write` on all 18 non-auto-generated files that failed format check. This matches the pattern established in FEAT-002, FEAT-003, FEAT-004, and FEAT-005 lessons.

**Prevention rule:** Add `format:check` to each phase's required evidence checklist. Run `npx prettier --check` on changed files before completing each phase — not just at the complete-feature gate. When using `pnpm format --write`, target specific files or directories to avoid unintended changes to auto-generated files (like `src/routeTree.gen.ts`). Treat prior-FEAT stale docs with Boy Scout cleanup during format pass.

**Apply to:** All FEAT phases that create or modify MemoryBank documentation.

---

### Lesson 4: CSS Custom Properties with Inline Styles vs. Tailwind Utilities

**Observation:** `ProtocolEvidenceSection` uses inline `style={{ fontFamily: "var(--font-family-hanken)" }}` on multiple elements. This works for SSR but would benefit from Tailwind CSS v4 `font-[family-name]` utility once the TanStack Start / Tailwind v4 integration stabilizes. The existing project pattern (HeroSection, TrustModelSection) already uses this inline-style approach, so consistency across sections is maintained.

**Prevention rule:** When using CSS custom properties that reference theme tokens (like `--font-family-hanken`), prefer Tailwind v4 arbitrary value utilities (e.g., `font-[family-name]`) over inline `style={{}}` when the framework integration is stable enough. If inline styles are used for consistency with existing components, document this as a pattern decision.

**Apply to:** FEATs that render text with custom font family tokens from the Sovereign Shield design system.

---

### Lesson 5: Constants-First Pattern Continues to Prevent Copy Drift

**Observation:** Following the FEAT-005 lesson, FEAT-006 created typed content constants (`PROTOCOL_EVIDENCE_SECTION`, `PLATFORM_READINESS_SECTION`) in Phase 2 (Data Layer) before any component implementation began. This ensured all six evidence items, three deployment cards, and five claim badges used exact labels and icons from the approved content contract. Components and tests consumed the same constant references, preventing copy drift across phases.

**Successful pattern:** Create typed static constants immediately after refinement approves the content contract, before component implementation begins. Verify the constants once against the refinement source of truth, then all downstream work references the same typed constant.

**Prevention rule:** For static-content features, create typed constants in a dedicated Data Layer phase before Presentation Logic phase. Include constants contract tests (counts, order, exact labels, icons) in the same phase. This prevents copy drift and ensures tests fail fast when content changes.

**Apply to:** Any FEAT with static copy content.

---

### Lesson 6: Code Review Deferred to Complete-Feature Is Acceptable With Structural Evidence

**Observation:** Phase 4 (Presentation Logic) code review was performed by the continue-implementation agent as a post-verification step. The review found no blocking issues and was recorded as APPROVED with only NOTE-level findings (font-family inline style pattern, uppercase via CSS class, claim boundary list semantics). These findings were accepted as consistent with existing project conventions.

**Prevention rule:** Deferred code review (performed after implementation, before complete-feature) is acceptable when:

1. The implementation phases include structural verification (typecheck, unit tests, component tests, no-white-border regression)
2. The code review is explicitly scoped and the findings are documented with severity (BLOCKER/REQUIRED/NOTE)
3. NOTE-level findings have documented dispositions (accepted/deferred/refactored)

**Apply to:** Any FEAT where code review is deferred from earlier phases to the final checkpoint.

## Operational Rules Summary

| Context               | Rule                                                                                  | Source   |
| --------------------- | ------------------------------------------------------------------------------------- | -------- |
| TanStack Start CSS    | Import global CSS in `__root.tsx`, not route-level files                              | Lesson 1 |
| SSR verification      | Use build-manifest inspection or `curl --max-time 10` for streaming SSR               | Lesson 2 |
| Format check          | Run `prettier --check` at each phase boundary, not just complete-feature              | Lesson 3 |
| CSS custom properties | Prefer Tailwind arbitrary-value utilities over inline styles when stable              | Lesson 4 |
| Static content        | Create typed constants before component implementation, in dedicated Data Layer phase | Lesson 5 |
| Code review           | Deferred review is acceptable with structural evidence and documented findings        | Lesson 6 |
