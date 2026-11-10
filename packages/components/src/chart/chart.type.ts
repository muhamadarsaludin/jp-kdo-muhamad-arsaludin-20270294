import type { ComponentPropsWithoutRef } from "react";

import type { Curve } from "./chart.utils";
import type { ChartColor } from "./chart.variants";

export type ChartType = "line" | "area" | "bar" | "pie" | "donut";

/** A single category or point: `label` names it, `value` sizes it. */
export type ChartDatum = { label: string; value: number };

export type ChartProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  /** `line`, `area`, `bar` (cartesian) or `pie`/`donut` (circular). Defaults to `line`. */
  type?: ChartType;
  data: ChartDatum[];
  /** Single-series color. Ignored by `pie`/`donut`, which use `colors`. */
  color?: ChartColor;
  /** Category colors for `pie`/`donut`. Defaults to the chart palette; cycles when shorter. */
  colors?: ChartColor[];
  /** Line shape for `line`/`area`: a smooth cubic, a step, or straight segments. Defaults to `"smooth"`. */
  curve?: Curve;
  /** Plot height in pixels. Defaults to `240`. */
  height?: number;
  /** Draws horizontal gridlines (cartesian types). Defaults to `true`. */
  showGrid?: boolean;
  /** Draws the y tick labels and x category labels (cartesian types). Defaults to `true`. */
  showAxis?: boolean;
  /** Shows the label list next to a `pie`/`donut`. Defaults to `true`. */
  showLegend?: boolean;
  /** Lower bound of the value axis. Defaults to `0` (or the smallest value when negative). */
  min?: number;
  /** Upper bound of the value axis. Defaults to `0` (or the largest value). */
  max?: number;
  /** Formats y tick labels (cartesian). Defaults to the raw number. */
  formatValue?: (value: number) => string;
};
