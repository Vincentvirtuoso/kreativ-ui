import { Sun, Moon, Monitor } from "lucide-react";

import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeTogglerProps } from "./ThemeToggler.types";
import { cn } from "@/utils";

export function ThemeToggler({
    variant = "ghost",
    activeVariant = "solid",
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
}: ThemeTogglerProps) {
    const { mode, setMode, resolvedMode } = useTheme();
    const activeMode = allowSystem ? mode : resolvedMode;

    const allowedModes = allowSystem
        ? (["light", "dark", "system"] as const)
        : (["light", "dark"] as const);

    const lightIcon = icons?.light ?? <Sun size={16} />;
    const darkIcon = icons?.dark ?? <Moon size={16} />;
    const systemIcon = icons?.system ?? <Monitor size={16} />;

    const lightLabel = labels?.light ?? "Light";
    const darkLabel = labels?.dark ?? "Dark";
    const systemLabel = labels?.system ?? "System";

    const getIcon = (m: string) =>
        m === "light" ? lightIcon : m === "dark" ? darkIcon : systemIcon;
    const getLabel = (m: string) =>
        m === "light" ? lightLabel : m === "dark" ? darkLabel : systemLabel;

    const handleCycle = () => {
        const currentIndex = allowedModes.indexOf(activeMode as any);
        const nextIndex = (currentIndex + 1) % allowedModes.length;
        setMode(allowedModes[nextIndex]);
    };

    const containerClasses = cn(
        "inline-flex gap-1",
        orientation === "vertical" && "flex-col",
        !unstyled && [
            "rounded-lg border border-border bg-surface p-1",
            rounded && "rounded-full",
        ],
        className
    );

    if (display === "cycle") {
        return (
            <Button
                size={size}
                variant={variant}
                onClick={handleCycle}
                {...buttonProps}
            >
                {getIcon(activeMode)}
                {!iconOnly && getLabel(activeMode)}
            </Button>
        );
    }

    const buttons = (
        <>
            <Button
                size={size}
                variant={activeMode === "light" ? activeVariant : variant}
                onClick={() => setMode("light")}
                className={cn(rounded && "rounded-full")}
                leftIcon={lightIcon}
                {...buttonProps}
            >
                {!iconOnly && lightLabel}
            </Button>
            <Button
                size={size}
                variant={activeMode === "dark" ? activeVariant : variant}
                onClick={() => setMode("dark")} 
                className={cn(rounded && "rounded-full")}
                leftIcon={darkIcon}
                {...buttonProps}
            >
                {!iconOnly && darkLabel}
            </Button>
            {allowSystem && (
                <Button
                    size={size}
                    variant={mode === "system" ? activeVariant : variant}
                    onClick={() => setMode("system")}
                    className={cn(rounded && "rounded-full")}
                    {...buttonProps}
                    leftIcon={systemIcon}
                >
                    {!iconOnly && systemLabel}
                </Button>
            )}
        </>
    );

    if (unstyled) {
        return (
            <div className={cn("inline-flex gap-1", orientation === "vertical" && "flex-col", className)}>
                {buttons}
            </div>
        );
    }

    return <div className={containerClasses}>{buttons}</div>;
}