import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { Avatar } from "./ui/Avatar";
import { Dropdown } from "./ui/Dropdown";
import { Logo } from "./ui/Logo";
import { SearchInput } from "./ui/SearchInput";
import { ThemeToggle } from "./ui/ThemeToggle";
import { currentUser } from "../api/mock/data/user";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive
      ? "bg-marketplace text-white"
      : "text-secondary hover:bg-[var(--color-surface-muted)] hover:text-primary"
  }`;

export function NavBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : "/");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo size="sm" withWordmark />

        <div className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navLinkClass}>
            Services
          </NavLink>
          <NavLink to="/bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 justify-center"
        >
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
          />
        </form>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Dropdown
            trigger={<Avatar name={currentUser.name} size="sm" />}
            align="right"
          >
            <div className="border-b border-[var(--color-border)] px-4 py-3">
              <p className="text-sm font-medium text-primary">
                {currentUser.name}
              </p>
              <p className="truncate text-xs text-secondary">
                {currentUser.email}
              </p>
            </div>
            <div className="px-4 py-2 text-xs text-secondary">
              {currentUser.role}
            </div>
          </Dropdown>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="rounded-md p-2 text-secondary hover:bg-[var(--color-surface-muted)] lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-primary">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <NavLink
              to="/"
              end
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              Services
            </NavLink>
            <NavLink
              to="/bookings"
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              My Bookings
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
