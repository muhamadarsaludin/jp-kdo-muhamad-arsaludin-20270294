import { cva, type VariantProps } from "class-variance-authority";

export const avatarColors = [
  "brand",
  "neutral",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "lavender",
  "pink",
  "rose",
  "olive",
] as const;

export type AvatarColor = (typeof avatarColors)[number];

export const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center font-medium",
  {
    variants: {
      size: {
        "2xs": "size-5 text-2xs",
        xs: "size-6 text-xs",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg",
        "2xl": "size-24 text-2xl",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>;
export type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>["shape"]>;

export const avatarFallbackColors: Record<AvatarColor, string> = {
  brand: "bg-utility-brand-100 text-utility-brand-700",
  neutral: "bg-utility-neutral-200 text-utility-neutral-700",
  red: "bg-utility-red-100 text-utility-red-700",
  orange: "bg-utility-orange-100 text-utility-orange-700",
  amber: "bg-utility-amber-100 text-utility-amber-700",
  yellow: "bg-utility-yellow-100 text-utility-yellow-700",
  lime: "bg-utility-lime-100 text-utility-lime-700",
  green: "bg-utility-green-100 text-utility-green-700",
  teal: "bg-utility-teal-100 text-utility-teal-700",
  cyan: "bg-utility-cyan-100 text-utility-cyan-700",
  sky: "bg-utility-sky-100 text-utility-sky-700",
  blue: "bg-utility-blue-100 text-utility-blue-700",
  indigo: "bg-utility-indigo-100 text-utility-indigo-700",
  violet: "bg-utility-violet-100 text-utility-violet-700",
  purple: "bg-utility-purple-100 text-utility-purple-700",
  lavender: "bg-utility-lavender-100 text-utility-lavender-700",
  pink: "bg-utility-pink-100 text-utility-pink-700",
  rose: "bg-utility-rose-100 text-utility-rose-700",
  olive: "bg-utility-olive-100 text-utility-olive-700",
};

export const avatarIconSizes: Record<AvatarSize, string> = {
  "2xs": "size-2.5",
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
  "2xl": "size-12",
};

export const avatarStatusSizes: Record<AvatarSize, string> = {
  "2xs": "size-1.5",
  xs: "size-1.5",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-3",
  xl: "size-3.5",
  "2xl": "size-5",
};

export type AvatarStatus = "online" | "away" | "busy" | "offline";

export const avatarStatusColors: Record<AvatarStatus, string> = {
  online: "bg-success-primary",
  away: "bg-warning-primary",
  busy: "bg-error-primary",
  offline: "bg-utility-neutral-400",
};

export const avatarGroupOverlaps: Record<AvatarSize, string> = {
  "2xs": "-space-x-1",
  xs: "-space-x-1",
  sm: "-space-x-1.5",
  md: "-space-x-2",
  lg: "-space-x-3",
  xl: "-space-x-4",
  "2xl": "-space-x-6",
};

export function avatarColorFromName(name: string): AvatarColor {
  let hash = 0;
  for (const char of name.trim()) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return avatarColors[hash % avatarColors.length] ?? "brand";
}
