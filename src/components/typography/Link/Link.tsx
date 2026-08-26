import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import type { LinkProps } from "./Link.types";
import { useTheme } from "@/hooks";
import { resolveRecipe } from "@/theme/recipes/resolveRecipe";
import { ExternalLink } from "lucide-react";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      as: Tag = "a",
      variant = "default",
      color,
      underline = "hover",
      external,
      disabled,
      className,
      style,
      children,
      href,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const recipeClasses = resolveRecipe(theme.recipes?.Link, {
      variant,
      underline,
      disabled,
    });

    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Tag
        ref={ref}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        className={cn(recipeClasses, className)}
        style={{
          color: color ? `var(--kui-${color}, ${color})` : undefined,
          ...style,
        }}
        {...externalProps}
        {...rest}
      >
        {children}
        {external && <ExternalLink />}
      </Tag>
    );
  },
);

Link.displayName = "Link";
