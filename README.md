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

#  Button

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

# 🧩 Input & FormField

This section covers the `Input` component and the `FormField` composition system for building accessible, validated form controls.

---

## Input

A flexible text input with support for variants, sizes, validation states, adornments, password visibility, clearing, and loading states.

### Basic Usage

```tsx
import { Input } from "@splenddev/kreativ-ui";

<Input placeholder="Enter your name" />
```

### Variants

```tsx
<Input variant="outline" />
<Input variant="filled" />
<Input variant="ghost" />
```

### Sizes

```tsx
<Input inputSize="sm" />
<Input inputSize="md" />
<Input inputSize="lg" />
```

### Input Kinds

The `kind` prop sets sensible defaults for `type`, `inputMode`, `autoComplete`, and sometimes a placeholder and icon. Any explicit prop overrides the kind default.

```tsx
<Input kind="email" />
<Input kind="tel" />
<Input kind="url" />
<Input kind="search" />
<Input kind="numeric" />
<Input kind="password-current" />   // autoComplete="current-password" + show/hide toggle
<Input kind="password-new" />       // autoComplete="new-password" + show/hide toggle
```

To suppress the icon that comes with certain kinds (e.g., `email`, `search`):

```tsx
<Input kind="email" hideKindIcon />
```

### Validation States

```tsx
<Input error />
<Input success />
```

The `error` state also sets `aria-invalid="true"`.

### Disabled & Loading

```tsx
<Input disabled />
<Input isLoading />  // shows a spinner, makes the field read‑only (not disabled)
```

### Adornments (Icons)

```tsx
<Input startIcon={<SearchIcon />} />
<Input endIcon={<MailIcon />} />
```

### Clearable

```tsx
<Input clearable onClear={() => console.log("cleared")} />
```

A clear button appears when the field has a value. Clicking it clears the value and calls `onClear`.

### Password Input

With `kind="password-current"` or `kind="password-new"`, a toggle button is shown to reveal/hide the password.

### Full Width & Rounded

```tsx
<Input fullWidth />   // default: true
<Input rounded />     // fully rounded corners
```

### Controlled & Uncontrolled

```tsx
// Controlled
const [value, setValue] = useState("");
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled
<Input defaultValue="Initial value" />
```

### Ref Forwarding

`Input` forwards refs to the underlying `<input>` element.

### Native Props

All standard `<input>` attributes (except `size`) are forwarded to the native input element.

### Size-Aware Styling

The component uses `useSizeStyle` to apply theme‑aware sizing from the `sizes` object in the theme.

---

## FormField

`FormField` is a higher‑level component that composes a label, description, control, and validation message into an accessible form field. It automatically wires `id`, `aria-describedby`, `aria-invalid`, and `aria-required` – no manual ID juggling.

### Basic Structure

```tsx
import { FormField, Input } from "@splenddev/kreativ-ui";

<FormField>
  <FormField.Label>Email address</FormField.Label>
  <FormField.Description>We'll only send receipts here.</FormField.Description>
  <FormField.Control>
    <Input kind="email" placeholder="you@company.com" />
  </FormField.Control>
  <FormField.Message>Enter a valid email.</FormField.Message>
</FormField>
```

### Subcomponents

| Component            | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `FormField`          | Provides context, manages `id` and accessibility relationships |
| `FormField.Label`    | Renders a label associated with the control via `htmlFor`      |
| `FormField.Description` | Renders helper text, linked via `aria-describedby`           |
| `FormField.Control`  | Injects the field ID and accessibility props into its child    |
| `FormField.Message`  | Displays a validation message, linked via `aria-describedby`  |

### Field‑Level Props

`FormField` accepts:

| Prop          | Type        | Default        | Description                                       |
| ------------- | ----------- | -------------- | ------------------------------------------------- |
| `id`          | `string`    | auto‑generated | Explicit `id` for the control                     |
| `error`       | `string`    | –              | Validation error message (overrides description)  |
| `required`    | `boolean`   | `false`        | Shows required indicator and sets `aria-required` |
| `className`   | `string`    | –              | Additional wrapper classes                        |
| `children`    | `ReactNode` | –              | The field content (typically subcomponents)       |

### Error Handling

When `error` is provided:

- The error message is displayed (replacing any `Description`).
- The control receives `aria-invalid="true"`.
- The error message is linked via `aria-describedby`.

### Required Indicator

When `required` is `true`, the label gets a `*` suffix and the control receives `aria-required="true"`.

### Auto‑Generated IDs

If no `id` is provided, `FormField` generates a unique ID using `useId` (React 18+) and passes it to the control via `FormField.Control`.

---

## FormField + Input Integration

This is the recommended way to build accessible forms with Kreativ UI.

```tsx
import { FormField, Input } from "@splenddev/kreativ-ui";

function EmailField() {
  const [error, setError] = useState("");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) setError("Email is required");
    else if (!/\S+@\S+\.\S+/.test(value)) setError("Enter a valid email");
    else setError("");
  };

  return (
    <FormField id="email" required error={error}>
      <FormField.Label>Email address</FormField.Label>
      <FormField.Description>We'll only send receipts here.</FormField.Description>
      <FormField.Control>
        <Input
          kind="email"
          placeholder="you@company.com"
          onBlur={handleBlur}
        />
      </FormField.Control>
      {error && <FormField.Message>{error}</FormField.Message>}
    </FormField>
  );
}
```

**Responsibilities**:

- `FormField` – owns field‑level state and accessibility relationships.
- `FormField.Label` – provides the accessible label.
- `FormField.Description` – provides supporting text (hidden when `error` exists).
- `FormField.Control` – connects the actual control to the field context.
- `Input` – handles the input behavior and presentation.
- `FormField.Message` – displays validation feedback.

---

## Accessibility

The library ensures the following relationships are automatically established:

```
Label
  ↓
for → input[id]

Description
  ↓
aria-describedby → description id

Validation message
  ↓
aria-describedby → message id (appended to description ids)

Validation state
  ↓
aria-invalid="true" (when error is present)
```

When using `FormField`, consumers **should** wrap the input with `FormField.Control` to benefit from these automatic connections.

---

## Validation Behavior

### Field‑Level vs. Input‑Level

```tsx
// Field-level validation (manages error message and aria state)
<FormField error="Invalid email">
  <FormField.Control>
    <Input />
  </FormField.Control>
</FormField>

// Input-level error (only visual style and aria-invalid)
<Input error />
```

`FormField` manages the error message and overall accessibility, while `Input` controls its own visual presentation. Using both together gives full feedback.

### State‑Transition Feedback

When the `error` or `success` state changes on an `Input`, the component briefly animates the change (e.g., a subtle colour transition) rather than continuously animating the validation state. This provides a smooth user experience without being distracting.

---

## Standalone vs. FormField Usage

- **Standalone `Input`**: Use when you need a simple input without label/description/validation relationships. Ideal for search bars, inline inputs, or custom layouts.
- **`FormField` + `Input`**: Use for labeled, described, or validated form controls. This ensures proper accessibility and reduces manual ARIA management.

---

## API Reference

### Input Props

| Prop              | Type                                | Default     | Description                                                                 |
| ----------------- | ----------------------------------- | ----------- | --------------------------------------------------------------------------- |
| `variant`         | `"outline" \| "filled" \| "ghost"`  | `"outline"` | Visual style                                                                |
| `inputSize`       | `"sm" \| "md" \| "lg"`              | `"md"`      | Height, padding, font size                                                  |
| `kind`            | `InputKind`                         | `"text"`    | Sets defaults for `type`, `inputMode`, `autoComplete`, placeholder, and icon|
| `hideKindIcon`    | `boolean`                           | `false`     | Suppress the default icon from `kind`                                       |
| `error`           | `boolean`                           | `false`     | Danger styling and `aria-invalid`                                           |
| `success`         | `boolean`                           | `false`     | Success styling                                                             |
| `disabled`        | `boolean`                           | `false`     | Disables the input                                                          |
| `isLoading`       | `boolean`                           | `false`     | Shows spinner and marks read‑only                                           |
| `clearable`       | `boolean`                           | `false`     | Shows clear button when value is present                                    |
| `onClear`         | `() => void`                        | –           | Called after clear                                                          |
| `rounded`         | `boolean`                           | `false`     | Fully rounded wrapper                                                       |
| `fullWidth`       | `boolean`                           | `true`      | Stretch to container width                                                  |
| `startIcon`  | `ReactNode`                         | –           | Content before the input (e.g., icon)                                       |
| `endIcon`    | `ReactNode`                         | –           | Content after the input (e.g., icon)                                        |
| `className`       | `string`                            | –           | Additional wrapper class                                                    |
| `inputClassName`  | `string`                            | –           | Additional class for the native input element                               |

All standard `<input>` attributes (except `size`) are forwarded to the underlying `<input>`.

### FormField Props

| Prop          | Type        | Default        | Description                                       |
| ------------- | ----------- | -------------- | ------------------------------------------------- |
| `id`          | `string`    | auto‑generated | Explicit `id` for the control                     |
| `error`       | `string`    | –              | Validation error message (overrides description)  |
| `required`    | `boolean`   | `false`        | Shows required indicator and sets `aria-required` |
| `className`   | `string`    | –              | Additional wrapper classes                        |
| `children`    | `ReactNode` | –              | The field content (typically subcomponents)       |

### FormField Subcomponents

| Component            | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| `FormField.Label`    | Renders a label associated with the control via `htmlFor`         |
| `FormField.Description` | Renders helper text, linked via `aria-describedby`             |
| `FormField.Control`  | Injects the field ID and accessibility props into its child       |
| `FormField.Message`  | Displays a validation message, linked via `aria-describedby`      |

---

For more advanced usage (e.g., integrating with `react-hook-form`), see the [GitHub repository examples](https://github.com/Vincentvirtuoso/kreativ-ui).

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

**More component documentation (Select, Textarea, Checkbox, RadioGroup, etc.) coming soon.**  
Visit the [GitHub repository](https://github.com/Vincentvirtuoso/kreativ-ui) for updates.