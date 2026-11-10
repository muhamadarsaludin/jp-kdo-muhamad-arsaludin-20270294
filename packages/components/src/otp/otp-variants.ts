import { cva } from "class-variance-authority";

import type { Size } from "../type";

export const otpHeights: Record<Size, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
} as const;

export const otpTextSizes: Record<Size, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
} as const;

export const otpCellVariants = cva(
  ["flex aspect-square items-center justify-center outline-1 -outline-offset-1 focus-within:ring-3"],
  {
    variants: {
      variant: {
        filled: "bg-tertiary outline-transparent",
        outlined: "bg-primary outline-primary",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
      },
      status: {
        default: "focus-within:outline-brand-primary focus-within:ring-brand-primary/50",
        error: "outline-error-primary focus-within:outline-error-primary focus-within:ring-error-primary/50",
        warning: "outline-warning-primary focus-within:outline-warning-primary focus-within:ring-warning-primary/50",
        success: "outline-success-primary focus-within:outline-success-primary focus-within:ring-success-primary/50",
      },
      size: {
        sm: otpHeights.sm,
        md: otpHeights.md,
        lg: otpHeights.lg,
      },
    },
    defaultVariants: {
      variant: "outlined",
      shape: "rounded",
      status: "default",
      size: "md",
    },
  },
);
