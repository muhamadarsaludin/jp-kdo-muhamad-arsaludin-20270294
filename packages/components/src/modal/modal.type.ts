import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type {
  OverlayBodyProps,
  OverlayCloseProps,
  OverlayFooterProps,
  OverlayHeaderProps,
} from "../lib/overlay-parts";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseIcon?: boolean;
  overlayClassName?: string;
  children?: ReactNode;
};

export type ModalHeaderProps = OverlayHeaderProps;

export type ModalBodyProps = OverlayBodyProps;

export type ModalFooterProps = OverlayFooterProps;

export type ModalCloseProps = OverlayCloseProps;
