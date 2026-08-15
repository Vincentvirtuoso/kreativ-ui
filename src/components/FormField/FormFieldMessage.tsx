import { useFormField } from "./FormField.context";

export function FormFieldMessage({ children }: { children: React.ReactNode }) {
  const { messageId } = useFormField();

  return (
    <p
      id={messageId}
      role="alert"
      className="
        animate-kui-shake [animation-delay:500ms]
        text-sm text-destructive
      "
    >
      {children}
    </p>
  );
}