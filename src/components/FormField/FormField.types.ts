import type {
    ReactNode,
} from "react";


export interface FormFieldProps {
    children: ReactNode;

    id?: string;

    error?: string;

    required?: boolean;
}