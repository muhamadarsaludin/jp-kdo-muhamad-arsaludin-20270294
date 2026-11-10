import type { Size, Status } from "../type";

export const checkboxBoxSizes: Record<Size, string> = {
  sm: "size-4 rounded-sm",
  md: "size-5 rounded-sm",
  lg: "size-6 rounded-md",
} as const;

export const checkboxIconSizes: Record<Size, string> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
} as const;

export const checkboxRootGaps: Record<Size, string> = {
  sm: "gap-2",
  md: "gap-2",
  lg: "gap-3",
} as const;

export const checkboxLabelSizes: Record<Size, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
} as const;

// Intentional: descriptions are always text-xs (soft supporting text) across
// sizes; the Record<Size, string> shape is kept so tsc enforces exhaustiveness.
export const checkboxDescriptionSizes: Record<Size, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-xs",
} as const;

export const checkboxStatusOutlines: Record<Status, string> = {
  default: "outline-primary",
  warning: "outline-warning-primary",
  error: "outline-error-primary",
  success: "outline-success-primary",
} as const;

export const checkboxStatusFocus: Record<Status, string> = {
  default: "peer-focus-visible:outline-brand-primary peer-focus-visible:ring-brand-primary/50",
  warning: "peer-focus-visible:outline-warning-primary peer-focus-visible:ring-warning-primary/50",
  error: "peer-focus-visible:outline-error-primary peer-focus-visible:ring-error-primary/50",
  success: "peer-focus-visible:outline-success-primary peer-focus-visible:ring-success-primary/50",
} as const;
