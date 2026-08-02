# Kreativ UI

A modern, themeable React component library built with **React**, **Tailwind CSS v4**, and **CSS Variables**.

Kreativ UI provides a runtime theme engine, allowing colors, typography, radius, animations, and component styles to be customized **without rebuilding CSS**.

---

## ✨ Features

* 🎨 Runtime theme switching (light, dark, system)
* 🌙 Built‑in `ThemeToggler` with optional animated icon transitions
* ⚡ Tailwind CSS v4 integration
* 🎯 CSS Variable powered design tokens
* 🧩 Component‑level theme overrides
* 🎭 Built‑in animation utilities (spin, fade, scale, slide, bounce, pulse, shimmer, and more)
* ♿ Fully accessible (ARIA, keyboard navigation, focus management)
* 📦 Tree‑shakable and TypeScript‑first
* 🧩 Smart form components: `Input` with **kind** defaults, `FormField` with automatic ARIA wiring

---

## 📦 Installation

```bash
npm install kreativ-ui
```

Import the stylesheet **once** in your application entry.

```tsx
import "kreativ-ui/styles.css";
```

---

## 🚀 Quick Start

```tsx
import { Button, UIProvider } from "kreativ-ui";
import "kreativ-ui/styles.css";

export default function App() {
  return (
    <UIProvider defaultMode="system">
      <Button>Click me</Button>
    </UIProvider>
  );
}
```

---

# Theme Provider

Wrap your application with `UIProvider` to enable theme context.

```tsx
<UIProvider defaultMode="system">
  <App />
</UIProvider>
```

### Available Modes

* `"light"`
* `"dark"`
* `"system"` (follows OS preference)

Switch themes anywhere using the `useTheme` hook.

```tsx
import { useTheme } from "kreativ-ui";

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

# Custom Themes

Override only the tokens you need. Pass a `theme` object to `UIProvider`.

```tsx
<UIProvider
  theme={{
    light: {
      colors: {
        brand: "16 185 129",   // emerald-600
        brandFg: "255 255 255",
      },
    },
    dark: {
      colors: {
        brand: "52 211 153",   // emerald-400
        brandFg: "0 0 0",
      },
    },
    radius: "0.75rem",
    font: "'Inter', sans-serif",
  }}
>
  <App />
</UIProvider>
```

All CSS variables are generated automatically and applied to the `<html>` element.

---

# Theme Tokens

## Colors

| Token | Description |
|-------|-------------|
| `brand` | Primary accent color (RGB values) |
| `brandHover` | Hover state of brand |
| `brandFg` | Foreground (text/icon) on brand |
| `surface` | Background of surfaces |
| `surfaceRaised` | Elevated surfaces (cards, modals) |
| `surfaceSunken` | Sunken surfaces (inputs, inset) |
| `border` | Default border color |
| `text` | Primary text |
| `textMuted` | Secondary / muted text |
| `danger` | Error/danger color |
| `dangerFg` | Foreground on danger |
| `destructive` / `destructiveHover` / `destructiveFg` | Destructive actions |
| `success` / `successHover` / `successFg` | Success states |
| `warning` / `warningHover` / `warningFg` | Warning states |
| `info` / `infoHover` / `infoFg` | Informational states |

## Radius

```ts
radius   // default: 0.375rem (6px)
```

## Typography

```ts
font     // font-family stack
```

## Motion

```ts
durationFast    // 150ms
durationNormal  // 300ms
durationSlow    // 500ms

easeDefault     // ease-in-out
easeIn          // ease-in
easeOut         // ease-out
```

---

# Components

## Button

A versatile button with variant, size, loading, and icon support.

### Basic Usage

```tsx
<Button>Click me</Button>
```

### Variants

```tsx
<Button variant="solid" />
<Button variant="outline" />
<Button variant="ghost" />
<Button variant="soft" />
<Button variant="destructive" />
<Button variant="success" />
<Button variant="link" />
```

### Sizes

```tsx
<Button size="xs" />
<Button size="sm" />
<Button size="md" />
<Button size="lg" />
<Button size="xl" />   {/* custom size via theme */}
```

### Loading State

```tsx
<Button isLoading>Save</Button>
```

### Disabled

```tsx
<Button disabled>Submit</Button>
```

### Icons

```tsx
<Button leftIcon={<SearchIcon />}>Search</Button>
<Button rightIcon={<ArrowRightIcon />}>Next</Button>
```

### Full Width

```tsx
<Button fullWidth>Full width</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `Variant` | `"solid"` | Visual style |
| `size` | `SizeValue` | `"md"` | Size (supports custom sizes via theme) |
| `isLoading` | `boolean` | `false` | Shows spinner and disables |
| `leftIcon` / `rightIcon` | `ReactNode` | — | Icon elements |
| `fullWidth` | `boolean` | `false` | Stretches to container width |
| `disabled` | `boolean` | `false` | Disables interactions |

---

## ThemeToggler

A ready‑to‑use theme switcher that integrates with `UIProvider`. Supports button‑style or cycle‑style (single button with animated icon transitions).

### Basic Usage

```tsx
import { ThemeToggler } from "kreativ-ui";

<ThemeToggler />
```

### With System Mode

```tsx
<ThemeToggler allowSystem />
```

### Icon Only

```tsx
<ThemeToggler iconOnly allowSystem />
```

### Custom Variants

```tsx
<ThemeToggler variant="outline" activeVariant="solid" />
```

### Vertical Layout

```tsx
<ThemeToggler orientation="vertical" allowSystem />
```

### Custom Labels

```tsx
<ThemeToggler
  allowSystem
  labels={{ light: "Day", dark: "Night", system: "Auto" }}
/>
```

### Custom Icons

```tsx
import { SunMedium, MoonStar, LaptopMinimal } from "lucide-react";

<ThemeToggler
  allowSystem
  icons={{
    light: <SunMedium size={18} />,
    dark: <MoonStar size={18} />,
    system: <LaptopMinimal size={18} />,
  }}
/>
```

### Cycle Mode with Animation

```tsx
<ThemeToggler
  display="cycle"
  allowSystem
  transition={{ type: "rotate", duration: 400, easing: "ease-in-out" }}
/>
```

Supported transition types: `"none"`, `"fade"`, `"slide"`, `"scale"`, `"rotate"`.

### Styling

```tsx
<ThemeToggler rounded={false} unstyled />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ThemeTogglerVariant` | `"ghost"` | Variant for inactive buttons |
| `activeVariant` | `ThemeTogglerVariant` | `"solid"` | Variant for active button |
| `size` | `SizeValue` | `"sm"` | Button size |
| `iconOnly` | `boolean` | `false` | Hide labels, show icons only |
| `allowSystem` | `boolean` | `false` | Show system theme option |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `rounded` | `boolean` | `true` | Rounded container corners |
| `unstyled` | `boolean` | `false` | Remove wrapper styles |
| `display` | `"buttons" \| "cycle"` | `"buttons"` | Show all buttons or a single cycling button |
| `transition` | `ThemeTogglerTransition` | `{ type: "none", duration: 300, easing: "ease-in-out" }` | Animation configuration for cycle mode |
| `labels` | `Partial<Record<"light" \| "dark" \| "system", string>>` | — | Override labels |
| `icons` | `Partial<Record<"light" \| "dark" \| "system", ReactNode>>` | — | Override icons |
| `buttonProps` | `Partial<ButtonProps>` | — | Props passed to every internal button |
| `className` | `string` | — | Additional wrapper class |

---

## Input

A flexible text input with variants, sizes, validation states, adornments, and **kind‑aware defaults** for common field types. Built to work seamlessly with `FormField`.

### Basic Usage

```tsx
import { Input } from "kreativ-ui";

<Input placeholder="you@company.com" />
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

### Validation States

```tsx
<Input error />
<Input success />
```

### Adornments

```tsx
<Input startAdornment={<SearchIcon />} />
<Input endAdornment={<MailIcon />} />
```

### Loading State

Shows a spinner and makes the field read‑only (not disabled) while a request is in flight.

```tsx
<Input isLoading />
```

### Clearable

Adds an internal clear button that appears when the field has a value.

```tsx
<Input clearable onClear={() => console.log("cleared")} />
```

### Kind

Sets sensible defaults for `type`, `inputMode`, `autoComplete`, `placeholder`, and optionally a default icon. Any explicit prop overrides the kind default.

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

### Rounded

```tsx
<Input rounded />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"outline" \| "filled" \| "ghost"` | `"outline"` | Visual style |
| `inputSize` | `"sm" \| "md" \| "lg"` | `"md"` | Height, padding, font size |
| `kind` | `InputKind` | `"text"` | Sets defaults for `type`, `inputMode`, `autoComplete`, placeholder, and icon |
| `hideKindIcon` | `boolean` | `false` | Suppress the default icon from `kind` |
| `error` | `boolean` | `false` | Danger styling and `aria-invalid` |
| `success` | `boolean` | `false` | Success styling |
| `rounded` | `boolean` | `false` | Fully rounded wrapper |
| `fullWidth` | `boolean` | `true` | Stretch to container width |
| `isLoading` | `boolean` | `false` | Shows spinner and marks read‑only |
| `clearable` | `boolean` | `false` | Shows clear button when value present |
| `onClear` | `() => void` | — | Called after clear |
| `startAdornment` / `endAdornment` | `ReactNode` | — | Content before/after input |
| `className` / `inputClassName` | `string` | — | Additional class(es) |

All standard `<input>` attributes (except `size`) are forwarded.

---

## FormField

Wraps a form control (e.g., `Input`) and automatically wires `id`, `aria-describedby`, `aria-invalid`, and `aria-required` — no manual id‑juggling.

### Basic Usage

```tsx
import { FormField, Input } from "kreativ-ui";

<FormField label="Email address">
  <Input kind="email" />
</FormField>
```

### With Description

```tsx
<FormField
  label="Email address"
  description="We'll only use this to send receipts."
>
  <Input kind="email" />
</FormField>
```

### With Error

Error replaces description when both are provided.

```tsx
<FormField
  label="Email address"
  error="Enter a valid email address."
>
  <Input kind="email" error />
</FormField>
```

### Required

```tsx
<FormField label="Email address" required>
  <Input kind="email" required />
</FormField>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text, linked to control |
| `description` | `string` | — | Helper text (hidden when `error` set) |
| `error` | `string` | — | Error message, linked via `aria-describedby` |
| `required` | `boolean` | `false` | Shows required indicator and sets `aria-required` |
| `id` | `string` | auto‑generated | Explicit `id` for the control |
| `className` | `string` | — | Additional wrapper classes |
| `children` | `ReactNode` | — | The form control (must accept `id` prop) |

---

# Select

A fully accessible, customizable select component with keyboard navigation, grouped options, clearable selections, and optional integration with `FormField`.

## Features

- ♿ Accessible (ARIA-compliant combobox)
- ⌨️ Full keyboard navigation
- 🎨 Multiple variants and sizes
- 🧩 Compound component API
- 📝 Works standalone or inside `FormField`
- ❌ Clearable selections
- ✅ Error and success states
- 🔒 Disabled state
- 🎯 Controlled and uncontrolled modes
- 📦 Hidden input support for HTML forms

---

## Import

```tsx
import { Select } from "@kreativ-ui/react";
```

---

## Basic Usage

```tsx
<Select placeholder="Select a country">
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        <Select.Item value="ng">Nigeria</Select.Item>
        <Select.Item value="gh">Ghana</Select.Item>
        <Select.Item value="za">South Africa</Select.Item>
    </Select.Content>
</Select>
```

---

## Controlled

```tsx
const [value, setValue] = useState("");

<Select
    value={value}
    onValueChange={setValue}
>
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        <Select.Item value="react">React</Select.Item>
        <Select.Item value="vue">Vue</Select.Item>
        <Select.Item value="svelte">Svelte</Select.Item>
    </Select.Content>
</Select>
```

---

## Uncontrolled

```tsx
<Select defaultValue="react">
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        <Select.Item value="react">React</Select.Item>
        <Select.Item value="vue">Vue</Select.Item>
        <Select.Item value="angular">Angular</Select.Item>
    </Select.Content>
</Select>
```

---

## Placeholder

```tsx
<Select placeholder="Choose an option">
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        ...
    </Select.Content>
</Select>
```

---

## Clearable

```tsx
<Select clearable defaultValue="react">
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        ...
    </Select.Content>
</Select>
```

---

## Disabled

```tsx
<Select disabled>
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        ...
    </Select.Content>
</Select>
```

---

## Validation States

### Error

```tsx
<Select error>
    ...
</Select>
```

### Success

```tsx
<Select success>
    ...
</Select>
```

When used inside a `FormField`, the validation state is inherited automatically.

```tsx
<FormField invalid>
    <Select>
        ...
    </Select>
</FormField>
```

Explicit `error` always takes precedence over inherited state.

---

## Variants

```tsx
<Select variant="outline" />
<Select variant="filled" />
<Select variant="ghost" />
```

---

## Sizes

```tsx
<Select size="sm" />
<Select size="md" />
<Select size="lg" />
```

---

## Option Groups

```tsx
<Select>
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        <Select.Group>
            <Select.Label>Frontend</Select.Label>

            <Select.Item value="react">
                React
            </Select.Item>

            <Select.Item value="vue">
                Vue
            </Select.Item>
        </Select.Group>

        <Select.Group>
            <Select.Label>Backend</Select.Label>

            <Select.Item value="node">
                Node.js
            </Select.Item>

            <Select.Item value="go">
                Go
            </Select.Item>
        </Select.Group>
    </Select.Content>
</Select>
```

---

## Form Integration

Works with native HTML forms.

```tsx
<Select
    name="framework"
    defaultValue="react"
>
    ...
</Select>
```

A hidden input is rendered automatically.

---

## React Hook Form

```tsx
<Controller
    control={control}
    name="framework"
    render={({ field }) => (
        <Select
            value={field.value}
            onValueChange={field.onChange}
        >
            <Select.Trigger>
                <Select.Value />
            </Select.Trigger>

            <Select.Content>
                ...
            </Select.Content>
        </Select>
    )}
/>
```

---

## Keyboard Support

| Key | Action |
|------|--------|
| ↑ | Previous option |
| ↓ | Next option |
| Enter | Select highlighted option |
| Space | Open / Select option |
| Home | First option |
| End | Last option |
| Esc | Close dropdown |
| Backspace | Clear selection (when `clearable`) |
| Delete | Clear selection (when `clearable`) |

---

# API

## Select

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | — | Controlled value |
| defaultValue | string | — | Initial value |
| onValueChange | `(value?: string) => void` | — | Called when value changes |
| placeholder | string | — | Placeholder text |
| clearable | boolean | false | Allows clearing the selection |
| disabled | boolean | false | Disables the component |
| required | boolean | false | Marks the field as required |
| name | string | — | Hidden input name |
| variant | Variant | `"outline"` | Visual style |
| size | Size | `"md"` | Component size |
| error | boolean | false | Shows error state |
| success | boolean | false | Shows success state |
| className | string | — | Additional classes |

---

## Select.Trigger

The interactive trigger that opens the dropdown.

---

## Select.Value

Displays the selected option or placeholder.

---

## Select.Content

Container for dropdown items.

---

## Select.Item

| Prop | Type | Description |
|------|------|-------------|
| value | string | Item value |
| disabled | boolean | Disables the option |

---

## Select.Group

Groups related options.

---

## Select.Label

Heading for a group of options.

---

## Accessibility

- Uses the WAI-ARIA Combobox pattern
- Supports screen readers
- Keyboard accessible
- Focus management
- Proper ARIA attributes
- Native form submission support

---

## Component Structure

```tsx
<Select>
    <Select.Trigger>
        <Select.Value />
    </Select.Trigger>

    <Select.Content>
        <Select.Group>
            <Select.Label />
            <Select.Item />
        </Select.Group>
    </Select.Content>
</Select>
```

---

## Textarea

A flexible textarea with variant, size, auto‑resize, character counter, validation, clearable, and `FormField` integration.

### Basic Usage

```tsx
import { Textarea } from "kreativ-ui";

<Textarea placeholder="Write a message..." />
```

### Variants

The `variant` prop controls the visual style of the textarea wrapper.

```tsx
<Textarea variant="outline" />
<Textarea variant="filled" />
<Textarea variant="ghost" />
```

### Sizes

```tsx
<Textarea size="sm" />
<Textarea size="md" />
<Textarea size="lg" />
```

### Resize Behavior

```tsx
<Textarea resize="both" />
<Textarea resize="none" />
<Textarea resize="horizontal" />
<Textarea resize="vertical" />  // default
```

### Auto Resize

```tsx
<Textarea autoResize minRows={2} maxRows={6} />
```

### Character Counter

```tsx
<Textarea characterCounter maxLength={200} />
```

### Clearable

```tsx
<Textarea clearable onClear={() => console.log("cleared")} />
```

### Validation

```tsx
<Textarea
  onValidate={(value) => value.length >= 3 || "Must be at least 3 characters"}
/>
```

### Trim on Blur

```tsx
<Textarea trimOnBlur />
```

### With FormField

```tsx
<FormField label="Message" required>
  <FormField.Control>
    <Textarea
      placeholder="Your message..."
      characterCounter
      maxLength={500}
    />
  </FormField.Control>
</FormField>
```

### Props (Textarea)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | InputVariant | `"outline"` | Visual style of the wrapper |
| `size` | InputSize | `"md"` | Height, padding, font size |
| `fullWidth` | `boolean` | `true` | Stretch to container width |
| `resize` | `"none" \| "both" \| "horizontal" \| "vertical"` | `"vertical"` | CSS `resize` behavior |
| `autoResize` | `boolean` | `false` | Automatically grow/shrink with content |
| `minRows` | `number` | — | Minimum rows (when `autoResize` is `true`) |
| `maxRows` | `number` | — | Maximum rows (when `autoResize` is `true`) |
| `clearable` | `boolean` | `false` | Shows a clear button when value is present |
| `onClear` | `() => void` | — | Called after clear |
| `characterCounter` | `boolean` | `false` | Shows character count and optional `maxLength` |
| `trimOnBlur` | `boolean` | `false` | Trim whitespace on blur |
| `error` | `boolean` | `false` | Danger styling and `aria-invalid` |
| `success` | `boolean` | `false` | Success styling |
| `disabled` | `boolean` | `false` | Disables the textarea |
| `required` | `boolean` | `false` | Marks as required and sets `aria-required` |
| `onValidate` | `(value: string) => boolean \| string` | — | Custom validation, returns `true` (valid), `false` (invalid), or a string (error message) |
| `value` / `defaultValue` | `string` | — | Controlled / uncontrolled value |
| `onChange` / `onBlur` | `(event) => void` | — | Standard event handlers |

```
All standard `<textarea>` attributes (except `size`) are forwarded.

```

---

### Updated README (Checkbox section only – drop‑in)

```markdown
## Checkbox

A customizable checkbox with label, description, validation states, and support for indeterminate state. Works seamlessly with `FormField` for automatic ARIA wiring.

### Basic Usage

```tsx
import { Checkbox } from "kreativ-ui";

<Checkbox label="Accept terms" />
```

### Sizes

```tsx
<Checkbox size="sm" />
<Checkbox size="md" />
<Checkbox size="lg" />
```

### Validation States

```tsx
<Checkbox error />
<Checkbox success />
```

### Indeterminate

```tsx
<Checkbox indeterminate />
```

### With Description

```tsx
<Checkbox
  label="Accept terms"
  description="You must agree to continue."
/>
```

### Disabled & Required

```tsx
<Checkbox disabled required />
```

### With FormField

```tsx
<FormField error="This field is required" required>
  <Checkbox label="I agree to the terms" />
</FormField>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Callback when checked state changes |
| `indeterminate` | `boolean` | `false` | Visually indeterminate state (parent checkbox) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the box |
| `error` | `boolean` | `false` | Danger styling and `aria-invalid` |
| `success` | `boolean` | `false` | Success styling |
| `disabled` | `boolean` | `false` | Disables the checkbox |
| `required` | `boolean` | `false` | Sets `aria-required` |
| `label` | `ReactNode` | — | Label text or element (wired to input via `htmlFor`) |
| `description` | `ReactNode` | — | Help text, wired via `aria-describedby` |
| `className` | `string` | — | Additional wrapper class |

All standard `<input type="checkbox">` attributes (except `type`, `size`, `checked`, `defaultChecked`) are forwarded.

---

## RadioGroup & Radio

A controlled group of radio buttons with labels, descriptions, validation states, and support for horizontal/vertical orientation. `RadioGroup` manages the selected value and shared props; `Radio` items are its children.

### Basic Usage

```tsx
import { RadioGroup, Radio } from "kreativ-ui";

function App() {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  );
}
```

### With Descriptions

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1" label="Option 1" description="First choice" />
  <Radio value="option2" label="Option 2" description="Second choice" />
</RadioGroup>
```

### Sizes

```tsx
<RadioGroup size="sm">...</RadioGroup>
<RadioGroup size="md">...</RadioGroup>
<RadioGroup size="lg">...</RadioGroup>
```

### Orientation

```tsx
<RadioGroup orientation="horizontal">
  <Radio value="opt1" label="Option 1" />
  <Radio value="opt2" label="Option 2" />
</RadioGroup>
```

### Validation States

```tsx
<RadioGroup error>...</RadioGroup>
<RadioGroup success>...</RadioGroup>
```

### Disabled & Required

```tsx
<RadioGroup disabled required>...</RadioGroup>
```

### With FormField

```tsx
<FormField label="Choose your preference" error="Please select an option" required>
  <RadioGroup value={value} onValueChange={setValue}>
    <Radio value="opt1" label="Option 1" />
    <Radio value="opt2" label="Option 2" />
  </RadioGroup>
</FormField>
```

### Individual Radio Disabling

You can also disable individual radios via the `disabled` prop on `Radio`, which overrides the group’s `disabled` state for that item.

```tsx
<RadioGroup disabled={false}>
  <Radio value="opt1" label="Enabled" />
  <Radio value="opt2" label="Disabled" disabled />
</RadioGroup>
```

### Props (RadioGroup)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Uncontrolled initial value |
| `onValueChange` | `(value: string) => void` | — | Callback when selection changes |
| `name` | `string` | auto‑generated | Shared `name` for all radio inputs |
| `disabled` | `boolean` | `false` | Disables all radios in the group |
| `required` | `boolean` | `false` | Sets `aria-required` on the group |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Layout direction |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of all radio bubbles |
| `error` | `boolean` | `false` | Danger styling and `aria-invalid` |
| `success` | `boolean` | `false` | Success styling |
| `className` | `string` | — | Additional wrapper class |
| `children` | `ReactNode` | — | `Radio` components |

### Props (Radio)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique value for this option |
| `disabled` | `boolean` | `false` | Disables this specific radio |
| `label` | `ReactNode` | — | Label text or element |
| `description` | `ReactNode` | — | Help text, wired via `aria-describedby` |
| `className` | `string` | — | Additional wrapper class |

All standard `<input type="radio">` attributes (except `type`, `size`, `checked`, `defaultChecked`, `onChange`, `name`, `value`) are forwarded to the underlying `<input>`.
```

---

### Updated Roadmap (Form section)

```markdown
## Form
- ✅ Input (with kind, clearable, loading, adornments)
- ✅ Select (compound, groups, clearable)
- ✅ Textarea (auto‑resize, counter, validation)
- ✅ Checkbox (indeterminate, label, description)
- ✅ RadioGroup (horizontal/vertical, validation)
- ✅ FormField (automatic ARIA wiring)
- ⏳ Switch
- ⏳ Slider
- ⏳ Combobox
```

---

# Built-in Animations

Kreativ UI includes Tailwind‑compatible animation utilities.

```tsx
<div className="animate-kui-fade-in" />
```

### Available Animations

```
animate-kui-spin
animate-kui-pulse
animate-kui-ping
animate-kui-bounce

animate-kui-fade-in
animate-kui-fade-out

animate-kui-scale-in
animate-kui-scale-out

animate-kui-slide-up
animate-kui-slide-down
animate-kui-slide-left
animate-kui-slide-right

animate-kui-shake

animate-kui-expand
animate-kui-collapse

animate-kui-shimmer
```

---

# Project Structure

```
src/
│
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Input/
│   │   └── ...
│   ├── FormField/
│   │   └── ...
│   └── ThemeToggler/
│       └── ...
│
├── context/          (UIProvider, ThemeContext)
├── hooks/            (useTheme, useSizeStyle)
├── styles/           (base CSS, animation utilities)
├── theme/            (default tokens, color schemas)
├── types/            (shared types: Size, Variant, etc.)
├── utils/            (cn, merge, etc.)
│
└── index.ts
```

---

# Creating a New Component

Every component follows the same pattern:

```
Component/
├── Component.tsx
├── Component.styles.ts
├── Component.types.ts
└── index.ts
```

Guidelines:

1. **Types** – Define props and style maps in `*.types.ts`.
2. **Styles** – Define reusable `cn` style maps in `*.styles.ts`.
3. **Component** – Use `useTheme()` to merge component overrides. Merge styles with `cn()`.
4. **Exports** – Export the component and its types from `index.ts`.

---

# Development

```bash
npm install        # install dependencies
npm run dev        # start playground (Vite)
npm run build      # build the library
npm run typecheck  # run TypeScript type checking
```

---

# Publishing

```bash
npm version patch  # or minor/major
npm run build
npm publish
```

---

# Roadmap

## Core
- ✅ Runtime theme engine
- ✅ CSS variable tokens
- ✅ Light / Dark / System modes
- ✅ Tailwind v4 integration
- ✅ Animation utilities
- ✅ ThemeToggler with transitions

## Form
- ✅ Input (with kind, clearable, loading, adornments)
- ✅ FormField (automatic ARIA wiring)
- ⏳ Textarea
- ⏳ Select
- ⏳ Checkbox
- ⏳ Radio
- ⏳ Switch
- ⏳ Slider
- ⏳ Combobox

## Feedback
- ⏳ Alert
- ⏳ Toast
- ⏳ Progress
- ⏳ Spinner
- ⏳ Skeleton

## Data Display
- ⏳ Badge
- ⏳ Avatar
- ⏳ Card
- ⏳ Table
- ⏳ Data Grid

## Navigation
- ⏳ Tabs
- ⏳ Accordion
- ⏳ Breadcrumb
- ⏳ Pagination

## Overlay
- ⏳ Dialog
- ⏳ Drawer
- ⏳ Popover
- ⏳ Tooltip
- ⏳ Dropdown Menu

---

Happy building with **Kreativ UI**! 🎨✨