import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size } from "../type";
import type { StepProgressColor } from "./step-progress.variants";

export type StepProgressProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  /** Current step (1-based). */
  value?: number;
  /** Total number of steps. */
  total?: number;
  /** Title shown in the header row. */
  label?: ReactNode;
  /** Supporting text under the label. */
  description?: ReactNode;
  /** Content before the label (e.g. an icon). */
  startContent?: ReactNode;
  /** Content after the counter (e.g. a badge). */
  endContent?: ReactNode;
  /** Shows the `Step {value} of {total}` counter in the header. */
  showValue?: boolean;
  /** Formats the counter text; defaults to `Step {value} of {total}`. */
  valueLabel?: (current: number, total: number) => ReactNode;
  size?: Size;
  color?: StepProgressColor;
};
