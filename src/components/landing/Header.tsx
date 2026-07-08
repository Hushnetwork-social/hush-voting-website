import { cn } from "~/components/ui/cn";
import { BrandMark } from "./BrandMark";
import { MobileNavDisclosure } from "./MobileNavDisclosure";
import { BRAND_TEXT, NAV_LINKS, CTAS } from "./constants";

export interface HeaderProps {
  /** Optional class name for the outer `<header>` element. */
  className?: string;
}

/**
 * Fixed top navigation bar for the HushVoting landing page.
 *
 * Composes BrandMark, desktop section anchor links, Pilot Access CTA,
 * and a mobile disclosure menu. Uses Sovereign Shield tokens and
 * backdrop blur for the surface treatment.
 *
 * Desktop: brand + 4 nav links + CTA
 * Mobile: brand + disclosure trigger (links + CTA in panel)
 */
export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        "bg-surface/80 backdrop-blur-md",
        "border-b border-outline-variant",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between",
          "h-16 px-4",
          "max-w-[var(--spacing-max-width-content)]",
        )}
      >
        {/* Brand — links to home */}
        <a
          href="/"
          className={cn(
            "flex items-center gap-2 no-underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-md",
          )}
          aria-label="HushVoting home"
        >
          <BrandMark decorative />
          <span
            className="font-bold text-xl tracking-tight text-on-surface hidden sm:inline"
            style={{ fontFamily: "var(--font-family-hanken)" }}
          >
            {BRAND_TEXT}
          </span>
        </a>

        {/* Desktop nav links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex items-center h-10 px-3 rounded-default",
                "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high",
                "text-sm font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                "transition-colors motion-safe:transition-colors",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={CTAS.navPilotAccess.href}
          className={cn(
            "hidden md:inline-flex items-center justify-center",
            "h-10 px-4 rounded-default",
            "bg-primary text-on-primary text-sm font-medium",
            "hover:brightness-110 active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            "transition-all motion-safe:transition-all",
          )}
        >
          {CTAS.navPilotAccess.label}
        </a>

        {/* Mobile disclosure */}
        <MobileNavDisclosure />
      </div>
    </header>
  );
}
