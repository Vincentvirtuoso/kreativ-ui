const RGB_RE = /^\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*$/;
const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function clamp255(n: number) {
  return Math.max(0, Math.min(255, n));
}

export function rgbStringToHex(rgb: string): string | null {
  const match = RGB_RE.exec(rgb);
  if (!match) return null;
  const [, r, g, b] = match;
  return (
    "#" +
    [r, g, b]
      .map((c) => clamp255(Number(c)).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function hexToRgbString(hex: string): string | null {
  if (!HEX_RE.test(hex)) return null;
  const full =
    hex.length === 4 ? "#" + [...hex.slice(1)].map((c) => c + c).join("") : hex;
  const r = parseInt(full.slice(1, 3), 16);
  const g = parseInt(full.slice(3, 5), 16);
  const b = parseInt(full.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
}
