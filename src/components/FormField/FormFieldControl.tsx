import { cloneElement, type ReactElement } from "react";

import { useFormField } from "./FormField.context";


type FormFieldControlProps<T = Record<string, unknown>> = {
    children: ReactElement<T>;
};


export function FormFieldControl<T = Record<string, unknown>>({
    children,
}: FormFieldControlProps<T>) {
    const {
        id,
        invalid,
        descriptionId,
    } = useFormField();


    return cloneElement(
        children,
        {
            id,
            "aria-invalid": invalid,
            "aria-describedby": descriptionId,
        } as unknown as Partial<T>
    );
}