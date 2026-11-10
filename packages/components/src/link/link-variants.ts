import { cva, type VariantProps } from "class-variance-authority";

export type LinkSize = "xs" | "sm" | "base" | "lg" | "xl";

export type LinkColor = "default" | "brand" | "neutral" | "inverse";

export type LinkUnderline = "always" | "hover" | "never";

export const linkTextSize: Record<LinkSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;

export const linkGap: Record<LinkSize, string> = {
  xs: "gap-1",
  sm: "gap-1.5",
  base: "gap-1.5",
  lg: "gap-2",
  xl: "gap-2",
} as const;

export const linkIconSize: Record<LinkSize, string> = {
  xs: "[&>svg]:size-3.5 [&>[data-slot]>svg]:size-3.5",
  sm: "[&>svg]:size-4 [&>[data-slot]>svg]:size-4",
  base: "[&>svg]:size-4.5 [&>[data-slot]>svg]:size-4.5",
  lg: "[&>svg]:size-5 [&>[data-slot]>svg]:size-5",
  xl: "[&>svg]:size-5.5 [&>[data-slot]>svg]:size-5.5",
} as const;

export const linkVariants = cva(
  "inline-flex max-w-full items-center rounded-sm font-medium outline-1 -outline-offset-1 outline-transparent transition-colors focus-visible:ring-3",
  {
    variants: {
      size: {
        xs: [linkTextSize.xs, linkGap.xs, linkIconSize.xs],
        sm: [linkTextSize.sm, linkGap.sm, linkIconSize.sm],
        base: [linkTextSize.base, linkGap.base, linkIconSize.base],
        lg: [linkTextSize.lg, linkGap.lg, linkIconSize.lg],
        xl: [linkTextSize.xl, linkGap.xl, linkIconSize.xl],
      },
      color: {
        default:
          "text-link-primary visited:text-link-visited hover:text-link-hover focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
        brand: "text-brand-primary focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
        neutral:
          "text-primary hover:text-brand-primary focus-visible:outline-brand-primary focus-visible:ring-brand-primary/50",
        inverse:
          "text-primary-inverse hover:text-brand-primary focus-visible:outline-primary-inverse focus-visible:ring-primary-inverse/50",
      },
      underline: {
        always: "underline underline-offset-2",
        hover: "hover:underline hover:underline-offset-2",
        never: "no-underline",
      },
    },
    defaultVariants: {
      size: "base",
      color: "default",
      underline: "hover",
    },
  },
);

export type LinkVariantProps = VariantProps<typeof linkVariants>;
