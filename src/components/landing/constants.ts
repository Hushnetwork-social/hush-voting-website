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
}

/** Final CTA section copy and configuration. */
export const FINAL_CTA_SECTION = {
  id: "pilot-access",
  heading: "Bring protocol-bound voting to your organization.",
  description:
    "Secure, private, and mathematically verifiable governance at scale.",
  placeholderNote:
    "Pilot access requests currently open a form overlay while message sending is being connected.",
  primaryActionLabel: "Request pilot access",
} as const satisfies FinalCtaSectionConfig;

/* ── FEAT-007: Pilot Access Form ── */

/** Configuration for the pilot access overlay form. */
export interface PilotAccessFormConfig {
  readonly dialogTitle: string;
  readonly intro: string;
  readonly emailLabel: string;
  readonly messageLabel: string;
  readonly defaultMessage: string;
  readonly messageMaxLength: number;
  readonly sendButtonLabel: string;
  readonly closeButtonLabel: string;
}

/** Pilot access overlay form copy and constraints. */
export const PILOT_ACCESS_FORM = {
  dialogTitle: "Request pilot access",
  intro:
    "Share the best email for your organization and adjust the message before sending.",
  emailLabel: "Email address",
  messageLabel: "Message",
  defaultMessage: "I want to have pilot access to HushVoting!",
  messageMaxLength: 256,
  sendButtonLabel: "Send message",
  closeButtonLabel: "Close pilot access form",
} as const satisfies PilotAccessFormConfig;

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
export interface UtilityPageSection {
  readonly title: string;
  readonly body: string;
  readonly items?: readonly string[];
}

export interface UtilityPageConfig {
  readonly route: string;
  readonly title: string;
  readonly status: string;
  readonly bodyCopy: string;
  readonly sections: readonly UtilityPageSection[];
  readonly backToHomeLabel: string;
  readonly backToHomeHref: string;
}

/** Utility page configurations for Privacy, Terms, and Security pages. */
export const UTILITY_PAGES = [
  {
    route: "/privacy",
    title: "Privacy Policy",
    status: "Draft policy — legal and privacy review pending.",
    bodyCopy:
      "This draft summarizes the intended privacy posture for HushVoting! and HushNetwork public website and pilot-access workflows. " +
      "It is written for Switzerland-first launch planning and is not a finalized legal privacy notice, data-processing agreement, or jurisdiction-specific compliance statement.",
    sections: [
      {
        title: "Website and pilot-access information",
        body:
          "The public website is designed to collect only the information needed to explain HushVoting! and respond to pilot requests. When a visitor requests pilot access, the form asks for an email address and a short message; the destination address is not published on the page to reduce spam harvesting. Standard server, browser, and security logs may also be processed to keep the site available, diagnose issues, and protect against abuse.",
      },
      {
        title: "Election privacy model",
        body:
          "HushVoting is built around Protocol Omega's election-mode separation between eligibility/checkoff records and ballot-choice records. The product direction is the digital equivalent of a named checkoff in the electoral roll and an anonymous ballot in the ballot box: an organization may need to know that a voting right was used, while the ballot transaction and vote choice must not become attributable to the named voter.",
        items: [
          "Named roster, eligibility, and checkoff evidence is treated separately from ballot-choice material.",
          "Ballot packages, tally inputs, and publication artifacts are designed to avoid plaintext option labels and direct named-voter joins.",
          "Audit and reporting artifacts should expose verification evidence without turning voter identity into ballot-choice evidence.",
        ],
      },
      {
        title: "Information that must remain private",
        body:
          "The Protocol Omega privacy model requires plaintext vote choices, trustee share material, tally private material, ballot-decrypting keys, and voter-to-choice joins to stay out of durable blockchain payloads, server storage, Redis, report packages, ordinary runtime logs, metrics, traces, backups, and support artifacts.",
      },
      {
        title: "Customer and organizational responsibilities",
        body:
          "Organizations using HushVoting! remain responsible for their own lawful authority to run an election, voter notices, roster sources, member eligibility rules, retention obligations, and jurisdiction-specific privacy requirements. Switzerland is the first target jurisdiction for review. HushVoting! can provide privacy-preserving voting and evidence mechanics, but it does not replace a customer's legal, governance, or compliance review.",
      },
      {
        title: "Cookies and analytics",
        body:
          "The current website does not use analytics or marketing cookies. If analytics are introduced later, the privacy notice and consent behavior should be updated before those tools are enabled, especially for Switzerland-first and later EU/EEA review.",
      },
      {
        title: "Current limits",
        body:
          "HushVoting! should not be described as providing total anonymity against all observers. Current documentation distinguishes validated implementation evidence from formal certification, and it does not claim protection against compromised user devices, colluding threshold trustees, live process-memory inspection, timing/metadata correlation, or jurisdiction-specific public-election requirements.",
      },
    ],
    backToHomeLabel: "Return home",
    backToHomeHref: "/",
  },
  {
    route: "/terms",
    title: "Terms of Service",
    status: "Draft terms — legal review pending.",
    bodyCopy:
      "These draft terms describe the intended use boundaries for the HushVoting website and early pilot conversations. " +
      "They are not a finalized service agreement and should be reviewed before any production, paid, or legally binding deployment.",
    sections: [
      {
        title: "Informational website",
        body:
          "The current public website is an informational surface for HushVoting! and HushNetwork. Content about protocol design, readiness, privacy, and verification reflects the project's documented engineering posture, but it is not legal, election-administration, compliance, investment, or security-audit advice.",
      },
      {
        title: "Pilot access",
        body:
          "Submitting a pilot-access request does not create a contract, guarantee acceptance into a pilot, or authorize use for a live binding election. Pilot participation, scope, support level, data-processing terms, and operational responsibilities must be agreed separately before use.",
      },
      {
        title: "Appropriate use boundaries",
        body:
          "HushVoting! is positioned first for controlled organizational remote voting conversations, with Switzerland as the first jurisdictional focus. Public/state elections, high-stakes statutory elections, regulated shareholder votes, or other legally sensitive deployments require explicit review, written approval, applicable legal authority, and evidence that the relevant readiness and certification gates have been satisfied.",
      },
      {
        title: "Customer responsibilities",
        body:
          "Each organization remains responsible for confirming its authority to run an election and for managing non-software governance requirements such as voter notices, quorum, proxy rules, minutes, dispute windows, challenge procedures, retention schedules, and acceptance of results.",
      },
      {
        title: "Verification and evidence",
        body:
          "HushVoting's intended assurance model is based on protocol specifications, canonical election records, cryptographic transcripts, verifier output, publication proof, trustee evidence, release integrity, and audit packages. Verifier output supports review, but it does not replace independent legal, operational, or cryptographic assessment where those are required.",
      },
      {
        title: "No finalized warranty language yet",
        body:
          "Final warranty disclaimers, limitation-of-liability terms, acceptable-use restrictions, support commitments, service-level terms, data-processing terms, Switzerland-specific legal wording, and intellectual-property notices are still pending legal review.",
      },
    ],
    backToHomeLabel: "Return home",
    backToHomeHref: "/",
  },
  {
    route: "/security",
    title: "Security Audit",
    status: "Security status — independent audit evidence pending.",
    bodyCopy:
      "This page summarizes the current documented security and audit posture for HushVoting. " +
      "It is not a completed external security audit, formal cryptographic proof, certification, or public-election readiness claim.",
    sections: [
      {
        title: "Validated implementation baseline",
        body:
          "The current documented baseline says protected non-dev Admin-Only and Trustee-threshold elections have demonstrated encrypted ballot persistence, separation between vote-grant/eligibility/participation evidence and ballot choice, aggregate-only result release, correct circuit/profile truth in reports, and no observed persisted leakage of tally keys or trustee shares in inspected fresh-election runs.",
      },
      {
        title: "Auditability model",
        body:
          "HushVoting's audit model is designed around replayable evidence rather than trust in a private backend log. Auditors should be able to inspect election setup, trustee configuration, threshold policy, ballot transaction history, close-election records, trustee finalization approvals, decryption-share evidence, release integrity, and verifier output.",
        items: [
          "Canonical election records and deterministic serializers support reproducible review.",
          "Standalone verifier packages are intended to replay accepted ballots, nullifier uniqueness, publication proof, trustee evidence, and final result binding.",
          "Public and restricted evidence boundaries are maintained so auditability does not become voter-choice disclosure.",
        ],
      },
      {
        title: "Trustee and key-custody principles",
        body:
          "For serious voting, no single actor should hold a full recoverable decryption key. The trustee model uses key shares, threshold participation, final-aggregate-only release, and public verification of finalization evidence. The design avoids workflows for arbitrary per-ballot decryption or frequent intermediate plaintext tally release.",
      },
      {
        title: "What is not yet claimed",
        body:
          "The documented baseline does not claim that HushVoting is certified secure, formally proven secure, public-election ready, impossible to compromise, anonymous against all observers, or protected against compromised voter, trustee, owner, or operator devices. It also does not close every timing, network, metadata, collusion, process-memory, or deployment-custody risk.",
      },
      {
        title: "Hardening still required",
        body:
          "The remaining hardening roadmap includes independent cryptographic review, independent application and infrastructure security assessment, production HSM/KMS custody for sensitive election material, IAM rotation, stricter process-memory review, retention/log-correlation proof, deployment proof binding, public verifier corpus expansion, and controlled pilot evidence packages.",
      },
      {
        title: "Disclosure posture",
        body:
          "Security findings should be documented, classified by whether they affect guarantees or implementation, covered by tests when testable, and patched immediately when they affect active guarantees. A final vulnerability disclosure process should be published before broader production use, without exposing harvestable contact addresses on this page.",
      },
    ],
    backToHomeLabel: "Return home",
    backToHomeHref: "/",
  },
] as const satisfies readonly UtilityPageConfig[];
