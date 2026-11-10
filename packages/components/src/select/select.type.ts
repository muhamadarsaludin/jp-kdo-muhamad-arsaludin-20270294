import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { InputSize } from "../input/input.type";
import type { InputVariant } from "../input/input-variants";
import type {
  PopoverLabelProps,
  PopoverPosition,
  PopoverSeparatorProps,
} from "../popover/popover.type";
import type { Status } from "../type";

export type SelectSelectionIndicator = "none" | "radio" | "checkmark";

export type SelectSelectionPosition = "start" | "end";

type SelectCommonProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onKeyDown" | "defaultValue" | "value"
> & {
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  status?: Status;
  size?: InputSize;
  variant?: InputVariant;
  startContent?: ReactNode;
  endContent?: ReactNode;
  startAddOnContent?: ReactNode;
  endAddOnContent?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Multiple select only. When this option value is selected, every other
   * option renders as selected while the trigger still shows only this option
   * (for example an explicit "All" option). Toggling a child exits the state.
   */
  selectAllValue?: string;
  position?: PopoverPosition;
  offset?: number;
  matchTriggerWidth?: boolean;
  contentClassName?: string;
  /** Visual control for single select. Multiple select always renders checkboxes. */
  selectionIndicator?: SelectSelectionIndicator;
  /** Where the selection control sits. Default `"start"`. */
  selectionPosition?: SelectSelectionPosition;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export type SelectSingleProps = SelectCommonProps & {
  selectionMode?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export type SelectMultipleProps = SelectCommonProps & {
  selectionMode: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
};

export type SelectProps = SelectSingleProps | SelectMultipleProps;

export type SelectOptionProps = ComponentPropsWithoutRef<"button"> & {
  value: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  description?: ReactNode;
};

/** Reuses the Popover primitive so label/separator styling has one owner. */
export type SelectLabelProps = PopoverLabelProps;

/** Reuses the Popover primitive so label/separator styling has one owner. */
export type SelectSeparatorProps = PopoverSeparatorProps;
