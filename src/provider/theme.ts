import { SizeScale, Theme } from "@/types";
import type { ThemeTokens } from "@/types/theme";

export const defaultSizes: SizeScale = {
  xs: {
    height: "1.75rem",
    paddingX: "0.5rem",
    fontSize: "0.75rem",
    gap: "0.25rem",
    iconSize: "0.875rem",
  },
  sm: {
    height: "2rem",
    paddingX: "0.75rem",
    fontSize: "0.8125rem",
    gap: "0.375rem",
    iconSize: "1rem",
  },
  md: {
    height: "2.5rem",
    paddingX: "1rem",
    fontSize: "0.875rem",
    gap: "0.5rem",
    iconSize: "1.125rem",
  },
  lg: {
    height: "3rem",
    paddingX: "1.5rem",
    fontSize: "1rem",
    gap: "0.625rem",
    iconSize: "1.25rem",
  },
};

export const defaultTheme: Theme = {
  intensity: 50,
  light: {
    colors: {
      brand: "rgb(26, 128, 230)",
      brandHover: "rgb(23, 115, 207)",
      brandFg: "rgb(255, 255, 255)",
      surface: "rgb(250, 250, 250)",
      surfaceRaised: "rgb(255, 255, 255)",
      surfaceSunken: "rgb(235, 235, 235)",
      border: "rgb(217, 217, 217)",
      text: "rgb(26, 26, 26)",
      textMuted: "rgb(102, 102, 102)",
      danger: "rgb(230, 26, 26)",
      dangerFg: "rgb(255, 255, 255)",

      destructive: "rgb(230, 26, 26)",
      destructiveFg: "rgb(255, 255, 255)",
      destructiveHover: "rgb(207, 23, 23)",

      success: "rgb(22, 162, 73)",
      successFg: "rgb(255, 255, 255)",
      successHover: "rgb(18, 135, 92)",

      warning: "rgb(245, 159, 10)",
      warningFg: "rgb(255, 255, 255)",
      warningHover: "rgb(211, 137, 9)",

      info: "rgb(23, 145, 207)",
      infoFg: "rgb(255, 255, 255)",
      infoHover: "rgb(19, 123, 174)",
    },
    radius: "0.5rem",
    font: "Inter, sans-serif",
  },
  dark: {
    colors: {
      brand: "rgb(71, 153, 235)",
      brandHover: "rgb(94, 166, 237)",
      brandFg: "rgb(255, 255, 255)",
      surface: "rgb(31, 31, 31)",
      surfaceRaised: "rgb(46, 46, 46)",
      surfaceSunken: "rgb(20, 20, 20)",
      border: "rgb(77, 77, 77)",
      text: "rgb(242, 242, 242)",
      textMuted: "rgb(153, 153, 153)",
      danger: "rgb(232, 48, 48)",
      dangerFg: "rgb(255, 255, 255)",

      destructive: "rgb(232, 48, 48)",
      destructiveFg: "rgb(255, 255, 255)",
      destructiveHover: "rgb(235, 71, 71)",

      success: "rgb(34, 195, 136)",
      successFg: "rgb(255, 255, 255)",
      successHover: "rgb(38, 217, 151)",

      warning: "rgb(246, 168, 35)",
      warningFg: "rgb(255, 255, 255)",
      warningHover: "rgb(247, 178, 59)",

      info: "rgb(71, 180, 235)",
      infoFg: "rgb(255, 255, 255)",
      infoHover: "rgb(108, 195, 239)",
    },
    radius: "0.5rem",
    font: "Inter, sans-serif",
  },
  sizes: defaultSizes,
  components: {},
};




function clamp(value: number) {
  return Math.min(255, Math.max(0, value));
}


function parseRgb(value: string) {
  const parts = value
    .trim()
    .split(/\s+/)
    .map(Number);

  if (parts.length !== 3) return null;

  return {
    r: parts[0],
    g: parts[1],
    b: parts[2],
  };
}


function rgbToString(
  r: number,
  g: number,
  b: number,
) {
  return `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`;
}


function lighten(
  color: string,
  amount: number,
) {
  const rgb = parseRgb(color);

  if (!rgb) return color;

  return rgbToString(
    clamp(rgb.r + amount),
    clamp(rgb.g + amount),
    clamp(rgb.b + amount),
  );
}


function darken(
  color: string,
  amount: number,
) {
  const rgb = parseRgb(color);

  if (!rgb) return color;

  return rgbToString(
    clamp(rgb.r - amount),
    clamp(rgb.g - amount),
    clamp(rgb.b - amount),
  );
}

export function resolveTokens(
  tokens: ThemeTokens,
): ThemeTokens {

  const colors = {
    ...tokens.colors,
  };


  if (colors.brand && !colors.brandHover) {
    colors.brandHover = darken(
      colors.brand,
      15,
    );
  }


  if (colors.brand && !colors.brandFg) {
    colors.brandFg =
      "255 255 255";
  }


  if (colors.surface && !colors.surfaceRaised) {
    colors.surfaceRaised =
      lighten(colors.surface, 10);
  }


  if (colors.surface && !colors.surfaceSunken) {
    colors.surfaceSunken =
      darken(colors.surface, 10);
  }


  if (colors.danger && !colors.dangerFg) {
    colors.dangerFg =
      "255 255 255";
  }


  if (colors.success && !colors.successFg) {
    colors.successFg =
      "255 255 255";
  }


  if (colors.warning && !colors.warningFg) {
    colors.warningFg =
      "0 0 0";
  }


  if (colors.info && !colors.infoFg) {
    colors.infoFg =
      "255 255 255";
  }



  return {
    ...tokens,
    colors,
  };
}