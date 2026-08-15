import type { BaseTransition, DeepPartial } from "./common";
import { RecipeCollection } from "./recipes";

/**
 * The primitive value type for any design token.
 * Can be a CSS value as a string (e.g., "16px", "#fff", "1.5rem")
 * or a unitless number (e.g., 0, 1.5, 4).
 *
 * @example
 * ```ts
 * const fontSize: TokenValue = "1.25rem";
 * const opacity: TokenValue = 0.8;
 * ```
 */
export type TokenValue = string | number;

/**
 * A wrapper around a single design value.
 * @template T - The specific TokenValue type (defaults to string | number).
 *
 * Every leaf in the token tree is a TokenDefinition.
 *
 * @example
 * ```ts
 * const blue500: TokenDefinition<string> = { value: "#3b82f6" };
 * const spacing4: TokenDefinition<number> = { value: 4 };
 * ```
 */
export interface TokenDefinition<T extends TokenValue = TokenValue> {
  value: T;
}

/**
 * A recursive structure that allows nested token collections.
 * Keys are arbitrary strings and values are either a leaf (TokenDefinition)
 * or another nested group.
 *
 * This enables hierarchical paths like:
 * - colors.blue.500
 * - spacing.4
 * - radii.md
 *
 * @example
 * ```ts
 * const tokens: TokenGroup = {
 *   colors: {
 *     blue: {
 *       50: { value: "#eff6ff" },
 *       500: { value: "#3b82f6" },
 *     },
 *     red: { value: "#ef4444" }, // direct leaf
 *   },
 *   spacing: {
 *     sm: { value: "8px" },
 *     md: { value: "16px" },
 *   },
 * };
 * ```
 */
export interface TokenGroup {
  [key: string]: TokenDefinition | TokenGroup;
}

/**
 * A flat collection of color values for a single color family.
 * Keys typically represent shades (e.g., "50", "100", "500", "900").
 * Each value is a TokenDefinition<string> representing a CSS color.
 *
 * @example
 * ```ts
 * const blueScale: ColorScale = {
 *   50: { value: "#eff6ff" },
 *   100: { value: "#dbeafe" },
 *   500: { value: "#3b82f6" },
 *   900: { value: "#1e3a8a" },
 * };
 * ```
 */
export interface ColorScale {
  [key: string]: TokenDefinition<string>;
}

/**
 * A collection of color scales and/or direct color tokens.
 * Keys are colour family names (e.g., "blue", "gray", "brand").
 * Values can be a full ColorScale or a single TokenDefinition<string>.
 *
 * @example
 * ```ts
 * const colors: ColorTokens = {
 *   blue: { 50: { value: "#eff6ff" }, 500: { value: "#3b82f6" } },
 *   gray: { 100: { value: "#f3f4f6" }, 900: { value: "#111827" } },
 *   brand: { value: "#2563eb" }, // flat single color
 * };
 * ```
 */
export interface ColorTokens {
  [key: string]: ColorScale | TokenDefinition<string>;
}

/**
 * A flat map of spacing tokens.
 * Keys describe the spacing size (e.g., "xs", "md", "lg", "4").
 * Values are TokenDefinition<string> containing a CSS length.
 *
 * @example
 * ```ts
 * const spacing: SpacingTokens = {
 *   xs: { value: "4px" },
 *   md: { value: "16px" },
 *   lg: { value: "24px" },
 * };
 * ```
 */
export interface SpacingTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of border‑radius tokens.
 * Keys describe the radius size (e.g., "sm", "md", "full").
 * Values are TokenDefinition<string> containing a CSS length.
 */
export interface RadiusTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of font‑family tokens.
 * Keys describe the font name (e.g., "body", "heading", "mono").
 * Values are TokenDefinition<string> containing a CSS font‑family value.
 */
export interface FontTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of font‑size tokens.
 * Keys describe the size name (e.g., "xs", "sm", "base", "xl").
 * Values are TokenDefinition<string> containing a CSS font‑size.
 */
export interface FontSizeTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of font‑weight tokens.
 * Keys describe the weight name (e.g., "normal", "medium", "bold").
 * Values are TokenDefinition<string> containing a CSS font‑weight (e.g., "400", "700").
 */
export interface FontWeightTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of line‑height tokens.
 * Keys describe the line‑height name (e.g., "tight", "normal", "loose").
 * Values are TokenDefinition<string> containing a CSS line‑height.
 */
export interface LineHeightTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of letter‑spacing tokens.
 * Keys describe the spacing name (e.g., "tight", "wide", "wider").
 * Values are TokenDefinition<string> containing a CSS letter‑spacing.
 */
export interface LetterSpacingTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of shadow tokens.
 * Keys describe the shadow name (e.g., "sm", "md", "lg", "xl").
 * Values are TokenDefinition<string> containing a CSS box‑shadow value.
 */
export interface ShadowTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * A flat map of animation tokens.
 * Keys describe the animation name (e.g., "fade", "slide", "spin").
 * Values are TokenDefinition<string> containing a CSS animation shorthand or keyframes name.
 */
export interface AnimationTokens {
  [key: string]: TokenDefinition<string>;
}

/**
 * Primitive (raw) design tokens.
 * These are mode‑agnostic values that serve as the foundation for semantic tokens.
 * Each category is optional; you may define only the ones you need.
 *
 * The index signature allows custom token groups (e.g., "zIndices", "borders", "opacities")
 * to be added as the design system evolves.
 *
 * @example
 * ```ts
 * const tokens: DesignTokens = {
 *   colors: {
 *     blue: { 50: { value: "#eff6ff" }, 500: { value: "#3b82f6" } },
 *     gray: { 100: { value: "#f3f4f6" }, 900: { value: "#111827" } },
 *   },
 *   spacing: { sm: { value: "8px" }, md: { value: "16px" } },
 *   radii: { md: { value: "8px" } },
 * };
 * ```
 */
export interface DesignTokens {
  colors?: ColorTokens;
  spacing?: SpacingTokens;
  radii?: RadiusTokens;
  fonts?: FontTokens;
  fontSizes?: FontSizeTokens;
  fontWeights?: FontWeightTokens;
  lineHeights?: LineHeightTokens;
  letterSpacings?: LetterSpacingTokens;
  shadows?: ShadowTokens;
  animations?: AnimationTokens;

  [key: string]: unknown; // for future extension
}

/**
 * A value that can differ between light and dark color modes.
 * @template T - The type of the value (defaults to string).
 *
 * @example
 * ```ts
 * const brandColor: ColorModeValue = {
 *   light: "#3b82f6",
 *   dark: "#60a5fa",
 * };
 * ```
 */
export type ColorModeValue<T = string> = {
  light: T;
  dark: T;
};

/**
 * A semantic token that can be either a static value or a mode‑dependent value.
 * @template T - The TokenValue type (defaults to string).
 *
 * Semantic tokens represent a role (e.g., "background", "text", "border")
 * rather than a raw value. They are used to create themes that adapt to color mode.
 *
 * @example
 * ```ts
 * const surfaceToken: SemanticToken = {
 *   value: { light: "#ffffff", dark: "#1e293b" }
 * };
 * const dangerToken: SemanticToken = { value: "#ef4444" }; // static
 * ```
 */
export interface SemanticToken<T extends TokenValue = string> {
  value: T | ColorModeValue<T>;
}

/**
 * A flat record of semantic color tokens.
 * Keys describe the color role (e.g., "brand", "surface", "text", "danger").
 * Values are SemanticToken<string> that resolve to a CSS color.
 *
 * @example
 * ```ts
 * const semanticColors: SemanticColorTokens = {
 *   brand: { value: { light: "#3b82f6", dark: "#60a5fa" } },
 *   surface: { value: { light: "#ffffff", dark: "#1e293b" } },
 *   text: { value: { light: "#111827", dark: "#f1f5f9" } },
 *   danger: { value: "#ef4444" }, // static
 * };
 * ```
 */
export interface SemanticColorTokens {
  [key: string]: SemanticToken<string>;
}

/**
 * Container for all semantic tokens.
 * Currently only `colors` is defined, but the index signature allows
 * future categories like `shadows`, `borders`, or `opacities`.
 */
export interface SemanticTokens {
  colors?: SemanticColorTokens;
  [key: string]: unknown;
}

/**
 * A set of CSS properties that define a typography style.
 * All properties are optional – you can compose styles incrementally.
 *
 * @example
 * ```ts
 * const headingStyle: TextStyle = {
 *   fontFamily: "Inter, sans-serif",
 *   fontSize: "2rem",
 *   fontWeight: 700,
 *   lineHeight: "1.2",
 *   letterSpacing: "-0.02em",
 * };
 * ```
 */
export interface TypographyStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  letterSpacing?: string;
}

/**
 * A collection of named text styles.
 * Keys are style names (e.g., "heading", "body", "caption", "label").
 *
 * @example
 * ```ts
 * const typography: Typography = {
 *   heading: { fontSize: "2rem", fontWeight: 700 },
 *   body: { fontSize: "1rem", lineHeight: "1.5" },
 * };
 * ```
 */
export type Typography = Record<string, TypographyStyle>;

/**
 * A set of CSS properties that define the dimensions and spacing
 * for a component at a specific size.
 *
 * Used to build size‑variant scales for components (e.g., "sm", "md", "lg").
 *
 * @example
 * ```ts
 * const buttonSize: SizeToken = {
 *   height: "40px",
 *   paddingX: "16px",
 *   fontSize: "1rem",
 *   iconSize: "20px",
 *   radius: "8px",
 * };
 * ```
 */
export interface SizeToken {
  height?: string;
  width?: string;
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  gap?: string;
  iconSize?: string;
  radius?: string;
}

/**
 * A collection of named size tokens.
 * Keys are size names (e.g., "sm", "md", "lg", "xl").
 *
 * @example
 * ```ts
 * const sizes: SizeScale = {
 *   sm: { height: "32px", paddingX: "12px", fontSize: "0.875rem" },
 *   md: { height: "40px", paddingX: "16px", fontSize: "1rem" },
 *   lg: { height: "48px", paddingX: "24px", fontSize: "1.125rem" },
 * };
 * ```
 */
export type SizeScale = Record<string, SizeToken>;

/**
 * Defines the transition properties for a theme change.
 * `type` refers to a base transition key (imported from BaseTransition).
 * `duration` and `delay` are in milliseconds.
 * `easing` is a CSS easing function.
 */
export interface ThemeTransition {
  type?: BaseTransition;
  duration?: number;
  delay?: number;
  easing?: string;
}

/**
 * The complete theme object provided by the design system.
 * It combines primitive tokens, semantic tokens, text styles,
 * component recipes, a global intensity, legacy tokens, and size scales.
 *
 * @property tokens - Raw design values (colors, spacing, radii, etc.).
 * @property semanticTokens - Role‑based tokens that adapt to color mode.
 * @property typography - Reusable typography styles.
 * @property recipes - Component‑specific styles (from RecipeCollection).
 * @property intensity - A global multiplier for visual prominence (e.g., 0.8, 1, 1.2).
 * @property light - Legacy theme tokens for light mode (kept for migration).
 * @property dark - Legacy theme tokens for dark mode (kept for migration).
 * @property sizes - Legacy component size scale (will move to recipes).
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
 * A flat record of resolved token values, typically CSS‑ready strings.
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

export interface ThemeOverride {
  /**
   * Override primitive design tokens.
   * Allows partial updates to raw values like colors, spacing, radii, etc.
   *
   * @example
   * ```ts
   * tokens: {
   *   colors: { blue: { 500: { value: "#1d4ed8" } } },
   *   spacing: { md: { value: "20px" } },
   * }
   * ```
   */
  tokens?: DeepPartial<DesignTokens>;

  /**
   * Override semantic tokens.
   * Allows partial updates to role‑based tokens (brand, surface, text, etc.)
   * that can adapt to light/dark modes.
   *
   * @example
   * ```ts
   * semanticTokens: {
   *   colors: {
   *     brand: { value: { light: "#1d4ed8", dark: "#60a5fa" } },
   *     surface: { value: { light: "#ffffff", dark: "#0f172a" } },
   *   },
   * }
   * ```
   */
  semanticTokens?: DeepPartial<SemanticTokens>;

  /**
   * Override reusable text styles.
   * Allows partial updates to typography presets like heading, body, caption, etc.
   *
   * @example
   * ```ts
   * typography: {
   *   heading: { fontSize: "2.5rem", fontWeight: 800 },
   *   body: { fontSize: "1.125rem", lineHeight: "1.75" },
   * }
   * ```
   */
  typography?: DeepPartial<Typography>;

  /**
   * Override component recipes.
   * Allows modifying the base styles, variants, default variants, and compound variants
   * for any component (e.g., Button, Card, Input) without rewriting the entire theme.
   *
   * Each key is a component name, and the value is a deep partial of its RecipeDefinition.
   * This means you can override only specific variants or classes while keeping the rest intact.
   *
   * @example
   * ```ts
   * recipes: {
   *   Button: {
   *     base: "custom-base-class inline-flex items-center",
   *     variants: {
   *       size: {
   *         md: "px-6 py-3 text-lg", // override only the "md" size
   *       },
   *     },
   *     compoundVariants: [
   *       {
   *         conditions: { variant: "solid", color: "brand" },
   *         className: "shadow-lg custom-brand-shadow",
   *       },
   *     ],
   *   },
   *   Card: {
   *     base: "rounded-xl p-6 bg-surface",
   *   },
   * }
   * ```
   */
  recipes?: DeepPartial<RecipeCollection>;

  /**
   * Override the global visual intensity.
   * A multiplier for effects like shadows, saturation, or contrast.
   * Typical values: 0.8 (subtle), 1.0 (default), 1.2 (bold).
   *
   * @example
   * ```ts
   * intensity: 1.1 // Slightly bolder than default
   * ```
   */
  intensity?: number;

  /**
   * Override legacy component size scales.
   * Allows updating specific size tokens (height, padding, fontSize, etc.)
   * for a given size name (e.g., "sm", "md", "lg").
   *
   * This will eventually be replaced by component‑specific size variants in recipes.
   *
   * @example
   * ```ts
   * sizes: {
   *   md: { height: "44px", paddingX: "20px" }, // override only "md" size
   *   lg: { height: "52px", fontSize: "1.25rem" },
   * }
   * ```
   */
  sizes?: Record<string, Partial<SizeToken>>;
}

/**
 * Represents the active color mode.
 * - "light": force light mode.
 * - "dark": force dark mode.
 * - "system": follow the user's operating system preference.
 */
export type ColorMode = "light" | "dark" | "system";
