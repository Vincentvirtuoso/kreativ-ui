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
    <div className="mb-2">
      <label className="mb-1 block font-mono text-[11px] text-text-muted">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-(--kui-radii-sm) border border-border bg-bg px-2 py-1.5 text-sm text-text outline-none focus:border-brand"
      />
    </div>
  );
}
