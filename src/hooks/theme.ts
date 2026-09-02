import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export const THEME_STORAGE_KEY = "marketplace-theme";

/**
 * Always defaults to 'light' unless the user has explicitly toggled
 * before. Deliberately ignores OS/browser color-scheme preference so
 * every first-time visitor sees the same default regardless of their
 * system settings.
 */
export function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}