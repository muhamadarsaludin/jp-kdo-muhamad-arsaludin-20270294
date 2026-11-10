import type { Size, Status } from "../type";

export const switchTrackSizes: Record<Size, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-10",
  lg: "h-7 w-12",
} as const;

export const switchThumbSizes: Record<Size, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

export const switchThumbTranslates: Record<Size, string> = {
  sm: "translate-x-4",
  md: "translate-x-4",
  lg: "translate-x-5",
} as const;

export const switchRootGaps: Record<Size, string> = {
  sm: "gap-2",
  md: "gap-2",
  lg: "gap-3",
} as const;

export const switchLabelSizes: Record<Size, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
} as const;

// Descriptions stay text-xs across sizes; the Record shape keeps tsc exhaustive.
export const switchDescriptionSizes: Record<Size, string> = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-xs",
} as const;

export const switchStatusOutlines: Record<Status, string> = {
  default: "outline-transparent",
  warning: "outline-warning-primary",
  error: "outline-error-primary",
  success: "outline-success-primary",
} as const;

export const switchStatusFocus: Record<Status, string> = {
  default: "peer-focus-visible:outline-brand-primary peer-focus-visible:ring-brand-primary/50",
  warning: "peer-focus-visible:outline-warning-primary peer-focus-visible:ring-warning-primary/50",
  error: "peer-focus-visible:outline-error-primary peer-focus-visible:ring-error-primary/50",
  success: "peer-focus-visible:outline-success-primary peer-focus-visible:ring-success-primary/50",
} as const;
