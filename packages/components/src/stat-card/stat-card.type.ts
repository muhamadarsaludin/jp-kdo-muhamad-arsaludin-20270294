import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { StatCardColor, StatCardTrendDirection } from "./stat-card.variants";

export type StatCardTrend = {
  /** Percentage delta; its sign drives the direction when `direction` is omitted. */
  value: number;
  /** Arrow/color direction. Defaults from the sign of `value`. */
  direction?: StatCardTrendDirection;
  /** Supporting text shown next to the delta (e.g. "vs last week"). */
  label?: string;
};

export type StatCardProps = ComponentPropsWithoutRef<"div"> & {
  /** Small caption above the value. */
  label: ReactNode;
  /** The headline figure (already formatted). */
  value: ReactNode;
  /** Visual in the framed slot at the top-right. */
  icon?: ReactNode;
  /** Tints the icon frame. Defaults to `brand`. */
  color?: StatCardColor;
  /** Delta pill shown in the footer. */
  trend?: StatCardTrend;
};
