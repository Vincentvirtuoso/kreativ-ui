import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { SelectContext } from "./Select.context";
import type { SelectProps } from "./Select.types";
import { SelectTrigger } from "./SelectTrigger";
import { SelectContent } from "./SelectContent";
import { SelectItem } from "./SelectItem";
import { SelectValue } from "./SelectValue";
import { SelectGroup } from "./SelectGroup";
import { SelectLabel } from "./SelectLabel";
import { useOptionalFormField } from "../FormField/FormField.context";

export function Select({
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  required,
  name,
  variant = "outline",
  size = "md",
  className,
  placeholder,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  clearable = false,
  error,
  success,
  tabIndex,
  rounded,
  children,
}: SelectProps) {
  const autoId = useId();
  const field = useOptionalFormField();
  const triggerId = field?.id ?? autoId;
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentId = `${triggerId}-listbox`;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = valueProp !== undefined ? valueProp : internalValue;

  const isInvalid = error || field?.invalid || false;
  const isSuccess = success && !isInvalid ? true : false;
  const describedBy = field?.describedBy ?? ariaDescribedBy;
  const isRequired = field?.required ?? required;

  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string | undefined>(value);
  const [selectedLabel, setSelectedLabel] = useState<React.ReactNode | undefined>(() => {
  const initial = valueProp ?? defaultValue;
  if (initial) {
    return undefined;
  }
  return undefined;
});

  const itemsRef = useRef<Map<string, { label: React.ReactNode; disabled?: boolean }>>(
    new Map()
  );
  const [items, setItems] = useState<Map<string, { label: React.ReactNode; disabled?: boolean }>>(
    new Map()
  );

  const registerItem = useCallback(
    (val: string, meta: { label: React.ReactNode; disabled?: boolean }) => {
      itemsRef.current.set(val, meta);
      setItems(new Map(itemsRef.current));
      return () => {
        itemsRef.current.delete(val);
        setItems(new Map(itemsRef.current));
      };
    },
    []
  );

  const handleValueChange = useCallback(
  (val: string) => {
        const label = itemsRef.current.get(val)?.label ?? val;
        setSelectedLabel(label); 
        if (valueProp === undefined) {
        setInternalValue(val);
        }
        onValueChange?.(val);
        setOpen(false);
    },
    [valueProp, onValueChange]
    );

  const handleClear = useCallback(() => {
    if (valueProp === undefined) setInternalValue(undefined);
    onValueChange?.(undefined);
    setActiveValue(undefined);
  }, [valueProp, onValueChange]);

  const optionId = useCallback(
    (val: string) => `${contentId}-option-${val}`,
    [contentId]
  );

  useEffect(() => {
    if (open) setActiveValue(value);
  }, [open, value]);

  useEffect(() => {
    if (value !== undefined) {
        const label = itemsRef.current.get(value)?.label;
        if (label !== undefined) setSelectedLabel(label);
    }
    }, [value, items]);

  // Close on outside click
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const ctxValue = useMemo(
    () => ({
      value,
      selectedLabel,
      onValueChange: handleValueChange,
      disabled,
      variant,
      size,
      open,
      setOpen,
      triggerId,
      contentId,
      isInvalid,
      isSuccess,
      describedBy,
      required: isRequired,
      activeValue,
      setActiveValue,
      items,
      registerItem,
      optionId,
      placeholder,
      clearable,
      onClear: handleClear,
      triggerRef,
      rounded,
    }),
    [
      value,
      items,
      selectedLabel,
      handleValueChange,
      disabled,
      variant,
      size,
      open,
      triggerId,
      contentId,
      isInvalid,
      isSuccess,
      describedBy,
      isRequired,
      activeValue,
      registerItem,
      optionId,
      placeholder,
      clearable,
      handleClear,
      triggerRef,
      rounded,
    ]
  );

  return (
    <SelectContext.Provider value={ctxValue}>
      <div
        ref={rootRef}
        className={className ?? "relative inline-block w-full"}
        tabIndex={tabIndex}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      >
        {children}
        {name && (
          <input
            type="hidden"
            name={name}
            value={value ?? ""}
            disabled={disabled}
            required={isRequired}
          />
        )}
      </div>
    </SelectContext.Provider>
  );
}

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Value = SelectValue;
Select.Group = SelectGroup;
Select.Label = SelectLabel;