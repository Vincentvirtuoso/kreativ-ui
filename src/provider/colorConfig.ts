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

  { key: "destructive", role: "brand" },
  { key: "destructiveHover", role: "brand" },
  { key: "destructiveFg", role: "fg" },

  { key: "success", role: "brand" },
  { key: "successHover", role: "brand" },
  { key: "successFg", role: "fg" },

  { key: "warning", role: "brand" },
  { key: "warningHover", role: "brand" },
  { key: "warningFg", role: "fg" },

  { key: "info", role: "brand" },
  { key: "infoHover", role: "brand" },
  { key: "infoFg", role: "fg" },
] as const;

export type ColorKey = (typeof COLOR_CONFIG)[number]["key"];
