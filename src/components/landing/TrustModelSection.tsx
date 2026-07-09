import { cn } from "~/components/ui/cn";
import { TRUST_SECTION } from "./constants";

export interface TrustModelSectionProps {
  /** Optional class name for the outer `<section>` element. */
  className?: string;
}

/**
 * Trust Model Hierarchy section for the homepage.
 *
 * Renders the relationship between HushVoting! (application interface &
 * orchestration layer) and HushNetwork (trust, privacy, and blockchain
 * foundation) as two vertically stacked informational cards with
 * capability chips, trust labels, and a decorative gradient connector.
 *
 * Static content only — no interactive state, API calls, or server
 * actions.
 */
export function TrustModelSection({ className }: TrustModelSectionProps) {
  const { eyebrow, heading, supportingCopy, hushVoting, hushNetwork } =
    TRUST_SECTION;

  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className={cn(
        "section-anchor",
        "relative mx-auto max-w-[var(--spacing-max-width-content)]",
        "px-[var(--spacing-gutter)] py-[var(--spacing-xl)]",
        "max-sm:px-[var(--spacing-margin-mobile)] max-sm:py-[var(--spacing-lg)]",
        "overflow-hidden",
        className,
      )}
    >
      {/* Section header — eyebrow, heading, supporting copy */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        {eyebrow && (
          <p
            className={cn(
              "mb-2",
              "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
              "leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
              "uppercase text-on-surface-variant",
            )}
            style={{ fontFamily: "var(--font-family-jetbrains)" }}
          >
            {eyebrow}
          </p>
        )}

        <h2
          id="trust-heading"
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
            "text-[var(--font-size-body-md)] max-md:text-[var(--font-size-body-md)]",
            "leading-[var(--line-height-body-md)]",
          )}
          style={{
            fontFamily: "var(--font-family-hanken)",
          }}
        >
          {supportingCopy}
        </p>
      </div>

      {/* Trust hierarchy cards */}
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* ── HushVoting! layer (upper card) ── */}
        <div className="relative w-full">
          {/* Subtle glow behind the HushVoting! card */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 -top-8",
              "rounded-[var(--radius-xl)]",
              "bg-primary/5 blur-[80px]",
            )}
          />

          <div
            className={cn(
              "relative z-10",
              "rounded-[var(--radius-lg)]",
              "bg-surface-container p-[var(--spacing-md)]",
              "max-sm:p-[var(--spacing-sm)]",
            )}
          >
            {/* Card label */}
            <p
              className={cn(
                "mb-1 font-semibold",
                "text-[var(--font-size-headline-md)]",
                "leading-[var(--line-height-headline-md)]",
              )}
              style={{ fontFamily: "var(--font-family-hanken)" }}
            >
              {hushVoting.title}
            </p>

            {/* Trust label (subtitle) */}
            <p
              className={cn(
                "mb-4",
                "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
                "leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
                "uppercase text-primary",
              )}
              style={{ fontFamily: "var(--font-family-jetbrains)" }}
            >
              {hushVoting.subtitle}
            </p>

            {/* Capability chips */}
            <div className="flex flex-wrap gap-2">
              {hushVoting.capabilities.map((chip) => (
                <span
                  key={chip.label}
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    "rounded-full px-3 py-1",
                    "bg-surface-container-high text-on-surface",
                    "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
                    "leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
                  )}
                  style={{ fontFamily: "var(--font-family-jetbrains)" }}
                >
                  <span
                    className="material-symbols-outlined text-[var(--font-size-label-md)]"
                    aria-hidden="true"
                  >
                    {chip.icon}
                  </span>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Decorative gradient connector ── */}
        <div
          aria-hidden="true"
          className={cn(
            "relative z-10",
            "flex items-center justify-center",
            "h-12 w-1",
          )}
        >
          <div
            className={cn(
              "h-full w-0.5",
              "bg-gradient-to-b from-primary/60 to-primary/10",
            )}
          />
        </div>

        {/* ── HushNetwork layer (lower card) ── */}
        <div
          className={cn(
            "relative w-full",
            "rounded-[var(--radius-lg)]",
            "bg-surface-container-low p-[var(--spacing-md)]",
            "max-sm:p-[var(--spacing-sm)]",
          )}
        >
          {/* Card label */}
          <p
            className={cn(
              "mb-1 font-semibold",
              "text-[var(--font-size-headline-md)]",
              "leading-[var(--line-height-headline-md)]",
            )}
            style={{ fontFamily: "var(--font-family-hanken)" }}
          >
            {hushNetwork.title}
          </p>

          {/* Trust label (subtitle) */}
          <p
            className={cn(
              "mb-4",
              "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
              "leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
              "uppercase text-on-surface-variant",
            )}
            style={{ fontFamily: "var(--font-family-jetbrains)" }}
          >
            {hushNetwork.subtitle}
          </p>

          {/* Trust labels */}
          <div className="flex flex-wrap gap-2">
            {hushNetwork.trustLabels.map((label) => (
              <span
                key={label}
                className={cn(
                  "inline-flex items-center",
                  "rounded-full px-3 py-1",
                  "bg-surface-container-high text-on-surface",
                  "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
                  "leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
                )}
                style={{ fontFamily: "var(--font-family-jetbrains)" }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
