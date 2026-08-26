import type { AnchorHTMLAttributes, ElementType } from "react";
import type {
  BaseColor,
  BaseProps,
  BaseVariant,
  ColorProps,
  VariantProps,
} from "@/types";

export interface LinkProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    BaseProps,
    VariantProps<BaseVariant>,
    ColorProps<BaseColor> {
  as?: ElementType;
  underline?: "always" | "hover" | "none";
  external?: boolean;
  disabled?: boolean;
}
