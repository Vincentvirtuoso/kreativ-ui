import { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import { InputSize } from "@/components/Input/Input.types";
import { FormField } from "@/components/FormField";
import { Playground } from "./shared/Playground";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";

type State = "none" | "error" | "success";

const SIZES: InputSize[] = ["sm", "md", "lg"];
const STATES: State[] = ["none", "error", "success"];

export function CheckboxPlayground() {
    const [checked, setChecked] = useState(false);
    const [size, setSize] = useState<InputSize>("md");
    const [state, setState] = useState<State>("none");
    const [disabled, setDisabled] = useState(false);
    const [required, setRequired] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [useFormField, setUseFormField] = useState(true);
    const [label, setLabel] = useState("Accept terms and conditions");
    const [description, setDescription] = useState("You must agree to continue.");

    const error = state === "error";
    const success = state === "success";

    const checkboxElement = (
        <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            size={size}
            error={error}
            success={success}
            disabled={disabled}
            required={required}
            indeterminate={indeterminate}
            label={label}
            description={description}
        />
    );

    const preview = useFormField ? (
        <FormField error={error ? "This field is required" : undefined} required={required}>
            {checkboxElement}
        </FormField>
    ) : (
        checkboxElement
    );

    const controls = (
        <>
            <SegmentedControl label="size" value={size} options={SIZES} onChange={setSize} />
            <SegmentedControl label="state" value={state} options={STATES} onChange={setState} />

            <div className="mb-4 space-y-2">
                <div>
                    <label className="block text-xs font-mono text-text-muted mb-1">label</label>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="w-full rounded border border-border bg-bg px-2 py-1.5 text-sm outline-none focus:border-brand"
                    />
                </div>
                <div>
                    <label className="block text-xs font-mono text-text-muted mb-1">description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded border border-border bg-bg px-2 py-1.5 text-sm outline-none focus:border-brand"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
                <Chip active={disabled} onClick={() => setDisabled((v) => !v)}>disabled</Chip>
                <Chip active={required} onClick={() => setRequired((v) => !v)}>required</Chip>
                <Chip active={indeterminate} onClick={() => setIndeterminate((v) => !v)}>indeterminate</Chip>
                <Chip active={useFormField} onClick={() => setUseFormField((v) => !v)}>FormField</Chip>
            </div>
        </>
    );

    const propsList = [
        `checked={${checked}}`,
        `onCheckedChange={setChecked}`,
        size !== "md" && `size="${size}"`,
        error && `error`,
        success && `success`,
        disabled && `disabled`,
        required && `required`,
        indeterminate && `indeterminate`,
        label && `label="${label}"`,
        description && `description="${description}"`,
    ]
        .filter(Boolean)
        .join("\n  ");

    const checkboxJsx = `<Checkbox${propsList ? `\n  ${propsList}` : ""} />`;

    const formFieldJsx = `<FormField${error ? `\n  error="This field is required"` : ""}${required ? `\n  required` : ""
        }>
  ${checkboxJsx}
</FormField>`;

    const code = useFormField ? formFieldJsx : checkboxJsx;

    const getAttributes = (el: HTMLElement | null) => {
        const input = el?.querySelector("input[type='checkbox']");
        return {
            id: input?.getAttribute("id") ?? null,
            "aria-invalid": input?.getAttribute("aria-invalid") ?? null,
            "aria-describedby": input?.getAttribute("aria-describedby") ?? null,
            "aria-required": input?.getAttribute("aria-required") ?? null,
            checked: input?.getAttribute("checked") ?? null,
            disabled: input?.getAttribute("disabled") ?? null,
        };
    };

    return (
        <Playground
            title="Checkbox"
            description="A customizable checkbox with label, description, validation states, and FormField integration."
            controls={controls}
            preview={preview}
            code={code}
            getAttributes={getAttributes}
        />
    );
}