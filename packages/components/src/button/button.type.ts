import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";

import type { Shape } from "../type";
import type { ButtonColor, ButtonVariant } from "./button-variants";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonOwnProps = {
  href?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  /**
   * Quiet label at rest (`text-tertiary`) that firms up to `text-primary` on
   * hover — for tertiary chrome such as rail or toolbar actions. Ignored on
   * `variant="solid"` and on the `brand`/`error` colors, which carry their own
   * emphasis.
   */
  muted?: boolean;
  size?: ButtonSize;
  shape?: Shape;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

/**
 * Polymorphic button props. Pass `as` a custom element/component (e.g. a
 * router `Link`) and its own props — such as TanStack/React Router's `to` —
 * are type-checked and forwarded to it.
 */
export type ButtonProps<C extends ElementType = ElementType> = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | "color" | "size"> & {
    as?: C;
    ref?: ComponentPropsWithRef<C>["ref"];
  };

export type ButtonIconProps<C extends ElementType = ElementType> = Omit<
  ButtonProps<C>,
  "fullWidth" | "startContent" | "endContent" | "children" | "aria-label"
> & {
  children: ReactNode;
  "aria-label": string;
};
