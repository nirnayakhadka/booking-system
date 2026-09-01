import { Link } from "react-router-dom";
import { Logo } from "./ui/Logo";

const footerLinks = {
  Services: ["Home", "My Bookings"],
  Contact: ["Support", "Help Center", "FAQ"],
  Legal: ["Privacy Policy", "Terms of Service"],
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="md" withWordmark />
            <p className="mt-3 max-w-xs text-sm text-secondary">
              Book professional services from trusted providers at your
              convenience.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {title}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((label) => (
                  <li key={label}>
                    <Link
                      to={label === "Home" ? "/" : label === "My Bookings" ? "/bookings" : "/"}
                      className="text-sm text-primary transition hover:text-marketplace"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-6">
          <p className="text-sm text-secondary">
            &copy; {new Date().getFullYear()} Demo Marketplace. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
