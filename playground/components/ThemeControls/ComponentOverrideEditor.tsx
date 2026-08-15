import type { ThemeOverride } from "@/types/theme";

interface Props {
  theme: ThemeOverride;
  onChange: (theme: ThemeOverride) => void;
}

const OVERRIDABLE_COMPONENTS = ["Button", "Input", "Select"] as const;
type ComponentName = (typeof OVERRIDABLE_COMPONENTS)[number];

export function ComponentOverrideEditor({ theme, onChange }: Props) {
  const updateBase = (component: ComponentName, baseClasses: string) => {
    const currentRecipes = theme.recipes ?? {};

    const existingRecipe = currentRecipes[component] ?? {};
    const updatedRecipe = {
      ...existingRecipe,
      base: baseClasses || undefined, 
    };

    const newRecipes = {
      ...currentRecipes,
      [component]: updatedRecipe,
    };

    onChange({
      ...theme,
      recipes: newRecipes,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs uppercase text-text-muted">
        Component overrides
      </h3>

      {OVERRIDABLE_COMPONENTS.map((component) => {
        const recipe = theme.recipes?.[component];
        const base = recipe?.base ?? "";

        return (
          <div key={component}>
            <label
              htmlFor={`override-${component}`}
              className="mb-1 block font-mono text-[11px] text-text-muted"
            >
              {component} <span className="text-[10px]">(base classes)</span>
            </label>
            <textarea
              id={`override-${component}`}
              placeholder={`${component} base classes`}
              value={base}
              onChange={(e) => updateBase(component, e.target.value)}
              className="min-h-16 w-full rounded border border-border bg-transparent p-2 font-mono text-xs focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        );
      })}

      <p className="text-xs text-text-muted">
        These overrides will be merged with the default theme.
      </p>
    </div>
  );
}
