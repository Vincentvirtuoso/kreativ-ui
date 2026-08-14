import type { CSSProperties, ReactNode } from "react";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Orientation = "horizontal" | "vertical";

export type SizeValue = Size | (string & {});

export type BaseVariant = "solid" | "outline" | "ghost" | "soft";

export type BaseColor =
  | "brand"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "neutral"
  | "white";

export type Variant = BaseVariant;

export interface Styleable {
  className?: string;
}

export type BaseTransition = "none" | "fade" | "rotate" | "slide" | "scale";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type CSSPropertiesWithVars = CSSProperties & {
  [key: `--${string}`]: string | number | undefined;
};

export interface BaseProps {
  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: CSSProperties;

  /**
   * Component content.
   */
  children?: ReactNode;

  /**
   * Removes the component's default styling.
   */
  unstyled?: boolean;
}

export interface SizeProps {
  size?: string;
}

export interface ColorProps<Color extends string = string> {
  color?: Color;
}

export interface VariantProps<Variant extends string = string> {
  variant?: Variant;
}

export interface DisabledProps {
  disabled?: boolean;
}

export interface LoadingProps {
  isLoading?: boolean;
}

export interface FullWidthProps {
  fullWidth?: boolean;
}