import { forwardRef } from "react";

import { cn } from "@kdo/utils";

import type { StepProgressProps } from "./step-progress.type";
import {
  stepProgressColors,
  stepProgressGaps,
  stepProgressIconColors,
  stepProgressIconSizes,
  stepProgressSegmentSizes,
} from "./step-progress.variants";

export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(function StepProgress(
  {
    value = 1,
    total = 3,
    label,
    description,
    startContent,
    endContent,
    showValue = true,
    valueLabel = (current, total) => `Step ${current} of ${total}`,
    size = "md",
    color = "brand",
    className,
    ...props
  },
  ref,
) {
  const count = Math.max(1, Math.round(total));
  const current = Math.min(Math.max(1, Math.round(value)), count);
  const hasHeader = startContent != null || label != null || description != null || endContent != null || showValue;

  return (
    <div
      ref={ref}
      data-slot="step-progress"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={count}
      aria-valuenow={current}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {hasHeader ? (
        <div className="flex items-center gap-2">
          {startContent != null ? (
            <span
              data-slot="start"
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full",
                stepProgressIconSizes[size],
                stepProgressIconColors[color],
              )}
            >
              {startContent}
            </span>
          ) : null}
          <span className="flex min-w-0 flex-1 flex-col">
            {label != null ? (
              <span data-slot="label" className="truncate text-sm font-medium text-primary">
                {label}
              </span>
            ) : null}
            {description != null ? (
              <span data-slot="description" className="truncate text-sm text-tertiary">
                {description}
              </span>
            ) : null}
          </span>
          {showValue ? (
            <span data-slot="value" className="shrink-0 text-sm text-tertiary">
              {valueLabel(current, count)}
            </span>
          ) : null}
          {endContent != null ? (
            <span data-slot="end" className="flex shrink-0 items-center">
              {endContent}
            </span>
          ) : null}
        </div>
      ) : null}
      <div data-slot="track" className={cn("flex", stepProgressGaps[size])}>
        {Array.from({ length: count }, (_, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: segments are positional and have no stable id.
            key={index}
            data-slot="segment"
            data-state={index < current ? "active" : "inactive"}
            className={cn(
              "flex-1 rounded-full",
              stepProgressSegmentSizes[size],
              index < current ? stepProgressColors[color] : "bg-quaternary",
            )}
          />
        ))}
      </div>
    </div>
  );
});

StepProgress.displayName = "StepProgress";
