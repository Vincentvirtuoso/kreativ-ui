import { useState } from "react";
import { User, Mail, Search, Lock, Eye, Loader2 } from "lucide-react";
import { Input, FormField } from "../../src";
import type {
  FormFieldStatus,
  InputKind,
  InputProps,
  InputSize,
  InputVariant,
} from "../../src";

import { Playground } from "./shared/Playground";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";
import { TextField } from "./shared/TextField";
import { getAttrs } from "./shared/getAttributes";

const VARIANTS: InputVariant[] = ["outline", "filled", "ghost"];
const SIZES: InputSize[] = ["xs", "sm", "md", "lg"];
const VALIDATIONS: FormFieldStatus[] = ["none", "error", "success", "warning"];
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

const ICON_OPTIONS = {
  none: null,
  User: <User size={16} />,
  Mail: <Mail size={16} />,
  Search: <Search size={16} />,
  Lock: <Lock size={16} />,
  Eye: <Eye size={16} />,
  Loader2: <Loader2 size={16} className="animate-spin" />,
};

export function InputDemo() {
  // Core props
  const [variant, setVariant] = useState<InputVariant>("outline");
  const [size, setSize] = useState<InputSize>("md");
  const [validation, setValidation] = useState<FormFieldStatus>("none");
  const [kind, setKind] = useState<InputKind>("email");

  // Flags
  const [required, setRequired] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rounded, setRounded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearable, setClearable] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [hideKindIcon, setHideKindIcon] = useState(false);

  // FormField integration
  const [useFormField, setUseFormField] = useState(true);
  const [label, setLabel] = useState("Email address");
  const [description, setDescription] = useState(
    "We'll only use this to send receipts.",
  );
  const [errorMessage, setErrorMessage] = useState(
    "Enter a valid email address.",
  );

  // Additional input props
  const [placeholder, setPlaceholder] = useState("your@email.com");
  const [value, setValue] = useState("");
  const [startIconKey, setStartIconKey] =
    useState<keyof typeof ICON_OPTIONS>("none");
  const [endIconKey, setEndIconKey] =
    useState<keyof typeof ICON_OPTIONS>("none");

  const invalid = validation === "error";
  const success = validation === "success";
  const warning = validation === "warning";

  const inputProps: InputProps = {
    variant,
    size,
    error: invalid,
    success,
    warning,
    disabled,
    rounded,
    isLoading,
    clearable,
    fullWidth,
    hideKindIcon,
    kind,
    placeholder,
    value,
    onChange: (e) => setValue(e.target.value),
    startIcon: ICON_OPTIONS[startIconKey],
    endIcon: ICON_OPTIONS[endIconKey],
  };

  const controls = (
    <>
      {/* Core configuration */}
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

      {/* Flags */}
      <div className="mb-5">
        <p className="mb-2 font-mono text-[11px] text-text-muted">flags</p>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={required} onClick={() => setRequired((v) => !v)}>
            required
          </Chip>
          <Chip active={disabled} onClick={() => setDisabled((v) => !v)}>
            disabled
          </Chip>
          <Chip active={rounded} onClick={() => setRounded((v) => !v)}>
            rounded
          </Chip>
          <Chip active={isLoading} onClick={() => setIsLoading((v) => !v)}>
            isLoading
          </Chip>
          <Chip active={clearable} onClick={() => setClearable((v) => !v)}>
            clearable
          </Chip>
          <Chip active={fullWidth} onClick={() => setFullWidth((v) => !v)}>
            fullWidth
          </Chip>
          <Chip
            active={hideKindIcon}
            onClick={() => setHideKindIcon((v) => !v)}
          >
            hideKindIcon
          </Chip>
          <Chip
            active={useFormField}
            onClick={() => setUseFormField((v) => !v)}
          >
            FormField
          </Chip>
        </div>
      </div>

      {/* Input‑specific props */}
      <div className="mb-5">
        <p className="mb-2 font-mono text-[11px] text-text-muted">
          input props
        </p>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="placeholder"
            value={placeholder}
            onChange={setPlaceholder}
          />
          <TextField
            label="value (controlled)"
            value={value}
            onChange={setValue}
          />
          <SegmentedControl
            label="startIcon"
            value={startIconKey}
            options={Object.keys(ICON_OPTIONS) as (keyof typeof ICON_OPTIONS)[]}
            onChange={setStartIconKey}
          />
          <SegmentedControl
            label="endIcon"
            value={endIconKey}
            options={Object.keys(ICON_OPTIONS) as (keyof typeof ICON_OPTIONS)[]}
            onChange={setEndIconKey}
          />
        </div>
      </div>

      {/* FormField copy */}
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
    <FormField
      required={required}
      message={invalid ? errorMessage : undefined}
      status={validation}
    >
      <FormField.Label>{label}</FormField.Label>
      <FormField.Control>
        <Input {...inputProps} />
      </FormField.Control>
      <FormField.Description>{description}</FormField.Description>
    </FormField>
  ) : (
    <Input {...inputProps} />
  );

  // Build attribute lines for code preview
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
    !fullWidth && "fullWidth={false}",
    hideKindIcon && "hideKindIcon",
    placeholder && `placeholder="${placeholder}"`,
    value && `value="${value}"`,
    startIconKey !== "none" && `startIcon={<${startIconKey} />}`,
    endIconKey !== "none" && `endIcon={<${endIconKey} />}`,
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
        description &&
          `  <FormField.Description>\n    ${description}\n  </FormField.Description>`,
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
      attributeSelector="input"
      getAttributes={(el) => getAttrs(el, ["aria-required", "aria-busy"])}
    />
  );
}
