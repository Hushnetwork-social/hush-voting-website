# Planning Analysis Report — FEAT-003

**Feature ID:** FEAT-003  
**Feature Name:** Hero Section and Navigation  
**Date:** 2026-07-08  
**Status:** Locked for implementation (Phase 1 completed)  
**Source Documents:** FeatureDescription.md, FeatureTasks.md, design-summary.md, UX-research-report.md, Wireframes-design.md, FEAT-001 lessons learned, FEAT-002 lessons learned

---

## 1. File and Component Boundaries

### Production Files

| File | Purpose |
| --- | --- |
| `src/components/landing/constants.ts` | Static nav/CTA/copy data; no API, CMS, or persistence |
| `src/components/landing/BrandMark.tsx` | Token-based HushVoting brand mark fallback (SVG/CSS-only) |
| `src/components/landing/MobileNavDisclosure.tsx` | Accessible disclosure menu trigger + panel |
| `src/components/landing/Header.tsx` | Fixed-top navigation bar composing BrandMark, nav links, Pilot Access CTA, and MobileNavDisclosure |
| `src/components/landing/HeroSection.tsx` | Hero section composing BrandMark, headline, subheadline, two CTAs, purple glow |
| `src/components/landing/index.ts` | Public barrel exports |
| `src/routes/index.tsx` | Homepage route — replaces scaffold content with Header + HeroSection |
| `styles/app.css` | May add shared scroll-margin/scroll-padding and glow keyframes (no token overrides) |

### Test Files

| File | Purpose |
| --- | --- |
| `tests/unit/landing.test.tsx` | Component render tests for nav links, hero copy, CTAs, mobile menu state, accessibility |

### Documentation Files

| File | Purpose |
| --- | --- |
| `planning-analysis-report.md` (this file) | Canonical implementation plan |

### Architecture Decision

All landing/hero/nav components live under `src/components/landing/` rather than directly in the route file. This keeps the route focused on layout composition and allows future FEATs to import Header or BrandMark if needed. The route remains the single homepage integration point.

No new module path aliases are required. Use the existing `~` alias from `src/`.

---

## 2. Static Content and Link Constants

All copy and hrefs live in `src/components/landing/constants.ts`. No external data sources, CMS, environment variables, or API calls are involved.

### Navigation Links

```typescript
export const NAV_LINKS = [
  { label: "Trust Model", href: "#trust" },
  { label: "Roles", href: "#roles" },
  { label: "Protocol Evidence", href: "#protocol" },
  { label: "Platform", href: "#platform" },
] as const;
```

### Hero Brand

```typescript
export const BRAND_TEXT = "HushVoting!";
```

### Hero Copy

```typescript
export const HERO_COPY = {
  headline: "Governed remote voting for serious organizations.",
  subheadline:
    "HushVoting! helps organizations run private, auditable, protocol-bound votes with clear roles for voters, owners, trustees, and auditors.",
} as const;
```

### CTA Definitions

```typescript
export const CTAS = {
  pilotAccess: {
    label: "Request pilot access",
    href: "#pilot-access",
    variant: "primary" as const,
  },
  verifierModel: {
    label: "View verifier model",
    href: "#protocol",
    variant: "secondary" as const,
  },
  navPilotAccess: {
    label: "Pilot Access",
    href: "#pilot-access",
    variant: "primary" as const,
  },
} as const;
```

### Anchor Targets Summary

| Target | Owner | Interim Behavior |
| --- | --- | --- |
| `#trust` | FEAT-004 | Safe anchor — no-op until section exists; must not crash |
| `#roles` | FEAT-005 | Safe anchor — no-op until section exists; must not crash |
| `#protocol` | FEAT-006 | Safe anchor — no-op until section exists; must not crash |
| `#platform` | FEAT-006 | Safe anchor — no-op until section exists; must not crash |
| `#pilot-access` | FEAT-007 | Safe anchor — FEAT-003 must not create fake form or imply submission success |

---

## 3. Semantic and Accessibility Plan

### Landmarks

```
<header>                    ← Fixed top navigation
  <nav aria-label="Primary">
    [Brand] [links] [CTA]
  </nav>
</header>
<main>                      ← Page content
  <section aria-labelledby="hero-heading">  ← Hero
    <h1 id="hero-heading">  ← Single page-level heading
      [BrandMark] [headline]
    </h1>
    <p>                     ← Subheadline
    [CTA primary] [CTA secondary]
    [Purple glow — decorative]
  </section>
</main>
```

### Navigation Behavior

- Desktop: Brand + anchor links + Pilot Access CTA visible in header
- Mobile: Brand + menu toggle button visible
- Menu toggle: `<button>` with `aria-expanded`, `aria-controls`, accessible name ("Open navigation" / "Close navigation")
- Menu panel: Tonal dropdown/sheet with section links + Pilot Access CTA
- Link/CTA activation closes the menu
- Escape key closes the menu when focus is inside open panel
- Focus order: Brand → menu toggle → links → CTA (desktop); Brand → links → CTA → menu toggle (mobile)

### Decorative Elements

- Purple glow: CSS-only pseudo-element or absolutely positioned element with `aria-hidden="true"`
- BrandMark: If decorative (adjacent Brand text present in hero), use `aria-hidden="true"` and `alt=""`; if standalone, use accessible name
- Motion: CSS transitions respect `prefers-reduced-motion`

### Fixed-Header Anchor Strategy

Add a shared CSS utility for sections to apply `scroll-margin-top`. Document that future FEATs should apply `scroll-mt-[80px]` (or the measured header height) to their section containers. This is declared in `styles/app.css` as:

```css
/* Shared utility for section anchors hidden behind fixed header */
.section-anchor {
  scroll-margin-top: 80px;
}
```

---

## 4. CTA and Button Usage Contract

| Element | Component | Accessibility |
| --- | --- | --- |
| Pilot Access (nav) | Styled `<a>` anchor — not a `<button>` | `aria-label="Pilot Access"` if needed |
| Request pilot access (hero primary) | Styled `<a>` anchor — not a `<button>` | Navigates to `#pilot-access` |
| View verifier model (hero secondary) | Styled `<a>` anchor — not a `<button>` | Navigates to `#protocol` |
| Mobile menu toggle | Native `<button>` from `Button` component | `aria-expanded`, `aria-controls`, accessible name |
| Pending FEAT-007 contact form | Not implemented by FEAT-003 | — |

Styled anchor CTAs use FEAT-002 `Button` visual classes applied via a shared class object in `constants.ts` rather than wrapping `<a>` inside `<button>`. The rendered element is a native `<a>` so semantics, keyboard behavior, and right-click/open-in-new-tab work correctly.

---

## 5. Test Coverage Plan

### Unit/Component Tests (`tests/unit/landing.test.tsx`)

| Test Area | Assertions |
| --- | --- |
| Header renders | `<header>` landmark, brand text "HushVoting!" |
| Primary nav renders | `<nav aria-label="Primary">` with all 4 links |
| Nav link labels and hrefs | Exact labels and hrefs from constants |
| Pilot Access CTA in nav | Renders with href `#pilot-access` |
| Hero headline renders | Exact approved copy |
| Hero subheadline renders | Exact approved copy |
| Hero CTAs render | Both CTAs with labels and hrefs from constants |
| Mobile disclosure trigger | Accessible name, `aria-expanded`, `aria-controls` |
| Mobile menu opens | Opening reveals links and CTA |
| Mobile menu closes on link activation | Menu closes after link click |
| BrandMark renders | Token-based fallback renders without broken state |
| Purple glow is decorative | `aria-hidden` on glow element |
| Homepage includes all landmarks | header, nav, main, section elements |

### Verification Labels

| Label | Applicable | Notes |
| --- | --- | --- |
| build | ✅ | `pnpm build` must pass |
| static-analysis | ✅ | No hardcoded colors outside tokens |
| typecheck | ✅ | `pnpm typecheck` must pass |
| unit-tests | ✅ | `pnpm test:unit` covers component render contracts |
| affected-tests | ✅ | Existing scaffold/design-system tests must still pass |
| ui-tests | ⚠️ | E2E coverage for homepage happy-path; waiver if not practical |
| accessibility-review | ✅ | Manual + automated assertions |
| design-review-ready | ✅ | Visual matches design intent |
| integration-contract-review | ✅ | Route integration, anchor targets, FEAT handoffs |
| manual-review-ready | ✅ | Final manual verification |
| full-verification | ✅ | Final checkpoint |

---

## 6. Update Rules

This planning report is the canonical implementation plan. Future phases (2–8) must adhere to these contracts unless implementation reality forces a deviation. When a deviation occurs:

1. The implementing phase must update this report with the new contract.
2. The update must explain why the original contract changed and who is affected.
3. All downstream phases must be notified of the change.

Deviations requiring report update:
- Adding, removing, or renaming a component file
- Changing a nav label, href, or CTA target
- Adding new interactive behavior beyond the disclosure menu
- Changing the semantic landmark structure
- Adding new dependencies

Deviations that do NOT require report update:
- Internal refactoring of component implementation details
- CSS class name changes that don't affect the visual contract
- Adding non-visible accessibility improvements

---

## 7. Risks and Decisions

| Topic | Decision | Risk if Changed |
| --- | --- | --- |
| Pilot Access interim target | `#pilot-access` placeholder anchor | FEAT-007 must add matching target or replace href |
| Brand asset | Token-based SVG/CSS fallback | Must not load external prototype image URL |
| Mobile menu pattern | Non-modal disclosure panel (not drawer/dialog) | Sufficient for MVP; no focus trap needed |
| Missing anchor targets | Safe no-op (browser scrolls nowhere) | Must not throw route errors |
| Scroll strategy | Shared `.section-anchor` class with `scroll-margin-top: 80px` | Future FEATs must apply class to section containers |
| CTAs are anchors | Native `<a>` styled to match Button primitives | Must not wrap `<a>` inside `<button>` or vice versa |
| Button component | FEAT-002 Button only for true buttons (menu toggle) | Link CTAs use styled anchors |

---

## 8. Future FEAT Handoff Contracts

| FEAT | Dependency on FEAT-003 | Contract |
| --- | --- | --- |
| FEAT-004 | Adds `#trust` section content | Apply `.section-anchor` class; nav link unchanged |
| FEAT-005 | Adds `#roles` section content | Apply `.section-anchor` class; nav link unchanged |
| FEAT-006 | Adds `#protocol` and `#platform` section content | Apply `.section-anchor` class; nav / hero CTA links unchanged |
| FEAT-007 | Replaces/satisfies `#pilot-access` target | May add real section or change FEAT-003 CTA href |
| FEAT-008 | Full-site responsive optimization | FEAT-003 nav/hero already responsive; FEAT-008 may adjust breakpoints globally |
