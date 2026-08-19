import type {
  RecipeDefinition,
  DefaultRecipeCollection,
  RecipeCompoundVariant,
} from "@/types";
import { BaseEditor } from "./editor/BaseEditor";
import { VariantsEditor } from "./editor/VariantsEditor";
import { DefaultVariantsEditor } from "./editor/DefaultVariantsEditor";
import { CompoundVariantsEditor } from "./editor/CompoundVariantsEditor";
import { useCallback } from "react";

type ComponentName = keyof DefaultRecipeCollection;

interface RecipePanelProps {
  component: ComponentName;
  recipe?: RecipeDefinition;
  updateRecipe: (
    component: ComponentName,
    update: Partial<RecipeDefinition>,
  ) => void;
  removeRecipeProperty: (
    component: ComponentName,
    key: keyof RecipeDefinition,
  ) => void;
}

export function RecipePanel({
  component,
  recipe,
  updateRecipe,
  removeRecipeProperty,
}: RecipePanelProps) {
  console.log("[RecipePanel] Render", {
    component,
    recipeKeys: recipe ? Object.keys(recipe) : [],
    compoundsLength: recipe?.compoundVariants?.length ?? 0,
  });

  const handleBaseChange = useCallback(
    (value: string) => {
      console.log("[RecipePanel.handleBaseChange] Called", {
        component,
        value,
      });
      updateRecipe(component, { base: value || undefined });
    },
    [component, updateRecipe],
  );

  const handleVariantsChange = useCallback(
    (variants: Record<string, any>) => {
      console.log("[RecipePanel.handleVariantsChange] Called", {
        component,
        variantsLength: Object.keys(variants).length,
      });
      updateRecipe(component, {
        variants: Object.keys(variants).length > 0 ? variants : undefined,
      });
    },
    [component, updateRecipe],
  );

  const handleDefaultVariantsChange = useCallback(
    (defaultVariants: Record<string, any>) => {
      console.log("[RecipePanel.handleDefaultVariantsChange] Called", {
        component,
        defaultVariantsLength: Object.keys(defaultVariants).length,
      });
      updateRecipe(component, {
        defaultVariants:
          Object.keys(defaultVariants).length > 0 ? defaultVariants : undefined,
      });
    },
    [component, updateRecipe],
  );

  const handleCompoundVariantsChange = useCallback(
    (compoundVariants: RecipeCompoundVariant[]) => {
      console.log("[RecipePanel.handleCompoundVariantsChange] Called", {
        component,
        compoundsLength: compoundVariants.length,
        compoundsArray: compoundVariants,
      });
      updateRecipe(component, {
        compoundVariants:
          compoundVariants.length > 0 ? compoundVariants : undefined,
      });
    },
    [component, updateRecipe],
  );

  return (
    <div className="border-t border-border">
      <div className="divide-y divide-border">
        <BaseEditor
          component={component}
          value={recipe?.base ?? ""}
          onChange={handleBaseChange}
          onReset={() => removeRecipeProperty(component, "base")}
        />

        <VariantsEditor
          component={component}
          variants={recipe?.variants}
          onChange={handleVariantsChange}
          onReset={() => removeRecipeProperty(component, "variants")}
        />

        <DefaultVariantsEditor
          component={component}
          value={recipe?.defaultVariants}
          onChange={handleDefaultVariantsChange}
          onReset={() => removeRecipeProperty(component, "defaultVariants")}
        />

        <CompoundVariantsEditor
          component={component}
          value={recipe?.compoundVariants}
          onChange={handleCompoundVariantsChange}
          onReset={() => removeRecipeProperty(component, "compoundVariants")}
        />
      </div>
    </div>
  );
}
