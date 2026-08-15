import { useEffect } from "react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useFormField } from "./FormField.context";

export function FormFieldLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const field = useFormField();

  useEffect(() => {
    return field.registerLabel();
  }, [field]);

  return (
    <label
      id={field.labelId}
      htmlFor={field.id}
      className={cn("text-sm font-medium text-text", className)}
    >
      {children}
      {field.required && (
        <span aria-hidden className="ml-1 text-destructive">
          *
        </span>
      )}
    </label>
  );
}
