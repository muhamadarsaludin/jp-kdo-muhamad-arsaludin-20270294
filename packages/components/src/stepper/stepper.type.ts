import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size } from "../type";
import type { StepperAlign, StepperColor, StepperIndicator, StepperOrientation, StepStatus } from "./stepper.variants";

export type StepperProps = Omit<ComponentPropsWithoutRef<"nav">, "children" | "onChange"> & {
  children?: ReactNode;
  /** Controlled active step index (zero-based). */
  activeStep?: number;
  /** Uncontrolled initial active step index. */
  defaultActiveStep?: number;
  /** When set, steps become clickable and call this with the target index. */
  onStepChange?: (index: number) => void;
  orientation?: StepperOrientation;
  size?: Size;
  /** Accent for the active step (default `brand`); completed steps use `success`. */
  color?: StepperColor;
  /** Indicator style: `number` shows the step number, `dot` shows a dot in the center. */
  indicator?: StepperIndicator;
  /** Horizontal text alignment (default `left`). */
  align?: StepperAlign;
  /** Draws the connector path between steps as a dashed line. */
  dashed?: boolean;
  /** When true, only the active step and completed steps can be selected. */
  linear?: boolean;
};

export type StepperStepProps = {
  title?: ReactNode;
  description?: ReactNode;
  /** Rendered to the right of the title. */
  endContent?: ReactNode;
  /** Replaces the default number / check icon. */
  icon?: ReactNode;
  /** Overrides the status derived from the active step. */
  status?: StepStatus;
  disabled?: boolean;
  className?: string;
  /** Injected by `Stepper`. */
  index?: number;
  /** Injected by `Stepper`. */
  last?: boolean;
  /** Injected by `Stepper`. */
  first?: boolean;
};
