import { forwardRef, useEffect, useId, useRef, useState, type Ref } from "react";
import { cn } from "@/utils/cn";
import { useOptionalFormField } from "../FormField/FormField.context";
import { checkboxBoxVariants, checkboxIconSizes } from "./Checkbox.styles";
import type { CheckboxProps } from "./Checkbox.types";
import {Check} from 'lucide-react'
import { DashIcon } from "./Checkbox.icon";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
    return (node: T) => {
        refs.forEach((r) => {
            if (!r) return;
            if (typeof r === "function") r(node);
            else (r as React.RefObject<T | null>).current = node;
        });
    };
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            checked: checkedProp,
            defaultChecked,
            onCheckedChange,
            indeterminate = false,
            size = "md",
            error,
            success,
            disabled,
            label,
            description,
            id: externalId,
            onChange: onChangeProp,
            required,
            ...props
        },
        ref
    ) => {
        const autoId = useId();
        const field = useOptionalFormField();
        const id = field?.id ?? externalId ?? autoId;

        const internalRef = useRef<HTMLInputElement>(null);
        const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
        const checked = checkedProp !== undefined ? checkedProp : internalChecked;
        const hasWarned = useRef(false);
        useEffect(() => {
            if (import.meta.env.NODE_ENV === "production") return;
            if (hasWarned.current) return;
            if (label && field?.hasExternalLabel) {
                console.warn(
                    "[kreativ-ui/Checkbox] This checkbox has both a `label` prop and a <FormField.Label> " +
                    "ancestor. That renders two <label> elements pointing at the same input, " +
                    "which double-announces in screen readers. Use Checkbox's `label` prop " +
                    "instead of <FormField.Label> when the control is a checkbox."
                );
                hasWarned.current = true;
            }
        }, [label, field?.hasExternalLabel]);

        useEffect(() => {
            if (internalRef.current) internalRef.current.indeterminate = indeterminate;
        }, [indeterminate]);

        const isInvalid = error ?? field?.invalid ?? false;
        const isSuccess = success ?? false;
        const state = isInvalid ? "error" : isSuccess ? "success" : "none";

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            const next = e.target.checked;
            if (checkedProp === undefined) setInternalChecked(next);
            onCheckedChange?.(next);
            onChangeProp?.(e);
        }

        const descriptionId = description ? `${id}-description` : undefined;
        const describedBy = field?.describedBy ?? descriptionId;

        return (
            <div className={cn("flex gap-2.5", disabled && "cursor-not-allowed opacity-50", className)}>
                <div className="relative mt-0.5 inline-flex">
                    <input
                        ref={mergeRefs(internalRef, ref)}
                        type="checkbox"
                        id={id}
                        checked={checked}
                        disabled={disabled}
                        required={required ?? field?.required}
                        onChange={handleChange}
                        aria-invalid={isInvalid || undefined}
                        aria-describedby={describedBy}
                        className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                        data-invalid={isInvalid || undefined}
                        {...props}
                    />

                    <div
                        aria-hidden="true"
                        className={cn(
                            checkboxBoxVariants({ size, state, checked: checked || indeterminate, disabled: !!disabled }),
                            "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-1"
                        )}
                    >
                        {indeterminate ? (
                            <DashIcon size={checkboxIconSizes[size]} />
                        ) : checked ? (
                            <Check size={checkboxIconSizes[size]} />
                        ) : null}
                    </div>
                </div>

                {(label || description) && (
                    <div className="flex flex-col gap-0.5">
                        {label && (
                            <label htmlFor={id} className={cn("text-sm text-text", !disabled && "cursor-pointer")}>
                                {label}
                            </label>
                        )}
                        {description && (
                            <p id={descriptionId} className="text-xs text-text-muted">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";