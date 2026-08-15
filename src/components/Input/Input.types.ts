import type { InputHTMLAttributes, ReactNode } from "react";
import type {
  BaseProps,
  ClearableProps,
  DisabledProps,
  FullWidthProps,
  LoadingProps,
  SizeProps,
  StateProps,
  VariantProps,
} from "@/types";

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
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    BaseProps,
    SizeProps,
    VariantProps<InputVariant>,
    DisabledProps,
    LoadingProps,
    FullWidthProps,
    ClearableProps,
    StateProps {
  inputClassName?: string;
  size?: string;
  kind?: InputKind;
  rounded?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  hideKindIcon?: boolean;
}

export type InputKindDefaults = Record<
  InputKind,
  {
    type?: string;
    inputMode?:
      | "none"
      | "text"
      | "decimal"
      | "numeric"
      | "tel"
      | "search"
      | "email"
      | "url";
    autoComplete?: string;
    placeholder?: string;
    pattern?: string;
    min?: number;
    max?: number;
    step?: number;
  }
>;
