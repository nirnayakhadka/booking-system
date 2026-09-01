// HeroSection.tsx
import { useNavigate } from "react-router-dom";
import { CategoryStrip } from "./CategoryStrip";
import type { ServiceSummary } from "../../types/service";

interface HeroSectionProps {
  services: ServiceSummary[];
}

export function HeroSection({ services }: HeroSectionProps) {
  const navigate = useNavigate();
  if (services.length === 0) return null;

  const [featured] = services;

  return (
    <div className="w-full">
      {/* Hero content is vertically centered, not pinned to the bottom —
          that's what leaves clear space for the category strip to overlap
          into without colliding with the CTA. */}
      <div className="relative h-[460px] w-full overflow-hidden sm:h-[540px]">
        {featured.imageUrl ? (
          <img
            src={featured.imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {featured.category}
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
              {featured.name}
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              {featured.description}
            </p>

            <div className="mt-7 flex items-center gap-5">
              <button
                onClick={() => navigate(`/services/${featured.id}`)}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-white/90 sm:text-base"
              >
                Book now
              </button>
              <span className="text-sm text-white/80">
                {featured.currency} {featured.price} · ★ {featured.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category strip overlaps the empty lower portion of the image
          only — never the text block above, so nothing gets covered. */}
      <div className="mx-auto -mt-14 max-w-7xl px-2 sm:px-4 lg:px-8">
        <CategoryStrip />
      </div>
    </div>
  );
}
