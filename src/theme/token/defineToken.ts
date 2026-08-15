export function defineToken<T>(value: T) {
  return {
    value,
  };
}

export function defineSemanticToken<T>(light: T, dark: T) {
  return { value: { light, dark } };
}