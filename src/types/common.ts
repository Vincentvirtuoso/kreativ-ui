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

/* -------------------------------------------------------------------------- */
/* Base component props                                                       */
/* -------------------------------------------------------------------------- */

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
  /**
   * Component size.
   */
  size?: SizeValue;
}

export interface ColorProps<Color extends string = string> {
  /**
   * Component color.
   */
  color?: Color;
}

export interface VariantProps<Variant extends string = string> {
  /**
   * Visual variant.
   */
  variant?: Variant;
}

export interface DisabledProps {
  /**
   * Disables the component.
   */
  disabled?: boolean;
}

export interface LoadingProps {
  /**
   * Displays a loading state and prevents interaction.
   */
  isLoading?: boolean;
}

export interface FullWidthProps {
  /**
   * Makes the component span the available width.
   */
  fullWidth?: boolean;
}

export interface ClearableProps {
  /**
   * Allows the current value to be cleared.
   */
  clearable?: boolean;

  /**
   * Called when the current value is cleared.
   */
  onClear?: () => void;
}

export interface StateProps {
  /**
   * Displays an error state.
   */
  error?: boolean;

  /**
   * Displays a success state.
   */
  success?: boolean;
}

export interface ValueProps {
  /**
   * Passed value
   */
  value?: string;

  /**
   * For uncontrolled form control
   */

  defaultValue?:string

  /**
   * Called when value is changed
   * 
   * @param newValue 
   * @returns void
   */

  onValueChange?: (newValue:string) => void
}