import type { ReactNode } from "react";
import type { Styleable } from "@/types/common";
import type { InputVariant, InputSize } from "../Input/Input.types";

export interface ComboboxProps extends Styleable {
    value?: string;
    onValueChange?: (value: string | undefined) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputChange?: (input: string) => void;

    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    success?: boolean;
    
    rounded?: boolean;

    name?: string;
    variant?: InputVariant;
    size?: InputSize;
    placeholder?: string;
    clearable?: boolean;
    allowFreeText?: boolean;
    children: ReactNode;
}

export interface ComboboxItemProps {
    value: string;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
}

export interface ComboboxInputProps {
    variant?: InputVariant;
    size?: InputSize;
    placeholder?: string;
    clearable?: boolean;
    allowFreeText?: boolean;
    className?: string;
}