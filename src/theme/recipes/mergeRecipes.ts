import type {
  RecipeCollection,
  RecipeDefinition,
  ThemeOverride,
} from "@/types";

// function isPlainObject(value: unknown): value is Record<string, unknown> {
//   return typeof value === "object" && value !== null && !Array.isArray(value);
// }

function mergeRecipeDefinition(
  base: RecipeDefinition,
  override: Partial<RecipeDefinition>,
): RecipeDefinition {
  return {
    ...base,

    base: override.base ?? base.base,

    variants: {
      ...base.variants,
      ...override.variants,
    },

    defaultVariants: {
      ...base.defaultVariants,
      ...override.defaultVariants,
    },

    compoundVariants: override.compoundVariants ?? base.compoundVariants,
  };
}

export function mergeRecipes(
  base: RecipeCollection,
  override?: ThemeOverride["recipes"],
): RecipeCollection {
  if (!override) {
    return base;
  }

  const result: RecipeCollection = {
    ...base,
  };

  for (const [name, recipeOverride] of Object.entries(override)) {
    const baseRecipe = base[name];

    if (!baseRecipe) {
      result[name] = recipeOverride as RecipeDefinition;
      continue;
    }

    result[name] = mergeRecipeDefinition(
      baseRecipe,
      recipeOverride as Partial<RecipeDefinition>,
    );
  }

  return result;
}
