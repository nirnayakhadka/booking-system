import { useEffect, useState, type ReactNode } from "react";
import {
  ThemeContext,
  THEME_STORAGE_KEY,
  getInitialTheme,
  type Theme,
} from "./theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Single point where the .dark class is applied — keeps every component
  // dumb (just reacts to CSS variables) instead of checking theme state.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}