import { cn } from "@kdo/utils";
import type { ReactNode } from "react";

export type ItemRowVariant = "list" | "menu";
export type ItemRowAlignment = "start" | "center" | "end";
export type ItemRowBackground = "brand" | "none";

const alignmentClasses: Record<ItemRowAlignment, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

// Slot icons follow one fixed rule that matches the built-in check/chevron
// icons (size-4): bare SVGs in either content slot are sized automatically.
export const itemRowSlotIconSize = "[&>svg]:size-4 [&>[data-slot]>svg]:size-4";

// With `start` alignment every non-text slot (selection control, checkmark,
// content icons) keeps a 16px footprint and top-aligns with the 20px label
// line, so each gets a 2px top nudge to land its center on the line.
export function itemRowSlotOffset(alignment: ItemRowAlignment): string | undefined {
  return alignment === "start" ? "mt-0.5" : undefined;
}

export function itemRowTextClassName({
  variant,
  emphasized = false,
  disabled = false,
  destructive = false,
}: {
  variant: ItemRowVariant;
  emphasized?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}): string {
  if (destructive) return "text-error-primary";
  if (emphasized) return "text-brand-primary";
  if (variant === "menu") return "text-primary";
  return cn("text-secondary", !disabled && "group-hover:text-primary");
}

export function itemRowLabelClassName({
  variant,
  emphasized = false,
  disabled = false,
  destructive = false,
}: {
  variant: ItemRowVariant;
  emphasized?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}): string {
  return cn(
    "truncate text-sm font-normal",
    itemRowTextClassName({ variant, emphasized, disabled, destructive }),
    emphasized && "font-medium",
  );
}

export function itemRowClassName({
  variant,
  alignment = "start",
  background = "none",
  emphasized = false,
  disabled = false,
  destructive = false,
  separator = false,
  className,
}: {
  variant: ItemRowVariant;
  alignment?: ItemRowAlignment;
  background?: ItemRowBackground;
  emphasized?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  className?: string;
}): string {
  const base =
    variant === "menu"
      ? "group flex w-full gap-2 rounded-md px-2 py-1.5 text-sm outline-1 -outline-offset-1 outline-transparent transition-colors"
      : "group flex w-full gap-2 rounded-lg px-2 py-2 outline-1 -outline-offset-1 outline-transparent transition-colors";

  let interactiveBackground = "hover:bg-secondary-hover";
  if (variant === "menu") {
    interactiveBackground = destructive
      ? "hover:bg-error-muted-primary focus-visible:bg-error-muted-primary"
      : "hover:bg-secondary-hover focus-visible:bg-secondary-hover";
  }

  let menuTextColor: string | undefined;
  if (variant === "menu") {
    if (destructive) menuTextColor = "text-error-primary";
    else if (emphasized) menuTextColor = "text-brand-primary";
    else menuTextColor = "text-primary";
  }

  return cn(
    base,
    alignmentClasses[alignment],
    separator && "border-primary border-t",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    menuTextColor,
    background === "brand" && "bg-brand-muted-primary",
    background === "none" && !disabled && interactiveBackground,
    disabled && "opacity-50",
    variant === "list" &&
      "focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
    className,
  );
}

export type ItemRowContentProps = {
  label: ReactNode;
  description?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  shortcut?: ReactNode;
  chevronStart?: ReactNode;
  chevronEnd?: ReactNode;
  selectionStart?: ReactNode;
  selectionEnd?: ReactNode;
  variant?: ItemRowVariant;
  alignment?: ItemRowAlignment;
  emphasized?: boolean;
  disabled?: boolean;
  destructive?: boolean;
};

/**
 * Shared presentational row used by `ListItem` (list/tree) and `Dropdown.Item`
 * (menu). It owns slot order, icon sizing, description/shortcut placement, and
 * text emphasis so row capabilities never drift between components. Behavior,
 * roles, and keyboard handling stay in each component.
 */
export function ItemRowContent({
  label,
  description,
  startContent,
  endContent,
  shortcut,
  chevronStart,
  chevronEnd,
  selectionStart,
  selectionEnd,
  variant = "list",
  alignment = "start",
  emphasized = false,
  disabled = false,
  destructive = false,
}: ItemRowContentProps) {
  const slotOffset = itemRowSlotOffset(alignment);
  const textClassName = itemRowTextClassName({ variant, emphasized, disabled, destructive });
  const labelClassName = itemRowLabelClassName({ variant, emphasized, disabled, destructive });

  return (
    <>
      {chevronStart}
      {selectionStart}
      {startContent && (
        <span
          data-slot="start-content"
          className={cn(
            "flex shrink-0 items-center",
            itemRowSlotIconSize,
            slotOffset,
            textClassName,
          )}
        >
          {startContent}
        </span>
      )}
      <span
        data-slot="main"
        className={cn("flex min-w-0 flex-1 flex-col", variant === "menu" && "text-left")}
      >
        <span data-slot="label" className={labelClassName}>
          {label}
        </span>
        {description && (
          <span data-slot="description" className="text-tertiary text-xs">
            {description}
          </span>
        )}
      </span>
      {endContent && (
        <span
          data-slot="end-content"
          className={cn(
            "flex shrink-0 items-center",
            itemRowSlotIconSize,
            slotOffset,
            textClassName,
          )}
        >
          {endContent}
        </span>
      )}
      {shortcut && (
        <span data-slot="shortcut" className="shrink-0 text-tertiary text-xs">
          {shortcut}
        </span>
      )}
      {selectionEnd}
      {chevronEnd}
    </>
  );
}
