import type { ColorTokens, SizeToken } from "@/types/theme";

export const COLOR_KEYS = Object.keys({
  brand: 0,
  brandHover: 0,
  brandFg: 0,
  surface: 0,
  surfaceRaised: 0,
  surfaceSunken: 0,
  border: 0,
  text: 0,
  textMuted: 0,
  danger: 0,
  dangerFg: 0,
  destructive: 0,
  destructiveFg: 0,
  destructiveHover: 0,
  success: 0,
  successFg: 0,
  successHover: 0,
  warning: 0,
  warningFg: 0,
  warningHover: 0,
  info: 0,
  infoFg: 0,
  infoHover: 0,
} satisfies Record<keyof ColorTokens, 0>) as (keyof ColorTokens)[];

export const COLOR_GROUPS: { name: string; keys: (keyof ColorTokens)[] }[] = [
  { name: "Brand", keys: ["brand", "brandHover", "brandFg"] },
  {
    name: "Surface",
    keys: ["surface", "surfaceRaised", "surfaceSunken", "border"],
  },
  { name: "Text", keys: ["text", "textMuted"] },
  { name: "Danger", keys: ["danger", "dangerFg"] },
  {
    name: "Destructive",
    keys: ["destructive", "destructiveFg", "destructiveHover"],
  },
  { name: "Success", keys: ["success", "successFg", "successHover"] },
  { name: "Warning", keys: ["warning", "warningFg", "warningHover"] },
  { name: "Info", keys: ["info", "infoFg", "infoHover"] },
];

export const SIZE_KEYS = [
  "height",
  "paddingX",
  "fontSize",
  "gap",
  "iconSize",
  "radius",
] as const satisfies readonly (keyof SizeToken)[];