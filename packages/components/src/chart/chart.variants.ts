export const chartColors = ["brand", "neutral", "info", "success", "warning", "error"] as const;

export type ChartColor = (typeof chartColors)[number];

/**
 * Chart colors resolve to the mode-aware `utility` palette (mid-tone 500 steps)
 * so data marks stay legible on both light and dark surfaces. They are applied
 * as `text-*` classes and consumed through `currentColor`.
 */
export const chartColorClasses: Record<ChartColor, string> = {
  brand: "text-utility-brand-500",
  neutral: "text-utility-neutral-500",
  info: "text-utility-info-500",
  success: "text-utility-success-500",
  warning: "text-utility-warning-500",
  error: "text-utility-error-500",
};

/**
 * The same colors as raw CSS variables. Used where `currentColor` cannot reach
 * a colored ancestor (SVG gradient stops inside `<defs>`), so area fills stay
 * in sync with the series color and follow light/dark mode.
 */
export const chartColorVars: Record<ChartColor, string> = {
  brand: "var(--color-utility-brand-500)",
  neutral: "var(--color-utility-neutral-500)",
  info: "var(--color-utility-info-500)",
  success: "var(--color-utility-success-500)",
  warning: "var(--color-utility-warning-500)",
  error: "var(--color-utility-error-500)",
};

/** Ordered palette used by multi-color charts (pie/donut) when `colors` is not set. */
export const chartDefaultPalette: ChartColor[] = ["brand", "info", "success", "warning", "error", "neutral"];
