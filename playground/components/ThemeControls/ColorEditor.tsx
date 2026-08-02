import { useEffect, useState } from "react";
import { rgbStringToHex, hexToRgbString } from "@/utils/color";

interface ColorEditorProps {
  label: string;
  value: string;
  onChange(value: string): void;
}

export function ColorEditor({ label, value, onChange }: ColorEditorProps) {
  const hexFromValue = rgbStringToHex(value) ?? "#000000";
  const [draft, setDraft] = useState(hexFromValue);
  useEffect(() => setDraft(hexFromValue), [hexFromValue]);

  const isValidDraft = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(draft);

  function commit(hex: string) {
    const rgb = hexToRgbString(hex);
    if (rgb) onChange(rgb);
    else setDraft(hexFromValue); // revert bad manual entry rather than propagate garbage
  }

  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-border p-2">
      <span className="font-mono text-xs text-text-muted">{label}</span>

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(e) => e.key === "Enter" && commit(draft)}
          spellCheck={false}
          className={
            "w-20 rounded border bg-transparent px-1.5 py-0.5 font-mono text-xs outline-none " +
            (isValidDraft
              ? "border-border focus:border-brand"
              : "border-danger text-danger")
          }
        />
        <input
          type="color"
          value={isValidDraft ? draft : hexFromValue}
          onChange={(e) => {
            setDraft(e.target.value);
            commit(e.target.value);
          }}
          aria-label={`${label} color picker`}
          className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
        />
      </div>
    </label>
  );
}
