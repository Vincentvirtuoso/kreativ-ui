import { cva } from "class-variance-authority";
import { InputSize } from "../Input/Input.types";
import type {  TextareaResize } from "./Textarea.types";

export const textareaBase =
    [
        "flex",
        "w-full",
        "font-sans",
        "transition-colors",
        "duration-[var(--kui-duration-fast)]",
        "outline-none",
        "border-0",
        "bg-transparent",
        "placeholder:text-text-muted",
        "disabled:opacity-50",
        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
    ].join(" ");

export const textareaWrapperVariants = cva(
    "relative rounded-[var(--kui-radius)] transition-colors",
    {
        variants: {
            variant: {
                outline: "border border-border bg-transparent hover:border-brand focus-within:border-brand",
                filled: "border border-transparent bg-surface-raised hover:bg-surface",
                ghost: "border border-transparent bg-transparent hover:bg-surface-raised",
            },
            state: {
                none: "focus-within:ring-2 focus-within:ring-brand/20",
                error: "border-danger focus-within:ring-2 focus-within:ring-danger/20",
                success: "border-success focus-within:ring-2 focus-within:ring-success/20",
            },
            fullWidth: {
                true: "w-full",
                false: "",
            },
            disabled: {
                true: "pointer-events-none cursor-not-allowed opacity-50",
                false: "",
            },
        },
        defaultVariants: { variant: "outline", state: "none", fullWidth: true, disabled: false },
    }
);

export const textareaSizeVariants: Record<InputSize, string> = {
    sm: "px-2 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base",
};

export const textareaResizeVariants: Record<TextareaResize, string> = {
    none: "resize-none",
    both: "resize",
    horizontal: "resize-x",
    vertical: "resize-y",
};