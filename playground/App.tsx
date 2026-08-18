import {  UIProvider, type ThemeOverride } from "../src";
import ComponentsPlayground from "./components/ComponentsPlayground";
import { useState } from "react";
import { ThemeStudio } from "./components/ThemeStudio";

export function App() {
  const [theme, setTheme] = useState<ThemeOverride>({
    sizes: {
      xl: {
        height: "4.5rem",
        paddingX: "2.5rem",
        fontSize: "1.125rem",
        gap: "0.75rem",
        radius: "1rem",
        iconSize: "1.5rem",
      },
    },
    recipes: {
      Button: {
        compoundVariants: [
          { conditions: { color: "neutral" }, className: "text-text-muted" },
        ],
      },
    },
  });

  


  return (
    <UIProvider defaultMode="system" fallbackSize="lg" theme={theme}>
      <ThemeStudio
        theme={theme}
        onChange={(nextTheme) => {
          setTheme(nextTheme);
        }}
      />

      <ComponentsPlayground />
    </UIProvider>
  );
}
