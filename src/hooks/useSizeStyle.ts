import { useMemo, type CSSProperties } from "react";
import { useTheme } from "./useTheme";

export interface ResolvedSize {
  style: CSSProperties;
  iconSize?: string;
}

export function useSizeStyle(size: string): ResolvedSize {
  const { theme, fallbackSize } = useTheme();

  return useMemo(() => {
    const scale = theme.sizes;
    let token = scale[size];

    if (!token) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.warn(
          `[kreativ-ui] Unknown size "${size}". Falling back to "${fallbackSize}". ` +
            `Register it with <UIProvider theme={{ sizes: { ${size}: { height: "...", paddingX: "...", fontSize: "..." } } }} />.`,
        );
      }
      token = scale[fallbackSize] ?? Object.values(scale)[0] ?? {};
    }

    const style: CSSProperties = {};
    if (token.height) style.height = token.height;
    if (token.paddingX) {
      style.paddingLeft = token.paddingX;
      style.paddingRight = token.paddingX;
    }
    if (token.fontSize) style.fontSize = token.fontSize;
    if (token.gap) style.gap = token.gap;
    if (token.radius) style.borderRadius = token.radius;

    return { style, iconSize: token.iconSize };
  }, [theme.sizes, size, fallbackSize]);
}
