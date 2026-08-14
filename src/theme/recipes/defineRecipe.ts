import type { RecipeDefinition } from "@/types";

export function defineRecipe<T extends RecipeDefinition>(recipe: T): T {
  return recipe;
}
