import type { ButtonProps } from "@/components/Button";
import type { BaseColor, BaseProps, Orientation, ThemeTransition } from "@/types";
import { ButtonVariant } from "../Button/Button.types";

export type ThemeTogglerVariant =  Exclude<ButtonVariant, 'link'>;
export type ThemeTogglerDisplay = "buttons" | "cycle";

export type ThemeTogglerColor = Exclude<
  BaseColor,
  "destructive" | "warning" | "success" | "white"| "info"
>;

export interface ThemeTogglerProps extends Omit<BaseProps, "children"> {
  variant?: ThemeTogglerVariant;
  activeVariant?: ThemeTogglerVariant;

  color?: ButtonProps["color"];
  activeColor?: ButtonProps["color"];

  size?: ButtonProps["size"];

  iconOnly?: boolean;
  allowSystem?: boolean;

  orientation?: Orientation;

  rounded?: boolean;

  labels?: {
    light?: string;
    dark?: string;
    system?: string;
  };

  icons?: {
    light?: React.ReactNode;
    dark?: React.ReactNode;
    system?: React.ReactNode;
  };

  buttonProps?: Omit<ButtonProps, "variant" | "color" | "size" | "children">;

  display?: ThemeTogglerDisplay;

  transition?: ThemeTransition;
}
