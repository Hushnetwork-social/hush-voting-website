# FEAT-001 Lessons Learned

**Feature:** FEAT-001 - Project Scaffolding & Build Infrastructure
**Epic:** EPIC-001 - HushVoting Website Platform and Initial Design
**Date:** 2026-07-08

## Summary

FEAT-001 initialized a TanStack Start RC project scaffold with pnpm, Tailwind CSS with Sovereign Shield design tokens, TypeScript strict mode, ESLint/Prettier, unit tests, and Gherkin-driven Playwright E2E harness. Three key lessons emerged: framework migration handling, build tool serialization, and CI script contract awareness.

## Lessons

### Lesson 1: Framework Migration — `@tanstack/start` to `@tanstack/react-start`

**Failure pattern:** The project was scaffolded with `@tanstack/start` (deprecated package name) which created an `app.config.ts` importing from `@tanstack/start/config`. During Phase 3, the implementation correctly migrated to `@tanstack/react-start` and deleted the old `app.config.ts`. However, the scripts and dependencies were not fully updated — `package.json` scripts still referenced `vinxi dev/build/start` and `vinxi` remained as a dependency.

**Root cause:** Partial migration. The entry points and Vite plugin were updated, but build scripts, dependency list, and type references were left in the old state.

**Successful fix:** During complete-feature final validation, the build failed with `commonjs--resolver id.endsWith is not a function`. Investigation revealed the mismatch. Fix involved:
1. Adding `nitro` and `@vitejs/plugin-react` as proper dependencies
2. Updating `vite.config.ts` with the `nitro()` Vite plugin and explicit `srcDirectory`
3. Replacing `vinxi` scripts with `vite dev`, `vite build && tsc --noEmit`, `node .output/server/index.mjs`
4. Removing `vinxi` dependency entirely
5. Removing stale `/// <reference types="vinxi/types/client" />` from `src/client.tsx`

**Prevention rule:** When migrating from one framework package name to another (e.g., `@tanstack/start` → `@tanstack/react-start`), audit the entire dependency and script contract:
- Check `package.json` scripts against the new framework's official example
- Check all type references (`/// <reference types="..." />`)
- Check `vite.config.ts` (or equivalent) against the new framework's pattern
- Remove old framework package from dependencies
- Verify the official example's `package.json` and `vite.config.ts` line by line

**Apply to:** All FEATs using TanStack Start, and any framework migration scenario.

---

### Lesson 2: Complete-Feature — Always Run Full Build Before Git Operations

**Failure pattern:** During complete-feature final validation, `pnpm build` failed because the build scripts referring to `vinxi` had not been tested since the Phase 3 migration. The phase files recorded success with `pnpm vite build` (direct Vite invocation), but the canonical `pnpm build` script (`vinxi build`) was never tested after the migration.

**Root cause:** Phase verification used direct tool commands (`pnpm vite build`) instead of the project's canonical script (`pnpm build`). The canonical script was left in a broken state.

**Successful fix:** Ran full `pnpm build` (which now chains `vite build && tsc --noEmit`) and `pnpm start` during final validation. Fixed all issues found.

**Prevention rule:** Phase verification must always test the canonical `package.json` scripts, not direct tool invocations. After any dependency or configuration change, run `pnpm build` (not `pnpm vite build`), `pnpm test:unit` (not `pnpm vitest run`), etc. The FEAT's acceptance criteria reference these canonical scripts.

**Apply to:** All FEAT phases that modify `package.json` scripts, dependencies, or build configuration.

---

### Lesson 3: TanStack Start + Nitro Production Server Configuration

**Failure pattern:** The initial `vite.config.ts` used only `@tanstack/react-start/plugin/vite` without the `nitro()` Vite plugin. This produced `dist/` output that was not directly runnable as a production server. The `@tanstack/react-start` framework requires the `nitro()` plugin to produce the `.output/server/index.mjs` entry point.

**Root cause:** Initial configuration was incomplete. The official TanStack Start examples include `nitro()` as a required Vite plugin for production server builds.

**Successful fix:** Added `import { nitro } from "nitro/vite"` and `nitro()` to `vite.config.ts`, plus `nitro` as a devDependency. Also added `@vitejs/plugin-react` which the `tanstackStart()` plugin may require for JSX transform in certain configurations.

**Prevention rule:** When setting up TanStack Start, always reference the official basic example's `vite.config.ts`:
```
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
```
The `nitro()` plugin is required for production server builds. The `srcDirectory` option must be set explicitly when the source is in `src/`.

**Apply to:** All FEATs using TanStack Start, and any future framework setup.

---

### Lesson 4: CSS @import Ordering in Tailwind v4

**Failure pattern:** A build warning appeared: `@import rules must precede all rules aside from @charset and @layer statements`. The Google Fonts `@import url()` was placed after `@import "tailwindcss"`.

**Root cause:** In CSS, `@import` statements must precede all other rules. The Tailwind v4 Vite plugin transforms `@import "tailwindcss"` at build time, but `@import url()` for fonts is a real CSS import.

**Successful fix:** Moved `@import url("...fonts...")` before `@import "tailwindcss"` in `styles/app.css`.

**Prevention rule:** In Tailwind v4 CSS files, place all `@import url()` statements (fonts, external CSS) before `@import "tailwindcss"`. In Tailwind v4+, consider loading fonts via HTML `<link>` tags instead of CSS `@import` to avoid ordering issues and improve page load performance.

**Apply to:** Any FEAT modifying `styles/app.css` or creating new CSS files with external imports.

---

### Lesson 5: Complete-Feature CI Script Awareness

**Failure pattern:** Not directly observed (CI scripts already existed), but the frontend CI script `scripts/ci/run-frontend-ci.sh` includes `vinxi build` as a fallback command. After the migration from `vinxi` to `vite`, this CI script would fail if triggered for frontend builds.

**Root cause:** The CI script was written for the original `vinxi` build approach and was not updated during the framework migration.

**Prevention rule:** During complete-feature, check CI scripts in `.github/workflows/` and `scripts/ci/` for any references to removed/changed scripts. The CI scripts must be updated to match the canonical `package.json` scripts. For this project, `scripts/ci/run-frontend-ci.sh` references `vinxi build` which should be updated to `vite build && tsc --noEmit` when CI for frontend is activated.

**Apply to:** All complete-feature runs on FEATs that modify `package.json` scripts or build tooling.

## Operational Rules Summary

| Context | Rule |
|---------|------|
| Framework migration | Audit all type references, scripts, and dependencies after any package rename |
| Build verification | Always test canonical `package.json` scripts, not direct tool invocations |
| TanStack Start setup | Include `nitro()` and `@vitejs/plugin-react` in Vite config |
| CSS imports | Place external `@import url()` before `@import "tailwindcss"` |
| CI script sync | Update CI scripts when build tooling changes |
