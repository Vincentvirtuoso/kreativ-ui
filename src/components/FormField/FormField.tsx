import { useCallback, useId, useState } from "react";
import { FormFieldContext } from "./FormField.context";
import type { FormFieldProps } from "./FormField.types";
import { FormFieldLabel, FormFieldDescription, FormFieldMessage, FormFieldControl } from "./";

export function FormField({
    id: externalId,
    error,
    required = false,
    children,
}: FormFieldProps) {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const descriptionId = `${id}-description`;
    const messageId = `${id}-message`;

    // What a child control has self-reported via onValidate — only
    // consulted when FormField itself has no explicit `error`.
    const [reportedMessage, setReportedMessage] = useState<string | undefined>(undefined);

    const reportValidity = useCallback(
        (result: { invalid: boolean; message?: string } | null) => {
            if (error !== undefined) return; // explicit error prop always wins
            setReportedMessage(result?.invalid ? result.message : undefined);
        },
        [error]
    );

    const displayedMessage = error ?? reportedMessage;

    return (
        <FormFieldContext.Provider
            value={{
                id,
                descriptionId,
                messageId,
                describedBy:
                    [descriptionId, displayedMessage ? messageId : undefined]
                        .filter(Boolean)
                        .join(" ") || undefined,
                invalid: Boolean(displayedMessage),
                required,
                reportValidity,
            }}
        >
            <div className="flex flex-col gap-2">
                {children}

                {displayedMessage && (
                    <FormFieldMessage>{displayedMessage}</FormFieldMessage>
                )}
            </div>
        </FormFieldContext.Provider>
    );
}

FormField.Label = FormFieldLabel;
FormField.Control = FormFieldControl;
FormField.Description = FormFieldDescription;
FormField.Message = FormFieldMessage;