import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeTogglerProps } from "./ThemeToggler.types";
import { cn } from "@/utils";

const defaultTransition = {
  type: "none",
  duration: 300,
  delay: 0,
  easing: "ease-in-out",
} as const;

const getIconVariants = (type: string) => {
  switch (type) {
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

    case "slide":
      return {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
      };

    case "scale":
      return {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.5 },
      };

    case "rotate":
      return {
        initial: { opacity: 0, rotate: -90 },
        animate: { opacity: 1, rotate: 0 },
        exit: { opacity: 0, rotate: 90 },
      };

    case "none":
    default:
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      };
  }
};

export function ThemeToggler({
  variant = "ghost",
  activeVariant = "solid",

  color = "neutral",
  activeColor = "brand",

  size = "sm",
  iconOnly = false,
  allowSystem = false,

  orientation = "horizontal",
  rounded = false,
  unstyled = false,

  labels,
  icons,
  className,
  buttonProps = {},

  display = "buttons",
  transition = defaultTransition,
}: ThemeTogglerProps) {
  const { mode, setMode, resolvedMode } = useTheme();

  const activeMode = allowSystem ? mode : resolvedMode;

  const modes = [
    {
      key: "light" as const,
      label: labels?.light ?? "Light",
      icon: icons?.light ?? <Sun size={16} />,
    },
    {
      key: "dark" as const,
      label: labels?.dark ?? "Dark",
      icon: icons?.dark ?? <Moon size={16} />,
    },
    ...(allowSystem
      ? [
          {
            key: "system" as const,
            label: labels?.system ?? "System",
            icon: icons?.system ?? <Monitor size={16} />,
          },
        ]
      : []),
  ];

  const allowedModes = modes.map((item) => item.key);

  const currentMode = modes.find(({ key }) => key === activeMode) ?? modes[0];

  const effectiveRounded =
    rounded && !(orientation === "vertical" && !iconOnly);

  useEffect(() => {
    if (rounded && !effectiveRounded) {
      console.warn(
        "[kreativ-ui/ThemeToggler] `rounded` is ignored when orientation='vertical' and iconOnly={false}.",
      );
    }
  }, [rounded, effectiveRounded]);

  const handleCycle = () => {
    const index = allowedModes.indexOf(
      activeMode as (typeof allowedModes)[number],
    );

    setMode(allowedModes[(index + 1) % allowedModes.length]);
  };

  const isActive = (key: (typeof allowedModes)[number]) =>
    key === "system" ? mode === "system" : activeMode === key;

  const containerClasses = cn(
    "inline-flex gap-1",

    orientation === "vertical" && "flex-col",

    !unstyled && [
      "border border-border bg-surface p-1",
      effectiveRounded ? "rounded-full" : "rounded-lg",
    ],

    className,
  );

  const buttonRadius = effectiveRounded ? "rounded-full" : "rounded-lg";

  const animateIcon = display === "cycle" && transition.type !== "none";

  const iconVariants = getIconVariants(transition.type || "none");

  const motionTransition = {
    duration: (transition.duration || 300) / 1000,
    delay: (transition.delay || 0) / 1000,
    ease: (transition.easing || "ease-in-out") as any,
  };

  if (display === "cycle") {
    return (
      <Button
        size={size}
        variant={variant}
        color={color}
        onClick={handleCycle}
        aria-label={`Current theme: ${currentMode.label}`}
        className={cn(
          effectiveRounded && "rounded-full",
          buttonProps.className,
        )}
        {...buttonProps}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentMode.key}
            initial={animateIcon ? iconVariants.initial : undefined}
            animate={animateIcon ? iconVariants.animate : undefined}
            exit={animateIcon ? iconVariants.exit : undefined}
            transition={motionTransition}
          >
            {currentMode.icon}
          </motion.span>
        </AnimatePresence>

        {!iconOnly && currentMode.label}
      </Button>
    );
  }

  const buttons = modes.map(({ key, label, icon }) => {
    const active = isActive(key);

    return (
      <Button
        key={key}
        size={size}
        variant={active ? activeVariant : variant}
        color={active ? activeColor : color}
        onClick={() => setMode(key)}
        className={cn(buttonRadius, buttonProps.className)}
        leftIcon={icon}
        aria-pressed={active}
        {...buttonProps}
      >
        {!iconOnly && label}
      </Button>
    );
  });

  if (unstyled) {
    return (
      <div
        role="group"
        aria-label="Theme selector"
        className={cn(
          "inline-flex gap-1",
          orientation === "vertical" && "flex-col",
          className,
        )}
      >
        {buttons}
      </div>
    );
  }

  return (
    <div role="group" aria-label="Theme selector" className={containerClasses}>
      {buttons}
    </div>
  );
}
