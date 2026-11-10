import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size } from "../type";
import type { SliderColor, SliderOrientation } from "./slider.variants";

export type SliderValue = number | number[];

export type SliderProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  /** Single value, or `[min, max]` for a two-thumb range slider. */
  value?: SliderValue;
  defaultValue?: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  step?: number;
  orientation?: SliderOrientation;
  size?: Size;
  color?: SliderColor;
  disabled?: boolean;
  /** Optional label rendered above the rail with the current value on the right. */
  label?: ReactNode;
  /** Shows the current value(s) next to the label. */
  showValue?: boolean;
  /** Formats the value shown by `showValue`. The raw number stays the accessible `aria-valuenow`. */
  valueFormat?: (value: SliderValue) => ReactNode;
  /** Accessible label per thumb; defaults to `Value` (single) or `Minimum`/`Maximum` (range). */
  getThumbLabel?: (index: number, count: number) => string;
};
