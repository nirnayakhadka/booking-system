import { Link } from "react-router-dom";

interface LogoProps {
  /**
   * Size of the square brand tile containing the logo artwork.
   * The logo is portrait (784x1168) so it fits via object-contain.
   */
  size?: "sm" | "md";
  withWordmark?: boolean;
}

const tileSizes = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
};

const imageSizes = {
  sm: "h-8 w-8",
  md: "h-11 w-11",
};

/**
 * Brand logo used in the header and footer. The logo artwork has a
 * light background, so it is always shown on a white tile regardless of
 * theme — this keeps it legible in dark mode without re-exporting a
 * theme-specific variant of the asset.
 */
export function Logo({ size = "sm", withWordmark = false }: LogoProps) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Demo Marketplace home">
      <span
        className={`${tileSizes[size]} flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[var(--color-border)] transition group-hover:shadow-md`}
      >
        <img
          src="/logo.svg"
          alt="Demo Marketplace logo"
          className={`${imageSizes[size]} object-contain`}
          loading="lazy"
        />
      </span>
      {withWordmark && (
        <span className="hidden text-base font-bold text-primary sm:inline">
          Demo Marketplace
        </span>
      )}
    </Link>
  );
}