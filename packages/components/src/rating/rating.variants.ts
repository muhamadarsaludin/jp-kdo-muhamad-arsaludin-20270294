import type { Size } from "../type";

export const ratingColors = ["brand", "warning", "neutral"] as const;

export type RatingColor = (typeof ratingColors)[number];

export const ratingFilledColors: Record<RatingColor, string> = {
  brand: "text-brand-secondary",
  warning: "text-warning-secondary",
  neutral: "text-primary",
};

/** Empty (inactive) star tint — a light utility neutral, never a dark text tone. */
export const ratingEmptyColor = "text-utility-neutral-200";

export const ratingSizes: Record<Size, { star: string; stars: string; value: string }> = {
  sm: { star: "[&_svg]:size-4", stars: "gap-0.5", value: "text-xs" },
  md: { star: "[&_svg]:size-5", stars: "gap-1", value: "text-sm" },
  lg: { star: "[&_svg]:size-6", stars: "gap-1.5", value: "text-base" },
};
