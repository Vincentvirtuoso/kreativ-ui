import { useState } from "react";
import { getAttrs } from "./shared/getAttributes";
import { Select } from "@/components/Select";
import type {
    InputSize,
    InputVariant,
} from "@/components/Input/Input.types";
import { Playground } from "./shared/Playground";
import { Chip } from "./shared/Chip";
import { TextField } from "./shared/TextField";
import { SegmentedControl } from "./shared/SegmentedControl";

const SIZES: InputSize[] = ["sm", "md", "lg"];
const VARIANTS: InputVariant[] = ["outline", "filled", "ghost"];
const COUNTRIES = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
];

export function SelectDemo() {
    const [variant, setVariant] = useState<InputVariant>("outline");
    const [size, setSize] = useState<InputSize>("md");
    const [disabled, setDisabled] = useState(false);
    const [clearable, setClearable] = useState(true);
    const [rounded, setRounded] = useState(false);
    const [value, setValue] = useState<string | undefined>("us");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [placeholder, setPlaceholder] = useState("Select a country");

    const controls = (
        <>
            <SegmentedControl label="variant" value={variant} options={VARIANTS} onChange={setVariant} />
            <SegmentedControl label="size" value={size} options={SIZES} onChange={setSize} />
            <div className="mb-5">
                <p className="mb-2 font-mono text-[11px] text-text-muted">flags</p>
                <div className="flex flex-wrap gap-1.5">
                    <Chip active={disabled} onClick={() => setDisabled(v => !v)}>disabled</Chip>
                    <Chip active={error} onClick={() => setError(v => !v)}>error</Chip>
                    <Chip active={success} onClick={() => setSuccess(v => !v)}>success</Chip>
                    <Chip active={clearable} onClick={() => setClearable(v => !v)}>clearable</Chip>
                    <Chip active={rounded} onClick={() => setRounded(v => !v)}>rounded</Chip>
                </div>
            </div>
            <TextField label="label" value={placeholder} onChange={setPlaceholder} />
        </>
    );

    const preview = (
        <Select value={value} onValueChange={setValue} variant={variant} size={size} disabled={disabled} error={error} success={success} clearable={clearable} rounded={rounded} placeholder={placeholder}>
            <Select.Trigger>
                <Select.Value />
            </Select.Trigger>
            <Select.Content>
                {COUNTRIES.map((c) => (
                    <Select.Item key={c.value} value={c.value}>{c.label}</Select.Item>
                ))}
            </Select.Content>
        </Select>
    );

    const attrLines = [
        variant !== "outline" && `variant="${variant}"`,
        size !== "md" && `size="${size}"`,
        disabled && "disabled",
        error && "error",
        success && "success",
        clearable && "clearable",
        rounded && "rounded",
        placeholder !== "Select a country" && `placeholder="${placeholder}"`,
    ].filter(Boolean) as string[];

    const code = [
        `<Select \n ${" "}value={value} \n ${" "}onValueChange={setValue}${attrLines.length ? "\n  " + attrLines.join("\n  ") : ""}>`,
        `  <Select.Trigger><Select.Value /></Select.Trigger>`,
        `  <Select.Content>`,
        `    {countries.map(c => <Select.Item key={c.value} value={c.value}>{c.label}</Select.Item>)}`,
        `  </Select.Content>`,
        `</Select>`,
    ].join("\n");

    return (
        <Playground
            title="Select"
            description="Compound trigger/content/item — flips above the trigger automatically when there's more room there than below."
            controls={controls}
            preview={preview}
            code={code}
            getAttributes={(el) => getAttrs(el, ["aria-expanded", "data-side"])}
        />
    );
}
