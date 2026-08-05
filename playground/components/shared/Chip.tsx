import { Button } from "@/components/Button/Button";
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
    <Button
      type="button"
      size='xs'
      variant={active ? 'outline-brand' : 'outline'}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded-full font-mono transition-colors",
      )}
    >
      {children}
    </Button>
  );
}
