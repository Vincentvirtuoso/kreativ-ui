import { InputField } from "@/components";

export function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <InputField
      className="mb-2"
      onChange={(e) => onChange(e.target.value)}
      label={label}
      value={value}
      placeholder=""
      size="sm"
      clearable
      labelClassName="text-text-muted font-normal text-xs font-mono"
    />
  );
}
