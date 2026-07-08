# Wireframes Design — FEAT-007 Footer, Utility Pages and Contact Path

**Feature:** FEAT-007 — Footer, Utility Pages and Contact Path  
**Project:** HushVoting Website  
**Status:** Designed  
**Date:** 2026-07-08

## Design Intent

FEAT-007 completes the first public landing-page journey by adding:

1. a final conversion CTA anchored at `#pilot-access`;
2. a stable footer with HushVoting/HushNetwork product context and utility links;
3. three launch-safe utility pages for privacy, terms, and security audit status;
4. a conservative mailto contact path instead of an unowned contact form.

The experience should feel like the natural endpoint of the Sovereign Shield homepage: calm, credible, spacious, and precise. It must not look like a legal/compliance surface is finalized when it is only scaffolded for launch review.

## Recommended Component Boundary

```text
src/components/landing/constants.ts
  // add FEAT-007 typed constants:
  // FINAL_CTA_SECTION, PILOT_ACCESS_MAILTO, DOWNLOAD_OVERVIEW_CTA,
  // FOOTER_LINKS, UTILITY_PAGES

src/components/landing/FinalCtaSection.tsx
src/components/landing/Footer.tsx
src/components/landing/index.ts

src/components/utility/UtilityPage.tsx          // optional shared utility page shell
src/routes/privacy.tsx
src/routes/terms.tsx
src/routes/security.tsx

src/routes/index.tsx                            // thin homepage composition only
tests/unit/landing.test.tsx                     // or split FEAT-007 static tests
tests/e2e/features/footer-section.feature
tests/e2e/footer-section.spec.ts
```

The homepage route should remain a composition point:

```tsx
<Header />
<main>
  <HeroSection />
  <TrustModelSection />
  <RoleWorkflowSection />
  <ProtocolEvidenceSection />
  <PlatformReadinessSection />
  <FinalCtaSection />
</main>
<Footer />
```

The footer may live outside `<main>` as the document-level footer landmark. The CTA section belongs inside `<main>` because it is page content.

## Data Contract Wireframe

Implement typed constants before components so tests and UI share one source of truth.

```ts
export const FINAL_CTA_SECTION = {
  id: "pilot-access",
  heading: "Bring protocol-bound voting to your organization.",
  description:
    "Secure, private, and mathematically verifiable governance at scale.",
  placeholderNote:
    "Pilot access requests currently open an email draft while onboarding is reviewed.",
  actions: {
    pilotAccess: { label: "Request pilot access", variant: "primary" },
    downloadOverview: { label: "Download overview", variant: "secondary" },
  },
} as const;

export const PILOT_ACCESS_MAILTO = {
  to: "hello@hushvoting.com",
  subject: "HushVoting pilot access request",
  body: [
    "Hello HushVoting team,",
    "",
    "We are interested in pilot access for HushVoting. Please share the next review steps.",
    "",
    "Organization:",
    "Name:",
    "Role:",
    "Use case:",
  ].join("\r\n"),
} as const;

export const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security Audit", href: "/security" },
] as const;

export const UTILITY_PAGES = {
  privacy: {
    route: "/privacy",
    title: "Privacy Policy",
    status: "Launch placeholder — final review pending.",
    body: "The final HushVoting privacy policy is pending legal and privacy review. This public website currently provides launch scaffold content and does not represent finalized privacy-policy approval.",
  },
  terms: {
    route: "/terms",
    title: "Terms of Service",
    status: "Launch placeholder — final review pending.",
    body: "The final HushVoting terms of service are pending legal review. This placeholder page is not a finalized service agreement and should not be treated as approved terms.",
  },
  security: {
    route: "/security",
    title: "Security Audit",
    status: "Launch placeholder — final review pending.",
    body: "Security-audit references for HushVoting are pending review. This placeholder page does not represent completed audit certification or final security approval.",
  },
} as const;
```

If the owner supplies a different contact inbox, subject/body, or overview target, update these constants before implementation tests are written.

## Section 1 — Final CTA

### Section boundary

```tsx
<section
  id="pilot-access"
  aria-labelledby="pilot-access-heading"
  className="section-anchor ..."
>
  <div className="content shell">
    <div className="cta glow card">
      <h2 id="pilot-access-heading">...</h2>
      <p>...</p>
      <p className="placeholder note">...</p>
      <div className="actions">
        <Button-like anchor href="mailto:...">Request pilot access</Button-like anchor>
        <Button-like anchor/button>Download overview</Button-like anchor/button>
      </div>
    </div>
  </div>
</section>
```

### Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ main                                                                       │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ bg-surface-container, rounded-[2rem], glow-subtle                    │  │
│  │                                                                      │  │
│  │        Bring protocol-bound voting to your organization.             │  │
│  │        Secure, private, and mathematically verifiable governance      │  │
│  │        at scale.                                                     │  │
│  │                                                                      │  │
│  │        Launch/contact note: email draft while onboarding is reviewed │  │
│  │                                                                      │  │
│  │        [ Request pilot access ]   [ Download overview ]              │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Tablet wireframe

```text
┌──────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────┐ │
│ │ Bring protocol-bound voting...           │ │
│ │ Secure, private, and mathematically...   │ │
│ │ Placeholder/contact note                 │ │
│ │                                          │ │
│ │ [ Request pilot access ]                 │ │
│ │ [ Download overview ]                    │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

### Mobile wireframe

```text
┌────────────────────────────┐
│ Bring protocol-bound        │
│ voting to your              │
│ organization.               │
│                             │
│ Secure, private, and        │
│ mathematically verifiable   │
│ governance at scale.        │
│                             │
│ Pilot access requests       │
│ currently open an email     │
│ draft while onboarding is   │
│ reviewed.                   │
│                             │
│ [ Request pilot access ]    │
│ [ Download overview ]       │
└────────────────────────────┘
```

### Visual rules

- Top-level section uses standard homepage horizontal padding and `section-anchor`.
- Card uses `bg-surface-container` with a large radius: `rounded-[2rem]` or `rounded-xl` if project conventions prefer token radius.
- Apply `glow-subtle` or equivalent CSS-only atmospheric glow.
- Do **not** add `border-white`, white outlines, or heavy nested card layers.
- If a border is necessary, only use a very low-opacity primary accent and document it; preferred design is no structural border.
- Heading uses `headline-lg`/Hanken Grotesk.
- Description uses `body-lg` and `on-surface-variant`.
- Placeholder note uses `label-sm` or `body-md` with `on-surface-variant`; it must remain readable, not hidden.

### Actions

#### Request pilot access

```text
Element: <a>
Visible text: Request pilot access
href: mailto generated from PILOT_ACCESS_MAILTO constants
Visual variant: Button primary
Accessible name: Request pilot access
```

Use link semantics because activation navigates to a mail client. Do not render `<button>` for the mailto action.

#### Download overview

```text
Element: <a> if there is an approved target; otherwise a documented safe interim control
Visible text: Download overview
Visual variant: Button secondary
```

Refinement must resolve the target. Preferred behavior is an approved static asset with `download`. If no asset exists, do not silently create a broken `href="#"`; document the safe interim behavior in constants and tests.

## Section 2 — Footer

### Section boundary

```tsx
<footer className="bg-surface-container-lowest ...">
  <div className="footer shell">
    <div className="brand column">
      <BrandMark /> or brand text
      <p>HushVoting! is a product of HushNetwork.</p>
    </div>
    <nav aria-label="Footer">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
      <a href="/security">Security Audit</a>
    </nav>
  </div>
</footer>
```

### Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ bg-surface-container-lowest                                                │
│                                                                            │
│ HushVoting!                                      PRIVACY POLICY  TERMS OF  │
│ HushVoting! is a product of HushNetwork.        SERVICE  SECURITY AUDIT   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Mobile wireframe

```text
┌────────────────────────────┐
│ HushVoting!                 │
│ HushVoting! is a product    │
│ of HushNetwork.             │
│                             │
│ PRIVACY POLICY              │
│ TERMS OF SERVICE            │
│ SECURITY AUDIT              │
└────────────────────────────┘
```

### Footer link typography

Footer link text must visually use Sovereign Shield label-sm:

```text
font-family: JetBrains Mono
font-size: 12px
font-weight: 500
line-height: 16px
letter-spacing: 0.05em
text-transform: uppercase
color: on-surface-variant
hover: text-primary
```

The source label should remain title case in constants (`Privacy Policy`) so accessible names and tests can query natural labels. Apply uppercase via CSS.

## Section 3 — Utility Pages

### Shared page shell

```tsx
<main>
  <Section as="section" className="min-h-screen ...">
    <Card className="utility page card">
      <a href="/">← Back to home</a>
      <p className="status label">Launch placeholder — final review pending.</p>
      <h1>{page.title}</h1>
      <p>{page.body}</p>
      <p className="scope note">
        This page is part of the public website scaffold...
      </p>
    </Card>
  </Section>
</main>
```

Use existing `Section` and `Card` primitives. The utility page shell can be shared to prevent copy/styling drift.

### Privacy page wireframe

```text
/privacy
┌────────────────────────────────────────────────────────────┐
│ [← Back to home]                                           │
│                                                            │
│ LAUNCH PLACEHOLDER — FINAL REVIEW PENDING.                 │
│                                                            │
│ Privacy Policy                                             │
│                                                            │
│ The final HushVoting privacy policy is pending legal and   │
│ privacy review. This public website currently provides     │
│ launch scaffold content and does not represent finalized   │
│ privacy-policy approval.                                  │
└────────────────────────────────────────────────────────────┘
```

### Terms page wireframe

```text
/terms
┌────────────────────────────────────────────────────────────┐
│ [← Back to home]                                           │
│                                                            │
│ LAUNCH PLACEHOLDER — FINAL REVIEW PENDING.                 │
│                                                            │
│ Terms of Service                                           │
│                                                            │
│ The final HushVoting terms of service are pending legal    │
│ review. This placeholder page is not a finalized service   │
│ agreement and should not be treated as approved terms.     │
└────────────────────────────────────────────────────────────┘
```

### Security page wireframe

```text
/security
┌────────────────────────────────────────────────────────────┐
│ [← Back to home]                                           │
│                                                            │
│ LAUNCH PLACEHOLDER — FINAL REVIEW PENDING.                 │
│                                                            │
│ Security Audit                                             │
│                                                            │
│ Security-audit references for HushVoting are pending       │
│ review. This placeholder page does not represent completed │
│ audit certification or final security approval.            │
└────────────────────────────────────────────────────────────┘
```

### Utility page visual rules

- Use page background `bg-surface`.
- Use a single calm card or panel; do not place heavy cards inside heavy cards.
- Use `bg-surface-container` for the primary content panel.
- Use `on-surface` for heading, `on-surface-variant` for body copy.
- Status label can use `label-sm` and `primary`/`secondary` text treatment.
- Back-home link should use `hover:text-primary` and visible focus treatment.
- No `border-white`.

## Interaction Behavior

### Mailto generation

Generate `mailto:` from constants:

```text
mailto:hello@hushvoting.com?subject=HushVoting%20pilot%20access%20request&body=Hello%20HushVoting%20team%2C...
```

Implementation should use `encodeURIComponent` for subject and body rather than hand-encoding strings in JSX. Tests can assert:

- href starts with `mailto:`;
- href contains encoded subject;
- href contains encoded body fields;
- accessible name is `Request pilot access`.

### Footer navigation

Footer links may be native anchors or TanStack Router `Link` components. If using router links, ensure they render real anchor elements and work in SSR output.

### Back-home navigation

Each utility page includes a visible link back to `/` with accessible name such as `Back to home` or `Return home`.

## Responsive and Edge-State Expectations

| State                 | Expected behavior                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Desktop               | CTA actions appear side by side; footer brand/tagline left and links right; utility pages centered in a readable width.      |
| Tablet                | CTA actions may remain row or stack based on available width; footer links wrap without overlap.                             |
| Mobile                | CTA actions stack with 48px minimum touch target; footer stacks; utility page uses mobile margin and no horizontal overflow. |
| Keyboard              | Tab order follows visible order; focus rings are visible on CTA links, footer links, and back-home link.                     |
| Hover                 | CTAs and footer links receive tonal/text color changes only; no hidden content.                                              |
| CSS missing           | Visual-language baseline must fail; do not accept feature if CSS variables and body surface are unresolved.                  |
| No overview asset     | Do not ship a broken download. Use a documented safe interim target or owner-provided asset.                                 |
| Legal content pending | Pages remain explicit placeholders; no final legal/security approval language.                                               |

## Test Planning Hints for Refinement

- Unit/component tests should import constants and assert:
  - final CTA id, heading, description, two actions;
  - mailto href generation from constants;
  - footer links count, labels, and routes;
  - utility page route/copy definitions;
  - absence of `border-white` in FEAT-007 components.
- E2E tests should cover:
  - homepage CTA heading and `#pilot-access` id;
  - primary CTA is a mailto link;
  - visible placeholder/subject-to-review copy;
  - footer brand/tagline/legal links;
  - footer computed background `rgb(5, 14, 29)`;
  - `/privacy`, `/terms`, `/security` render pending-review copy and back-home link.
- Keep FEAT-007 E2E in a small block (`@FEAT-007`), not as one giant E2E suite.

## Implementation Non-Goals

- Do not build a contact form.
- Do not add backend APIs.
- Do not implement account creation, election execution, verifier execution, or evidence lookup.
- Do not author final legal/privacy/terms/security content.
- Do not move the feature to Ready To Develop or create phase files from this design step.
