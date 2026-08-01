import { UIProvider, ThemeOverride } from "../src";
import { FormPlayground } from "./components/FormPlayground";
import { ButtonPlayground } from "./components/ButtonPlayground";
import { ThemeTogglerPlayground } from "./components/ThemeTogglerPlayground";
import { SelectPlayground } from "./components/SelectPlayground";
import { TextareaPlayground } from "./components/TextareaPlayground";

function Playground() {
  return (
    <div className="min-h-screen bg-surface p-5 space-y-8 text-text">
      <ThemeTogglerPlayground />
      <FormPlayground />
      <SelectPlayground />
      <TextareaPlayground />
      <ButtonPlayground />


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
