import { useMemo, useState } from "react";
import type { ThemeOverride } from "@/types/theme";

import { ColorEditor } from "./ColorEditor";
import { COLOR_GROUPS } from "./theme.constants";

import { resolveSemanticTokenReferences } from "@/provider/cssVariables";
import { extendTheme } from "@/theme";

interface TokenEditorProps {
  theme: ThemeOverride;
  onChange(theme: ThemeOverride): void;
}

export function TokenEditor({ theme, onChange }: TokenEditorProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set([COLOR_GROUPS[0].name]),
  );

  const resolvedTheme = useMemo(() => extendTheme(theme), [theme]);

  const resolvedSemanticTokens = resolveSemanticTokenReferences(
    resolvedTheme.tokens,
    resolvedTheme.semanticTokens,
  );

  function toggleGroup(name: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);

      next.has(name) ? next.delete(name) : next.add(name);

      return next;
    });
  }

  function update(mode: "light" | "dark", key: string, value: string) {
    const existing = theme.semanticTokens?.colors?.[key];
    const currentValue = existing?.value;

    const resolvedValue = resolvedSemanticTokens.colors?.[key]?.value;

    const currentLight =
      typeof currentValue === "object"
        ? currentValue.light
        : typeof resolvedValue === "object"
          ? resolvedValue.light
          : resolvedValue;

    const currentDark =
      typeof currentValue === "object"
        ? currentValue.dark
        : typeof resolvedValue === "object"
          ? resolvedValue.dark
          : resolvedValue;

    onChange({
      ...theme,

      semanticTokens: {
        ...theme.semanticTokens,

        colors: {
          ...theme.semanticTokens?.colors,

          [key]: {
            ...existing,

            value: {
              light:
                mode === "light"
                  ? value
                  : typeof currentLight === "string"
                    ? currentLight
                    : "",

              dark:
                mode === "dark"
                  ? value
                  : typeof currentDark === "string"
                    ? currentDark
                    : "",
            },
          },
        },
      },
    });
  }

  function resolve(mode: "light" | "dark", key: string): string {
    const token = resolvedSemanticTokens.colors?.[key];

    if (!token) {
      return "";
    }

    const value = token.value;

    if (typeof value === "object" && value !== null && mode in value) {
      const modeValue = value[mode];
      return typeof modeValue === "string" ? modeValue : "";
    }

    if (typeof value === "string") {
      return value;
    }

    return "";
  }

  return (
    <div className="space-y-2">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase text-text-muted">Colors</h3>

        <div className="flex gap-3 font-mono text-[10px] text-text-muted">
          <button
            type="button"
            onClick={() =>
              setOpenGroups(new Set(COLOR_GROUPS.map((group) => group.name)))
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

                {group.keys.map((token) => {
                  console.log(resolve("light", token));
                  return (
                    <div key={token}>
                      <p className="mb-1 font-mono text-[11px] text-text-muted">
                        {token}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <ColorEditor
                          label=""
                          value={resolve("light", token)}
                          onChange={(value) => update("light", token, value)}
                        />

                        <ColorEditor
                          label=""
                          value={resolve("dark", token)}
                          onChange={(value) => update("dark", token, value)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
