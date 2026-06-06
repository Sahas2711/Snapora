"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

export type UseThemeProps = {
  themes: Theme[];
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return null;
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return getSystemTheme();
  return theme;
}

const ThemeCtx = React.createContext<UseThemeProps | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = getStoredTheme();
    const initial = stored ?? defaultTheme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initial);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResolvedTheme(resolveTheme(initial));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState((prev) => {
        if (prev === "system") setResolvedTheme(getSystemTheme());
        return prev;
      });
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [defaultTheme]);

  React.useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolvedTheme);
  }, [mounted, resolvedTheme]);

  const setTheme = React.useCallback((next: Theme) => {
    const resolved = resolveTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
    setThemeState(next);
    setResolvedTheme(resolved);
  }, []);

  const value = React.useMemo<UseThemeProps>(
    () => ({ themes: ["light", "dark", "system"], theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): UseThemeProps {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
  return ctx;
}