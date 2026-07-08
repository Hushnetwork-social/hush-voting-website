import { cn } from "~/components/ui/cn";
import { InsetWell } from "~/components/ui/InsetWell";
import { PROTOCOL_EVIDENCE_SECTION } from "./constants";

export interface ProtocolEvidenceSectionProps {
  /** Optional class name for the outer `<section>` element. */
  className?: string;
}

/**
 * Protocol Evidence section for the homepage.
 *
 * Renders the Protocol Omega section with a left-column narrative and
 * protocol badge, plus a right-column 2x3 grid of six recessed evidence
 * category items using InsetWell.
 *
 * Uses a full-width bg-surface-container-low tonal band for visual
 * separation. All content is from the typed constants contract.
 *
 * Static content only — no interactive state, API calls, or server
 * actions. Items are non-interactive and unfocusable.
 */
export function ProtocolEvidenceSection({
  className,
}: ProtocolEvidenceSectionProps) {
  const { heading, narrative, badge, items } = PROTOCOL_EVIDENCE_SECTION;

  return (
    <section
      id="protocol"
      aria-labelledby="protocol-heading"
      className={cn("section-anchor", "bg-surface-container-low", className)}
    >
      <div
        className={cn(
          "mx-auto max-w-[var(--spacing-max-width-content)]",
          "px-[var(--spacing-gutter)] py-[var(--spacing-xl)]",
          "max-sm:px-[var(--spacing-margin-mobile)] max-sm:py-[var(--spacing-lg)]",
        )}
      >
        {/* Section heading */}
        <h2
          id="protocol-heading"
          className={cn(
            "mb-2 text-center font-semibold",
            "text-[calc(var(--font-size-headline-lg)*0.9)]",
            "leading-[var(--line-height-headline-lg)]",
          )}
          style={{ fontFamily: "var(--font-family-hanken)" }}
        >
          {heading}
        </h2>

        {/* Protocol Omega left/right content */}
        <div
          className={cn(
            "mt-[var(--spacing-lg)] grid gap-[var(--spacing-lg)]",
            "grid-cols-1 lg:grid-cols-2",
          )}
        >
          {/* Left column — narrative + badge */}
          <div className="flex flex-col justify-center gap-6">
            <p
              className={cn(
                "text-on-surface-variant",
                "text-[var(--font-size-body-md)]",
                "leading-[var(--line-height-body-md)]",
              )}
              style={{ fontFamily: "var(--font-family-hanken)" }}
            >
              {narrative}
            </p>

            {/* Protocol Omega badge */}
            <div
              className={cn(
                "inline-flex items-center gap-3 self-start",
                "rounded-[var(--radius-md)]",
                "bg-primary/10 px-4 py-2",
              )}
            >
              <span
                className="material-symbols-outlined text-primary text-[var(--font-size-headline-md)]"
                aria-hidden="true"
              >
                {badge.icon}
              </span>
              <span
                className={cn(
                  "font-semibold text-primary",
                  "text-[var(--font-size-body-md)]",
                  "leading-[var(--line-height-body-md)]",
                )}
                style={{ fontFamily: "var(--font-family-hanken)" }}
              >
                {badge.label}
              </span>
            </div>
          </div>

          {/* Right column — 2x3 evidence grid */}
          <div
            className={cn(
              "grid gap-[var(--spacing-sm)]",
              "grid-cols-1 sm:grid-cols-2",
              "auto-rows-fr",
            )}
          >
            {items.map((item) => (
              <InsetWell
                key={item.key}
                className={cn(
                  "flex flex-col gap-2",
                  "p-[var(--spacing-sm)]",
                )}
              >
                {/* Decorative icon */}
                <span
                  className={cn(
                    "material-symbols-outlined",
                    "text-[calc(var(--font-size-headline-lg)*1.1)]",
                    "text-primary",
                  )}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                {/* Uppercase label */}
                <span
                  className={cn(
                    "text-[var(--font-size-label-sm)]",
                    "font-[var(--font-weight-label-sm)]",
                    "leading-[var(--line-height-label-sm)]",
                    "tracking-[var(--letter-spacing-label-sm)]",
                    "uppercase text-on-surface",
                  )}
                  style={{ fontFamily: "var(--font-family-jetbrains)" }}
                >
                  {item.label}
                </span>
              </InsetWell>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
