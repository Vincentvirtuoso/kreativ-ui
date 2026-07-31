import { createContext, useContext } from "react";

interface FormFieldContextValue {
    id: string;
    describedBy?: string;
    invalid: boolean;
    required?: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField() {
    return useContext(FormFieldContext);
}