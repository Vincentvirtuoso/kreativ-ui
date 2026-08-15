"use client";

import { createContext, useContext, type RefObject } from "react";

export interface ComboboxItemMeta {
    label: React.ReactNode;
    disabled?: boolean;
    visible: boolean;
}

export interface ComboboxContextValue {
    value?: string;
    inputValue: string;
    setInputValue: (v: string) => void;
    onValueChange: (value: string | undefined) => void;
    disabled: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerId: string;
    contentId: string;
    triggerRef: RefObject<HTMLInputElement | null>;
    isInvalid: boolean;
    isSuccess?: boolean;
    rounded?: boolean;
    describedBy?: string;
    activeValue: string | undefined;
    setActiveValue: (value: string | undefined) => void;
    setItemVisibility: (value: string, visible: boolean) => void;
    items: Map<string, ComboboxItemMeta>;
    registerItem: (value: string, meta: ComboboxItemMeta) => () => void;
    unregisterItem: (value: string) => void;
    optionId: (value: string) => string;
}

export const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export function useComboboxContext(componentName: string) {
    const ctx = useContext(ComboboxContext);
    if (!ctx) throw new Error(`<${componentName} /> must be rendered inside <Combobox>.`);
    return ctx;
}