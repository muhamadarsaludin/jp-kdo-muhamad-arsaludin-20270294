import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { PopoverAlign, PopoverPosition, PopoverSide } from "../popover/popover.type";

export type TooltipSide = PopoverSide;
export type TooltipAlign = PopoverAlign;
export type TooltipPosition = PopoverPosition;

export type TooltipProps = ComponentPropsWithoutRef<"div"> & {
  trigger: ReactNode;
  children: ReactNode;
  defaultPosition?: TooltipPosition;
  offset?: number;
  showArrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /** Delay in milliseconds before a hover opens the tooltip. */
  openDelay?: number;
  /** Delay in milliseconds before leaving the trigger closes the tooltip. */
  closeDelay?: number;
  closeOnEscape?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
};
