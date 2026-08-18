import { createContext, useContext } from "react";

import type {
  ButtonGroupSpacing,
} from "./ButtonGroup.types";
import { Orientation } from "@/types";
import { ButtonProps } from "../Button/Button.types";

export interface ButtonGroupContextValue {
  orientation: Orientation;
  attached: boolean;
  spacing: ButtonGroupSpacing;
  size?: ButtonProps["size"];
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(
  null,
);

export function useButtonGroupContext() {
  return useContext(ButtonGroupContext);
}
