import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { BannerColor, BannerVariant } from "./banner.variants";

/** `primary` = `text-primary`; `accent` = the semantic color role (same tint as the icon). */
export type BannerTitleColor = "primary" | "accent";

export type BannerProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
  color?: BannerColor;
  variant?: BannerVariant;
  title?: ReactNode;
  /** Color of the `title`. Defaults to `primary`. */
  titleColor?: BannerTitleColor;
  /** Defaults to a color-matched icon; pass `null` to hide it. */
  icon?: ReactNode;
  /** Action buttons rendered in a row below the description. */
  actions?: ReactNode;
  /** Shows a remove button that calls `onClose`. Implied when `onClose` is set. */
  removable?: boolean;
  onClose?: () => void;
  removeLabel?: string;
  children?: ReactNode;
};
