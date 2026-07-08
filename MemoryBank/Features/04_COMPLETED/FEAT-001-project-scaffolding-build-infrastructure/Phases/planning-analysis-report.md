# Planning Analysis Report - FEAT-001

**Feature:** FEAT-001 - Project Scaffolding & Build Infrastructure  
**Date:** 2026-07-08  
**Author:** pi (start-feature skill, autonomous mode)  
**Status:** ACTIVE — downstream phases must read and update this report when implementation reality changes a contract consumed by later phases.

---

## 1. Framework Version Strategy

### Selected Framework

**TanStack Start v1.120.20** (latest at time of planning)

Based on `MemoryBank/Overview/TechDecision-Framework-Selection.md`, TanStack Start (Release Candidate) is the approved framework with React Router v7 as a documented fallback.

### Package Versions (Pinned)

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/start` | `1.120.20` | Meta-framework entry point |
| `@tanstack/react-router` | compatible with start 1.120.20 | Type-safe routing |
| `@tanstack/react-router-with-query` | compatible | Router + Query integration (future) |
| `react` / `react-dom` | `^19.0.0` | UI library |
| `typescript` | `^5.7` | TypeScript compiler |
| `tailwindcss` | `^4` | Utility CSS framework |
| `postcss` | `^8` | CSS processing |
| `@tailwindcss/postcss` | compatible | Tailwind PostCSS plugin |
| `vitest` | `^3` | Unit test framework |
| `@playwright/test` | `^1.52` | E2E test framework |
| `eslint` | `^9` | Linting |
| `prettier` | `^3` | Formatting |

**Version freeze rule:** All versions above are frozen at the start of Phase 2 (Data Layer). If any dependency must change during implementation, the exact new version must be recorded here with the reason. The lockfile (`pnpm-lock.yaml`) is the authoritative record of resolved transitive dependencies.

### Fallback Decision Point

If the pinned `@tanstack/start@1.120.20` blocks any of these requirements:
1. `pnpm dev` cannot reliably start within a 60-second bounded smoke check
2. `pnpm build` cannot produce a production build
3. `pnpm start` cannot serve the built app
4. TypeScript strict mode cannot be configured without unreasonable workarounds
5. Routing conventions are not maintainable
6. Gherkin/Playwright happy-path E2E is blocked
7. Fragile or undocumented workarounds are required

…then **stop implementation** and document the blocker with exact evidence. Do not silently switch to React Router v7. The fallback escalation must be reviewed by the EPIC owner.

---

## 2. Directory Conventions

### Source Tree

```
hush-voting-website/
├── app/                          # Application source root
│   ├── routes/                   # TanStack Router file-based routes
│   │   ├── __root.tsx            # Root route (layout shell)
│   │   └── index.tsx             # Homepage route (scaffold validation)
│   ├── components/               # Reusable UI components (FEAT-002 will expand)
│   │   └── scaffold-brand.tsx    # Minimal brand logo for scaffold validation
│   ├── lib/                      # Utility functions and helpers
│   │   └── constants.ts          # Public site constants
│   ├── ssr.tsx                   # Server-side rendering entry
│   ├── client.tsx                # Client-side hydration entry
│   ├── router.tsx                # Router instance creation
│   └── routeTree.gen.ts          # Auto-generated route tree (framework)
├── public/                       # Static assets (images, fonts, etc.)
├── styles/                       # Global styles
│   └── app.css                   # Tailwind directives + global styles
├── tests/                        # Test files
│   ├── unit/                     # Unit tests (vitest)
│   │   └── scaffold.test.tsx     # Scaffold-level unit test
│   └── e2e/                      # E2E tests (Playwright + Gherkin)
│       ├── features/             # Gherkin .feature files
│       │   └── scaffold-happy-path.feature
│       ├── step-definitions/     # Playwright step definitions
│       │   └── scaffold-steps.ts
│       ├── fixtures/             # Test fixtures and helpers
│       │   └── scaffold-fixtures.ts
│       └── playwright.config.ts  # Playwright configuration
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json            # Node TypeScript configuration (if needed)
├── vite.config.ts                # Vite configuration
├── app.config.ts                 # TanStack Start configuration
├── postcss.config.js             # PostCSS configuration (Tailwind)
├── eslint.config.js              # ESLint flat config
├── prettier.config.js            # Prettier configuration
├── Dockerfile                    # CD deployment (FEAT-009 scope, scaffold only)
├── .gitignore
├── LICENSE
├── README.md
└── MemoryBank/                   # Project documentation (separate concern)
```

### Route Tree (Phase 3-4)

```
__root.tsx (layout shell)
└── index.tsx (homepage scaffold)
```

- `__root.tsx` owns the HTML document shell, meta tags, and error/not-found boundaries.
- `index.tsx` is the minimal homepage route for scaffold validation.
- Future FEATs (FEAT-003+) will add section routes under the root.
- Naming convention: lowercase kebab-case for route files matching URL segments.

### Style Tree

```
styles/app.css  →  Tailwind directives + @theme configuration
```

- Token values are defined in `app.css` using Tailwind v4 `@theme` directives.
- No separate Tailwind config file needed if using Tailwind v4 CSS-first config.
- If Tailwind v3 is required, use `tailwind.config.ts` with the Sovereign Shield tokens as JS config.

### Test Tree

```
tests/
├── unit/
│   └── scaffold.test.tsx
└── e2e/
    ├── features/
    │   └── scaffold-happy-path.feature
    ├── step-definitions/
    │   └── scaffold-steps.ts
    ├── fixtures/
    │   └── scaffold-fixtures.ts
    └── playwright.config.ts
```

---

## 3. Gherkin / Playwright Mapping

### Gherkin Feature File

File: `tests/e2e/features/scaffold-happy-path.feature`

```gherkin
Feature: Scaffold Happy Path
  As a visitor
  I want the HushVoting website to be reachable
  So that I can explore the product

  @HappyPath @Smoke
  Scenario: The scaffold homepage is reachable
    Given the HushVoting website is running
    When I visit the homepage
    Then I see the page title "HushVoting"
    And I see verified Sovereign Shield styled content
```

### Playwright Configuration

- `playwright.config.ts` in `tests/e2e/` defines:
  - Browser project: Chromium only (for scaffold simplicity)
  - Base URL from environment or default `http://localhost:3000`
  - No webServer config for scaffold (dev server started externally)
  - Timeout: 30s
  - Retries: 0 for happy-path (can be adjusted for CI)
- Step definitions use `@playwright/test` `test` and `expect`.
- Fixtures provide reusable browser context setup.

### Execution

- `pnpm test:e2e:happy-path` runs: `playwright test --config tests/e2e/playwright.config.ts`
- Future FEATs add Gherkin scenarios with `@FEAT-002`, `@FEAT-003` tags.
- No `LONG_RUNNING` tag for scaffold; that tag is reserved for downstream CI use per README.md filter convention.

---

## 4. Minimal UI / Content Scope

### What FEAT-001 Must Render

- A styled scaffold homepage that proves:
  - TanStack Start routing works (homepage route renders)
  - Tailwind is active (className-based styling works)
  - Sovereign Shield tokens are applied (core colors, typography, spacing, radius visible)
- Minimal placeholder copy, clearly marked as scaffold validation:
  - "HushVoting!" brand text
  - "Governed remote voting for serious organizations" headline
  - "Loading..." or minimal SSR splash is acceptable
- Font references: Hanken Grotesk, JetBrains Mono, Material Symbols

### What FEAT-001 Must NOT Render (explicitly out of scope)

- Product landing page sections (hero with CTAs — FEAT-003)
- Trust model hierarchy (FEAT-004)
- Role workflow cards (FEAT-005)
- Protocol evidence grids (FEAT-006)
- Footer or contact forms (FEAT-007)
- Responsive breakpoint adjustments beyond default Tailwind mobile behavior (FEAT-008)
- Full design system components (FEAT-002)

### Visual Language Rules Applied (from workspace AGENTS.md / HushVotingVisualLanguage.md)

- Prefer complementary surface colors over white outline borders
- Do not stack visually heavy cards inside cards
- Use borders only for focus, selected, warning, or error states (not default layout)
- Keep operational/foundational sections full-width

---

## 5. React Router v7 Fallback Criteria

### Default Path

TanStack Start `@tanstack/start@1.120.20` is the default. All Phase 2-6 implementation assumes this framework works.

### Fallback Triggers (copy of FEAT-001 criteria, repeated here for Phase 1 consumers)

1. `pnpm dev` cannot reliably start within a 60-second bounded smoke check
2. `pnpm build` cannot produce a production build with scaffolded configuration
3. `pnpm start` cannot reliably serve the built app within a 60-second bounded smoke check
4. The RC blocks a compatible TypeScript strict-mode setup without unreasonable workarounds
5. The RC forces routing conventions that are not maintainable for the planned website
6. The RC prevents stable Gherkin/Playwright happy-path execution
7. The RC requires fragile or undocumented workarounds for normal scaffold operation

### Escalation Rules

1. **Phase 2** (Data Layer): If `pnpm install` fails for TanStack Start packages, document the exact error and stop.
2. **Phase 3** (Business Logic): If app entry/route bootstrap fails, document the exact error with reproduction steps.
3. **Phase 6** (Integration): If E2E cannot execute against TanStack Start, document the failure.

Any fallback decision requires:
- A written block documenting the pinned version tested
- The failing readiness requirement
- The evidence from the bounded validation attempt
- Why React Router v7 is the safer fallback
- EPIC-001 owner review before switching

---

## 6. Contract for Downstream Phases

All downstream phases **must** read this report and update it when implementation reality changes a contract consumed by later phases. Specific update points:

| Phase | Must Read | Must Update If |
|-------|-----------|----------------|
| Phase 2 | Sections 1, 2 | Package versions change, directory structure is different from planned |
| Phase 3 | Sections 1, 2, 5 | Routing conventions differ, framework fallback triggered |
| Phase 4 | Sections 2, 4 | Layout/boundary structure differs from plan |
| Phase 5 | Section 4 | Token coverage or visual scope changes |
| Phase 6 | Sections 2, 3 | Gherkin/Playwright structure or execution differs |
| Phase 7 | Sections 2, 3 | Test structure or verification commands differ |
| Phase 8 | All sections | Final README must reflect actual implementation, not this plan |

---

## 7. Sovereign Shield Token Baseline

### Minimum Token Set for Phase 5 (User Interface)

**Colors** (core):
- `surface`, `surface-container-low`, `surface-container`, `surface-container-high`
- `on-surface`, `on-surface-variant`
- `primary`, `on-primary`, `primary-container`
- `secondary`, `on-secondary`
- `error`, `on-error`
- `outline`, `outline-variant`

**Typography**:
- `display-lg` (Hanken Grotesk, 48px, 700)
- `headline-lg` (Hanken Grotesk, 32px, 600)
- `headline-md` (Hanken Grotesk, 24px, 500)
- `body-lg` (Hanken Grotesk, 18px, 400)
- `body-md` (Hanken Grotesk, 16px, 400)
- `label-md` (JetBrains Mono, 14px, 500)
- `label-sm` (JetBrains Mono, 12px, 500)

**Spacing**:
- `xs` 8px, `sm` 16px, `md` 24px, `lg` 40px, `xl` 64px, `gutter` 24px

**Radius**:
- `sm` 4px, `DEFAULT` 8px, `md` 12px, `lg` 16px, `xl` 24px, `full` 9999px

### Font Integration

- Hanken Grotesk: Google Fonts (weights: 400, 500, 600, 700)
- JetBrains Mono: Google Fonts (weights: 400, 500)
- Material Symbols: Google Fonts (variable font, filled + outlined)

---

## 8. CI Contract Reference

The CI script (`scripts/ci/run-frontend-ci.sh`) requires after scaffold:

- `package.json` with `"packageManager": "pnpm@11.9.0"`
- `pnpm-lock.yaml` committed
- Required scripts: `build`, `test:unit`, `test:e2e:happy-path`
- Optional but recommended: `lint`, `typecheck`

The CD workflow (`.github/workflows/cd.yml`) additionally requires:
- `Dockerfile` at repository root
- Container exposes HTTP on port 80

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-07-08 | Initial report created | pi (start-feature skill) |
