import type { ThemeTokens } from "@/types/theme";
import { COLOR_CONFIG } from "./colorConfig";

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const sanitized = hex.replace(/^#/, "");
  let r: number, g: number, b: number;

  if (sanitized.length === 3) {
    const parts = sanitized.split("");
    r = parseInt(parts[0] + parts[0], 16);
    g = parseInt(parts[1] + parts[1], 16);
    b = parseInt(parts[2] + parts[2], 16);
  } else if (sanitized.length === 6) {
    r = parseInt(sanitized.slice(0, 2), 16);
    g = parseInt(sanitized.slice(2, 4), 16);
    b = parseInt(sanitized.slice(4, 6), 16);
  } else {
    return null;
  }

  return { r, g, b };
}

function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  const rf = r / 255,
    gf = g / 255,
    bf = b / 255;
  const max = Math.max(rf, gf, bf),
    min = Math.min(rf, gf, bf);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rf:
        h = ((gf - bf) / d + (gf < bf ? 6 : 0)) / 6;
        break;
      case gf:
        h = ((bf - rf) / d + 2) / 6;
        break;
      case bf:
        h = ((rf - gf) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function parseRgb(rgb: string): { r: number; g: number; b: number } | null {
  const cleaned = rgb
    .replace(/rgb\s*\(/, "")
    .replace(/\)/, "")
    .trim();
  const parts = cleaned.split(/\s*,\s*/).map(Number);
  if (
    parts.length === 3 &&
    parts.every((n) => !isNaN(n) && n >= 0 && n <= 255)
  ) {
    return { r: parts[0], g: parts[1], b: parts[2] };
  }
  return null;
}

function parseColor(color: string): { h: number; s: number; l: number } | null {
  const trimmed = color.trim();

  if (trimmed.startsWith("#")) {
    const rgb = hexToRgb(trimmed);
    return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  }

  const hslMatch = trimmed.match(
    /hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/,
  );
  if (hslMatch) {
    return {
      h: parseInt(hslMatch[1], 10),
      s: parseInt(hslMatch[2], 10),
      l: parseInt(hslMatch[3], 10),
    };
  }

  const rgb = parseRgb(trimmed);
  if (rgb) return rgbToHsl(rgb.r, rgb.g, rgb.b);

  return null;
}

function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
  const r = Math.round(f(0) * 255);
  const g = Math.round(f(8) * 255);
  const b = Math.round(f(4) * 255);
  return `${r} ${g} ${b}`;
}

function adjustColor(
  color: string,
  intensity: number,
  mode: "light" | "dark",
  role: "bg" | "fg" | "border" | "brand",
): string {
  const parsed = parseColor(color);

  if (!parsed) return color;

  let { h, s, l } = parsed;

  const intensityFactor = intensity / 50;

  s = Math.min(
    100,
    Math.max(0, Math.round(s * intensityFactor)),
  );

  const contrast = (intensity - 50) / 100;

  switch (role) {
    case "fg":
      l =
        mode === "dark"
          ? Math.min(100, l + Math.abs(contrast) * 20)
          : Math.max(0, l - Math.abs(contrast) * 20);
      break;

    case "bg":
      l =
        mode === "dark"
          ? Math.max(5, l - 70)
          : Math.min(95, l + 70);
      break;

    case "border":
      l =
        mode === "dark"
          ? Math.max(15, l - 40)
          : Math.min(90, l + 40);
      break;

    case "brand":
      l = Math.min(
        90,
        Math.max(
          10,
          l + contrast * 10,
        ),
      );
      break;
  }

  return hslToRgb(
    Math.round(h),
    Math.round(s),
    Math.round(l),
  );
}

export function tokensToCssVars(
  tokens: ThemeTokens,
  intensity: number,
  mode: "light" | "dark",
): Record<string, string> {
  const { colors, radius, font } = tokens;

  const colorVars: Record<string, string> = {};

  for (const { key, role } of COLOR_CONFIG) {
    const colorValue = colors[key as keyof typeof colors];

    if (!colorValue) continue;

    const varName = `--kui-${toKebabCase(key)}`;

    colorVars[varName] = adjustColor(
      colorValue,
      intensity,
      mode,
      role as "bg" | "fg" | "border" | "brand",
    );
  }

  return {
    ...colorVars,

    "--kui-radius": radius,
    "--kui-font": font,

    "--kui-mode": mode,

    "--kui-intensity": String(intensity),

    "--kui-contrast-multiplier": String(
      1 + (intensity - 50) / 100,
    ),
  };
}