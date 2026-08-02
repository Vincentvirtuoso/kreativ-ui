import { useState } from "react";
import type { ThemeOverride } from "@/types/theme";
import { SIZE_KEYS } from "./theme.constants";

interface SizeEditorProps {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

function parseSizeValue(str: string): { value: string; unit: string } {
  const match = str.match(/^([\d.]+)(.*)$/);
  if (match) {
    return { value: match[1], unit: match[2] || "rem" };
  }
  return { value: str, unit: "rem" };
}

const UNITS = ["px", "rem", "em", "%", "vw", "vh", "vmin", "vmax", "ch", "ex"];

export function SizeEditor({ theme, onChange }: SizeEditorProps) {
  const sizes = theme.sizes ?? {};
  const [newName, setNewName] = useState("");

  function update(size: string, key: string, value: string, unit: string) {
    const combined = value.trim() === "" ? "" : `${value}${unit}`;
    onChange({
      ...theme,
      sizes: {
        ...sizes,
        [size]: { ...sizes[size], [key]: combined },
      },
    });
  }

  function addSize() {
    const name = newName.trim();
    if (!name || sizes[name]) return;
    onChange({ ...theme, sizes: { ...sizes, [name]: {} } });
    setNewName("");
  }

  function removeSize(name: string) {
    const { [name]: _, ...rest } = sizes;
    onChange({ ...theme, sizes: rest });
  }

  return (
    <div className="space-y-4">
      <h3 className="font-mono text-xs uppercase text-text-muted">Sizes</h3>

      {Object.keys(sizes).length === 0 && (
        <p className="text-sm text-text-muted">
          No sizes defined yet — add one below.
        </p>
      )}

      {Object.entries(sizes).map(([name, size]) => (
        <div key={name} className="rounded-md border border-border p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-medium">{name}</p>
            <button
              type="button"
              onClick={() => removeSize(name)}
              className="font-mono text-xs text-text-muted hover:text-danger"
            >
              remove
            </button>
          </div>
          {SIZE_KEYS.map((key) => {
            const raw = size[key] ?? "";
            const { value, unit } = parseSizeValue(raw);
            return (
              <div key={key} className="mb-2 flex items-center gap-2">
                <span className="w-20 text-xs text-text-muted">{key}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={value}
                  onChange={(e) => update(name, key, e.target.value, unit)}
                  className="flex-1 rounded border border-border bg-transparent px-2 py-1 text-sm"
                />
                <select
                  value={unit}
                  onChange={(e) => update(name, key, value, e.target.value)}
                  className="w-16 rounded border border-border bg-transparent px-1 py-1 text-sm"
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      ))}

      <div className="flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSize()}
          placeholder="New size name (e.g. xl)"
          className="flex-1 rounded border border-border bg-transparent px-2 py-1 text-sm"
        />
        <button
          type="button"
          onClick={addSize}
          className="rounded border border-border px-3 py-1 text-sm text-text-muted hover:border-brand hover:text-brand"
        >
          Add
        </button>
      </div>
    </div>
  );
}
