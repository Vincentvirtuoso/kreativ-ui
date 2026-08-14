import type { ThemeOverride } from "@/types/theme";

interface Props {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

const OVERRIDABLE_COMPONENTS = ["Button", "Input", "Select"] as const;

export function ComponentOverrideEditor({ theme, onChange }: Props) {
  function update(component: string, value: string) {
    onChange({
      ...theme,
      components: { ...theme.components, [component]: { base: value } },
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs uppercase text-text-muted">
        Component overrides
      </h3>

      {OVERRIDABLE_COMPONENTS.map((component) => {
        const override = theme.components?.[component];
        const base =
          typeof override === "object" && override && "base" in override
            ? (override as { base?: string }).base
            : "";
        return (
          <div key={component}>
            <label className="mb-1 block font-mono text-[11px] text-text-muted">
              {component}
            </label>
            <textarea
              placeholder={`${component} base classes`}
              value={base ?? ""}
              onChange={(e) => update(component, e.target.value)}
              className="min-h-16 w-full rounded border border-border bg-transparent p-2 font-mono text-xs"
            />
          </div>
        );
      })}
    </div>
  );
}
