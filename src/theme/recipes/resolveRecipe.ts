import { cn } from "../../utils/cn";
import type { RecipeDefinition } from "@/types";

export interface RecipeProps {
  [key: string]: string | undefined;
}

function matchesConditions(
  conditions: Record<string, string>,
  props: RecipeProps,
) {
  return Object.entries(conditions).every(
    ([key, expected]) => props[key] === expected,
  );
}

export function resolveRecipe(
  recipe: RecipeDefinition | undefined,
  props: RecipeProps = {},
): string {
  if (!recipe) return "";

  const resolvedProps = {
    ...recipe.defaultVariants,
    ...props,
  };

  const classes: string[] = [];

  if (recipe.base) {
    classes.push(recipe.base);
  }

  if (recipe.variants) {
    for (const [variantName, variantValues] of Object.entries(
      recipe.variants,
    )) {
      const value = resolvedProps[variantName];

      if (!value) continue;

      const variantClass = variantValues[value];

      if (variantClass) {
        classes.push(variantClass);
      }
    }
  }

  if (recipe.compoundVariants) {
    for (const compound of recipe.compoundVariants) {
      if (matchesConditions(compound.conditions, resolvedProps)) {
        classes.push(compound.className);
      }
    }
  }

  return cn(...classes);
}
