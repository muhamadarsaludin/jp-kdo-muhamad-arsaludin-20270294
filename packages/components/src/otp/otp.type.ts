import type { ComponentPropsWithoutRef } from "react";

import type { InputVariant } from "../input/input-variants";
import type { Shape, Size, Status } from "../type";

export type OtpMode = "numeric" | "alphanumeric";

export type OtpProps = Omit<ComponentPropsWithoutRef<"fieldset">, "children" | "onChange"> & {
  length?: number;
  separator?: boolean | number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  mode?: OtpMode;
  size?: Size;
  status?: Status;
  variant?: InputVariant;
  shape?: Shape;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  webOtp?: boolean;
  cellClassName?: string;
  /** Accessible label for a cell, defaulting to `Digit {n} of {length}`. */
  cellLabel?: (index: number, length: number) => string;
};
