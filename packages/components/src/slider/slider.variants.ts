import type { Size } from "../type";

export type SliderColor = "brand" | "neutral" | "inverse";
export type SliderOrientation = "horizontal" | "vertical";

export const sliderRailThickness: Record<Size, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

export const sliderRailThicknessVertical: Record<Size, string> = {
  sm: "w-1",
  md: "w-1.5",
  lg: "w-2",
};

export const sliderThumbSize: Record<Size, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

export const sliderAreaSizeHorizontal: Record<Size, string> = {
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5",
};

export const sliderAreaSizeVertical: Record<Size, string> = {
  sm: "w-3.5",
  md: "w-4",
  lg: "w-5",
};

export const sliderFillColors: Record<SliderColor, string> = {
  brand: "bg-brand-primary",
  neutral: "bg-primary-inverse",
  inverse: "bg-primary",
};

export const sliderThumbColors: Record<SliderColor, string> = {
  brand: "bg-brand-primary",
  neutral: "bg-primary-inverse",
  inverse: "bg-primary",
};

export const sliderFocus: Record<SliderColor, string> = {
  brand: "focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
  neutral: "focus-visible:outline-primary-inverse focus-visible:ring-primary-inverse/50",
  inverse: "focus-visible:outline-primary focus-visible:ring-primary/50",
};
