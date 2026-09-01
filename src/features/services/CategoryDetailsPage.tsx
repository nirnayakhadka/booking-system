import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useCategories } from "../../hooks/useCategories";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../components/StatusStates";
import { ServiceCard } from "../../components/ui/ServiceCard";
import { ServiceGridCard } from "../../components/ui/ServiceGridCard";
import type { ServiceSummary } from "../../types/service";

type SortOption = "best_match" | "price_low" | "price_high" | "rating";
type ViewMode = "grid" | "list";

const SORT_LABELS: Record<SortOption, string> = {
  best_match: "Best Match",
  price_low: "Price: Low to High",
  price_high: "Price: High to Low",
  rating: "Highest Rated",
};

/**
 * Sorting is done client-side over the already-fetched page of results.
 * There's no `sort` param in the API contract yet — this is a UI-layer
 * convenience, not a real backend capability. If result sets grow large
 * enough to need server-side sorting/pagination, this should move into
 * ServiceListParams and the mock/real API instead.
 */
function sortServices(
  items: ServiceSummary[],
  sort: SortOption,
): ServiceSummary[] {
  const sorted = [...items];
  switch (sort) {
    case "price_low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export function CategoryDetailsPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const category = categoryName ? decodeURIComponent(categoryName) : "";

  const [sort, setSort] = useState<SortOption>("best_match");
  const [view, setView] = useState<ViewMode>("grid");

  const { data, isLoading, isError, refetch } = useServices({
    category: category || undefined,
  });
  const { data: categories } = useCategories();

  const sortedItems = data ? sortServices(data.items, sort) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-sm text-secondary hover:text-primary"
      >
        ← Back to all services
      </button>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full flex-shrink-0 lg:w-56">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
            Category
          </h2>
          <nav className="flex flex-col gap-1">
            {categories?.map((cat) => (
              <button
                key={cat.name}
                onClick={() =>
                  navigate(`/categories/${encodeURIComponent(cat.name)}`)
                }
                className={`rounded-md px-3 py-2 text-left text-sm transition ${
                  cat.name === category
                    ? "bg-marketplace font-medium text-white"
                    : "text-secondary hover:bg-[var(--color-surface-muted)] hover:text-primary"
                }`}
              >
                {cat.name}
                <span className="ml-1 text-xs opacity-70">
                  ({cat.serviceCount})
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
            <div>
              <h1 className="text-2xl font-semibold text-primary">
                {category}
              </h1>
              {data && (
                <p className="mt-1 text-sm text-secondary">
                  Showing {sortedItems.length} result
                  {sortedItems.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-secondary">
                Sort By:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-2 py-1.5 text-sm text-primary"
                >
                  {Object.entries(SORT_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex overflow-hidden rounded-md border border-[var(--color-border)]">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`px-2.5 py-1.5 text-sm transition ${
                    view === "grid"
                      ? "bg-marketplace text-white"
                      : "bg-[var(--color-surface-raised)] text-secondary hover:bg-[var(--color-surface)]"
                  }`}
                >
                  ▦
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`px-2.5 py-1.5 text-sm transition ${
                    view === "list"
                      ? "bg-marketplace text-white"
                      : "bg-[var(--color-surface-raised)] text-secondary hover:bg-[var(--color-surface)]"
                  }`}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>

          {isLoading && (
            <LoadingState label={`Loading ${category} services...`} />
          )}
          {isError && (
            <ErrorState
              message="Couldn't load services."
              onRetry={() => refetch()}
            />
          )}
          {!isLoading && !isError && sortedItems.length === 0 && (
            <EmptyState
              message={`No services available in ${category} right now.`}
            />
          )}

          {!isLoading && !isError && sortedItems.length > 0 && (
            <ul
              className={
                view === "grid"
                  ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  : "flex flex-col gap-4"
              }
            >
              {sortedItems.map((service, index) => (
                <li
                  key={service.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
                >
                  {view === "grid" ? (
                    <ServiceGridCard service={service} />
                  ) : (
                    <ServiceCard service={service} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
