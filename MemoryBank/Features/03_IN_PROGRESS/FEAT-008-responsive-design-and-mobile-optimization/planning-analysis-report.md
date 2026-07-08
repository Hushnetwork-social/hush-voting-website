# FEAT-008 Planning Analysis Report

## 1. Scope Confirmation

FEAT-008 is a **targeted responsive audit and patch pass** over the existing HushVoting landing page. No content rewrite, no section hierarchy changes, no new backend/API behavior, no authenticated election workflows.

## 2. Breakpoint Contract

| Breakpoint Class | Width Range | Navigation Mode | Notes |
|-----------------|-------------|-----------------|-------|
| Mobile | 320px – 767px | Hamburger disclosure | 320px minimum supported |
| Tablet | 768px – 1023px | Hamburger disclosure | Same disclosure as mobile |
| Desktop | 1024px – 1440px+ | Inline nav visible | 1440px reference; also check 1920px |

**Current code defect:** `Header.tsx` uses `hidden md:flex` (768px+) and `MobileNavDisclosure.tsx` uses `md:hidden`. These must change to `lg:` (1024px) breakpoint equivalents.

## 3. Source Audit — Defect Map

### 3.1 Navigation

| Defect | Location | Fix |
|--------|----------|-----|
| Desktop nav starts at `md:` (768px) instead of `lg:` (1024px) | `Header.tsx` line: `hidden md:flex` | Change to `hidden lg:flex` |
| Desktop CTA starts at `md:` instead of `lg:` | `Header.tsx` line: `hidden md:inline-flex` | Change to `hidden lg:inline-flex` |
| Mobile disclosure hides at `md:` instead of `lg:` | `MobileNavDisclosure.tsx` line: `md:hidden` | Change to `lg:hidden` |
| Desktop nav links use `h-10` (40px) — below 48px touch target | `Header.tsx` nav link classes | Change to `h-12` (48px) |
| Desktop CTA uses `h-10` (40px) — below 48px touch target | `Header.tsx` CTA classes | Change to `h-12` (48px) |
| Mobile nav links: height is `h-12` (48px) — OK | `MobileNavDisclosure.tsx` | No change needed |
| Mobile nav panel already uses approved surface/divider | `MobileNavDisclosure.tsx` | No change needed |

### 3.2 Hero Section

| Defect | Location | Fix |
|--------|----------|-----|
| Hero heading uses `clamp(2rem,5vw,...)` — correct | `HeroSection.tsx` | No change needed |
| Hero subheadline uses `clamp(1rem,2vw,...)` — correct | `HeroSection.tsx` | No change needed |
| Hero CTAs use `h-12` (48px) — OK | `HeroSection.tsx` | No change needed |
| Brand mark sizing not contextual (fixed `h-8 w-8`) | `BrandMark.tsx` | Add responsive class support for hero vs header context |
| Hero section uses `px-4` — should verify against token | `HeroSection.tsx` | Verify `px-4` = 16px matches `--spacing-margin-mobile` |

### 3.3 Role Workflow Section

| Defect | Location | Fix |
|--------|----------|-----|
| Cards already use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` | `RoleWorkflowSection.tsx` | ✅ Correct — no change needed |

### 3.4 Protocol Evidence Section

| Defect | Location | Fix |
|--------|----------|-----|
| Evidence items already use `grid-cols-1 sm:grid-cols-2` | `ProtocolEvidenceSection.tsx` | ✅ Correct — no change needed |

### 3.5 Platform Readiness Section

| Defect | Location | Fix |
|--------|----------|-----|
| Cards already use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | `PlatformReadinessSection.tsx` | ✅ Correct — no change needed |

### 3.6 Footer

| Defect | Location | Fix |
|--------|----------|-----|
| Footer already uses `flex-col sm:flex-row` | `Footer.tsx` | ✅ Correct — no change needed |
| Footer link touch targets: `py-[var(--spacing-xs)]` may be too small | `Footer.tsx` | Enlarge padding to ensure 48px clickable area |

### 3.7 Final CTA

| Defect | Location | Fix |
|--------|----------|-----|
| CTA buttons use `py-3.5` (~14px) — likely 48px height with text | `FinalCtaSection.tsx` | Verify computed height meets 48px |

### 3.8 Claim Boundary Bar

| Defect | Location | Fix |
|--------|----------|-----|
| Badges wrap using `flex-wrap` — correct | `ClaimBoundaryBar.tsx` | ✅ Correct — no change needed |

### 3.9 Touch Targets

| Element | Current | Expected | Fix needed? |
|---------|---------|----------|-------------|
| Desktop nav links | `h-10` | `h-12` | Yes |
| Desktop nav CTA | `h-10` | `h-12` | Yes |
| Mobile nav links | `h-12` | 48px | No |
| Hero CTAs | `h-12` | 48px | No |
| Footer links | `py-[var(--spacing-xs)]` | 48px clickable | Yes — enlarge |
| Mobile hamburger | `h-12 w-12` | 48px | No |

## 4. Data / Test Metadata Contract

### 4.1 Viewport Constants

Typed viewport constants should be added to `tests/e2e/fixtures/responsive.ts`:

| Name | Width | Height | Label |
|------|-------|--------|-------|
| `VIEWPORT_320` | 320 | 568 | Mobile minimum |
| `VIEWPORT_375` | 375 | 812 | Mobile reference |
| `VIEWPORT_768` | 768 | 1024 | Tablet portrait |
| `VIEWPORT_1024` | 1024 | 768 | Desktop minimum |
| `VIEWPORT_1440` | 1440 | 900 | Desktop reference |
| `VIEWPORT_1920` | 1920 | 1080 | Desktop wide |

### 4.2 Breakpoint Labels

| Label | Max-width | Mode |
|-------|-----------|------|
| `mobile` | 767px | Hamburger |
| `tablet` | 768px–1023px | Hamburger |
| `desktop` | 1024px+ | Inline nav |

### 4.3 Layout Expectations

| Section | Mobile cols | Tablet cols | Desktop cols |
|---------|------------|-------------|--------------|
| Role Workflow cards | 1 | 2 | 4 |
| Protocol Evidence items | 1 | 2 | 2 |
| Platform Readiness cards | 1 | 2 | 3 |

### 4.4 Touch Target Threshold

- Minimum height: 48px
- Minimum width: 48px (or equivalent padding creating 48px interactive area)

### 4.5 Gutter Expectations

- Mobile horizontal padding: 16px (`--spacing-margin-mobile` or `px-4`)
- Desktop horizontal padding: 24px (`--spacing-gutter` or `px-6`)

### 4.6 Typography Thresholds

| Element | Mobile (320px) | Desktop (1440px) |
|---------|---------------|------------------|
| Hero heading | ≥ 32px | 32px–48px |
| Section heading | ≥ 24px | varies |
| Body text | ≥ 16px (readable) | up to `--font-size-body-lg` |

## 5. Package-Level Validation Entry Points

The following package.json scripts should exist (defined in Phase 6):

| Script | Commands | Purpose |
|--------|----------|---------|
| `test:e2e:visual-baseline` | Run CSS baseline test only | Prerequisite validation |
| `test:e2e:responsive` | Run FEAT-008 responsive tests | Viewport matrix validation |

Both should tag-filter so they run only their respective scenarios, not the full E2E suite.

## 6. Acceptance Traceability

| Acceptance Area | Phase(s) | Verification Method |
|----------------|----------|-------------------|
| CSS baseline prerequisite | 0, 1, 6, 7 | E2E: visual-language-baseline |
| Mobile nav hamburger | 4, 5, 7 | E2E: responsive-layout @ 375px |
| Tablet nav hamburger | 4, 5, 7 | E2E: responsive-layout @ 768px |
| Desktop inline nav | 4, 5, 7 | E2E: responsive-layout @ 1440px |
| Role card grids | 5, 7 | E2E: responsive-layout (bounding-box) |
| Protocol/platform layouts | 5, 7 | E2E: responsive-layout (bounding-box) |
| No white borders | 5, 7 | E2E: responsive-layout (DOM scan) |
| Section padding | 5, 7 | E2E: responsive-layout (computed-style) |
| Typography scaling | 5, 7 | E2E: responsive-layout (computed-style) |
| Touch targets (48px) | 4, 5, 7 | E2E: responsive-layout (bounding-box) |
| Focus-visible rings | 4, 5, 7 | E2E: responsive-layout (accessibility check) |
| Claim Boundary wrapping | 5, 7 | E2E: responsive-layout (no-overflow) |
| Footer wrapping/targets | 5, 7 | E2E: responsive-layout (bounding-box) |

## 7. Contract for Later Phases

- **Phase 2 (Data Layer):** Add `tests/e2e/fixtures/responsive.ts` with typed viewport constants. Update `planning-analysis-report.md` if metadata contracts change.
- **Phase 3 (Business Logic):** Add pure helpers for computed-style normalization, bounding-box grouping if assertion logic becomes non-trivial. Update planning report if helper contracts change.
- **Phase 4 (Presentation Logic):** Patch `Header.tsx`, `MobileNavDisclosure.tsx`, `BrandMark.tsx`, `Footer.tsx` for breakpoint and touch-target fixes.
- **Phase 5 (User Interface):** Patch responsive classes for navigation, sections, grids, spacing, and typography compliance.
- **Phase 6 (Integration):** Add package.json scripts, integrate E2E files, confirm CSS import order.
- **Phase 7 (Testing Polish):** Expand Gherkin/Playwright coverage for full viewport matrix, bounding-box, computed-style, and accessibility checks.
- **Phase 8 (Final Checkpoint):** Verify acceptance traceability completeness.

## 8. Known Risks and Assumptions

- **Risk:** Desktop nav links at `h-10` will need changing to `h-12`, which may affect header height and overall layout. Header uses `h-16` — should accommodate taller links.
- **Risk:** Footer link padding enlargement must not break the visual flow. Use proportional padding increases.
- **Risk:** BrandMark contextual sizing may require a new prop or wrapper. Keep minimal — use `className` override.
- **Assumption:** Existing E2E responsive-layout files are salvageable and will be repaired/expanded, not replaced.
- **Assumption:** No backend/API/election workflow changes are needed.
- **Assumption:** ESLint config gap is pre-existing and not a FEAT-008 blocker.
