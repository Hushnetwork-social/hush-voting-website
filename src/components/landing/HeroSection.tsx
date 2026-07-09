import { cn } from "~/components/ui/cn";
import { HERO_COPY, CTAS } from "./constants";

export interface HeroSectionProps {
  /** Optional class name for the `<section>` element. */
  className?: string;
}

/**
 * Landing page hero section.
 *
 * Composes the brand mark, approved headline, approved subheadline,
 * two CTAs, and a restrained purple glow effect. Uses Sovereign Shield
 * tokens and responsive typography.
 *
 * Contains exactly one page-level `<h1>` with the approved headline.
 * Decorative glow is CSS-only and aria-hidden.
 */
export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "relative flex flex-col justify-center",
        "min-h-[calc(100vh-4.5rem)] pt-[72px] text-left",
        "max-sm:text-center",
        "overflow-hidden",
        className,
      )}
    >
      {/* Purple glow — decorative */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2",
          "h-[500px] w-[500px] rounded-full",
          "bg-primary/10 blur-[120px]",
        )}
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[var(--spacing-max-width-content)] flex-col items-start gap-6 px-4",
          "max-sm:items-center max-sm:px-[var(--spacing-margin-mobile)]",
        )}
      >
        {/* Headline */}
        <h1
          id="hero-heading"
          className={cn(
            "max-w-[min(68rem,68vw)] font-bold tracking-tight",
            "max-lg:max-w-4xl",
            "text-[clamp(3.5rem,7.2vw,6.5rem)] max-md:text-[clamp(2.75rem,11vw,5rem)]",
            "leading-[0.95]",
          )}
          style={{
            fontFamily: "var(--font-family-hanken)",
            letterSpacing: "var(--letter-spacing-display-lg)",
          }}
        >
          {HERO_COPY.headline}
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            "text-on-surface-variant max-w-3xl",
            "text-[clamp(1rem,2vw,var(--font-size-body-lg))]",
            "leading-[clamp(1.5rem,2.5vw,var(--line-height-body-lg))]",
          )}
          style={{
            fontFamily: "var(--font-family-hanken)",
          }}
        >
          {HERO_COPY.subheadline}
        </p>

        {/* CTA row */}
        <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
          {/* Primary CTA — Request pilot access */}
          <a
            href={CTAS.pilotAccess.href}
            className={cn(
              "inline-flex items-center justify-center",
              "h-12 px-6 rounded-default min-w-[200px]",
              "bg-primary text-on-primary font-medium text-base",
              "hover:brightness-110 active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              "transition-all motion-safe:transition-all",
            )}
          >
            {CTAS.pilotAccess.label}
          </a>

          {/* Secondary CTA — View verifier model */}
          <a
            href={CTAS.verifierModel.href}
            className={cn(
              "inline-flex items-center justify-center",
              "h-12 px-6 rounded-default min-w-[200px]",
              "bg-surface-container-high text-on-surface font-medium text-base",
              "hover:bg-surface-container-highest active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              "transition-all motion-safe:transition-all",
            )}
          >
            {CTAS.verifierModel.label}
          </a>
        </div>
      </div>
    </section>
  );
}
