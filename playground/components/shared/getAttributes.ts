export function getAttrs(el: HTMLElement | null, extra: string[] = []) {
    const target = (el?.querySelector("input, textarea, [role='combobox']") as HTMLElement) ?? el;
    const base = {
        id: target?.getAttribute("id") ?? null,
        "aria-invalid": target?.getAttribute("aria-invalid") ?? null,
        "aria-describedby": target?.getAttribute("aria-describedby") ?? null,
        disabled: (target as HTMLInputElement)?.disabled ? "true" : null,
    };
    const extras = Object.fromEntries(extra.map((k) => [k, target?.getAttribute(k) ?? null]));
    return { ...base, ...extras };
}