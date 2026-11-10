import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Status } from "../type";
import type { FieldAlignment, FieldColor, FieldOrientation } from "./field-variants";

export type { FieldAlignment, FieldColor, FieldOrientation } from "./field-variants";

export type FieldProps = ComponentPropsWithoutRef<"div"> & {
  controlId?: string;
  required?: boolean;
  status?: Status;
  current?: number;
  max?: number;
  separator?: string;
  color?: FieldColor;
  orientation?: FieldOrientation;
  alignment?: FieldAlignment;
};

export type FieldLabelProps = ComponentPropsWithoutRef<"label"> & {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  /** Rendered after the label, outside the `<label>` element, so clicks do not reach the control. */
  endContent?: ReactNode;
};

export type FieldContentProps = ComponentPropsWithoutRef<"div">;
export type FieldFooterProps = ComponentPropsWithoutRef<"div">;
export type FieldStartContentProps = ComponentPropsWithoutRef<"div">;
export type FieldEndAddOnContentProps = ComponentPropsWithoutRef<"div">;

export type FieldHelperTextProps = ComponentPropsWithoutRef<"div"> & {
  status?: Status;
  color?: FieldColor;
};

export type FieldCounterProps = ComponentPropsWithoutRef<"span"> & {
  status?: Status;
  color?: FieldColor;
  current?: number;
  max?: number;
  maxLabel?: string;
  separator?: string;
};
