import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size } from "../type";
import type { RatingColor } from "./rating.variants";

/** Step between selectable values. `0.5` enables half-star precision. */
export type RatingPrecision = 0.5 | 1;

export type RatingProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange" | "defaultValue" | "children" | "role"
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Number of stars. Defaults to `5`. */
  max?: number;
  /** Selectable step: `1` for whole stars (default) or `0.5` for halves. */
  precision?: RatingPrecision;
  size?: Size;
  color?: RatingColor;
  /** Display-only: no pointer/keyboard interaction and removed from the tab order. */
  readOnly?: boolean;
  disabled?: boolean;
  /** Filled star icon. Defaults to a solid `Star`. */
  icon?: ReactNode;
  /** Empty star icon. Defaults to an outlined `Star`. */
  emptyIcon?: ReactNode;
  /** Shows the numeric value next to the stars. */
  showValue?: boolean;
  formatValue?: (value: number, max: number) => ReactNode;
};
