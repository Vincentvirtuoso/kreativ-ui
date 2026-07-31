import { useState } from "react";
import { Input } from "@/components/Input/Input";
import { FormField } from "@/components/FormField/FormField";
import type { InputKind, InputVariant } from "@/components/Input/Input.types";
import { MailIcon, SearchIcon } from "lucide-react";
import { Playground } from "./shared/Playground";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";

type Size = "sm" | "md" | "lg";
type Validation = "none" | "error" | "success";

const VARIANTS: InputVariant[] = ["outline", "filled", "ghost"];
const SIZES: Size[] = ["sm", "md", "lg"];
const VALIDATIONS: Validation[] = ["none", "error", "success"];
const KINDS: InputKind[] = ["text", "email", "tel", "url", "search", "numeric","password-current", "password-new", "number", "date", "time", "datetime-local", "month", "week"];

export function FormPlayground() {
    const [variant, setVariant] = useState<InputVariant>("outline");
    const [size, setSize] = useState<Size>("md");
    const [validation, setValidation] = useState<Validation>("none");
    const [kind, setKind] = useState<InputKind>("email");
    const [required, setRequired] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [rounded, setRounded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [clearable, setClearable] = useState(false);
    const [startAdornment, setStartAdornment] = useState(false);
    const [endAdornment, setEndAdornment] = useState(false);
    const [useFormField, setUseFormField] = useState(true);
    const [label, setLabel] = useState("Email address");
    const [description, setDescription] = useState("We'll only use this to send receipts.");
    const [errorMessage, setErrorMessage] = useState("Enter a valid email address.");

    const invalid = validation === "error";
    const success = validation === "success";

    const endAdornmentDisabled = isLoading;

    const inputEl = (
        <Input
            key={`${clearable}-${kind}`} 
            variant={variant}
            inputSize={size}
            error={invalid}
            success={success}
            disabled={disabled}
            rounded={rounded}
            isLoading={isLoading}
            clearable={clearable}
            kind={kind}
            startAdornment={startAdornment ? <SearchIcon /> : undefined}
            endAdornment={endAdornment && !endAdornmentDisabled ? <MailIcon /> : undefined}
        />
    );

    const controls = (
        <>
            <SegmentedControl label="variant" value={variant} options={VARIANTS} onChange={setVariant} />
            <SegmentedControl label="inputSize" value={size} options={SIZES} onChange={setSize} />
            <SegmentedControl label="state" value={validation} options={VALIDATIONS} onChange={setValidation} />
            <SegmentedControl label="kind" value={kind} options={KINDS} onChange={setKind} />

            <div className="mb-5">
                <p className="mb-2 font-mono text-[11px] text-text-muted">flags</p>
                <div className="flex flex-wrap gap-1.5">
                    <Chip active={required} onClick={() => setRequired(v => !v)}>required</Chip>
                    <Chip active={disabled} onClick={() => setDisabled(v => !v)}>disabled</Chip>
                    <Chip active={rounded} onClick={() => setRounded(v => !v)}>rounded</Chip>
                    <Chip active={isLoading} onClick={() => setIsLoading(v => !v)}>isLoading</Chip>
                    <Chip active={clearable} onClick={() => setClearable(v => !v)}>clearable</Chip>
                    <Chip active={startAdornment} onClick={() => setStartAdornment(v => !v)}>startAdornment</Chip>
                    <Chip
                        active={endAdornment}
                        onClick={() => setEndAdornment(v => !v)}
                        disabled={endAdornmentDisabled}
                    >
                        endAdornment
                    </Chip>
                    <Chip active={useFormField} onClick={() => setUseFormField(v => !v)}>FormField</Chip>
                </div>
                {endAdornmentDisabled && (
                    <p className="mt-1.5 font-mono text-[10px] text-text-muted">
                        isLoading takes the end slot over endAdornment
                    </p>
                )}
            </div>

            {clearable && (
                <p className="mb-5 font-mono text-[10px] text-text-muted">
                    type in the preview to see the clear button appear
                </p>
            )}

            {useFormField && (
                <div>
                    <p className="mb-2 font-mono text-[11px] text-text-muted">FormField copy</p>
                    <div className="mb-2">
                        <label className="mb-1 block font-mono text-[11px] text-text-muted">label</label>
                        <input
                            value={label}
                            onChange={e => setLabel(e.target.value)}
                            className="w-full rounded-[var(--kui-radius)] border border-border bg-bg px-2 py-1.5 text-sm text-text outline-none focus:border-brand"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mb-1 block font-mono text-[11px] text-text-muted">description</label>
                        <input
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full rounded-[var(--kui-radius)] border border-border bg-bg px-2 py-1.5 text-sm text-text outline-none focus:border-brand"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block font-mono text-[11px] text-text-muted">error</label>
                        <input
                            value={errorMessage}
                            onChange={e => setErrorMessage(e.target.value)}
                            className="w-full rounded-[var(--kui-radius)] border border-border bg-bg px-2 py-1.5 text-sm text-text outline-none focus:border-brand"
                        />
                    </div>
                </div>
            )}
        </>
    );

    const preview = useFormField ? (
        <FormField
            label={label}
            required={required}
            error={invalid ? errorMessage : undefined}
            description={!invalid ? description : undefined}
        >
            {inputEl}
        </FormField>
    ) : (
        inputEl
    );

    const attrLines = [
        variant !== "outline" && `variant="${variant}"`,
        size !== "md" && `inputSize="${size}"`,
        kind !== "text" && `kind="${kind}"`,
        invalid && "error",
        success && "success",
        disabled && "disabled",
        rounded && "rounded",
        isLoading && "isLoading",
        clearable && "clearable",
        startAdornment && "startAdornment={<SearchIcon />}",
        endAdornment && !endAdornmentDisabled && "endAdornment={<MailIcon />}",
    ].filter(Boolean) as string[];

    const code = useFormField
        ? [
            `<FormField`,
            `  label="${label}"`,
            required && `  required`,
            invalid ? `  error="${errorMessage}"` : description && `  description="${description}"`,
            `>`,
            `  <Input${attrLines.length ? "\n    " + attrLines.join("\n    ") + "\n  " : " "}/>`,
            `</FormField>`,
        ]
            .filter(Boolean)
            .join("\n")
        : [`<Input${attrLines.length ? "\n  " + attrLines.join("\n  ") + "\n" : " "}/>`].join("\n");

    const getAttributes = (el: HTMLElement | null) => ({
        id: el?.getAttribute("id") ?? null,
        "aria-invalid": el?.getAttribute("aria-invalid") ?? null,
        "aria-describedby": el?.getAttribute("aria-describedby") ?? null,
        "aria-required": el?.getAttribute("aria-required") ?? null,
        "aria-busy": el?.getAttribute("aria-busy") ?? null,
        disabled: (el as HTMLInputElement)?.disabled ? "true" : null,
        readOnly: (el as HTMLInputElement)?.readOnly ? "true" : null,
    });

    return (
        <Playground
            title="Input & FormField"
            description="Live props against the real components — the readout at the bottom reflects the actual DOM attributes they produced, not a simulation."
            controls={controls}
            preview={preview}
            code={code}
            getAttributes={getAttributes}
        />
    );
}