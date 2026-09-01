import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../../hooks/useService";
import { LoadingState, ErrorState } from "../../components/StatusStates";
import { Avatar } from "../../components/ui/Avatar";

export function ServiceDetailsPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { data: service, isLoading, isError, refetch } = useService(serviceId);

  // Service currently exposes a single imageUrl. The gallery is built to
  // accept multiple images so it's a one-line change (service.images) if
  // the API contract grows a gallery later — it just degrades to a single
  // frame with no thumbnail strip today instead of faking extra photos.
  const images = service?.imageUrl ? [service.imageUrl] : [];
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return <LoadingState label="Loading service..." />;
  if (isError || !service) {
    return (
      <ErrorState
        message="Couldn't load this service."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-secondary hover:text-primary"
      >
        ← Back
      </button>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Left: image + thumbnails */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={service.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded-md border-2 ${
                    i === activeImage
                      ? "border-marketplace"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: sticky booking panel */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-sm text-secondary">{service.category}</p>
          <h1 className="mt-1 text-2xl font-semibold text-primary">
            {service.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <Avatar name={service.provider.name} size="sm" />
            <span className="text-sm text-secondary">
              {service.provider.name}
            </span>
            <span className="text-secondary">·</span>
            <span className="text-sm text-secondary">★ {service.rating}</span>
          </div>

          <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-marketplace">
                {service.currency} {service.price}
              </span>
              <span className="text-sm text-secondary">
                / {service.durationMinutes} min
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  service.isAvailable ? "bg-success" : "bg-danger"
                }`}
              />
              <span
                className={
                  service.isAvailable ? "text-primary" : "text-danger"
                }
              >
                {service.isAvailable
                  ? "Available for booking"
                  : "Currently unavailable"}
              </span>
            </div>

            <button
              onClick={() => navigate(`/services/${service.id}/book`)}
              disabled={!service.isAvailable}
              className="mt-5 w-full rounded-md bg-marketplace py-3 font-medium text-white transition hover:bg-marketplace-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Book this service
            </button>
          </div>
        </div>
      </div>

      {/* Full-width description below, like the reference layout */}
      <div className="mt-10 max-w-3xl border-t border-[var(--color-border)] pt-8">
        <h2 className="text-lg font-semibold text-primary">
          About this service
        </h2>
        <p className="mt-3 leading-relaxed text-secondary">
          {service.description}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-secondary">Category</dt>
            <dd className="mt-1 font-medium text-primary">
              {service.category}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-secondary">Duration</dt>
            <dd className="mt-1 font-medium text-primary">
              {service.durationMinutes} min
            </dd>
          </div>
          <div>
            <dt className="text-xs text-secondary">Rating</dt>
            <dd className="mt-1 font-medium text-primary">
              ★ {service.rating}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-secondary">Provider</dt>
            <dd className="mt-1 truncate font-medium text-primary">
              {service.provider.name}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
