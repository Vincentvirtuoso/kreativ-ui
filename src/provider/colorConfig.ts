export const COLOR_CONFIG = [
  { key: "brand", role: "brand" },
  { key: "brandHover", role: "brand" },
  { key: "brandFg", role: "fg" },
  { key: "surface", role: "bg" },
  { key: "surfaceRaised", role: "bg" },
  { key: "surfaceSunken", role: "bg" },
  { key: "border", role: "border" },
  { key: "text", role: "fg" },
  { key: "textMuted", role: "fg" },
  { key: "danger", role: "brand" },
  { key: "dangerFg", role: "fg" },
] as const;

export type ColorKey = (typeof COLOR_CONFIG)[number]["key"];
