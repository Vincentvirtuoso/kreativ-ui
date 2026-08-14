import { DesignTokens } from "@/types";

export const defaultTokens: DesignTokens = {
  colors: {
    blue: {
      300: { value: "#5EA6ED" },
      400: { value: "#4799EB" },
      500: { value: "#1A80E6" },
      600: { value: "#1773CF" },
    },

    red: {
      300: { value: "#EB4747" },
      400: { value: "#E83030" },
      500: { value: "#E61A1A" },
      600: { value: "#CF1717" },
    },

    green: {
      300: { value: "#26D997" },
      400: { value: "#22C388" },
      500: { value: "#16A249" },
      600: { value: "#12875C" },
    },

    amber: {
      300: { value: "#F7B23B" },
      400: { value: "#F6A823" },
      500: { value: "#F59F0A" },
      600: { value: "#D38909" },
    },

    cyan: {
      300: { value: "#6CC3EF" },
      400: { value: "#47B4EB" },
      500: { value: "#1791CF" },
      600: { value: "#137BAE" },
    },

    gray: {
      50: { value: "#FAFAFA" },
      100: { value: "#EBEBEB" },
      200: { value: "#D9D9D9" },
      300: { value: "#BDBDBD" },
      400: { value: "#999999" },
      500: { value: "#666666" },
      600: { value: "#4D4D4D" },
      700: { value: "#333333" },
      800: { value: "#2E2E2E" },
      900: { value: "#1F1F1F" },
      950: { value: "#141414" },
      1000: { value: "#0A0A0A" },
    },

    white: {
      value: "#FFFFFF",
    },

    black: {
      value: "#000000",
    },
  },

  spacing: {
    1: { value: "0.25rem" },
    2: { value: "0.5rem" },
    3: { value: "0.75rem" },
    4: { value: "1rem" },
    5: { value: "1.25rem" },
    6: { value: "1.5rem" },
    8: { value: "2rem" },
    10: { value: "2.5rem" },
    12: { value: "3rem" },
    16: { value: "4rem" },
  },

  radii: {
    none: { value: "0" },
    sm: { value: "0.25rem" },
    md: { value: "0.5rem" },
    lg: { value: "0.75rem" },
    xl: { value: "1rem" },
    full: { value: "9999px" },
  },

  fonts: {
    body: {
      value: "Inter, sans-serif",
    },

    heading: {
      value: "Inter, sans-serif",
    },

    mono: {
      value: "ui-monospace, SFMono-Regular, Menlo, monospace",
    },
  },

  fontSizes: {
    xs: { value: "0.75rem" },
    sm: { value: "0.875rem" },
    md: { value: "1rem" },
    lg: { value: "1.125rem" },
    xl: { value: "1.25rem" },
    "2xl": { value: "1.5rem" },
    "3xl": { value: "1.875rem" },
    "4xl": { value: "2.25rem" },
  },

  fontWeights: {
    normal: { value: "400" },
    medium: { value: "500" },
    semibold: { value: "600" },
    bold: { value: "700" },
  },

  lineHeights: {
    tight: { value: "1.25" },
    normal: { value: "1.5" },
    relaxed: { value: "1.75" },
  },

  letterSpacings: {
    tighter: { value: "-0.025em" },
    tight: { value: "-0.01em" },
    normal: { value: "0" },
    wide: { value: "0.025em" },
  },

  animations: {
    "slide-in-right": {
      value: "slide-in-right 0.5s ease-in-out",
    },
  },
};