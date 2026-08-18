"use client";

import { useMemo, type CSSProperties } from "react";
import { useTheme } from "./useTheme";
import { CSSPropertiesWithVars } from "@/types";

export interface ResolvedSize {
  style: CSSProperties;
  iconSize?: CSSProperties["width"];
  fontSize?: CSSProperties["fontSize"];
  gap?: CSSProperties["gap"];
}

export interface UseSizeStyleOptions {
  includeHeight?: boolean;
  widthFromHeight?: boolean;
  sizeOffset?: string;
  fontSizeOffset?: string;
  iconSizeOffset?: string;
}

const applySizeOffset = (
  value: string | undefined,
  offset: string | undefined,
) => {
  if (!value || !offset) return value;

  return `calc(${value} - ${offset})`;
};

export function useSizeStyle(
  size: string,
  iconOnly = false,
  componentName: string = "componentName",
  options: UseSizeStyleOptions = {},
): ResolvedSize {
  const { widthFromHeight = false, includeHeight = true, sizeOffset,fontSizeOffset } = options;
  const { theme, fallbackSize } = useTheme();

  return useMemo(() => {
    const scale = theme.sizes;

    const token =
      scale[size] ?? scale[fallbackSize] ?? Object.values(scale)[0] ?? {};

    const style: CSSPropertiesWithVars = {};

    if (includeHeight && token.height) {
      style.height = applySizeOffset(token.height, sizeOffset);
    }

    if (token.width) {
      style.width = applySizeOffset(token.width, sizeOffset);
    } else if ((iconOnly || widthFromHeight) && includeHeight && token.height) {
      style.width = applySizeOffset(token.height, sizeOffset);
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
      style.fontSize = applySizeOffset(token.fontSize,fontSizeOffset);
    }

    if (token.gap) {
      style.gap = iconOnly ? 0 : token.gap;
    }

    if (token.radius) {
      const varName = `--kui-${componentName}-radius` as `--kui-${string}`;
      style[varName] = token.radius;
    }

    return {
      style,
      iconSize: token.iconSize,
      fontSize: applySizeOffset(token.fontSize, fontSizeOffset),
      gap: token.gap,
    };
  }, [
    theme.sizes,
    size,
    fallbackSize,
    iconOnly,
    includeHeight,
    componentName,
    widthFromHeight,
  ]);
}
