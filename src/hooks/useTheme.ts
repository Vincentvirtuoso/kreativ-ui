"use client";

import { useContext } from "react";
import { ThemeContext } from "@/provider/ThemeContext";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useTheme() was called outside <UIProvider>. Wrap your app in <UIProvider> from 'kreativ-ui'."
    );
  }
  return ctx;
}
