import type { SizeScale, Theme, RecipeCollection } from "@/types";
import { defaultTokens } from "./tokens";
import { defaultSemanticTokens } from "./semanticTokens";
import { buttonRecipe, formControlRecipe, inputRecipe } from "./recipes";
import { defaultTypography } from "./typography";

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

export const defaultRecipes: RecipeCollection = {
  Button: buttonRecipe,
  FormControl: formControlRecipe,
  Input: inputRecipe,
};

export const defaultTheme: Theme = {
  tokens: defaultTokens,
  semanticTokens: defaultSemanticTokens,
  typography: defaultTypography,
  recipes: defaultRecipes,

  intensity: 50,

  sizes: defaultSizes,
};
