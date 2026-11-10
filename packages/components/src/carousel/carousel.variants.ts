import type { Size } from "../type";

export type CarouselOrientation = "horizontal" | "vertical";
export type CarouselIndicatorVariant = "static" | "dynamic";
export type CarouselColor = "brand" | "neutral" | "inverse";

export const carouselIndicatorGap = "gap-1";

export const carouselIndicatorDotSize: Record<Size, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

export const carouselIndicatorActiveWidth: Record<Size, string> = {
  sm: "w-4",
  md: "w-5",
  lg: "w-6",
};

export const carouselIndicatorActiveHeight: Record<Size, string> = {
  sm: "h-4",
  md: "h-5",
  lg: "h-6",
};

export const carouselIndicatorInactive: Record<CarouselColor, string> = {
  brand: "bg-quaternary",
  neutral: "bg-quaternary",
  inverse: "bg-quaternary-inverse",
};

export const carouselIndicatorActive: Record<CarouselColor, string> = {
  brand: "bg-brand-primary",
  neutral: "bg-primary-inverse",
  inverse: "bg-primary",
};

export const carouselIndicatorTrack: Record<CarouselColor, string> = {
  brand: "bg-brand-muted-primary",
  neutral: "bg-tertiary",
  inverse: "bg-tertiary-inverse",
};

export const carouselIndicatorProgress: Record<CarouselColor, string> = {
  brand: "bg-brand-primary",
  neutral: "bg-primary-inverse",
  inverse: "bg-primary",
};

export const carouselIndicatorFocus: Record<CarouselColor, string> = {
  brand: "focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
  neutral: "focus-visible:outline-primary-inverse focus-visible:ring-primary-inverse/50",
  inverse: "focus-visible:outline-primary focus-visible:ring-primary/50",
};
