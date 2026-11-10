import { cva, type VariantProps } from "class-variance-authority";

export const bannerColors = ["brand", "neutral", "info", "success", "warning", "error"] as const;

export type BannerColor = (typeof bannerColors)[number];

const softStyles: Record<BannerColor, string> = {
  brand: "border-brand-secondary bg-brand-muted-primary text-brand-primary",
  neutral: "border-primary bg-secondary text-primary",
  info: "border-info-secondary bg-info-muted-primary text-info-primary",
  success: "border-success-secondary bg-success-muted-primary text-success-primary",
  warning: "border-warning-secondary bg-warning-muted-primary text-warning-primary",
  error: "border-error-secondary bg-error-muted-primary text-error-primary",
};

const outlineStyles: Record<BannerColor, string> = {
  brand: "border-brand-primary bg-primary text-brand-primary",
  neutral: "border-primary bg-primary text-primary",
  info: "border-info-primary bg-primary text-info-primary",
  success: "border-success-primary bg-primary text-success-primary",
  warning: "border-warning-primary bg-primary text-warning-primary",
  error: "border-error-primary bg-primary text-error-primary",
};

export const bannerVariants = cva("flex w-full items-start gap-2 rounded-lg border p-3 text-sm", {
  variants: {
    color: {
      brand: "",
      neutral: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    variant: {
      soft: "",
      outline: "",
    },
  },
  compoundVariants: [
    ...bannerColors.map((color) => ({
      variant: "soft" as const,
      color,
      className: softStyles[color],
    })),
    ...bannerColors.map((color) => ({
      variant: "outline" as const,
      color,
      className: outlineStyles[color],
    })),
  ],
  defaultVariants: {
    color: "brand",
    variant: "soft",
  },
});

export type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>["variant"]>;
