import { cn } from "@kdo/utils";
import { forwardRef } from "react";

import type { EmptyStateProps } from "./empty-state.type";
import {
  emptyStateDescriptionSizes,
  emptyStateDescriptionWidths,
  emptyStateIconContainerSizes,
  emptyStateIconSizes,
  emptyStateTitleSizes,
  emptyStateVariants,
} from "./empty-state.variants";

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  {
    size = "md",
    variant = "bordered",
    icon,
    title,
    description,
    action,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="empty-state"
      data-size={size}
      data-variant={variant}
      className={cn(emptyStateVariants({ size, variant }), className)}
      {...props}
    >
      {icon != null ? (
        <span
          data-slot="icon"
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center bg-secondary text-tertiary",
            emptyStateIconContainerSizes[size],
            emptyStateIconSizes[size],
          )}
        >
          {icon}
        </span>
      ) : null}
      {title != null ? (
        <p data-slot="title" className={cn("text-primary", emptyStateTitleSizes[size])}>
          {title}
        </p>
      ) : null}
      {description != null ? (
        <p
          data-slot="description"
          className={cn(
            "text-tertiary",
            emptyStateDescriptionSizes[size],
            emptyStateDescriptionWidths[size],
          )}
        >
          {description}
        </p>
      ) : null}
      {children != null ? (
        <div data-slot="content" className={cn("text-tertiary", emptyStateDescriptionSizes[size])}>
          {children}
        </div>
      ) : null}
      {action != null ? (
        <div data-slot="action" className="flex flex-wrap items-center justify-center gap-2">
          {action}
        </div>
      ) : null}
    </div>
  );
});

EmptyState.displayName = "EmptyState";
