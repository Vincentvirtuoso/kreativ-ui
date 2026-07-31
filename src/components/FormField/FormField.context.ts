import { createContext, useContext } from "react";


export interface FormFieldContextValue {
    id: string;

    descriptionId?: string;

    messageId?: string;

    invalid: boolean;

    required: boolean;
}


export const FormFieldContext =
    createContext<FormFieldContextValue | null>(null);


export function useFormField() {
    const context = useContext(FormFieldContext);

    if (!context) {
        throw new Error(
            "FormField components must be used inside <FormField />"
        );
    }

    return context;
}