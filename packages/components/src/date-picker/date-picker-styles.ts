import { cn } from "@kdo/utils";

export type DayRounding = "none" | "all" | "start" | "end";

export function dayButtonClass(params: {
  rounding: DayRounding;
  isSelected: boolean;
  isInRange: boolean;
  isOutsideMonth: boolean;
  isToday: boolean;
  isHighlighted: boolean;
  isDisabled: boolean;
}): string {
  const classes = [
    "relative flex h-9 w-full items-center justify-center text-sm tabular-nums outline-0 -outline-offset-1 transition-colors focus-visible:z-1 focus-visible:outline-1 focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
  ];

  if (params.isDisabled) {
    classes.push("cursor-not-allowed text-quinary opacity-50");
  } else if (params.isSelected) {
    classes.push(
      "cursor-pointer bg-brand-primary text-primary-inverse hover:bg-brand-primary-hover",
    );
  } else if (params.isInRange) {
    classes.push(
      "cursor-pointer bg-brand-muted-primary text-brand-primary hover:bg-brand-muted-primary-hover",
    );
  } else if (params.isOutsideMonth) {
    classes.push("cursor-pointer text-quinary hover:bg-primary-hover hover:text-primary");
  } else if (params.isToday) {
    classes.push("cursor-pointer text-brand-primary hover:bg-primary-hover");
  } else if (params.isHighlighted) {
    classes.push("cursor-pointer text-error-primary hover:bg-primary-hover");
  } else {
    classes.push("cursor-pointer text-primary hover:bg-primary-hover");
  }

  if (params.rounding === "all") classes.push("rounded-md");
  else if (params.rounding === "start") classes.push("rounded-l-md");
  else if (params.rounding === "end") classes.push("rounded-r-md");
  else if (!params.isSelected && !params.isInRange && !params.isDisabled)
    classes.push("rounded-md");

  return cn(classes);
}

export function monthYearButtonClass(params: { isActive: boolean; isDisabled: boolean }): string {
  const base =
    "flex cursor-pointer items-center justify-center rounded-md font-medium text-sm outline-0 -outline-offset-1 transition-colors focus-visible:outline-1 focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50";

  if (params.isDisabled) return cn(base, "cursor-not-allowed text-quinary opacity-50");
  if (params.isActive)
    return cn(base, "bg-brand-primary text-primary-inverse hover:bg-brand-primary-hover");
  return cn(base, "text-primary hover:bg-primary-hover");
}
