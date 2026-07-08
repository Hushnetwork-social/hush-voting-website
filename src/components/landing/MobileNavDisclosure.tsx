import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "~/components/ui/cn";
import { NAV_LINKS, CTAS } from "./constants";

export interface MobileNavDisclosureProps {
  /** Optional class name for the outer wrapper. */
  className?: string;
}

/**
 * Accessible mobile navigation disclosure.
 *
 * Renders a toggle button (native `<button>`) and a dropdown panel
 * containing section links and the Pilot Access CTA. Uses `aria-expanded`,
 * `aria-controls` for accessibility. Closes on link activation or Escape.
 *
 * Touch targets are at least 48px. Reduced motion is respected via
 * Tailwind's `motion-safe:*` utilities.
 */
export function MobileNavDisclosure({ className }: MobileNavDisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }

    // Delay adding the listener so the trigger click itself doesn't close
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [open, close]);

  const handleLinkActivation = useCallback(() => {
    close();
  }, [close]);

  return (
    <div className={cn("lg:hidden", className)}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "inline-flex items-center justify-center",
          "h-12 w-12 rounded-default",
          "text-on-surface hover:bg-surface-container-high",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "transition-colors motion-safe:transition-colors",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Hamburger / close icon — CSS-only */}
        <span className="relative inline-block h-6 w-6" aria-hidden="true">
          <span
            className={cn(
              "absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-transform motion-safe:transition-transform",
              open ? "-translate-y-1/2 rotate-45" : "-translate-y-[6px]",
            )}
          />
          <span
            className={cn(
              "absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-opacity motion-safe:transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-transform motion-safe:transition-transform",
              open ? "-translate-y-1/2 -rotate-45" : "translate-y-[4px]",
            )}
          />
        </span>
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        id={panelId}
        className={cn(
          "absolute left-0 right-0 top-full z-50 overflow-hidden",
          "bg-surface-container-low border-t border-outline-variant",
          "transition-all motion-safe:transition-all",
          open
            ? "max-h-96 opacity-100 visible"
            : "max-h-0 opacity-0 invisible pointer-events-none",
        )}
      >
        <nav aria-label="Primary" className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkActivation}
              className={cn(
                "flex items-center h-12 px-3 rounded-default",
                "text-on-surface hover:bg-surface-container-high",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                "transition-colors motion-safe:transition-colors",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CTAS.navPilotAccess.href}
            onClick={handleLinkActivation}
            className={cn(
              "flex items-center justify-center h-12 px-4 rounded-default mt-2",
              "bg-primary text-on-primary font-medium",
              "hover:brightness-110 active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              "transition-all motion-safe:transition-all",
            )}
          >
            {CTAS.navPilotAccess.label}
          </a>
        </nav>
      </div>
    </div>
  );
}
