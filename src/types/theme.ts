export type ColorToken = string;

export interface ColorTokens {
  brand: ColorToken;
  brandHover: ColorToken;
  brandFg: ColorToken;
  surface: ColorToken;
  surfaceRaised: ColorToken;
  surfaceSunken: ColorToken;
  border: ColorToken;
  text: ColorToken;
  textMuted: ColorToken;
  danger: ColorToken;
  dangerFg: ColorToken;
  destructive: ColorToken;
  destructiveFg: ColorToken;
  destructiveHover: ColorToken;
  success: ColorToken;
  successFg: ColorToken;
  successHover: ColorToken;
  warning: ColorToken;
  warningFg: ColorToken;
  warningHover: ColorToken;
  info: ColorToken;
  infoFg: ColorToken;
  infoHover: ColorToken;
}

export interface ThemeTokens {
  colors: ColorTokens;
  radius: string;
  font: string;
}

export interface IntensityMap {
  subtle: number;
  default: number;
  bold: number;
}

export interface SizeToken {
  height?: string;
  paddingX?: string;
  fontSize?: string;
  gap?: string;
  iconSize?: string;
  radius?: string;
}

export type SizeScale = Record<string, SizeToken>;

export interface ComponentOverrides {
  Button?: {
    base?: string;
    variants?: Partial<Record<string, string>>;
  };
  [componentName: string]: unknown;
}

export interface Theme {
  intensity: number;
  light: ThemeTokens;
  dark: ThemeTokens;
  sizes: SizeScale;
  components?: ComponentOverrides;
}

export type ThemeOverride = {
  light?: Partial<ThemeTokens>;
  dark?: Partial<ThemeTokens>;
  sizes?: Record<string, Partial<SizeToken>>;
  components?: ComponentOverrides;
};

export type ColorMode = "light" | "dark" | "system";
