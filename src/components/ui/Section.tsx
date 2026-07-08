import { cn } from "./cn";

export interface SectionProps {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  as?: "section" | "div";
}

export function Section({
  children,
  eyebrow,
  title,
  description,
  actions,
  className,
  as: Component = "section",
}: SectionProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[var(--spacing-max-width-content)] px-[var(--spacing-gutter)] py-[var(--spacing-xl)]",
        "max-sm:px-[var(--spacing-margin-mobile)] max-sm:py-[var(--spacing-lg)]",
        className,
      )}
    >
      {eyebrow && (
        <p
          className="mb-2 text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)] leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)] uppercase text-on-surface-variant"
          style={{ fontFamily: "var(--font-family-jetbrains)" }}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="mb-4 text-[var(--font-size-headline-lg)] font-[var(--font-weight-headline-lg)] leading-[var(--line-height-headline-lg)] text-on-surface">
          {title}
        </h2>
      )}
      {description && (
        <p className="mb-8 max-w-prose text-[var(--font-size-body-lg)] leading-[var(--line-height-body-lg)] text-on-surface-variant">
          {description}
        </p>
      )}
      {actions && <div className="mb-8 flex flex-wrap gap-4">{actions}</div>}
      <div>{children}</div>
    </Component>
  );
}
