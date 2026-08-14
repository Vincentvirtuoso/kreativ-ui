import type { ButtonProps } from "@/components/Button";
import type { BaseTransition, Orientation, SizeValue } from "@/types";
import { ButtonVariant } from "../Button/Button.types";

export type ThemeTogglerDisplay = "buttons" | "cycle";

export const THEME_TOGGLER_VARIANTS: ButtonVariant[] = [
    "ghost",
    "outline",
    "solid",
    "soft",
    "ghost-brand",
    "outline-brand",
    "soft-brand",
    "solid-white",
    "outline-white",
    "ghost-white",
];

export type ThemeTogglerVariant = typeof THEME_TOGGLER_VARIANTS[number];

export interface ThemeTogglerProps {

    variant?: ThemeTogglerVariant;

    activeVariant?: ThemeTogglerVariant;

    size?: SizeValue;

    iconOnly?: boolean;

    allowSystem?: boolean;

    orientation?: Orientation;

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
    transition?: {type: BaseTransition; duration?: number; delay?: number, easing?: string};

    display?: ThemeTogglerDisplay;
    
    buttonProps?: Partial<ButtonProps>;
}