import { useId } from "react";
import { cn } from "@/utils/cn";
import { FormFieldContext } from "./FormField.context";
import type { FormFieldProps } from "./FormField.types";

export function FormField({
    label,
    description,
    error,
    required,
    children,
    className,
    id: externalId,
}: FormFieldProps) {
    const autoId = useId();
    const id = externalId ?? autoId;

    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [errorId, descriptionId].filter(Boolean).join(" ") || undefined;

    return (
        <FormFieldContext.Provider
            value={{ id, describedBy, invalid: !!error, required }}
        >
            <div className={cn("flex flex-col gap-2", className)}>
                {label && (
                    <label htmlFor={id} className="text-sm font-medium text-text">
                        {label}
                        {required && (
                            <span aria-hidden className="text-danger ml-1">
                                *
                            </span>
                        )}
                    </label>
                )}

                {children}

                {error ? (
                    <p id={errorId} className="text-sm text-danger">
                        {error}
                    </p>
                ) : (
                    description && (
                        <p id={descriptionId} className="text-sm text-text-muted">
                            {description}
                        </p>
                    )
                )}
            </div>
        </FormFieldContext.Provider>
    );
}