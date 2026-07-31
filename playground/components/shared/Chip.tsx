import { cn } from "@/utils/cn";

export function Chip({
    active,
    onClick,
    children,
    disabled,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                active
                    ? "border-brand bg-brand/15 text-brand"
                    : disabled
                        ? "border-border bg-surface text-text-muted cursor-not-allowed"
                        : "border-border bg-surface text-text-muted hover:border-border/80 hover:text-text"
            )}
        >
            {children}
        </button>
    );
}