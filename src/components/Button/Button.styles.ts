import type { Variant } from "@/types/common";

export const buttonBase =
  "inline-flex items-center justify-center rounded-[var(--kui-radius)] font-medium " +
  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
  "disabled:opacity-50 disabled:pointer-events-none";

export const buttonVariants: Record<Variant, string> = {
  solid:
    "bg-[rgb(var(--kui-brand))] text-[rgb(var(--kui-brand-fg))] hover:bg-[rgb(var(--kui-brand-hover))]",
  outline:
    "border border-[rgb(var(--kui-border))] text-[rgb(var(--kui-text))] bg-transparent hover:bg-[rgb(var(--kui-surface-raised))]",
  ghost:
    "text-[rgb(var(--kui-text))] bg-transparent hover:bg-[rgb(var(--kui-surface-raised))]",
  soft: "bg-[rgb(var(--kui-surface-raised))] text-[rgb(var(--kui-text))] hover:bg-[rgb(var(--kui-surface-sunken))]",
};
