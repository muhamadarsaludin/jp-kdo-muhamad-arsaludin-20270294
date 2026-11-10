import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { OverlayBodyProps, OverlayCloseProps, OverlayFooterProps, OverlayHeaderProps } from "../lib/overlay-parts";

export type DrawerPosition = "top" | "right" | "bottom" | "left";

export type DrawerProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Fires on every open/close request (close button, scrim, Escape). */
  onOpenChange?: (open: boolean) => void;
  /** Edge the drawer slides in from. Defaults to `"right"`. */
  position?: DrawerPosition;
  /** Panel width (`left`/`right`) or height (`top`/`bottom`). Number → px. */
  size?: number | string;
  /** Closes when the scrim (outside the panel) is clicked. Defaults to `true`. */
  closeOnOverlayClick?: boolean;
  /** Closes on `Escape`. Defaults to `true`. */
  closeOnEscape?: boolean;
  /** Shows the header close button. `Drawer.Header` can override per instance. Defaults to `true`. */
  showCloseIcon?: boolean;
  /** Classes for the scrim/overlay container. */
  overlayClassName?: string;
  /** Drawer body: `Drawer.Header`, `Drawer.Body`, `Drawer.Footer`, or free content. */
  children?: ReactNode;
};

export type DrawerHeaderProps = OverlayHeaderProps;

export type DrawerBodyProps = OverlayBodyProps;

export type DrawerFooterProps = OverlayFooterProps;

export type DrawerCloseProps = OverlayCloseProps;
