import { forwardRef, type InputHTMLAttributes } from "react";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(props, ref) {
    return (
      <div className="relative w-full max-w-md">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
        <input
          ref={ref}
          type="search"
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-muted)] py-2 pl-9 pr-3 text-sm text-primary placeholder:text-secondary focus:border-marketplace focus:bg-[var(--color-surface)] focus:outline-none focus:ring-1 focus:ring-marketplace"
          {...props}
        />
      </div>
    );
  },
);
