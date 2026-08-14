import type { ThemeOverride } from "@/types/theme";
import { deepMergeTheme } from "@/utils/theme"; 

interface Props {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

const PRESETS = {
  midnight: {
    dark: { colors: { surface: "rgb(17, 24, 39)", text: "rgb(255, 255, 255)", brand: "rgb(99, 102, 241)" } },
  },
  emerald: {
    light: { colors: { brand: "rgb(5, 150, 105)" } },
  },
} satisfies Record<string, Partial<ThemeOverride>>;

export function ThemePresetManager({ theme, onChange }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="font-mono text-xs uppercase text-text-muted">Presets</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(PRESETS).map(([name, preset]) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(deepMergeTheme(theme, preset))}
            className="rounded-md border border-border px-3 py-1.5 text-xs capitalize text-text transition-colors hover:border-brand hover:text-brand"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
