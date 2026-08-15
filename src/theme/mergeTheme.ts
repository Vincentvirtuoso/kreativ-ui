import type {
  DesignTokens,
  SizeScale,
  SizeToken,
  Theme,
  ThemeOverride,
  Typography,
  SemanticTokens,
} from "@/types";
import { mergeRecipes } from "./recipes/mergeRecipes";

const CSS_SIZE =
  /^-?\d*\.?\d+(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|fr)$|^(auto|min-content|max-content|fit-content)$/;

const CSS_KEYWORDS = new Set([
  "auto",
  "min-content",
  "max-content",
  "fit-content",
]);

const SIZE_FIELDS = [
  "height",
  "width",
  "paddingX",
  "paddingY",
  "fontSize",
  "gap",
  "iconSize",
  "radius",
] as const;

function isCssKeyword(value: string) {
  return CSS_KEYWORDS.has(value);
}

function toPx(value: string): number | undefined {
  if (isCssKeyword(value)) return undefined;

  const num = parseFloat(value);

  if (Number.isNaN(num)) return undefined;

  if (value.endsWith("px")) return num;

  if (value.endsWith("rem") || value.endsWith("em")) {
    return num * 16;
  }

  return undefined;
}

function validateSizeToken(key: string, token: Partial<SizeToken>) {
  SIZE_FIELDS.forEach((field) => {
    const value = token[field];

    if (value === undefined) return;

    if (!CSS_SIZE.test(value)) {
      console.error(
        `[kreativ-ui] Invalid size "${key}.${field}": "${value}" is not a valid CSS size.`,
      );
      return;
    }

    if (isCssKeyword(value)) return;

    const num = parseFloat(value);

    if (num < 0) {
      console.error(
        `[kreativ-ui] Invalid size "${key}.${field}": "${value}" is negative.`,
      );
    }
  });

  if (token.height && token.fontSize) {
    const heightPx = toPx(token.height);
    const fontSizePx = toPx(token.fontSize);

    if (
      heightPx !== undefined &&
      fontSizePx !== undefined &&
      fontSizePx >= heightPx
    ) {
      console.warn(
        `[kreativ-ui] Size "${key}" has conflicting dimensions: ` +
          `height=${token.height} (${heightPx}px), ` +
          `fontSize=${token.fontSize} (${fontSizePx}px).\n` +
          `Font size meets or exceeds the box height — text may clip or overflow.`,
      );
    }
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Generic recursive merge used by the new token architecture.
 *
 * This allows users to override deeply nested values without
 * replacing the entire token group.
 *
 * Example:
 *
 * tokens.colors.blue.500
 *
 * can be overridden without replacing:
 *
 * tokens.colors.blue.400
 * tokens.colors.blue.600
 */
function deepMerge<T>(base: T, override?: unknown): T {
  if (override === undefined) {
    return base;
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override as T;
  }

  const result: Record<string, unknown> = {
    ...base,
  };

  for (const [key, value] of Object.entries(override)) {
    const existing = result[key];

    if (isPlainObject(existing) && isPlainObject(value)) {
      result[key] = deepMerge(existing, value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}


function mergeDesignTokens(
  base: DesignTokens,
  override?: ThemeOverride["tokens"],
): DesignTokens {
  return deepMerge(base, override);
}

function mergeSemanticTokens(
  base: SemanticTokens,
  override?: ThemeOverride["semanticTokens"],
): SemanticTokens {
  return deepMerge(base, override);
}

function mergeTypography(
  base: Typography,
  override?: ThemeOverride["typography"],
): Typography {
  return deepMerge(base, override);
}

function mergeSizes(
  base: SizeScale,
  override?: Record<string, Partial<SizeToken>>,
): SizeScale {
  if (!override) {
    return base;
  }

  const merged: SizeScale = {
    ...base,
  };

  for (const [key, overrideToken] of Object.entries(override)) {
    const next: SizeToken = {
      ...merged[key],
      ...overrideToken,
    };

    validateSizeToken(key, next);

    merged[key] = next;
  }

  return merged;
}

export function mergeTheme(base: Theme, override?: ThemeOverride): Theme {
  if (!override) {
    return base;
  }

  return {
    tokens: mergeDesignTokens(base.tokens, override.tokens),

    semanticTokens: mergeSemanticTokens(
      base.semanticTokens,
      override.semanticTokens,
    ),

    typography: mergeTypography(base.typography, override.typography),

    recipes: mergeRecipes(base.recipes, override.recipes),

    intensity: override.intensity ?? base.intensity,


    sizes: mergeSizes(base.sizes, override.sizes),
  };
}
