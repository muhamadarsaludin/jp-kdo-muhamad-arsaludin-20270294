import { forwardRef } from "react";

import { cn } from "@kdo/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

import type { StatCardProps } from "./stat-card.type";
import { type StatCardTrendDirection, statCardIconFrames, statCardTrendStyles } from "./stat-card.variants";

function trendDirection(trend: NonNullable<StatCardProps["trend"]>): StatCardTrendDirection {
  if (trend.direction !== undefined) return trend.direction;
  return trend.value < 0 ? "down" : "up";
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, icon, color = "brand", trend, className, ...props },
  ref,
) {
  const direction = trend ? trendDirection(trend) : "up";
  const TrendIcon = direction === "down" ? ArrowDown : ArrowUp;

  return (
    <div
      ref={ref}
      data-slot="stat-card"
      className={cn("flex flex-col gap-3 rounded-xl border border-secondary bg-primary p-5", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p data-slot="stat-label" className="text-sm text-tertiary">
            {label}
          </p>
          <p data-slot="stat-value" className="mt-1 font-semibold text-2xl text-primary tabular-nums">
            {value}
          </p>
        </div>
        {icon != null ? (
          <span
            data-slot="stat-icon"
            aria-hidden="true"
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg [&>svg]:size-5",
              statCardIconFrames[color],
            )}
          >
            {icon}
          </span>
        ) : null}
      </div>

      {trend != null ? (
        <div className="flex flex-wrap items-center gap-2">
          <span
            data-slot="stat-trend"
            data-direction={direction}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs",
              statCardTrendStyles[direction],
            )}
          >
            <TrendIcon className="size-3.5" aria-hidden="true" />
            <span className="tabular-nums">{Math.abs(trend.value)}%</span>
          </span>
          {trend.label != null ? (
            <span data-slot="stat-trend-label" className="text-sm text-tertiary">
              {trend.label}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

StatCard.displayName = "StatCard";
