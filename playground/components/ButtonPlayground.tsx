import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { MailIcon, PlusIcon, SearchIcon } from "lucide-react";
import { SegmentedControl } from "./shared/SegmentedControl";
import { Chip } from "./shared/Chip";
import { Playground } from "./shared/Playground";
import { useTheme } from "@/hooks";
import { ButtonColor, ButtonVariant } from "@/components/Button/Button.types";
import { buttonColors, buttonVariants } from "@/theme";

type Size = "sm" | "md" | "lg";

const VARIANTS = Object.keys(buttonVariants) as ButtonVariant[];
const COLORS = Object.keys(buttonColors) as ButtonColor[];

export function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [color, setColor] = useState<ButtonColor>("brand");
  const [size, setSize] = useState<Size>("md");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [leftIcon, setLeftIcon] = useState(false);
  const [rightIcon, setRightIcon] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [useRender, setUseRender] = useState(false);

  const { theme } = useTheme();

  const availableSizes = Object.keys(theme.sizes ?? {}) as Size[];

  const controls = (
    <>
      <SegmentedControl
        label="variant"
        value={variant}
        options={VARIANTS}
        onChange={setVariant}
      />

      <SegmentedControl
        label="color"
        value={color}
        options={COLORS}
        onChange={setColor}
      />

      <SegmentedControl
        label="size"
        value={size}
        options={availableSizes}
        onChange={setSize}
      />

      <div className="mb-5">
        <p className="mb-2 font-mono text-[11px] text-text-muted">flags</p>

        <div className="flex flex-wrap gap-1.5">
          <Chip active={isLoading} onClick={() => setIsLoading((v) => !v)}>
            isLoading
          </Chip>

          <Chip active={disabled} onClick={() => setDisabled((v) => !v)}>
            disabled
          </Chip>

          <Chip active={fullWidth} onClick={() => setFullWidth((v) => !v)}>
            fullWidth
          </Chip>

          <Chip active={leftIcon} onClick={() => setLeftIcon((v) => !v)}>
            leftIcon
          </Chip>

          <Chip active={rightIcon} onClick={() => setRightIcon((v) => !v)}>
            rightIcon
          </Chip>

          <Chip active={iconOnly} onClick={() => setIconOnly((v) => !v)}>
            iconOnly
          </Chip>

          <Chip active={useRender} onClick={() => setUseRender((v) => !v)}>
            custom render
          </Chip>
        </div>
      </div>
    </>
  );

  const buttonProps = {
    variant,
    size,
    isLoading,
    disabled,
    color,
    fullWidth,
    leftIcon: leftIcon ? <SearchIcon className="h-4 w-4" /> : undefined,
    rightIcon: rightIcon ? <MailIcon className="h-4 w-4" /> : undefined,
    iconOnly,
  };

  const preview = (
    <Button
      {...buttonProps}
      render={
        useRender
          ? (props) => (
              <a {...props} href="#" onClick={(e) => e.preventDefault()} />
            )
          : undefined
      }
    >
      {iconOnly ? <PlusIcon className="h-4 w-4" /> : "Button"}
    </Button>
  );

  const attrLines = [
    variant !== "solid" && `variant="${variant}"`,
    color !== "brand" && `color="${color}"`,
    size !== "md" && `size="${size}"`,
    isLoading && "isLoading",
    disabled && "disabled",
    fullWidth && "fullWidth",
    leftIcon && "leftIcon={<SearchIcon />}",
    rightIcon && "rightIcon={<MailIcon />}",
    iconOnly && "iconOnly",
    useRender && `render={(props) => <a {...props} href="/docs" />}`,
  ].filter(Boolean) as string[];

  const code = [
    `<Button`,
    attrLines.length ? `  ${attrLines.join("\n  ")}` : "",
    `>`,
    iconOnly ? `  <PlusIcon />` : `  Button`,
    `</Button>`,
  ]
    .filter(Boolean)
    .join("\n");

  const getAttributes = (el: HTMLElement | null) => ({
    tag: el?.tagName.toLowerCase() ?? null,
    disabled: el?.getAttribute("disabled") ?? null,
    "aria-busy": el?.getAttribute("aria-busy") ?? null,
    "aria-disabled": el?.getAttribute("aria-disabled") ?? null,
    type: el?.getAttribute("type") ?? null,
    href: el?.getAttribute("href") ?? null,
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
