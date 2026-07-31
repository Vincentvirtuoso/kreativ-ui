import type {
    ReactNode,
} from "react";

export interface FormFieldProps {
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
    id?: string; 
}