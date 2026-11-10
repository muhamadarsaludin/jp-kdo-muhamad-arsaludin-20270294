export const statCardColors = ["brand", "neutral", "info", "success", "warning", "error"] as const;

export type StatCardColor = (typeof statCardColors)[number];

export const statCardIconFrames: Record<StatCardColor, string> = {
  brand: "bg-brand-muted-primary text-brand-primary",
  neutral: "bg-secondary text-tertiary",
  info: "bg-info-muted-primary text-info-primary",
  success: "bg-success-muted-primary text-success-primary",
  warning: "bg-warning-muted-primary text-warning-primary",
  error: "bg-error-muted-primary text-error-primary",
};

export const statCardTrendDirections = ["up", "down"] as const;

export type StatCardTrendDirection = (typeof statCardTrendDirections)[number];

export const statCardTrendStyles: Record<StatCardTrendDirection, string> = {
  up: "bg-success-muted-primary text-success-primary",
  down: "bg-error-muted-primary text-error-primary",
};
