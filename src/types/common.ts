export type Size = "sm" | "md" | "lg";

export type SizeValue = Size | (string & {});


export type BaseVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "soft";


export type Variant = BaseVariant;


export interface Styleable {
  className?: string;
}