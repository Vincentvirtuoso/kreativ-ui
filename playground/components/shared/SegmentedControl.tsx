import { cn } from "@/utils";

export function SegmentedControl<T extends string>({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value: T;
    options: T[];
    onChange: (v: T) => void;
}) {
    return (
        <div className="mb-5">
            <p className="mb-2 font-mono text-[11px] text-text-muted">{label}</p>
            <div className="flex gap-1 rounded-[var(--kui-radius)] border border-border bg-surface p-[3px] overflow-x-auto">
                {options.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onChange(opt)}
                        className={cn(
                            "flex-shrink-0 rounded-[calc(var(--kui-radius)-3px)] px-2 py-1.5 font-mono text-xs transition-colors whitespace-nowrap",
                            value === opt
                                ? "bg-brand/15 text-brand"
                                : "text-text-muted hover:text-text"
                        )}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}