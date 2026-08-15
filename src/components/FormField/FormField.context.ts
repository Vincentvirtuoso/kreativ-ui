import { createContext, useContext } from "react";

export type FormFieldState = "none" | "error" | "success";

export interface FormFieldContextValue {
  id: string;
  labelId: string;
  descriptionId?: string;
  describedBy?: string;
  messageId?: string;

  state: FormFieldState;

  invalid: boolean;
  required: boolean;

  reportValidity: (
    result: { invalid: boolean; message?: string } | null,
  ) => void;
  registerLabel: () => () => void;
  hasExternalLabel: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null,
);

export function useFormField() {
  const context = useContext(FormFieldContext);

  if (!context) {
    throw new Error("FormField components must be used inside <FormField />");
  }

  return context;
}

export function useOptionalFormField() {
  return useContext(FormFieldContext);
}
