import type { ComponentPropsWithoutRef } from "react";

import type { Size } from "../type";
import type { PaginationColor } from "./pagination.variants";

export type PaginationLabels = {
  nav?: string;
  page?: (page: number) => string;
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
};

export type PaginationProps = Omit<ComponentPropsWithoutRef<"nav">, "onChange"> & {
  /** Controlled current page (1-based). */
  page?: number;
  /** Uncontrolled initial page. */
  defaultPage?: number;
  /** Total number of pages. */
  total: number;
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  /** Pages always shown at the start and end. */
  boundaryCount?: number;
  /** Shows first/last page buttons next to prev/next. */
  showEdges?: boolean;
  size?: Size;
  color?: PaginationColor;
  disabled?: boolean;
  /** Accessible labels; defaults are English. */
  labels?: PaginationLabels;
};
