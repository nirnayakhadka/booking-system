interface ProductTileProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClick: () => void;
}

export function ProductTile({
  title,
  description,
  imageUrl,
  onClick,
}: ProductTileProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-left transition hover:border-marketplace hover:shadow-sm"
    >
      <div className="mb-3 h-24 w-full overflow-hidden rounded-md bg-[var(--color-surface-muted)] sm:h-28">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
        )}
      </div>
      <h3 className="truncate text-sm font-semibold text-primary">{title}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-secondary">{description}</p>
    </button>
  );
}
