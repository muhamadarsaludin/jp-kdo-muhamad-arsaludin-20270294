import type { ComponentPropsWithoutRef, MouseEvent as ReactMouseEvent, ReactNode } from "react";

import type { Shape, Size } from "../type";
import type { ChipVariant } from "./chip.variants";

export type ChipProps = Omit<ComponentPropsWithoutRef<"div">, "onClick" | "color" | "children"> & {
  size?: Size;
  variant?: ChipVariant;
  /** Corner radius: `pill` (default) or `rounded`. */
  shape?: Shape;
  /** Toggle state. When set (true or false) the chip becomes a toggle and exposes `aria-pressed`. */
  selected?: boolean;
  disabled?: boolean;
  /** Renders a trailing remove button that calls `onRemove`. */
  removable?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
  /** Leading icon/content. */
  startContent?: ReactNode;
  /** Trailing icon/content. */
  endContent?: ReactNode;
  /** Click handler for the chip's main action; makes the chip interactive. */
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};
