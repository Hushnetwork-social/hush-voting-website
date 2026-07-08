/**
 * FEAT-008: Pure helper utilities for responsive E2E assertions.
 *
 * These helpers are deterministic and independent of backend/API/network
 * behavior. They normalize computed-style values, bounding-box results,
 * and viewport expectations.
 *
 * Playwright imports are NOT included here — this file is pure data/string
 * utilities. The Playwright page/evaluate calls happen in the spec files.
 */

import {
  TOUCH_TARGET_MIN_HEIGHT,
  TOUCH_TARGET_MIN_WIDTH,
  GUTTER_MOBILE_PX,
  GUTTER_DESKTOP_PX,
  type BreakpointLabel,
  BREAKPOINT_MAX,
} from "./responsive";

/* ── Computed Style Helpers ── */

/**
 * Convert a CSS pixel value string like "16px" or "48px" to a number.
 * Returns NaN for non-pixel values (rem, em, etc.).
 */
export function parsePxValue(value: string): number {
  const match = value.trim().match(/^(-?\d+(?:\.\d+)?)px$/);
  return match ? Number.parseFloat(match[1]) : Number.NaN;
}

/**
 * Check if a font-size string represents a clamp() or other fluid CSS function.
 */
export function isFluidFontSize(value: string): boolean {
  return (
    value.includes("clamp") || value.includes("min(") || value.includes("max(")
  );
}

/* ── Touch Target Helpers ── */

export interface BoundingBox {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/**
 * Check if a bounding box meets the minimum touch target requirements.
 */
export function meetsTouchTarget(box: BoundingBox): boolean {
  return (
    box.width >= TOUCH_TARGET_MIN_WIDTH && box.height >= TOUCH_TARGET_MIN_HEIGHT
  );
}

/**
 * Check if a single dimension meets the minimum touch target size.
 */
export function meetsTouchTargetDimension(
  actualPx: number,
  minimumPx: number = TOUCH_TARGET_MIN_HEIGHT,
): boolean {
  return actualPx >= minimumPx;
}

/* ── Gutter Helpers ── */

/**
 * Determine the expected horizontal gutter in pixels for a breakpoint.
 */
export function expectedGutterPx(breakpoint: BreakpointLabel): number {
  if (breakpoint === "desktop") {
    return GUTTER_DESKTOP_PX;
  }
  return GUTTER_MOBILE_PX;
}

/**
 * Check if a computed padding value matches the expected gutter within a tolerance.
 */
export function matchesGutter(
  computedPadding: string,
  breakpoint: BreakpointLabel,
  tolerance: number = 1,
): boolean {
  const px = parsePxValue(computedPadding);
  if (Number.isNaN(px)) return false;
  const expected = expectedGutterPx(breakpoint);
  return Math.abs(px - expected) <= tolerance;
}

/* ── Breakpoint Helpers ── */

/**
 * Classify a viewport width into a breakpoint label.
 */
export function classifyBreakpoint(width: number): BreakpointLabel {
  if (width <= BREAKPOINT_MAX.mobile) return "mobile";
  if (width <= BREAKPOINT_MAX.tablet) return "tablet";
  return "desktop";
}

/**
 * Check if a viewport width falls within a given breakpoint range.
 */
export function isInBreakpoint(
  width: number,
  breakpoint: BreakpointLabel,
): boolean {
  return classifyBreakpoint(width) === breakpoint;
}

/* ── No-White-Border Helpers ── */

const WHITE_BORDER_PATTERNS = [
  "border-white",
  "border-r-white",
  "border-l-white",
  "border-t-white",
  "border-b-white",
] as const;

/**
 * Check if a classname string contains any white-border pattern.
 */
export function hasWhiteBorderClass(className: string): boolean {
  return WHITE_BORDER_PATTERNS.some((pattern) => className.includes(pattern));
}
