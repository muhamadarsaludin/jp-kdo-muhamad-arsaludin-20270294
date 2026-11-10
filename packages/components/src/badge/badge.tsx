import { forwardRef, type ReactNode } from "react";

import { cn } from "@kdo/utils";

import type { BadgeDotProps, BadgeProps } from "./badge.type";
import { badgeDotVariants, badgeVariants } from "./badge.variants";

function isText(node: ReactNode): node is string | number {
  return typeof node === "string" || typeof node === "number";
}

const BadgeRoot = forwardRef<HTMLSpanElement, BadgeProps>(function BadgeRoot(
  {
    shape = "rounded",
    size = "md",
    variant = "solid",
    color = "brand",
    borderless = false,
    transparent = false,
    startContent,
    endContent,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ shape, size, variant, color, borderless, transparent }), className)}
      {...props}
    >
      {startContent && (
        <span data-slot="start" className="flex shrink-0 items-center">
          {startContent}
        </span>
      )}
      {isText(children) && children !== "" ? <span className="min-w-0 truncate">{children}</span> : children}
      {endContent && (
        <span data-slot="end" className="flex shrink-0 items-center">
          {endContent}
        </span>
      )}
    </span>
  );
});
BadgeRoot.displayName = "Badge";

const BadgeDot = forwardRef<HTMLSpanElement, BadgeDotProps>(function BadgeDot(
  { variant, color, borderless, transparent, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        badgeDotVariants({
          color,
          variant,
          borderless,
          transparent,
        }),
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
});
BadgeDot.displayName = "Badge.Dot";

export const Badge = Object.assign(BadgeRoot, {
  Dot: BadgeDot,
});
