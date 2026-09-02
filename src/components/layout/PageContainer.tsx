import type { ReactNode } from "react";

/**
 * Single source of truth for page width/outer padding. Every route
 * renders through this so the layout can never drift between pages
 * (e.g. one page with `max-w-7xl` and another with a different width).
 *
 * `className` is appended for per-page vertical spacing, e.g. "py-8".
 */
export function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}