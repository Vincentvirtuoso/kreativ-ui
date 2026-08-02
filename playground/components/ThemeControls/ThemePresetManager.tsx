import type { ThemeOverride } from "@/types/theme";
import { deepMergeTheme } from "@/utils/theme"; 

interface Props {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

const PRESETS = {
  midnight: {
    dark: { colors: { surface: "#111827", text: "#ffffff", brand: "#6366f1" } },
  },
  emerald: {
    light: { colors: { brand: "#059669" } },
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
