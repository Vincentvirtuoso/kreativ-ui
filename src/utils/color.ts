const HEX_RE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
/**
 * Converts an RGB color string to a hex color.
 *
 * Supports:
 * - "26 128 230"
 * - "26, 128, 230"
 * - "rgb(26, 128, 230)"
 *
 * Returns an empty string when the value is not a valid RGB color.
 */

export function rgbToHex(value: string): string {
  const trimmed = value.trim();

  // Already HEX
  if (HEX_RE.test(trimmed)) {
    if (trimmed.length === 4) {
      return (
        "#" + [...trimmed.slice(1)].map((char) => char + char).join("")
      ).toUpperCase();
    }

    return trimmed.toUpperCase();
  }

  // rgb(...) / rgba(...)
  const values = trimmed
    .replace(/[^\d,]/g, "")
    .split(",")
    .map(Number);

  if (values.length !== 3 || values.some(Number.isNaN)) {
    return "#000000";
  }

  return (
    "#" +
    values
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
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