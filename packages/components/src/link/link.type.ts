import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { LinkColor, LinkSize, LinkUnderline } from "./link-variants";

export type LinkOwnProps = {
  href?: string;
  size?: LinkSize;
  color?: LinkColor;
  underline?: LinkUnderline;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Polymorphic link props. Renders an `<a>` by default; pass `as` a router
 * `Link` (TanStack Router, React Router, Next.js) so navigation stays
 * client-side — its own destination props (e.g. `to`) are forwarded.
 */
export type LinkProps<C extends ElementType = ElementType> = LinkOwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof LinkOwnProps | "color" | "size"> & {
    as?: C;
    ref?: ComponentPropsWithRef<C>["ref"];
  };
