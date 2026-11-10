import { cva, type VariantProps } from "class-variance-authority";

import type { Status } from "../type";

export const fieldStatusColor: Record<Status, string> = {
  default: "text-tertiary",
  error: "text-error-primary",
  warning: "text-warning-primary",
  success: "text-success-primary",
} as const;

export type FieldColor = "default" | "inverse";

export const fieldLabelColor: Record<FieldColor, string> = {
  default: "text-primary",
  inverse: "text-primary-inverse",
} as const;

export const fieldTextColor: Record<FieldColor, Record<Status, string>> = {
  default: fieldStatusColor,
  inverse: {
    ...fieldStatusColor,
    default: "text-secondary-inverse",
  },
} as const;

export const fieldVariants = cva("w-full flex gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    alignment: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    alignment: "stretch",
  },
});

export type FieldOrientation = NonNullable<VariantProps<typeof fieldVariants>["orientation"]>;
export type FieldAlignment = NonNullable<VariantProps<typeof fieldVariants>["alignment"]>;
