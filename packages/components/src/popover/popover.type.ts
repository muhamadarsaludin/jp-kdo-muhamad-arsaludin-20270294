import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type PopoverSide = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";
export type PopoverPosition = `${PopoverSide}-${PopoverAlign}`;

export type PopoverLabelProps = ComponentPropsWithoutRef<"div">;

export type PopoverSeparatorProps = ComponentPropsWithoutRef<"hr">;

export type PopoverProps = ComponentPropsWithoutRef<"div"> & {
  trigger: ReactNode;
  children: ReactNode;
  defaultPosition?: PopoverPosition;
  offset?: number;
  showArrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  closeOnFocusOut?: boolean;
  /** Sizes the tray to the trigger width (select-style). Re-measured on trigger resize. */
  matchTriggerWidth?: boolean;
  /** ARIA popup type announced by the trigger. Default `"dialog"`. */
  hasPopup?: "dialog" | "menu" | "listbox" | "tree" | "grid";
  /** Role of the portaled tray. Use `"presentation"` when the tray only positions a labelled listbox/menu. */
  contentRole?: "dialog" | "presentation";
  /** Accessible name for the tray when `contentRole="dialog"` and the trigger has no usable name. */
  contentLabel?: string;
  triggerClassName?: string;
  contentClassName?: string;
};
