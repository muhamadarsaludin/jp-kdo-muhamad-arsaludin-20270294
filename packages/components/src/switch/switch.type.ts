import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size, Status } from "../type";

export type SwitchProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "size" | "readOnly"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: Size;
  status?: Status;
  label?: ReactNode;
  description?: ReactNode;
  trackClassName?: string;
  labelClassName?: string;
};
