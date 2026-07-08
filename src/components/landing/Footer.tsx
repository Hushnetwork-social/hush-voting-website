import { cn } from "~/components/ui/cn";
import { FOOTER } from "./constants";

export interface FooterProps {
  /** Optional class name for the outer `<footer>` element. */
  className?: string;
}

/**
 * Footer component for the HushVoting website.
 *
 * Renders a semantic `<footer>` landmark with brand text, tagline,
 * and utility links (Privacy Policy, Terms of Service, Security Audit).
 *
 * Static content only — no interactive state beyond link hover/focus.
 */
export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-surface-container-lowest",
        "px-[var(--spacing-gutter)] py-[var(--spacing-md)]",
        "max-sm:px-[var(--spacing-margin-mobile)]",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[var(--spacing-max-width-content)]",
          "flex-col items-center justify-between gap-[var(--spacing-sm)]",
          "sm:flex-row",
        )}
      >
        {/* Brand and tagline */}
        <div className="flex flex-col items-center sm:items-start">
          <span
            className={cn(
              "font-semibold",
              "text-[var(--font-size-body-md)]",
              "leading-[var(--line-height-body-md)]",
            )}
            style={{ fontFamily: "var(--font-family-hanken)" }}
          >
            {FOOTER.brand}
          </span>
          <span
            className={cn(
              "text-on-surface-variant",
              "text-[var(--font-size-label-sm)]",
              "leading-[var(--line-height-label-sm)]",
            )}
            style={{ fontFamily: "var(--font-family-jetbrains)" }}
          >
            {FOOTER.tagline}
          </span>
        </div>

        {/* Utility links */}
        <nav aria-label="Footer legal links">
          <ul
            className={cn(
              "flex flex-wrap items-center justify-center gap-[var(--spacing-xs)]",
              "sm:justify-end",
            )}
          >
            {FOOTER.links.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "inline-block px-[var(--spacing-xs)] py-[var(--spacing-xs)]",
                    "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
                    "leading-[var(--line-height-label-sm)]",
                    "tracking-[var(--letter-spacing-label-sm)]",
                    "uppercase text-on-surface-variant",
                    "hover:text-primary transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest",
                    "rounded-sm select-none",
                  )}
                  style={{ fontFamily: "var(--font-family-jetbrains)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
