import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { InputVariant } from "../input/input-variants";
import type { Status } from "../type";

export type TextAreaSize = "xs" | "sm" | "md" | "lg" | "xl";

export type TextAreaProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "size" | "value" | "defaultValue" | "children"
> & {
  size?: TextAreaSize;
  status?: Status;
  variant?: InputVariant;
  value?: string;
  defaultValue?: string;
  rows?: number;
  autoResize?: boolean;
  onValueChange?: (value: string) => void;
  /** Leading content in the action row inside the field (attach button, key hints, …). */
  startContent?: ReactNode;
  /** Trailing content in the action row inside the field — pushed to the far edge (e.g. a send button). */
  endContent?: ReactNode;
  /** Supporting copy rendered below the field surface (hints, counters, disclaimers). */
  footer?: ReactNode;
};
