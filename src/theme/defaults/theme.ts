import type { Theme, RecipeCollection } from "@/types";
import { defaultTokens } from "./tokens";
import { defaultSemanticTokens } from "./semanticTokens";
import { defaultTypography } from "./typography";
import { buttonRecipe } from "./recipes/button";
import { formControlRecipe } from "./recipes/formControl";
import { inputRecipe } from "./recipes/input";
import { textareaRecipe } from "./recipes/textarea";
import { markdownEditorRecipe } from "./recipes/markdownEditor";
import { defaultSizes } from "./sizes";

export const defaultRecipes: RecipeCollection = {
  Button: buttonRecipe,
  FormControl: formControlRecipe,
  Input: inputRecipe,
  Textarea: textareaRecipe,
  MarkdownEditor: markdownEditorRecipe,
};

export const defaultTheme: Theme = {
  tokens: defaultTokens,
  semanticTokens: defaultSemanticTokens,
  typography: defaultTypography,
  recipes: defaultRecipes,

  intensity: 50,

  sizes: defaultSizes,
};
