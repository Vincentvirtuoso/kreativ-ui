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

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, Styleable {
  variant?: Variant;
  size?: SizeValue;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}
