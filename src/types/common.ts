import { FormFieldStatus } from "@/components";
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

export type ReportedValidity = {
  invalid: boolean;
  message?: string;
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

export interface TypographyProps {
  /**
   * Defines the typography style to apply to the component.
   * The value must match a typography style registered in the theme.
   */
  typography?: string;
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

  /**
   * Displays a warning state.
   */
  warning?: boolean;
}

export interface StatusProps {
  /**
   * Can be `'success'` or `'error'` or `'warning'` or `'none'`
   */

  status?: FormFieldStatus;
}

/**
 * Generic controlled/uncontrolled props with custom property names.
 */
export type ControlledProps<
  T,
  TValueProp extends string = "value",
  TDefaultProp extends string = "defaultValue",
  TOnChangeProp extends string = "onValueChange",
> = {
  /**
   * Controlled value.
   * */
  [K in TValueProp]?: T;
} & {
  /** Initial value for uncontrolled usage. */
  [K in TDefaultProp]?: T;
} & {
  /** Called when the value changes. */
  [K in TOnChangeProp]?: (value: T) => void;
};

/**
 * Props for a string‑based value (e.g. input, select).
 */
export type ValueProps<T = string> = ControlledProps<
  T,
  'value',
  'defaultValue',
  'onValueChange'
>;

export interface TrimProps {
  /**
   * Removes leading and trailing whitespace from the value
   * when the value is committed.
   *
   * @default false
   */
  trim?: boolean;
}

export interface EmbeddedProps {
  /**
   * Renders the component as part of a parent component's visual container.
   *
   * Removes standalone container styling such as borders, radius,
   * and focus ring.
   */
  embedded?: boolean;
}

export type ValidationResult = boolean | string;

export type ValidateOn = "change" | "blur" | "both";

export interface ValidateProps<T = string> {
  /**
   * Validates the current value.
   *
   * Return `true` when valid, or `false`/a string when invalid.
   * A returned string is used as the validation message.
   */
  validate?: (value: T) => ValidationResult;

  /**
   * Determines when validation runs.
   *
   * @default "blur"
   */
  validateOn?: ValidateOn;
}
