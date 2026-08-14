import { TextareaHTMLAttributes } from "react";
import { InputSize, InputVariant } from "../Input/Input.types";

export type TextareaResize = "none" | "both" | "horizontal" | "vertical";

export interface TextareaProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    value?: string;
    defaultValue?: string;

    className?: string;
    size?: InputSize;
    fullWidth?: boolean;
    resize?: TextareaResize;
    variant?: InputVariant;

    autoResize?: boolean;
    minRows?: number;
    maxRows?: number;
    clearable?: boolean;
    onClear?: () => void;
    characterCounter?: boolean;
    debounceDelay?: number;
    trimOnBlur?: boolean;

    error?: boolean;
    success?: boolean;
    onValidate?: (value: string) => boolean | string;
    onValueChange?: (newValue: string) => void;
}