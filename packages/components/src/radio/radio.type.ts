import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Size, Status } from "../type";

export type RadioProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "size" | "readOnly"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: Size;
  status?: Status;
  label?: ReactNode;
  description?: ReactNode;
  circleClassName?: string;
  labelClassName?: string;
};
