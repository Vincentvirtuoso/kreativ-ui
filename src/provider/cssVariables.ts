import type { ThemeTokens } from "@/types/theme";
import { COLOR_CONFIG } from "./colorConfig";

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}


export function tokensToCssVars(
  tokens: ThemeTokens,
  _intensity: number,
  mode: "light" | "dark",
): Record<string, string> {
  const { colors, radius, font } = tokens;

  const colorVars: Record<string, string> = {};

  for (const { key } of COLOR_CONFIG) {
    const colorValue = colors[key as keyof typeof colors];

    if (!colorValue) continue;

    const varName = `--kui-${toKebabCase(key)}`;

    colorVars[varName] = colorValue;
  }

  return {
    ...colorVars,

    "--kui-radius": radius,
    "--kui-font": font,

    "--kui-mode": mode,

    "--kui-intensity": String(_intensity),
  };
}