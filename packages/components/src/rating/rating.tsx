import { cn } from "@kdo/utils";
import {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./rating.module.css";
import type { RatingProps } from "./rating.type";
import { ratingEmptyColor, ratingFilledColors, ratingSizes } from "./rating.variants";

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
        fill="currentColor"
      />
    </svg>
  );
}

const DEFAULT_STAR_ICON = <StarIcon />;

const BURST_COUNT = 10;
const BURST_DURATION = 700;
const BURST_PARTICLES = Array.from({ length: BURST_COUNT }, (_, index) => {
  const angle = (index / BURST_COUNT) * Math.PI * 2;
  const distance = index % 2 === 0 ? 26 : 18;
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance),
    rotation: Math.round((angle * 180) / Math.PI) + 45,
    delay: index % 3 === 0 ? 0 : 24,
  };
});

type Burst = { id: number; star: number };

function canAnimate(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value,
    defaultValue = 0,
    onValueChange,
    max = 5,
    precision = 1,
    size = "md",
    color = "warning",
    readOnly = false,
    disabled = false,
    icon,
    emptyIcon,
    showValue = false,
    formatValue,
    className,
    "aria-label": ariaLabel,
    onClick,
    onKeyDown,
    ...props
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [burst, setBurst] = useState<Burst | null>(null);
  const starsRef = useRef<HTMLSpanElement>(null);
  const burstId = useRef(0);

  useEffect(() => {
    if (burst === null) return;
    const timer = window.setTimeout(() => setBurst(null), BURST_DURATION);
    return () => window.clearTimeout(timer);
  }, [burst]);

  const isControlled = value !== undefined;
  const currentValue = clamp(isControlled ? value : internalValue, 0, max);
  const interactive = !readOnly && !disabled;
  const displayValue = interactive && hoverValue !== null ? hoverValue : currentValue;

  const sizes = ratingSizes[size];
  const filledColor = ratingFilledColors[color];
  const filledIcon = icon ?? DEFAULT_STAR_ICON;
  const resolvedEmptyIcon = emptyIcon ?? icon ?? DEFAULT_STAR_ICON;
  const valueText = `${formatNumber(currentValue)} of ${max}`;

  const commit = (next: number) => {
    const clamped = clamp(next, 0, max);
    if (!isControlled) setInternalValue(clamped);
    onValueChange?.(clamped);
  };

  const triggerBurst = (next: number) => {
    if (next <= 0 || !canAnimate()) return;
    burstId.current += 1;
    setBurst({ id: burstId.current, star: Math.min(max, Math.ceil(next)) });
  };

  const valueFromClientX = (clientX: number): number => {
    const node = starsRef.current;
    if (node === null) return currentValue;
    const rect = node.getBoundingClientRect();
    if (rect.width === 0) return currentValue;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = ratio * max;
    const stepped = precision === 0.5 ? Math.ceil(raw * 2) / 2 : Math.ceil(raw);
    return clamp(stepped, precision, max);
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    setHoverValue(valueFromClientX(event.clientX));
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (!interactive) return;
    const next = valueFromClientX(event.clientX);
    commit(next);
    triggerBurst(next);
    setHoverValue(null);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !interactive) return;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = currentValue + precision;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = currentValue - precision;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = max;
        break;
      default:
        break;
    }
    if (next === null) return;
    event.preventDefault();
    setHoverValue(null);
    commit(next);
    triggerBurst(next);
  };

  return (
    <div
      {...props}
      ref={ref}
      data-slot="rating"
      data-readonly={readOnly || undefined}
      data-disabled={disabled || undefined}
      role="slider"
      aria-label={ariaLabel ?? "Rating"}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-valuetext={valueText}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      tabIndex={interactive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md outline-1 outline-transparent -outline-offset-1",
        "focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
        interactive && "cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <span
        ref={starsRef}
        data-slot="stars"
        aria-hidden="true"
        className={cn("inline-flex", sizes.stars)}
      >
        {Array.from({ length: max }, (_, position) => {
          const star = position + 1;
          const fill = clamp(displayValue - position, 0, 1);
          return (
            <span
              key={star}
              data-slot="star"
              data-filled={fill > 0 || undefined}
              className={cn("relative inline-flex", sizes.star)}
            >
              <span data-slot="star-empty" className={ratingEmptyColor}>
                {resolvedEmptyIcon}
              </span>
              <span
                data-slot="star-fill"
                className={cn("absolute inset-y-0 left-0 overflow-hidden", filledColor)}
                style={{ width: `${fill * 100}%` }}
              >
                {filledIcon}
              </span>
              {burst?.star === star ? (
                <span
                  key={burst.id}
                  data-slot="burst"
                  aria-hidden="true"
                  className={cn(styles.burst, filledColor)}
                >
                  {BURST_PARTICLES.map((particle) => (
                    <span
                      key={`${particle.x}:${particle.y}`}
                      data-slot="burst-particle"
                      className={styles.particle}
                      style={
                        {
                          "--burst-x": `${particle.x}px`,
                          "--burst-y": `${particle.y}px`,
                          "--burst-rotate": `${particle.rotation}deg`,
                          "--burst-delay": `${particle.delay}ms`,
                        } as CSSProperties
                      }
                    >
                      {filledIcon}
                    </span>
                  ))}
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
      {showValue ? (
        <span data-slot="value" className={cn("text-tertiary tabular-nums", sizes.value)}>
          {formatValue ? formatValue(currentValue, max) : formatNumber(currentValue)}
        </span>
      ) : null}
    </div>
  );
});

Rating.displayName = "Rating";
