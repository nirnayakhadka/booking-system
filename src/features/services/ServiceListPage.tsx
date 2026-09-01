import { useSearchParams } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useCategories } from "../../hooks/useCategories";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/StatusStates";
import { ServiceGridCard } from "../../components/ui/ServiceGridCard";
import { HeroSection } from "./HeroSection";

export function ServiceListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const { data, isLoading, isError, refetch } = useServices({
    search: search || undefined,
    category: category || undefined,
  });
  const { data: categories } = useCategories();

  function selectCategory(next: string) {
    // Keep the active search term; only the category part of the URL
    // changes, so the service list refetches with the new filter.
    const nextParams = new URLSearchParams(searchParams);
    if (next) {
      nextParams.set("category", next);
    } else {
      nextParams.delete("category");
    }
    setSearchParams(nextParams, { replace: true });
  }

  return (
    <div>
      {!isLoading && !isError && data && data.items.length > 0 && (
        <HeroSection services={data.items} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-primary">
            {search ? `Results for "${search}"` : "Browse Services"}
          </h1>

          <nav
            aria-label="Filter by category"
            className="flex max-w-full gap-2 overflow-x-auto pb-1"
          >
            <button
              onClick={() => selectCategory("")}
              className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                !category
                  ? "bg-marketplace text-white shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] text-secondary hover:border-marketplace hover:text-primary"
              }`}
            >
              All
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.name}
                onClick={() => selectCategory(cat.name)}
                className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  category === cat.name
                    ? "bg-marketplace text-white shadow-sm"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)] text-secondary hover:border-marketplace hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
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
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {data.items.map((service, index) => (
              <li
                key={service.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
              >
                <ServiceGridCard service={service} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
