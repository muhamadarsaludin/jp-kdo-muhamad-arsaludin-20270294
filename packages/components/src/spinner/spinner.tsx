import { cn } from "@kdo/utils";
import type { SVGProps } from "react";

import type { Size } from "../type";
import styles from "./spinner.module.css";

export type SpinnerColor = "brand" | "neutral" | "inverse";

export type SpinnerProps = Omit<SVGProps<SVGSVGElement>, "color"> & {
  size?: Size;
  color?: SpinnerColor;
  strokeWidth?: number;
};

const spinnerSize: Record<Size, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

const spinnerHighlight: Record<SpinnerColor, string> = {
  brand: "stroke-brand-primary",
  neutral: "stroke-tertiary-inverse",
  inverse: "stroke-tertiary",
};

export function Spinner({
  className,
  size = "md",
  color = "brand",
  strokeWidth = 12,
  ...props
}: SpinnerProps) {
  const circleProps = {
    fill: "transparent",
    cx: "50%",
    cy: "50%",
    r: 20,
    strokeWidth,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      role="status"
      aria-label="Loading"
      className={cn(styles.spinner, spinnerSize[size], className)}
      {...props}
    >
      <circle {...circleProps} className={cn(styles.spinner__track, "stroke-primary opacity-70")} />
      <circle {...circleProps} className={cn(styles.spinner__highlight, spinnerHighlight[color])} />
    </svg>
  );
}
