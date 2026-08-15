import { useTheme } from "@/hooks";
import { resolveTypography } from "@/theme/typography/resolveTypography";

export function useTypography(name?: string) {
  const { theme } = useTheme();

  return resolveTypography(
    name ? theme.typography[name] : undefined,
    theme.tokens,
  );
}