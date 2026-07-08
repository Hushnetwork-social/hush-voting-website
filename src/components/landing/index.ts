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

export {
  BRAND_TEXT,
  NAV_LINKS,
  HERO_COPY,
  CTAS,
  TRUST_SECTION,
  ROLE_WORKFLOW_SECTION,
  PROTOCOL_EVIDENCE_SECTION,
  PLATFORM_READINESS_SECTION,
} from "./constants";
export type {
  CtaDefinition,
  CapabilityChip,
  RoleCard,
  ProtocolEvidenceItem,
  DeploymentCard,
  ClaimBadge,
} from "./constants";
