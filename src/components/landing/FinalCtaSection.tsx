import { useState } from "react";
import { cn } from "~/components/ui/cn";
import { FINAL_CTA_SECTION } from "./constants";
import { sendPilotAccessRequest } from "~/server/pilotAccess";
import { PilotAccessOverlay } from "./PilotAccessOverlay";

export interface FinalCtaSectionProps {
  /** Optional class name for the outer `<section>` element. */
  className?: string;
}

/**
 * Final CTA (pilot access) section rendered above the footer.
 *
 * Renders a glow card with heading, description, a primary button that opens
 * the pilot access form overlay, and a visible placeholder notice.
 *
 * The overlay designs the capture flow only; message sending is intentionally
 * not connected yet.
 */
export function FinalCtaSection({ className }: FinalCtaSectionProps) {
  const [isPilotOverlayOpen, setIsPilotOverlayOpen] = useState(false);

  return (
    <section
      id={FINAL_CTA_SECTION.id}
      aria-labelledby="pilot-access-heading"
      className={cn("section-anchor", className)}
    >
      <div
        className={cn(
          "mx-auto max-w-[var(--spacing-max-width-content)]",
          "px-[var(--spacing-gutter)] py-[var(--spacing-xl)]",
          "max-sm:px-[var(--spacing-margin-mobile)] max-sm:py-[var(--spacing-lg)]",
        )}
      >
        {/* Glow card container */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[2rem]",
            "bg-surface-container p-[var(--spacing-lg)]",
            "max-sm:p-[var(--spacing-md)]",
            "text-center",
          )}
        >
          {/* Subtle glow overlay */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)]",
              "opacity-[0.08]",
            )}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <h2
              id="pilot-access-heading"
              className={cn(
                "mb-4 font-semibold",
                "text-[clamp(1.5rem,4vw,var(--font-size-headline-lg))]",
                "leading-[clamp(2rem,4.5vw,var(--line-height-headline-lg))]",
              )}
              style={{ fontFamily: "var(--font-family-hanken)" }}
            >
              {FINAL_CTA_SECTION.heading}
            </h2>

            <p
              className={cn(
                "mx-auto mb-8 max-w-prose text-on-surface-variant",
                "text-[var(--font-size-body-md)]",
                "leading-[var(--line-height-body-md)]",
              )}
              style={{ fontFamily: "var(--font-family-hanken)" }}
            >
              {FINAL_CTA_SECTION.description}
            </p>

            {/*
              Primary CTA — opens pilot access overlay.
              Future: a secondary Protocol Omega overview download can return
              when an approved public PDF exists.
            */}
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center",
                "rounded-[var(--radius-default)]",
                "px-7 py-3.5 text-base font-medium",
                "bg-primary text-on-primary",
                "hover:brightness-110 active:scale-[0.98]",
                "transition-all select-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container",
              )}
              aria-label={FINAL_CTA_SECTION.primaryActionLabel}
              onClick={() => setIsPilotOverlayOpen(true)}
            >
              {FINAL_CTA_SECTION.primaryActionLabel}
            </button>

            {/* Visible placeholder notice */}
            <p
              className={cn(
                "mt-6 text-on-surface-variant",
                "text-[var(--font-size-label-sm)]",
                "leading-[var(--line-height-label-sm)]",
                "tracking-[var(--letter-spacing-label-sm)]",
              )}
              style={{ fontFamily: "var(--font-family-jetbrains)" }}
            >
              {FINAL_CTA_SECTION.placeholderNote}
            </p>
          </div>
        </div>
      </div>

      <PilotAccessOverlay
        open={isPilotOverlayOpen}
        onClose={() => setIsPilotOverlayOpen(false)}
        onSubmitRequest={async (data) => {
          await sendPilotAccessRequest({ data });
        }}
      />
    </section>
  );
}
