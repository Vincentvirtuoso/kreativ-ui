import type { DesignTokens } from "@/types";

export function resolveTokenReference(
  value: unknown,
  tokens: DesignTokens,
): string {
  if (typeof value !== "string") {
    return "";
  }

  const match = value.match(/^\{(.+)\}$/);

  if (!match) {
    return value;
  }

  const path = match[1].split(".");

  let current: unknown = tokens;

  for (const key of path) {
    if (typeof current !== "object" || current === null || !(key in current)) {
      return "";
    }

    current = (current as Record<string, unknown>)[key];
  }

  if (typeof current === "object" && current !== null && "value" in current) {
    const tokenValue = (current as { value: unknown }).value;

    return typeof tokenValue === "string" ? tokenValue : "";
  }

  return typeof current === "string" ? current : "";
}
