import { useCallback, useState, type RefObject } from "react";

export function useClearableField<
  T extends HTMLInputElement | HTMLTextAreaElement,
>(
  elementRef: RefObject<T | null>,
  initialValue: unknown,
  onClear?: () => void,
) {
  const [hasValue, setHasValue] = useState(() => Boolean(initialValue ?? ""));

  const clear = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const prototype =
      element instanceof HTMLTextAreaElement
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;

    const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    setter?.call(element, "");

    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.focus();

    setHasValue(false);
    onClear?.();
  }, [elementRef, onClear]);

  return { hasValue, setHasValue, clear };
}
