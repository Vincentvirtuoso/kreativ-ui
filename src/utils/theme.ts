import type { ThemeOverride } from "@/types/theme";

export function deepMergeTheme(
  base: ThemeOverride,
  patch: Partial<ThemeOverride>,
): ThemeOverride {
  return {
    ...base,
    ...patch,
    light: {
      ...base.light,
      ...patch.light,
      colors: { ...base.light?.colors, ...patch.light?.colors },
    },
    dark: {
      ...base.dark,
      ...patch.dark,
      colors: { ...base.dark?.colors, ...patch.dark?.colors },
    },
    sizes: { ...base.sizes, ...patch.sizes },
    components: { ...base.components, ...patch.components },
  };
}
