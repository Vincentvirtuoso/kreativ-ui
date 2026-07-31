import type { InputHTMLAttributes, ReactNode } from "react";
import type { Styleable } from "@/types/common";

export type InputVariant = "outline" | "filled" | "ghost";

export type InputSize = "sm" | "md" | "lg";

export type InputKind =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "search"
  | "numeric"
  | "password-current"
  | "password-new"
  | "number"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
  Styleable {
  variant?: InputVariant;
  inputClassName?: string;
  inputSize?: InputSize;
  error?: boolean;
  success?: boolean;
  rounded?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
  hideKindIcon?: boolean;
  isLoading?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  kind?: InputKind;
}

export type InputKindDefaults = Record<
  InputKind,
  {
    type?: string;
    inputMode?: "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
    autoComplete?: string;
    placeholder?: string;
    pattern?: string;
    min?: number;
    max?: number;
    step?: number;
  }
>;