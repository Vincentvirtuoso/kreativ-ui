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
semanticTokens.colors.brand = {
  value: { light: "{colors.blue.500}", dark: "{colors.blue.400}" },
};
semanticTokens.colors.text = {
  value: { light: "{colors.gray.900}", dark: "{colors.gray.50}" },
};
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

| Prop            | Type                                                            | Default            | Description                                 |
| --------------- | --------------------------------------------------------------- | ------------------ | ------------------------------------------- |
| `variant`       | `ThemeTogglerVariant`                                           | `"ghost"`          | Variant for inactive buttons                |
| `activeVariant` | `ThemeTogglerVariant`                                           | `"solid"`          | Variant for active button                   |
| `size`          | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                          | `"sm"`             | Button size                                 |
| `iconOnly`      | `boolean`                                                       | `false`            | Hide labels, show only icons                |
| `allowSystem`   | `boolean`                                                       | `false`            | Show system theme option                    |
| `orientation`   | `"horizontal" \| "vertical"`                                    | `"horizontal"`     | Layout direction                            |
| `rounded`       | `boolean`                                                       | `true`             | Rounded container corners                   |
| `unstyled`      | `boolean`                                                       | `false`            | Remove wrapper styles                       |
| `display`       | `"buttons" \| "cycle"`                                          | `"buttons"`        | Show all buttons or a single cycling button |
| `transition`    | `{ type?: TransitionType; duration?: number; easing?: string }` | `{ type: "none" }` | Animation configuration for cycle mode      |
| `labels`        | `Partial<Record<"light" \| "dark" \| "system", string>>`        | –                  | Override labels                             |
| `icons`         | `Partial<Record<"light" \| "dark" \| "system", ReactNode>>`     | –                  | Override icons                              |
| `buttonProps`   | `Partial<ButtonProps>`                                          | –                  | Props passed to every internal button       |
| `className`     | `string`                                                        | –                  | Additional wrapper class                    |

---

# Button

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

| Prop                     | Type                                                                                | Default   | Description                                 |
| ------------------------ | ----------------------------------------------------------------------------------- | --------- | ------------------------------------------- |
| `variant`                | `"solid" \| "outline" \| "ghost" \| "soft" \| "destructive" \| "success" \| "link"` | `"solid"` | Visual style                                |
| `size`                   | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| string`                                    | `"md"`    | Size (theme‑driven; custom strings allowed) |
| `isLoading`              | `boolean`                                                                           | `false`   | Shows spinner and disables                  |
| `leftIcon` / `rightIcon` | `ReactNode`                                                                         | –         | Icon elements                               |
| `fullWidth`              | `boolean`                                                                           | `false`   | Stretch to container width                  |
| `disabled`               | `boolean`                                                                           | `false`   | Disables interactions                       |
| `iconOnly`               | `boolean`                                                                           | `false`   | Remove padding for icon‑only layout         |

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

<Input placeholder="Enter your name" />;
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
</FormField>;
```

### Subcomponents

| Component               | Purpose                                                        |
| ----------------------- | -------------------------------------------------------------- |
| `FormField`             | Provides context, manages `id` and accessibility relationships |
| `FormField.Label`       | Renders a label associated with the control via `htmlFor`      |
| `FormField.Description` | Renders helper text, linked via `aria-describedby`             |
| `FormField.Control`     | Injects the field ID and accessibility props into its child    |
| `FormField.Message`     | Displays a validation message, linked via `aria-describedby`   |

### Field‑Level Props

`FormField` accepts:

| Prop        | Type        | Default        | Description                                       |
| ----------- | ----------- | -------------- | ------------------------------------------------- |
| `id`        | `string`    | auto‑generated | Explicit `id` for the control                     |
| `error`     | `string`    | –              | Validation error message (overrides description)  |
| `required`  | `boolean`   | `false`        | Shows required indicator and sets `aria-required` |
| `className` | `string`    | –              | Additional wrapper classes                        |
| `children`  | `ReactNode` | –              | The field content (typically subcomponents)       |

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
      <FormField.Description>
        We'll only send receipts here.
      </FormField.Description>
      <FormField.Control>
        <Input kind="email" placeholder="you@company.com" onBlur={handleBlur} />
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

| Prop             | Type                               | Default     | Description                                                                  |
| ---------------- | ---------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `variant`        | `"outline" \| "filled" \| "ghost"` | `"outline"` | Visual style                                                                 |
| `inputSize`      | `"sm" \| "md" \| "lg"`             | `"md"`      | Height, padding, font size                                                   |
| `kind`           | `InputKind`                        | `"text"`    | Sets defaults for `type`, `inputMode`, `autoComplete`, placeholder, and icon |
| `hideKindIcon`   | `boolean`                          | `false`     | Suppress the default icon from `kind`                                        |
| `error`          | `boolean`                          | `false`     | Danger styling and `aria-invalid`                                            |
| `success`        | `boolean`                          | `false`     | Success styling                                                              |
| `disabled`       | `boolean`                          | `false`     | Disables the input                                                           |
| `isLoading`      | `boolean`                          | `false`     | Shows spinner and marks read‑only                                            |
| `clearable`      | `boolean`                          | `false`     | Shows clear button when value is present                                     |
| `onClear`        | `() => void`                       | –           | Called after clear                                                           |
| `rounded`        | `boolean`                          | `false`     | Fully rounded wrapper                                                        |
| `fullWidth`      | `boolean`                          | `true`      | Stretch to container width                                                   |
| `startIcon`      | `ReactNode`                        | –           | Content before the input (e.g., icon)                                        |
| `endIcon`        | `ReactNode`                        | –           | Content after the input (e.g., icon)                                         |
| `className`      | `string`                           | –           | Additional wrapper class                                                     |
| `inputClassName` | `string`                           | –           | Additional class for the native input element                                |

All standard `<input>` attributes (except `size`) are forwarded to the underlying `<input>`.

### FormField Props

| Prop        | Type        | Default        | Description                                       |
| ----------- | ----------- | -------------- | ------------------------------------------------- |
| `id`        | `string`    | auto‑generated | Explicit `id` for the control                     |
| `error`     | `string`    | –              | Validation error message (overrides description)  |
| `required`  | `boolean`   | `false`        | Shows required indicator and sets `aria-required` |
| `className` | `string`    | –              | Additional wrapper classes                        |
| `children`  | `ReactNode` | –              | The field content (typically subcomponents)       |

### FormField Subcomponents

| Component               | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `FormField.Label`       | Renders a label associated with the control via `htmlFor`    |
| `FormField.Description` | Renders helper text, linked via `aria-describedby`           |
| `FormField.Control`     | Injects the field ID and accessibility props into its child  |
| `FormField.Message`     | Displays a validation message, linked via `aria-describedby` |

---

For more advanced usage (e.g., integrating with `react-hook-form`), see the [GitHub repository examples](https://github.com/Vincentvirtuoso/kreativ-ui).

---

# 🧩 Select

A fully accessible, customizable select component with keyboard navigation, grouped options, clearable selections, and optional integration with `FormField`. Built as a compound component for maximum flexibility.

---

## Overview

`Select` is a headless‑style compound component that implements the WAI‑ARIA combobox pattern. It consists of:

- `Select` – root container, manages state and context
- `Select.Trigger` – interactive button that opens/closes the dropdown
- `Select.Value` – displays the selected option or a placeholder
- `Select.Content` – dropdown container for options
- `Select.Item` – an individual selectable option
- `Select.Group` – groups related options
- `Select.Label` – heading for a group

Supports both **controlled** (`value`/`onValueChange`) and **uncontrolled** (`defaultValue`) usage.

---

## Import

```tsx
import { Select } from "@splenddev/kreativ-ui";
```

---

## Basic Usage

```tsx
<Select placeholder="Select a country">
  <Select.Trigger>
    <Select.Value />
  </Select.Trigger>

  <Select.Content>
    <Select.Item value="us">United States</Select.Item>
    <Select.Item value="ca">Canada</Select.Item>
    <Select.Item value="mx">Mexico</Select.Item>
  </Select.Content>
</Select>
```

---

## Controlled Select

Use `value` and `onValueChange` to control the selection from a parent component.

```tsx
import { useState } from "react";

function ControlledSelect() {
  const [value, setValue] = useState<string | undefined>("");

  return (
    <Select value={value} onValueChange={setValue}>
      <Select.Trigger>
        <Select.Value placeholder="Choose a framework" />
      </Select.Trigger>

      <Select.Content>
        <Select.Item value="react">React</Select.Item>
        <Select.Item value="vue">Vue</Select.Item>
        <Select.Item value="svelte">Svelte</Select.Item>
      </Select.Content>
    </Select>
  );
}
```

> When `clearable` is enabled, clearing the value will call `onValueChange(undefined)`. The parent must handle this state change accordingly.

---

## Uncontrolled Select

Use `defaultValue` for an uncontrolled component.

```tsx
<Select defaultValue="react">
  <Select.Trigger>
    <Select.Value placeholder="Choose a framework" />
  </Select.Trigger>

  <Select.Content>
    <Select.Item value="react">React</Select.Item>
    <Select.Item value="vue">Vue</Select.Item>
    <Select.Item value="angular">Angular</Select.Item>
  </Select.Content>
</Select>
```

---

## Props

| Prop            | Type                               | Default     | Description                                        |
| --------------- | ---------------------------------- | ----------- | -------------------------------------------------- |
| `value`         | `string`                           | –           | Controlled selected value                          |
| `defaultValue`  | `string`                           | –           | Uncontrolled initial value                         |
| `onValueChange` | `(value?: string) => void`         | –           | Called when selection changes                      |
| `placeholder`   | `string`                           | –           | Text shown when no value is selected               |
| `required`      | `boolean`                          | `false`     | Marks the field as required (`aria-required`)      |
| `name`          | `string`                           | –           | Name for the hidden input used in form submissions |
| `disabled`      | `boolean`                          | `false`     | Disables the entire select                         |
| `clearable`     | `boolean`                          | `false`     | Shows a clear button (removes selection)           |
| `variant`       | `"outline" \| "filled" \| "ghost"` | `"outline"` | Visual style                                       |
| `size`          | `"sm" \| "md" \| "lg"`             | `"md"`      | Size of the trigger and content                    |
| `error`         | `boolean`                          | `false`     | Shows error state and sets `aria-invalid="true"`   |
| `success`       | `boolean`                          | `false`     | Shows success state                                |
| `rounded`       | `boolean`                          | `false`     | Applies fully rounded corners to the trigger       |
| `className`     | `string`                           | –           | Additional class names for the root container      |

---

## Compound Components

### `Select.Trigger`

The interactive button that toggles the dropdown. It receives all necessary ARIA attributes from the root `Select`.

```tsx
<Select.Trigger>
  <Select.Value />
</Select.Trigger>
```

### `Select.Value`

Renders the current selection or the placeholder. The label is derived from the matching `Select.Item`’s children.

```tsx
<Select.Value placeholder="Choose an option" />
```

### `Select.Content`

The dropdown container. Renders its children (items, groups, labels) inside a listbox.

```tsx
<Select.Content>{/* items */}</Select.Content>
```

### `Select.Item`

A single selectable option.

| Prop       | Type        | Default  | Description          |
| ---------- | ----------- | -------- | -------------------- |
| `value`    | `string`    | required | Value of the option  |
| `disabled` | `boolean`   | `false`  | Disables this option |
| `children` | `ReactNode` | –        | Display label        |

```tsx
<Select.Item value="react" disabled>
  React
</Select.Item>
```

### `Select.Group`

Groups related options, typically used with `Select.Label`.

```tsx
<Select.Group>
  <Select.Label>Frontend</Select.Label>
  <Select.Item value="react">React</Select.Item>
  <Select.Item value="vue">Vue</Select.Item>
</Select.Group>
```

### `Select.Label`

A heading for a group of options. It is rendered as a non‑interactive label inside the listbox.

```tsx
<Select.Label>Backend</Select.Label>
```

---

## Accessibility

`Select` implements the WAI‑ARIA combobox pattern and manages all necessary relationships automatically.

**Roles & Attributes**:

- Trigger: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`
- Content: `role="listbox"`
- Items: `role="option"`, `aria-selected`, `aria-disabled`

**Automatic IDs**: The root generates unique IDs for the trigger, content, and each option. These are used to connect the trigger to the listbox and to manage `aria-activedescendant`.

**FormField integration**: When placed inside a `FormField`, the Select consumes the following context:

- `id` – becomes the trigger’s `id`
- `labelId` – linked via `aria-labelledby`
- `descriptionId` / `messageId` – linked via `aria-describedby`
- `invalid` – sets `aria-invalid`
- `required` – sets `aria-required`

This ensures full ARIA support with no manual configuration.

---

## Keyboard Navigation

| Key         | Open state         | Closed state                              |
| ----------- | ------------------ | ----------------------------------------- |
| `ArrowDown` | Next item          | Opens the dropdown                        |
| `ArrowUp`   | Previous item      | Opens the dropdown (or no-op)             |
| `Home`      | First item         | Opens and selects first? (implementation) |
| `End`       | Last item          | Opens and selects last?                   |
| `Enter`     | Select active item | Opens the dropdown                        |
| `Space`     | Select active item | Opens the dropdown                        |
| `Escape`    | Closes dropdown    | –                                         |
| `Backspace` | –                  | Clears selection (if `clearable`)         |
| `Delete`    | –                  | Clears selection (if `clearable`)         |

> When the dropdown is open, `ArrowDown`/`ArrowUp` navigate through items. `Enter`/`Space` select the active (highlighted) item and close the dropdown. `Escape` closes the dropdown without selection.

---

## Clearable Select

When `clearable` is `true`, a clear button appears inside the trigger when a value is selected. Clicking it resets the selection to `undefined`.

```tsx
<Select clearable defaultValue="react">
  <Select.Trigger>
    <Select.Value placeholder="Pick a framework" />
  </Select.Trigger>

  <Select.Content>
    <Select.Item value="react">React</Select.Item>
    <Select.Item value="vue">Vue</Select.Item>
  </Select.Content>
</Select>
```

**Controlled behavior**: The parent must handle `onValueChange(undefined)` to update its own state.

**Uncontrolled behavior**: The internal state is cleared automatically.

---

## Disabled Options

Individual items can be disabled using the `disabled` prop. They are not selectable via mouse or keyboard navigation and are announced as disabled by screen readers.

```tsx
<Select.Item value="legacy" disabled>
  Legacy
</Select.Item>
```

Disabled items are skipped when navigating with arrow keys.

---

## Validation States

### Error

```tsx
<Select error>
  <Select.Trigger>
    <Select.Value placeholder="Choose" />
  </Select.Trigger>
  <Select.Content>...</Select.Content>
</Select>
```

Visually styles the trigger with error colours and sets `aria-invalid="true"`.

### Success

```tsx
<Select success>...</Select>
```

Applies success styling.

---

## FormField Integration

When used inside a `FormField`, the Select automatically inherits the field’s `id`, `required`, and validation state.

```tsx
<FormField required error="Please select a country">
  <FormField.Label>Country</FormField.Label>
  <FormField.Description>
    Select your country of residence.
  </FormField.Description>

  <Select>
    <Select.Trigger>
      <Select.Value placeholder="Select a country" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="us">United States</Select.Item>
      <Select.Item value="ca">Canada</Select.Item>
    </Select.Content>
  </Select>

  <FormField.Message />
</FormField>
```

> No extra props are needed – the Select picks up the context automatically.

---

## Native Form Submission

The `name` prop renders a hidden `<input>` that is included in form submissions. The value submitted is the currently selected `value`.

```tsx
<form onSubmit={handleSubmit}>
  <Select name="country" defaultValue="us">
    <Select.Trigger>
      <Select.Value placeholder="Select a country" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="us">United States</Select.Item>
      <Select.Item value="ca">Canada</Select.Item>
    </Select.Content>
  </Select>

  <button type="submit">Submit</button>
</form>
```

---

## Styling and Theming

Select uses the same theming infrastructure as other Kreativ UI form controls:

- `theme.recipes.FormControl` defines base, variant, and size styles.
- `useSizeStyle` applies height, padding, and font size from the `sizes` token.
- Variants (`outline`, `filled`, `ghost`) are resolved via `resolveRecipe`.
- Validation states (`error`, `success`) are applied through CSS variables and class names.

All styling is driven by the runtime theme, so overriding the visual appearance can be done by providing a custom `FormControl` recipe in the theme.

---

## Data Attributes

The Select exposes several data attributes for styling or testing:

| Attribute       | Element          | Values                       | Description                    |
| --------------- | ---------------- | ---------------------------- | ------------------------------ |
| `data-state`    | `Select.Trigger` | `"open"`, `"closed"`         | Current dropdown state         |
| `data-state`    | `Select.Item`    | `"selected"`, `"unselected"` | Selection state of the item    |
| `data-active`   | `Select.Item`    | present when highlighted     | Keyboard‑focused item (active) |
| `data-disabled` | `Select.Item`    | present when disabled        | Disabled state                 |
| `data-invalid`  | `Select.Trigger` | present when error           | Error state                    |

---

## Complete Example

```tsx
import { useState } from "react";
import { FormField, Select } from "@splenddev/kreativ-ui";

function CountrySelect() {
  const [country, setCountry] = useState<string | undefined>("");
  const [error, setError] = useState("");

  const validate = (value?: string) => {
    if (!value) setError("Please select a country");
    else setError("");
  };

  return (
    <FormField required error={error}>
      <FormField.Label>Country</FormField.Label>
      <FormField.Description>
        Choose your country of residence.
      </FormField.Description>

      <Select
        value={country}
        onValueChange={(val) => {
          setCountry(val);
          validate(val);
        }}
        clearable
        name="country"
        error={!!error}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select a country" />
        </Select.Trigger>

        <Select.Content>
          <Select.Group>
            <Select.Label>North America</Select.Label>
            <Select.Item value="us">United States</Select.Item>
            <Select.Item value="ca">Canada</Select.Item>
            <Select.Item value="mx">Mexico</Select.Item>
          </Select.Group>

          <Select.Group>
            <Select.Label>Europe</Select.Label>
            <Select.Item value="uk">United Kingdom</Select.Item>
            <Select.Item value="de">Germany</Select.Item>
            <Select.Item value="fr" disabled>
              France (disabled)
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>

      {error && <FormField.Message>{error}</FormField.Message>}
    </FormField>
  );
}
```

---

For more advanced use cases (e.g., async loading, custom rendering), refer to the [GitHub repository examples](https://github.com/Vincentvirtuoso/kreativ-ui).

---

# Typography System

Kreativ UI provides a centralized, theme-aware typography system for controlling how text is rendered across your application and component library.

Typography styles can be defined once and reused across built-in components such as `Button`, `Input`, and `Select`, as well as custom components created by your application.

The system supports:

* Reusable typography presets
* Primitive design tokens
* Semantic tokens
* Custom font families
* `next/font`
* CSS custom properties
* Local fonts
* Runtime theme customization
* Custom typography presets
* Component-level typography selection
* Custom component integration
* Type-safe token definitions
* Direct CSS value overrides

---

## How It Works

Kreativ UI typography is built around four layers:

```text
Primitive Tokens
      ↓
Semantic Tokens
      ↓
Typography Presets
      ↓
useTypography()
      ↓
React.CSSProperties
      ↓
Component
```

### Primitive Tokens

Primitive tokens contain reusable values such as:

```ts
fonts.body
fonts.heading
fonts.mono

fontSizes.sm
fontSizes.md
fontSizes.lg

fontWeights.normal
fontWeights.medium
fontWeights.bold

lineHeights.tight
lineHeights.normal
lineHeights.relaxed
```

They are defined with `defineToken()`.

```ts
const fonts = {
  body: defineToken("Inter, sans-serif"),
  heading: defineToken("Poppins, sans-serif"),
};
```

---

### Semantic Tokens

Semantic tokens represent values that can change depending on the active theme or color mode.

They are defined with `defineSemanticToken()`.

```ts
const colors = {
  text: defineSemanticToken(
    "{colors.gray.900}",
    "{colors.gray.100}",
  ),
};
```

Typography itself is generally not mode-dependent, but typography definitions can reference semantic tokens when appropriate.

---

### Typography Presets

Typography presets combine tokens into meaningful styles.

```ts
const typography = {
  body: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.md}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },

  heading: {
    fontFamily: "{fonts.heading}",
    fontSize: "{fontSizes.2xl}",
    fontWeight: "{fontWeights.bold}",
    lineHeight: "{lineHeights.tight}",
  },
};
```

A preset is referenced by name:

```tsx
<Button typography="body" />
```

---

### `useTypography()`

The `useTypography()` hook retrieves the typography preset from the active theme and resolves all token references into CSS values.

```tsx
const styles = useTypography("heading");
```

The result is suitable for React's `style` prop:

```tsx
<h1 style={styles}>Welcome</h1>
```

---

# Typography Architecture

A typical Kreativ UI theme contains:

```ts
const theme = {
  tokens: {
    fonts: {
      body: defineToken("Inter, sans-serif"),
      heading: defineToken("Poppins, sans-serif"),
      mono: defineToken("JetBrains Mono, monospace"),
    },

    fontSizes: {
      sm: defineToken("0.875rem"),
      md: defineToken("1rem"),
      lg: defineToken("1.125rem"),
    },

    fontWeights: {
      normal: defineToken(400),
      medium: defineToken(500),
      semibold: defineToken(600),
      bold: defineToken(700),
    },

    lineHeights: {
      tight: defineToken(1.2),
      normal: defineToken(1.5),
      relaxed: defineToken(1.75),
    },
  },

  typography: {
    body: {
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.md}",
      fontWeight: "{fontWeights.normal}",
      lineHeight: "{lineHeights.normal}",
    },

    heading: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.lg}",
      fontWeight: "{fontWeights.bold}",
      lineHeight: "{lineHeights.tight}",
    },
  },
};
```

This creates a clear separation between **what a value is** and **how that value is used**.

For example:

```text
"Inter, sans-serif"
        ↓
fonts.body
        ↓
typography.body
        ↓
useTypography("body")
        ↓
CSSProperties
```

---

# Using Typography in Components

There are several ways to consume the typography system.

---

## 1. Using `useTypography()` Directly

Use the hook when you are creating a custom component or need direct access to resolved typography styles.

```tsx
import { useTypography } from "@splenddev/kreativ-ui";

function MyCustomCard() {
  const headingStyles = useTypography("heading");
  const bodyStyles = useTypography("body");

  return (
    <div>
      <h2 style={headingStyles}>
        Card Title
      </h2>

      <p style={bodyStyles}>
        This is the card content.
      </p>
    </div>
  );
}
```

The component does not need to know what font family, size, weight, or line height is currently configured.

---

# 2. Creating a Reusable Component with `TypographyProps`

Kreativ UI exposes `TypographyProps` so custom components can participate in the same typography system.

```ts
export interface TypographyProps {
  /**
   * Defines the typography style to apply to the component.
   * The value must match a typography style registered in the theme.
   */
  typography?: string;
}
```

A custom component can extend this interface:

```tsx
import {
  TypographyProps,
  useTypography,
} from "@splenddev/kreativ-ui";

interface MyTextProps extends TypographyProps {
  children: React.ReactNode;
}

function MyText({
  typography = "body",
  children,
}: MyTextProps) {
  const styles = useTypography(typography);

  return (
    <p style={styles}>
      {children}
    </p>
  );
}
```

Usage:

```tsx
<MyText>
  Default body text
</MyText>

<MyText typography="heading">
  Heading text
</MyText>

<MyText typography="caption">
  Caption text
</MyText>
```

This allows custom components to behave consistently with Kreativ UI's built-in components.

---

# 3. Using Typography with Built-in Components

Built-in components that render text can expose the `typography` prop.

```tsx
<Button typography="bodySmall">
  Small Button
</Button>

<Input typography="body" />

<Select typography="body" />
```

The typography prop controls typography-related properties while component-specific layout remains independent.

For example:

```text
Typography
├── fontFamily
├── fontSize
├── fontWeight
├── lineHeight
└── letterSpacing

Component Size
├── height
├── padding
├── gap
├── iconSize
└── radius
```

This separation prevents changing a typography preset from unexpectedly changing component dimensions.

---

# 4. Typography and Component Size

Components such as `Button` often have their own size system:

```ts
sizes: {
  sm: {
    height: "2rem",
    paddingX: "0.75rem",
    gap: "0.375rem",
    iconSize: "1rem",
    radius: "0.8rem",
  },

  md: {
    height: "2.5rem",
    paddingX: "1rem",
    gap: "0.5rem",
    iconSize: "1.125rem",
    radius: "1rem",
  },
}
```

Typography should remain responsible for text properties.

For example:

```tsx
<Button
  size="lg"
  typography="bodySmall"
>
  Continue
</Button>
```

The button can use the large component dimensions while using the `bodySmall` typography preset.

Recommended responsibility:

```text
size
→ dimensions and component geometry

typography
→ text presentation

style
→ final consumer override
```

---

# Loading Fonts

Kreativ UI does **not need to load fonts itself**.

Instead, your application is responsible for loading the font.

Kreativ UI only needs to know which font family should be used.

This allows Kreativ UI to work with:

* `next/font`
* Google Fonts
* local fonts
* CSS `@font-face`
* system fonts
* CSS variables
* external font providers

This separation makes the library framework-agnostic.

---

# 5. Using Next.js `next/font`

This is one of the most common setups for a Next.js application.

For example:

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

Apply the generated variables to the document:

```tsx
<html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable}`}
>
```

The CSS variables are now available to your application.

You can register them with Kreativ UI:

```tsx
import {
  UIProvider,
  defineToken,
} from "@splenddev/kreativ-ui";

<UIProvider
  theme={{
    tokens: {
      fonts: {
        body: defineToken("var(--font-geist-sans)"),
        heading: defineToken("var(--font-geist-sans)"),
        mono: defineToken("var(--font-geist-mono)"),
      },
    },
  }}
>
  {children}
</UIProvider>
```

Your typography presets can continue to reference semantic font roles:

```ts
const typography = {
  body: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.md}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },

  code: {
    fontFamily: "{fonts.mono}",
    fontSize: "{fontSizes.sm}",
    lineHeight: "{lineHeights.normal}",
  },
};
```

This produces the following flow:

```text
next/font
    ↓
--font-geist-sans
    ↓
fonts.body
    ↓
typography.body
    ↓
useTypography("body")
    ↓
fontFamily: var(--font-geist-sans)
```

### Why this approach is recommended

Kreativ UI does not need to know that the font came from Next.js.

It only consumes:

```css
var(--font-geist-sans)
```

This keeps the design system independent from the framework responsible for loading the font.

---

# 6. Using Google Fonts Without `next/font`

If your application loads a font through CSS or another font provider, you can register it directly.

```ts
const theme = {
  tokens: {
    fonts: {
      body: defineToken("Inter, sans-serif"),
      heading: defineToken("Poppins, sans-serif"),
    },
  },
};
```

Your typography definitions remain unchanged:

```ts
const typography = {
  body: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.md}",
    lineHeight: "{lineHeights.normal}",
  },
};
```

The typography system does not care how the font was loaded.

---

# 7. Using Local Fonts

If your application defines a local font using `@font-face`:

```css
@font-face {
  font-family: "MyBrandFont";
  src: url("/fonts/my-brand-font.woff2") format("woff2");
}
```

Register it:

```ts
const theme = {
  tokens: {
    fonts: {
      body: defineToken("MyBrandFont, sans-serif"),
    },
  },
};
```

Then reference it from typography:

```ts
const typography = {
  body: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.md}",
    lineHeight: "{lineHeights.normal}",
  },
};
```

---

# 8. Using CSS Variables for Fonts

CSS variables are particularly useful when the application already has a global font system.

```css
:root {
  --app-font-body: "Inter", sans-serif;
  --app-font-heading: "Poppins", sans-serif;
}
```

Register them:

```ts
const theme = {
  tokens: {
    fonts: {
      body: defineToken("var(--app-font-body)"),
      heading: defineToken("var(--app-font-heading)"),
    },
  },
};
```

This also allows the font to be changed without changing the typography definitions themselves.

---

# 9. Using a System Font Stack

You do not need a custom font.

```ts
const theme = {
  tokens: {
    fonts: {
      body: defineToken(
        "ui-sans-serif, system-ui, sans-serif",
      ),

      heading: defineToken(
        "ui-sans-serif, system-ui, sans-serif",
      ),

      mono: defineToken(
        "ui-monospace, SFMono-Regular, Menlo, monospace",
      ),
    },
  },
};
```

---

# Customising Typography

## 10. Extending the Default Presets

You can add custom typography presets while retaining the defaults.

```tsx
import {
  UIProvider,
  defaultTheme,
} from "@splenddev/kreativ-ui";

const typography = {
  ...defaultTheme.typography,

  display: {
    fontFamily: "{fonts.heading}",
    fontSize: "4rem",
    fontWeight: 700,
    lineHeight: "1",
    letterSpacing: "-0.04em",
  },

  label: {
    fontFamily: "{fonts.body}",
    fontSize: "0.75rem",
    fontWeight: 600,
    lineHeight: "1.2",
  },
};

const theme = {
  ...defaultTheme,
  typography,
};

<UIProvider theme={theme}>
  <App />
</UIProvider>;
```

You can now use:

```tsx
<Button typography="label">
  Continue
</Button>

<MyText typography="display">
  Welcome
</MyText>
```

---

# 11. Overriding an Existing Typography Preset

You can also modify a built-in preset.

```ts
const typography = {
  ...defaultTheme.typography,

  body: {
    ...defaultTheme.typography.body,
    fontSize: "{fontSizes.lg}",
  },
};
```

Every component using:

```tsx
typography="body"
```

will now use the customized definition.

This is useful when you want to change the application's typography globally without modifying every component.

---

# 12. Creating Typography with `defineTypography()`

For design-system authors, Kreativ UI provides `defineTypography()`.

```ts
import {
  defineTypography,
} from "@splenddev/kreativ-ui";

const typography = {
  display: defineTypography({
    fontFamily: "{fonts.heading}",
    fontSize: "{fontSizes.4xl}",
    fontWeight: "{fontWeights.bold}",
    lineHeight: "{lineHeights.tight}",
    letterSpacing: "-0.04em",
  }),
};
```

`defineTypography()` provides a consistent definition API and ensures the typography object conforms to the expected typography structure.

It is especially useful when creating reusable theme configurations.

---

# 13. Defining Custom Tokens with `defineToken()`

Use `defineToken()` for primitive values.

```ts
import { defineToken } from "@splenddev/kreativ-ui";

const tokens = {
  fonts: {
    serif: defineToken("Georgia, serif"),
  },

  fontSizes: {
    "5xl": defineToken("3rem"),
  },

  fontWeights: {
    black: defineToken(900),
  },
};
```

These tokens can then be referenced by typography:

```ts
const typography = {
  serifDisplay: defineTypography({
    fontFamily: "{fonts.serif}",
    fontSize: "{fontSizes.5xl}",
    fontWeight: "{fontWeights.black}",
    lineHeight: "{lineHeights.tight}",
  }),
};
```

Using `defineToken()` ensures the values follow the token structure expected by the theme engine.

---

# 14. Semantic Tokens

Semantic tokens are useful when a value needs to change according to the active theme or color mode.

```ts
const tokens = {
  colors: {
    brandText: defineSemanticToken(
      "{colors.blue.700}",
      "{colors.blue.200}",
    ),
  },
};
```

Typography itself generally does not need separate light and dark definitions.

Instead, semantic tokens are most useful when typography is combined with color or other semantic styling.

For example:

```ts
const semanticTokens = {
  text: {
    primary: defineSemanticToken(
      "{colors.gray.900}",
      "{colors.gray.100}",
    ),
  },
};
```

A component can then combine typography with the semantic text color.

---

# 15. Direct CSS Values

Typography values do not have to reference tokens.

You can use literal CSS values:

```ts
const typography = {
  custom: defineTypography({
    fontFamily: "Georgia, serif",
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: 1.6,
    letterSpacing: "-0.01em",
  }),
};
```

This is useful for typography that is intentionally unique.

However, reusable design-system values should generally be represented as tokens.

---

# 16. Combining Typography with Component Overrides

Typography provides the baseline text styling, while consumers can still make one-off overrides.

For example:

```tsx
<Button
  typography="body"
  style={{
    fontWeight: 700,
  }}
>
  Continue
</Button>
```

The recommended precedence is:

```text
Component defaults
       ↓
Component size/layout
       ↓
Typography preset
       ↓
Explicit style prop
```

This means the `style` prop remains an escape hatch for application-specific cases.

Avoid using it repeatedly for values that should actually become part of your theme.

---

# 17. Creating a Typography-Aware Custom Component

A complete custom component might look like this:

```tsx
import {
  TypographyProps,
  useTypography,
} from "@splenddev/kreativ-ui";

interface CardTitleProps extends TypographyProps {
  children: React.ReactNode;
}

function CardTitle({
  typography = "headingSmall",
  children,
}: CardTitleProps) {
  const typographyStyles = useTypography(typography);

  return (
    <h3 style={typographyStyles}>
      {children}
    </h3>
  );
}
```

Usage:

```tsx
<CardTitle>
  Default title
</CardTitle>

<CardTitle typography="heading">
  Large title
</CardTitle>

<CardTitle typography="display">
  Custom display title
</CardTitle>
```

The component remains completely independent of the actual font values.

---

# 18. Using Typography Without a Preset Name

If a component needs to use typography dynamically, it can simply pass the name received from its props:

```tsx
function MyComponent({
  typography = "body",
}: TypographyProps) {
  const styles = useTypography(typography);

  return (
    <div style={styles}>
      Content
    </div>
  );
}
```

The component does not need to maintain its own list of typography styles.

This allows application-defined styles to work automatically.

---

# Runtime Theme Changes

Typography is resolved against the active theme.

For example, suppose the default theme contains:

```ts
fonts: {
  body: defineToken("Inter, sans-serif"),
}
```

and a custom theme changes it to:

```ts
fonts: {
  body: defineToken("Poppins, sans-serif"),
}
```

A typography preset referencing:

```ts
fontFamily: "{fonts.body}"
```

does not need to change.

It automatically resolves to the active token value.

```text
Typography
     ↓
{fonts.body}
     ↓
Active theme
     ↓
Poppins, sans-serif
```

This is one of the primary benefits of the token-based architecture.

---

# Recommended Typography Structure

For most applications, a semantic typography structure works well:

```ts
const typography = {
  body: {},
  bodySmall: {},

  heading: {},
  headingSmall: {},

  caption: {},

  label: {},

  code: {},

  display: {},
};
```

The exact names are completely customizable.

Avoid names such as:

```ts
small12
font14
large20
bold16
```

Prefer semantic names:

```ts
bodySmall
body
heading
caption
label
display
```

This makes the design system easier to maintain when the actual values change.

---

# Best Practices

### Prefer semantic typography names

Use:

```tsx
typography="heading"
```

instead of:

```tsx
typography="font24"
```

---

### Use tokens for reusable values

Prefer:

```ts
fontSize: "{fontSizes.md}"
```

over repeatedly writing:

```ts
fontSize: "0.875rem"
```

---

### Let the application load fonts

Kreativ UI should consume fonts rather than own the font-loading mechanism.

This allows it to work with:

* Next.js
* Vite
* Remix
* CRA
* plain React
* CSS
* local fonts
* external font providers

---

### Use `defineToken()`

Prefer:

```ts
fonts: {
  body: defineToken("Inter, sans-serif"),
}
```

over manually constructing:

```ts
fonts: {
  body: {
    value: "Inter, sans-serif",
  },
}
```

---

### Use `defineTypography()`

When creating reusable typography definitions:

```ts
heading: defineTypography({
  fontFamily: "{fonts.heading}",
  fontSize: "{fontSizes.2xl}",
  fontWeight: "{fontWeights.bold}",
  lineHeight: "{lineHeights.tight}",
})
```

This gives the definition a clear and consistent API.

---

### Use `useTypography()` in custom components

Avoid manually accessing:

```ts
theme.typography
```

inside every component.

Prefer:

```ts
const styles = useTypography("body");
```

This keeps typography resolution centralized.

---

### Keep typography separate from layout

Typography should control:

```text
fontFamily
fontSize
fontWeight
lineHeight
letterSpacing
```

Component size should control:

```text
height
padding
gap
radius
iconSize
```

This makes components more predictable.

---

# API Reference

## `useTypography()`

```ts
useTypography(name?: string): React.CSSProperties
```

Resolves a typography preset from the active theme and returns React-compatible CSS properties.

### Parameters

| Parameter | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| `name`    | `string` | Name of the typography preset |

### Example

```tsx
const styles = useTypography("heading");

return <h1 style={styles}>Hello</h1>;
```

---

## `TypographyProps`

```ts
interface TypographyProps {
  typography?: string;
}
```

Allows a component to expose the theme's typography presets through a `typography` prop.

---

## `TypographyStyle`

```ts
interface TypographyStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string;
}
```

Defines the typography properties supported by Kreativ UI.

---

## `Typography`

```ts
type Typography = Record<string, TypographyStyle>;
```

Represents the collection of named typography presets available in a theme.

---

## `defineTypography()`

```ts
defineTypography(
  typography: TypographyStyle,
): TypographyStyle
```

Defines and type-checks a typography preset.

Example:

```ts
const heading = defineTypography({
  fontFamily: "{fonts.heading}",
  fontSize: "{fontSizes.2xl}",
  fontWeight: "{fontWeights.bold}",
  lineHeight: "{lineHeights.tight}",
});
```

---

## `defineToken()`

```ts
defineToken<T>(value: T): {
  value: T;
}
```

Creates a primitive design token.

Example:

```ts
const bodyFont = defineToken(
  "Inter, sans-serif",
);
```

---

## `defineSemanticToken()`

```ts
defineSemanticToken<T>(
  light: T,
  dark: T,
): {
  value: {
    light: T;
    dark: T;
  };
}
```

Creates a theme-aware semantic token.

---

## `resolveTokenReference()`

```ts
resolveTokenReference(
  value: unknown,
  tokens: DesignTokens,
): string | number
```

Resolves a token reference such as:

```ts
"{fonts.body}"
```

against the active design-token collection.

---

## `resolveTypography()`

```ts
resolveTypography(
  typography: TypographyStyle | undefined,
  tokens: DesignTokens,
): React.CSSProperties
```

Converts a typography definition into resolved React CSS properties.

---

# Complete Example

The following example demonstrates a complete Next.js setup using `next/font`, Kreativ UI tokens, typography, and a custom component.

```tsx
import { Geist, Geist_Mono } from "next/font/google";

import {
  UIProvider,
  defineToken,
  defineTypography,
  defaultTheme,
} from "@splenddev/kreativ-ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = {
  ...defaultTheme,

  tokens: {
    ...defaultTheme.tokens,

    fonts: {
      ...defaultTheme.tokens.fonts,

      body: defineToken(
        "var(--font-geist-sans)",
      ),

      heading: defineToken(
        "var(--font-geist-sans)",
      ),

      mono: defineToken(
        "var(--font-geist-mono)",
      ),
    },
  },

  typography: {
    ...defaultTheme.typography,

    display: defineTypography({
      fontFamily: "{fonts.heading}",
      fontSize: "4rem",
      fontWeight: "{fontWeights.bold}",
      lineHeight: "1",
      letterSpacing: "-0.04em",
    }),
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <UIProvider theme={theme}>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
```

The important separation is:

```text
Next.js
  │
  └── Loads Geist
        │
        └── --font-geist-sans
                │
                ▼
        Kreativ UI font token
                │
                └── fonts.body
                        │
                        ▼
                Typography preset
                        │
                        └── typography.body
                                │
                                ▼
                        useTypography("body")
                                │
                                ▼
                        React.CSSProperties
```

This allows Kreativ UI to remain completely independent of the application's font-loading strategy while still providing a centralized, reusable, and theme-aware typography system.

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

**More component documentation (Textarea, Checkbox, RadioGroup, etc.) coming soon.**  
Visit the [GitHub repository](https://github.com/Vincentvirtuoso/kreativ-ui) for updates.
