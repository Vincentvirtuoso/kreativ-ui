"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/utils";
import { resolveRecipe } from "@/theme/recipes/resolveRecipe";
import {
  useClearableField,
  useKeyboardShortcuts,
  useSizeStyle,
  useStatusTransition,
  useTheme,
  useTypography,
} from "@/hooks";

import { ClearIcon, Eye, EyeOff, inputKindIcons, Spinner } from "./Input.icons";

import { inputKindDefaults } from "./Input.constants";
import type { InputProps } from "./Input.types";
import { useOptionalFormField } from "../FormField/FormField.context";
import { mergeRefs } from "@/utils/mergeRef";
import { useButtonGroupContext } from "../ButtonGroup/ButtonGroup.context";
import { Adornment } from "../Adornment";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,

      variant = "outline",
      size = "md",

      error,
      success,
      warning,

      startIcon,
      endIcon,

      fullWidth = true,
      disabled = false,
      rounded = false,

      isLoading = false,

      clearable = false,
      onClear,
      undoable = false,
      onUndo,
      onRedo,

      kind = "text",
      hideKindIcon = false,

      id: externalId,

      trim = false,

      type: typeProp,
      inputMode: inputModeProp,
      autoComplete: autoCompleteProp,
      placeholder: placeholderProp,

      onChange: onChangeProp,
      onValueChange: onValueChangeProp,
      onBlur: onBlurProp,

      value,
      defaultValue,

      style,
      typography: typographyName = "body",

      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const internalRef = useRef<HTMLInputElement>(null);
    const shortcutRef = useKeyboardShortcuts(
      undoable ?? false,
      {
        "ctrl+z": () => {
          const current = internalRef.current?.value ?? "";
          onUndo?.(current);
        },
        "ctrl+shift+z": () => {
          const current = internalRef.current?.value ?? "";
          onRedo?.(current);
        },
      },
      [onUndo, onRedo],
    );

    const { theme } = useTheme();
    const field = useOptionalFormField();
    const group = useButtonGroupContext();
    const typography = useTypography(typographyName);

    const id = externalId ?? field?.id ?? autoId;

    const isRequired = field?.required ?? props.required;
    const isInButtonGroup = !!group;

    const describedBy = field?.describedBy;

    const state = error
      ? "error"
      : success
        ? "success"
        : warning
          ? "warning"
          : (field?.status ?? "none");

    const isInvalid = state === "error";

    const statusTransition = useStatusTransition(state);

    const { style: sizeStyle, iconSize } = useSizeStyle(size, false, "input");

    const [visible, setVisible] = useState(false);

    const { hasValue, setHasValue, clear } = useClearableField(
      internalRef,
      value ?? defaultValue,
      onClear,
    );

    useEffect(() => {
      if (value !== undefined) {
        setHasValue(Boolean(value));
      }
    }, [value, setHasValue]);

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
      !hideKindIcon && KindIcon ? <KindIcon /> : undefined;

    const startAdornment = startIcon ?? defaultStartIcon;

    const builtInEnd: ReactNode[] = [];

    if (isPasswordField) {
      builtInEnd.push(
        <button
          key="toggle-visibility"
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="
            flex items-center justify-center
            text-text-muted
            transition-colors
            hover:text-text
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
          "
        >
          {visible ? (
            <EyeOff
              style={{
                width: iconSize,
                height: iconSize,
              }}
            />
          ) : (
            <Eye
              style={{
                width: iconSize,
                height: iconSize,
              }}
            />
          )}
        </button>,
      );
    }

    if (clearable && hasValue && !disabled) {
      builtInEnd.push(
        <button
          key="clear"
          type="button"
          onClick={clear}
          aria-label="Clear input"
          className="
            flex items-center justify-center
            text-text-muted
            transition-colors
            hover:text-text
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
          "
        >
          <ClearIcon
            style={{
              width: iconSize,
              height: iconSize,
            }}
          />
        </button>,
      );
    }

    const endAdornment = isLoading ? (
      <Adornment position="end">
        <Spinner size={iconSize || 14} />
      </Adornment>
    ) : endIcon || builtInEnd.length > 0 ? (
      <Adornment position="end">
        {endIcon && (
          <span
            className="flex shrink-0 items-center justify-center"
            style={{
              width: iconSize,
              height: iconSize,
            }}
            aria-hidden="true"
          >
            {endIcon}
          </span>
        )}

        {builtInEnd}
      </Adornment>
    ) : null;

    const hasAdornment = Boolean(startAdornment) || Boolean(endAdornment);

    const wrapperClasses = cn(
      resolveRecipe(theme.recipes.FormControl, {
        variant,
        state,
        rounded,
        fullWidth,
        disabled: disabled || isLoading,
        hasAdornment,
        attached: group?.attached,
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
      ...typography,
      ...sizeStyle,
      ...style,
    };
    const groupDataAttributes = {
      "data-kui-button-group-item": isInButtonGroup || undefined,
      "data-kui-group-attached": group?.attached || undefined,
      "data-kui-group-orientation": group?.orientation || undefined,
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setHasValue(Boolean(event.target.value));
      onChangeProp?.(event);
      onValueChangeProp?.(event.target.value);
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      if (trim && !disabled && !isLoading) {
        const trimmedValue = event.currentTarget.value.trim();
        if (trimmedValue !== event.currentTarget.value) {
          event.currentTarget.value = trimmedValue;

          setHasValue(Boolean(trimmedValue));
          onValueChangeProp?.(trimmedValue);
        }
      }

      onBlurProp?.(event);
    }

    const wasInvalidRef = useRef(isInvalid);

    useEffect(() => {
      const justBecameInvalid = isInvalid && !wasInvalidRef.current;

      wasInvalidRef.current = isInvalid;

      if (!justBecameInvalid) {
        return;
      }

      internalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, [isInvalid]);

    return (
      <div
        className={wrapperClasses}
        style={resolvedStyle}
        data-state={state}
        data-state-transition={statusTransition}
        {...groupDataAttributes}
      >
        {startAdornment && (
          <Adornment position="start">
            <span
              className="flex shrink-0 items-center justify-center"
              style={{
                width: iconSize,
                height: iconSize,
              }}
            >
              {startAdornment}
            </span>
          </Adornment>
        )}
        <input
          {...props}
          ref={mergeRefs(internalRef, ref, shortcutRef)}
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
          onBlur={handleBlur}
          disabled={disabled || isLoading}
          aria-busy={isLoading || undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          aria-required={isRequired || undefined}
          className={inputClasses}
          data-disabled={disabled || undefined}
          data-loading={isLoading || undefined}
          data-size={size}
          data-state={state}
          data-variant={variant}
        />

        {endAdornment}
      </div>
    );
  },
);

Input.displayName = "Input";
