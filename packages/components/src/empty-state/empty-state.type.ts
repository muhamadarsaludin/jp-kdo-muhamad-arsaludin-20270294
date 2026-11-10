import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size } from "../type";
import type { EmptyStateVariant } from "./empty-state.variants";

export type EmptyStateProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
  /** Controls padding, icon frame, and type scale. Defaults to `md`. */
  size?: Size;
  /** `bordered` renders the dashed placeholder frame; `plain` drops the border for use inside a Card. */
  variant?: EmptyStateVariant;
  /** Visual shown inside a muted, size-matched frame. Omit for no visual. */
  icon?: ReactNode;
  /** Primary label. */
  title?: ReactNode;
  /** Supporting text shown under the title. */
  description?: ReactNode;
  /** Actions (buttons, links) rendered in a centered row below the description. */
  action?: ReactNode;
  /** Extra content rendered below the description, above `action`. */
  children?: ReactNode;
};
