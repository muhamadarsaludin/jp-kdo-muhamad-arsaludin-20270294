import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size } from "../type";
import type { CarouselColor, CarouselIndicatorVariant, CarouselOrientation } from "./carousel.variants";

export type CarouselProps = Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue" | "color"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  /** Overrides the automatically measured slide count. */
  count?: number;
  orientation?: CarouselOrientation;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
  paused?: boolean;
  pauseOnHover?: boolean;
};

export type CarouselTrackProps = ComponentPropsWithoutRef<"div">;

export type CarouselItemProps = ComponentPropsWithoutRef<"div">;

export type CarouselControlProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  direction?: "prev" | "next";
  children?: ReactNode;
};

export type CarouselIndicatorProps = Omit<ComponentPropsWithoutRef<"div">, "onChange" | "color"> & {
  variant?: CarouselIndicatorVariant;
  orientation?: CarouselOrientation;
  size?: Size;
  color?: CarouselColor;
  count?: number;
  value?: number;
  onValueChange?: (index: number) => void;
  interval?: number;
  paused?: boolean;
  label?: string;
  slideLabel?: (index: number) => string;
};
