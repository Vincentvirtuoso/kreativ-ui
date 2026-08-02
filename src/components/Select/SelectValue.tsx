import { cn } from "@/utils/cn";
import { useSelectContext } from "./Select.context";
import type { SelectValueProps } from "./Select.types";

export function SelectValue({ placeholder, className }: SelectValueProps) {
  const ctx = useSelectContext("SelectValue");

  const displayLabel = ctx.selectedLabel ?? placeholder ?? ctx.placeholder;

  if (import.meta.env.DEV && ctx.value !== undefined && ctx.items.size > 0) {
    const hasLabel = ctx.items.has(ctx.value);
    if (!hasLabel) {
      console.warn(
        `[kreativ-ui/Select] Value "${ctx.value}" is not present in the items map. ` +
        `If you're using controlled mode, ensure the parent updates the "value" prop.`
      );
    }
  }

  return (
    <span className={cn("truncate", className)}>
      {displayLabel}
    </span>
  );
}