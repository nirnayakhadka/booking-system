import { useNavigate } from "react-router-dom";
import type { ServiceSummary } from "../../types/service";

export function ServiceGridCard({ service }: { service: ServiceSummary }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/services/${service.id}`)}
      disabled={!service.isAvailable}
      className={`group w-full overflow-hidden rounded-lg border text-left transition-all duration-200 bg-[var(--color-surface)] ${
        service.isAvailable
          ? "border-[var(--color-border)] hover:-translate-y-0.5 hover:border-marketplace hover:shadow-lg"
          : "border-[var(--color-border)] opacity-50 cursor-not-allowed"
      }`}
    >
      <div className="aspect-square w-full overflow-hidden bg-[var(--color-surface-muted)]">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
        )}
      </div>

      <div className="p-3">
        <h3 className="line-clamp-2 text-sm text-primary">{service.name}</h3>
        <p className="mt-2 font-semibold text-marketplace">
          {service.currency} {service.price}
        </p>
        <div className="mt-1 flex items-center justify-between text-xs text-secondary">
          <span>★ {service.rating}</span>
          <span className="truncate">{service.provider.name}</span>
        </div>
        {!service.isAvailable && (
          <p className="mt-1 text-xs text-danger">Unavailable</p>
        )}
      </div>
    </button>
  );
}
