import { Variant } from "./Button.types";

export const buttonBase =
  "inline-flex items-center justify-center rounded-[var(--kui-radius)] font-medium " +
  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
  "disabled:opacity-60 disabled:pointer-events-none";

export type Size = "sm" | "md" | "lg";
export type SizeValue = Size | (string & {});

export const buttonVariants: Record<Variant, string> = {
  solid:
    "bg-brand text-brand-fg hover:bg-brand-hover",

  outline:
    "border border-border text-text bg-transparent hover:bg-surface-raised",

  ghost:
    "text-text bg-transparent hover:bg-surface-raised",

  soft:
    "bg-surface-raised text-text hover:bg-surface-sunken",

  destructive:
    "bg-destructive text-destructive-fg hover:bg-destructive-hover",

  success:
    "bg-success text-success-fg hover:bg-success-hover",

  warning:
    "bg-warning text-warning-fg hover:bg-warning-hover",

  info:
    "bg-info text-info-fg hover:bg-info-hover",

  "outline-brand":
    "border border-brand text-brand bg-transparent hover:bg-brand/10",

  "ghost-brand":
    "text-brand bg-transparent hover:bg-brand/10",

  link:
    "text-brand bg-transparent hover:underline hover:bg-transparent p-0 h-auto",

  "solid-white":
    "bg-white text-text hover:bg-gray-50",

  "outline-white":
    "border border-white/30 text-white bg-transparent hover:bg-white/10",

  "outline-destructive":
    "border border-destructive text-destructive bg-transparent hover:bg-destructive/10",

  "ghost-destructive":
    "text-destructive bg-transparent hover:bg-destructive/10",

  "soft-destructive":
    "bg-destructive/10 text-destructive hover:bg-destructive/20",

  "outline-success":
    "border border-success text-success bg-transparent hover:bg-success/10",

  "ghost-success":
    "text-success bg-transparent hover:bg-success/10",

  "soft-success":
    "bg-success/10 text-success hover:bg-success/20",

  "outline-warning":
    "border border-warning text-warning bg-transparent hover:bg-warning/10",

  "ghost-warning":
    "text-warning bg-transparent hover:bg-warning/10",

  "soft-warning":
    "bg-warning/10 text-warning hover:bg-warning/20",

  "outline-info":
    "border border-info text-info bg-transparent hover:bg-info/10",

  "ghost-info":
    "text-info bg-transparent hover:bg-info/10",

  "soft-info":
    "bg-info/10 text-info hover:bg-info/20",

  "soft-brand":
    "bg-brand/10 text-brand hover:bg-brand/20",

  "ghost-white":
    "text-white bg-transparent hover:bg-white/10",
};

export interface Styleable {
  className?: string;
}