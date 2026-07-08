import { cn } from "~/components/ui/cn";
import { PLATFORM_READINESS_SECTION } from "./constants";
import { ClaimBoundaryBar } from "./ClaimBoundaryBar";

export interface PlatformReadinessSectionProps {
  /** Optional class name for the outer `<section>` element. */
  className?: string;
}

/**
 * Platform Readiness section for the homepage.
 *
 * Renders the Universal Deployment Readiness section with three deployment
 * readiness cards (PWA-First, Electrobun-Ready, Mobile Native) and a
 * five-badge claim boundary bar.
 *
 * Cards use tonal fills for separation with no white borders. Claim badges
 * use filled Material Symbol icons (FILL 1).
 *
 * Static content only — no interactive state, API calls, or server
 * actions. Cards and badges are non-interactive and unfocusable.
 */
export function PlatformReadinessSection({
  className,
}: PlatformReadinessSectionProps) {
  const { heading, description, cards } = PLATFORM_READINESS_SECTION;

  return (
    <section
      id="platform"
      aria-labelledby="platform-heading"
      className={cn("section-anchor", className)}
    >
      <div
        className={cn(
          "mx-auto max-w-[var(--spacing-max-width-content)]",
          "px-[var(--spacing-gutter)] py-[var(--spacing-xl)]",
          "max-sm:px-[var(--spacing-margin-mobile)] max-sm:py-[var(--spacing-lg)]",
        )}
      >
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2
            id="platform-heading"
            className={cn(
              "mb-4 font-semibold",
              "text-[clamp(1.5rem,4vw,var(--font-size-headline-lg))]",
              "leading-[clamp(2rem,4.5vw,var(--line-height-headline-lg))]",
            )}
            style={{
              fontFamily: "var(--font-family-hanken)",
            }}
          >
            {heading}
          </h2>

          <p
            className={cn(
              "mx-auto max-w-prose text-on-surface-variant",
              "text-[var(--font-size-body-md)]",
              "leading-[var(--line-height-body-md)]",
            )}
            style={{
              fontFamily: "var(--font-family-hanken)",
            }}
          >
            {description}
          </p>
        </div>

        {/* Deployment cards grid */}
        <div
          className={cn(
            "mb-[var(--spacing-lg)] grid gap-[var(--spacing-md)]",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {cards.map((card) => (
            <div
              key={card.key}
              className={cn(
                "flex flex-col",
                "rounded-[var(--radius-lg)]",
                "bg-surface-container p-[var(--spacing-md)]",
                "max-sm:p-[var(--spacing-sm)]",
              )}
            >
              {/* Decorative icon */}
              <span
                className={cn(
                  "material-symbols-outlined mb-3",
                  "text-[calc(var(--font-size-headline-lg)*1.2)]",
                  "text-primary",
                )}
                aria-hidden="true"
              >
                {card.icon}
              </span>

              {/* Card headline */}
              <h3
                className={cn(
                  "mb-2 font-semibold",
                  "text-[var(--font-size-headline-md)]",
                  "leading-[var(--line-height-headline-md)]",
                )}
                style={{ fontFamily: "var(--font-family-hanken)" }}
              >
                {card.headline}
              </h3>

              {/* Card description */}
              <p
                className={cn(
                  "mt-auto text-on-surface-variant",
                  "text-[var(--font-size-body-md)]",
                  "leading-[var(--line-height-body-md)]",
                )}
                style={{ fontFamily: "var(--font-family-hanken)" }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Claim boundary bar */}
        <ClaimBoundaryBar />
      </div>
    </section>
  );
}
