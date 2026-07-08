import { cn } from "./cn";
import type { SurfaceTone } from "./types";

export interface MetricCardProps {
  label: string;
  value: string | number;
  description?: string;
  tone?: SurfaceTone;
  className?: string;
}

const toneAccent: Record<SurfaceTone, string> = {
  default: "border-l-primary",
  primary: "border-l-primary",
  warning: "border-l-tertiary",
  error: "border-l-error",
};

export function MetricCard({
  label,
  value,
  description,
  tone = "default",
  className,
}: MetricCardProps) {
  const displayValue =
    value === null || value === undefined || value === ""
      ? "\u2014"
      : String(value);

  return (
    <div
      className={cn(
        "rounded-default border-l-2 border-solid bg-surface-container-low p-[var(--spacing-md)]",
        toneAccent[tone],
        className,
      )}
    >
      <p
        className="mb-1 text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)] leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)] uppercase text-on-surface-variant"
        style={{ fontFamily: "var(--font-family-jetbrains)" }}
      >
        {label}
      </p>
      <p className="text-[var(--font-size-headline-lg)] font-[var(--font-weight-headline-lg)] leading-[var(--line-height-headline-lg)] text-on-surface">
        {displayValue}
      </p>
      {description && (
        <p className="mt-2 text-[var(--font-size-body-md)] leading-[var(--line-height-body-md)] text-on-surface-variant">
          {description}
        </p>
      )}
    </div>
  );
}
