import type {
  IntensityMap,
  SizeScale,
  SizeToken,
  Theme,
  ThemeOverride,
  ThemeTokens,
} from "@/types/theme";

const CSS_LENGTH = /^-?\d*\.?\d+(px|rem|em|%|vh|vw|ch)$/;
const INTENSITY_MAP: IntensityMap = { subtle: 20, default: 50, bold: 85 };

function normalizeIntensity(input?: number | keyof IntensityMap): number {
  if (typeof input === "number") return Math.min(100, Math.max(0, input));
  if (typeof input === "string") return INTENSITY_MAP[input] ?? 50;
  return 50;
}

function validateSizeToken(key: string, token: Partial<SizeToken>) {
  if (import.meta.env.NODE_ENV === "production") return;

  (
    ["height", "paddingX", "fontSize", "gap", "iconSize", "radius"] as const
  ).forEach((field) => {
    const value = token[field];
    if (value === undefined) return;

    if (!CSS_LENGTH.test(value)) {
      console.error(
        `[kreativ-ui] Invalid size "${key}.${field}": "${value}" is not a valid CSS length (e.g. "2.5rem", "40px").`,
      );
      return;
    }

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
          `height=${token.height} (${heightPx}px), fontSize=${token.fontSize} (${fontSizePx}px).\n` +
          `Font size meets or exceeds the box height — text will clip or overflow.\n` +
          `Increase height to at least ${Math.ceil(fontSizePx * 1.6)}px (roughly fontSize × 1.6 for comfortable line-height), ` +
          `or reduce fontSize below ${heightPx}px.`,
      );
    }
  }
}

function toPx(value: string): number | undefined {
  const num = parseFloat(value);
  if (Number.isNaN(num)) return undefined;
  if (value.endsWith("px")) return num;
  if (value.endsWith("rem") || value.endsWith("em")) return num * 16;
}

function mergeTokens(
  base: ThemeTokens,
  override?: Partial<ThemeTokens> & { colors?: Partial<ThemeTokens["colors"]> },
): ThemeTokens {
  if (!override) return base;
  return {
    ...base,
    ...override,
    colors: { ...base.colors, ...override.colors },
  };
}

function mergeSizes(
  base: SizeScale,
  override?: Record<string, Partial<SizeToken>>,
): SizeScale {
  if (!override) return base;
  const merged: SizeScale = { ...base };
  for (const key of Object.keys(override)) {
    const next = { ...merged[key], ...override[key] };
    validateSizeToken(key, next);
    merged[key] = next;
  }
  return merged;
}

export function mergeTheme(base: Theme, override?: ThemeOverride): Theme {
  if (!override) return base;
  const intensity =
    override?.intensity !== undefined
      ? normalizeIntensity(override.intensity)
      : (base.intensity ?? 50);
  return {
    intensity,
    light: mergeTokens(base.light, override.light),
    dark: mergeTokens(base.dark, override.dark),
    sizes: mergeSizes(base.sizes, override.sizes),
    components: { ...base.components, ...override.components },
  };
}
