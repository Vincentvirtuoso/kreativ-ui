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