export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Orientation = "horizontal" | "vertical";

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

export type BaseTransition =
  | "none"
  | "fade"
  | "rotate"
  | "slide"
  | "scale";