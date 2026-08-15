import type { ButtonHTMLAttributes, ReactNode } from "react";
import type {
  SizeValue,
  BaseVariant,
  BaseProps,
  ColorProps,
  VariantProps,
  DisabledProps,
  LoadingProps,
  FullWidthProps,
  BaseColor,
  TypographyProps,
} from "@/types/common";

export type ButtonSize = SizeValue | "icon";

export type ButtonVariant = BaseVariant | "link";

export type ButtonColor = BaseColor;

export interface ButtonRenderProps {
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  "aria-busy"?: boolean;
  children?: React.ReactNode;
}

export interface ButtonProps
  extends
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | "onDrag"
      | "onDragStart"
      | "onDragEnd"
      | "onAnimationStart"
      | "onAnimationEnd"
      | "onAnimationIteration"
      | "color"
    >,
    BaseProps,
    ColorProps<ButtonColor>,
    VariantProps<ButtonVariant>,
    DisabledProps,
    LoadingProps,
    FullWidthProps,
    TypographyProps {
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  render?: (props: ButtonRenderProps) => React.ReactElement;
}
