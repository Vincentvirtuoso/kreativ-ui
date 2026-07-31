import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { buttonVariants } from "@/components/Button/Button.styles";
import type { Variant } from "@/components/Button/Button.types";
import { MailIcon, SearchIcon } from "lucide-react";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";
import { Playground } from "./shared/Playground";
import { useTheme } from "@/hooks";

type Size = "sm" | "md" | "lg";
const VARIANTS = Object.keys(buttonVariants) as Variant[];
// const SIZES: Size[] = ["sm", "md", "lg"];

export function ButtonPlayground() {
    const [variant, setVariant] = useState<Variant>("solid");
    const [size, setSize] = useState<Size>("md");
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [fullWidth, setFullWidth] = useState(false);
    const [leftIcon, setLeftIcon] = useState(false);
    const [rightIcon, setRightIcon] = useState(false);

    const { theme } = useTheme();
    const availableSizes = Object.keys(theme.sizes ?? {}) as Size[];

    const controls = (
        <>
            <SegmentedControl label="variant" value={variant} options={VARIANTS} onChange={setVariant} />
            <SegmentedControl label="size" value={size} options={availableSizes} onChange={setSize} />
            <div className="mb-5">
                <p className="mb-2 font-mono text-[11px] text-text-muted">flags</p>
                <div className="flex flex-wrap gap-1.5">
                    <Chip active={isLoading} onClick={() => setIsLoading(v => !v)}>isLoading</Chip>
                    <Chip active={disabled} onClick={() => setDisabled(v => !v)}>disabled</Chip>
                    <Chip active={fullWidth} onClick={() => setFullWidth(v => !v)}>fullWidth</Chip>
                    <Chip active={leftIcon} onClick={() => setLeftIcon(v => !v)}>leftIcon</Chip>
                    <Chip active={rightIcon} onClick={() => setRightIcon(v => !v)}>rightIcon</Chip>
                </div>
            </div>
        </>
    );

    const preview = (
        <Button
            variant={variant}
            size={size}
            isLoading={isLoading}
            disabled={disabled}
            fullWidth={fullWidth}
            leftIcon={leftIcon ? <SearchIcon className="h-4 w-4" /> : undefined}
            rightIcon={rightIcon ? <MailIcon className="h-4 w-4" /> : undefined}
        >
            Button
        </Button>
    );

    const attrLines = [
        variant !== "solid" && `variant="${variant}"`,
        size !== "md" && `size="${size}"`,
        isLoading && "isLoading",
        disabled && "disabled",
        fullWidth && "fullWidth",
        leftIcon && "leftIcon={<SearchIcon />}",
        rightIcon && "rightIcon={<MailIcon />}",
    ].filter(Boolean) as string[];

    const code = [
        `<Button`,
        attrLines.length ? `\n  ${attrLines.join("\n  ")}\n` : " ",
        `>`,
        `  Button`,
        `</Button>`,
    ].join("\n");

    const getAttributes = (el: HTMLElement | null) => ({
        disabled: el?.getAttribute("disabled") ?? null,
        "aria-busy": el?.getAttribute("aria-busy") ?? null,
        "aria-disabled": el?.getAttribute("aria-disabled") ?? null,
        type: el?.getAttribute("type") ?? null,
    });

    return (
        <Playground
            title="Button"
            description="Live props against the real component — the readout at the bottom reflects the actual DOM attributes they produced, not a simulation."
            controls={controls}
            preview={preview}
            code={code}
            getAttributes={getAttributes}
        />
    );
}