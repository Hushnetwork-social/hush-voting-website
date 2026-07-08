# UX Research Report — FEAT-004: Trust Model Hierarchy Section

## Context and sources

This design is based on:

- `FeatureDescription.md` for FEAT-004.
- `EPIC-001-hushvoting-website-platform/EpicDescription.md`.
- The approved prototype section `#trust` in `MemoryBank/Overview/Prototype/.../hushvoting_landing_page/code.html`.
- Sovereign Shield token contract in `MemoryBank/Overview/Prototype/.../sovereign_shield/DESIGN.md`.
- HushVoting visual-language rules from `hush-memory-bank/Features/00_EPICS/EPIC-013-protocol-omega-governed-remote-voting/`.
- Completed FEAT-002/FEAT-003 design summaries and lessons learned.

## Target users and jobs

| User                                                              | Job in this section                                                                                                                                  | Design implication                                                                                                                 |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Prospective organization owner / evaluator                        | Quickly understand why HushVoting is not only a website/app, but a governed voting layer backed by HushNetwork foundations.                          | Use plain hierarchy copy and a clear two-layer visual model before protocol details appear later.                                  |
| Security, privacy, or compliance reviewer                         | See which guarantees belong to the application layer and which belong to the cryptographic/blockchain foundation.                                    | Separate HushVoting capabilities from HushNetwork foundation labels without implying a live verifier or backend flow in this FEAT. |
| Trustee, auditor, or technical stakeholder previewing the product | Recognize familiar trust concepts: eligibility, participation, private choice, artifacts, zero-knowledge proofs, immutable ledger, encrypted shards. | Use precise label/chip language and calm technical styling rather than marketing-heavy claims.                                     |
| Mobile visitor                                                    | Scan the trust model without needing a wide infographic.                                                                                             | Preserve a vertical hierarchy and wrap chips/badges cleanly.                                                                       |

## Primary workflow and entry points

1. Visitor lands on the homepage hero implemented by FEAT-003.
2. Visitor reaches the trust section by:
   - scrolling down from the hero; or
   - activating the existing `Trust Model` navigation link (`#trust`).
3. The section introduces the hierarchy with an eyebrow, heading, and concise explanatory copy.
4. The visitor reads the top HushVoting application layer card.
5. A decorative gradient connector signals dependency / foundation relationship.
6. The visitor reads the bottom HushNetwork foundation card.
7. The visitor continues to future sections (`#roles`, `#protocol`, `#platform`) when implemented by later FEATs.

## Content model

### Section identity

- Anchor: `#trust`.
- Eyebrow: `Foundational Integrity`.
- Heading: `The Trust Model Hierarchy`.
- Supporting copy should make the hierarchy explicit, for example:
  - `HushVoting! coordinates election eligibility, participation, private choice, and evidence artifacts on top of HushNetwork's privacy and blockchain foundation.`

The supporting copy is an inferred accessibility/readability improvement because the prototype heading alone names the section but does not explain the relationship required by the acceptance criteria.

### HushVoting! layer

- Title: `HushVoting!`.
- Subtitle: `The Application Interface & Orchestration Layer`.
- Capability chips:
  - `Eligibility` (`person_check` icon)
  - `Participation` (`how_to_vote` icon)
  - `Private Choice` (`security` icon)
  - `Artifacts` (`inventory_2` icon)

### HushNetwork layer

- Title: `HushNetwork`.
- Subtitle: `The Trust, Privacy, and Blockchain Foundation`.
- Trust labels:
  - `ZERO-KNOWLEDGE PROOFS`
  - `IMMUTABLE LEDGER`
  - `ENCRYPTED SHARDS`

## States and variants

| State               | UX requirement                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default             | Static SSR-rendered content is visible without user interaction. HushVoting card reads as the upper application layer; HushNetwork card reads as the foundation layer.     |
| Entry via `#trust`  | Fixed header must not cover the section heading. Use the same scroll-margin strategy established for homepage anchors.                                                     |
| Loading / hydration | No data loading is required. Content should render immediately from static constants. Avoid skeletons unless the whole page shell later adopts them.                       |
| Empty               | Not applicable: this is a fixed marketing section. If data arrays are accidentally empty during implementation, tests should fail rather than showing a vague empty state. |
| Disabled            | Not applicable: chips and trust labels are informational, not controls. They must not look clickable.                                                                      |
| Error               | No local error state is needed. Page-level route errors remain owned by existing TanStack Start boundaries.                                                                |
| Narrow mobile       | Cards stay stacked; internal card content stacks; chips and trust labels wrap into readable rows or a single column.                                                       |
| Tablet              | Cards remain vertically layered; internal card content may shift to two columns where space allows.                                                                        |
| Desktop             | Preserve the vertical trust hierarchy while allowing each card's text block and chips/labels to sit in a horizontal row.                                                   |
| Reduced motion      | Glow/connector effects are static or motionless. If implementation adds animation, honor `prefers-reduced-motion`.                                                         |

## Accessibility and keyboard/focus considerations

- Use a semantic `<section id="trust" aria-labelledby="trust-heading">` or equivalent pattern.
- The section heading should be an `<h2>` because FEAT-003 owns the page-level `<h1>`.
- Decorative connector and glow must be CSS-only or `aria-hidden="true"`.
- Material Symbol icons inside chips are decorative because visible text labels are present; set them `aria-hidden="true"`.
- Do not make chips or labels focusable; they are informational.
- Ensure text contrast is acceptable on chosen `surface-container*` fills.
- Do not rely on color alone to explain hierarchy; position, copy, heading levels, and connector together communicate the relationship.
- Maintain 48px touch comfort only for actual interactive elements; chips can be visually comfortable but should not present as buttons.
- The section should be readable with browser zoom and on small widths without horizontal scrolling.

## Visual-language requirements

- Use complementary Sovereign Shield surfaces, spacing, radius, and restrained glow.
- Avoid copying the prototype's border-heavy treatment directly.
- A subtle primary accent on the HushVoting card is acceptable because the feature explicitly asks for an accent/glow hierarchy, but it should not become a bright outline around every nested element.
- The HushNetwork card should use a calmer foundation surface such as `surface-container-lowest` or `surface-container-low` with secondary-toned text/labels.
- Use `InsetWell`, pill fills, or quiet tonal regions for chips/labels rather than nested heavy cards.

## Assumptions

- FEAT-002 UI primitives (`Card`, `InsetWell`, `IconLabel`, `StatusChip`, `Section`, shared token utilities) remain available.
- FEAT-003 already added nav links pointing to `#trust` and the homepage route is the thin composition point.
- The public website remains static for this FEAT; no HushServerNode or verifier integration is required.
- The prototype is authoritative for content and layout intent, while HushVoting visual language overrides prototype border habits.

## Open product questions

No blocker-level product question remains for design. Refinement should still confirm:

1. Whether the inferred supporting sentence is accepted as launch copy or replaced by owner-approved copy.
2. Whether trust labels should remain plain text badges or include decorative icons in a later visual pass.
3. Whether FEAT-004 should address the known pre-existing `pnpm lint` configuration issue or only document it as a validation dependency for a separate tooling FEAT.
