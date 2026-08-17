import { memo, useState } from "react";
import { RadioGroupPlayground as RadioDemo } from "./RadioGroupPlayground";
import { ComboboxDemo, MultiSelectDemo, SwitchDemo } from "./ControlsPlayground";
import { SelectDemo } from "./SelectPlayground";
import { TextareaPlayground } from "./TextareaPlayground";
import { InputDemo } from "./InputDemo";
import { CheckboxDemo } from "./CheckboxDemo";
import { ThemeTogglerPlayground as ThemeToggleDemo } from "./ThemeTogglerPlayground";
import { ButtonPlayground } from "./ButtonPlayground";
import { Chip } from "./shared/Chip";

const SECTIONS = [
    { key: "theme-toggle", label: "Theme Toggle", render: () => <ThemeToggleDemo /> },
    { key: "button", label: "Button", render: () => <ButtonPlayground /> },
    { key: "input", label: "Input", render: () => <InputDemo /> },
    { key: "textarea", label: "Textarea", render: () => <TextareaPlayground /> },
    { key: "select", label: "Select", render: () => <SelectDemo /> },
    { key: "checkbox", label: "Checkbox", render: () => <CheckboxDemo /> },
    { key: "radio", label: "Radio", render: () => <RadioDemo /> },
    { key: "switch", label: "Switch", render: () => <SwitchDemo /> },
    { key: "combobox", label: "Combobox", render: () => <ComboboxDemo /> },
    { key: "multiselect", label: "MultiSelect", render: () => <MultiSelectDemo /> },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export function ComponentsPlayground() {
    const [active, setActive] = useState<SectionKey>("theme-toggle");
    const activeSection = SECTIONS.find((s) => s.key === active)!;

    return (
        <div className="min-h-screen bg-surface p-5 space-y-8 text-text">
            <header className="mb-6">
                <p className="mb-1 font-mono text-xs text-brand">kui / playground</p>
                <h1 className="text-xl font-medium">Component Explorer</h1>
            </header>

            <nav className="mb-6 flex flex-wrap gap-1.5 border-b border-border pb-4">
                {SECTIONS.map((s) => (
                    <Chip
                        key={s.key}
                        active={active===s.key}
                        onClick={() => setActive(s.key)}
                    >
                        {s.label}
                    </Chip>
                ))}
            </nav>

            {activeSection.render()}
        </div>
    );
}

export default memo(ComponentsPlayground);