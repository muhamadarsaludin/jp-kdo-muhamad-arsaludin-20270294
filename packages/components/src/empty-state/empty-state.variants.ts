import { cva, type VariantProps } from "class-variance-authority";

import type { Size } from "../type";

export const emptyStateVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    size: {
      sm: "gap-2 px-4 py-8",
      md: "gap-3 px-6 py-16",
      lg: "gap-4 px-8 py-20",
    },
    variant: {
      bordered: "rounded-xl border border-secondary border-dashed",
      plain: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "bordered",
  },
});

export type EmptyStateVariant = NonNullable<VariantProps<typeof emptyStateVariants>["variant"]>;

export const emptyStateIconContainerSizes: Record<Size, string> = {
  sm: "size-10 rounded-lg",
  md: "size-12 rounded-xl",
  lg: "size-16 rounded-2xl",
};

export const emptyStateIconSizes: Record<Size, string> = {
  sm: "[&>svg]:size-5",
  md: "[&>svg]:size-6",
  lg: "[&>svg]:size-8",
};

export const emptyStateTitleSizes: Record<Size, string> = {
  sm: "text-sm font-medium",
  md: "text-base font-medium",
  lg: "text-lg font-semibold",
};

export const emptyStateDescriptionSizes: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const emptyStateDescriptionWidths: Record<Size, string> = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
};
