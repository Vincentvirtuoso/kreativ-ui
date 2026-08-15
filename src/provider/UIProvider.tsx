"use client";

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type JSX,
  type ReactNode,
} from "react";

import { ThemeContext } from "./ThemeContext";
import { defaultTheme } from "../theme/defaults/theme";
import { resolveTokens, tokensToCssVars } from "./cssVariables";
import { mergeTheme } from "@/theme/mergeTheme";
import type { ColorMode, ThemeOverride } from "@/types/theme";
import { isDev } from "@/utils/env";

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
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDark(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
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

  const resolvedMode: "light" | "dark" =
    mode === "system" ? (systemPrefersDark ? "dark" : "light") : mode;

  const theme = useMemo(
    () => mergeTheme(defaultTheme, themeOverride),
    [themeOverride],
  );

  const resolvedTokens = useMemo(
    () => resolveTokens(theme.tokens, theme.semanticTokens, resolvedMode),
    [theme.tokens, theme.semanticTokens, resolvedMode],
  );

  const cssVars = useMemo(
    () => tokensToCssVars(resolvedTokens, resolvedMode, theme.intensity),
    [resolvedTokens, resolvedMode, theme.intensity],
  );

  useEffect(() => {
    if (isDev() && !theme.sizes[fallbackSize]) {
      console.error(
        `[kreativ-ui] fallbackSize="${fallbackSize}" ` +
          `is not a registered size in theme.sizes. ` +
          `Components requesting an unknown size may render ` +
          `without size styles.`,
      );
    }
  }, [theme.sizes, fallbackSize]);

  const contextValue = useMemo(
    () => ({
      theme,
      mode,
      resolvedMode,
      setMode,
      fallbackSize,
      tokens: resolvedTokens,
    }),
    [theme, mode, resolvedMode, fallbackSize, resolvedTokens],
  );

  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <ThemeContext.Provider value={contextValue}>
      <Tag
        data-kreativ-theme={resolvedMode}
        className={resolvedMode === "dark" ? "dark" : undefined}
        style={cssVars as CSSProperties}
      >
        {children}
      </Tag>
    </ThemeContext.Provider>
  );
}
