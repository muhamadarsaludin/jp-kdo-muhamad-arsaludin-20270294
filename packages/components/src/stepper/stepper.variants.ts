import type { Size } from "../type";

export type StepperOrientation = "horizontal" | "vertical";
export type StepperAlign = "left" | "center";
export type StepperColor = "brand" | "neutral" | "inverse";
export type StepperIndicator = "number" | "dot";
export type StepStatus = "complete" | "active" | "pending" | "warning" | "error";

export const stepperIndicatorSizes: Record<Size, string> = {
  sm: "size-6 text-xs [&_svg]:size-3.5",
  md: "size-7 text-sm [&_svg]:size-4",
  lg: "size-8 text-sm [&_svg]:size-4",
};

export const stepperDotSizes: Record<Size, string> = {
  sm: "size-1",
  md: "size-1.5",
  lg: "size-2",
};

export const stepperTitleSizes: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const stepperDescriptionSizes: Record<Size, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm",
};

/** Active step accent (filled indicator). */
export const stepperActiveTones: Record<StepperColor, string> = {
  brand: "border-brand-secondary bg-brand-primary text-primary-inverse",
  neutral: "border-primary-inverse bg-primary-inverse text-primary-inverse",
  inverse: "border-primary bg-primary text-primary",
};

/** Non-active status tones for the numbered indicator. */
export const stepperStatusTones: Record<StepStatus, string> = {
  complete: "border-success-primary bg-success-primary text-primary-inverse",
  active: "",
  pending: "border-primary bg-transparent text-tertiary",
  warning: "border-warning-primary bg-warning-primary text-primary-inverse",
  error: "border-error-primary bg-error-primary text-primary-inverse",
};

export const stepperTitleColors: Record<StepStatus, string> = {
  complete: "text-primary",
  active: "text-primary",
  pending: "text-tertiary",
  warning: "text-warning-primary",
  error: "text-error-primary",
};
