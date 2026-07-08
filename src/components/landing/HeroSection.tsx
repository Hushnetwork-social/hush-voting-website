import { cn } from "~/components/ui/cn";
import { BrandMark } from "./BrandMark";
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
        "relative flex flex-col items-center justify-center",
        "min-h-[80vh] px-4 text-center",
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

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        {/* Brand mark (decorative — adjacent headline identifies HushVoting) */}
        <BrandMark decorative />

        {/* Headline */}
        <h1
          id="hero-heading"
          className={cn(
            "font-bold tracking-tight",
            "text-[clamp(2rem,5vw,var(--font-size-display-lg))]",
            "leading-[clamp(2.5rem,5.5vw,var(--line-height-display-lg))]",
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
            "text-on-surface-variant max-w-2xl",
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
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
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
