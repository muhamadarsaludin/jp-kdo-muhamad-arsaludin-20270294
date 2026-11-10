import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Shape, Status } from "../type";
import type { InputVariant } from "./input-variants";

type NativeInputProps = Omit<ComponentPropsWithoutRef<"input">, "size" | "aria-invalid" | "value" | "defaultValue">;

export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

export type InputBaseProps = Omit<ComponentPropsWithoutRef<"input">, "size"> & {
  size?: InputSize;
};

export type InputValue = string | number;

export type InputStepperVariant = "bordered" | "filled";

export type InputProps = Omit<NativeInputProps, "value" | "defaultValue"> & {
  size?: InputSize;
  status?: Status;
  shape?: Shape;
  variant?: InputVariant;
  loading?: boolean;
  clearable?: boolean;
  value?: InputValue;
  defaultValue?: InputValue;
  statusIcon?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  startAddOnContent?: ReactNode;
  endAddOnContent?: ReactNode;
  stepperVariant?: InputStepperVariant;
  stepper?: boolean;
  onClear?: () => void;
  onValueChange?: (value: string) => void;
  clearLabel?: string;
  increaseLabel?: string;
  decreaseLabel?: string;
  loadingLabel?: string;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
};
