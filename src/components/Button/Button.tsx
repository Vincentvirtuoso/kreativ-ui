import { forwardRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useTheme } from "@/hooks/useTheme";
import { useSizeStyle } from "@/hooks/useSizeStyle";
import { buttonBase, buttonVariants } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

const ACTIVATION_KEYS = new Set(["Enter", " "]);

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
      iconOnly,
      children,
      onKeyDown,
      onKeyUp,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const overrides = theme.components?.Button;
    const { style: sizeStyle, iconSize } = useSizeStyle(size, iconOnly);
    const prefersReducedMotion = useReducedMotion();
    const isInteractive = !disabled && !isLoading;

    const [isKeyboardPressed, setIsKeyboardPressed] = useState(false);

    function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(e);
      if (isInteractive && ACTIVATION_KEYS.has(e.key))
        setIsKeyboardPressed(true);
    }
    function handleKeyUp(e: KeyboardEvent<HTMLButtonElement>) {
      onKeyUp?.(e);
      if (ACTIVATION_KEYS.has(e.key)) setIsKeyboardPressed(false);
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          buttonBase,
          buttonVariants[variant],
          overrides?.variants?.[variant],
          fullWidth && "w-full",
          overrides?.base,
          isLoading && "animate-kui-pulse",
          className,
        )}
        style={{ ...sizeStyle, ...style }}
        aria-busy={isLoading || undefined}
        animate={{ scale: isKeyboardPressed ? 0.975 : 1 }}
        whileHover={isInteractive ? { scale: 1.015 } : undefined}
        whileTap={isInteractive ? { scale: 0.975 } : undefined}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 30 }
        }
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        {...rest}
      >
        {isLoading && (
          <span
            className="animate-kui-spin rounded-full border-2 border-current border-t-transparent"
            style={{ width: iconSize, height: iconSize }}
            aria-hidden="true"
          />
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
