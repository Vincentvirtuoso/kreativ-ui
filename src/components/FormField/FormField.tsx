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

    const [reportedMessage, setReportedMessage] = useState<string | undefined>(undefined);
    const [labelCount, setLabelCount] = useState(0);

    const reportValidity = useCallback(
        (result: { invalid: boolean; message?: string } | null) => {
            if (error !== undefined) return; 
            setReportedMessage(result?.invalid ? result.message : undefined);
        },
        [error]
    );
    const registerLabel = useCallback(() => {
        setLabelCount((n) => n + 1);
        return () => setLabelCount((n) => n - 1);
    }, []);
    const hasExternalLabel = labelCount > 0;
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
                registerLabel,
                hasExternalLabel,
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