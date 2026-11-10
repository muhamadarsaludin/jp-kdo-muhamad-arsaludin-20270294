import type { Size } from "../type";

export type PaginationColor = "brand" | "neutral" | "inverse";

export const paginationItemSizes: Record<Size, string> = {
  sm: "h-7 min-w-7 px-2 text-xs [&_svg]:size-4",
  md: "h-8 min-w-8 px-2.5 text-sm [&_svg]:size-4",
  lg: "h-9 min-w-9 px-3 text-sm [&_svg]:size-4",
};

export const paginationActiveColors: Record<PaginationColor, string> = {
  brand: "bg-brand-primary text-primary-inverse hover:bg-brand-primary-hover",
  neutral: "bg-primary-inverse text-primary-inverse hover:bg-secondary-inverse",
  inverse: "bg-primary text-primary hover:bg-primary-hover",
};

export const paginationFocus: Record<PaginationColor, string> = {
  brand: "focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
  neutral: "focus-visible:outline-primary-inverse focus-visible:ring-primary-inverse/50",
  inverse: "focus-visible:outline-primary focus-visible:ring-primary/50",
};
