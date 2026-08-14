import type {
  SizeScale,
  Theme,
  TextStyles,
  RecipeCollection,
} from "@/types";
import { defaultTokens } from "./tokens";
import { defaultSemanticTokens } from "./semanticTokens";
import { buttonRecipe } from "./recipes";

/* ─────────────────────────────────────────────
 * Global sizes
 * ───────────────────────────────────────────── */

export const defaultSizes: SizeScale = {
  xs: {
    height: "1.75rem",
    paddingX: "0.5rem",
    fontSize: "0.75rem",
    gap: "0.25rem",
    iconSize: "0.875rem",
    radius: "0.65rem",
  },

  sm: {
    height: "2rem",
    paddingX: "0.75rem",
    fontSize: "0.8125rem",
    gap: "0.375rem",
    iconSize: "1rem",
    radius: "0.8rem",
  },

  md: {
    height: "2.5rem",
    paddingX: "1rem",
    fontSize: "0.875rem",
    gap: "0.5rem",
    iconSize: "1.125rem",
    radius: "1rem",
  },

  lg: {
    height: "3rem",
    paddingX: "1.5rem",
    fontSize: "1rem",
    gap: "0.625rem",
    iconSize: "1.25rem",
    radius: "1.15rem",
  },
};

export const defaultTextStyles: TextStyles = {
  body: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.md}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },

  bodySmall: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.sm}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },

  heading: {
    fontFamily: "{fonts.heading}",
    fontSize: "{fontSizes.2xl}",
    fontWeight: "{fontWeights.bold}",
    lineHeight: "{lineHeights.tight}",
  },

  headingSmall: {
    fontFamily: "{fonts.heading}",
    fontSize: "{fontSizes.xl}",
    fontWeight: "{fontWeights.semibold}",
    lineHeight: "{lineHeights.tight}",
  },

  caption: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.xs}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },
};


export const defaultRecipes: RecipeCollection = {
  Button: buttonRecipe,
};

export const defaultTheme: Theme = {
  tokens: defaultTokens,
  semanticTokens: defaultSemanticTokens,
  textStyles: defaultTextStyles,
  recipes: defaultRecipes,

  intensity: 50,

  sizes: defaultSizes,
};
