import { useEffect, useState } from "react";
import type { SizeToken, ThemeOverride } from "@/types/theme";
import { cn } from "@/utils/cn";
import { SIZE_KEYS } from "./theme.constants";
import { Input, Select } from "../../../src";

interface SizeEditorProps {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

const KEYWORDS = ["auto", "min-content", "max-content", "fit-content"] as const;
const REAL_UNITS = [
  "px",
  "rem",
  "em",
  "%",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "ch",
  "ex",
  "cm",
  "mm",
  "in",
  "pt",
  "pc",
  "fr",
] as const;

const NUMERIC_RE = /^-?(\d+\.?\d*|\.\d+)$/;

function parseSizeValue(raw: string): {
  value: string;
  unit: string;
  isKeyword: boolean;
} {
  if (!raw) return { value: "", unit: "rem", isKeyword: false };
  if ((KEYWORDS as readonly string[]).includes(raw)) {
    return { value: "", unit: raw, isKeyword: true };
  }
  const match = raw.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  if (match)
    return { value: match[1], unit: match[2] || "rem", isKeyword: false };
  return { value: "", unit: "rem", isKeyword: false };
}

function SizeValueField({
  sizeName,
  keyName,
  raw,
  onCommitValue,
  onCommitUnit,
}: {
  sizeName: string;
  keyName: keyof SizeToken;
  raw: string;
  onCommitValue: (value: string) => void;
  onCommitUnit: (unit: string) => void;
}) {
  const parsed = parseSizeValue(raw);
  const [draft, setDraft] = useState(parsed.value);
  useEffect(() => setDraft(parsed.value), [parsed.value]);

  const isValid = draft.trim() === "" || NUMERIC_RE.test(draft.trim());
  const fieldId = `${sizeName}-${keyName}`;

  function commit() {
    if (isValid) onCommitValue(draft);
    else setDraft(parsed.value);
  }

  return (
    <div className="mb-2 flex items-center gap-2">
      <label
        htmlFor={fieldId}
        className="w-20 shrink-0 text-xs text-text-muted"
      >
        {keyName}
      </label>

      <input
        id={fieldId}
        type="text"
        inputMode="decimal"
        placeholder="0"
        value={draft}
        disabled={parsed.isKeyword}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={cn(
          "w-full flex-1 rounded border bg-transparent px-2 py-1 text-sm outline-none disabled:opacity-50",
          isValid
            ? "border-border focus:border-brand"
            : "border-destructive text-destructive",
        )}
      />

      <Select
        id={`${fieldId}-unit`}
        size="sm"
        value={parsed.unit}
        onValueChange={(u) => u && onCommitUnit(u)}
        className="w-24 shrink-0"
      >
        <Select.Trigger>{parsed.unit || "unit"}</Select.Trigger>
        <Select.Content>
          {REAL_UNITS.map((u) => (
            <Select.Item key={u} value={u}>
              {u}
            </Select.Item>
          ))}
          <div className="my-1 border-t border-border" aria-hidden="true" />
          {KEYWORDS.map((k) => (
            <Select.Item key={k} value={k}>
              {k}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
}

export function SizeEditor({ theme, onChange }: SizeEditorProps) {
  const sizes = theme.sizes ?? {};
  const [newName, setNewName] = useState("");

  function commitValue(
    sizeName: string,
    key: keyof SizeToken,
    rawValue: string,
    unit: string,
  ) {
    const nextToken = { ...sizes[sizeName] };
    const trimmed = rawValue.trim();
    if (trimmed === "") delete nextToken[key];
    else nextToken[key] = `${trimmed}${unit}`;
    onChange({ ...theme, sizes: { ...sizes, [sizeName]: nextToken } });
  }

  function commitUnit(
    sizeName: string,
    key: keyof SizeToken,
    currentValue: string,
    nextUnit: string,
  ) {
    const nextToken = { ...sizes[sizeName] };
    if ((KEYWORDS as readonly string[]).includes(nextUnit)) {
      nextToken[key] = nextUnit;
    } else if (currentValue.trim() === "") {
      delete nextToken[key];
    } else {
      nextToken[key] = `${currentValue}${nextUnit}`;
    }
    onChange({ ...theme, sizes: { ...sizes, [sizeName]: nextToken } });
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
          No override sizes defined yet — add one below.
        </p>
      )}

      {Object.entries(sizes).map(([name, size]) => (
        <div key={name} className="rounded-md border border-border p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-medium">{name}</p>
            <button
              type="button"
              onClick={() => removeSize(name)}
              className="font-mono text-xs text-text-muted hover:text-destructive"
            >
              remove
            </button>
          </div>

          {SIZE_KEYS.map((key) => (
            <SizeValueField
              key={key}
              sizeName={name}
              keyName={key}
              raw={size[key] ?? ""}
              onCommitValue={(v) =>
                commitValue(name, key, v, parseSizeValue(size[key] ?? "").unit)
              }
              onCommitUnit={(u) =>
                commitUnit(name, key, parseSizeValue(size[key] ?? "").value, u)
              }
            />
          ))}
        </div>
      ))}

      <div className="flex gap-2">
        <Input
          size="sm"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSize()}
          placeholder="New size name (e.g. xl)"
        />
        <button
          type="button"
          onClick={addSize}
          disabled={!newName.trim() || !!sizes[newName.trim()]}
          className="rounded border border-border px-3 py-1 text-sm text-text-muted transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
