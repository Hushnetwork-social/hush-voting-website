# FEAT-004: Trust Model Hierarchy Section

**Feature ID**: FEAT-004  
**Parent Epic**: EPIC-001  
**Status**: Ready To Refine

## Summary

Build the Trust Model Hierarchy section for the homepage. The section introduces the relationship between HushVoting! and HushNetwork through a stable `#trust` section, eyebrow label, headline, two layered trust-model cards, trust labels, capability chips, a custom decorative gradient connector, and subtle glow treatment.

The section is static, polished, responsive, accessible, and composed into the homepage through a thin route addition.

## Source

- EPIC: EPIC-001 - HushVoting Website Platform and Initial Design
- Created by Hepha unnamed FEAT discovery from the current EPIC document.
- Updated by Deep-Dive stage 2 using the answered FEAT-004 transcript.

## Scope

FEAT-004 is limited to the Trust Model Hierarchy section on the homepage.

Included:

- Homepage `#trust` section.
- Eyebrow label and headline.
- Two layered cards representing:
  - HushVoting!
  - HushNetwork
- FEAT-local static copy contract for eyebrow, headline, card labels, trust labels, and capability chips.
- Capability chips.
- Trust labels.
- Custom non-semantic gradient connector between the hierarchy layers.
- Subtle glow treatment.
- Responsive layout behavior.
- Accessibility checks.
- Component tests.
- Canonical `pnpm` validation scripts.
- Repair of blocking shared lint/configuration issues only if required to validate this FEAT.

Out of scope:

- Additional homepage sections.
- New route architecture beyond the thin homepage composition needed to render this section.
- Interactive trust-model flows.
- Backend or protocol changes.
- Documentation pages outside the homepage section.
- Dynamic content loading or CMS/product-copy integration.
- Broader design-system rewrites.

## Hepha Deep-Dive Decisions

| Topic                           | Decision                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Acceptance Criteria             | Implement a static responsive Trust Model Hierarchy section with tests.                                                                            |
| Validation                      | Confirmed scope is homepage trust-section only.                                                                                                    |
| Visual Direction                | Use tonal surfaces, spacing, radius, gradients, and glow instead of default border-heavy card separation.                                          |
| Composition                     | Add the section to the homepage through a thin route addition.                                                                                     |
| Section content contract        | Lock FEAT-local static copy so tests can assert stable content and implementation can proceed without product copy churn.                          |
| Visual hierarchy implementation | Reuse existing design-system surfaces/card/chip patterns with a custom decorative gradient/glow connector.                                         |
| Validation and test ownership   | Run canonical scripts for typecheck, unit tests, lint, format check, and build; repair blocking shared config only if it prevents FEAT validation. |

## Content Contract

The following copy is locked for FEAT-004 and should be used directly by implementation and tests.

| Element                       | Exact copy                                                                 |
| ----------------------------- | -------------------------------------------------------------------------- |
| Section anchor                | `trust`                                                                    |
| Eyebrow label                 | `Trust model hierarchy`                                                    |
| Headline                      | `HushVoting! coordinates decisions on top of the HushNetwork trust layer.` |
| HushVoting card label         | `HushVoting!`                                                              |
| HushVoting trust label        | `Governed voting layer`                                                    |
| HushVoting capability chip 1  | `Remote elections`                                                         |
| HushVoting capability chip 2  | `Governed participation`                                                   |
| HushVoting capability chip 3  | `Verifiable outcomes`                                                      |
| HushNetwork card label        | `HushNetwork`                                                              |
| HushNetwork trust label       | `Network trust layer`                                                      |
| HushNetwork capability chip 1 | `Private coordination`                                                     |
| HushNetwork capability chip 2 | `Resilient identity`                                                       |
| HushNetwork capability chip 3 | `Trust infrastructure`                                                     |

## Visual Implementation Requirements

- Use existing website/design-system surface, card, and chip patterns where available.
- Create a hierarchy where HushVoting! reads as the governed voting layer and HushNetwork reads as the deeper network trust layer.
- Use tonal surfaces, spacing, radius, soft gradients, and glow to separate hierarchy layers.
- Add a custom decorative connector between the two cards:
  - gradient or glow treatment is preferred;
  - it must be non-semantic;
  - it must not add screen-reader noise;
  - it must not be the only way the relationship is understood.
- Avoid border-heavy card stacking.
- Avoid relying on white outline separators as the primary layout structure.
- Keep the section visually balanced on mobile, tablet, and desktop.
- Preserve readability at narrow widths by allowing cards, chips, and connector treatment to adapt responsively.

## Acceptance Criteria

- The homepage includes a Trust Model Hierarchy section with a stable `#trust` anchor.
- The section includes the locked eyebrow label: `Trust model hierarchy`.
- The section includes the locked headline: `HushVoting! coordinates decisions on top of the HushNetwork trust layer.`
- The section renders two visually layered cards:
  - one for `HushVoting!`;
  - one for `HushNetwork`.
- The HushVoting! card includes:
  - trust label: `Governed voting layer`;
  - capability chips: `Remote elections`, `Governed participation`, `Verifiable outcomes`.
- The HushNetwork card includes:
  - trust label: `Network trust layer`;
  - capability chips: `Private coordination`, `Resilient identity`, `Trust infrastructure`.
- The two cards are visually connected with a custom decorative gradient connector or equivalent hierarchy treatment.
- The connector and glow treatments are decorative and hidden from assistive technology.
- The section uses subtle glow and tonal surface styling consistent with the HushVoting website visual language.
- The layout avoids default border-heavy card stacking and does not rely on white outline separators as the primary structure.
- The section is responsive across mobile, tablet, and desktop breakpoints.
- The section remains readable and visually balanced at narrow widths.
- The section is accessible:
  - semantic section structure is used;
  - heading order is valid within the homepage;
  - decorative glow/connector elements do not add noisy screen-reader output;
  - text contrast is acceptable for the chosen surfaces.
- Component tests cover the section’s key rendered content, including:
  - eyebrow label;
  - headline;
  - both card labels;
  - both trust labels;
  - all capability chips.
- Validation can be run through the project’s canonical `pnpm` scripts for type checking, linting, format checking, testing, and build verification.

## Testing Requirements

FEAT-004 should own component-level coverage for the Trust Model Hierarchy section.

Tests should assert that:

- the section renders with an accessible section structure;
- the `#trust` anchor is present and stable;
- the locked eyebrow and headline copy render;
- both trust cards render;
- both trust labels render;
- all capability chips render;
- decorative connector/glow elements do not introduce noisy accessible text.

Tests do not need to cover:

- protocol behavior;
- backend behavior;
- interactive trust flows;
- unrelated homepage sections;
- pixel-perfect visual regression unless already part of the project’s established test pattern.

## Validation

FEAT-004 is confirmed for refinement as a homepage-only Trust Model Hierarchy section.

Validation should use the project’s canonical `pnpm` scripts for:

- type checking;
- unit/component tests;
- linting;
- format checking;
- production build verification.

If validation is blocked by a missing or broken shared lint/configuration dependency, FEAT-004 may repair that project configuration only to the extent required to run the canonical validation gate. Broader tooling cleanup remains out of scope.

Refinement and implementation planning should preserve the limited scope, focus on the static responsive section, and avoid expanding into broader homepage, navigation, protocol, backend, or documentation work.
