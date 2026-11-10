import { cn } from "@kdo/utils";
import { forwardRef, useId } from "react";

import { buildAreaPath, buildSeriesPath, type Point, scaleX, scaleY } from "../chart/chart.utils";
import { chartColorClasses, chartColorVars } from "../chart/chart.variants";
import type { SparklineProps } from "./sparkline.type";

const STROKE_PADDING = 2;

function resolveDomain(values: number[]): { min: number; max: number } {
  let min = values[0] ?? 0;
  let max = values[0] ?? 0;
  for (const value of values) {
    if (value < min) min = value;
    if (value > max) max = value;
  }
  if (min === max) {
    if (min === 0) max = 1;
    else {
      min -= Math.abs(min) * 0.5;
      max += Math.abs(max) * 0.5;
    }
  }
  return { min, max };
}

export const Sparkline = forwardRef<HTMLSpanElement, SparklineProps>(function Sparkline(
  {
    data,
    type = "line",
    color = "brand",
    curve = "smooth",
    width = 96,
    height = 32,
    className,
    "aria-label": ariaLabel = "Sparkline",
    ...props
  },
  ref,
) {
  const gradientId = `sparkline-gradient-${useId().replace(/:/g, "")}`;
  const { min, max } = resolveDomain(data);
  const plot = {
    left: STROKE_PADDING,
    top: STROKE_PADDING,
    width: Math.max(width - STROKE_PADDING * 2, 0),
    height: Math.max(height - STROKE_PADDING * 2, 0),
  };
  const baselineY = plot.top + plot.height;

  const points: Point[] = data.map((value, index) => ({
    x: scaleX(index, data.length, plot.left, plot.width),
    y: scaleY(value, min, max, plot.top, plot.height),
  }));

  return (
    <span
      ref={ref}
      data-slot="sparkline"
      data-type={type}
      className={cn("inline-flex", chartColorClasses[color], className)}
      {...props}
    >
      <svg
        data-slot="sparkline-svg"
        role="img"
        aria-label={ariaLabel}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block overflow-visible"
      >
        {type === "area" ? (
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColorVars[color]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColorVars[color]} stopOpacity={0.02} />
            </linearGradient>
          </defs>
        ) : null}

        <g data-slot="sparkline-series">
          {type === "bar"
            ? data.map((value, index) => {
                const band = plot.width / data.length;
                const barWidth = Math.max(band * 0.6, 1);
                const x = plot.left + band * (index + 0.5) - barWidth / 2;
                const y = scaleY(value, min, max, plot.top, plot.height);
                return (
                  <rect
                    // biome-ignore lint/suspicious/noArrayIndexKey: sparkline values are an ordered numeric series with no stable id
                    key={index}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(baselineY - y, 0)}
                    rx={Math.min(1, barWidth / 2)}
                    fill="currentColor"
                  />
                );
              })
            : null}
          {type === "area" ? (
            <path
              d={buildAreaPath(points, baselineY, curve)}
              fill={`url(#${gradientId})`}
              stroke="none"
            />
          ) : null}
          {type === "line" || type === "area" ? (
            <path
              data-slot="sparkline-line"
              d={buildSeriesPath(points, curve)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
        </g>
      </svg>
    </span>
  );
});

Sparkline.displayName = "Sparkline";
