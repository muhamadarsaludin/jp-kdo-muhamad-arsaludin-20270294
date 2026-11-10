import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type {
  PopoverLabelProps,
  PopoverPosition,
  PopoverSeparatorProps,
} from "../popover/popover.type";

export type DropdownSelectionMode = "none" | "single";

export type DropdownSelectionIndicator = "none" | "radio" | "checkmark";

export type DropdownSelectionPosition = "start" | "end";

export type DropdownProps = {
  trigger: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  position?: PopoverPosition;
  offset?: number;
  contentClassName?: string;
  triggerClassName?: string;
  /** Extra classes for the internal `role="menu"` container (gap, padding, max-height). */
  menuClassName?: string;
  /** Sizes the tray to the trigger width (select-style). */
  matchTriggerWidth?: boolean;
  className?: string;
  /** `"single"` turns value-bearing items into a single-choice radio group; `"none"` keeps a plain action menu. */
  selectionMode?: DropdownSelectionMode;
  /** Selected item value when `selectionMode="single"` (controlled). */
  value?: string;
  /** Initial selected item value when `selectionMode="single"` (uncontrolled). */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Visual selection control (single select only). Default `"none"`; opt into `"radio"` or `"checkmark"`. */
  selectionIndicator?: DropdownSelectionIndicator;
  /** Where the selection control sits. Default `"end"`. */
  selectionPosition?: DropdownSelectionPosition;
  "aria-label"?: string;
};

export type DropdownItemProps = ComponentPropsWithoutRef<"button"> & {
  /** Leading slot; `icon` is kept as a deprecated alias. */
  startContent?: ReactNode;
  /** @deprecated Use `startContent`. */
  icon?: ReactNode;
  endContent?: ReactNode;
  description?: ReactNode;
  shortcut?: ReactNode;
  destructive?: boolean;
  /** Selectable value; makes the item a radio row when the menu is single-select. */
  value?: string;
  /** Forces the selected highlight/check without managed selection. */
  selected?: boolean;
};

/** Reuses the Popover primitive so label/separator styling has one owner. */
export type DropdownSeparatorProps = PopoverSeparatorProps;

/** Reuses the Popover primitive so label/separator styling has one owner. */
export type DropdownLabelProps = PopoverLabelProps;
