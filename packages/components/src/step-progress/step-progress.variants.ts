import type { Size } from "../type";

export type StepProgressColor = "brand" | "neutral" | "inverse";

export const stepProgressSegmentSizes: Record<Size, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

export const stepProgressGaps: Record<Size, string> = {
  sm: "gap-1",
  md: "gap-1",
  lg: "gap-1.5",
};

export const stepProgressColors: Record<StepProgressColor, string> = {
  brand: "bg-brand-primary",
  neutral: "bg-primary-inverse",
  inverse: "bg-primary",
};

export const stepProgressIconSizes: Record<Size, string> = {
  sm: "size-6 [&_svg]:size-3.5",
  md: "size-7 [&_svg]:size-4",
  lg: "size-8 [&_svg]:size-4",
};

export const stepProgressIconColors: Record<StepProgressColor, string> = {
  brand: "bg-brand-muted-primary text-brand-primary",
  neutral: "bg-secondary text-primary",
  inverse: "bg-secondary-inverse text-primary-inverse",
};
