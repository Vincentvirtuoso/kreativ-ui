import { useState } from "react";
import type { ThemeOverride } from "@/types/theme";
import { ColorEditor } from "./ColorEditor";
import { COLOR_GROUPS } from "./theme.constants";
import { defaultTheme } from "@/provider";
import { rgbToHex } from "@/utils";

interface TokenEditorProps {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

export function TokenEditor({ theme, onChange }: TokenEditorProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set([COLOR_GROUPS[0].name]),
  );


  function toggleGroup(name: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  function update(mode: "light" | "dark", key: string, value: string) {
    onChange({
      ...theme,
      [mode]: {
        ...theme[mode],
        colors: { ...theme[mode]?.colors, [key]: value },
      },
    });
  }

  function resolve(
    mode: "light" | "dark",
    key: keyof typeof defaultTheme.light.colors,
  ) {
     const value = theme[mode]?.colors?.[key] ?? defaultTheme[mode].colors[key];


     return rgbToHex(value);
  }

  return (
    <div className="space-y-2">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase text-text-muted">Colors</h3>
        <div className="flex gap-3 font-mono text-[10px] text-text-muted">
          <button
            type="button"
            onClick={() =>
              setOpenGroups(new Set(COLOR_GROUPS.map((g) => g.name)))
            }
            className="hover:text-text"
          >
            expand all
          </button>
          <button
            type="button"
            onClick={() => setOpenGroups(new Set())}
            className="hover:text-text"
          >
            collapse all
          </button>
        </div>
      </div>

      {COLOR_GROUPS.map((group) => {
        const isOpen = openGroups.has(group.name);
        return (
          <div key={group.name} className="rounded-md border border-border">
            <button
              type="button"
              onClick={() => toggleGroup(group.name)}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-text">{group.name}</span>
              <span className="font-mono text-xs text-text-muted">
                {group.keys.length}
              </span>
            </button>

            {isOpen && (
              <div className="space-y-3 border-t border-border p-3">
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] text-text-muted">
                  <span>light</span>
                  <span>dark</span>
                </div>
                {group.keys.map((token) => (
                  <div key={token}>
                    <p className="mb-1 font-mono text-[11px] text-text-muted">
                      {token}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <ColorEditor
                        label=""
                        value={resolve("light", token)}
                        onChange={(v) => update("light", token, v)}
                      />
                      <ColorEditor
                        label=""
                        value={resolve("dark", token)}
                        onChange={(v) => update("dark", token, v)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
