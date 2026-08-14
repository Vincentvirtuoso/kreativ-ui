import { Button } from "@/components/Button/Button";

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
      size="xs"
      variant="outline"
      color={active ? "brand" : "neutral"}
      disabled={disabled}
      onClick={onClick}
      className="rounded-full font-mono transition-colors"
    >
      {children}
    </Button>
  );
}
