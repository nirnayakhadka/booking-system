import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { Avatar } from "./ui/Avatar";
import { Dropdown } from "./ui/Dropdown";
import { SearchInput } from "./ui/SearchInput";
import { ThemeToggle } from "./ui/ThemeToggle";
import { currentUser } from "../api/mock/data/user";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
    isActive
      ? "bg-marketplace text-white"
      : "text-secondary hover:bg-[var(--color-surface-muted)]"
  }`;

export function NavBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : "/");
  }

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <nav className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-primary">
            Demo Marketplace
          </span>
          <div className="hidden items-center gap-1 sm:flex">
            <NavLink to="/" end className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/bookings" className={linkClass}>
              My Bookings
            </NavLink>
          </div>
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
          <ThemeToggle />
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
        </div>
      </nav>
    </header>
  );
}
