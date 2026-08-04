import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { SizeValue, Styleable, BaseVariant } from "@/types/common";


export type Variant =
  | BaseVariant
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "outline-brand"
  | "ghost-brand"
  | "link"
  | "solid-white"
  | "outline-white"
  | "outline-destructive"
  | "ghost-destructive"
  | "soft-destructive"
  | "outline-success"
  | "ghost-success"
  | "soft-success"
  | "outline-warning"
  | "ghost-warning"
  | "soft-warning"
  | "outline-info"
  | "ghost-info"
  | "soft-info"
  | "soft-brand"
  | "ghost-white";

export type ButtonVariant = Variant;
export type ButtonSize = SizeValue | "icon";

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
  >,
    Styleable {
  variant?: Variant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  iconOnly?: boolean;
}
