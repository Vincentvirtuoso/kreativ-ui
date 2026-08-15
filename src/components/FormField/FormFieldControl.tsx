import { cloneElement, type ReactElement } from "react";

import { useFormField } from "./FormField.context";

type FormFieldControlProps<T = Record<string, unknown>> = {
  children: ReactElement<T>;
};

export function FormFieldControl<T = Record<string, unknown>>({
  children,
}: FormFieldControlProps<T>) {
  const { id, invalid, describedBy, required } = useFormField();

  return cloneElement(children, {
    id,
    required,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
    "aria-required": required || undefined,
  } as unknown as Partial<T>);
}
