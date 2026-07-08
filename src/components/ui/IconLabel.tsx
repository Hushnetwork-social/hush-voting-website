import { cn } from "./cn";

export interface IconLabelProps {
  icon: string;
  children: React.ReactNode;
  className?: string;
}

export function IconLabel({ icon, children, className }: IconLabelProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="material-symbols-outlined text-on-surface-variant"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-on-surface-variant">{children}</span>
    </span>
  );
}
