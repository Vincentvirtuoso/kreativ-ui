import type { ReactNode } from "react";
import { UIProvider, Button, ThemeToggler, useSizeStyle, ThemeOverride } from "../src";

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
    <div className="flex flex-wrap gap-6">
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Default</h3>
        <ThemeToggler />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Outline</h3>
        <ThemeToggler
          variant="outline"
          activeVariant="solid"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Soft</h3>
        <ThemeToggler
          variant="soft"
          activeVariant="solid"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Icon Only</h3>
        <ThemeToggler
          iconOnly
          allowSystem
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Vertical</h3>
        <ThemeToggler
          orientation="vertical"
          allowSystem
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">No Rounded</h3>
        <ThemeToggler
          rounded={false}
          allowSystem
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Custom Labels</h3>
        <ThemeToggler
          allowSystem
          labels={{
            light: "Day",
            dark: "Night",
            system: "Auto",
          }}
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Large</h3>
        <ThemeToggler
          size="lg"
          allowSystem
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Button Props</h3>
        <ThemeToggler
          allowSystem
          buttonProps={{
            isLoading: true,
          }}
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Unstyled</h3>
        <ThemeToggler
          allowSystem
          unstyled
        />
      </section>
    </div>
  );
}


function Playground() {
  return (
    <div className="min-h-screen bg-surface p-10 space-y-8 text-text">
      <div className="space-y-4">
        <ModeToggle />
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

export function App() {

  const theme: ThemeOverride = {
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
      <Playground />
    </UIProvider>
  );
}
