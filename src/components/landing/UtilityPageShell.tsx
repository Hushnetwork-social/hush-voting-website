import { cn } from "~/components/ui/cn";
import { Section } from "~/components/ui/Section";
import { Card } from "~/components/ui/Card";
import type { UtilityPageConfig } from "./constants";

export interface UtilityPageShellProps {
  /** The utility page configuration from UTILITY_PAGES constants. */
  config: UtilityPageConfig;
}

/**
 * Shared utility page shell for Privacy Policy, Terms of Service,
 * and Security Audit placeholder pages.
 *
 * Renders a single utility page with:
 * - One `h1` with the page title
 * - Visible pending-review status message
 * - Concise body copy from constants
 * - A visible back-to-home navigation link
 *
 * Uses existing `Section` and `Card` primitives from the design system.
 */
export function UtilityPageShell({ config }: UtilityPageShellProps) {
  return (
    <Section>
      <Card className="mx-auto max-w-prose">
        <h1
          className={cn(
            "mb-4 font-semibold",
            "text-[var(--font-size-headline-lg)]",
            "leading-[var(--line-height-headline-lg)]",
          )}
          style={{ fontFamily: "var(--font-family-hanken)" }}
        >
          {config.title}
        </h1>

        {/* Pending-review status chip */}
        <p
          className={cn(
            "mb-6 inline-block",
            "rounded-[var(--radius-sm)]",
            "bg-surface-container-high px-3 py-1",
            "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
            "leading-[var(--line-height-label-sm)]",
            "tracking-[var(--letter-spacing-label-sm)]",
            "text-on-surface-variant",
          )}
          style={{ fontFamily: "var(--font-family-jetbrains)" }}
        >
          {config.status}
        </p>

        {/* Intro copy */}
        <p
          className={cn(
            "mb-8 text-on-surface-variant",
            "text-[var(--font-size-body-md)]",
            "leading-[var(--line-height-body-md)]",
          )}
          style={{ fontFamily: "var(--font-family-hanken)" }}
        >
          {config.bodyCopy}
        </p>

        {/* Draft policy sections */}
        <div className="mb-8 grid gap-[var(--spacing-md)]">
          {config.sections.map((section) => (
            <section key={section.title} aria-labelledby={`${config.route}-${section.title}`}>
              <h2
                id={`${config.route}-${section.title}`}
                className={cn(
                  "mb-2 font-semibold text-on-surface",
                  "text-[var(--font-size-headline-md)]",
                  "leading-[var(--line-height-headline-md)]",
                )}
                style={{ fontFamily: "var(--font-family-hanken)" }}
              >
                {section.title}
              </h2>
              <p
                className={cn(
                  "text-on-surface-variant",
                  "text-[var(--font-size-body-md)]",
                  "leading-[var(--line-height-body-md)]",
                )}
                style={{ fontFamily: "var(--font-family-hanken)" }}
              >
                {section.body}
              </p>
              {section.items && (
                <ul className="mt-3 grid gap-2 pl-5 text-on-surface-variant">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="list-disc text-[var(--font-size-body-md)] leading-[var(--line-height-body-md)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Back-to-home link */}
        <a
          href={config.backToHomeHref}
          className={cn(
            "inline-flex items-center gap-1",
            "text-primary hover:brightness-110",
            "transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "rounded-sm select-none",
          )}
        >
          <span
            className="material-symbols-outlined text-[1.2em]"
            aria-hidden="true"
          >
            arrow_back
          </span>
          {config.backToHomeLabel}
        </a>
      </Card>
    </Section>
  );
}
