import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-marketplace focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-muted)] disabled:pointer-events-none disabled:opacity-40";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-marketplace text-white shadow-sm hover:bg-marketplace-dark hover:shadow-md hover:-translate-y-px",
  outline:
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-primary hover:border-marketplace hover:text-marketplace",
  danger: "bg-danger text-white hover:opacity-90 hover:-translate-y-px",
  ghost: "text-secondary hover:bg-[var(--color-surface-muted)] hover:text-primary",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}