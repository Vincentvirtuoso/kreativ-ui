import type { InputHTMLAttributes, ReactNode } from "react";
import type { Styleable } from "@/types/common";
import { InputSize } from "../Input/Input.types";


export interface SwitchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "checked" | "defaultChecked" >,
    Styleable {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: InputSize;
    error?: boolean;
    success?: boolean;
    required?: boolean;
    disabled?: boolean;
    label?: ReactNode;
    description?: ReactNode;
}