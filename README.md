# kreativ-ui

A themeable React component library. Styling is Tailwind + CSS variables, so
consumers get Tailwind's DX while still being able to re-theme everything
at runtime (colors, radius, font, dark mode, per-component overrides)
without rebuilding your CSS.

## Install (once published)

```bash
npm install kreativ-ui
```

```tsx
import { UIProvider, Button } from "kreativ-ui";
import "kreativ-ui/styles.css";

export default function App() {
  return (
    <UIProvider defaultMode="system">
      <Button variant="solid">Click me</Button>
    </UIProvider>
  );
}
```

## Local development

```bash
npm install
npm run dev      # Vite playground at localhost:5173 — live-edit components here
npm run build    # tsup bundles src/ + tailwind CLI compiles dist/styles.css
npm run typecheck
```

## Theming

Every color token is a CSS variable (`--kui-brand`, `--kui-surface`, etc.)
set by `<UIProvider>` on a wrapping element. Override any subset:

```tsx
<UIProvider
  theme={{
    light: { colors: { brand: "16 185 129" } }, // emerald
    dark: { colors: { brand: "52 211 153" } },
    components: {
      Button: { variants: { solid: "rounded-full" } },
    },
  }}
>
  <App />
</UIProvider>
```

`resolvedMode` is `"light" | "dark"`, computed from `defaultMode` +
`prefers-color-scheme`. Switch it with `useTheme().setMode(...)`.

## Adding a new component (the Button pattern)

Every component folder follows the same four files — copy `Button/` as a
starting point:

```
components/Input/
├── Input.tsx          # forwardRef component, reads useTheme() overrides
├── Input.types.ts     # Props interface extending the right HTML*Attributes
├── Input.styles.ts     # base / variant / size class-map constants
└── index.ts            # re-exports component + its Props type
```

1. Define `*.types.ts` first — extend the matching native HTML attributes
   interface plus `Styleable`.
2. Define `*.styles.ts` — plain string constants keyed by `Variant`/`Size`
   from `types/common.ts`, so every component shares the same variant
   vocabulary.
3. Build the component with `cn(base, variants[variant], overrides, className)`
   so consumer overrides from `theme.components` always win.
4. Export from `index.ts`, then add `export * from "./components/Input"` to
   `src/index.ts`.

## Publishing checklist

- [ ] Bump version in `package.json`
- [ ] `npm run build` — verify `dist/index.js`, `dist/index.cjs`,
      `dist/index.d.ts`, `dist/styles.css` all exist
- [ ] `npm pack` and inspect the tarball contents before first publish
- [ ] `npm publish` (add `--access public` if the name is scoped)
