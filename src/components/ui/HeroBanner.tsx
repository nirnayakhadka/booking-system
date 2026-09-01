interface HeroBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl?: string;
  onAction: () => void;
  actionLabel?: string;
}

export function HeroBanner({
  eyebrow,
  title,
  description,
  imageUrl,
  onAction,
  actionLabel = "Explore",
}: HeroBannerProps) {
  return (
    <div className="relative h-[360px] w-full overflow-hidden sm:h-[420px]">
      {imageUrl ? (
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-marketplace to-marketplace-dark" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 top-0 flex max-w-7xl mx-auto flex-col justify-center gap-3 p-6 pt-12 sm:p-12 sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
          {title}
        </h1>
        <p className="text-sm text-white/85 sm:text-base">{description}</p>
        <button
          onClick={onAction}
          className="mt-2 w-fit rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-marketplace transition hover:bg-white/90"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
