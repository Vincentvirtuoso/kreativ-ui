import { useState } from "react";
import { Input, FormField } from "../../src";
import type { InputKind, InputSize, InputVariant } from "../../src";

import { Playground } from "./shared/Playground";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";
import { TextField } from "./shared/TextField";
import { getAttrs } from "./shared/getAttributes";

type Validation = "none" | "error" | "success";

const VARIANTS: InputVariant[] = ["outline", "filled", "ghost"];

const SIZES: InputSize[] = ["sm", "md", "lg"];

const VALIDATIONS: Validation[] = ["none", "error", "success"];

const KINDS: InputKind[] = [
  "text",
  "email",
  "tel",
  "url",
  "search",
  "numeric",
  "password-current",
  "password-new",
];

export function InputDemo() {
  const [variant, setVariant] = useState<InputVariant>("outline");
  const [size, setSize] = useState<InputSize>("md");
  const [validation, setValidation] = useState<Validation>("none");
  const [kind, setKind] = useState<InputKind>("email");

  const [required, setRequired] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearable, setClearable] = useState(false);
  const [useFormField, setUseFormField] = useState(true);

  const [label, setLabel] = useState("Email address");

  const [description, setDescription] = useState(
    "We'll only use this to send receipts.",
  );

  const [errorMessage, setErrorMessage] = useState(
    "Enter a valid email address.",
  );

  const invalid = validation === "error";
  const success = validation === "success";

  const inputProps = {
    variant,
    size,
    error: invalid,
    success,
    disabled,
    rounded,
    isLoading,
    clearable,
    kind,
  } as const;

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
        label="state"
        value={validation}
        options={VALIDATIONS}
        onChange={setValidation}
      />

      <SegmentedControl
        label="kind"
        value={kind}
        options={KINDS}
        onChange={setKind}
      />

      <div className="mb-5">
        <p className="mb-2 font-mono text-[11px] text-text-muted">flags</p>

        <div className="flex flex-wrap gap-1.5">
          <Chip
            active={required}
            onClick={() => setRequired((value) => !value)}
          >
            required
          </Chip>

          <Chip
            active={disabled}
            onClick={() => setDisabled((value) => !value)}
          >
            disabled
          </Chip>

          <Chip active={rounded} onClick={() => setRounded((value) => !value)}>
            rounded
          </Chip>

          <Chip
            active={isLoading}
            onClick={() => setIsLoading((value) => !value)}
          >
            isLoading
          </Chip>

          <Chip
            active={clearable}
            onClick={() => setClearable((value) => !value)}
          >
            clearable
          </Chip>

          <Chip
            active={useFormField}
            onClick={() => setUseFormField((value) => !value)}
          >
            FormField
          </Chip>
        </div>
      </div>

      {useFormField && (
        <div>
          <p className="mb-2 font-mono text-[11px] text-text-muted">
            FormField copy
          </p>

          <TextField label="label" value={label} onChange={setLabel} />

          <TextField
            label="description"
            value={description}
            onChange={setDescription}
          />

          <TextField
            label="error"
            value={errorMessage}
            onChange={setErrorMessage}
          />
        </div>
      )}
    </>
  );

  const preview = useFormField ? (
    <FormField required={required} error={invalid ? errorMessage : undefined}>
      <FormField.Label>{label}</FormField.Label>

      <FormField.Control>
        <Input {...inputProps} />
      </FormField.Control>

      <FormField.Description>{description}</FormField.Description>
    </FormField>
  ) : (
    <Input {...inputProps} />
  );

  const attrLines = [
    variant !== "outline" && `variant="${variant}"`,
    size !== "md" && `size="${size}"`,
    kind !== "text" && `kind="${kind}"`,
    invalid && "error",
    success && "success",
    disabled && "disabled",
    rounded && "rounded",
    isLoading && "isLoading",
    clearable && "clearable",
  ].filter(Boolean) as string[];

  const code = useFormField
    ? [
        `<FormField${required ? " required" : ""}${
          invalid ? ` error="${errorMessage}"` : ""
        }>`,
        `  <FormField.Label>${label}</FormField.Label>`,
        `  <FormField.Control>`,
        `    <Input${
          attrLines.length
            ? "\n      " + attrLines.join("\n      ") + "\n    "
            : " "
        }/>`,
        `  </FormField.Control>`,
        description
          ? `  <FormField.Description>\n    ${description}\n  </FormField.Description>`
          : "",
        `</FormField>`,
      ]
        .filter(Boolean)
        .join("\n")
    : `<Input${
        attrLines.length ? "\n  " + attrLines.join("\n  ") + "\n" : " "
      }/>`;

  return (
    <Playground
      title="Input & FormField"
      description="Live props against the real components — the readout reflects actual DOM attributes, not a simulation."
      controls={controls}
      preview={preview}
      code={code}
      getAttributes={(el) => getAttrs(el, ["aria-required", "aria-busy"])}
    />
  );
}
