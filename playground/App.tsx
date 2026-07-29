import { useState } from "react";
import type { ReactNode } from "react";
import { UIProvider, Button, ThemeToggler, useSizeStyle, ThemeOverride } from "../src";


function IntensityControls({
  intensity,
  onIntensityChange,
}: {
  intensity: number | "subtle" | "default" | "bold";
  onIntensityChange: (value: number | "subtle" | "default" | "bold") => void;
}) {
  const numericValue = typeof intensity === "number" ? intensity : 50;

  const handlePreset = (preset: "subtle" | "default" | "bold") => {
    onIntensityChange(preset);
  };

  return (
    <div className="space-y-2 p-4 border border-border rounded-lg bg-surface-sunken">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-text-muted">Intensity</span>
        <span className="text-text text-sm font-mono bg-surface-raised px-2 py-0.5 rounded">
          {typeof intensity === "number" ? intensity : intensity}
        </span>
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={numericValue}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full accent-"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handlePreset("subtle")}
        >
          Subtle (20)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handlePreset("default")}
        >
          Default (50)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handlePreset("bold")}
        >
          Bold (85)
        </Button>
      </div>
    </div>
  );
}

function DemoBadge({
  size = "md",
  children,
}: {
  size?: string;
  children: ReactNode;
}) {
  const { style } = useSizeStyle(size);
  return (
    <span
      className="inline-flex items-center rounded-full bg-brand text-brand-fg font-semibold"
      style={{ ...style, height: undefined, paddingTop: 2, paddingBottom: 2 }}
    >
      {children}
    </span>
  );
}

function ModeToggle() {
  return (
    <ThemeToggler />
  );
}

function Playground({
  intensity,
  onIntensityChange,
}: {
  intensity: number | "subtle" | "default" | "bold";
  onIntensityChange: (value: number | "subtle" | "default" | "bold") => void;
}) {
  return (
    <div className="min-h-screen bg-surface p-10 space-y-8">
      <div className="space-y-4">
        <ModeToggle />
        <IntensityControls
          intensity={intensity}
          onIntensityChange={onIntensityChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="soft">Soft</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="destructive">Destructive</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline-destructive">Outline Destructive</Button>
        <Button variant="outline-success">Outline Success</Button>
        <Button variant="outline-warning">Outline Warning</Button>
        <Button variant="outline-info">Outline Info</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost-destructive">Ghost Destructive</Button>
        <Button variant="ghost-success">Ghost Success</Button>
        <Button variant="ghost-warning">Ghost Warning</Button>
        <Button variant="ghost-info">Ghost Info</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="soft-destructive">Soft Destructive</Button>
        <Button variant="soft-success">Soft Success</Button>
        <Button variant="soft-warning">Soft Warning</Button>
        <Button variant="soft-info">Soft Info</Button>
        <Button variant="soft-brand">Soft Brand</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline-brand">Outline Brand</Button>
        <Button variant="ghost-brand">Ghost Brand</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-gray-900 p-4 rounded-lg">
        <Button variant="solid-white">Solid White</Button>
        <Button variant="outline-white">Outline White</Button>
        <Button variant="ghost-white">Ghost White</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large (custom)</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <DemoBadge size="sm">sm badge</DemoBadge>
        <DemoBadge size="md">md badge</DemoBadge>
        <DemoBadge size="xl">xl badge (same registry)</DemoBadge>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button isLoading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button fullWidth>Full width</Button>
      </div>
    </div>
  );
}

// ---- App ----
export function App() {
  const [intensity, setIntensity] = useState<
    number | "subtle" | "default" | "bold"
  >(50);

  const theme: ThemeOverride = {
    intensity,
    sizes: {
      xl: {
        height: "1.5rem",
        paddingX: "2rem",
        fontSize: "1.125rem",
        gap: "0.75rem",
        iconSize: "1.5rem",
      },
    },

  }


  return (
    <UIProvider
      defaultMode="system"
      fallbackSize="lg"
      theme={theme}
    >
      <Playground intensity={intensity} onIntensityChange={setIntensity} />
    </UIProvider>
  );
}
