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

export {
  BRAND_TEXT,
  NAV_LINKS,
  HERO_COPY,
  CTAS,
} from "./constants";
export type { CtaDefinition } from "./constants";
