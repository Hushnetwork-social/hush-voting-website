import { cn } from "~/components/ui/cn";
import { PLATFORM_READINESS_SECTION } from "./constants";

export interface ClaimBoundaryBarProps {
  /** Optional class name for the outer container. */
  className?: string;
}

/**
 * Claim Boundary Bar for the Platform Readiness section.
 *
 * Renders five claim boundary badges as a horizontal wrapping row of
 * filled Material Symbol icon labels. Each badge uses FILL 1 for the
 * icon weight.
 *
 * Static content only — badges are non-interactive and unfocusable.
 * Icons are decorative (aria-hidden) since the visible label provides
 * the accessible name.
 */
export function ClaimBoundaryBar({ className }: ClaimBoundaryBarProps) {
  const { claimBadges } = PLATFORM_READINESS_SECTION;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        "rounded-[var(--radius-lg)]",
        "bg-surface-container-low p-[var(--spacing-md)]",
        "max-sm:p-[var(--spacing-sm)]",
        className,
      )}
      role="list"
      aria-label="Product claim boundaries"
    >
      {claimBadges.map((badge) => (
        <span
          key={badge.label}
          className={cn(
            "inline-flex items-center gap-2",
            "rounded-[var(--radius-full)]",
            "bg-surface-container px-3 py-1.5",
          )}
          role="listitem"
        >
          <span
            className={cn(
              "material-symbols-outlined",
              "text-[var(--font-size-body-md)]",
              "text-primary",
            )}
            style={{ fontVariationSettings: `'FILL' ${badge.fill}` }}
            aria-hidden="true"
          >
            {badge.icon}
          </span>
          <span
            className={cn(
              "text-[var(--font-size-label-sm)]",
              "font-[var(--font-weight-label-sm)]",
              "leading-[var(--line-height-label-sm)]",
              "tracking-[var(--letter-spacing-label-sm)]",
              "text-on-surface",
            )}
            style={{ fontFamily: "var(--font-family-jetbrains)" }}
          >
            {badge.label}
          </span>
        </span>
      ))}
    </div>
  );
}
