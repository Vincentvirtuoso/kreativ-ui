import { cva } from "class-variance-authority";
import { InputSize } from "../Input/Input.types";

export const checkboxBoxVariants = cva(
  "flex shrink-0 items-center justify-center rounded-[calc(var(--kui-radii-md)-2px)] border transition-colors duration-[var(--kui-duration-fast)]",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      state: {
        none: "",
        error: "border-destructive",
        success: "border-success",
      },
      checked: {
        true: "bg-brand border-brand text-brand-fg",
        false: "border-border bg-transparent",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      state: "none",
      checked: false,
      disabled: false,
    },
    compoundVariants: [
      { checked: false, state: "error", class: "border-destructive" },
      { checked: false, state: "success", class: "border-success" },
    ],
  },
);

export const checkboxIconSizes: Record<InputSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
};
