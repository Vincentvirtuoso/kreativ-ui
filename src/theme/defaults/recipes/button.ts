import { defineRecipe } from "@/theme/recipes";

export const buttonBase =
  "inline-flex items-center justify-center " +
  "rounded-[var(--kui-button-radius,var(--kui-radius))] " +
  "font-medium " +
  "transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand " +
  "focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-surface " +
  "disabled:opacity-60 disabled:pointer-events-none";

export const buttonVariants = {
  solid: "",
  outline: "border bg-transparent",
  ghost: "bg-transparent",
  soft: "",
  link: "bg-transparent p-0 h-auto hover:underline",
} as const;

export const buttonColors = {
  brand: {
    solid: "bg-brand text-brand-fg hover:bg-brand-hover",
    outline: "border-brand text-brand hover:bg-brand/10",
    ghost: "text-brand hover:bg-brand/10",
    soft: "bg-brand/10 text-brand hover:bg-brand/20",
    link: "text-brand",
  },
  destructive: {
    solid: "bg-destructive text-destructive-fg hover:bg-destructive-hover",
    outline: "border-destructive text-destructive hover:bg-destructive/10",
    ghost: "text-destructive hover:bg-destructive/10",
    soft: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    link: "text-destructive",
  },
  success: {
    solid: "bg-success text-success-fg hover:bg-success-hover",
    outline: "border-success text-success hover:bg-success/10",
    ghost: "text-success hover:bg-success/10",
    soft: "bg-success/10 text-success hover:bg-success/20",
    link: "text-success",
  },
  warning: {
    solid: "bg-warning text-warning-fg hover:bg-warning-hover",
    outline: "border-warning text-warning hover:bg-warning/10",
    ghost: "text-warning hover:bg-warning/10",
    soft: "bg-warning/10 text-warning hover:bg-warning/20",
    link: "text-warning",
  },
  info: {
    solid: "bg-info text-info-fg hover:bg-info-hover",
    outline: "border-info text-info hover:bg-info/10",
    ghost: "text-info hover:bg-info/10",
    soft: "bg-info/10 text-info hover:bg-info/20",
    link: "text-info",
  },
  white: {
    solid: "bg-white text-black hover:bg-gray-50",
    outline: "border-white/30 text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
    soft: "bg-white/10 text-white hover:bg-white/20",
    link: "text-white",
  },
  neutral: {
    solid: "bg-surface-raised text-text hover:bg-surface-sunken",
    outline: "border-border text-text hover:bg-surface-raised",
    ghost: "text-text hover:bg-surface-raised",
    soft: "bg-surface-raised text-text hover:bg-surface-sunken",
    link: "text-text",
  },
} as const;

const buildCompoundVariants = () => {
  const compounds: Array<{
    conditions: Record<string, string>;
    className: string;
  }> = [];

  for (const [color, variantMap] of Object.entries(buttonColors)) {
    for (const [variant, className] of Object.entries(variantMap)) {
      compounds.push({
        conditions: { color, variant },
        className,
      });
    }
  }

  return compounds;
};

export const buttonRecipe = defineRecipe({
  base: buttonBase,

  variants: {
    variant: buttonVariants,

    color: Object.fromEntries(
      Object.keys(buttonColors).map((color) => [color, ""]),
    ) as Record<string, string>,
  },

  defaultVariants: {
    variant: "solid",
    color: "brand",
  },

  compoundVariants: buildCompoundVariants(),
});
