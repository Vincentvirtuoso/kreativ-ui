import type { ThemeOverride } from "@/types/theme";
import { TokenEditor } from "./ThemeControls/TokenEditor";
import { SizeEditor } from "./ThemeControls/SizeEditor";
import { ComponentOverrideEditor } from "./ThemeControls/ComponentOverrideEditor";
import { ThemePresetManager } from "./ThemeControls/ThemePresetManager";

interface Props {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

export function ThemeStudio({ theme, onChange }: Props) {
  return (
    <section className="mb-10 space-y-8 rounded-lg border border-border p-5">
      <header>
        <h2 className="font-medium">Theme Studio</h2>
        <p className="text-sm text-text-muted">Runtime theme overrides</p>
      </header>

      <ThemePresetManager theme={theme} onChange={onChange} />

      <div className="border-t border-border pt-6">
        <TokenEditor theme={theme} onChange={onChange} />
      </div>

      <div className="border-t border-border pt-6">
        <SizeEditor theme={theme} onChange={onChange} />
      </div>

      <div className="border-t border-border pt-6">
        <ComponentOverrideEditor theme={theme} onChange={onChange} />
        <p className="mt-2 text-xs text-text-muted">
          Raw class overrides — advanced usage, applied on top of everything
          above.
        </p>
      </div>
    </section>
  );
}