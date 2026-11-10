import { cva, type VariantProps } from "class-variance-authority";

import type { Status } from "../type";
import type { InputSize } from "./input.type";

export const inputHeights: Record<InputSize, string> = {
  xs: "h-7",
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
  xl: "h-11",
} as const;

export const inputTextSizes: Record<InputSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
} as const;

export const inputContentIconSizes: Record<InputSize, string> = {
  xs: "[&_svg]:size-3.5",
  sm: "[&_svg]:size-4",
  md: "[&_svg]:size-4",
  lg: "[&_svg]:size-4",
  xl: "[&_svg]:size-4.5",
} as const;

export const inputIconAndLoadingSizes: Record<InputSize, string> = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-4",
  lg: "size-4",
  xl: "size-4.5",
} as const;

export const inputStepperIconSizes: Record<InputSize, string> = {
  xs: "size-3",
  sm: "size-3",
  md: "size-3",
  lg: "size-3.5",
  xl: "size-3.5",
} as const;

export const inputStepperWidths: Record<InputSize, string> = {
  xs: "w-6",
  sm: "w-7",
  md: "w-7",
  lg: "w-7.5",
  xl: "w-8",
} as const;

export const inputStepperButtonBase =
  "flex flex-1 cursor-pointer items-center justify-center text-tertiary transition-colors hover:bg-primary-hover hover:text-primary disabled:cursor-not-allowed disabled:opacity-50" as const;

export const inputIconButtonBase =
  "flex shrink-0 cursor-pointer items-center justify-center rounded-md -m-1 p-1 text-tertiary outline-1 -outline-offset-1 outline-transparent transition-colors hover:bg-primary-hover hover:text-primary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50 disabled:cursor-not-allowed disabled:text-quaternary disabled:hover:bg-transparent" as const;

export const inputIconStatusColors = {
  default: "",
  error: "text-error-primary",
  warning: "text-warning-primary",
  success: "text-success-primary",
} as const;

export const inputContentBase =
  "flex shrink-0 items-center gap-2 font-medium text-tertiary [&_svg]:shrink-0" as const;

// Extra button normalisation applied to Input content slots (kept separate so
// FileInput — which also hosts buttons in its slots — can opt out).
export const inputContentButtonBase =
  "[&_button]:flex [&_button]:cursor-pointer [&_button]:items-center [&_button]:justify-center [&_button]:rounded-md [&_button]:text-inherit" as const;

// Outlined-field shell shared by Input's inner field and FileInput's root:
// 1px inner outline, 3px focus ring, and the per-status outline + focus colors.
export const inputFieldBase = "outline-1 -outline-offset-1 focus-within:ring-3" as const;

export const inputInnerLayout = "relative z-1 flex min-w-0 flex-1 items-center gap-2 px-3" as const;

export const inputStatusOutline: Record<Status, string> = {
  default: "outline-primary",
  error: "outline-error-primary",
  warning: "outline-warning-primary",
  success: "outline-success-primary",
};

export const inputStatusFocus: Record<Status, string> = {
  default: "focus-within:outline-brand-primary focus-within:ring-brand-primary/50",
  error: "focus-within:outline-error-primary focus-within:ring-error-primary/50",
  warning: "focus-within:outline-warning-primary focus-within:ring-warning-primary/50",
  success: "focus-within:outline-success-primary focus-within:ring-success-primary/50",
};

const inputAddOnBase =
  "flex shrink-0 items-center gap-2 self-stretch overflow-hidden outline-1 -outline-offset-1 bg-quaternary px-3 font-medium text-tertiary focus-within:outline-brand-primary focus-within:ring-3 focus-within:ring-brand-primary/50 [&_svg]:shrink-0 [&_button]:flex [&_button]:items-center [&_button]:justify-center";

const inputAddOnButtonBase =
  "[&>button]:-mx-3 [&>button]:h-auto [&>button]:self-stretch [&>button]:rounded-none [&>button]:px-3 [&>button]:active:scale-100 [&>button]:focus-visible:outline-none";

export const inputInnerVariants = cva([inputInnerLayout, inputFieldBase], {
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
      default: inputStatusFocus.default,
      error: `${inputStatusOutline.error} ${inputStatusFocus.error}`,
      warning: `${inputStatusOutline.warning} ${inputStatusFocus.warning}`,
      success: `${inputStatusOutline.success} ${inputStatusFocus.success}`,
    },
    hasStartAddOn: {
      true: "rounded-l-none -ml-0.5",
      false: "",
    },
    hasEndAddOn: {
      true: "rounded-r-none -mr-0.5",
      false: "",
    },
  },
  defaultVariants: {
    variant: "outlined",
    shape: "rounded",
    status: "default",
    hasStartAddOn: false,
    hasEndAddOn: false,
  },
});

export const inputAddOnVariants = cva([inputAddOnBase, inputAddOnButtonBase], {
  variants: {
    side: {
      start: "",
      end: "",
    },
    shape: {
      rounded: "",
      pill: "",
    },
    variant: {
      filled: "outline-transparent",
      outlined: "outline-primary",
    },
    size: {
      xs: [inputTextSizes.xs, inputContentIconSizes.xs],
      sm: [inputTextSizes.sm, inputContentIconSizes.sm],
      md: [inputTextSizes.md, inputContentIconSizes.md],
      lg: [inputTextSizes.lg, inputContentIconSizes.lg],
      xl: [inputTextSizes.xl, inputContentIconSizes.xl],
    },
  },
  compoundVariants: [
    { side: "start", shape: "rounded", className: "rounded-l-lg" },
    { side: "start", shape: "pill", className: "rounded-l-full" },
    { side: "end", shape: "rounded", className: "rounded-r-lg" },
    { side: "end", shape: "pill", className: "rounded-r-full" },
  ],
  defaultVariants: {
    side: "start",
    shape: "rounded",
    variant: "outlined",
    size: "md",
  },
});

export const inputStartAddOnVariants = inputAddOnVariants;
export const inputEndAddOnVariants = inputAddOnVariants;

export const inputBaseVariants = cva(
  [
    "min-w-0 flex-1 bg-transparent text-primary outline-none read-only:cursor-text",
    "placeholder:text-placeholder disabled:cursor-not-allowed",
    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden",
    "[&[type=number]::-webkit-outer-spin-button]:m-0 [&[type=number]::-webkit-outer-spin-button]:appearance-none",
    "[&[type=number]::-webkit-inner-spin-button]:m-0 [&[type=number]::-webkit-inner-spin-button]:appearance-none",
    "[&[type=number]]:[-moz-appearance:textfield]",
  ],
  {
    variants: {
      size: {
        ...inputTextSizes,
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type InputVariant = NonNullable<VariantProps<typeof inputInnerVariants>["variant"]>;
export type InputShape = NonNullable<VariantProps<typeof inputInnerVariants>["shape"]>;
export type InputAddOnSide = NonNullable<VariantProps<typeof inputAddOnVariants>["side"]>;
