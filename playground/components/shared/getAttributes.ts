export function getAttrs(
  el: HTMLElement | null,
  extra: string[] = [],
  exclude: string[] = [],
  extraAttrs?: Record<string, string | null>,
) {
  const target =
    (el?.querySelector("input, textarea, [role='combobox']") as HTMLElement) ??
    el;

  const base: Record<string, string | null> = {
    id: target?.getAttribute("id") ?? null,
    "aria-invalid": target?.getAttribute("aria-invalid") ?? null,
    "aria-describedby": target?.getAttribute("aria-describedby") ?? null,
    disabled: (target as HTMLInputElement)?.disabled ? "true" : null,
  };

  const extras = Object.fromEntries(
    extra.map((k) => [k, target?.getAttribute(k) ?? null]),
  );

  const result = { ...base, ...extras, ...extraAttrs };

  const excludeSet = new Set(exclude);
  return Object.fromEntries(
    Object.entries(result).filter(([key]) => !excludeSet.has(key)),
  );
}
