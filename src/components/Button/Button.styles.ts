import type { Variant } from "@/types/common";

export const buttonBase =
  "inline-flex items-center justify-center rounded-[var(--kui-radius)] font-medium " +
  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
  "disabled:opacity-50 disabled:pointer-events-none";

export const buttonVariants: Record<Variant, string> = {
  solid:
    "bg-brand text-brand-fg hover:bg-brand-hover",

  outline:
    "border border-border text-text bg-transparent hover:bg-surface-raised",

  ghost:
    "text-text bg-transparent hover:bg-surface-raised",

  soft:
    "bg-surface-raised text-text hover:bg-surface-sunken",
};