/**
 * FEAT-008: Typed responsive test metadata.
 *
 * Centralizes viewport sizes, breakpoint labels, layout expectations,
 * touch-target thresholds, gutter expectations, and typography ranges
 * used by responsive E2E tests.
 *
 * Pure data — no side effects, no Playwright imports.
 */

/* ── Viewport Sizes ── */

export interface ViewportSize {
  readonly width: number;
  readonly height: number;
  readonly label: string;
}

export const VIEWPORT_320: ViewportSize = {
  width: 320,
  height: 568,
  label: "Mobile minimum",
} as const;

export const VIEWPORT_375: ViewportSize = {
  width: 375,
  height: 812,
  label: "Mobile reference",
} as const;

export const VIEWPORT_768: ViewportSize = {
  width: 768,
  height: 1024,
  label: "Tablet portrait",
} as const;

export const VIEWPORT_1024: ViewportSize = {
  width: 1024,
  height: 768,
  label: "Desktop minimum",
} as const;

export const VIEWPORT_1440: ViewportSize = {
  width: 1440,
  height: 900,
  label: "Desktop reference",
} as const;

export const VIEWPORT_1920: ViewportSize = {
  width: 1920,
  height: 1080,
  label: "Desktop wide",
} as const;

/** All FEAT-008 automated viewport sizes in a reusable array. */
export const ALL_VIEWPORTS: readonly ViewportSize[] = [
  VIEWPORT_320,
  VIEWPORT_375,
  VIEWPORT_768,
  VIEWPORT_1024,
  VIEWPORT_1440,
] as const;

/* ── Breakpoint Labels ── */

export type BreakpointLabel = "mobile" | "tablet" | "desktop";

/** Maximum width (inclusive) for each breakpoint. */
export const BREAKPOINT_MAX: Record<BreakpointLabel, number> = {
  mobile: 767,
  tablet: 1023,
  desktop: Infinity,
} as const;

/** Expected navigation mode by breakpoint. */
export const NAV_MODE: Record<BreakpointLabel, "hamburger" | "inline"> = {
  mobile: "hamburger",
  tablet: "hamburger",
  desktop: "inline",
} as const;

/* ── Layout Expectations ── */

/** Expected column counts per section per breakpoint. */
export interface LayoutExpectation {
  readonly section: string;
  readonly mobileCols: number;
  readonly tabletCols: number;
  readonly desktopCols: number;
}

export const LAYOUT_EXPECTATIONS: readonly LayoutExpectation[] = [
  {
    section: "Role Workflow",
    mobileCols: 1,
    tabletCols: 2,
    desktopCols: 4,
  },
  {
    section: "Protocol Evidence",
    mobileCols: 1,
    tabletCols: 2,
    desktopCols: 2,
  },
  {
    section: "Platform Readiness",
    mobileCols: 1,
    tabletCols: 2,
    desktopCols: 3,
  },
] as const;

/* ── Touch Targets ── */

export const TOUCH_TARGET_MIN_HEIGHT = 48;
export const TOUCH_TARGET_MIN_WIDTH = 48;

/* ── Gutter Expectations (in pixels) ── */

export const GUTTER_MOBILE_PX = 16;
export const GUTTER_DESKTOP_PX = 24;

/* ── Selector / Label Metadata ── */

/** Navigation link labels and their target section IDs. */
export const NAV_LINK_LABELS: readonly string[] = [
  "Trust Model",
  "Roles",
  "Protocol Evidence",
  "Platform",
] as const;

/** Section element IDs used for anchor navigation. */
export const SECTION_IDS: readonly string[] = [
  "hero-heading",
  "trust",
  "roles",
  "protocol",
  "platform",
  "pilot-access",
] as const;

/** CTA button labels in navigation and hero. */
export const CTA_LABELS: readonly string[] = [
  "Pilot Access",
  "Request pilot access",
  "View verifier model",
] as const;

/** Footer utility link labels. */
export const FOOTER_LINK_LABELS: readonly string[] = [
  "Privacy Policy",
  "Terms of Service",
  "Security Audit",
] as const;
