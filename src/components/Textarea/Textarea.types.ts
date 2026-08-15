import { TextareaHTMLAttributes } from "react";
import {  InputVariant } from "../Input/Input.types";
import type { MarkdownEditorProps } from "../MarkdownEditor/MarkdownEditor.types";
import {
  BaseProps,
  ClearableProps,
  FullWidthProps,
  SizeProps,
  StateProps,
  ValueProps,
  VariantProps,
} from "@/types";

export type TextareaResize = "none" | "both" | "horizontal" | "vertical";

export interface TextareaCoreProps
  extends
    Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      "size" | "defaultValue" | "value"
    >,
    Omit<BaseProps, "unstyled" | "style">,
    SizeProps,
    StateProps,
    VariantProps<InputVariant>,
    ClearableProps,
    ValueProps,
    FullWidthProps {
  resize?: TextareaResize;

  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  characterCounter?: boolean;
  debounceDelay?: number;
  trimOnBlur?: boolean;

  onValidate?: (value: string) => boolean | string;
}

// Fixed union
export type TextareaProps =
  | ({ allowMarkdown?: false } & TextareaCoreProps)
  | ({ allowMarkdown: true } & Omit<
      TextareaCoreProps,
      "resize" 
    > &
      MarkdownEditorProps);
