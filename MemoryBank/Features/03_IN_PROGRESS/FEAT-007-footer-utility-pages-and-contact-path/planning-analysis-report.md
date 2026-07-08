# Planning Analysis Report — FEAT-007

| Field            | Value                                             |
| ---------------- | ------------------------------------------------- |
| **Feature**      | FEAT-007 — Footer, Utility Pages and Contact Path |
| **Project**      | HushVoting Website                                |
| **Date**         | 2026-07-08                                        |
| **Author**       | Pi (start-feature skill, autonomous mode)         |
| **Phase Origin** | Phase 1 — Planning Analysis                       |

## 1. Approved Content Contract

### 1.1 Final CTA Section

| Field               | Value                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| Section id          | `pilot-access`                                                                      |
| Heading             | `Bring protocol-bound voting to your organization.`                                 |
| Description         | `Secure, private, and mathematically verifiable governance at scale.`               |
| Primary CTA label   | `Request pilot access`                                                              |
| Secondary CTA label | `Download overview`                                                                 |
| Placeholder note    | `Pilot access requests currently open an email draft while onboarding is reviewed.` |

### 1.2 Pilot Access Mailto

| Field            | Value                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| Recipient        | `hello@hushvoting.com` (assumed owner-approved; keep in typed constants)               |
| Subject          | `HushVoting pilot access request`                                                      |
| Body             | Greeting, request for next review steps, fields for Organization, Name, Role, Use case |
| Encoding         | Standard URL encoding for subject/body                                                 |
| Placeholder note | Visible text must indicate the contact path is placeholder/subject-to-review           |

### 1.3 Download Overview CTA

| Field    | Value                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------- |
| Label    | `Download overview`                                                                             |
| Href     | `#protocol` (safe interim target — no approved downloadable asset exists)                       |
| Metadata | Constants must note that the overview asset is pending; CTA renders as a secondary-style anchor |

### 1.4 Footer

| Field           | Value                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------- |
| Brand           | `HushVoting!`                                                                                |
| Tagline         | `HushVoting! is a product of HushNetwork.`                                                   |
| Background      | `bg-surface-container-lowest`                                                                |
| Links           | `Privacy Policy` → `/privacy`, `Terms of Service` → `/terms`, `Security Audit` → `/security` |
| Link typography | label-sm: JetBrains Mono, 12px, uppercase via CSS (source labels remain title case)          |
| Link hover      | `hover:text-primary` transition                                                              |
| Layout          | Side-by-side on desktop (brand/tagline left, links right), stacked on mobile                 |

### 1.5 Utility Pages

| Route       | Title            | Status message                               | Copy boundary                                                                                                                   |
| ----------- | ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/privacy`  | Privacy Policy   | `Launch placeholder — final review pending.` | Final privacy policy is pending legal/privacy review; scaffold does not represent finalized privacy approval.                   |
| `/terms`    | Terms of Service | `Launch placeholder — final review pending.` | Final terms are pending legal review; placeholder is not a finalized service agreement.                                         |
| `/security` | Security Audit   | `Launch placeholder — final review pending.` | Security-audit references are pending review; page does not represent completed audit certification or final security approval. |

Each utility page must have:

- One `h1` with the page title
- Visible pending-review status message
- Concise body copy (2-3 sentences)
- Visible back-to-home navigation link (e.g., "Return home" → `/`)

## 2. Source Files and Component Boundaries

### 2.1 New Files

| File                                          | Purpose                                                                                    | Phase   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ | ------- |
| `src/components/landing/FinalCtaSection.tsx`  | Final CTA component (section with heading, description, two CTA buttons, placeholder note) | Phase 4 |
| `src/components/landing/Footer.tsx`           | Footer component (brand, tagline, utility links)                                           | Phase 4 |
| `src/components/landing/UtilityPageShell.tsx` | Shared utility page shell component with Section/Card layout                               | Phase 4 |
| `src/routes/privacy.tsx`                      | Privacy Policy route (thin, renders UtilityPageShell)                                      | Phase 6 |
| `src/routes/terms.tsx`                        | Terms of Service route (thin, renders UtilityPageShell)                                    | Phase 6 |
| `src/routes/security.tsx`                     | Security Audit route (thin, renders UtilityPageShell)                                      | Phase 6 |

### 2.2 Modified Files

| File                                  | Change                                                                                                                    | Phase     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------- |
| `src/components/landing/constants.ts` | Add FEAT-007 typed constants (FINAL_CTA_SECTION, PILOT_ACCESS_MAILTO, DOWNLOAD_OVERVIEW_CTA, FOOTER_LINKS, UTILITY_PAGES) | Phase 2   |
| `src/components/landing/index.ts`     | Export new FEAT-007 components and constants                                                                              | Phase 4/6 |
| `src/routes/index.tsx`                | Add `FinalCtaSection` inside `<main>` after `PlatformReadinessSection`; add `Footer` after `</main>`                      | Phase 6   |
| `tests/unit/landing.test.tsx`         | Add FEAT-007 constants contract tests and component render tests                                                          | Phase 2/7 |
| `tests/e2e/footer-section.feature`    | Repair/align Gherkin scenarios with full FEAT-007 acceptance criteria                                                     | Phase 7   |
| `tests/e2e/footer-section.spec.ts`    | Repair/extend Playwright spec for full AC coverage                                                                        | Phase 7   |

### 2.3 No-Change Files (existing infrastructure)

- `src/components/ui/Button.tsx` — reuse as-is
- `src/components/ui/Card.tsx` — reuse as-is
- `src/components/ui/Section.tsx` — reuse as-is
- `src/components/ui/cn.ts` — reuse as-is
- `src/components/landing/Header.tsx` — no changes needed
- `src/routes/__root.tsx` — no changes needed
- `styles/app.css` — no changes needed

## 3. Homepage Composition Order

```
<Header />
<main>
  <HeroSection />          {/* FEAT-003 — existing */}
  <TrustModelSection />     {/* FEAT-004 — existing */}
  <RoleWorkflowSection />   {/* FEAT-005 — existing */}
  <ProtocolEvidenceSection />  {/* FEAT-006 — existing */}
  <PlatformReadinessSection /> {/* FEAT-006 — existing */}
  <FinalCtaSection />       {/* FEAT-007 — new, after PlatformReadiness, before </main> */}
</main>
<Footer />                 {/* FEAT-007 — new, after </main>, semantic footer landmark */}
```

The `#pilot-access` anchor must resolve to the FinalCtaSection. The `#pilot-access` fragment link from Header/Hero (FEAT-003) must work without changes to those components.

## 4. Accessibility Model

| Element            | Accessible behavior                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Final CTA section  | `<section id="pilot-access" aria-labelledby="pilot-access-heading">` with `<h2 id="pilot-access-heading">`                |
| Primary CTA        | Native `<a>` with `href="mailto:..."`, accessible name matching visible "Request pilot access" text                       |
| Secondary CTA      | Native `<a>` with `href="#protocol"`, accessible name matching visible "Download overview" text                           |
| Placeholder note   | Visible text, not only title/screen-reader-only. An `aria-describedby` on the primary CTA is acceptable but not required. |
| Footer             | Semantic `<footer>` landmark                                                                                              |
| Footer links       | Native `<a>` or TanStack `<Link>` components that render anchors. Label source text in title case; uppercase via CSS.     |
| Utility pages      | One `<h1>` per page, visible pending-review status, visible back-home `<a>` link                                          |
| Decorative icons   | `aria-hidden="true"` when paired with visible text. No `aria-label` on decorative icons.                                  |
| Focusable elements | Only real interactive elements (anchors). No focusable wrappers on non-interactive cards.                                 |
| Tab order          | Logical: CTA links → Footer links → Utility page back-home link                                                           |

## 5. Responsive Strategy

| Breakpoint        | CTA section                                         | Footer                                                    | Utility pages                                                                      |
| ----------------- | --------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Mobile (<640px)   | Actions stack vertically; full-width gutters (16px) | Brand/tagline stacked above links; links stack vertically | Section keeps 16px gutters; readable column width; no horizontal overflow          |
| Desktop (>=640px) | Actions align as a pair in a row                    | Brand/tagline on left, links on right in a row            | Section max-width content (1200px) with centered column; comfortable reading width |

- All interactive elements must meet or approach 48px touch target height.
- FEAT-008 handles broader responsive optimization; FEAT-007 baseline mobile usability only.

## 6. Test Strategy

### 6.1 Unit/Component Tests (Phase 2 and 7)

| Test area                    | Coverage                                                                                   | Source                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Constants contract           | Exact copy, mailto fields, footer links, utility routes, placeholder values                | `tests/unit/landing.test.tsx` — `describe("FEAT-007 Constants")` |
| FinalCtaSection render       | Section renders with id, heading, description, two CTAs, placeholder note, no border-white | `tests/unit/landing.test.tsx` — `describe("FinalCtaSection")`    |
| Footer render                | Footer landmark, brand text, tagline, three links, label-sm typography, hover class        | `tests/unit/landing.test.tsx` — `describe("Footer")`             |
| Utility page render          | h1, status message, copy, back-home link, Section/Card usage                               | `tests/unit/landing.test.tsx` — `describe("UtilityPageShell")`   |
| No border-white              | All FEAT-007 components avoid border-white classes                                         | Per-component assertions                                         |
| Decorative icons aria-hidden | Material Symbol spans have `aria-hidden="true"`                                            | Per-component assertions                                         |

### 6.2 E2E/Browser Tests (Phase 7)

| Scenario                                            | Feature file             | Coverage                                                                                |
| --------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------- |
| Final CTA renders with Sovereign Shield styling     | `footer-section.feature` | Heading, two CTAs, mailto href, placeholder note, no white borders, CTA button variants |
| Footer renders with brand, tagline, and legal links | `footer-section.feature` | Footer element, brand, tagline, three links, label-sm typography, surface bg            |
| Utility page uses Sovereign Shield styling          | `footer-section.feature` | Surface colors, pending-review message, back-home link                                  |
| Utility pages expose placeholder content            | `footer-section.feature` | Privacy, Terms, Security pages with pending-review messages                             |

### 6.3 Constants-Driven Testing

- Tests must import and assert against typed constants rather than duplicating literal strings.
- Mailto href verification: assert the generated href matches the expected encoding from constants.
- No hardcoded route, copy, mailto, or CTA href literals in tests when the value exists in constants.

## 7. Visual Language Compliance

| Rule                          | Enforcement                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------- |
| No `border-white`             | Assertions in unit and E2E tests                                                            |
| Tonal surfaces for separation | Use `bg-surface-container`, `bg-surface-container-lowest` for separation                    |
| Glow card for CTA section     | `rounded-[2rem]` or `rounded-xl` with `glow-subtle` equivalent, not heavy nested borders    |
| Label-sm typography           | Footer links: JetBrains Mono, 12px, uppercase via CSS; source text in title case            |
| Button styling                | Primary: purple bg for mailto CTA; secondary: `surface-container-high` bg for overview CTA  |
| Decorative icons              | Material Symbols with `aria-hidden="true"` when paired with visible text                    |
| Hover states                  | Footer links: `hover:text-primary` transition; CTA buttons follow Button component contract |

## 8. Implementation Phase Sequence

| Phase      | Focus                                                                  | Entry Gate               |
| ---------- | ---------------------------------------------------------------------- | ------------------------ |
| Phase 0 ✅ | Health check                                                           | —                        |
| Phase 1 ✅ | Planning analysis                                                      | Planning report created  |
| Phase 2    | Data layer: typed constants + tests                                    | Planning report complete |
| Phase 3    | Business logic: pure mailto helpers (if needed)                        | Constants in place       |
| Phase 4    | Presentation logic: FinalCtaSection, Footer, UtilityPageShell          | Constants/helpers done   |
| Phase 5    | UI: styling, glow card, responsive layout, hover/focus                 | Components in place      |
| Phase 6    | Integration: homepage composition, routes, barrel exports              | Styled components ready  |
| Phase 7    | Testing/polish: unit, E2E, format, verification                        | Integration complete     |
| Phase 8    | Final checkpoint: verify traceability, evidence, code review readiness | Testing complete         |

## 9. Contract Change Policy

If implementation reality changes any contract in this document:

1. Update this planning-analysis-report.md.
2. Flag the change in the current phase evidence.
3. Notify downstream phases via their phase file "Source context used" section.

## 10. Open Decisions (None Remaining)

All content, route, accessibility, responsive, and test contracts are resolved from the design docs. No decisions remain open.
