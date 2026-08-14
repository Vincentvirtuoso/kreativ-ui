# Kreativ UI

A modern, themeable React component library built with **React**, **TypeScript**, **Tailwind CSS v4**, and **CSS Variables**.  
Kreativ UI provides a runtime theme engine that lets you customize colors, typography, radius, sizes, and component styles **without rebuilding CSS**.

---

## ✨ Features

- Runtime theme switching (`light`, `dark`, `system`)
- Built‑in `ThemeToggler` with optional animated transitions
- CSS‑variable‑driven design tokens
- Primitive + semantic token architecture
- Component‑level theme overrides
- Fully accessible (ARIA, keyboard navigation, focus management)
- TypeScript‑first and tree‑shakable

---

## 📦 Installation

```bash
npm install @splenddev/kreativ-ui
```

Import the stylesheet **once** in your application entry:

```tsx
import "@splenddev/kreativ-ui/styles.css";
```

---

## 🚀 Quick Start

Wrap your app with `UIProvider` and use the `Button` component:

```tsx
import { UIProvider, Button } from "@splenddev/kreativ-ui";
import "@splenddev/kreativ-ui/styles.css";

export default function App() {
  return (
    <UIProvider defaultMode="system">
      <Button>Click me</Button>
    </UIProvider>
  );
}
```

---

# ☀️ UIProvider

The `UIProvider` component provides the theme context and manages the active colour mode. It must wrap any part of your application that uses Kreativ UI components.

### Modes

| Mode     | Description                                    |
| -------- | ---------------------------------------------- |
| `light`  | Forces light mode                              |
| `dark`   | Forces dark mode                               |
| `system` | Follows the user’s operating system preference |

```tsx
<UIProvider defaultMode="system">
  <App />
</UIProvider>
```

### useTheme

Access and change the current mode anywhere in your app:

```tsx
import { useTheme } from "@splenddev/kreativ-ui";

function ThemeSwitcher() {
  const { mode, setMode } = useTheme();

  return (
    <>
      <button onClick={() => setMode("light")}>Light</button>
      <button onClick={() => setMode("dark")}>Dark</button>
      <button onClick={() => setMode("system")}>System</button>
    </>
  );
}
```

---

# 🎨 Theming

Kreativ UI’s theme system is built around two layers:

- **Primitive tokens** – raw values (colours, spacing, radii, fonts, etc.)
- **Semantic tokens** – role‑based values that adapt to light/dark modes

The library ships with a default theme. You can override any part of it using a `ThemeOverride` object.

## Overriding the Theme

Pass a `theme` prop to `UIProvider`. Only the properties you provide will be merged with the default theme.

```tsx
import { UIProvider } from "@splenddev/kreativ-ui";

const theme = {
  semanticTokens: {
    colors: {
      brand: {
        value: {
          light: "16 128 224", // RGB channel values
          dark: "71 153 235",
        },
      },
      surface: {
        value: {
          light: "255 255 255",
          dark: "15 23 42",
        },
      },
      text: {
        value: {
          light: "15 23 42",
          dark: "241 245 249",
        },
      },
    },
  },
};

<UIProvider theme={theme}>
  <App />
</UIProvider>;
```

### Primitive vs Semantic Tokens

**Primitive tokens** are raw values:

```ts
tokens.colors.blue.500  // → 59 130 246
tokens.colors.gray.900  // → 17 24 39
tokens.spacing.md       // → 16px
```

**Semantic tokens** describe UI meaning and can reference primitive tokens or direct values:

```ts
semanticTokens.colors.brand = { value: { light: "{colors.blue.500}", dark: "{colors.blue.400}" } }
semanticTokens.colors.text = { value: { light: "{colors.gray.900}", dark: "{colors.gray.50}" } }
```

The runtime engine resolves these references and applies the correct values based on the active colour mode.

### Custom Component Sizes

You can extend the size system by adding custom size definitions. For example, to add an `xl` button size:

```tsx
import { defaultTheme } from "@splenddev/kreativ-ui";

const theme = {
  ...defaultTheme,
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
};

<UIProvider theme={theme}>
  <Button size="xl">Extra Large</Button>
</UIProvider>;
```

---

# 🌗 ThemeToggler

A ready‑to‑use theme switcher that integrates with `UIProvider`.

## Basic Usage

```tsx
import { ThemeToggler } from "@splenddev/kreativ-ui";

<ThemeToggler />;
```

## With System Mode

```tsx
<ThemeToggler allowSystem />
```

## Icon Only

```tsx
<ThemeToggler iconOnly allowSystem />
```

## Custom Variants

```tsx
<ThemeToggler variant="outline" activeVariant="solid" />
```

## Vertical Layout

```tsx
<ThemeToggler orientation="vertical" allowSystem />
```

## Custom Labels & Icons

```tsx
import { SunMedium, MoonStar, LaptopMinimal } from "lucide-react";

<ThemeToggler
  allowSystem
  labels={{ light: "Day", dark: "Night", system: "Auto" }}
  icons={{
    light: <SunMedium size={18} />,
    dark: <MoonStar size={18} />,
    system: <LaptopMinimal size={18} />,
  }}
/>;
```

## Cycle Mode with Animation

```tsx
<ThemeToggler
  display="cycle"
  allowSystem
  transition={{ type: "rotate", duration: 400, easing: "ease-in-out" }}
/>
```

Supported transition types: `none`, `fade`, `slide`, `scale`, `rotate`.

## Props

| Prop            | Type                                                              | Default             | Description                                 |
| --------------- | ----------------------------------------------------------------- | ------------------- | ------------------------------------------- |
| `variant`       | `ThemeTogglerVariant`                                             | `"ghost"`           | Variant for inactive buttons                |
| `activeVariant` | `ThemeTogglerVariant`                                             | `"solid"`           | Variant for active button                   |
| `size`          | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                           | `"sm"`              | Button size                                 |
| `iconOnly`      | `boolean`                                                         | `false`             | Hide labels, show only icons                |
| `allowSystem`   | `boolean`                                                         | `false`             | Show system theme option                    |
| `orientation`   | `"horizontal" \| "vertical"`                                      | `"horizontal"`      | Layout direction                            |
| `rounded`       | `boolean`                                                         | `true`              | Rounded container corners                   |
| `unstyled`      | `boolean`                                                         | `false`             | Remove wrapper styles                       |
| `display`       | `"buttons" \| "cycle"`                                            | `"buttons"`         | Show all buttons or a single cycling button |
| `transition`    | `{ type?: TransitionType; duration?: number; easing?: string }`   | `{ type: "none" }`  | Animation configuration for cycle mode      |
| `labels`        | `Partial<Record<"light" \| "dark" \| "system", string>>`          | –                   | Override labels                             |
| `icons`         | `Partial<Record<"light" \| "dark" \| "system", ReactNode>>`       | –                   | Override icons                              |
| `buttonProps`   | `Partial<ButtonProps>`                                            | –                   | Props passed to every internal button       |
| `className`     | `string`                                                          | –                   | Additional wrapper class                    |

---

# 🧩 Button

A versatile button with support for variants, sizes, loading states, icons, and full‑width.

## Basic Usage

```tsx
<Button>Click me</Button>
```

## Variants

```tsx
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="soft">Soft</Button>
<Button variant="destructive">Delete</Button>
<Button variant="success">Success</Button>
<Button variant="link">Learn more</Button>
```

## Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

## Loading State

```tsx
<Button isLoading>Saving...</Button>
```

## Icons

```tsx
<Button leftIcon={<SearchIcon />}>Search</Button>
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>
```

## Icon Only

```tsx
<Button iconOnly aria-label="Search">
  <SearchIcon />
</Button>
```

## Full Width

```tsx
<Button fullWidth>Continue</Button>
```

## Custom Sizes via Theme

Define additional sizes in the theme (as shown in the Theming section) and use them with `size` prop.

## Props

| Prop                     | Type                                                   | Default  | Description                                 |
| ------------------------ | ------------------------------------------------------ | -------- | ------------------------------------------- |
| `variant`                | `"solid" \| "outline" \| "ghost" \| "soft" \| "destructive" \| "success" \| "link"` | `"solid"` | Visual style                                |
| `size`                   | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| string`      | `"md"`    | Size (theme‑driven; custom strings allowed) |
| `isLoading`              | `boolean`                                              | `false`   | Shows spinner and disables                  |
| `leftIcon` / `rightIcon` | `ReactNode`                                            | –         | Icon elements                               |
| `fullWidth`              | `boolean`                                              | `false`   | Stretch to container width                  |
| `disabled`               | `boolean`                                              | `false`   | Disables interactions                       |
| `iconOnly`               | `boolean`                                              | `false`   | Remove padding for icon‑only layout         |

All standard `<button>` props are forwarded.

---

# ♿ Accessibility

Kreativ UI components are built with accessibility in mind:

- All interactive elements support keyboard navigation.
- Focus management and visible focus indicators.
- ARIA attributes are applied automatically where needed (e.g., `aria-label`, `aria-describedby`, `aria-invalid`).
- Colour contrast respects system‑level settings.

---

# 📦 Browser Support

Kreativ UI works in all modern browsers (Chrome, Firefox, Safari, Edge).  
Requires React 18 or later.

---

# 📄 License

MIT

---

**More component documentation (Input, Select, Textarea, Checkbox, RadioGroup, etc.) coming soon.**  
Visit the [GitHub repository](https://github.com/Vincentvirtuoso/kreativ-ui) for updates.
