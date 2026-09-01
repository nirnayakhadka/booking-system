import { useNavigate } from "react-router-dom";
import type { ServiceSummary } from "../../types/service";

export function ServiceCard({ service }: { service: ServiceSummary }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/services/${service.id}`)}
      disabled={!service.isAvailable}
      className={`flex w-full gap-4 rounded-lg border p-3 text-left transition-all duration-200 bg-[var(--color-surface)] ${
        service.isAvailable
          ? "border-[var(--color-border)] hover:border-marketplace hover:shadow-sm"
          : "border-[var(--color-border)] opacity-50 cursor-not-allowed"
      }`}
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-[var(--color-surface-muted)]">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="truncate font-medium text-primary">{service.name}</h2>
          <span className="flex-shrink-0 text-sm text-secondary">
            ★ {service.rating}
          </span>
        </div>
        <p className="mt-1 text-sm text-secondary">{service.category}</p>
        <p className="text-sm text-secondary">{service.provider.name}</p>
        <p className="mt-2 font-semibold text-primary">
          {service.currency} {service.price}
        </p>
        {!service.isAvailable && (
          <p className="mt-1 text-xs text-danger">Currently unavailable</p>
        )}
      </div>
    </button>
  );
}
