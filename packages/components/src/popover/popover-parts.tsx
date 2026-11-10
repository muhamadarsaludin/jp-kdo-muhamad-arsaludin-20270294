import { cn } from "@kdo/utils";
import { forwardRef } from "react";

import type { PopoverLabelProps, PopoverSeparatorProps } from "./popover.type";

export const PopoverLabel = forwardRef<HTMLDivElement, PopoverLabelProps>(function PopoverLabel(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="presentation"
      data-slot="label"
      className={cn("px-2 py-1.5 font-medium text-tertiary text-xs", className)}
      {...props}
    >
      {children}
    </div>
  );
});

PopoverLabel.displayName = "Popover.Label";

export const PopoverSeparator = forwardRef<HTMLHRElement, PopoverSeparatorProps>(
  function PopoverSeparator({ className, ...props }, ref) {
    return (
      <hr
        ref={ref}
        data-slot="separator"
        className={cn("my-1 border-secondary border-t", className)}
        {...props}
      />
    );
  },
);

PopoverSeparator.displayName = "Popover.Separator";
