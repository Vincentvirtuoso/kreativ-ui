import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type Ref,
} from "react";

import { cn } from "@/utils/cn";
import { resolveRecipe } from "@/theme";
import { useSizeStyle } from "@/hooks";

import { useTheme } from "@/hooks";
import { inputKindIcons, Spinner, Eye, EyeOff, ClearIcon } from "./Input.icons";
import { inputKindDefaults } from "./Input.constants";
import type { InputProps } from "./Input.types";
import { useStateTransition } from "@/hooks/useStateTransition";
import { useOptionalFormField } from "../FormField/FormField.context";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.RefObject<T | null>).current = node;
      }
    });
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,

      variant = "outline",
      size = "md",

      error,
      success,

      startIcon,
      endIcon,

      fullWidth = true,
      disabled,

      rounded = false,

      isLoading = false,

      clearable = false,
      onClear,

      kind = "text",
      hideKindIcon = false,

      id: externalId,

      type: typeProp,
      inputMode: inputModeProp,
      autoComplete: autoCompleteProp,
      placeholder: placeholderProp,

      onChange: onChangeProp,
      readOnly: readOnlyProp,

      value,
      defaultValue,

      style,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const { theme } = useTheme();
    const field = useOptionalFormField();

    const id = externalId ?? field?.id ?? autoId;
    const isInvalid = error || field?.invalid || false;
    const describedBy = field?.describedBy ?? undefined;
    const isRequired = field?.required ?? props.required;
    const internalRef = useRef<HTMLInputElement>(null);

    const { style: sizeStyle, iconSize } = useSizeStyle(size, false, "input");

    const [hasValue, setHasValue] = useState(() =>
      Boolean(value ?? defaultValue ?? ""),
    );

    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (value !== undefined) {
        setHasValue(Boolean(value));
      }
    }, [value]);

    const kindDefaults = inputKindDefaults[kind];

    const resolvedType = typeProp ?? kindDefaults.type;
    const isPasswordField = resolvedType === "password";

    const effectiveType = isPasswordField
      ? visible
        ? "text"
        : "password"
      : resolvedType;

    const KindIcon = inputKindIcons[kind];

    const defaultStartIcon =
      !hideKindIcon && KindIcon ? (
        <KindIcon size={Number(iconSize) || 15} />
      ) : undefined;

    const startSlot =
      startIcon || defaultStartIcon ? (
        <span className="flex shrink-0 items-center justify-center">
          {startIcon ?? defaultStartIcon}
        </span>
      ) : null;

    const builtInEnd: React.ReactNode[] = [];

    if (isPasswordField) {
      builtInEnd.push(
        <button
          key="toggle-visibility"
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="flex items-center justify-center text-text-muted transition-colors hover:text-text"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>,
      );
    }

    if (clearable && hasValue && !disabled) {
      builtInEnd.push(
        <button
          key="clear"
          type="button"
          tabIndex={-1}
          onClick={handleClear}
          aria-label="Clear input"
          className="flex items-center justify-center text-text-muted transition-colors hover:text-text"
        >
          <ClearIcon size={14} />
        </button>,
      );
    }

    const endSlot = isLoading ? (
      <Spinner size={Number(iconSize) || 14} />
    ) : endIcon ? (
      endIcon
    ) : builtInEnd.length ? (
      <div className="flex shrink-0 items-center gap-1.5">{builtInEnd}</div>
    ) : null;

    const hasIcon = Boolean(startSlot || endSlot);

    const state = error ? "error" : success ? "success" : "none";
    const stateTransition = useStateTransition(state);

    console.log({
      state,
      stateTransition,
    });

    const wrapperClasses = cn(
      resolveRecipe(theme.recipes.FormControl, {
        variant,
        state,
        rounded,
        fullWidth,
        disabled: Boolean(disabled || isLoading),
        hasIcon,
      }),
      className,
    );

    const inputClasses = cn(
      resolveRecipe(theme.recipes.Input, {
        variant,
      }),
      inputClassName,
    );

    const resolvedStyle = {
      ...sizeStyle,
      ...style,
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setHasValue(Boolean(event.target.value));
      onChangeProp?.(event);
    }

    function handleClear() {
      const element = internalRef.current;

      if (!element) return;

      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )?.set;

      setter?.call(element, "");

      element.dispatchEvent(
        new Event("input", {
          bubbles: true,
        }),
      );

      element.focus();

      setHasValue(false);
      onClear?.();
    }

    useEffect(() => {
      if (!error) return;

      const element = internalRef.current;

      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, [error]);

    return (
      <div
        key={stateTransition ?? "idle"}
        className={wrapperClasses}
        style={resolvedStyle}
        data-state={state}
        data-state-transition={stateTransition}
      >
        {startSlot}

        <input
          {...props}
          ref={mergeRefs(internalRef, ref)}
          id={id}
          type={effectiveType}
          inputMode={
            (inputModeProp ??
              kindDefaults.inputMode) as React.HTMLAttributes<HTMLInputElement>["inputMode"]
          }
          autoComplete={autoCompleteProp ?? kindDefaults.autoComplete}
          placeholder={placeholderProp ?? kindDefaults.placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          readOnly={isLoading || readOnlyProp}
          disabled={isLoading || disabled}
          aria-busy={isLoading || undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          aria-required={isRequired || undefined}
          className={inputClasses}
          data-variant={variant}
          data-size={size}
          data-success={success || undefined}
          data-disabled={disabled || undefined}
          data-loading={isLoading || undefined}
        />

        {endSlot}
      </div>
    );
  },
);

Input.displayName = "Input";
