import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/components/ui/cn";

export interface BrandMarkProps extends ComponentPropsWithoutRef<"span"> {
  /** When true, the mark is purely decorative and hidden from assistive tech. */
  decorative?: boolean;
  /**
   * Size variant for the SVG icon.
   *
   * - `"sm"` (default): 32x32px — compact header usage.
   * - `"md"`: 48x48px — hero or larger context.
   * - `"lg"`: 64x64px — standalone hero brand emphasis.
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Token-based HushVoting brand mark fallback.
 *
 * Renders a deterministic CSS-only shield/checkmark icon using Sovereign
 * Shield primary color tokens. When an approved production logo asset
 * becomes available, this component can be swapped via its imports.
 *
 * Uses the `decorative` prop to control `aria-hidden` — decorative is
 * appropriate when adjacent visible text (e.g. BRAND_TEXT in the header)
 * already identifies HushVoting.
 *
 * Props: All standard span props plus `decorative`.
 */
const SVG_SIZE_MAP = {
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
      className={cn(
        "inline-flex items-center justify-center text-primary",
        className,
      )}
      {...(decorative
        ? { "aria-hidden": true as const }
        : { role: "img", "aria-label": "HushVoting shield mark" })}
      {...props}
    >
      <svg
        className={cn("inline-block", SVG_SIZE_MAP[size])}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {/* Shield outline */}
        <path
          d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11 5.17-.85 9-5.75 9-11V7l-9-5z"
          fill="currentColor"
          opacity="0.15"
        />
        <path
          d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11 5.17-.85 9-5.75 9-11V7l-9-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Checkmark */}
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
