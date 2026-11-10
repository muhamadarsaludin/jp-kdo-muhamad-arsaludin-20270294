import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Shape } from "../type";
import type { TabsColor, TabsOrientation, TabsSize, TabsVariant, TabsWidth } from "./tabs.variants";

export type TabsActivationMode = "automatic" | "manual";

export type TabsScrollButtonIcons = {
  start?: ReactNode;
  end?: ReactNode;
};

export type TabsScrollButtonLabels = {
  start?: string;
  end?: string;
};

export type TabsProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  color?: TabsColor;
  size?: TabsSize;
  /** `segmented` only: corner treatment — `rounded` (default) or `pill`. */
  shape?: Shape;
  /** How the tab row uses horizontal space: `content` fits the labels, `full` divides it equally, `scroll` keeps label width and scrolls on overflow. */
  width?: TabsWidth;
  activationMode?: TabsActivationMode;
  disabled?: boolean;
  /** Segmented variant only: drops the surface background and its padding. */
  noBackground?: boolean;
  /** Line variant only: drops the full-width track border, leaving just the active underline. */
  noBorder?: boolean;
  /** `scroll` width only: renders overlay prev/next buttons (desktop) when the row overflows. Defaults to `true`. */
  scrollButtons?: boolean;
  /** Custom icons for the overlay scroll buttons. */
  scrollButtonIcons?: TabsScrollButtonIcons;
  /** Accessible labels for the overlay scroll buttons. */
  scrollButtonLabels?: TabsScrollButtonLabels;
};

export type TabsListProps = ComponentPropsWithoutRef<"div">;

export type TabsTabProps = Omit<ComponentPropsWithoutRef<"button">, "value"> & {
  value: string;
  /** Visible label. Omit it and pass `startContent` plus an `aria-label` to render an icon-only tab. */
  children?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  disabled?: boolean;
};

export type TabsPanelProps = Omit<ComponentPropsWithoutRef<"div">, "value"> & {
  value: string;
  keepMounted?: boolean;
};
