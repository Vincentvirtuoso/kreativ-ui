/** Converts a "#RRGGBB" hex string into kreativ-ui's "R G B" token format. */
export function hexToRgbToken(hex: string): string {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
}

/** Wraps a "R G B" token in an rgb()/rgba() string, e.g. for inline styles. */
export function rgbTokenToCss(token: string, alpha = 1): string {
  return alpha === 1 ? `rgb(${token})` : `rgb(${token} / ${alpha})`;
}
