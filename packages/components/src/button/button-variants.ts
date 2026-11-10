import { cva, type VariantProps } from "class-variance-authority";

import type { SpinnerColor } from "../spinner/spinner";
import type { ButtonSize } from "./button.type";

export const buttonHeight: Record<ButtonSize, string> = {
  xs: "h-7",
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
  xl: "h-11",
} as const;

export const buttonTextSize: Record<ButtonSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
} as const;

export const buttonPadding: Record<ButtonSize, string> = {
  xs: "px-2",
  sm: "px-3",
  md: "px-4",
  lg: "px-5",
  xl: "px-6",
} as const;

export const buttonIconAndSpinnerSize: Record<ButtonSize, string> = {
  xs: "[&>svg]:size-3.5 [&>[data-slot]>svg]:size-3.5",
  sm: "[&>svg]:size-4 [&>[data-slot]>svg]:size-4",
  md: "[&>svg]:size-4 [&>[data-slot]>svg]:size-4",
  lg: "[&>svg]:size-4 [&>[data-slot]>svg]:size-4",
  xl: "[&>svg]:size-4.5 [&>[data-slot]>svg]:size-4.5",
} as const;

export const buttonGap: Record<ButtonSize, string> = {
  xs: "gap-1.5",
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2",
  xl: "gap-2",
};

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium outline-1 -outline-offset-1 outline-transparent focus-visible:ring-3",
  {
    variants: {
      size: {
        xs: [
          buttonHeight.xs,
          buttonTextSize.xs,
          buttonPadding.xs,
          buttonIconAndSpinnerSize.xs,
          buttonGap.xs,
        ],
        sm: [
          buttonHeight.sm,
          buttonTextSize.sm,
          buttonPadding.sm,
          buttonIconAndSpinnerSize.sm,
          buttonGap.sm,
        ],
        md: [
          buttonHeight.md,
          buttonTextSize.md,
          buttonPadding.md,
          buttonIconAndSpinnerSize.md,
          buttonGap.md,
        ],
        lg: [
          buttonHeight.lg,
          buttonTextSize.lg,
          buttonPadding.lg,
          buttonIconAndSpinnerSize.lg,
          buttonGap.lg,
        ],
        xl: [
          buttonHeight.xl,
          buttonTextSize.xl,
          buttonPadding.xl,
          buttonIconAndSpinnerSize.xl,
          buttonGap.xl,
        ],
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
      },
      variant: {
        solid: "",
        subtle: "",
        outline: "",
        text: "",
      },
      color: {
        brand: "focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
        neutral: "focus-visible:outline-primary-inverse focus-visible:ring-primary-inverse/50",
        inverse: "focus-visible:outline-primary focus-visible:ring-primary/50",
        error: "focus-visible:outline-error-primary focus-visible:ring-error-primary/50",
      },
    },
    compoundVariants: [
      // Solid
      {
        variant: "solid",
        color: "brand",
        className:
          "bg-brand-primary text-primary-inverse hover:bg-brand-primary-hover disabled:hover:bg-brand-primary aria-disabled:hover:bg-brand-primary",
      },
      {
        variant: "solid",
        color: "neutral",
        className:
          "bg-primary-inverse text-primary-inverse hover:bg-secondary-inverse disabled:hover:bg-primary-inverse aria-disabled:hover:bg-primary-inverse",
      },
      {
        variant: "solid",
        color: "inverse",
        className:
          "bg-primary text-primary hover:bg-primary-hover disabled:hover:bg-primary aria-disabled:hover:bg-primary",
      },
      {
        variant: "solid",
        color: "error",
        className:
          "bg-error-primary text-primary-inverse hover:bg-error-primary-hover disabled:hover:bg-error-primary aria-disabled:hover:bg-error-primary",
      },
      // Subtle
      {
        variant: "subtle",
        color: "brand",
        className:
          "bg-brand-muted-primary text-brand-primary hover:bg-brand-muted-secondary disabled:hover:bg-brand-muted-primary aria-disabled:hover:bg-brand-muted-primary",
      },
      {
        variant: "subtle",
        color: "neutral",
        className:
          "bg-secondary text-primary hover:bg-secondary-hover disabled:hover:bg-secondary aria-disabled:hover:bg-secondary",
      },
      {
        variant: "subtle",
        color: "inverse",
        className:
          "bg-secondary-inverse text-primary-inverse hover:bg-secondary-inverse-hover disabled:hover:bg-secondary-inverse aria-disabled:hover:bg-secondary-inverse",
      },
      {
        variant: "subtle",
        color: "error",
        className:
          "bg-error-muted-primary text-error-primary hover:bg-error-muted-secondary disabled:hover:bg-error-muted-primary aria-disabled:hover:bg-error-muted-primary",
      },
      // Outline
      {
        variant: "outline",
        color: "brand",
        className:
          "outline-brand-primary text-brand-primary hover:bg-brand-muted-primary disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "outline-primary text-primary hover:bg-secondary-hover disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
      {
        variant: "outline",
        color: "inverse",
        className:
          "outline-primary-inverse text-primary-inverse hover:bg-secondary-inverse-hover disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
      {
        variant: "outline",
        color: "error",
        className:
          "outline-error-primary text-error-primary hover:bg-error-muted-primary disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
      // Text (also used for links: variant="text" + href / as="a")
      {
        variant: "text",
        color: "brand",
        className:
          "text-brand-primary hover:bg-brand-muted-primary disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
      {
        variant: "text",
        color: "neutral",
        className:
          "text-primary hover:bg-secondary-hover disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
      {
        variant: "text",
        color: "inverse",
        className:
          "text-primary-inverse hover:bg-secondary-inverse-hover disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
      {
        variant: "text",
        color: "error",
        className:
          "text-error-primary hover:bg-error-muted-primary disabled:hover:bg-transparent aria-disabled:hover:bg-transparent",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "solid",
      color: "brand",
      shape: "rounded",
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonColor = NonNullable<VariantProps<typeof buttonVariants>["color"]>;

// Muted labels stay quiet at rest and firm up on hover. Solid fills already
// carry emphasis through their surface, and brand/error keep their role color,
// so only the neutral and inverse label colors have a muted counterpart.
export function getMutedLabelClasses({
  variant,
  color,
  disabled,
}: {
  variant: ButtonVariant;
  color: ButtonColor;
  disabled: boolean;
}): string {
  if (variant === "solid" || (color !== "neutral" && color !== "inverse")) {
    return "";
  }
  if (color === "inverse") {
    return disabled ? "text-tertiary-inverse" : "text-tertiary-inverse hover:text-primary-inverse";
  }

  return disabled ? "text-tertiary" : "text-tertiary hover:text-primary";
}

// Loader color for the loading state, following the button text color:
// neutral text → neutral, inverse text → inverse, else brand.
export function getSpinnerColor(variant: ButtonVariant, color: ButtonColor): SpinnerColor {
  if (variant === "solid") {
    if (color === "inverse") return "neutral";
    return "inverse";
  }
  if (color === "neutral") return "neutral";
  if (color === "inverse") return "inverse";
  return "brand";
}
