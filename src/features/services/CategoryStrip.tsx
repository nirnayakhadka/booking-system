// CategoryStrip.tsx
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

export function CategoryStrip() {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading || isError || !categories || categories.length === 0)
    return null;

  return (
    <div
      className="grid gap-4 sm:gap-5"
      style={{
        gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() =>
            navigate(`/categories/${encodeURIComponent(cat.name)}`)
          }
          className="group relative h-32 overflow-hidden rounded-2xl shadow-lg shadow-black/20 ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 sm:h-40"
        >
          {cat.imageUrl ? (
            <img
              src={cat.imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3.5 sm:p-4">
            <span className="text-sm font-semibold text-white sm:text-base">
              {cat.name}
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
              →
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
