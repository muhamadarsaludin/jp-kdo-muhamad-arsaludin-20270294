import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  /**
   * Optional leading icon rendered before the label (e.g. a home icon on the
   * first step). Decorative: the label stays the accessible name. Size it with
   * the `size-*` utilities or let the component's `size-3.5` default apply.
   */
  icon?: ReactNode;
};

export type BreadcrumbsProps = Omit<ComponentPropsWithoutRef<"nav">, "children"> & {
  items: BreadcrumbItem[];
  /** Router `Link` component used for `href` items (Next.js, TanStack Router, React Router). */
  linkAs?: ElementType;
  /** Prop name the router link receives `href` under (default `"href"`; use `"to"` for TanStack Router / React Router). */
  linkHrefProp?: string;
  /** Custom separator between items (defaults to a chevron). */
  separator?: ReactNode;
  /**
   * Max items to show before collapsing the middle into an ellipsis (minimum 2).
   * When `items.length` exceeds this, the first item, an ellipsis, and the last
   * `maxItems - 1` items render; the ellipsis opens a popover with the hidden ones.
   */
  maxItems?: number;
  /** Accessible label for the ellipsis button that reveals hidden items. */
  ellipsisLabel?: string;
};
