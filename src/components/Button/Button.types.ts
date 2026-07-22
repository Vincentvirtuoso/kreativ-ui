import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { SizeValue, Styleable, Variant } from "@/types/common";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, Styleable {
  variant?: Variant;
  size?: SizeValue;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}
