import {
    forwardRef,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type Ref,
} from "react";
import { cn } from "@/utils/cn";
import { useOptionalFormField } from "../FormField/FormField.context";
import { ClearIcon } from "../Input/Input.icons";
import {
    textareaBase,
    textareaWrapperVariants,
    textareaSizeVariants,
    textareaResizeVariants,
} from "./Textarea.styles";
import type { TextareaProps } from "./Textarea.types";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
    return (node: T) => {
        refs.forEach((r) => {
            if (!r) return;
            if (typeof r === "function") r(node);
            else (r as React.MutableRefObject<T | null>).current = node;
        });
    };
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            value: valueProp,
            defaultValue,
            size = "md",
            fullWidth = true,
            resize = "vertical",
            autoResize = false,
            minRows,
            maxRows,
            clearable = false,
            onClear,
            characterCounter = false,
            debounceDelay = 0,
            trimOnBlur = false,
            error,
            success,
            onValidate,
            disabled,
            id: externalId,
            maxLength,
            variant = "outline",
            onValueChange: onValueChangeProp,
            onChange: onChangeProp,
            onBlur: onBlurProp,
            rows,
            ...props
        },
        ref
    ) => {
        const autoId = useId();
        const field = useOptionalFormField();
        const id = field?.id ?? externalId ?? autoId;

        const internalRef = useRef<HTMLTextAreaElement>(null);
        const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null);

        const [draft, setDraft] = useState(() => valueProp ?? defaultValue ?? "");
        useEffect(() => {
            if (valueProp !== undefined) setDraft(valueProp);
        }, [valueProp]);

        const [internalValidation, setInternalValidation] = useState<{ invalid?: boolean; message?: string }>({});

        const isInvalid = error ?? field?.invalid ?? internalValidation.invalid ?? false;
        const isSuccess = success ?? (onValidate && internalValidation.invalid === false) ?? false;
        const describedBy = field?.describedBy;

        function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
            const next = e.target.value;
            setDraft(next);
            if (debounceDelay > 0) {
                if (debounceTimer.current) clearTimeout(debounceTimer.current);
                debounceTimer.current = setTimeout(() => {
                    onValueChangeProp?.(next);
                    onChangeProp?.(e)
                }, debounceDelay);
            } else {
                onValueChangeProp?.(next);
                onChangeProp?.(e)
            }
        }

        useEffect(() => () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); }, []);

        function dispatchValue(next: string) {
            const el = internalRef.current;
            if (!el) return;
            const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
            setter?.call(el, next);
            el.dispatchEvent(new Event("input", { bubbles: true }));
        }

        function runValidation(next: string) {
            if (!onValidate || error !== undefined || success !== undefined) return;
            const result = onValidate(next);
            const parsed =
                result === true
                    ? { invalid: false, message: undefined }
                    : result === false
                        ? { invalid: true, message: undefined }
                        : { invalid: true, message: result };

            setInternalValidation(parsed);
            field?.reportValidity(parsed.invalid ? parsed : null);
        }

        function handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
            let finalValue = draft;
            if (trimOnBlur) {
                const trimmed = draft.trim();
                if (trimmed !== draft) {
                    dispatchValue(trimmed);
                    setDraft(trimmed);
                    finalValue = trimmed;
                }
            }
            runValidation(finalValue);
            onBlurProp?.(e);
        }

        function handleClear() {
            dispatchValue("");
            setDraft("");
            internalRef.current?.focus();

            const validation = {};
            setInternalValidation(validation);
            field?.reportValidity(null);
            onClear?.();
        }

        useLayoutEffect(() => {
            if (!autoResize) return;
            const el = internalRef.current;
            if (!el) return;

            const computed = window.getComputedStyle(el);
            const lineHeight = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 1.2;
            const paddingY = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
            const borderY = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);

            const minHeight = minRows ? lineHeight * minRows + paddingY + borderY : undefined;
            const maxHeight = maxRows ? lineHeight * maxRows + paddingY + borderY : undefined;

            el.style.height = "auto";
            let next = el.scrollHeight;
            if (minHeight) next = Math.max(next, minHeight);
            if (maxHeight) next = Math.min(next, maxHeight);
            el.style.height = `${next}px`;
            el.style.overflowY = maxHeight && el.scrollHeight > maxHeight ? "auto" : "hidden";
        }, [autoResize, draft, minRows, maxRows]);

        const hasValue = draft.length > 0;
        const showClear = clearable && hasValue && !disabled;
        const showCounter = characterCounter;
        const nearLimit = maxLength ? draft.length >= maxLength * 0.9 : false;

        const state = isInvalid ? "error" : isSuccess ? "success" : "none";
        const messageId = field?.describedBy ? undefined : (isInvalid || isSuccess) ? `${id}-message` : undefined;

        return (
            <div className={cn(textareaWrapperVariants({ variant, state, fullWidth, disabled: !!disabled }), className)}>
                <textarea
                    ref={mergeRefs(internalRef, ref)}
                    id={id}
                    value={valueProp !== undefined ? draft : undefined}
                    defaultValue={valueProp === undefined ? defaultValue : undefined}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled}
                    maxLength={maxLength}
                    rows={autoResize ? undefined : rows ?? minRows}
                    aria-invalid={isInvalid || undefined}
                    aria-describedby={describedBy ?? messageId}
                    aria-required={props.required}
                    className={cn(
                        textareaBase,
                        textareaSizeVariants[size],
                        !autoResize && textareaResizeVariants[resize],
                        autoResize && "resize-none overflow-hidden",
                        (showClear || showCounter) && "pb-6", "text-text"
                    )}
                    data-size={size}
                    data-invalid={isInvalid || undefined}
                    data-success={isSuccess || undefined}
                    data-disabled={disabled || undefined}
                    data-autoresize={autoResize || undefined}
                    {...props}
                />

                {showClear && (
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label="Clear textarea"
                        onClick={handleClear}
                        className="absolute right-2 top-2 flex items-center justify-center text-text-muted transition-colors hover:text-text"
                    >
                        <ClearIcon size={14} />
                    </button>
                )}

                {showCounter && (
                    <div
                        className={cn(
                            "pointer-events-none absolute bottom-1.5 right-2.5 font-mono text-[11px]",
                            nearLimit ? "text-danger" : "text-text-muted"
                        )}
                    >
                        {draft.length}
                        {maxLength ? `/${maxLength}` : ""}
                    </div>
                )}

                {internalValidation.message && !field && (
                    <p id={messageId} className="mt-1.5 px-0.5 text-xs text-danger">
                        {internalValidation.message}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";