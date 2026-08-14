import { useMemo, type CSSProperties } from "react";
import { useTheme } from "./useTheme";

export interface ResolvedSize {
  style: CSSProperties;
  iconSize?: string;
}

export function useSizeStyle(size: string, iconOnly = false): ResolvedSize {
  const { theme, fallbackSize } = useTheme();

  return useMemo(() => {
    const scale = theme.sizes;
    const token =
      scale[size] ?? scale[fallbackSize] ?? Object.values(scale)[0] ?? {};

    const style: CSSProperties = {};

    if (token.height) {
      style.height = token.height;

      if (iconOnly) {
        style.width = token.height;
      }
    }

    if (!iconOnly && token.paddingX) {
      style.paddingLeft = token.paddingX;
      style.paddingRight = token.paddingX;
    }

    if (token.fontSize) style.fontSize = token.fontSize;
    if (token.gap) style.gap = iconOnly ? 0 : token.gap;

    if (token.radius) {
      (style as any)["--kui-button-radius"] = token.radius;
    }

    return {
      style,
      iconSize: token.iconSize,
    };
  }, [theme.sizes, size, fallbackSize, iconOnly]);
}
