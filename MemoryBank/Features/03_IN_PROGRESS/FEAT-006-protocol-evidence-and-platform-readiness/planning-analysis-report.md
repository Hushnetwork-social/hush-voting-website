# Planning Analysis Report — FEAT-006

| Field | Value |
| ----- | ----- |
| **Feature** | FEAT-006 — Protocol Evidence and Platform Readiness |
| **Created** | 2026-07-08T19:33:00.000Z |
| **Source** | `FeatureDescription.md`, `FeatureTasks.md`, design artifacts |
| **Status** | Final (locked for implementation) |

## 1. Static Content Contract

Source of truth is the FEAT-006 `FeatureDescription.md` / design-summary contract, **not** older prototype labels. The following contracts are frozen and must be implemented as typed constants before components.

### Protocol Evidence Items (6 items, in order)

| Key | Label (uppercase in UI) | Material Symbol | Description |
| --- | --- | --- | --- |
| `cryptographicReceipts` | CRYPTOGRAPHIC RECEIPTS | `receipt_long` | Evidence that voting activity can produce voter-verifiable receipts without exposing vote choices. |
| `eligibilityProofs` | ELIGIBILITY PROOFS | `how_to_reg` | Evidence that voter eligibility can be proven without turning the public result into an identity list. |
| `anonymousBallots` | ANONYMOUS BALLOTS | `shield_lock` | Evidence that private ballot handling is a first-class protocol property. |
| `tamperEvidentRecords` | TAMPER-EVIDENT RECORDS | `database` | Evidence that election records are structured for integrity checks and audit review. |
| `verifiableTally` | VERIFIABLE TALLY | `verified` | Evidence that outcomes are designed to be independently checked. |
| `auditEvidence` | AUDIT EVIDENCE | `fact_check` | Evidence packages are designed to support organizational review and post-election audit workflows. |

### Protocol Omega Badge

| Label | Material Symbol |
| --- | --- |
| 100% Mathematically Verifiable | `verified` |

### Protocol Narrative (left column)

Copy from design summary / prototype: a concise explanation of Protocol Omega — the cryptographic protocol powering HushVoting! — and how the six evidence categories demonstrate its verifiability properties.

### Deployment Readiness Cards (3 cards, in order)

| Key | Headline | Material Symbol | Description |
| --- | --- | --- | --- |
| `pwaFirst` | PWA-First | `install_mobile` | Installable web deployment path designed for fast access, broad device reach, and low operational friction. |
| `electrobunReady` | Electrobun-Ready | `desktop_windows` | Desktop packaging path prepared for secure organizational environments and dedicated election workstations. |
| `mobileNative` | Mobile Native | `phone_iphone` | Mobile-native delivery path reserved for future app-store distribution and device-specific voting experiences. |

### Claim Boundary Badges (5 badges, in order, all FILL 1)

| Label | Material Symbol |
| --- | --- |
| Designed for organizational remote voting | `groups` |
| Privacy-first | `privacy_tip` |
| Verifiable outcomes | `verified` |
| Audit-ready evidence packages | `fact_check` |
| Enabled by HushNetwork | `hub` |

## 2. CSS Runtime Remediation Strategy

### Problem
`styles/app.css` imported in `src/routes/index.tsx` via bare `import`. TanStack Start SSR does not inject this into `<head>` during HTML generation or client hydration.

### Solution (Phase 3)
Move the CSS import from `src/routes/index.tsx` into `src/routes/__root.tsx` (root layout). The root layout is the framework entry point for all routes, and CSS imported there is expected to be included in SSR HTML output.

**File:** `src/routes/__root.tsx`
**Change:** Add `import "../../styles/app.css";` at the top of the root layout file.

**Validation evidence (Phase 3):**
- Document `<head>` contains `<link rel="stylesheet">` for the built CSS asset
- Computed `--color-surface` on `:root` resolves to `#091422`
- Computed `--font-family-hanken` includes `"Hanken Grotesk"`
- `document.body` background-color = `rgb(9, 20, 34)`
- `#hero-heading` font-family includes `"Hanken Grotesk"`

### Fallback
If the simple import move doesn't work, the CSS could be loaded via a `<link>` tag in `app.config.ts` using Vite's `html` plugin or via `useHead`/`useScript` if a head management library is added. But the import-in-root-route approach is the canonical TanStack Start pattern and should be tried first.

## 3. Component Architecture & File Boundaries

### Source files to create/modify

| File | Phase | Action |
| --- | --- | --- |
| `src/components/landing/constants.ts` | Phase 2 | Add FEAT-006 typed constants |
| `src/components/landing/index.ts` | Phase 4 | Add barrel exports for new components |
| `src/components/landing/ProtocolEvidenceSection.tsx` | Phase 4 | Create — Protocol Omega section component |
| `src/components/landing/PlatformReadinessSection.tsx` | Phase 4 | Create — deployment cards + claim boundary |
| `src/components/landing/ClaimBoundaryBar.tsx` | Phase 4 | Create (optional) — separate claim bar |
| `src/routes/__root.tsx` | Phase 3 | Move CSS import here |
| `src/routes/index.tsx` | Phase 6 | Compose new sections + remove CSS import |
| `tests/unit/landing.test.tsx` | Phase 7 | Add FEAT-006 tests |

### Component Boundaries

```
ProtocolEvidenceSection
  ├── section#protocol (aria-labelledby="protocol-heading")
  │   ├── Left column: narrative + protocol badge
  │   └── Right column: 2x3 grid of InsetWell evidence items
  │       └── Each item: decorative icon + uppercase label

PlatformReadinessSection
  ├── section#platform (aria-labelledby="platform-heading")
  │   ├── Heading + description
  │   ├── 3-column card grid (cards)
  │   └── ClaimBoundaryBar (local child or separate)
  │       └── 5 claim badges with filled icons

ClaimBoundaryBar (local to PlatformReadinessSection or exported for testing)
  └── <div role="list"> of 5 badges
```

### Homepage Composition Order (Phase 6)

```
<Header />
<main>
  <HeroSection />
  <TrustModelSection />
  <RoleWorkflowSection />
  <ProtocolEvidenceSection />    ← NEW
  <PlatformReadinessSection />   ← NEW (includes ClaimBoundaryBar)
</main>
```

### Barrel Exports

Update `src/components/landing/index.ts` to export:
- `ProtocolEvidenceSection` + `ProtocolEvidenceSectionProps`
- `PlatformReadinessSection` + `PlatformReadinessSectionProps`
- `ClaimBoundaryBar` + `ClaimBoundaryBarProps`
- FEAT-006 constants/types from constants module

## 4. Accessibility Model

- **Section landmarks**: `<section>` with `aria-labelledby` pointing to the `h2` heading
- **Heading hierarchy**: `h2` for section headings, `h3` for deployment card titles
- **Decorative icons**: All Material Symbol icons use `aria-hidden="true"` and no redundant `aria-label`
- **Non-interactive**: No buttons, links, click handlers, or focus targets inside FEAT-006 sections
- **Evidence items**: Rendered as a list (`<ul>` / `<li>` or grid of `<div>`s with list semantics)
- **Claim badges**: Rendered as `<span>`s in a `<div>` with `role="list"` for screen reader context if practical, but simple visual group is acceptable since they are decorative claims

## 5. Responsive Strategy

| Component | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Protocol Evidence section | Left/right 2-column layout | Left/right 2-column or stacked | Stacked (single column) |
| Evidence items grid | 2x3 grid (2 cols × 3 rows) | 2x3 or 1x6 | Single column stacked |
| Deployment cards | 3-column grid | 2-column grid (wrap) | Single column stacked |
| Claim boundary bar | Horizontal wrapping row | Horizontal wrapping row | Vertical wrap or scroll |

## 6. Test Strategy

### Unit/Component Tests (Phase 7)

| Test | What it verifies |
| --- | --- |
| Constants contract: protocol evidence | Exactly 6 items, correct order, exact labels, exact icons |
| Constants contract: deployment cards | Exactly 3 cards, correct order, exact headlines/icons |
| Constants contract: claim badges | Exactly 5 badges, correct order, exact labels/icons, fill metadata |
| ProtocolEvidenceSection render | Renders `section#protocol`, heading "Protocol Omega", left narrative, badge |
| PlatformReadinessSection render | Renders `section#platform`, heading "Universal Deployment Readiness", 3 cards |
| ClaimBoundaryBar render (if separate) | Renders 5 badge labels |
| No focusable elements | No buttons, links, or tabindex in FEAT-006 sections |
| No border-white | No `border-white` class in rendered output |
| Decorative icons | All icons have `aria-hidden="true"`, no redundant `aria-label` |

### E2E/Browser Tests (Phase 7)

Pre-existing Gherkin + Playwright specs (already created):
| Feature file | Spec file | Scenarios |
| --- | --- | --- |
| `visual-language-baseline.feature` | `visual-language-baseline.spec.ts` | CSS stylesheet link, custom properties, body background, hero font |
| `protocol-evidence-section.feature` | `protocol-evidence-section.spec.ts` | Protocol section, Platform section, Claim badges |

### Verification Commands

| Command | When |
| --- | --- |
| `pnpm typecheck` | Phase 2, 3, 4, 5, 6, 7 (after each code change) |
| `pnpm test:unit` | Phase 2, 7 (constants tests + component tests) |
| `pnpm build` | Phase 3, 6 (after CSS fix + integration) |
| `pnpm format:check` | Phase 7 (before code review) |

## 7. Phase Ownership Summary

| Phase | Focus | Estimated files changed |
| --- | --- | --- |
| Phase 0 | Health check (complete) | 1 (phase doc) |
| Phase 1 | Planning analysis (this doc) | 2 (planning-report + phase doc) |
| Phase 2 | Typed constants | 2-3 (constants.ts, index.ts barrel, landing test) |
| Phase 3 | CSS stylesheet injection fix | 2 (__root.tsx CSS import, index.tsx remove import) |
| Phase 4 | Component markup | 4-5 (3 new components, barrel, planning update) |
| Phase 5 | Visual styling | 3 (component TSX files with Tailwind classes) |
| Phase 6 | Route integration | 2 (index.tsx route, barrel) |
| Phase 7 | Testing + polish | 2-3 (landing test, E2E repair, formatting) |
| Phase 8 | Final checkpoint | 1 (phase doc with evidence) |

## 8. Contract Change Policy

If implementation reveals that a contract (constant name, type structure, component boundary, or test strategy) must change from this plan, the affected phase worker must:

1. Update this `planning-analysis-report.md` with the change and rationale
2. Notify downstream phases by updating the relevant section headers with "**UPDATED:**" prefix
