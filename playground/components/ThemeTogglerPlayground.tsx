import { useState } from "react";
import {
    THEME_TOGGLER_VARIANTS,
    ThemeToggler,
    ThemeTogglerDisplay,
    ThemeTogglerVariant,
} from "@/components/ThemeToggler";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";
import { Playground } from "./shared/Playground";
import { Orientation, Size } from "@/types";

// Define transition types (adjust import if you have a shared type)
type BaseTransition = "none" | "fade" | "rotate" | "slide" | "scale";

const SIZES: Size[] = ["xs", "sm", "md", "lg", "xl"];
const ORIENTATIONS: Orientation[] = ["horizontal", "vertical"] as const;
const DISPLAYS: ThemeTogglerDisplay[] = ["buttons", "cycle"] as const;
const TRANSITIONS: BaseTransition[] = ["none", "fade", "rotate", "slide", "scale"];

export function ThemeTogglerPlayground() {
    const [variant, setVariant] = useState<ThemeTogglerVariant>("ghost");
    const [activeVariant, setActiveVariant] = useState<ThemeTogglerVariant>("solid");
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
                    <Chip active={iconOnly} onClick={() => setIconOnly((v) => !v)}>
                        iconOnly
                    </Chip>
                    <Chip active={allowSystem} onClick={() => setAllowSystem((v) => !v)}>
                        allowSystem
                    </Chip>
                    <Chip active={rounded} onClick={() => setRounded((v) => !v)}>
                        rounded
                    </Chip>
                    <Chip active={unstyled} onClick={() => setUnstyled((v) => !v)}>
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
            size={size}
            iconOnly={iconOnly}
            allowSystem={allowSystem}
            orientation={orientation}
            rounded={rounded}
            unstyled={unstyled}
            display={display}
            transition={transition !== "none" ? { type: transition } : undefined}
        />
    );

    const attrLines = [
        variant !== "ghost" && `variant="${variant}"`,
        activeVariant !== "solid" && `activeVariant="${activeVariant}"`,
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
        `<ThemeToggler`,
        attrLines.length ? `\n  ${attrLines.join("\n  ")}\n` : " ",
        `/>`,
    ].join("\n");

    const getAttributes = (el: HTMLElement | null) => {
        const button = el?.querySelector("button");
        return {
            disabled: button?.getAttribute("disabled") ?? null,
            "aria-pressed": button?.getAttribute("aria-pressed") ?? null,
            type: button?.getAttribute("type") ?? null,
        };
    };

    return (
        <Playground
            title="ThemeToggler"
            description="Live props against the real component — the readout at the bottom reflects the actual DOM attributes they produced, not a simulation."
            controls={controls}
            preview={preview}
            code={code}
            getAttributes={getAttributes}
        />
    );
}