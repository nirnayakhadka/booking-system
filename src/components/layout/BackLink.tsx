import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

/** Consistent "← Back" affordance used at the top of most routes. */
export function BackLink({
  to,
  children = "Back",
}: {
  /** Destination path. Omit to go back one history entry (navigate(-1)). */
  to?: string;
  children?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary transition hover:text-marketplace"
    >
      <span aria-hidden="true">←</span>
      {children}
    </button>
  );
}