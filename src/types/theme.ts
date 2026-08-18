import { Easing } from "framer-motion";
import type { ThemeAnimation, DeepPartial } from "./common";
import type { RecipeCollection } from "./recipes";
import type { SizeScale, SizeToken } from "./size";
import type { DesignTokens, SemanticTokens } from "./token";
import type { Typography } from "./typography";
import { type CSSProperties } from "react";

export type ThemeTransition =
  | "none"
  | "smooth"
  | "fast"
  | {
      duration?: number;
      easing?: CSSProperties["transitionTimingFunction"];
    };

/**
 * Defines the transition properties for a theme change.
 * `type` refers to a base transition key (imported from ThemeAnimation).
 * `duration` and `delay` are in milliseconds.
 * `easing` is a CSS easing function.
 */
export interface ThemeTogglerTransition {
  type?: ThemeAnimation;
  duration?: number;
  delay?: number;
  easing?: Easing;
}

/**
 * A collection of user-defined component recipes.
 *
 * Built-in Kreativ UI recipes are typed separately through
 * `RecipeCollection`, while custom component recipes can use
 * any string key.
 */

/**
 * The complete theme object provided by the design system.
 *
 * It combines primitive tokens, semantic tokens, typography,
 * component recipes, global intensity, and size scales.
 *
 * @property tokens - Raw design values (colors, spacing, radii, etc.).
 * @property semanticTokens - Role-based tokens that adapt to color mode.
 * @property typography - Reusable typography styles.
 * @property recipes - Component-specific styles.
 * @property intensity - A global multiplier for visual prominence.
 * @property sizes - Component size scales.
 */
export interface Theme {
  tokens: DesignTokens;
  semanticTokens: SemanticTokens;
  typography: Typography;
  recipes: RecipeCollection;
  intensity: number;
  sizes: SizeScale;
}

/**
 * A flat record of resolved token values, typically CSS-ready strings.
 * Used internally for injecting variables.
 */
export type ResolvedTokens = Record<string, string>;

/**
 * Defines three standard intensity levels.
 * Useful for scaling effects like shadows, saturation, or contrast.
 */
export interface IntensityMap {
  subtle: number;
  default: number;
  bold: number;
}

/**
 * Partial theme configuration used to extend the default theme.
 */
export interface ThemeOverride {
  /**
   * Override primitive design tokens.
   */
  tokens?: DeepPartial<DesignTokens>;

  /**
   * Override semantic tokens.
   */
  semanticTokens?: DeepPartial<SemanticTokens>;

  /**
   * Override reusable typography styles.
   */
  typography?: DeepPartial<Typography>;

  /**
   * Override component recipes.
   *
   * Built-in component names such as `Button`, `Input`,
   * `Checkbox`, and `Textarea` are available through IntelliSense.
   *
   * Custom recipe names are also supported.
   *
   * @example
   * ```ts
   * recipes: {
   *   Button: {
   *     base: "custom-base-class",
   *   },
   *   Input: {
   *     variants: {
   *       size: {
   *         md: "text-lg",
   *       },
   *     },
   *   },
   *   Card: {
   *     base: "rounded-xl p-6",
   *   },
   * }
   * ```
   */
  recipes?: DeepPartial<RecipeCollection>;

  /**
   * Override the global visual intensity.
   */
  intensity?: number;

  /**
   * Override component size scales.
   */
  sizes?: Record<string, Partial<SizeToken>>;
}

/**
 * Represents the active color mode.
 */
export type ColorMode = "light" | "dark" | "system";
