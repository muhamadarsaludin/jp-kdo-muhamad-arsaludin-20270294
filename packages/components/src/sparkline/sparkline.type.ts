import type { ComponentPropsWithoutRef } from "react";

import type { Curve } from "../chart/chart.utils";
import type { ChartColor } from "../chart/chart.variants";

export type SparklineType = "line" | "area" | "bar";

export type SparklineProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  /** Numeric series rendered left-to-right. */
  data: number[];
  /** Visual treatment. Defaults to `line`. */
  type?: SparklineType;
  /** Token color for the marks. Defaults to `brand`. */
  color?: ChartColor;
  /** Line shape for `line`/`area`: a smooth cubic, a step, or straight segments. Defaults to `"smooth"`. */
  curve?: Curve;
  /** Width in pixels. Defaults to `96`. */
  width?: number;
  /** Height in pixels. Defaults to `32`. */
  height?: number;
};
