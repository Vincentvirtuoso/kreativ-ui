import { useState } from "react";
import type { ReactNode } from "react";
import { UIProvider, Button, useTheme, useSizeStyle } from "../src";

// ---- Intensity Controls ----
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
    <div className="space-y-2 p-4 border border-border rounded-lg bg-surface-raised">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-text-muted">Intensity</span>
        <span className="text-sm font-mono bg-surface-sunken px-2 py-0.5 rounded">
          {typeof intensity === "number" ? intensity : intensity}
        </span>
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={numericValue}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full accent-brand"
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

// ---- Demo Badge (unchanged) ----
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

// ---- Mode Toggle (unchanged) ----
function ModeToggle() {
  const { mode, resolvedMode, setMode } = useTheme();
  return (
    <div className="flex items-center gap-2 text-sm text-text-muted">
      <span>
        mode: {mode} (resolved: {resolvedMode})
      </span>
      <Button size="sm" variant="outline" onClick={() => setMode("light")}>
        Light
      </Button>
      <Button size="sm" variant="outline" onClick={() => setMode("dark")}>
        Dark
      </Button>
      <Button size="sm" variant="outline" onClick={() => setMode("system")}>
        System
      </Button>
    </div>
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

  return (
    <UIProvider
      defaultMode="system"
      fallbackSize="lg"
      theme={{
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
        light: {
          colors: {
            brand: "rgb(110, 230, 25)",
            brandHover: "hsl(95, 80%, 45%)",
            brandFg: "hsl(0, 0%, 100%)",
            surface: "hsl(0, 0%, 98%)",
            surfaceRaised: "hsl(0, 0%, 100%)",
            surfaceSunken: "hsl(0, 0%, 92%)",
            border: "hsl(0, 0%, 85%)",
            text: "hsl(0, 0%, 10%)",
            textMuted: "hsl(0, 0%, 40%)",
            danger: "hsl(0, 80%, 50%)",
            dangerFg: "hsl(0, 0%, 100%)",
          },
        },
        dark: {
          colors: {
            brand: "hsl(223, 80%, 60%)",
            brandHover: "hsl(32, 80%, 65%)",
            brandFg: "hsl(0, 0%, 100%)",
            surface: "hsl(0, 0%, 12%)",
            surfaceRaised: "hsl(0, 0%, 18%)",
            surfaceSunken: "hsl(0, 0%, 8%)",
            border: "hsl(0, 0%, 30%)",
            text: "hsl(0, 0%, 95%)",
            textMuted: "hsl(0, 0%, 60%)",
            danger: "hsl(0, 80%, 50%)",
            dangerFg: "hsl(0, 0%, 100%)",
          },
        },
      }}
    >
      <Playground intensity={intensity} onIntensityChange={setIntensity} />
    </UIProvider>
  );
}
