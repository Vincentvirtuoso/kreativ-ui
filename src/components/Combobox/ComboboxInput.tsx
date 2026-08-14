import { forwardRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import { inputBase, inputWrapperVariants, inputSizeVariants } from "../Input/Input.styles";
import { ClearIcon } from "../Input/Input.icons";
import { useComboboxContext } from "./Combobox.context";
import { ComboboxInputProps } from "./Combobox.types";


function orderedFilteredValues(ctx: ReturnType<typeof useComboboxContext>, query: string) {
    const q = query.trim().toLowerCase();
    return [...ctx.items.entries()]
        .filter(([, meta]) => !meta.disabled)
        .filter(([, meta]) => !q || String(meta.label).toLowerCase().includes(q))
        .map(([val]) => val);
}

export const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(
    ({ variant = "outline", size = "md", placeholder, clearable = false, allowFreeText = false, className }, ref) => {
        const ctx = useComboboxContext("ComboboxInput");
        const state = ctx.isInvalid ? "error" : ctx.isSuccess ? "success" : "none";
        const showClear = clearable && ctx.inputValue.length > 0 && !ctx.disabled;

        useEffect(() => {
            console.log(ctx);
            
            if (ctx.value === undefined) return;

            const meta = ctx.items.get(ctx.value);
            if (meta && !ctx.open) {
                ctx.setInputValue(String(meta.label));
            }
        }, [ctx.value, ctx.open, ctx.items]);
        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            ctx.setInputValue(e.target.value);
            if (!ctx.open) ctx.setOpen(true);
            ctx.setActiveValue(undefined);
            if (allowFreeText) ctx.onValueChange(e.target.value || undefined);
        }

        function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
            const order = orderedFilteredValues(ctx, ctx.inputValue);
            switch (e.key) {
                case "ArrowDown": {
                    e.preventDefault();
                    if (!ctx.open) { ctx.setOpen(true); return; }
                    const i = ctx.activeValue ? order.indexOf(ctx.activeValue) : -1;
                    ctx.setActiveValue(order[(i + 1) % order.length]);
                    break;
                }
                case "ArrowUp": {
                    e.preventDefault();
                    if (!ctx.open) { ctx.setOpen(true); return; }
                    const i = ctx.activeValue ? order.indexOf(ctx.activeValue) : -1;
                    ctx.setActiveValue(order[(i - 1 + order.length) % order.length]);
                    break;
                }
                case "Enter":
                    e.preventDefault();
                    if (ctx.activeValue !== undefined) ctx.onValueChange(ctx.activeValue);
                    else if (allowFreeText) ctx.setOpen(false);
                    break;
                case "Escape":
                    if (ctx.open) { e.preventDefault(); ctx.setOpen(false); }
                    break;
                default:
                    break;
            }
        }

        function handleBlur() {
            if (!allowFreeText && ctx.value === undefined) ctx.setInputValue("");
            setTimeout(() => ctx.setOpen(false), 120);
        }

        return (
            <div
                className={cn(
                    inputWrapperVariants({ variant, state, fullWidth: true, disabled: ctx.disabled , rounded: ctx.rounded }),
                    "px-2",
                    className
                )}
            >
                <input
                    ref={(node) => {
                        (ctx.triggerRef as React.RefObject<HTMLInputElement | null>).current = node;
                        if (typeof ref === "function") ref(node);
                        else if (ref) (ref as React.RefObject<HTMLInputElement | null>).current = node;
                    }}
                    id={ctx.triggerId}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-haspopup="listbox"
                    aria-expanded={ctx.open}
                    aria-controls={ctx.contentId}
                    aria-activedescendant={ctx.open && ctx.activeValue ? ctx.optionId(ctx.activeValue) : undefined}
                    aria-invalid={ctx.isInvalid || undefined}
                    aria-describedby={ctx.describedBy}
                    disabled={ctx.disabled}
                    value={ctx.inputValue}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={() => ctx.setOpen(true)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    data-state={ctx.open ? "open" : "closed"}
                    className={cn(inputBase, "flex-1 border-0 bg-transparent outline-none", inputSizeVariants[size], "px-0")}
                />
                {showClear && (
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label="Clear"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            ctx.setInputValue("");
                            ctx.onValueChange(undefined);
                        }}
                        className="flex items-center justify-center text-text-muted transition-colors hover:text-text"
                    >
                        <ClearIcon size={14} />
                    </button>
                )}
            </div>
        );
    }
);

ComboboxInput.displayName = "ComboboxInput";