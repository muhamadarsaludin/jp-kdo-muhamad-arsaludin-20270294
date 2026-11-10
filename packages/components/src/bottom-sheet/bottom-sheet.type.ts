import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { OverlayBodyProps, OverlayCloseProps, OverlayFooterProps, OverlayHeaderProps } from "../lib/overlay-parts";

export type BottomSheetSnapPoint = number | string;

export type BottomSheetProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  snapPoints?: BottomSheetSnapPoint[];
  defaultSnap?: number;
  snapIndex?: number;
  onSnapChange?: (index: number) => void;
  dismissThreshold?: number;
  dismissVelocity?: number;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseIcon?: boolean;
  overlayClassName?: string;
  children?: ReactNode;
};

export type BottomSheetHeaderProps = OverlayHeaderProps;

export type BottomSheetBodyProps = OverlayBodyProps;

export type BottomSheetFooterProps = OverlayFooterProps;

export type BottomSheetCloseProps = OverlayCloseProps;
