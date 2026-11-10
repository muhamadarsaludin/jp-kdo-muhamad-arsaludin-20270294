import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { ButtonSize } from "../button/button.type";
import type { ButtonColor, ButtonVariant } from "../button/button-variants";
import type { PopoverPosition } from "../popover/popover.type";
import type { Shape } from "../type";

export type ButtonDropdownProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  shape?: Shape;
  disabled?: boolean;
  children?: ReactNode;
};

export type ButtonDropdownActionProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "color" | "size"
> & {
  children?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

export type ButtonDropdownTriggerProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "color" | "size"
> & {
  "aria-label": string;
  children?: ReactNode;
  /** Menu content rendered in the floating Dropdown tray. Omitting it turns the trigger into a plain icon button. */
  menu?: ReactNode;
  defaultPosition?: PopoverPosition;
  offset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Forwards to the tray Dropdown: `"single"` turns value-bearing items into a radio group. */
  selectionMode?: "none" | "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Forwards to the tray Dropdown. */
  selectionIndicator?: "none" | "radio" | "checkmark";
  /** Forwards to the tray Dropdown. */
  selectionPosition?: "start" | "end";
  /** Forwards to the tray Dropdown menu container. */
  menuClassName?: string;
};
