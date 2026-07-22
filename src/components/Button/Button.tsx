import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { useTheme } from "@/hooks/useTheme";
import { useSizeStyle } from "@/hooks/useSizeStyle";
import { buttonBase, buttonVariants } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    // Pulls consumer-defined per-component overrides set via
    // <UIProvider theme={{ components: { Button: { ... } } }}>.
    const { theme } = useTheme();
    const overrides = theme.components?.Button;

    // Sizing (height/padding/font-size/gap) is resolved from theme.sizes —
    // works for "sm"/"md"/"lg" out of the box and for any custom size a
    // consumer registers, e.g. size="xl" after adding it via UIProvider.
    const { style: sizeStyle, iconSize } = useSizeStyle(size);

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          buttonBase,
          buttonVariants[variant],
          overrides?.variants?.[variant],
          fullWidth && "w-full",
          overrides?.base,
          className
        )}
        style={{ ...sizeStyle, ...style }}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading && (
          <span
            className="kui-animate-spin rounded-full border-2 border-current border-t-transparent"
            style={{ width: iconSize, height: iconSize }}
            aria-hidden="true"
          />
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
