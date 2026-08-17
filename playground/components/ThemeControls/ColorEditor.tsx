import { useEffect, useState } from "react";

import { hexToRgbString, rgbToHex } from "@/utils/color";

interface ColorEditorProps {
  label: string;
  value: string;
  onChange(value: string): void;
}

export function ColorEditor({ label, value, onChange }: ColorEditorProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(rgbToHex(value));
  }, [value]);

  const isValidDraft = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(draft);

  function commit(hex: string) {
    const rgb = hexToRgbString(hex);

    if (rgb) {
      onChange(rgb);
    } else {
      console.warn("[ColorEditor] Invalid color:", hex);
      setDraft(rgbToHex(value));
    }
  }

  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-border p-2">
      <span className="font-mono text-xs text-text-muted">{label}</span>

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit(draft);
            }
          }}
          spellCheck={false}
          className={
            "w-20 rounded border bg-transparent px-1.5 py-0.5 " +
            "font-mono text-xs text-text-muted outline-none " +
            (isValidDraft
              ? "border-border focus:border-brand"
              : "border-destructive text-destructive")
          }
        />

        <input
          type="color"
          value={isValidDraft ? draft : rgbToHex(value)}
          onChange={(event) => {
            const hex = event.target.value;

            setDraft(hex);
            commit(hex);
          }}
          aria-label={`${label || "Color"} color picker`}
          className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
        />
      </div>
    </label>
  );
}
