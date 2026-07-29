# Kreativ UI

A modern, themeable React component library built with **React**, **Tailwind CSS v4**, and **CSS Variables**.

Kreativ UI provides a runtime theme engine, allowing colors, typography, radius, animations, and component styles to be customized **without rebuilding CSS**.

---

## ✨ Features

* 🎨 Runtime theme switching
* 🌙 Light, dark and system modes
* ⚡ Tailwind CSS v4 integration
* 🎯 CSS Variable powered design tokens
* 🧩 Component-level theme overrides
* 🎭 Built-in animation utilities
* 📦 Tree-shakeable
* ♿ Accessible component APIs
* 💪 Fully typed with TypeScript

---

## 📦 Installation

```bash
npm install kreativ-ui
```

Import the stylesheet once.

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

Wrap your application once.

```tsx
<UIProvider defaultMode="system">
  <App />
</UIProvider>
```

### Available Modes

* `"light"`
* `"dark"`
* `"system"`

Switch themes anywhere.

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

Override only what you need.

```tsx
<UIProvider
  theme={{
    light: {
      colors: {
        brand: "16 185 129",
      },
    },
    dark: {
      colors: {
        brand: "52 211 153",
      },
    },
  }}
>
  <App />
</UIProvider>
```

---

# Theme Tokens

## Colors

```
brand
brandHover
brandFg

surface
surfaceRaised
surfaceSunken

border

text
textMuted

danger
dangerFg

destructive
destructiveHover
destructiveFg

success
successHover
successFg

warning
warningHover
warningFg

info
infoHover
infoFg
```

## Radius

```ts
radius
```

## Typography

```ts
font
```

## Motion

```ts
durationFast
durationNormal
durationSlow

easeDefault
easeIn
easeOut
```

---

# Components

## Button

```tsx
<Button>
  Click me
</Button>
```

### Variants

```tsx
<Button variant="solid" />
<Button variant="outline" />
<Button variant="ghost" />
<Button variant="soft" />
```

### Sizes

```tsx
<Button size="xs" />
<Button size="sm" />
<Button size="md" />
<Button size="lg" />
```

### Loading

```tsx
<Button loading>
  Saving...
</Button>
```

### Disabled

```tsx
<Button disabled>
  Submit
</Button>
```

---

# Built-in Animations

Tailwind animation utilities are included.

```tsx
<div className="animate-kui-fade-in" />
```

### Available Animations

```
animate-kui-spin

animate-kui-fade-in
animate-kui-fade-out

animate-kui-scale-in
animate-kui-scale-out

animate-kui-slide-up
animate-kui-slide-down
animate-kui-slide-left
animate-kui-slide-right

animate-kui-bounce
animate-kui-pulse
animate-kui-ping

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
│   └── Button/
│       ├── Button.tsx
│       ├── Button.styles.ts
│       ├── Button.types.ts
│       └── index.ts
│
├── context/
├── hooks/
├── styles/
├── theme/
├── types/
├── utils/
│
└── index.ts
```

---

# Creating a New Component

Every component follows the same structure.

```
Component/
├── Component.tsx
├── Component.styles.ts
├── Component.types.ts
└── index.ts
```

Guidelines:

1. Define the component props in `*.types.ts`.
2. Define reusable style maps in `*.styles.ts`.
3. Read component theme overrides using `useTheme()`.
4. Merge styles using your `cn()` utility.
5. Export the component and its types from `index.ts`.

---

# Development

Install dependencies.

```bash
npm install
```

Run the playground.

```bash
npm run dev
```

Build the library.

```bash
npm run build
```

Run type checking.

```bash
npm run typecheck
```

---

# Publishing

```bash
npm version patch
npm run build
npm publish
```

---

# Roadmap

## Core

* ✅ Runtime theme engine
* ✅ CSS variable tokens
* ✅ Light / Dark / System modes
* ✅ Tailwind v4 integration
* ✅ Animation utilities
* ✅ Button

## Form

* ⏳ Input
* ⏳ Textarea
* ⏳ Select
* ⏳ Checkbox
* ⏳ Radio
* ⏳ Switch
* ⏳ Slider
* ⏳ Combobox

## Feedback

* ⏳ Alert
* ⏳ Toast
* ⏳ Progress
* ⏳ Spinner
* ⏳ Skeleton

## Data Display

* ⏳ Badge
* ⏳ Avatar
* ⏳ Card
* ⏳ Table
* ⏳ Data Grid

## Navigation

* ⏳ Tabs
* ⏳ Accordion
* ⏳ Breadcrumb
* ⏳ Pagination

## Overlay

* ⏳ Dialog
* ⏳ Drawer
* ⏳ Popover
* ⏳ Tooltip
* ⏳ Dropdown Menu

