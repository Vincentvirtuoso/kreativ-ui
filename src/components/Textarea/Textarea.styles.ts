import { cn } from "@/utils/cn";
import type { TextareaResize } from "./Textarea.types";

export const textareaBase = cn(
  "flex w-full min-w-0 bg-transparent font-sans outline-none border-0",
  "text-text placeholder:text-text-muted",
  "transition-colors duration-[var(--kui-duration-fast)]",
  "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
);

export const textareaResizeVariants: Record<TextareaResize, string> = {
  none: "resize-none",
  both: "resize",
  horizontal: "resize-x",
  vertical: "resize-y",
};
