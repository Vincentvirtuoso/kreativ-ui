import { useState } from "react";

import {
  ThemeToggler,
  ThemeTogglerColor,
  type ThemeTogglerDisplay,
  type ThemeTogglerVariant,
} from "@/components/ThemeToggler";

import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";
import { Playground } from "./shared/Playground";

import type { BaseTransition, Orientation, Size } from "@/types";

const SIZES: Size[] = ["xs", "sm", "md", "lg", "xl"];

const ORIENTATIONS: Orientation[] = ["horizontal", "vertical"];

const DISPLAYS: ThemeTogglerDisplay[] = ["buttons", "cycle"];

const THEME_TOGGLER_VARIANTS: ThemeTogglerVariant[] = [
  "solid",
  "outline",
  "ghost",
  "soft",
];

const COLORS: ThemeTogglerColor[] = ["brand", "neutral"];

const TRANSITIONS: BaseTransition[] = [
  "none",
  "fade",
  "rotate",
  "slide",
  "scale",
];

export function ThemeTogglerPlayground() {
  const [variant, setVariant] = useState<ThemeTogglerVariant>("ghost");

  const [activeVariant, setActiveVariant] =
    useState<ThemeTogglerVariant>("solid");

  const [color, setColor] = useState<ThemeTogglerColor>("brand");

  const [activeColor, setActiveColor] = useState<ThemeTogglerColor>("brand");

  const [size, setSize] = useState<Size>("sm");

  const [iconOnly, setIconOnly] = useState(false);

  const [allowSystem, setAllowSystem] = useState(false);

  const [orientation, setOrientation] = useState<Orientation>("horizontal");

  const [rounded, setRounded] = useState(false);

  const [unstyled, setUnstyled] = useState(false);

  const [display, setDisplay] = useState<ThemeTogglerDisplay>("buttons");

  const [transition, setTransition] = useState<BaseTransition>("none");

  const controls = (
    <>
      <div className="flex gap-4 flex-wrap justify-between">
        <SegmentedControl
          label="variant"
          value={variant}
          options={THEME_TOGGLER_VARIANTS}
          onChange={setVariant}
        />

        <SegmentedControl
          label="activeVariant"
          value={activeVariant}
          options={THEME_TOGGLER_VARIANTS}
          onChange={setActiveVariant}
        />
      </div>
      <div className="flex gap-4 flex-wrap justify-between">
        <SegmentedControl
          label="color"
          value={color}
          options={COLORS}
          onChange={setColor}
        />

        <SegmentedControl
          label="activeColor"
          value={activeColor}
          options={COLORS}
          onChange={setActiveColor}
        />
      </div>

      <SegmentedControl
        label="size"
        value={size}
        options={SIZES}
        onChange={setSize}
      />

      <SegmentedControl
        label="orientation"
        value={orientation}
        options={ORIENTATIONS}
        onChange={setOrientation}
      />

      <SegmentedControl
        label="display"
        value={display}
        options={DISPLAYS}
        onChange={setDisplay}
      />

      {display === "cycle" && (
        <SegmentedControl
          label="transition"
          value={transition}
          options={TRANSITIONS}
          onChange={setTransition}
        />
      )}

      <div className="mb-5">
        <p className="mb-2 font-mono text-[11px] text-text-muted">flags</p>

        <div className="flex flex-wrap gap-1.5">
          <Chip
            active={iconOnly}
            onClick={() => setIconOnly((value) => !value)}
          >
            iconOnly
          </Chip>

          <Chip
            active={allowSystem}
            onClick={() => setAllowSystem((value) => !value)}
          >
            allowSystem
          </Chip>

          <Chip active={rounded} onClick={() => setRounded((value) => !value)}>
            rounded
          </Chip>

          <Chip
            active={unstyled}
            onClick={() => setUnstyled((value) => !value)}
          >
            unstyled
          </Chip>
        </div>
      </div>
    </>
  );

  const preview = (
    <ThemeToggler
      variant={variant}
      activeVariant={activeVariant}
      color={color}
      activeColor={activeColor}
      size={size}
      iconOnly={iconOnly}
      allowSystem={allowSystem}
      orientation={orientation}
      rounded={rounded}
      unstyled={unstyled}
      display={display}
      transition={transition === "none" ? undefined : { type: transition }}
    />
  );

  const attrLines = [
    variant !== "ghost" && `variant="${variant}"`,

    activeVariant !== "solid" && `activeVariant="${activeVariant}"`,

    color !== "brand" && `color="${color}"`,

    activeColor !== "brand" && `activeColor="${activeColor}"`,

    size !== "sm" && `size="${size}"`,

    iconOnly && "iconOnly",

    allowSystem && "allowSystem",

    orientation !== "horizontal" && `orientation="${orientation}"`,

    rounded && "rounded",

    unstyled && "unstyled",

    display !== "buttons" && `display="${display}"`,

    transition !== "none" && `transition={{ type: "${transition}" }}`,
  ].filter(Boolean) as string[];

  const code = [
    "<ThemeToggler",
    attrLines.length ? `\n  ${attrLines.join("\n  ")}\n` : " ",
    "/>",
  ].join("\n");

  return (
    <Playground
      title="ThemeToggler"
      description="Live props against the real component — the readout at the bottom reflects the actual DOM attributes they produced, not a simulation."
      controls={controls}
      preview={preview}
      code={code}
    />
  );
}
