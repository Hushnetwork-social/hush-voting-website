import { cn } from "./cn";
import type { SurfaceTone } from "./types";

export interface CardProps {
  children: React.ReactNode;
  tone?: SurfaceTone;
  accent?: boolean;
  className?: string;
}

const toneStyles: Record<SurfaceTone, string> = {
  default: "bg-surface-container",
  primary: "bg-primary-container/20",
  warning: "bg-tertiary-container/20",
  error: "bg-error-container/20",
};

const accentStyles: Record<SurfaceTone, string> = {
  default: "border-t-primary",
  primary: "border-t-primary",
  warning: "border-t-tertiary",
  error: "border-t-error",
};

export function Card({
  children,
  tone = "default",
  accent = false,
  className,
}: CardProps) {
  const accentClasses = accent
    ? `border-t-2 border-solid ${accentStyles[tone]}`
    : null;

  return (
    <div
      className={cn(
        "rounded-default p-[var(--spacing-md)]",
        toneStyles[tone],
        accentClasses,
        className,
      )}
    >
      {children}
    </div>
  );
}
