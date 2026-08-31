import { useNavigate } from "react-router-dom";
import type { ServiceSummary } from "../../types/service";

interface HeroSectionProps {
  service: ServiceSummary;
}

/**
 * Featured banner above the service list. Takes a service already fetched
 * by the parent page rather than fetching its own data — avoids a second
 * network call for what's really just a different presentation of the
 * same list data.
 */
export function HeroSection({ service }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/services/${service.id}`)}
      className="group relative mb-8 block w-full overflow-hidden rounded-2xl text-left"
    >
      {/* Image layer — falls back to a brand-color gradient if no imageUrl */}
      <div className="relative h-64 w-full sm:h-80">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
        )}
        {/* Scrim so white text stays readable regardless of image brightness */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/80">
          Featured Service
        </p>
        <h2 className="text-2xl font-bold text-white transition group-hover:underline sm:text-4xl">
          {service.name}
        </h2>
        <div className="mt-3 flex items-center gap-3 text-sm text-white/90">
          <span>{service.category}</span>
          <span className="h-1 w-1 rounded-full bg-white/60" />
          <span>★ {service.rating}</span>
          <span className="h-1 w-1 rounded-full bg-white/60" />
          <span>
            {service.currency} {service.price}
          </span>
        </div>
      </div>
    </button>
  );
}
