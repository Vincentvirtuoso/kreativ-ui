import type { SemanticToken, TokenValue } from "@/types";

export function defineToken<T extends TokenValue>(value: T) {
  return {
    value,
  };
}

export function defineTokens<T extends Record<string, TokenValue>>(tokens: T) {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [key, defineToken(value)]),
  ) as {
    [K in keyof T]: ReturnType<typeof defineToken<T[K]>>;
  };
}

export function defineSemanticToken<T extends TokenValue>(
  light: T,
  dark: T,
): SemanticToken<T> {
  return {
    value: {
      light,
      dark,
    },
  };
}

export function defineSemanticTokens<
  T extends Record<string, { light: TokenValue; dark: TokenValue }>,
>(
  tokens: T,
): {
  [K in keyof T]: SemanticToken<T[K]["light"]>;
} {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [
      key,
      defineSemanticToken(value.light, value.dark),
    ]),
  ) as {
    [K in keyof T]: SemanticToken<T[K]["light"]>;
  };
}
