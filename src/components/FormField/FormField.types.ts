import { BaseProps } from "@/types";


export interface FormFieldProps extends Omit<BaseProps, "unstyled">  {
    id?: string;

    error?: string;

    required?: boolean;
}