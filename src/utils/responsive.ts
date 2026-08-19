import type { BaseBreakpoint, ResponsiveValue } from "@/types";

export function isResponsiveValue<T>(
  value: ResponsiveValue<T>,
): value is Partial<Record<"base" | BaseBreakpoint, T>> {
  return typeof value === "object" && value !== null;
}

export interface ResolvedResponsiveValue<T> {
  base?: T;
  responsive: Record<string, T>;
}

export function resolveResponsiveValue<T, B extends string = string>(
  value: ResponsiveValue<T, B>,
): ResolvedResponsiveValue<T> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return {
      base: value,
      responsive: {},
    };
  }

  const responsiveValue = value as Partial<Record<"base" | B, T>>;

  const { base, ...responsive } = responsiveValue;

  return {
    base,
    responsive: Object.fromEntries(
      Object.entries(responsive).filter(([, value]) => value !== undefined),
    ) as Record<string, T>,
  };
}
