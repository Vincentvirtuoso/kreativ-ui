import { useState } from "react";
import { Textarea } from "@/components/Textarea";
import { InputSize, InputVariant } from "@/components/Input/Input.types";
import { TextareaResize } from "@/components/Textarea/Textarea.types";
import { FormField } from "@/components/FormField";
import { Playground } from "./shared/Playground";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";
import { Input } from "@/components";

const SIZES: InputSize[] = ["sm", "md", "lg"];
const VARIANTS: InputVariant[] = ["outline", "filled", "ghost"];
const RESIZE_OPTIONS: TextareaResize[] = [
  "none",
  "both",
  "horizontal",
  "vertical",
];

export function TextareaPlayground() {
  const [value, setValue] = useState("");
  const [size, setSize] = useState<InputSize>("md");
  const [variant, setVariant] = useState<InputVariant>("outline");
  const [resize, setResize] = useState<TextareaResize>("vertical");
  const [fullWidth, setFullWidth] = useState(true);
  const [autoResize, setAutoResize] = useState(false);
  const [minRows, setMinRows] = useState<number | undefined>(undefined);
  const [maxRows, setMaxRows] = useState<number | undefined>(undefined);
  const [clearable, setClearable] = useState(false);
  const [characterCounter, setCharacterCounter] = useState(false);
  const [trimOnBlur, setTrimOnBlur] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [useFormField, setUseFormField] = useState(true);
  const [placeholder, setPlaceholder] = useState("Write a message...");
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [enableValidation, setEnableValidation] = useState(false);

  const validationRule = enableValidation
    ? (v: string) => {
        if (typeof v !== "string") return "Value must be a string";
        return v.length >= 3 || "Must be at least 3 characters";
      }
    : undefined;

  const textareaElement = (
    <Textarea
      value={value}
      onValueChange={setValue}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      //   resize={resize}
      autoResize={autoResize}
      minRows={minRows}
      maxRows={maxRows}
      clearable={clearable}
      characterCounter={characterCounter}
      trimOnBlur={trimOnBlur}
      error={error}
      success={success}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      maxLength={maxLength}
      onValidate={validationRule}
      allowMarkdown
    />
  );

  const preview = useFormField ? (
    <FormField
      required={required}
      error={error ? "This field has an error" : undefined}
    >
      <FormField.Label>Message</FormField.Label>
      <FormField.Control>{textareaElement}</FormField.Control>
    </FormField>
  ) : (
    textareaElement
  );

  // Controls
  const controls = (
    <>
      <SegmentedControl
        label="variant"
        value={variant}
        options={VARIANTS}
        onChange={setVariant}
      />
      <SegmentedControl
        label="size"
        value={size}
        options={SIZES}
        onChange={setSize}
      />
      <SegmentedControl
        label="resize"
        value={resize}
        options={RESIZE_OPTIONS}
        onChange={setResize}
      />

      <div className="mb-4 space-y-2">
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">
            placeholder
          </label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="w-full rounded border border-border bg-bg px-2 py-1.5 text-sm outline-none focus:border-brand"
          />
        </div>
        <div className="flex gap-2">
          <FormField className="flex-1">
            <FormField.Label className="block text-xs font-mono text-text-muted">
              minRows
            </FormField.Label>
            <FormField.Control>
              <Input
                size="sm"
                kind="number"
                placeholder="2"
                hideKindIcon
                value={minRows ?? ""}
                onChange={(e) =>
                  setMinRows(
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
              />
            </FormField.Control>
          </FormField>

          <FormField className="flex-1">
            <FormField.Label className="block text-xs font-mono text-text-muted">
              maxRows
            </FormField.Label>
            <FormField.Control>
              <Input
                size="sm"
                kind="number"
                placeholder="10"
                hideKindIcon
                value={maxRows ?? ""}
                onChange={(e) =>
                  setMaxRows(
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
              />
            </FormField.Control>
          </FormField>
        </div>
        <div>
          <FormField className="flex-1">
            <FormField.Label className="block text-xs font-mono text-text-muted">
              maxLength
            </FormField.Label>
            <FormField.Control>
              <Input
                size="sm"
                kind="number"
                placeholder="500"
                hideKindIcon
                value={maxLength ?? ""}
                onChange={(e) =>
                  setMaxLength(
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
              />
            </FormField.Control>
          </FormField>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Chip active={fullWidth} onClick={() => setFullWidth((v) => !v)}>
          fullWidth
        </Chip>
        <Chip active={autoResize} onClick={() => setAutoResize((v) => !v)}>
          autoResize
        </Chip>
        <Chip active={clearable} onClick={() => setClearable((v) => !v)}>
          clearable
        </Chip>
        <Chip
          active={characterCounter}
          onClick={() => setCharacterCounter((v) => !v)}
        >
          characterCounter
        </Chip>
        <Chip active={trimOnBlur} onClick={() => setTrimOnBlur((v) => !v)}>
          trimOnBlur
        </Chip>
        <Chip active={error} onClick={() => setError((v) => !v)}>
          error
        </Chip>
        <Chip active={success} onClick={() => setSuccess((v) => !v)}>
          success
        </Chip>
        <Chip active={disabled} onClick={() => setDisabled((v) => !v)}>
          disabled
        </Chip>
        <Chip active={required} onClick={() => setRequired((v) => !v)}>
          required
        </Chip>
        <Chip
          active={enableValidation}
          onClick={() => setEnableValidation((v) => !v)}
        >
          validation
        </Chip>
        <Chip active={useFormField} onClick={() => setUseFormField((v) => !v)}>
          FormField
        </Chip>
      </div>
    </>
  );

  // Generate code
  const propsList = [
    value && `value="${value}"`,
    `onValueChange={setValue}`,
    size !== "md" && `size="${size}"`,
    resize !== "vertical" && `resize="${resize}"`,
    !fullWidth && `fullWidth={false}`,
    autoResize && `autoResize`,
    minRows && `minRows={${minRows}}`,
    maxRows && `maxRows={${maxRows}}`,
    clearable && `clearable`,
    characterCounter && `characterCounter`,
    trimOnBlur && `trimOnBlur`,
    error && `error`,
    success && `success`,
    disabled && `disabled`,
    required && `required`,
    placeholder !== "Write a message..." && `placeholder="${placeholder}"`,
    maxLength && `maxLength={${maxLength}}`,
    validationRule && `onValidate={...}`,
  ]
    .filter(Boolean)
    .join("\n   ");

  const textareaJsx = `<Textarea${propsList ? `\n   ${propsList}` + "\n" : ""} />`;

  const formFieldJsx = `<FormField${required ? `\n  required` : ""}${
    error ? `\n  error="This field has an error"` : ""
  }\n>
  <FormField.Label>Message</FormField.Label>
  <FormField.Control>
    ${"\n  " + textareaJsx}
  </FormField.Control>
</FormField>`;

  const code = useFormField ? formFieldJsx : textareaJsx;

  const getAttributes = (el: HTMLElement | null) => {
    const textarea = el?.querySelector("textarea");
    return {
      id: textarea?.getAttribute("id") ?? null,
      "aria-invalid": textarea?.getAttribute("aria-invalid") ?? null,
      "aria-describedby": textarea?.getAttribute("aria-describedby") ?? null,
      "aria-required": textarea?.getAttribute("aria-required") ?? null,
      disabled: textarea?.disabled ? "true" : null,
      rows: textarea?.getAttribute("rows") ?? null,
      "data-autoresize": textarea?.getAttribute("data-autoresize") ?? null,
    };
  };

  return (
    <Playground
      title="Textarea"
      description="Flexible textarea with auto-resize, validation, counters, and FormField integration."
      controls={controls}
      preview={preview}
      code={code}
      getAttributes={getAttributes}
    />
  );
}
