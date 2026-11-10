import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size, Status } from "../type";

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "size" | "readOnly"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: Size;
  status?: Status;
  label?: ReactNode;
  description?: ReactNode;
  boxClassName?: string;
  labelClassName?: string;
};
