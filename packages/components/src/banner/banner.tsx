import { cn } from "@kdo/utils";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { forwardRef, type ReactNode } from "react";

import { Button } from "../button/button";
import type { BannerProps } from "./banner.type";
import { type BannerColor, bannerVariants } from "./banner.variants";

const defaultIcons: Record<BannerColor, ReactNode> = {
  brand: <Info />,
  neutral: <Info />,
  info: <Info />,
  success: <CircleCheck />,
  warning: <TriangleAlert />,
  error: <CircleX />,
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    color = "brand",
    variant = "soft",
    title,
    titleColor = "primary",
    icon,
    actions,
    removable = false,
    onClose,
    removeLabel = "Remove",
    className,
    children,
    ...props
  },
  ref,
) {
  const resolvedIcon = icon === undefined ? defaultIcons[color] : icon;
  const showRemove = removable || onClose !== undefined;

  return (
    <div
      ref={ref}
      data-slot="banner"
      data-color={color}
      data-variant={variant}
      className={cn(bannerVariants({ color, variant }), className)}
      {...props}
    >
      {resolvedIcon != null ? (
        <span
          data-slot="icon"
          aria-hidden="true"
          className="flex shrink-0 items-center [&>svg]:size-5"
        >
          {resolvedIcon}
        </span>
      ) : null}
      <div data-slot="content" className="flex min-w-0 flex-1 flex-col gap-1">
        {title != null ? (
          <p
            data-slot="title"
            className={cn("font-medium", titleColor === "primary" && "text-primary")}
          >
            {title}
          </p>
        ) : null}
        {children != null ? (
          <div data-slot="description" className="text-tertiary">
            {children}
          </div>
        ) : null}
        {actions != null ? (
          <div data-slot="actions" className="flex flex-wrap items-center gap-2 pt-1">
            {actions}
          </div>
        ) : null}
      </div>
      {showRemove ? (
        <Button.Icon
          variant="text"
          color="neutral"
          size="xs"
          aria-label={removeLabel}
          onClick={onClose}
          data-slot="remove"
        >
          <X aria-hidden="true" />
        </Button.Icon>
      ) : null}
    </div>
  );
});

Banner.displayName = "Banner";
