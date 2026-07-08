import { cn } from "./cn";
import type { ButtonVariant, ButtonSize } from "./types";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:brightness-110 active:scale-[0.98] transition-all",
  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-container-highest active:scale-[0.98] transition-all",
  ghost:
    "bg-transparent text-on-surface-variant hover:bg-surface-container-low active:scale-[0.98] transition-all",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-base rounded-default",
  lg: "px-7 py-3.5 text-lg rounded-default",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const disabledStyles =
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium select-none",
        variantStyles[variant],
        sizeStyles[size],
        focusRing,
        disabledStyles,
        isLoading && "cursor-wait",
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && (
        <span
          className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
