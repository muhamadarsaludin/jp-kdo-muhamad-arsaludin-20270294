import { createContext, useContext } from "react";

import type { Size } from "../type";
import type {
  StepperAlign,
  StepperColor,
  StepperIndicator,
  StepperOrientation,
} from "./stepper.variants";

export type StepperContextValue = {
  activeStep: number;
  orientation: StepperOrientation;
  size: Size;
  color: StepperColor;
  indicator: StepperIndicator;
  align: StepperAlign;
  dashed: boolean;
  interactive: boolean;
  linear: boolean;
  goTo: (index: number) => void;
};

export const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepperContext(): StepperContextValue {
  const context = useContext(StepperContext);
  if (context === null) throw new Error("Stepper.Step must be used inside <Stepper>");
  return context;
}
