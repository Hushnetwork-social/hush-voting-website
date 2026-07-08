import { cn } from "./cn";

export interface InsetWellProps {
  children: React.ReactNode;
  className?: string;
}

export function InsetWell({ children, className }: InsetWellProps) {
  return (
    <div
      className={cn(
        "rounded-default bg-surface-container-lowest p-[var(--spacing-sm)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
