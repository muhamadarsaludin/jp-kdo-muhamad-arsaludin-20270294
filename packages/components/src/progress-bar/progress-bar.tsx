import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@kdo/utils";

import styles from "./progress-bar.module.css";

export type ProgressBarColor = "brand" | "neutral" | "success" | "warning" | "error";
export type ProgressBarShape = "bar" | "circle" | "semi";
/** Progress indicators need steps below the shared control scale (down to a loader). */
export type ProgressBarSize = "2xs" | "xs" | "sm" | "md" | "lg";

export type ProgressBarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  value?: number;
  max?: number;
  shape?: ProgressBarShape;
  size?: ProgressBarSize;
  color?: ProgressBarColor;
  /** Bar shape only — unknown duration, shows a sliding fill and drops `aria-valuenow`. */
  indeterminate?: boolean;
  label?: ReactNode;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => ReactNode;
};

const progressBarTrackSizes: Record<ProgressBarSize, string> = {
  "2xs": "h-0.5",
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
} as const;

const progressBarRingSizes: Record<ProgressBarSize, string> = {
  "2xs": "size-4",
  xs: "size-6",
  sm: "size-10",
  md: "size-14",
  lg: "size-20",
} as const;

const progressBarSemiSizes: Record<ProgressBarSize, string> = {
  "2xs": "w-6 h-3",
  xs: "w-8 h-4",
  sm: "w-12 h-6",
  md: "w-16 h-8",
  lg: "w-24 h-12",
} as const;

const progressBarValueTextSizes: Record<ProgressBarSize, string> = {
  "2xs": "text-2xs",
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

/** The two smallest steps are loader-sized, so the value reads better under the shape. */
const COMPACT_SIZES: ReadonlySet<ProgressBarSize> = new Set(["2xs", "xs"]);

const progressBarColors: Record<ProgressBarColor, string> = {
  brand: "bg-brand-primary",
  neutral: "bg-primary-inverse",
  success: "bg-success-primary",
  warning: "bg-warning-primary",
  error: "bg-error-primary",
} as const;

const progressBarStrokeColors: Record<ProgressBarColor, string> = {
  brand: "stroke-brand-primary",
  neutral: "stroke-primary-inverse",
  success: "stroke-success-primary",
  warning: "stroke-warning-primary",
  error: "stroke-error-primary",
} as const;

// Stroke and radius live in the 100-unit viewBox. Smaller steps get a thicker
// lane so a 16px ring still reads as a ring instead of a hairline; from `md` up
// the lane settles at 12.
const ringGeometry: Record<ProgressBarSize, { stroke: number; radius: number }> = {
  "2xs": { stroke: 20, radius: 38 },
  xs: { stroke: 17, radius: 40 },
  sm: { stroke: 12, radius: 44 },
  md: { stroke: 12, radius: 44 },
  lg: { stroke: 12, radius: 44 },
};

// The semi gauge sits on the bottom edge: y is the chord line, so `stroke / 2`
// must fit under it and `radius` must clear the top of the 50-unit box.
function semiGeometry({ stroke }: { stroke: number }) {
  return { stroke, radius: 48 - stroke, y: 50 - stroke / 2 };
}

function ProgressRing({
  shape,
  percent,
  sizeClass,
  colorClass,
  stroke,
  radius,
  children,
}: {
  shape: Exclude<ProgressBarShape, "bar">;
  percent: number;
  sizeClass: string;
  colorClass: string;
  stroke: number;
  radius: number;
  children?: ReactNode;
}) {
  if (shape === "circle") {
    const circumference = 2 * Math.PI * radius;

    return (
      <div className={cn("relative inline-flex items-center justify-center", sizeClass)}>
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth={stroke} className="stroke-secondary" />
          <circle
            data-slot="progress-bar-fill"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className={colorClass}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percent / 100)}
          />
        </svg>
        {children}
      </div>
    );
  }

  const { y } = semiGeometry({ stroke });
  const arc = `M${50 - radius} ${y} A ${radius} ${radius} 0 0 1 ${50 + radius} ${y}`;
  const length = Math.PI * radius;

  return (
    <div className={cn("relative inline-flex items-end justify-center", sizeClass)}>
      <svg viewBox="0 0 100 50" className="size-full" aria-hidden="true">
        <path d={arc} fill="none" strokeWidth={stroke} strokeLinecap="round" className="stroke-secondary" />
        <path
          data-slot="progress-bar-fill"
          d={arc}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className={colorClass}
          strokeDasharray={length}
          strokeDashoffset={length * (1 - percent / 100)}
        />
      </svg>
      {children}
    </div>
  );
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  {
    value = 0,
    max = 100,
    shape = "bar",
    size = "md",
    color = "brand",
    indeterminate = false,
    label,
    showValue = false,
    valueFormat,
    className,
    ...props
  },
  ref,
) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = max > 0 ? (clamped / max) * 100 : 0;
  const isIndeterminate = indeterminate && shape === "bar";
  const valueText = valueFormat ? valueFormat(clamped, max) : `${Math.round(percent)}%`;
  // A custom formatter ("2 of 6") is meaningful to screen readers too; a bare
  // ReactNode (icon + text) is left to the visible label.
  const valueTextString =
    valueFormat && (typeof valueText === "string" || typeof valueText === "number") ? String(valueText) : undefined;
  const compact = (shape === "circle" || shape === "semi") && COMPACT_SIZES.has(size);

  if (shape === "bar") {
    return (
      <div
        ref={ref}
        data-slot="progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : clamped}
        aria-valuetext={valueTextString}
        className={cn("flex w-full flex-col gap-1.5", className)}
        {...props}
      >
        {(label != null || showValue) && (
          <div className="flex items-center justify-between gap-3">
            {label != null ? <span className="min-w-0 truncate text-primary text-sm">{label}</span> : <span />}
            {showValue ? <span className="shrink-0 text-sm text-tertiary tabular-nums">{valueText}</span> : null}
          </div>
        )}
        <div className={cn("w-full overflow-hidden rounded-full bg-quaternary", progressBarTrackSizes[size])}>
          <div
            data-slot="progress-bar-fill"
            className={cn(
              "h-full rounded-full",
              progressBarColors[color],
              isIndeterminate ? styles.indeterminate : "transition-[width] motion-reduce:transition-none",
            )}
            style={isIndeterminate ? undefined : { width: `${percent}%` }}
          />
        </div>
      </div>
    );
  }

  const centerClassName =
    shape === "circle"
      ? "absolute inset-0 flex items-center justify-center"
      : "absolute inset-x-0 bottom-0 text-center";

  return (
    <div
      ref={ref}
      data-slot="progress-bar"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      aria-valuetext={valueTextString}
      className={cn("flex w-full flex-col items-center gap-1.5", className)}
      {...props}
    >
      {label != null ? <span className="truncate text-primary text-sm">{label}</span> : null}
      <ProgressRing
        shape={shape}
        percent={percent}
        sizeClass={shape === "circle" ? progressBarRingSizes[size] : progressBarSemiSizes[size]}
        colorClass={progressBarStrokeColors[color]}
        stroke={ringGeometry[size].stroke}
        radius={
          shape === "circle" ? ringGeometry[size].radius : semiGeometry({ stroke: ringGeometry[size].stroke }).radius
        }
      >
        {showValue && !compact ? (
          <span
            className={cn("font-medium text-primary tabular-nums", progressBarValueTextSizes[size], centerClassName)}
          >
            {valueText}
          </span>
        ) : null}
      </ProgressRing>
      {showValue && compact ? (
        <span className={cn("font-medium text-tertiary tabular-nums", progressBarValueTextSizes[size])}>
          {valueText}
        </span>
      ) : null}
    </div>
  );
});
