"use client";

import { createContext } from "react";
import type { ColorMode, Theme, ResolvedTokens } from "@/types/theme";

export interface ThemeContextValue {
  theme: Theme;
  mode: ColorMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ColorMode) => void;
  fallbackSize: string;
  tokens: ResolvedTokens;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
