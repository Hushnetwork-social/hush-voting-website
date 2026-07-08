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

/* ── FEAT-004: Trust Model Hierarchy Section ── */

/** A single capability chip for the trust model cards. */
export interface CapabilityChip {
  readonly label: string;
  readonly icon: string;
}

export const TRUST_SECTION = {
  eyebrow: "Foundational Integrity",
  heading: "The Trust Model Hierarchy",
  supportingCopy:
    "HushVoting! coordinates election eligibility, participation, private choice, and evidence artifacts on top of HushNetwork's privacy and blockchain foundation.",

  hushVoting: {
    title: "HushVoting!",
    subtitle: "The Application Interface & Orchestration Layer",
    capabilities: [
      { label: "Eligibility", icon: "person_check" },
      { label: "Participation", icon: "how_to_vote" },
      { label: "Private Choice", icon: "security" },
      { label: "Artifacts", icon: "inventory_2" },
    ] as const satisfies readonly CapabilityChip[],
  },

  hushNetwork: {
    title: "HushNetwork",
    subtitle: "The Trust, Privacy, and Blockchain Foundation",
    trustLabels: [
      "ZERO-KNOWLEDGE PROOFS",
      "IMMUTABLE LEDGER",
      "ENCRYPTED SHARDS",
    ] as const satisfies readonly string[],
  },
} as const;

/* ── FEAT-005: Role Workflow Section ── */

/** A single role card in the role workflow section. */
export interface RoleCard {
  readonly role: string;
  readonly icon: string;
  readonly description: string;
}

/** Role workflow section copy and card data. */
export const ROLE_WORKFLOW_SECTION = {
  eyebrow: "Role Workflow",
  heading: "Four roles, one protocol-bound election flow.",
  description:
    "HushVoting separates election governance, private participation, trustee safeguards, and audit review into clear responsibilities.",

  roles: [
    {
      role: "Organizations",
      icon: "corporate_fare",
      description:
        "Create and govern election parameters, define voter rolls, and establish timing protocols.",
    },
    {
      role: "Voters",
      icon: "groups",
      description:
        "Securely claim eligibility through private ID providers and cast cryptographically masked ballots.",
    },
    {
      role: "Trustees",
      icon: "key",
      description:
        "Approve governed actions and manage distributed decryption keys.",
    },
    {
      role: "Auditors",
      icon: "rule",
      description:
        "Review protocol evidence and package integrity through the standalone verifier suite.",
    },
  ] as const satisfies readonly RoleCard[],
} as const;
