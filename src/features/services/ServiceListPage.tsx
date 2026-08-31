import { useNavigate, useSearchParams } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/StatusStates";
import { HeroSection } from "./HeroSection";

const CATEGORIES = ["Wellness", "Home Services", "Tech Support"];

export function ServiceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search is driven by the URL (set by NavBar's search box) so both stay
  // in sync without prop-drilling or a shared context.
  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const { data, isLoading, isError, refetch } = useServices({
    search: search || undefined,
    category: category || undefined,
  });

  function handleCategoryChange(value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set("category", value);
    } else {
      next.delete("category");
    }
    setSearchParams(next);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-primary">Browse Services</h1>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-[var(--color-border)] bg-[var(--color-surface)] text-primary rounded-md px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <LoadingState label="Loading services..." />}
      {isError && (
        <ErrorState
          message="Couldn't load services."
          onRetry={() => refetch()}
        />
      )}
      {!isLoading && !isError && data?.items.length === 0 && (
        <EmptyState
          message={
            search
              ? `No services match "${search}".`
              : "No services match your filters."
          }
        />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <HeroSection service={data.items[0]} />

          <ul className="grid sm:grid-cols-2 gap-4">
            {data.items.map((service) => (
              <li key={service.id}>
                <button
                  onClick={() => navigate(`/services/${service.id}`)}
                  disabled={!service.isAvailable}
                  className={`w-full text-left border rounded-lg p-4 transition bg-[var(--color-surface)] ${
                    service.isAvailable
                      ? "border-[var(--color-border)] hover:border-marketplace hover:shadow-sm"
                      : "border-[var(--color-border)] opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h2 className="font-medium text-primary">{service.name}</h2>
                    <span className="text-sm text-secondary">
                      ★ {service.rating}
                    </span>
                  </div>
                  <p className="text-sm text-secondary mt-1">
                    {service.category}
                  </p>
                  <p className="text-sm text-secondary mt-1">
                    {service.provider.name}
                  </p>
                  <p className="mt-2 font-semibold text-primary">
                    {service.currency} {service.price}
                  </p>
                  {!service.isAvailable && (
                    <p className="text-xs text-red-500 mt-1">
                      Currently unavailable
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
