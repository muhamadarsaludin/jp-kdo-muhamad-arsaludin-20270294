import type { ComponentPropsWithoutRef } from "react";

import type { ButtonSize } from "../button/button.type";
import type { ButtonColor, ButtonVariant } from "../button/button-variants";
import type { InputSize, InputValue } from "../input/input.type";
import type { InputVariant } from "../input/input-variants";
import type { Shape, Status } from "../type";

export type NumberInputVariant = "plain" | InputVariant;

export type NumberInputButtonProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: Shape;
  className?: string;
};

export type NumberInputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "size" | "type" | "value" | "defaultValue" | "children"
> & {
  size?: InputSize;
  variant?: NumberInputVariant;
  shape?: Shape;
  status?: Status;
  value?: InputValue;
  defaultValue?: InputValue;
  onValueChange?: (value: string) => void;
  buttonProps?: NumberInputButtonProps;
  increaseLabel?: string;
  decreaseLabel?: string;
};
