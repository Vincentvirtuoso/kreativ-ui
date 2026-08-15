import { useMemo, type CSSProperties } from "react";
import { useTheme } from "./useTheme";
import { CSSPropertiesWithVars } from "@/types";

export interface ResolvedSize {
  style: CSSProperties;
  iconSize?: string;
}

export interface UseSizeStyleOptions {
  includeHeight?: boolean;
}

export function useSizeStyle(
  size: string,
  iconOnly = false,
  component: string = "button",
  options: UseSizeStyleOptions = {},
): ResolvedSize {
  const { includeHeight = true } = options;
  const { theme, fallbackSize } = useTheme();

  return useMemo(() => {
    const scale = theme.sizes;

    const token =
      scale[size] ?? scale[fallbackSize] ?? Object.values(scale)[0] ?? {};

    const style: CSSPropertiesWithVars = {};

    if (includeHeight && token.height) {
      style.height = token.height;
    }

    if (token.width) {
      style.width = token.width;
    } else if (iconOnly && includeHeight && token.height) {
      style.width = token.height;
    }

    if (!iconOnly && token.paddingX) {
      style.paddingLeft = token.paddingX;
      style.paddingRight = token.paddingX;
    }

    if (token.paddingY) {
      style.paddingTop = token.paddingY;
      style.paddingBottom = token.paddingY;
    }

    if (token.fontSize) {
      style.fontSize = token.fontSize;
    }

    if (token.gap) {
      style.gap = iconOnly ? 0 : token.gap;
    }

    if (token.radius) {
      const varName = `--kui-${component}-radius` as `--kui-${string}`;
      style[varName] = token.radius;
    }

    return {
      style,
      iconSize: token.iconSize,
    };
  }, [theme.sizes, size, fallbackSize, iconOnly, includeHeight, component]);
}
