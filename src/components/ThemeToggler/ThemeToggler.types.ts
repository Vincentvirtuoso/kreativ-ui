import type { BaseVariant, SizeValue, Styleable } from "@/types";

export interface ThemeTogglerProps extends Styleable {
    variant?: BaseVariant;
    size?: SizeValue;
    iconOnly?: boolean;

    allowSystem?: boolean;
}