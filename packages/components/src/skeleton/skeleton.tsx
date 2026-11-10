import { cn } from "@kdo/utils";
import type { HTMLAttributes } from "react";

import type { Shape } from "../type";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shape?: Shape;
};

const skeletonShape: Record<Shape, string> = {
  rounded: "rounded-xl",
  pill: "rounded-full",
};

export function Skeleton({ className, shape = "rounded", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("animate-pulse bg-quaternary", skeletonShape[shape], className)}
      {...props}
    />
  );
}
