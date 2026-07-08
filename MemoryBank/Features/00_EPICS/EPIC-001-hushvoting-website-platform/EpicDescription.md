# EPIC-001: HushVoting Website Platform and Initial Design

| Field              | Value                                                                             |
| ------------------ | --------------------------------------------------------------------------------- |
| Epic ID            | EPIC-001                                                                          |
| State | InProgress |
| Created            | 2026-07-08                                                                        |
| Target Completion  | TBD - define during planning                                                      |
| Owner              | TBD                                                                               |
| Priority           | Critical                                                                          |
| External Reference | hush-voting-website README.md, Prototype Overview, Sovereign Shield Design System |

## Executive Summary

Build the public-facing HushVoting website (www.hushvoting.com) — the product surface that explains the HushVoting! privacy-first organizational voting platform to prospective organizations, voters, trustees, and auditors. The website establishes the technology platform, design system, and initial marketing/informational pages. It serves as the authoritative public entry point for the HushVoting product while authenticated election workflows live in the separate HushVoting web client (app.hushvoting.com).

This EPIC covers two dimensions in parallel: (1) establishing the full-stack technology platform including framework decision, build tooling, CI/CD, and AWS deployment, and (2) implementing the initial website design based on the Sovereign Shield design system and the approved prototype.

## Problem Statement

HushVoting currently has no public-facing web presence. The product's sophisticated privacy-first, protocol-bound voting technology — Protocol Omega — has no surface to explain its trust model, role structure, cryptographic guarantees, and deployment readiness to prospective organizations. Without a website:

- Organizations researching governed remote voting solutions cannot discover HushVoting.
- The trust model hierarchy (HushVoting application layer on HushNetwork blockchain foundation) has no public explanatory surface.
- Protocol Omega's evidence, verifier, and audit capabilities are invisible to decision-makers.
- There is no entry point for pilot access requests or organizational onboarding.
- The HushNetwork ecosystem lacks a dedicated product page for one of its flagship offerings.

## Success Criteria

- [ ] The website is publicly deployed at www.hushvoting.com with CD pipeline in place.
- [ ] All pages render the HushVoting Sovereign Shield design system consistently (colors, typography, spacing, components).
- [ ] The landing page communicates the product value proposition, trust model hierarchy, role structure, protocol evidence capabilities, and platform readiness.
- [x] TanStack Start is initialized in the scaffold, pinned to a specific RC version, with React Router v7 fallback documented.
- [ ] CI/CD pipeline validates builds, runs tests, and deploys to AWS on tag push.
- [ ] The website is fully responsive: desktop, tablet, and mobile render correctly.
- [ ] Navigation to sections (Trust Model, Roles, Protocol Evidence, Platform) works via anchor links and the top nav bar.
- [ ] Footer with Privacy Policy, Terms of Service, and Security Audit links is present.
- [ ] Contact / pilot access CTA surfaces are functional (even if only as mailto or contact-form scaffold).

## Implementation Posture

**Formal new implementation.** This is greenfield work. The repository exists with project metadata and a prototype HTML/CSS design, but there is no framework scaffold, build tooling, deployment pipeline, or production code. Everything from project scaffolding to deployment must be built from scratch.

The design exists as a high-fidelity HTML prototype (`MemoryBank/Overview/Prototype/`) using Tailwind CSS with a CDN script. Production implementation must convert this to proper Tailwind configuration, component structure, and framework routing.

## Features Breakdown

| Feature ID | Title                                           | Status      | Dependencies | Priority |
| ---------- | ----------------------------------------------- | ----------- | ------------ | -------- |
| FEAT-001   | Project Scaffolding & Build Infrastructure      | COMPLETED   |              |          |
| FEAT-002   | Design System Implementation (Sovereign Shield) | COMPLETED   | FEAT-001     |          |
| FEAT-003   | Hero Section and Navigation                     | COMPLETED   | FEAT-002     |          |
| FEAT-004   | Trust Model Hierarchy Section                   | SUBMITTED   |              |          |
| FEAT-005   | Role Workflow Section                           | SUBMITTED   |              |          |
| FEAT-006   | Protocol Evidence and Platform Readiness        | SUBMITTED   |              |          |
| FEAT-007   | Footer, Utility Pages and Contact Path          | SUBMITTED   |              |          |
| FEAT-008   | Responsive Design and Mobile Optimization       | SUBMITTED   |              |          |
| TBD        | CI/CD and AWS Deployment Pipeline               | SUBMITTED   | FEAT-001     | P1       |

> Feature IDs are assigned when created via the future `create-epic-features` or `submit-feature` workflow.

## Epic Progress

**State:** InProgress
**Progress:** 33% (3/9 features complete)

| Status      | Count | Features                                                                           |
| ----------- | ----- | ---------------------------------------------------------------------------------- |
| Completed   | 3     | FEAT-001 Project Scaffolding, FEAT-002 Design System, FEAT-003 Hero Section and Nav |
| In Progress | 0 | -                                                                                  |
| Ready       | 0     | -                                                                                  |
| Submitted   | 5 | Trust Model, Roles, Protocol Evidence, Footer/Utility, Responsive, CI/CD           |

## Dependency Flow Diagram

```mermaid
flowchart TD
    subgraph "EPIC-001: HushVoting Website Platform & Initial Design"
        direction TB
        F1["FEAT: Project Scaffolding & Build Infrastructure"]
        F2["FEAT: Design System Implementation"]
        F3["FEAT: Hero Section and Navigation"]
        F4["FEAT: Trust Model Hierarchy Section"]
        F5["FEAT: Role Workflow Section"]
        F6["FEAT: Protocol Evidence & Platform Readiness"]
        F7["FEAT: Footer, Utility Pages & Contact"]
        F8["FEAT: Responsive Design & Mobile Optimization"]
        F9["FEAT: CI/CD and AWS Deployment"]

        F1 --> F2
        F1 --> F9
        F2 --> F3
        F2 --> F4
        F2 --> F5
        F2 --> F6
        F3 --> F7
        F3 --> F8
        F4 --> F8
        F5 --> F8
        F6 --> F8
        F7 --> F8
    end

        F10[Project Scaffolding & Build Infrastructure]
        F11[Design System Implementation (Sovereign Shield)]
        F12[Hero Section and Navigation]
        F13[Trust Model Hierarchy Section]
        F14[Role Workflow Section]
        F15[Protocol Evidence and Platform Readiness]
        F16[Footer, Utility Pages and Contact Path]
        F17[Responsive Design and Mobile Optimization]

    class F10 completed
    class F11 completed
    class F12 completed
    class F13 notStarted
    class F14 notStarted
    class F15 notStarted
    class F16 notStarted
    class F17 notStarted
    classDef notStarted fill:#6c757d,color:white,stroke:#495057
    classDef designed fill:#6c757d,color:white,stroke:#17a2b8
    classDef ready fill:#6c757d,color:white,stroke:#28a745
    classDef inProgress fill:#ffc107,color:black,stroke:#e0a800
    classDef completed fill:#28a745,color:white,stroke:#1e7e34
    classDef cancelled fill:#dc3545,color:white,stroke:#c82333

    class F1 completed
    class F2 completed
    class F3 completed
    class F4 notStarted
    class F5 notStarted
    class F6 notStarted
    class F7 notStarted
    class F8 notStarted
    class F9 designed
```

## Feature Details

### Feature 1: Project Scaffolding & Build Infrastructure (FEAT-001)

**User Story:** Initialize a TanStack Start (RC) project scaffold with pnpm, Tailwind CSS configured with Sovereign Shield design tokens, TypeScript strict mode, ESLint/Prettier, and package.json scripts (dev, build, start, test:unit, test:e2e:happy-path). Set up directory structure and README conventions. Pin a specific TanStack Start RC version and document React Router v7 fallback criteria.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 2: Design System Implementation (Sovereign Shield) (FEAT-002)

**User Story:** Implement a reusable component library and Tailwind CSS configuration using all Sovereign Shield design tokens from DESIGN.md: color tokens, typography scales, spacing, border radius. Build Button (primary/secondary/ghost), Section, Card, InsetWell, MetricCard, StatusChip, IconLabel components. Follow HushVoting Visual Language rules. Document usage in STYLEGUIDE.md.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 3: Hero Section and Navigation (FEAT-003)

**User Story:** Implement the top navigation bar (fixed, blur backdrop, section anchors, Pilot Access CTA) and hero section with brand mark, headline, subheadline, two CTAs, and purple glow effect.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 4: Trust Model Hierarchy Section (FEAT-004)

**User Story:** Build the Trust Model Hierarchy section with an eyebrow label, headline, two layered cards (HushVoting! and HushNetwork), capability chips and trust labels, gradient connector, and subtle glow.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 5: Role Workflow Section (FEAT-005)

**User Story:** Create the Role Workflow section with four responsive role cards: Organizations, Voters, Trustees, Auditors, each with Material Symbol icon, title, and description.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 6: Protocol Evidence and Platform Readiness (FEAT-006)

**User Story:** Implement the Protocol Evidence section with left column Protocol Omega description and right column 6 evidence category items in a 2x3 grid with inset wells, plus the Platform Readiness section with 3 deployment cards and a horizontal claim boundary bar with badges.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 7: Footer, Utility Pages and Contact Path (FEAT-007)

**User Story:** Build the footer with branding, tagline, legal links, and a final CTA section above it; scaffold utility pages for Privacy Policy, Terms of Service, Security Audit; implement contact path with mailto or form scaffold.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 8: Responsive Design and Mobile Optimization (FEAT-008)

**User Story:** Ensure all sections and navigation are fully responsive and optimized for mobile, tablet, and desktop with proper touch targets, typography scaling, and layout adjustments.

**Scope:** Generated from EPIC EPIC-001 - HushVoting Website Platform and Initial Design.
**Backlink:** - EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
**Dependencies:** None

### Feature 1: Project Scaffolding & Build Infrastructure

**User Story:** As a HushVoting developer, I want a working project scaffold with the selected React framework, Tailwind CSS, pnpm package management, TypeScript configuration, and a valid `package.json` with build/dev/test scripts so that the team can begin implementing pages immediately.

**Scope:**

- Initialize with **TanStack Start** (RC) as the full-stack React framework (confirmed decision, see `MemoryBank/Overview/TechDecision-Framework-Selection.md`).
- Initialize the project with `pnpm` as the package manager.
- Configure Tailwind CSS with the Sovereign Shield design tokens (colors, typography, spacing, border radius from the DESIGN.md specification).
- Set up TypeScript with strict mode.
- Configure ESLint and Prettier for code quality.
- Define `package.json` scripts: `dev`, `build`, `start`, `test:unit`, `test:e2e:happy-path`.
- Create `README.md` conventions for local development workflow.
- Set up project directory structure (pages, components, styles, public assets).
- Add Material Symbols font integration reference.

**Dependencies:** None

### Feature 2: Design System Implementation (Sovereign Shield)

**User Story:** As a designer, I want the Sovereign Shield design tokens (colors, typography, spacing, shapes) implemented as a reusable Tailwind CSS configuration and component library so that all website sections share consistent visual language without duplicating styles.

**Scope:**

- Implement full Tailwind CSS configuration from the Sovereign Shield `DESIGN.md`:
  - All color tokens (surface tiers, primary, secondary, tertiary, error, outline, inverse).
  - Typography scales (display-lg, headline-lg, headline-md, body-lg, body-md, label-md, label-sm) with correct font families (Hanken Grotesk, JetBrains Mono).
  - Spacing scale (base 4px → xs 8px, sm 16px, md 24px, lg 40px, xl 64px, gutter 24px).
  - Border radius scale.
- Create reusable UI components:
  - `Button` (primary, secondary, ghost variants).
  - `Section` (standard section shell with optional heading).
  - `Card` (surface-container elevated card with optional border).
  - `InsetWell` (darker inset area for values, metrics, code blocks).
  - `MetricCard` (label + dark value well for metrics).
  - `StatusChip` (pill-shaped status indicators).
  - `IconLabel` (Material Symbol + text combination).
- Follow HushVoting Visual Language rules (from EPIC-013 design baseline):
  - Prefer complementary surface colors over white outline borders.
  - Use borders only for focus, selected, warning, or error states.
  - Avoid stacking visually heavy cards inside visually heavy cards.
- Document component usage in a `STYLEGUIDE.md`.

**Dependencies:** Feature 1 (Project Scaffolding)

### Feature 3: Hero Section and Navigation

**User Story:** As a visiting organization representative, I want an impactful hero section and clear navigation so that I immediately understand what HushVoting does and can explore sections easily.

**Scope:**

- **Top Navigation Bar:**
  - HushVoting! brand logo/name (left).
  - Section anchor links: Trust Model, Roles, Protocol Evidence, Platform (center on desktop, hamburger on mobile).
  - "Pilot Access" CTA button (right).
  - Fixed/sticky positioning.
  - Blur backdrop effect.
- **Hero Section:**
  - HushVoting! brand mark/logo (large, centered).
  - Headline: "Governed remote voting for serious organizations."
  - Subheadline: product value proposition.
  - Two CTAs: "Request pilot access" (primary) and "View verifier model" (secondary).
  - Subtle purple glow/bloom effect behind the logo.
- **Background:** Deep surface color (#091422) with primary glow.

**Dependencies:** Feature 2 (Design System)

### Feature 4: Trust Model Hierarchy Section

**User Story:** As a prospective customer, I want to understand the trust architecture — how HushVoting application guarantees sit on top of HushNetwork's blockchain and cryptographic foundation.

**Scope:**

- Section with label eyebrow: "Foundational Integrity."
- Section headline: "The Trust Model Hierarchy."
- **Top Layer Card (HushVoting!):**
  - Application Interface & Orchestration Layer.
  - Four capability chips: Eligibility, Participation, Private Choice, Artifacts.
  - Primary purple border accent.
- **Visual connector** (gradient vertical line between layers).
- **Bottom Layer Card (HushNetwork):**
  - The Trust, Privacy, and Blockchain Foundation.
  - Three label badges: ZERO-KNOWLEDGE PROOFS, IMMUTABLE LEDGER, ENCRYPTED SHARDS.
  - Secondary color theme.
- Subtle glow effect on top card.
- Responsive: stacked on mobile, side-by-side on desktop.

**Dependencies:** Feature 2 (Design System)

### Feature 5: Role Workflow Section

**User Story:** As a site visitor, I want to see the four participant roles in HushVoting elections so that I understand who does what.

**Scope:**

- Four role cards in a responsive grid (1 col mobile, 2 col tablet, 4 col desktop).
- **Organizations:** Create and govern election parameters, define voter rolls, establish timing protocols.
- **Voters:** Securely claim eligibility through private ID providers and cast cryptographically masked ballots.
- **Trustees:** Approve governed actions and manage distributed decryption keys.
- **Auditors:** Review protocol evidence and package integrity through the standalone verifier suite.
- Each card has:
  - Material Symbol icon (corporate_fare, groups, key, rule).
  - Role title (headline-md).
  - Description.
  - Hover effect (border highlight).
- Cards use `surface-container-high` background with subtle border.

**Dependencies:** Feature 2 (Design System)

### Feature 6: Protocol Evidence and Platform Readiness

**User Story:** As a technical evaluator, I want to see the Protocol Omega evidence categories and the platform deployment readiness so that I can assess the product's technical maturity.

**Scope:**

- **Protocol Evidence Section:**
  - Left column: "Protocol Omega" headline, description text, verified badge.
  - Right column: 6 evidence category items in a 2x3 grid:
    - Election record, Trustee evidence, Publication proof.
    - Receipt verification, Standalone verifier, Final result package.
  - Each item: icon + uppercase label in an inset well.
- **Platform Readiness Section:**
  - Headline: "Universal Deployment Readiness."
  - 3 deployment cards:
    - PWA-First (Zero-install accessibility).
    - Electrobun-Ready (Native binaries).
    - Mobile Native (Capacitor-wrapped native performance).
  - Each card: icon + title + description.
- **Claim Boundary Bar:**
  - Horizontal bar with claim badges: "Designed for organizational remote voting", "Privacy-first", "Verifiable outcomes", "Audit-ready evidence packages", "Enabled by HushNetwork".
  - Filled shield/check icons.
- Protocol Evidence section has a full-width background band (`surface-container-low`) for visual separation.

**Dependencies:** Feature 2 (Design System)

### Feature 7: Footer, Utility Pages and Contact Path

**User Story:** As a site visitor, I want to find legal information, security details, and a way to contact the HushVoting team.

**Scope:**

- **Footer:**
  - HushVoting! brand.
  - Tagline: "HushVoting! is a product of HushNetwork."
  - Links: Privacy Policy, Terms of Service, Security Audit.
  - Responsive: stacked on mobile, side-by-side on desktop.
- **Final CTA Section (above footer):**
  - Background container card with glow.
  - Headline: "Bring protocol-bound voting to your organization."
  - Description text.
  - "Request pilot access" and "Download overview" buttons.
- **Utility Pages (scaffold):**
  - Privacy Policy page (static, placeholder or substantive).
  - Terms of Service page (static, placeholder or substantive).
  - Security Audit page / references.
- **Contact Path:**
  - "Request pilot access" CTA links (mailto or form scaffold).

**Dependencies:** Feature 3 (Hero Section and Navigation)

### Feature 8: Responsive Design and Mobile Optimization

**User Story:** As a mobile user, I want the website to be fully readable and navigable on my phone so that I can learn about HushVoting on any device.

**Scope:**

- Mobile-first responsive verification of all sections.
- Hamburger navigation menu on mobile.
- Touch target sizes ≥ 48px height for all interactive elements.
- Single-column stack on mobile for all multi-column layouts.
- Margin reduction to 16px on mobile (per Sovereign Shield spec).
- Typography scale adjustments for smaller screens.
- Image and logo sizing adjustments.
- Test on: iPhone SE, iPhone 14/15 Pro, Pixel 7, iPad, iPad Pro, desktop 1920x1080.

**Dependencies:** Features 3, 4, 5, 6, 7

### Feature 9: CI/CD and AWS Deployment Pipeline

**User Story:** As an operator, I want automated build, test, and deployment so that every tagged release reaches www.hushvoting.com without manual intervention.

**Scope:**

- GitHub Actions workflow for CI:
  - Run on push and PR.
  - Validate build (`pnpm build`).
  - Run unit tests (`pnpm test:unit`).
  - Run E2E happy-path tests (`pnpm test:e2e:happy-path`).
- GitHub Actions workflow for CD:
  - Trigger on tag `HushVotingWebsite-vMAJOR.MINOR.PATCH`.
  - Build Docker container with multi-stage build.
  - Push to `ghcr.io/hushnetwork-social/hush-voting-website:<version>`.
  - Deploy to AWS (per existing HushNetwork website deployment model).
  - Container name: `HushVotingWebSite`.
  - Local port: `127.0.0.1:3005`.
  - HTTP port: `80` (container).
- Configure GitHub secrets as documented in README.md:
  - `AWS_HOST`, `AWS_SSH_PRIVATE_KEY`, `AWS_SSH_USER`.
  - `GHCR_TOKEN`, `GHCR_USERNAME`.
  - Optional: SMTP contact form secrets.
- Follow existing HushNetwork CD scripts pattern (`scripts/github/set-aws-cd-secrets.sh`).

**Dependencies:** Feature 1 (Project Scaffolding)

## Technology Stack Summary

| Layer               | Technology                                         | Rationale                                                                |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| **Framework**       | TanStack Start (RC)                                | Confirmed. See `MemoryBank/Overview/TechDecision-Framework-Selection.md` |
| **Package Manager** | pnpm                                               | Fast, disk-efficient, strict dependency resolution                       |
| **CSS**             | Tailwind CSS v4+                                   | Utility-first, aligns with Sovereign Shield design tokens                |
| **Fonts**           | Hanken Grotesk + JetBrains Mono + Material Symbols | Typography and iconography per Sovereign Shield                          |
| **Language**        | TypeScript (strict)                                | Type safety across the full stack                                        |
| **Build Tool**      | Vite (via framework)                               | Fast HMR, fast builds (or Turbopack if Next.js chosen)                   |
| **Testing**         | Vitest (unit), Playwright (E2E)                    | Aligns with existing HushNetwork testing patterns                        |
| **Container**       | Docker (multi-stage)                               | Production deployment                                                    |
| **Hosting**         | AWS (per CD contract)                              | Follows existing HushNetwork deployment pattern                          |
| **CI/CD**           | GitHub Actions                                     | Existing HushNetwork CI infrastructure                                   |

## Wireframes (Design Reference)

This EPIC follows the landing page design established in the prototype at `MemoryBank/Overview/Prototype/`. The high-fidelity HTML prototype (`stitch_hushvoting_privacy_governance_platform_072026/hushvoting_landing_page/code.html`) serves as the primary design reference.

### Page Structure (Text Wireframe)

```
┌────────────────────────────────────────────────────┐
│ [HushVoting!]    Trust Model | Roles | Evidence | Platform    [Pilot Access] │  ← TopNavBar (fixed)
├────────────────────────────────────────────────────┤
│                                                    │
│                    [Logo]                          │  ← Hero Section
│  Governed remote voting for serious organizations  │     (min-h 80vh)
│  HushVoting! helps organizations run private,      │
│  auditable, protocol-bound votes...                │
│                                                    │
│  [Request pilot Access]  [View verifier model]     │
│                                                    │
├────────────────────────────────────────────────────┤
│  Foundational Integrity                            │  ← Trust Model Section
│  The Trust Model Hierarchy                         │
│                                                    │
│  ┌──────────────────────────────────────────┐      │
│  │ HushVoting! - Application Layer         │      │
│  │ [Eligibility] [Participation] [Private] │      │  ← Top Card (glow)
│  │ [Artifacts]                             │      │
│  └──────────────────────────────────────────┘      │
│           │ (gradient connector)                    │
│  ┌──────────────────────────────────────────┐      │
│  │ HushNetwork - Trust & Blockchain Layer  │      │  ← Bottom Card
│  │ ZK-PROOFS    IMMUTABLE LEDGER    SHARDS │      │
│  └──────────────────────────────────────────┘      │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │  ← Role Section
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ │     (4-column grid)
│  │Organiz.  │ │ Voters   │ │ Trustees │ │Audit.│ │
│  │ icon +   │ │ icon +   │ │ icon +   │ │icon+ │ │
│  │desc      │ │ desc     │ │ desc     │ │desc  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────┘ │
│                                                    │
├────────────────────────────────────────────────────┤  ← Protocol Evidence
│  Protocol Omega          │ [evidence grid 2x3]     │     (full-width bg band)
│  Description + verified  │ items with icons        │
│                                                    │
├────────────────────────────────────────────────────┤
│  Universal Deployment Readiness                     │  ← Platform Section
│  [PWA] [Electrobun] [Mobile Native]                │     (3-column grid)
│                                                    │
├────────────────────────────────────────────────────┤
│  [Claim badges bar - horizontal]                    │  ← Claim Boundary
│                                                    │
├────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────┐    │  ← Final CTA
│  │ Bring protocol-bound voting...             │    │     (glow card)
│  │ [Request pilot access]  [Download overview]│    │
│  └────────────────────────────────────────────┘    │
│                                                    │
├────────────────────────────────────────────────────┤
│  HushVoting!        Privacy Policy | Terms | Audit │  ← Footer
│  A product of HushNetwork                          │
└────────────────────────────────────────────────────┘
```

### Mobile Layout (Stacked)

```
┌─────────────────────┐
│ [≡] HushVoting!     │  ← Hamburger nav
├─────────────────────┤
│      [Logo]         │
│  Governed remote    │
│  voting for serious │
│  organizations      │
│                     │
│ [Request pilot]     │
│ [View verifier]     │
├─────────────────────┤
│ The Trust Model     │
│ Hierarchy           │
│ HushVoting! Layer   │
│ [chips]             │
│                     │
│ HushNetwork Layer   │
│ [badges]            │
├─────────────────────┤
│ Organizations       │
│ Voters              │
│ Trustees            │
│ Auditors            │
├─────────────────────┤
│ Protocol Omega      │
│ [evidence items     │
│  stacked]           │
├─────────────────────┤
│ Platform Readiness  │
│ [cards stacked]     │
├─────────────────────┤
│ Final CTA           │
├─────────────────────┤
│ Footer              │
└─────────────────────┘
```

### Key State Variants

| State                  | Behavior                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| **Loading**            | Skeleton components: nav bar + hero skeleton. Content sections appear progressively.        |
| **Empty**              | N/A (static marketing site; no user-generated content lists).                               |
| **Error**              | 404 page with HushVoting branding and "Return home" CTA. Network error fallback with retry. |
| **Mobile Nav Open**    | Full-screen overlay or slide-in drawer with section links + CTA button.                     |
| **Pilot Access Click** | Smooth scroll to contact form section OR open mailto link OR navigate to contact page.      |

## Out of Scope

- Authenticated election execution, ballot casting, or election management workflows (handled by hush-voting-web-client and hush-server-node).
- User account creation, authentication, or session management.
- A separate HushVoting backend server (the website may call hush-server-node APIs for live data in future EPICs, but this EPIC is static/SSR content).
- Live election data display, real-time verifier, or evidence lookup (future EPIC candidate).
- Blog or news section.
- Multi-language / i18n support.
- Analytics or cookie consent infrastructure (should be added but not blocking initial launch).

## Risks and Mitigations

| Risk                                                                     | Impact | Likelihood | Mitigation                                                                                                                                    |
| ------------------------------------------------------------------------ | ------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| TanStack Start RC instability during implementation                      | H      | M          | Pin to specific RC version. Have React Router v7 Framework Mode as fallback. Document fallback path in TechDecision doc.                      |
| Framework decision delay blocks scaffolding                              | H      | M          | Keep the decision window short. The TechDecision doc recommends TanStack Start with clear rationale. Owner confirmation should take ≤ 1 week. |
| AWS deployment differs from existing HushNetwork website pattern         | M      | L          | Use existing HushNetwork CD scripts as reference. The README.md already defines the CD contract.                                              |
| Design inconsistency with existing HushVoting web client visual language | M      | L          | Both follow the same Sovereign Shield design system and HushVoting Visual Language rules from the hush-memory-bank.                           |
| CI secrets not provisioned for new repo                                  | H      | L          | Document exact secrets needed in the EPIC. Provide copy-commands from README.md.                                                              |
| E2E test infrastructure not set up for static/marketing site             | L      | L          | E2E for a marketing site focuses on navigation, responsive layout, and CTA interactions — simpler than election workflows.                    |

## Progress Tracking

| Feature ID | Status      | Started    | Completed  | Notes                                      |
| ---------- | ----------- | ---------- | ---------- | ------------------------------------------ |
| TBD        | SUBMITTED   | -          | -          | Project Scaffolding & Build Infrastructure |
| TBD        | SUBMITTED   | -          | -          | Design System Implementation               |
| TBD        | SUBMITTED   | -          | -          | Hero Section and Navigation                |
| TBD        | SUBMITTED   | -          | -          | Trust Model Hierarchy Section              |
| TBD        | SUBMITTED   | -          | -          | Role Workflow Section                      |
| TBD        | SUBMITTED   | -          | -          | Protocol Evidence & Platform Readiness     |
| TBD        | SUBMITTED   | -          | -          | Footer, Utility Pages & Contact            |
| TBD        | SUBMITTED   | -          | -          | Responsive Design & Mobile Optimization    |
| TBD        | SUBMITTED   | -          | -          | CI/CD and AWS Deployment                   |
| FEAT-001   | COMPLETED   | 2026-07-08 | 2026-07-08 |                                            |
| FEAT-002   | COMPLETED   | 2026-07-08 | 2026-07-08 | Design system tokens, components, tests    |
| FEAT-003   | COMPLETED   | 2026-07-08 | 2026-07-08 | Hero section and navigation implementation   |
| FEAT-004   | SUBMITTED   | 2026-07-08 |            |                                            |
| FEAT-005   | SUBMITTED   | 2026-07-08 |            |                                            |
| FEAT-006   | SUBMITTED   | 2026-07-08 |            |                                            |
| FEAT-007   | SUBMITTED   | 2026-07-08 |            |                                            |
| FEAT-008   | SUBMITTED   | 2026-07-08 |            |                                            |

**Overall Progress:** 3/9 features complete (33%)

## Next Steps

1. **Framework Decision:** ✅ **Confirmed** — TanStack Start (RC) with React Router v7 fallback.
2. **Deep-Dive:** Run `deep-dive` for EPIC-001 to validate assumptions, clarify the framework decision timeline, and identify any hidden ownership gaps or testability concerns.
3. **Create Child FEATs:** Extract FEAT-001 through FEAT-009 from the Features Breakdown in priority order.
4. **Refine FEAT-001 (Scaffolding):** Move the first FEAT to Ready To Develop, including framework decision documentation and scaffold CLI commands.
5. **Design Confirmation:** Review the prototype HTML against the Sovereign Shield DESIGN.md to ensure the production Tailwind config will match.
6. **CI/CD Setup:** Begin CI/CD pipeline configuration in parallel with FEAT-002 (Design System) since it doesn't depend on all frontend pages being complete.

## References

- [README.md - Repository Context](../README.md)
- [Sovereign Shield DESIGN.md](../Overview/Prototype/stitch_hushvoting_privacy_governance_platform_072026/sovereign_shield/DESIGN.md)
- [Prototype HTML](../Overview/Prototype/stitch_hushvoting_privacy_governance_platform_072026/hushvoting_landing_page/code.html)
- [HushVoting Visual Language](../../../../hush-memory-bank/Features/00_EPICS/EPIC-013-protocol-omega-governed-remote-voting/HushVotingVisualLanguage.md)
- [EPIC-013 Design Baseline](../../../../hush-memory-bank/Features/00_EPICS/EPIC-013-protocol-omega-governed-remote-voting/DesignBaseline.md)
- [TechDecision: Framework Selection](../Overview/TechDecision-Framework-Selection.md)
- [HushNetwork CD Scripts](https://github.com/Hushnetwork-social/hush-website/tree/main/scripts/github)

## Hepha Deep-Dive Decisions

Recorded: 2026-07-08T10:05:40.980Z

Hepha applied these saved Deep-Dive answers directly because the full-document model rewrite did not finish.
Fallback reason: Source document is 32764 characters; deterministic update is used above 12000 characters.

### Feature extraction normalization

Question: The EPIC has duplicate feature sections and inconsistent counts/dependencies. Which structure should drive FEAT extraction?

Decision: **Normalize to nine FEATs** - Extract FEAT-001 through FEAT-009, including CI/CD, and reconcile counts/dependencies during refinement.

### Design source of truth

Question: What should be the authoritative design baseline for extracted FEAT acceptance criteria?

Decision: **Prototype plus token contract** - Use the prototype for layout/content while requiring production Tailwind tokens and HushVoting visual-language rules.

### Launch content ownership

Question: Before extraction, how should legal, security, pilot access, and download CTA content be scoped?

Decision: **Owner-approved launch placeholders** - Extract FEAT-007 with named approval owners and safe placeholder pages/CTA behavior blocking public launch until reviewed.
