import { defineRecipe } from "@/theme/recipes";

export const formControlBase =
  "group relative inline-flex items-center " +
  "rounded-[var(--kui-radii-md)] " +
  "transition-colors duration-[var(--kui-duration-fast)] " +
  "focus-within:outline-none " +
  "focus-within:ring-2 ";

export const formControlVariants = {
  outline: "border border-border bg-transparent text-text hover:border-brand",

  filled:
    "border border-transparent bg-surface-raised text-text hover:bg-surface",

  ghost:
    "border border-transparent bg-transparent text-text hover:bg-surface-raised",
} as const;

export const formControlStates = {
  none: "focus-within:ring-brand/20",

  error: "border-destructive focus-within:ring-destructive/20",

  success: "border-success focus-within:ring-success/20",
} as const;

export const formControlRecipe = defineRecipe({
  base: formControlBase,

  variants: {
    variant: formControlVariants,

    state: formControlStates,

    rounded: {
      true: "rounded-full",
      false: "",
    },

    fullWidth: {
      true: "w-full",
      false: "",
    },

    disabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
      false: "",
    },

    hasAdornment: {
      true: "px-2",
      false: "",
    },
  },

  defaultVariants: {
    variant: "outline",
    state: "none",
    rounded: false,
    fullWidth: true,
    disabled: false,
    hasAdornment: false,
  },
});
