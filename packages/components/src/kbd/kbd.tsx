import { cn } from "@kdo/utils";
import { forwardRef } from "react";

import type { KbdGroupProps, KbdProps } from "./kbd.type";

const KbdRoot = forwardRef<HTMLElement, KbdProps>(function KbdRoot({ className, ...props }, ref) {
  return (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded border border-secondary bg-primary px-1 py-0.5 align-middle font-medium text-2xs text-tertiary",
        className,
      )}
      {...props}
    />
  );
});

KbdRoot.displayName = "Kbd";

const KbdGroup = forwardRef<HTMLElement, KbdGroupProps>(function KbdGroup(
  { className, ...props },
  ref,
) {
  return (
    <kbd
      ref={ref}
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1 align-middle", className)}
      {...props}
    />
  );
});

KbdGroup.displayName = "Kbd.Group";

export const Kbd = Object.assign(KbdRoot, {
  Group: KbdGroup,
});
