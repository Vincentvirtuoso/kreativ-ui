function readProcessEnv(): string | undefined {
  try {
    return typeof process !== "undefined" ? process.env?.NODE_ENV : undefined;
  } catch {
    return undefined;
  }
}

function readImportMetaEnv(): string | undefined {
  try {
    return typeof import.meta !== "undefined"
      ? import.meta.env?.MODE
      : undefined;
  } catch {
    return undefined;
  }
}

export function isDev(): boolean {
  const mode = readProcessEnv() ?? readImportMetaEnv();
  return mode !== undefined && mode !== "production";
}
