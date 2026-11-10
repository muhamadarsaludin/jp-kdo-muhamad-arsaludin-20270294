import { cn } from "@kdo/utils";

import type { Shape, Size } from "../type";

export type TabsVariant = "line" | "segmented" | "fluid";
export type TabsColor = "brand" | "neutral" | "inverse";
export type TabsOrientation = "horizontal" | "vertical";
export type TabsWidth = "content" | "full" | "scroll";
/** Tabs need a compact step below the shared control scale for dense menus and toolbars. */
export type TabsSize = "xs" | Size;

export const tabsTextSize: Record<TabsSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

export const tabsGap: Record<TabsSize, string> = {
  xs: "gap-1",
  sm: "gap-1.5",
  md: "gap-1.5",
  lg: "gap-2",
};

export const tabsIconSize: Record<TabsSize, string> = {
  xs: "[&_svg]:size-3.5",
  sm: "[&_svg]:size-4",
  md: "[&_svg]:size-4",
  lg: "[&_svg]:size-4.5",
};

const tabsLinePaddingHorizontal: Record<TabsSize, string> = {
  xs: "px-1.5 pb-1.5",
  sm: "px-1.5 pb-2",
  md: "px-2 pb-2.5",
  lg: "px-2.5 pb-3",
};

const tabsLinePaddingVertical: Record<TabsSize, string> = {
  xs: "py-1 pr-3 pl-2.5",
  sm: "py-1.5 pr-4 pl-3",
  md: "py-2 pr-4 pl-3",
  lg: "py-2.5 pr-5 pl-3.5",
};

const tabsSegmentedPadding: Record<TabsSize, string> = {
  xs: "h-6 px-2",
  sm: "h-7 px-2.5",
  md: "h-8 px-3",
  lg: "h-9 px-4",
};

const tabsSegmentedTrackShape: Record<Shape, string> = {
  rounded: "rounded-lg",
  pill: "rounded-full",
};

const tabsSegmentedTabShape: Record<Shape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
};

/** Icon-only tabs keep the same height as their labeled siblings as a square hit area. */
const tabsIconOnlySize: Record<TabsSize, string> = {
  xs: "size-6",
  sm: "size-7",
  md: "size-8",
  lg: "size-9",
};

const tabsFocus: Record<TabsColor, string> = {
  brand: "focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
  neutral: "focus-visible:outline-primary-inverse focus-visible:ring-primary-inverse/50",
  inverse: "focus-visible:outline-primary focus-visible:ring-primary/50",
};

const tabsLineActiveText: Record<TabsColor, string> = {
  brand: "data-[state=active]:text-brand-primary",
  neutral: "data-[state=active]:text-primary",
  inverse: "data-[state=active]:text-primary-inverse",
};

const tabsLineIndicatorColor: Record<TabsColor, string> = {
  brand: "after:bg-brand-primary",
  neutral: "after:bg-primary-inverse",
  inverse: "after:bg-white",
};

const tabsSegmentedActive: Record<TabsColor, string> = {
  brand: "data-[state=active]:bg-brand-primary data-[state=active]:text-primary-inverse",
  neutral: "data-[state=active]:bg-primary-inverse data-[state=active]:text-primary-inverse",
  inverse: "data-[state=active]:bg-primary data-[state=active]:text-primary",
};

const tabsFluidSurface: Record<TabsColor, string> = {
  brand: "[--fluid-surface:var(--color-bg-brand-primary)]",
  neutral: "[--fluid-surface:var(--color-bg-primary-inverse)]",
  inverse: "[--fluid-surface:var(--color-bg-primary)]",
};

export type TabsListOptions = {
  noBackground?: boolean;
  noBorder?: boolean;
  width?: TabsWidth;
  shape?: Shape;
};

const tabsScrollClass = "flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export const tabsListClass = (
  variant: TabsVariant,
  orientation: TabsOrientation,
  options: TabsListOptions = {},
): string => {
  const { noBackground = false, noBorder = false, width = "content", shape = "rounded" } = options;
  const horizontal = orientation === "horizontal";
  let track = "";
  if (variant === "segmented") {
    if (!noBackground) track = `${tabsSegmentedTrackShape[shape]} bg-tertiary p-1`;
  } else if (variant === "fluid") {
    if (!noBackground) track = "overflow-hidden rounded-t-lg bg-secondary px-1 pt-1";
  } else if (!noBorder) {
    track = horizontal ? "border-b border-primary" : "border-l border-primary";
  }
  let widthClass = "";
  if (width === "full" || (width === "scroll" && horizontal)) widthClass = "w-full";
  else if (variant === "segmented") widthClass = "w-fit self-start";
  return cn("group/tabs relative", track, widthClass);
};

export const tabsViewportClass = (
  variant: TabsVariant,
  orientation: TabsOrientation,
  scrollable: boolean,
  options: { noBorder?: boolean } = {},
): string => {
  const { noBorder = false } = options;
  // Pull the horizontal line row down over the track border so the active
  // indicator paints on top of it instead of stacking above it.
  const overlapsTrack = variant === "line" && orientation === "horizontal" && !noBorder ? "-mb-px" : "";
  return cn(
    "flex gap-1",
    orientation === "horizontal"
      ? cn("flex-row", variant === "fluid" ? "items-end" : "items-center")
      : "flex-col items-stretch",
    overlapsTrack,
    scrollable && tabsScrollClass,
  );
};

export const tabsTabWidthClass = (width: TabsWidth, orientation: TabsOrientation): string => {
  if (width === "full") return "min-w-0 flex-1";
  if (width === "scroll" && orientation === "horizontal") return "shrink-0";
  return "";
};

const tabsTabBase =
  "relative inline-flex cursor-pointer select-none items-center whitespace-nowrap outline-1 -outline-offset-1 outline-transparent focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50";

export const tabsTabClass = (
  variant: TabsVariant,
  orientation: TabsOrientation,
  size: TabsSize,
  color: TabsColor,
  width: TabsWidth,
  shape: Shape = "rounded",
  iconOnly = false,
): string => {
  const sizing = `${tabsTextSize[size]} ${tabsGap[size]} ${tabsIconSize[size]}`;
  const focus = tabsFocus[color];
  const widthClass = tabsTabWidthClass(width, orientation);
  const padding = iconOnly ? tabsIconOnlySize[size] : "";
  if (variant === "line") {
    const indicator =
      orientation === "horizontal"
        ? `after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full ${tabsLineIndicatorColor[color]} after:opacity-0 after:content-[''] data-[state=active]:after:opacity-100`
        : `after:absolute after:inset-y-0 after:-left-px after:w-0.5 after:rounded-full ${tabsLineIndicatorColor[color]} after:opacity-0 after:content-[''] data-[state=active]:after:opacity-100`;
    const textPadding = orientation === "horizontal" ? tabsLinePaddingHorizontal[size] : tabsLinePaddingVertical[size];
    const justify = orientation === "horizontal" ? "justify-center" : "justify-start";
    return `${tabsTabBase} ${focus} ${widthClass} ${justify} ${sizing} ${iconOnly ? padding : textPadding} font-normal text-secondary transition-colors duration-200 ease-out data-[state=inactive]:enabled:hover:text-primary data-[state=active]:font-medium ${tabsLineActiveText[color]} ${indicator}`;
  }
  if (variant === "fluid") {
    const justify = orientation === "horizontal" ? "justify-center" : "justify-start";
    const position = orientation === "horizontal" ? "rounded-t-lg" : "rounded-l-lg";
    return `${tabsTabBase} ${focus} ${widthClass} ${justify} ${sizing} ${iconOnly ? padding : tabsSegmentedPadding[size]} ${position} font-medium text-tertiary data-[state=inactive]:enabled:hover:text-primary ${tabsFluidSurface[color]} ${tabsSegmentedActive[color]}`;
  }
  return `${tabsTabBase} ${focus} ${widthClass} justify-center ${sizing} ${iconOnly ? padding : tabsSegmentedPadding[size]} ${tabsSegmentedTabShape[shape]} font-medium text-tertiary transition-colors duration-200 ease-out data-[state=inactive]:enabled:hover:bg-secondary data-[state=inactive]:enabled:hover:text-primary ${tabsSegmentedActive[color]}`;
};
