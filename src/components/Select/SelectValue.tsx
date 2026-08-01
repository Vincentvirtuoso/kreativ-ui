import { cn } from "@/utils/cn";
import { useSelectContext } from "./Select.context";
import type { SelectValueProps } from "./Select.types";

export function SelectValue({ placeholder, className }: SelectValueProps) {
    const ctx = useSelectContext("SelectValue");
    const selected = ctx.value !== undefined ? ctx.items.get(ctx.value) : undefined;

    if (!selected) {
        const text = placeholder ?? ctx.placeholder;
        return <span className={cn("truncate text-text-muted", className)}>{text}</span>;
    }

    return <span className={cn("truncate text-text", className)}>{selected.label}</span>;
}