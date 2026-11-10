import type { Shape, Size } from "../type";

export const chipVariants = ["filled", "outline"] as const;

export type ChipVariant = (typeof chipVariants)[number];

/** Resting (unselected) treatment per variant. Mirrors Input's filled/outlined surfaces. */
const resting: Record<ChipVariant, string> = {
  filled: "bg-tertiary text-primary",
  outline: "border border-primary bg-primary text-primary",
};

/** Selected treatment per variant — always brand-forward, no other colors. */
const selected: Record<ChipVariant, string> = {
  filled: "bg-brand-primary text-primary-inverse",
  outline: "border border-brand-secondary bg-brand-muted-primary text-brand-primary",
};

export const chipVariantColors: Record<ChipVariant, string> = resting;

/** Selected chips switch to the brand-forward treatment for their variant. */
export const chipSelectedColors: Record<ChipVariant, string> = selected;

export const chipShapes: Record<Shape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
};

export const chipSizes: Record<
  Size,
  { root: string; action: string; start: string; end: string; remove: string; removeIcon: string }
> = {
  sm: {
    root: "h-6 px-2 text-xs",
    action: "gap-1",
    start: "[&_svg]:size-3.5",
    end: "[&_svg]:size-3.5",
    remove: "size-4",
    removeIcon: "[&_svg]:size-3.5",
  },
  md: {
    root: "h-7 px-2.5 text-sm",
    action: "gap-1.5",
    start: "[&_svg]:size-4",
    end: "[&_svg]:size-4",
    remove: "size-5",
    removeIcon: "[&_svg]:size-4",
  },
  lg: {
    root: "h-8 px-3 text-sm",
    action: "gap-1.5",
    start: "[&_svg]:size-4",
    end: "[&_svg]:size-4",
    remove: "size-5",
    removeIcon: "[&_svg]:size-4",
  },
};
