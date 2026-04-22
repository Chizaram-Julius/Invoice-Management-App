import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
const THEME_KEY = "invoice-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
