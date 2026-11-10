import { forwardRef, useId } from "react";

import { cn } from "@kdo/utils";

import { useElementWidth } from "../lib/use-element-width";
import type { ChartDatum, ChartProps } from "./chart.type";
import {
  buildArcAngles,
  buildArcPath,
  buildAreaPath,
  buildBarRect,
  buildSeriesPath,
  type Curve,
  niceScale,
  type Point,
  scaleX,
  scaleY,
} from "./chart.utils";
import { type ChartColor, chartColorClasses, chartColorVars, chartDefaultPalette } from "./chart.variants";

const DEFAULT_HEIGHT = 240;
const AXIS_PADDING = { top: 8, right: 8, bottom: 24, left: 44 };
const PLAIN_PADDING = { top: 8, right: 8, bottom: 8, left: 8 };
const MIN_LABEL_GAP = 64;
const LEGEND_RESERVE = 168;

function defaultFormat(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

type CartesianArgs = {
  type: "line" | "area" | "bar";
  data: ChartDatum[];
  color: ChartColor;
  curve: Curve;
  width: number;
  height: number;
  showGrid: boolean;
  showAxis: boolean;
  min?: number;
  max?: number;
  formatValue: (value: number) => string;
  gradientId: string;
  ariaLabel: string;
};

function renderCartesian({
  type,
  data,
  color,
  curve,
  width,
  height,
  showGrid,
  showAxis,
  min,
  max,
  formatValue,
  gradientId,
  ariaLabel,
}: CartesianArgs) {
  const pad = showAxis ? AXIS_PADDING : PLAIN_PADDING;
  const plot = {
    left: pad.left,
    top: pad.top,
    width: Math.max(width - pad.left - pad.right, 0),
    height: Math.max(height - pad.top - pad.bottom, 0),
  };

  const values = data.map((datum) => datum.value);
  const scale = niceScale(min ?? Math.min(0, ...values), max ?? Math.max(0, ...values));
  const colorClass = chartColorClasses[color];

  const points: Point[] = data.map((datum, index) => ({
    x: scaleX(index, data.length, plot.left, plot.width),
    y: scaleY(datum.value, scale.min, scale.max, plot.top, plot.height),
  }));
  const linePath = buildSeriesPath(points, curve);
  const baselineY = scaleY(Math.min(Math.max(0, scale.min), scale.max), scale.min, scale.max, plot.top, plot.height);
  const areaPath = buildAreaPath(points, baselineY, curve);

  const labelStep = Math.max(1, Math.ceil(data.length / Math.max(1, Math.floor(plot.width / MIN_LABEL_GAP))));

  return (
    <svg
      data-slot="chart-svg"
      role="img"
      aria-label={ariaLabel}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block"
    >
      {showAxis
        ? scale.ticks.map((tick) => {
            const y = scaleY(tick, scale.min, scale.max, plot.top, plot.height);
            return (
              <g key={tick}>
                {showGrid ? (
                  <line
                    data-slot="chart-grid"
                    x1={plot.left}
                    x2={plot.left + plot.width}
                    y1={y}
                    y2={y}
                    className="stroke-secondary"
                    strokeOpacity={0.6}
                    strokeWidth={1}
                  />
                ) : null}
                <text
                  x={plot.left - 8}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  className="fill-tertiary"
                >
                  {formatValue(tick)}
                </text>
              </g>
            );
          })
        : null}

      {type === "area" ? (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColorVars[color]} stopOpacity={0.32} />
            <stop offset="95%" stopColor={chartColorVars[color]} stopOpacity={0.02} />
          </linearGradient>
        </defs>
      ) : null}

      <g data-slot="chart-series" className={colorClass}>
        {type === "bar"
          ? data.map((datum, index) => {
              const rect = buildBarRect(index, data.length, datum.value, scale.min, scale.max, plot);
              return (
                <rect
                  // biome-ignore lint/suspicious/noArrayIndexKey: ordered series; position is the identity
                  key={`${datum.label}-${index}`}
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  rx={rect.radius}
                  fill="currentColor"
                />
              );
            })
          : null}
        {type === "area" ? (
          <path data-slot="chart-area" d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        ) : null}
        {type === "line" || type === "area" ? (
          <path
            data-slot="chart-line"
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
      </g>

      {showAxis
        ? data.map((datum, index) => {
            if (index % labelStep !== 0) return null;
            const x =
              type === "bar"
                ? plot.left + (plot.width / data.length) * (index + 0.5)
                : scaleX(index, data.length, plot.left, plot.width);
            return (
              <text
                // biome-ignore lint/suspicious/noArrayIndexKey: ordered series; position is the identity
                key={`${datum.label}-${index}`}
                x={x}
                y={height - 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                className="fill-tertiary"
              >
                {datum.label}
              </text>
            );
          })
        : null}
    </svg>
  );
}

type CircularArgs = {
  type: "pie" | "donut";
  data: ChartDatum[];
  colors?: ChartColor[];
  width: number;
  height: number;
  showLegend: boolean;
  ariaLabel: string;
};

function renderCircular({ type, data, colors, width, height, showLegend, ariaLabel }: CircularArgs) {
  const palette = colors && colors.length > 0 ? colors : chartDefaultPalette;
  const reserve = showLegend ? LEGEND_RESERVE : 0;
  const size = Math.max(80, Math.min(height, width - reserve));
  const radius = size / 2;
  const cx = radius;
  const cy = size / 2;
  const outerRadius = Math.max(radius - 4, 0);
  const innerRadius = type === "donut" ? outerRadius * 0.6 : 0;
  const total = data.reduce((sum, datum) => sum + Math.max(datum.value, 0), 0);
  const arcs = buildArcAngles(data.map((datum) => datum.value));

  return (
    <div data-slot="chart-figure" className="flex w-full items-center gap-6">
      <svg
        data-slot="chart-svg"
        role="img"
        aria-label={ariaLabel}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block shrink-0"
      >
        {data.map((datum, index) => {
          const arc = arcs[index];
          if (!arc || arc.end - arc.start <= 0) return null;
          const color = palette[index % palette.length] ?? "brand";
          return (
            <path
              // biome-ignore lint/suspicious/noArrayIndexKey: ordered series; position is the identity
              key={`${datum.label}-${index}`}
              data-slot="chart-segment"
              d={buildArcPath(cx, cy, outerRadius, innerRadius, arc.start, arc.end)}
              fill="currentColor"
              className={chartColorClasses[color]}
            />
          );
        })}
      </svg>

      {showLegend ? (
        <ul data-slot="chart-legend" className="flex min-w-0 flex-1 flex-col gap-2 text-sm">
          {data.map((datum, index) => {
            const color = palette[index % palette.length] ?? "brand";
            const percent = total > 0 ? Math.round((Math.max(datum.value, 0) / total) * 100) : 0;
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: ordered series; position is the identity
              <li key={`${datum.label}-${index}`} className="flex items-center gap-2">
                <span
                  className={cn("size-2.5 shrink-0 rounded-full bg-current", chartColorClasses[color])}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate text-primary">{datum.label}</span>
                <span className="shrink-0 text-tertiary tabular-nums">{percent}%</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export const Chart = forwardRef<HTMLDivElement, ChartProps>(function Chart(
  {
    type = "line",
    data,
    color = "brand",
    colors,
    curve = "smooth",
    height = DEFAULT_HEIGHT,
    showGrid = true,
    showAxis = true,
    showLegend = true,
    min,
    max,
    formatValue = defaultFormat,
    className,
    "aria-label": ariaLabel = "Chart",
    ...props
  },
  ref,
) {
  const { elementRef, width } = useElementWidth<HTMLDivElement>();
  const gradientId = `chart-gradient-${useId().replace(/:/g, "")}`;

  const setRef = (node: HTMLDivElement | null) => {
    elementRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <div ref={setRef} data-slot="chart" data-type={type} className={cn("w-full", className)} {...props}>
      {type === "pie" || type === "donut"
        ? renderCircular({ type, data, colors, width, height, showLegend, ariaLabel })
        : renderCartesian({
            type,
            data,
            color,
            curve,
            width,
            height,
            showGrid,
            showAxis,
            min,
            max,
            formatValue,
            gradientId,
            ariaLabel,
          })}
    </div>
  );
});

Chart.displayName = "Chart";
