import {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";

import type { SliderProps, SliderValue } from "./slider.type";
import {
  sliderAreaSizeHorizontal,
  sliderAreaSizeVertical,
  sliderFillColors,
  sliderFocus,
  sliderRailThickness,
  sliderRailThicknessVertical,
  sliderThumbColors,
  sliderThumbSize,
} from "./slider.variants";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapValue(raw: number, min: number, max: number, step: number): number {
  const bounded = clamp(raw, min, max);
  const snapped = min + Math.round((bounded - min) / step) * step;
  return Number(clamp(snapped, min, max).toFixed(10));
}

function toValues(input: SliderValue | undefined, count: number, min: number, max: number): number[] {
  let entries: number[];
  if (Array.isArray(input)) entries = input;
  else if (input === undefined) entries = [];
  else entries = [input];
  const clamped = entries.map((entry) => clamp(entry, min, max));
  if (count === 1) return [clamped[0] ?? min];
  const lower = clamped[0] ?? min;
  const upper = clamped[1] ?? max;
  return lower <= upper ? [lower, upper] : [upper, lower];
}

function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)));
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value,
    defaultValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    orientation = "horizontal",
    size = "md",
    color = "brand",
    disabled = false,
    label,
    showValue = false,
    valueFormat,
    getThumbLabel,
    className,
    ...props
  },
  ref,
) {
  const horizontal = orientation === "horizontal";
  const isControlled = value !== undefined;
  const count = Array.isArray(value) || Array.isArray(defaultValue) ? 2 : 1;
  const defaultValues = count === 2 ? [min, max] : [min];

  const [internalValues, setInternalValues] = useState<number[]>(() =>
    toValues(defaultValue ?? defaultValues, count, min, max),
  );
  const values = isControlled ? toValues(value, count, min, max) : internalValues;

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Array<HTMLDivElement | null>>([]);
  const draggingRef = useRef<boolean>(false);
  const activeIndexRef = useRef<number>(0);

  const interactive = !disabled;
  const safeStep = step > 0 ? step : 1;

  const percentOf = (entry: number) => (max > min ? ((entry - min) / (max - min)) * 100 : 0);

  const commit = useCallback(
    (index: number, raw: number) => {
      const next = [...values];
      next[index] = snapValue(raw, min, max, safeStep);
      if (count === 2) {
        const lower = next[0] ?? min;
        const upper = next[1] ?? max;
        if (index === 0) next[0] = Math.min(lower, upper);
        else next[1] = Math.max(lower, upper);
      }
      if (!isControlled) setInternalValues(next);
      onValueChange?.(count === 2 ? next : (next[0] ?? min));
    },
    [values, count, min, max, safeStep, isControlled, onValueChange],
  );

  const valueFromPointer = (clientX: number, clientY: number): number => {
    const node = trackRef.current;
    if (node === null) return values[0] ?? min;
    const rect = node.getBoundingClientRect();
    if (horizontal) {
      const ratio = rect.width > 0 ? clamp((clientX - rect.left) / rect.width, 0, 1) : 0;
      return min + ratio * (max - min);
    }
    const ratio = rect.height > 0 ? clamp(1 - (clientY - rect.top) / rect.height, 0, 1) : 0;
    return min + ratio * (max - min);
  };

  const pickIndex = (raw: number): number => {
    if (count === 1) return 0;
    return Math.abs(raw - (values[0] ?? min)) <= Math.abs(raw - (values[1] ?? max)) ? 0 : 1;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    event.preventDefault();
    const raw = valueFromPointer(event.clientX, event.clientY);
    const index = pickIndex(raw);
    activeIndexRef.current = index;
    draggingRef.current = true;
    thumbRefs.current[index]?.focus();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    commit(index, raw);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    // biome-ignore lint/suspicious/noUnnecessaryConditions: draggingRef flips during a pointer drag, which the rule cannot see.
    if (!draggingRef.current || !interactive) return;
    commit(activeIndexRef.current, valueFromPointer(event.clientX, event.clientY));
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  const handleThumbKeyDown = (index: number, event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const current = values[index] ?? min;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = current + safeStep;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = current - safeStep;
        break;
      case "PageUp":
        next = current + safeStep * 10;
        break;
      case "PageDown":
        next = current - safeStep * 10;
        break;
      case "Home":
        next = index === 0 ? min : (values[0] ?? min);
        break;
      case "End":
        next = count === 2 && index === 0 ? (values[1] ?? max) : max;
        break;
      default:
        return;
    }
    event.preventDefault();
    commit(index, next);
  };

  const thumbLabel = (index: number): string => {
    if (getThumbLabel) return getThumbLabel(index, count);
    if (count === 2) return index === 0 ? "Minimum" : "Maximum";
    return "Value";
  };

  let valueText: ReactNode;
  if (valueFormat) {
    valueText = valueFormat(count === 2 ? values : (values[0] ?? min));
  } else if (count === 2) {
    valueText = `${formatNumber(values[0] ?? min)} – ${formatNumber(values[1] ?? max)}`;
  } else {
    valueText = formatNumber(values[0] ?? min);
  }

  const fillStyle = (): CSSProperties => {
    if (count === 2) {
      const start = percentOf(values[0] ?? min);
      const end = percentOf(values[1] ?? max);
      return horizontal
        ? { left: `${start}%`, width: `${end - start}%` }
        : { bottom: `${start}%`, height: `${end - start}%` };
    }
    const percent = percentOf(values[0] ?? min);
    return horizontal ? { left: 0, width: `${percent}%` } : { bottom: 0, height: `${percent}%` };
  };

  const thickness = horizontal ? sliderRailThickness[size] : sliderRailThicknessVertical[size];

  return (
    <div
      ref={ref}
      data-slot="slider"
      data-orientation={orientation}
      data-disabled={disabled || undefined}
      className={cn(
        "flex min-w-0 select-none flex-col gap-2",
        horizontal ? "w-full" : "h-full items-center",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {label != null || showValue ? (
        <div className="flex w-full items-center justify-between gap-3">
          {label != null ? <span className="min-w-0 truncate text-primary text-sm">{label}</span> : <span />}
          {showValue ? (
            <span data-slot="value" className="shrink-0 text-sm text-tertiary tabular-nums">
              {valueText}
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        ref={trackRef}
        data-slot="track"
        className={cn(
          "relative flex touch-none",
          horizontal
            ? cn("w-full items-center", sliderAreaSizeHorizontal[size])
            : cn("flex-1 flex-col items-center", sliderAreaSizeVertical[size]),
          interactive ? "cursor-pointer" : "cursor-not-allowed",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <div
          data-slot="rail"
          className={cn(
            "absolute rounded-full bg-quaternary",
            thickness,
            horizontal ? "top-1/2 w-full -translate-y-1/2" : "left-1/2 h-full -translate-x-1/2",
          )}
        />
        <div
          data-slot="fill"
          className={cn(
            "absolute rounded-full",
            sliderFillColors[color],
            thickness,
            horizontal ? "top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2",
          )}
          style={fillStyle()}
        />
        {values.map((entry, index) => {
          const position = percentOf(entry);
          const style = horizontal ? { left: `${position}%` } : { bottom: `${position}%` };
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: thumb order is positional and stable (min/max).
              key={index}
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              role="slider"
              data-slot="thumb"
              aria-orientation={orientation}
              aria-label={thumbLabel(index)}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={entry}
              aria-disabled={disabled || undefined}
              tabIndex={interactive ? 0 : -1}
              onKeyDown={(event) => handleThumbKeyDown(index, event)}
              className={cn(
                "absolute z-10 block rounded-full border-2 border-utility-white shadow-sm outline-1 outline-transparent -outline-offset-1 transition-[box-shadow] focus-visible:ring-3",
                sliderThumbSize[size],
                sliderThumbColors[color],
                sliderFocus[color],
                horizontal ? "top-1/2 -translate-x-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2 translate-y-1/2",
              )}
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
});

Slider.displayName = "Slider";
