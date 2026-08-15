"use client";

import {
  forwardRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";
import { useTheme } from "@/hooks/useTheme";
import { useSizeStyle } from "@/hooks/useSizeStyle";

import type { ButtonProps } from "./Button.types";
import { resolveRecipe } from "@/theme";
import { useTypography } from "@/hooks";

const ACTIVATION_KEYS = new Set(["Enter", " "]);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      color = "brand",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      typography: typographyName = "body",
      className,
      style,
      iconOnly,
      children,
      render,
      onKeyDown,
      onKeyUp,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const typography = useTypography(typographyName);
    const { style: sizeStyle, iconSize } = useSizeStyle(
      size,
      iconOnly,
      "button",
    );

    const prefersReducedMotion = useReducedMotion();

    const isInteractive = !disabled && !isLoading;

    const [isKeyboardPressed, setIsKeyboardPressed] = useState(false);

    function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(e);

      if (isInteractive && ACTIVATION_KEYS.has(e.key)) {
        setIsKeyboardPressed(true);
      }
    }

    function handleKeyUp(e: KeyboardEvent<HTMLButtonElement>) {
      onKeyUp?.(e);

      if (ACTIVATION_KEYS.has(e.key)) {
        setIsKeyboardPressed(false);
      }
    }

    const recipeClasses = resolveRecipe(theme.recipes.Button, {
      variant,
      color,
    });

    const resolvedClassName = cn(
      recipeClasses,
      fullWidth && "w-full",
      isLoading && "animate-kui-pulse",
      className,
    );

    const resolvedStyle = {
      ...typography,
      ...sizeStyle,
      ...style,
    };

    const content: ReactNode = (
      <>
        {isLoading && (
          <span
            className="animate-kui-spin rounded-full border-2 border-current border-t-transparent"
            style={{
              width: iconSize,
              height: iconSize,
            }}
            aria-hidden="true"
          />
        )}

        {!isLoading && leftIcon}

        {iconOnly && isLoading ? null : children}

        {!isLoading && rightIcon}
      </>
    );

    if (render) {
      return render({
        className: resolvedClassName,
        style: resolvedStyle,
        disabled: disabled || isLoading,
        "aria-busy": isLoading || undefined,
        children: content,
      });
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        className={resolvedClassName}
        style={resolvedStyle}
        aria-busy={isLoading || undefined}
        animate={{
          scale: isKeyboardPressed ? 0.975 : 1,
        }}
        whileHover={isInteractive ? { scale: 1.015 } : undefined}
        whileTap={isInteractive ? { scale: 0.975 } : undefined}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 500,
                damping: 30,
              }
        }
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        {...rest}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
