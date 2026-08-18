import type { SizeToken } from "@/types";
import { useMemo } from "react";
import { useTheme } from "./useTheme";

type SizeTokenValue = SizeToken[keyof SizeToken];

function applyOffset(value: SizeTokenValue, offset?: string): SizeTokenValue {
  if (offset == null || value == null) {
    return value;
  }

  if (typeof value !== "string") {
    return value;
  }

  return `calc(${value} - ${offset})`;
}

export function useSizeToken(size: string): SizeToken;

export function useSizeToken<K extends keyof SizeToken>(
  size: string,
  key: K,
  offset?: string,
): SizeToken[K];

export function useSizeToken<K extends keyof SizeToken>(
  size: string,
  key?: K,
  offset?: string,
): SizeToken | SizeToken[K] {
  const { theme, fallbackSize } = useTheme();

  return useMemo(() => {
    const scale = theme.sizes;

    const token =
      scale[size] ?? scale[fallbackSize] ?? Object.values(scale)[0] ?? {};

    if (!key) {
      return token;
    }

    return applyOffset(token[key], offset) as SizeToken[K];
  }, [theme.sizes, size, fallbackSize, key, offset]);
}
