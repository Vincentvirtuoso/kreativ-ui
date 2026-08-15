"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";

const VIEWPORT_PADDING = 8;

export function useFloatingSide(
    triggerRef: RefObject<HTMLElement | null>,
    open: boolean
) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [side, setSide] = useState<"top" | "bottom">("bottom");

    useLayoutEffect(() => {
        if (!open) return;
        const trigger = triggerRef.current;
        const content = contentRef.current;
        if (!trigger || !content) return;

        function measure() {
            const triggerRect = trigger!.getBoundingClientRect();
            const contentHeight = content!.offsetHeight;
            const spaceBelow = window.innerHeight - triggerRect.bottom - VIEWPORT_PADDING;
            const spaceAbove = triggerRect.top - VIEWPORT_PADDING;
            setSide(contentHeight > spaceBelow && spaceAbove > spaceBelow ? "top" : "bottom");
        }

        measure();
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure, true);
        return () => {
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", measure, true);
        };
    }, [open, triggerRef]);

    return { contentRef, side };
}