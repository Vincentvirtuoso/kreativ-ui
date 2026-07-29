import { Sun, Moon, Monitor } from "lucide-react";

import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";

import type { ThemeTogglerProps } from "./ThemeToggler.types";

export function ThemeToggler({
    variant = "ghost",
    size = "sm",
    iconOnly = false,
    allowSystem = true,
}: ThemeTogglerProps) {
    const { mode, setMode } = useTheme();

    return (
        <div className="inline-flex gap-1 rounded-lg border border-border bg-surface p-1">
            <Button
                size={size}
                variant={mode === "light" ? "solid" : variant}
                onClick={() => setMode("light")}
            >
                <Sun size={16} />
                {!iconOnly && "Light"}
            </Button>

            <Button
                size={size}
                variant={mode === "dark" ? "solid" : variant}
                onClick={() => setMode("dark")}
            >
                <Moon size={16} />
                {!iconOnly && "Dark"}
            </Button>

            {allowSystem && (
                <Button
                    size={size}
                    variant={mode === "system" ? "solid" : variant}
                    onClick={() => setMode("system")}
                >
                    <Monitor size={16} />
                    {!iconOnly && "System"}
                </Button>
            )}
        </div>
    );
}