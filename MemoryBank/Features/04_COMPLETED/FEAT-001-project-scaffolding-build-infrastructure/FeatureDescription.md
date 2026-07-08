# FEAT-001: Project Scaffolding & Build Infrastructure

**Feature ID**: FEAT-001
**Parent Epic**: EPIC-001
**Status**: Completed

## Summary

Initialize a TanStack Start RC project scaffold with pnpm, Tailwind CSS configured with Sovereign Shield design tokens, TypeScript strict mode, ESLint/Prettier, and package.json scripts (`dev`, `build`, `start`, `test:unit`, `test:e2e:happy-path`). Set up directory structure, README conventions, and the initial Gherkin-driven Playwright E2E acceptance test foundation. During implementation, select the current TanStack Start RC, pin the exact resolved version, commit the lockfile, and document concrete React Router v7 fallback triggers.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.

## Hepha Deep-Dive Decisions

- FEAT-001 uses the **Full scaffold readiness contract** acceptance criteria set.
- The scaffold must prove install, development, production build, production start, unit test, and happy-path E2E script readiness.
- Gherkin-based Playwright E2E acceptance tests must be established from the start of the project.
- FEAT-001 is limited to foundational build and tooling infrastructure.
- Product pages, CI/CD deployment, authentication, persistence, and production hosting are explicitly out of scope for this feature.
- The TanStack Start RC version must be selected during implementation as the current available RC, pinned to an exact version, recorded in `package.json`, and preserved through the committed lockfile.
- The README must document the exact pinned TanStack Start RC version and concrete React Router v7 fallback triggers.
- The minimum Sovereign Shield token baseline is core Tailwind theme tokens for color, radius, spacing, and typography, plus visible smoke usage in the scaffolded page.
- Long-running readiness checks must use bounded automated smoke checks: scripted startup, browser reachability verification, and automatic teardown for development and production server validation.

## Scope

FEAT-001 establishes the project foundation required for later feature refinement, design implementation, and application development.

Included:

- TanStack Start RC application scaffold.
- pnpm-based dependency and script workflow.
- Committed pnpm lockfile.
- Strict TypeScript configuration.
- ESLint and Prettier configuration.
- Tailwind CSS setup with Sovereign Shield design tokens.
- Minimal tokenized scaffold page proving Tailwind and Sovereign Shield token usage.
- Initial directory structure and README conventions.
- Unit test command wiring.
- Gherkin-driven Playwright E2E happy-path acceptance test wiring.
- Pinned TanStack Start RC dependency version.
- Documented React Router v7 fallback criteria.
- Bounded smoke validation for dev server and production start readiness.

Excluded:

- Product page implementation.
- CI/CD pipeline deployment.
- Authentication.
- Persistence or database integration.
- Production hosting configuration.
- Complete application navigation or domain workflows beyond scaffold validation.

## Acceptance Criteria

### Project Scaffold

- A TanStack Start RC project is initialized and committed with a clear, maintainable directory structure.
- The project uses `pnpm` as the package manager.
- `package.json` declares pnpm as the required package manager where supported.
- The pnpm lockfile is committed.
- The TanStack Start RC dependency is pinned to a specific exact RC version rather than a floating range.
- The exact pinned TanStack Start RC version is documented in the README.
- The scaffold includes README documentation describing:
  - local setup;
  - required package manager;
  - available scripts;
  - project structure conventions;
  - testing conventions;
  - linting and formatting conventions;
  - pinned TanStack Start RC version;
  - React Router v7 fallback criteria.

### Build and Runtime Scripts

The root `package.json` includes and supports the following scripts:

- `dev`
- `build`
- `start`
- `test:unit`
- `test:e2e:happy-path`

The scaffold may include additional helper scripts such as linting, formatting, type checking, or smoke-test internals, but the scripts above are required.

The scaffold is considered ready only when:

- `pnpm install` completes successfully;
- `pnpm dev` starts the development server;
- `pnpm build` produces a production build;
- `pnpm start` starts the built application;
- `pnpm test:unit` executes successfully;
- `pnpm test:e2e:happy-path` executes the initial happy-path E2E acceptance test successfully.

### TypeScript, Linting, and Formatting

- TypeScript strict mode is enabled.
- The scaffold compiles without TypeScript errors.
- ESLint is configured for the TypeScript/React project.
- Prettier is configured for consistent formatting.
- Linting and formatting conventions are documented in the README.

### Tailwind and Design Tokens

- Tailwind CSS is installed and configured.
- Sovereign Shield design tokens are represented in the Tailwind/theme configuration.
- The minimum token baseline includes:
  - core color tokens;
  - radius tokens;
  - spacing tokens;
  - typography tokens.
- The initial scaffold includes visible styling usage that proves Tailwind and the Sovereign Shield token configuration are active.
- The token smoke usage remains minimal and must not become product page implementation.

### Gherkin E2E Acceptance Testing

- Playwright is configured for E2E testing.
- A Gherkin-based acceptance test structure is established from the start.
- The initial happy-path acceptance scenario validates that the scaffolded app can be served and reached by a browser.
- The happy-path scenario validates the visible scaffold shell and enough tokenized UI to prove the design token smoke usage is rendered.
- The `test:e2e:happy-path` script runs the Gherkin/Playwright happy-path acceptance test.
- The E2E setup is documented so future features can add acceptance scenarios consistently.

### Bounded Smoke Validation

Long-running scaffold readiness checks must be automated without becoming brittle.

- Development server validation uses scripted startup, browser reachability checks, and automatic teardown.
- Production start validation uses scripted startup after `pnpm build`, browser reachability checks, and automatic teardown.
- Startup checks use bounded timeouts rather than unbounded manual waits.
- Tests validate reachability and scaffold readiness, not implementation details that would make later feature work fragile.
- The happy-path E2E flow may own the browser reachability checks when it cleanly covers the required dev or production server startup path.

### React Router v7 Fallback Criteria

The README documents fallback criteria for replacing or deferring TanStack Start RC usage in favor of React Router v7 if the selected TanStack Start RC blocks foundational project readiness.

The default implementation path is TanStack Start RC. A fallback may be considered only if the pinned TanStack Start RC prevents one or more foundational requirements from working within the scaffold.

Concrete fallback triggers include:

- `pnpm dev` cannot reliably start the local development server within the bounded smoke-check timeout;
- `pnpm build` cannot produce a production build with the scaffolded configuration;
- `pnpm start` cannot reliably serve the built application within the bounded smoke-check timeout;
- the RC blocks a compatible TypeScript strict-mode setup without unreasonable workarounds;
- the RC forces routing conventions that are not maintainable for the planned website;
- the RC prevents stable Gherkin/Playwright happy-path execution;
- the RC requires fragile or undocumented workarounds for normal scaffold operation.

Any fallback decision must be documented before implementation changes are made. The documentation must state:

- the pinned TanStack Start RC version tested;
- the failing readiness requirement;
- the evidence from the bounded validation attempt;
- why React Router v7 is the safer fallback for the scaffold.

## Validation

FEAT-001 is validated as a foundational scaffold only.

Validation requires successful execution of the scaffold readiness contract:

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm test:unit`
- `pnpm test:e2e:happy-path`

Development and production server validation must be performed through bounded automated smoke checks with browser reachability verification and automatic teardown.

A successful FEAT-001 outcome proves that the project can be installed, developed, built, served, linted/formatted by convention, unit-tested, and acceptance-tested through the initial Gherkin Playwright happy path.
