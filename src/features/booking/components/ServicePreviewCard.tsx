import type { Service } from "../../../types/service";

export function ServicePreviewCard({ service }: { service: Service }) {
  return (
    <div className="flex gap-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-muted)] sm:h-24 sm:w-24">
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
        <p className="text-xs font-medium uppercase tracking-wide text-secondary">
          {service.category}
        </p>
        <h2 className="mt-0.5 truncate text-lg font-semibold text-primary">
          {service.name}
        </h2>
        <p className="mt-0.5 text-sm text-secondary">{service.provider.name}</p>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-secondary">
            ★ <span className="text-primary">{service.rating}</span>
          </span>
          <span className="text-secondary">·</span>
          <span className="text-secondary">{service.durationMinutes} min</span>
          <span className="text-secondary">·</span>
          <span className="font-semibold text-marketplace">
            {service.currency} {service.price}
          </span>
        </div>
      </div>
    </div>
  );
}
