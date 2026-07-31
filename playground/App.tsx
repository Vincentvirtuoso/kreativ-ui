import type { ReactNode } from "react";
import { UIProvider, Button, ThemeToggler, useSizeStyle, ThemeOverride } from "../src";
import { FormPlayground } from "./components/FormPlayground";
import { ButtonPlayground } from "./components/ButtonPlayground";
import { ThemeTogglerPlayground } from "./components/ThemeTogglerPlayground";

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

function Playground() {
  return (
    <div className="min-h-screen bg-surface p-5 space-y-8 text-text">
        <ThemeTogglerPlayground />
      <FormPlayground />

      <ButtonPlayground />


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
        height: "4.5rem",
        paddingX: "2.5rem",
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
