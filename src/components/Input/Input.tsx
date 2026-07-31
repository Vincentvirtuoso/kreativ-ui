import { forwardRef, useEffect, useId, useRef, useState, type Ref } from "react";
import { cn } from "@/utils/cn";
import { inputBase, inputWrapperVariants, inputSizeVariants,  } from "./Input.styles";
import { inputKindIcons, Spinner, Eye, EyeOff, ClearIcon } from "./Input.icons";
import type { InputProps } from "./Input.types";
import { inputKindDefaults } from "./Input.constants";

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(node);
      else (r as React.MutableRefObject<T | null>).current = node;
    });
  };
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      variant = "outline",
      inputSize = "md",
      error,
      success,
      startAdornment,
      endAdornment,
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
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const internalRef = useRef<HTMLInputElement>(null);

    const [hasValue, setHasValue] = useState(() => Boolean(value ?? defaultValue ?? ""));
    useEffect(() => {
      if (value !== undefined) setHasValue(Boolean(value));
    }, [value]);

    const kindDefaults = inputKindDefaults[kind];
    const resolvedType = typeProp ?? kindDefaults.type;
    const isPasswordField = resolvedType === "password";

    const [visible, setVisible] = useState(false);
    const effectiveType = isPasswordField ? (visible ? "text" : "password") : resolvedType;

    const KindIcon = inputKindIcons[kind];
    const defaultStartIcon = !hideKindIcon && KindIcon ? <KindIcon size={16} /> : undefined;
    const startSlot = startAdornment ?? defaultStartIcon;

    const builtInEnd: React.ReactNode[] = [];
    if (isPasswordField) {
      builtInEnd.push(
        <button
          key="toggle-visibility"
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="flex items-center justify-center text-text-muted transition-colors hover:text-text"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
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
        </button>
      );
    }

    // Precedence for the end slot: loading > explicit endAdornment >
    // built-ins (password toggle, clear — these can coexist together).
    const endSlot = isLoading ? (
      <Spinner />
    ) : endAdornment ? (
      endAdornment
    ) : builtInEnd.length ? (
      <div className="flex items-center gap-1.5">{builtInEnd}</div>
    ) : undefined;

    const hasIcon = !!startSlot || !!endSlot;
    const state = error ? "error" : success ? "success" : "none";

    const wrapperClasses = cn(
      inputWrapperVariants({ variant, state, rounded, fullWidth, hasIcon, disabled: !!disabled }),
      className
    );

    const inputClasses = cn(
      inputBase,
      "border-0 bg-transparent outline-none",
      inputSizeVariants[inputSize],
      fullWidth && "w-full",
      inputClassName
    );

    const ariaInvalid = error ? true : undefined;
    const messageId = (error || success) ? `${id}-message` : undefined;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setHasValue(Boolean(e.target.value));
      onChangeProp?.(e);
    }

    function handleClear() {
      const el = internalRef.current;
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      setter?.call(el, "");
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.focus();
      setHasValue(false);
      onClear?.();
    }

    return (
      <div className={wrapperClasses}>
        {startSlot}

        <input
          ref={mergeRefs(internalRef, ref)}
          id={id}
          type={effectiveType}
          inputMode={(inputModeProp ?? kindDefaults.inputMode) as React.HTMLAttributes<HTMLInputElement>["inputMode"]}
          autoComplete={autoCompleteProp ?? kindDefaults.autoComplete}
          placeholder={placeholderProp ?? kindDefaults.placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          readOnly={isLoading || readOnlyProp}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-describedby={messageId}
          aria-required={props.required}
          aria-busy={isLoading || undefined}
          className={inputClasses}
          data-variant={variant}
          data-size={inputSize}
          data-invalid={ariaInvalid}
          data-success={success || undefined}
          data-disabled={disabled || undefined}
          data-loading={isLoading || undefined}
          {...props}
        />

        {endSlot}
      </div>
    );
  }
);

Input.displayName = "Input";