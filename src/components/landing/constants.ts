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

/* ── FEAT-006: Protocol Evidence Section ── */

/** A single protocol evidence category item. */
export interface ProtocolEvidenceItem {
  readonly key: string;
  readonly label: string;
  readonly icon: string;
  readonly description: string;
}

/** Protocol evidence section copy and evidence items. */
export const PROTOCOL_EVIDENCE_SECTION = {
  /** The section heading / badge label */
  heading: "Protocol Omega",
  /** Short narrative copy for the left column */
  narrative:
    "Protocol Omega is the cryptographic backbone of HushVoting!. Every vote is shielded by zero-knowledge proofs, distributed trustee keys, and an immutable audit trail. The evidence categories below demonstrate how the protocol ensures eligibility, privacy, integrity, and verifiability across the full election lifecycle.",
  /** Protocol Omega badge */
  badge: {
    label: "100% Mathematically Verifiable",
    icon: "verified",
  },
  /** Six evidence category items in approved order */
  items: [
    {
      key: "cryptographicReceipts",
      label: "Cryptographic Receipts",
      icon: "receipt_long",
      description:
        "Evidence that voting activity can produce voter-verifiable receipts without exposing vote choices.",
    },
    {
      key: "eligibilityProofs",
      label: "Eligibility Proofs",
      icon: "how_to_reg",
      description:
        "Evidence that voter eligibility can be proven without turning the public result into an identity list.",
    },
    {
      key: "anonymousBallots",
      label: "Anonymous Ballots",
      icon: "shield_lock",
      description:
        "Evidence that private ballot handling is a first-class protocol property.",
    },
    {
      key: "tamperEvidentRecords",
      label: "Tamper-Evident Records",
      icon: "database",
      description:
        "Evidence that election records are structured for integrity checks and audit review.",
    },
    {
      key: "verifiableTally",
      label: "Verifiable Tally",
      icon: "verified",
      description:
        "Evidence that outcomes are designed to be independently checked.",
    },
    {
      key: "auditEvidence",
      label: "Audit Evidence",
      icon: "fact_check",
      description:
        "Evidence packages are designed to support organizational review and post-election audit workflows.",
    },
  ] as const satisfies readonly ProtocolEvidenceItem[],
} as const;

/* ── FEAT-006: Platform Readiness Section ── */

/** A single deployment readiness card. */
export interface DeploymentCard {
  readonly key: string;
  readonly headline: string;
  readonly icon: string;
  readonly description: string;
}

/** A single claim boundary badge. */
export interface ClaimBadge {
  readonly label: string;
  readonly icon: string;
  readonly fill: 0 | 1;
}

/** Platform readiness section copy, deployment cards, and claim badges. */
export const PLATFORM_READINESS_SECTION = {
  heading: "Universal Deployment Readiness",
  description:
    "HushVoting! is designed for real organizational deployment across web, desktop, and mobile surfaces — without compromising on privacy, auditability, or operational control.",
  /** Three deployment readiness cards in approved order */
  cards: [
    {
      key: "pwaFirst",
      headline: "PWA-First",
      icon: "install_mobile",
      description:
        "Installable web deployment path designed for fast access, broad device reach, and low operational friction.",
    },
    {
      key: "electrobunReady",
      headline: "Electrobun-Ready",
      icon: "desktop_windows",
      description:
        "Desktop packaging path prepared for secure organizational environments and dedicated election workstations.",
    },
    {
      key: "mobileNative",
      headline: "Mobile Native",
      icon: "phone_iphone",
      description:
        "Mobile-native delivery path reserved for future app-store distribution and device-specific voting experiences.",
    },
  ] as const satisfies readonly DeploymentCard[],
  /** Five claim boundary badges in approved order (all FILL 1) */
  claimBadges: [
    {
      label: "Designed for organizational remote voting",
      icon: "groups",
      fill: 1,
    },
    {
      label: "Privacy-first",
      icon: "privacy_tip",
      fill: 1,
    },
    {
      label: "Verifiable outcomes",
      icon: "verified",
      fill: 1,
    },
    {
      label: "Audit-ready evidence packages",
      icon: "fact_check",
      fill: 1,
    },
    {
      label: "Enabled by HushNetwork",
      icon: "hub",
      fill: 1,
    },
  ] as const satisfies readonly ClaimBadge[],
} as const;

/* ── FEAT-007: Final CTA Section ── */

/** Configuration for the final CTA (pilot access) section above the footer. */
export interface FinalCtaSectionConfig {
  readonly id: string;
  readonly heading: string;
  readonly description: string;
  readonly placeholderNote: string;
  readonly primaryActionLabel: string;
  readonly secondaryActionLabel: string;
}

/** Final CTA section copy and configuration. */
export const FINAL_CTA_SECTION = {
  id: "pilot-access",
  heading: "Bring protocol-bound voting to your organization.",
  description:
    "Secure, private, and mathematically verifiable governance at scale.",
  placeholderNote:
    "Pilot access requests currently open an email draft while onboarding is reviewed.",
  primaryActionLabel: "Request pilot access",
  secondaryActionLabel: "Download overview",
} as const satisfies FinalCtaSectionConfig;

/* ── FEAT-007: Pilot Access Mailto ── */

/** Configuration for the pilot access mailto link. */
export interface PilotAccessMailto {
  readonly to: string;
  readonly subject: string;
  readonly body: string;
}

/** Pilot access mailto configuration (owner-approved placeholder). */
export const PILOT_ACCESS_MAILTO = {
  to: "hello@hushvoting.com",
  subject: "HushVoting pilot access request",
  body: [
    "Hello HushVoting team,",
    "",
    "I am interested in pilot access to HushVoting for our organization. Please let me know the next steps.",
    "",
    "Organization:",
    "Name:",
    "Role:",
    "Use case:",
  ].join("\n"),
} as const satisfies PilotAccessMailto;

/* ── FEAT-007: Download Overview CTA ── */

/** Configuration for the Download overview secondary CTA. */
export interface DownloadOverviewCta {
  readonly label: string;
  readonly href: string;
  readonly pendingNote: string;
}

/**
 * Download overview CTA configuration.
 * Uses #protocol as the safe interim target until an approved asset is supplied.
 */
export const DOWNLOAD_OVERVIEW_CTA = {
  label: "Download overview",
  href: "#protocol",
  pendingNote:
    "Overview asset pending — interim target is the Protocol Evidence section.",
} as const satisfies DownloadOverviewCta;

/* ── FEAT-007: Footer ── */

/** A single footer link definition. */
export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

/** Footer brand context and link definitions. */
export const FOOTER = {
  brand: "HushVoting!",
  tagline: "HushVoting! is a product of HushNetwork.",
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security Audit", href: "/security" },
  ] as const satisfies readonly FooterLink[],
} as const;

/* ── FEAT-007: Utility Pages ── */

/** Configuration for a single utility page (Privacy, Terms, Security). */
export interface UtilityPageConfig {
  readonly route: string;
  readonly title: string;
  readonly status: string;
  readonly bodyCopy: string;
  readonly backToHomeLabel: string;
  readonly backToHomeHref: string;
}

/** Utility page configurations for Privacy, Terms, and Security pages. */
export const UTILITY_PAGES = [
  {
    route: "/privacy",
    title: "Privacy Policy",
    status: "Launch placeholder — final review pending.",
    bodyCopy:
      "The HushVoting privacy policy is currently under legal and privacy review. " +
      "This placeholder page provides a structural scaffold and does not represent " +
      "finalized privacy approval, data processing terms, or completed legal review. " +
      "Please check back once the final policy is published.",
    backToHomeLabel: "Return home",
    backToHomeHref: "/",
  },
  {
    route: "/terms",
    title: "Terms of Service",
    status: "Launch placeholder — final review pending.",
    bodyCopy:
      "The HushVoting Terms of Service are currently under legal review. " +
      "This placeholder page provides a structural scaffold and does not represent " +
      "a finalized service agreement, binding terms, or completed legal review. " +
      "Please check back once the final terms are published.",
    backToHomeLabel: "Return home",
    backToHomeHref: "/",
  },
  {
    route: "/security",
    title: "Security Audit",
    status: "Launch placeholder — final review pending.",
    bodyCopy:
      "HushVoting security audit references are currently pending review. " +
      "This placeholder page provides a structural scaffold and does not represent " +
      "completed audit certification, final security approval, or production-ready " +
      "security posture. Please check back once the final audit information is published.",
    backToHomeLabel: "Return home",
    backToHomeHref: "/",
  },
] as const satisfies readonly UtilityPageConfig[];
