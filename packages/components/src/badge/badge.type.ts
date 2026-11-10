import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Shape, Size } from "../type";
import type { BadgeColor, BadgeVariant } from "./badge.variants";

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  shape?: Shape;
  size?: Size;
  variant?: BadgeVariant;
  color?: BadgeColor;
  borderless?: boolean;
  transparent?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
};

export type BadgeDotProps = Omit<
  BadgeProps,
  "shape" | "size" | "startContent" | "endContent" | "children"
>;
