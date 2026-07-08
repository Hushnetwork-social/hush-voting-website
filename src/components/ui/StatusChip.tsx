import { cn } from "./cn";
import type { StatusTone } from "./types";

export interface StatusChipProps {
  label: string;
  tone?: StatusTone;
  icon?: string;
  className?: string;
}

const toneStyles: Record<StatusTone, string> = {
  neutral: "bg-surface-container-high text-on-surface",
  primary: "bg-primary-container text-on-primary-container",
  warning: "bg-tertiary-container text-on-tertiary-container",
  error: "bg-error-container text-on-error-container",
};

export function StatusChip({
  label,
  tone = "neutral",
  icon,
  className,
}: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)] leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
        toneStyles[tone],
        className,
      )}
      style={{ fontFamily: "var(--font-family-jetbrains)" }}
    >
      {icon && (
        <span
          className="material-symbols-outlined text-[var(--font-size-label-md)]"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {label}
    </span>
  );
}
