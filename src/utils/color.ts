const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;


export function rgbToHex(rgb: string) {
  const values = rgb
    .replace(/[^\d,]/g, "")
    .split(",")
    .map(Number);

  if (values.length !== 3) return "#000000";

  return "#" + values.map((x) => x.toString(16).padStart(2, "0")).join("");
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
