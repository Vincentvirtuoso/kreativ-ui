import type { ButtonProps } from "@/components/Button";
import type { SizeValue } from "@/types";

export interface ThemeTogglerProps {

    variant?: ButtonProps["variant"];

    activeVariant?: ButtonProps["variant"];

    size?: SizeValue;

    iconOnly?: boolean;

    allowSystem?: boolean;

    orientation?: "horizontal" | "vertical";

    rounded?: boolean;

    unstyled?: boolean;

    labels?: {
        light?: string;
        dark?: string;
        system?: string;
    };

    icons?: {
        light?: React.ReactNode;
        dark?: React.ReactNode;
        system?: React.ReactNode;
    };

    className?: string;

    display?: "buttons" | "cycle";
    
    buttonProps?: Partial<ButtonProps>;
}