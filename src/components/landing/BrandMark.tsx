import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/components/ui/cn";

export const HUSHVOTING_LOGO_SRC = "/assets/hushvoting-logo.png";

export interface BrandMarkProps extends ComponentPropsWithoutRef<"span"> {
  /** When true, the mark is purely decorative and hidden from assistive tech. */
  decorative?: boolean;
  /**
   * Size variant for the official HushVoting logo.
   *
   * - `"sm"` (default): 32x32px — compact header usage.
   * - `"md"`: 48x48px — hero or larger context.
   * - `"lg"`: 64x64px — standalone hero brand emphasis.
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Official HushVoting brand mark.
 *
 * Renders the approved HushVoting logo promoted from the prototype assets into
 * `public/assets`. The wrapper controls accessibility so the same component can
 * be decorative when adjacent text already identifies the brand, or announced as
 * an image when used standalone.
 */
const LOGO_SIZE_MAP = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
} as const;

export function BrandMark({
  decorative = false,
  size = "sm",
  className,
  ...props
}: BrandMarkProps) {
  return (
    <span
      className={cn("inline-flex items-center justify-center", className)}
      {...(decorative
        ? { "aria-hidden": true as const }
        : { role: "img", "aria-label": "HushVoting logo" })}
      {...props}
    >
      <img
        src={HUSHVOTING_LOGO_SRC}
        alt=""
        aria-hidden="true"
        className={cn("inline-block object-contain", LOGO_SIZE_MAP[size])}
        width={64}
        height={64}
      />
    </span>
  );
}
