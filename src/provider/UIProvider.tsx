import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
  type JSX,
} from "react";

import { ThemeContext } from "./ThemeContext";
import { defaultTheme } from "./theme";
import { tokensToCssVars } from "./cssVariables";
import { mergeTheme } from "@/utils/mergeTheme";
import type { ColorMode, ThemeOverride } from "@/types/theme";

export interface UIProviderProps {
  children: ReactNode;
  theme?: ThemeOverride;
  defaultMode?: ColorMode;
  as?: keyof JSX.IntrinsicElements;
  fallbackSize?: string;
}

function useSystemPrefersDark() {
  const [prefersDark, setPrefersDark] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches);
    };

    mql.addEventListener("change", listener);

    return () => {
      mql.removeEventListener("change", listener);
    };
  }, []);

  return prefersDark;
}

export function UIProvider({
  children,
  theme: themeOverride,
  defaultMode = "system",
  as = "div",
  fallbackSize = "md",
}: UIProviderProps) {
  const [mode, setMode] = useState<ColorMode>(defaultMode);

  const systemPrefersDark = useSystemPrefersDark();

  const resolvedMode =
    mode === "system"
      ? systemPrefersDark
        ? "dark"
        : "light"
      : mode;

  const mergedTheme = useMemo(
    () => mergeTheme(defaultTheme, themeOverride),
    [themeOverride],
  );

  const cssVars = useMemo(
    () =>
      tokensToCssVars(
        mergedTheme[resolvedMode],
        mergedTheme.intensity,
        resolvedMode,
      ),
    [mergedTheme, resolvedMode],
  );

  if (
    import.meta.env.NODE_ENV !== "production" &&
    !mergedTheme.sizes[fallbackSize]
  ) {
    console.error(
      `[kreativ-ui] fallbackSize="${fallbackSize}" is not a registered size in theme.sizes.`,
    );
  }

  const Tag = as as keyof JSX.IntrinsicElements;

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [cssVars]);

  return (
    <ThemeContext.Provider
      value={{
        theme: mergedTheme,
        mode,
        resolvedMode,
        setMode,
        fallbackSize,
      }}
    >
      <Tag
        data-kreativ-theme={resolvedMode}
        className={resolvedMode === "dark" ? "dark" : undefined}
      >
        {children}
      </Tag>
    </ThemeContext.Provider>
  );
}