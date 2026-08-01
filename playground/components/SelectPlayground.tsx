import { useState } from "react";

import { FormField } from "@/components/FormField";
import { Select } from "@/components/Select";

import type {
    InputSize,
    InputVariant,
} from "@/components/Input/Input.types";

import { Playground } from "./shared/Playground";
import { Chip } from "./shared/Chip";
import { SegmentedControl } from "./shared/SegmentedControl";

const SIZES: InputSize[] = ["sm", "md", "lg"];
const VARIANTS: InputVariant[] = ["outline", "filled", "ghost"];

const OPTIONS = [
    {
        label: "Frontend",
        items: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
        ],
    },
    {
        label: "Backend",
        items: [
            { label: "Node.js", value: "node" },
            { label: "Django", value: "django" },
        ],
    },
];

export function SelectPlayground() {
    const [value, setValue] = useState("");

    const [size, setSize] =
        useState<InputSize>("md");

    const [variant, setVariant] =
        useState<InputVariant>("outline");

    const [disabled, setDisabled] =
        useState(false);

    const [required, setRequired] =
        useState(false);

    const [error, setError] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [clearable, setClearable] =
        useState(false);

    const [useFormField, setUseFormField] =
        useState(true);

    const [placeholder, setPlaceholder] =
        useState("Select framework");

    const renderSelect = () => (
        <Select
            value={value}
            onValueChange={(val)=>setValue(val??"")}
            disabled={disabled}
            size={size}
            variant={variant}
            clearable={clearable}
            error={error}
            success={success}
        >
            <Select.Trigger>
                <Select.Value
                    placeholder={placeholder}
                />
            </Select.Trigger>

            <Select.Content>
                {OPTIONS.map((group) => (
                    <Select.Group key={group.label}>
                        <Select.Label>
                            {group.label}
                        </Select.Label>

                        {group.items.map((item) => (
                            <Select.Item
                                key={item.value}
                                value={item.value}
                            >
                                {item.label}
                            </Select.Item>
                        ))}
                    </Select.Group>
                ))}
            </Select.Content>
        </Select>
    );

    const preview = useFormField ? (
        <FormField
            required={required}
            error={
                error
                    ? "Please select an option."
                    : undefined
            }
        >
            <FormField.Label>
                Framework
            </FormField.Label>

            <FormField.Control>
                {renderSelect()}
            </FormField.Control>

            {!error && (
                <FormField.Description>
                    Pick your preferred framework.
                </FormField.Description>
            )}

            {/* {error && (
                <FormField.Message />
            )} */}
        </FormField>
    ) : (
        renderSelect()
    );

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

            <div className="mb-5">
                <p className="mb-2 font-mono text-[11px] text-text-muted">
                    placeholder
                </p>

                <input
                    value={placeholder}
                    onChange={(e) =>
                        setPlaceholder(
                            e.target.value
                        )
                    }
                    className="w-full rounded-[var(--kui-radius)] border border-border bg-bg px-2 py-1.5 text-sm text-text outline-none focus:border-brand"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <Chip
                    active={disabled}
                    onClick={() =>
                        setDisabled((v) => !v)
                    }
                >
                    disabled
                </Chip>

                <Chip
                    active={required}
                    onClick={() =>
                        setRequired((v) => !v)
                    }
                >
                    required
                </Chip>

                <Chip
                    active={error}
                    onClick={() =>
                        setError((v) => !v)
                    }
                >
                    error
                </Chip>
                <Chip
                    active={success}
                    onClick={() =>
                        setSuccess((v) => !v)
                    }
                >
                    success
                </Chip>
                <Chip
                    active={clearable}
                    onClick={() =>
                        setClearable((v) => !v)
                    }
                >
                    clearable
                </Chip>

                <Chip
                    active={useFormField}
                    onClick={() =>
                        setUseFormField((v) => !v)
                    }
                >
                    FormField
                </Chip>
            </div>
        </>
    );

    const selectProps = [
        value && `value="${value}"`,
        disabled && "disabled",
        size !== "md" &&
        `size="${size}"`,
        variant !== "outline" &&
        `variant="${variant}"`,
        clearable && "clearable",
    ]
        .filter(Boolean)
        .join("\n  ");

    const groupsCode = OPTIONS.map(
        (group) => `
<Select.Group>
  <Select.Label>
    ${group.label}
  </Select.Label>

${group.items
                .map(
                    (item) => `  <Select.Item value="${item.value}">
    ${item.label}
  </Select.Item>`
                )
                .join("\n")}

</Select.Group>`
    ).join("\n");

    const selectJsx = `<Select${selectProps
            ? `\n  ${selectProps}`
            : ""
        }>
  <Select.Trigger>
    <Select.Value placeholder="${placeholder}" />
  </Select.Trigger>

  <Select.Content>
${groupsCode}
  </Select.Content>
</Select>`;

    const code = useFormField
        ? `<FormField${required
            ? "\n  required"
            : ""
        }${error
            ? '\n  error="Please select an option."'
            : ""
        }>
  <FormField.Label>
    Framework
  </FormField.Label>

  <FormField.Control>
${selectJsx
            .split("\n")
            .map((line) => `    ${line}`)
            .join("\n")}
  </FormField.Control>

${!error
            ? `  <FormField.Description>
    Pick your preferred framework.
  </FormField.Description>`
            : `  <FormField.Message />`
        }

</FormField>`
        : selectJsx;

    const getAttributes = (
        el: HTMLElement | null
    ) => {
        const trigger =
            el?.querySelector(
                "[data-select-trigger]"
            ) as HTMLButtonElement | null;

        return {
            id:
                trigger?.id ??
                null,

            role:
                trigger?.getAttribute(
                    "role"
                ) ?? null,

            "aria-expanded":
                trigger?.getAttribute(
                    "aria-expanded"
                ) ?? null,

            "aria-invalid":
                trigger?.getAttribute(
                    "aria-invalid"
                ) ?? null,

            "aria-describedby":
                trigger?.getAttribute(
                    "aria-describedby"
                ) ?? null,

            disabled:
                trigger?.disabled
                    ? "true"
                    : null,
        };
    };

    return (
        <Playground
            title="Select"
            description="Interactive compound Select component with FormField integration."
            controls={controls}
            preview={preview}
            code={code}
            getAttributes={getAttributes}
        />
    );
}