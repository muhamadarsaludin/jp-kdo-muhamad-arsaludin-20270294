export type Point = { x: number; y: number };

export type Curve = "linear" | "smooth" | "step";

export type Scale = {
  min: number;
  max: number;
  step: number;
  ticks: number[];
};

/** Rounds a range to a "nice" number (1, 2, 5 × 10ⁿ), the classic tick algorithm. */
export function niceNum(range: number, round: boolean): number {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / 10 ** exponent;
  let nice: number;
  if (round) {
    if (fraction < 1.5) nice = 1;
    else if (fraction < 3) nice = 2;
    else if (fraction < 7) nice = 5;
    else nice = 10;
  } else {
    if (fraction <= 1) nice = 1;
    else if (fraction <= 2) nice = 2;
    else if (fraction <= 5) nice = 5;
    else nice = 10;
  }
  return nice * 10 ** exponent;
}

function round(value: number): number {
  return Number(value.toFixed(10));
}

/** Builds a rounded [min, max] domain and its evenly spaced tick values. */
export function niceScale(min: number, max: number, count = 5): Scale {
  let lower = min;
  let upper = max;
  if (lower === upper) {
    // Flat data still needs a visible band; pad around the single value.
    if (lower === 0) upper = 1;
    else {
      lower = lower - Math.abs(lower) * 0.5;
      upper = upper + Math.abs(upper) * 0.5;
    }
  }
  const step = niceNum(niceNum(upper - lower, false) / (count - 1), true);
  const domainMin = Math.floor(lower / step) * step;
  const domainMax = Math.ceil(upper / step) * step;
  const ticks: number[] = [];
  for (let value = domainMin; value <= domainMax + step * 0.5; value += step) {
    ticks.push(round(value));
  }
  return { min: domainMin, max: domainMax, step, ticks };
}

/** Maps a value to a y pixel position (top-origin SVG coordinates). */
export function scaleY(value: number, domainMin: number, domainMax: number, top: number, height: number): number {
  if (domainMax === domainMin) return top + height / 2;
  const ratio = (value - domainMin) / (domainMax - domainMin);
  return top + (1 - ratio) * height;
}

/** Maps a data index to an x pixel position across the plot width. */
export function scaleX(index: number, count: number, left: number, width: number): number {
  if (count <= 1) return left + width / 2;
  return left + (index / (count - 1)) * width;
}

export function buildLinePath(points: Point[]): string {
  if (points.length === 0) return "";
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${round(point.x)} ${round(point.y)}`).join(" ");
}

/** Smooth (monotone cubic) path that passes through every point without overshooting. */
export function buildSmoothPath(points: Point[]): string {
  const first = points[0];
  if (points.length < 3 || !first) return buildLinePath(points);

  const dx: number[] = [];
  const slope: number[] = [];
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    if (!current || !next) continue;
    const h = next.x - current.x;
    dx[index] = h;
    slope[index] = h === 0 ? 0 : (next.y - current.y) / h;
  }

  const tangent: number[] = [];
  tangent[0] = slope[0] ?? 0;
  for (let index = 1; index < points.length - 1; index += 1) {
    const previous = slope[index - 1] ?? 0;
    const current = slope[index] ?? 0;
    if (previous * current <= 0) {
      tangent[index] = 0;
    } else {
      const h0 = dx[index - 1] ?? 1;
      const h1 = dx[index] ?? 1;
      const w1 = 2 * h1 + h0;
      const w2 = h1 + 2 * h0;
      tangent[index] = (w1 + w2) / (w1 / previous + w2 / current);
    }
  }
  tangent[points.length - 1] = slope[points.length - 2] ?? 0;

  let path = `M ${round(first.x)} ${round(first.y)}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    if (!current || !next) continue;
    const h = dx[index] ?? 0;
    const c1x = current.x + h / 3;
    const c1y = current.y + ((tangent[index] ?? 0) * h) / 3;
    const c2x = next.x - h / 3;
    const c2y = next.y - ((tangent[index + 1] ?? 0) * h) / 3;
    path += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(next.x)} ${round(next.y)}`;
  }
  return path;
}

/** Step-after path (horizontal, then vertical) for discrete events. */
export function buildStepPath(points: Point[]): string {
  const first = points[0];
  if (!first) return "";
  let path = `M ${round(first.x)} ${round(first.y)}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    if (!previous || !current) continue;
    path += ` L ${round(current.x)} ${round(previous.y)} L ${round(current.x)} ${round(current.y)}`;
  }
  return path;
}

export function buildSeriesPath(points: Point[], curve: Curve = "linear"): string {
  if (curve === "smooth") return buildSmoothPath(points);
  if (curve === "step") return buildStepPath(points);
  return buildLinePath(points);
}

export function buildAreaPath(points: Point[], baselineY: number, curve: Curve = "linear"): string {
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return "";
  return `${buildSeriesPath(points, curve)} L ${round(last.x)} ${round(baselineY)} L ${round(first.x)} ${round(baselineY)} Z`;
}

export type BarRect = { x: number; y: number; width: number; height: number; radius: number };

export function buildBarRect(
  index: number,
  count: number,
  value: number,
  domainMin: number,
  domainMax: number,
  plot: { left: number; top: number; width: number; height: number },
  bandRatio = 0.6,
): BarRect {
  const band = plot.width / count;
  const barWidth = band * bandRatio;
  const x = plot.left + band * (index + 0.5) - barWidth / 2;
  const zeroY = scaleY(Math.min(Math.max(0, domainMin), domainMax), domainMin, domainMax, plot.top, plot.height);
  const valueY = scaleY(value, domainMin, domainMax, plot.top, plot.height);
  const y = Math.min(zeroY, valueY);
  const height = Math.max(Math.abs(valueY - zeroY), 0);
  return {
    x: round(x),
    y: round(y),
    width: round(barWidth),
    height: round(height),
    radius: round(Math.min(4, barWidth / 2)),
  };
}

/** Converts a clock angle (0° = 12 o'clock, clockwise) to cartesian coordinates. */
export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): Point {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export function buildArcPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  if (innerRadius <= 0) {
    return [
      `M ${round(cx)} ${round(cy)}`,
      `L ${round(outerStart.x)} ${round(outerStart.y)}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${round(outerEnd.x)} ${round(outerEnd.y)}`,
      "Z",
    ].join(" ");
  }
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  return [
    `M ${round(outerStart.x)} ${round(outerStart.y)}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${round(outerEnd.x)} ${round(outerEnd.y)}`,
    `L ${round(innerEnd.x)} ${round(innerEnd.y)}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${round(innerStart.x)} ${round(innerStart.y)}`,
    "Z",
  ].join(" ");
}

/** Splits a proportional 360° sweep into per-value [start, end] angle pairs. */
export function buildArcAngles(values: number[]): { start: number; end: number }[] {
  const total = values.reduce((sum, value) => sum + Math.max(value, 0), 0);
  if (total <= 0) return values.map(() => ({ start: 0, end: 0 }));
  let cursor = 0;
  return values.map((value) => {
    const sweep = (Math.max(value, 0) / total) * 360;
    const arc = { start: cursor, end: cursor + sweep };
    cursor += sweep;
    return arc;
  });
}
