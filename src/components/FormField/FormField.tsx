import {
    useId,
} from "react";

import {
    FormFieldContext,
} from "./FormField.context";

import type {
    FormFieldProps,
} from "./FormField.types";

import {
    FormFieldLabel,
    FormFieldDescription,
    FormFieldMessage,
    FormFieldControl,
} from "./";


export function FormField({
    id: externalId,
    error,
    required = false,
    children,
}: FormFieldProps) {

    const generatedId = useId();

    const id = externalId ?? generatedId;

    const descriptionId =
        `${id}-description`;

    const messageId =
        `${id}-message`;


    return (
        <FormFieldContext.Provider
            value={{
                id,
                descriptionId,
                messageId,
                invalid: Boolean(error),
                required,
            }}
        >
            <div className="flex flex-col gap-2">
                {children}

                {error && (
                    <FormFieldMessage>
                        {error}
                    </FormFieldMessage>
                )}
            </div>
        </FormFieldContext.Provider>
    );
}


FormField.Label = FormFieldLabel;
FormField.Control = FormFieldControl;
FormField.Description = FormFieldDescription;
FormField.Message = FormFieldMessage;