import type { SizeScale, Theme } from "@/types/theme";

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
      brand: "hsl(210, 80%, 50%)",
      brandHover: "hsl(210, 80%, 45%)",
      brandFg: "hsl(0, 0%, 100%)",
      surface: "hsl(0, 0%, 98%)",
      surfaceRaised: "hsl(0, 0%, 100%)",
      surfaceSunken: "hsl(0, 0%, 92%)",
      border: "hsl(0, 0%, 85%)",
      text: "hsl(0, 0%, 10%)",
      textMuted: "hsl(0, 0%, 40%)",
      danger: "hsl(0, 80%, 50%)",
      dangerFg: "hsl(0, 0%, 100%)",
    },
    radius: "0.5rem",
    font: "Inter, sans-serif",
  },
  dark: {
    colors: {
      brand: "hsl(210, 80%, 60%)",
      brandHover: "hsl(210, 80%, 65%)",
      brandFg: "hsl(0, 0%, 100%)",
      surface: "hsl(0, 0%, 12%)",
      surfaceRaised: "hsl(0, 0%, 18%)",
      surfaceSunken: "hsl(0, 0%, 8%)",
      border: "hsl(0, 0%, 30%)",
      text: "hsl(0, 0%, 95%)",
      textMuted: "hsl(0, 0%, 60%)",
      danger: "hsl(0, 80%, 55%)",
      dangerFg: "hsl(0, 0%, 100%)",
    },
    radius: "0.5rem",
    font: "Inter, sans-serif",
  },
  sizes: defaultSizes,
  components: {},
};
