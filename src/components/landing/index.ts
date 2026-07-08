/**
 * FEAT-003: Landing page components — navigation and hero section.
 *
 * These components form the top-of-page surface for the HushVoting
 * public website. They are consumed by the homepage route and may be
 * re-exported for use by future FEATs.
 */

export { BrandMark } from "./BrandMark";
export type { BrandMarkProps } from "./BrandMark";

export { Header } from "./Header";
export type { HeaderProps } from "./Header";

export { HeroSection } from "./HeroSection";
export type { HeroSectionProps } from "./HeroSection";

export { MobileNavDisclosure } from "./MobileNavDisclosure";

export { TrustModelSection } from "./TrustModelSection";
export type { TrustModelSectionProps } from "./TrustModelSection";

export { RoleWorkflowSection } from "./RoleWorkflowSection";
export type { RoleWorkflowSectionProps } from "./RoleWorkflowSection";

export { ProtocolEvidenceSection } from "./ProtocolEvidenceSection";
export type { ProtocolEvidenceSectionProps } from "./ProtocolEvidenceSection";

export { PlatformReadinessSection } from "./PlatformReadinessSection";
export type { PlatformReadinessSectionProps } from "./PlatformReadinessSection";

export { ClaimBoundaryBar } from "./ClaimBoundaryBar";
export type { ClaimBoundaryBarProps } from "./ClaimBoundaryBar";

export { FinalCtaSection } from "./FinalCtaSection";
export type { FinalCtaSectionProps } from "./FinalCtaSection";

export { Footer } from "./Footer";
export type { FooterProps } from "./Footer";

export { UtilityPageShell } from "./UtilityPageShell";
export type { UtilityPageShellProps } from "./UtilityPageShell";

export { buildMailtoHref } from "./mailto";
export type { MailtoParams } from "./mailto";

export {
  BRAND_TEXT,
  NAV_LINKS,
  HERO_COPY,
  CTAS,
  TRUST_SECTION,
  ROLE_WORKFLOW_SECTION,
  PROTOCOL_EVIDENCE_SECTION,
  PLATFORM_READINESS_SECTION,
  FINAL_CTA_SECTION,
  PILOT_ACCESS_MAILTO,
  DOWNLOAD_OVERVIEW_CTA,
  FOOTER,
  UTILITY_PAGES,
} from "./constants";
export type {
  CtaDefinition,
  CapabilityChip,
  RoleCard,
  ProtocolEvidenceItem,
  DeploymentCard,
  ClaimBadge,
  FinalCtaSectionConfig,
  PilotAccessMailto,
  DownloadOverviewCta,
  FooterLink,
  UtilityPageConfig,
} from "./constants";
