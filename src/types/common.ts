/** Built-in size names — shown as autocomplete suggestions. */
export type Size = "sm" | "md" | "lg";

/**
 * A size prop accepts the built-ins above OR any custom name a consumer
 * registered via <UIProvider theme={{ sizes: { xl: {...} } }} />.
 * The `string & {}` trick keeps IDE autocomplete for the literals above
 * while still allowing arbitrary strings through TypeScript.
 */
export type SizeValue = Size | (string & {});

export type Variant = "solid" | "outline" | "ghost" | "soft";

/** Standard prop every component accepts for consumer-side class overrides. */
export interface Styleable {
  className?: string;
}
