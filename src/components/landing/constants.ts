/**
 * FEAT-003: Static content and link constants for the landing page
 * navigation and hero section.
 *
 * All copy is frozen at refinement time per the Content and Link Contract
 * in FeatureDescription.md. No CMS, environment, or API sources.
 */

/* ── Brand ── */

export const BRAND_TEXT = "HushVoting!" as const;

/* ── Navigation Links ── */

export const NAV_LINKS = [
  { label: "Trust Model", href: "#trust" },
  { label: "Roles", href: "#roles" },
  { label: "Protocol Evidence", href: "#protocol" },
  { label: "Platform", href: "#platform" },
] as const;

/* ── Hero Copy ── */

export const HERO_COPY = {
  headline: "Governed remote voting for serious organizations.",
  subheadline:
    "HushVoting! helps organizations run private, auditable, protocol-bound votes with clear roles for voters, owners, trustees, and auditors.",
} as const;

/* ── CTA Definitions ── */

export interface CtaDefinition {
  readonly label: string;
  readonly href: string;
  readonly variant: "primary" | "secondary";
}

export const CTAS = {
  /** Primary hero CTA — links to the planned Pilot Access section (FEAT-007) */
  pilotAccess: {
    label: "Request pilot access",
    href: "#pilot-access",
    variant: "primary",
  } satisfies CtaDefinition,

  /** Secondary hero CTA — links to the planned Protocol Evidence section (FEAT-006) */
  verifierModel: {
    label: "View verifier model",
    href: "#protocol",
    variant: "secondary",
  } satisfies CtaDefinition,

  /** Navigation CTA — same target as the hero primary CTA */
  navPilotAccess: {
    label: "Pilot Access",
    href: "#pilot-access",
    variant: "primary",
  } satisfies CtaDefinition,
} as const;
