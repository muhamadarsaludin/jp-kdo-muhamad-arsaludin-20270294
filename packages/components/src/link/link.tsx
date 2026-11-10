import type { ElementType } from "react";

import { cn } from "@kdo/utils";

import type { LinkProps } from "./link.type";
import { linkVariants } from "./link-variants";

function LinkRoot<C extends ElementType = ElementType>({
  as,
  href,
  ref,
  size = "base",
  color = "default",
  underline = "hover",
  startContent,
  endContent,
  children,
  className,
  ...props
}: LinkProps<C>) {
  const Comp: ElementType = as ?? "a";

  const destination: { href?: string } = {};
  if (href !== undefined || Comp === "a") destination.href = href;

  return (
    <Comp
      ref={ref}
      {...destination}
      data-slot="link"
      className={cn(linkVariants({ size, color, underline }), className)}
      {...props}
    >
      {startContent ? (
        <span data-slot="start" className="flex shrink-0 items-center">
          {startContent}
        </span>
      ) : null}
      {children}
      {endContent ? (
        <span data-slot="end" className="flex shrink-0 items-center">
          {endContent}
        </span>
      ) : null}
    </Comp>
  );
}

LinkRoot.displayName = "Link";

export const Link = LinkRoot;
