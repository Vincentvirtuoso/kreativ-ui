import { cva } from "class-variance-authority";
import { InputSize } from "../Input/Input.types";

export const switchTrackVariants = cva(
    "relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors duration-[var(--kui-duration-fast)]",
    {
        variants: {
            size: {
                sm: "h-4 w-7",
                md: "h-5 w-9",
                lg: "h-6 w-11",
            },
            checked: {
                true: "bg-brand",
                false: "bg-surface-raised",
            },
            disabled: {
                true: "cursor-not-allowed",
                false: "cursor-pointer",
            },
        },
        defaultVariants: { size: "md", checked: false, disabled: false },
    }
);

export const switchThumbConfig: Record<InputSize, { thumb: string; translate: string }> = {
    sm: { thumb: "h-3 w-3", translate: "translate-x-3" },
    md: { thumb: "h-4 w-4", translate: "translate-x-4" },
    lg: { thumb: "h-5 w-5", translate: "translate-x-5" },
};