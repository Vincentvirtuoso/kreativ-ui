import { useCallback, useEffect, useId, useMemo, useReducer, useRef, useState } from "react";
import { SelectContext, type SelectItemMeta } from "./Select.context";
import type { SelectProps } from "./Select.types";
import { SelectTrigger } from "./SelectTrigger";
import { SelectContent } from "./SelectContent";
import { SelectItem } from "./SelectItem";
import { SelectValue } from "./SelectValue";
import { SelectGroup } from "./SelectGroup";
import { SelectLabel } from "./SelectLabel";
import { useOptionalFormField } from "../FormField/FormField.context";

export function Select({
    value: valueProp,
    defaultValue,
    onValueChange,
    disabled = false,
    required,
    name,
    variant = "outline",
    size = "md",
    className,
    placeholder,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
    clearable = false,
    error,
    success,
    tabIndex,
    children,
}: SelectProps) {
    const autoId = useId();
    const field = useOptionalFormField();
    const triggerId = field?.id ?? autoId;
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentId = `${triggerId}-listbox`;

    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = valueProp !== undefined ? valueProp : internalValue;

    const isInvalid = error || field?.invalid || false;

    const isSuccess =
        success && !isInvalid ? true : false;
    const describedBy = field?.describedBy;
    const isRequired = field?.required ?? required;

    const [open, setOpen] = useState(false);
    const [activeValue, setActiveValue] = useState<string | undefined>(value);

    const itemsRef = useRef<Map<string, SelectItemMeta>>(new Map());
    const [, forceUpdate] = useReducer((n) => n + 1, 0);

    const registerItem = useCallback((val: string, meta: SelectItemMeta) => {
        itemsRef.current.set(val, meta);
        forceUpdate();
        return () => {
            itemsRef.current.delete(val);
            forceUpdate();
        };
    }, []);

    const handleValueChange = useCallback(
        (v: string) => {
            if (valueProp === undefined) setInternalValue(v);
            onValueChange?.(v);
            setOpen(false);
        },
        [valueProp, onValueChange]
    );

    useEffect(() => {
        if (open) setActiveValue(value);
    }, [open, value]);

    const rootRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open) return;
        function handlePointerDown(e: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handlePointerDown);
        return () => document.removeEventListener("mousedown", handlePointerDown);
    }, [open]);

    const optionId = useCallback((val: string) => `${contentId}-option-${val}`, [contentId]);

    const handleClear = useCallback(() => {
        if (valueProp === undefined) setInternalValue(undefined);
        onValueChange?.(undefined);
        setActiveValue(undefined);
    }, [valueProp, onValueChange]);

    const ctxValue = useMemo(
        () => ({
            value,
            onValueChange: handleValueChange,
            disabled,
            variant,
            size,
            open,
            setOpen,
            triggerId,
            contentId,
            isInvalid,
            isSuccess,
            describedBy,
            required: isRequired,
            activeValue,
            setActiveValue,
            items: itemsRef.current,
            registerItem,
            optionId,
            placeholder,
            clearable,
            onClear: handleClear,
            triggerRef,
        }),
        [value, handleValueChange, disabled, variant, size, open, triggerId, contentId, isInvalid, describedBy, isRequired, activeValue, registerItem, optionId, placeholder, clearable, handleClear, isSuccess, triggerRef]
    );

    return (
        <SelectContext.Provider value={ctxValue}>
            <div ref={rootRef} className={className ?? "relative inline-block w-full"} tabIndex={tabIndex}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            >
                {children}
                {name && (
                    <input
                        type="hidden"
                        name={name}
                        value={value ?? ""}
                        disabled={disabled}
                        required={isRequired}
                    />
                )}
            </div>
        </SelectContext.Provider>
    );
}

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Value = SelectValue;
Select.Group = SelectGroup;
Select.Label = SelectLabel;