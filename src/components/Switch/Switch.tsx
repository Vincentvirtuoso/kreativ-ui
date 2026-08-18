"use client";

import { useId,  useState } from "react";
import { cn } from "@/utils/cn";
import { useOptionalFormField } from "../FormField/FormField.context";
import { switchTrackVariants, switchThumbConfig } from "./Switch.styles";
import type { SwitchProps } from "./Switch.types";

export function Switch({
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    size = "md",
    disabled,
    label,
    description,
    className,
    id: externalId,
    onChange: onChangeProp,
    ...props
}: SwitchProps) {
    const autoId = useId();
    const field = useOptionalFormField();
    const id = field?.id ?? externalId ?? autoId;

    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const checked = checkedProp !== undefined ? checkedProp : internalChecked;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const next = e.target.checked;
        if (checkedProp === undefined) setInternalChecked(next);
        onCheckedChange?.(next);
        onChangeProp?.(e);
    }

    const descriptionId = description ? `${id}-description` : undefined;
    const { thumb, translate } = switchThumbConfig[size];

    return (
        <div className={cn("flex gap-2.5", disabled && "cursor-not-allowed opacity-50", className)}>
            <div className="relative inline-flex">
                <input
                    type="checkbox"
                    role="switch"
                    id={id}
                    checked={checked}
                    disabled={disabled}
                    onChange={handleChange}
                    aria-describedby={field?.describedBy ?? descriptionId}
                    className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                    {...props}
                />
                <div
                    aria-hidden="true"
                    className={cn(
                        switchTrackVariants({  checked, disabled: !!disabled }),
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-1"
                    )}
                >
                    <div
                        className={cn(
                            "absolute left-0.5 rounded-full bg-white shadow transition-transform duration-[var(--kui-duration-fast)]",
                            thumb,
                            checked && translate
                        )}
                    />
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