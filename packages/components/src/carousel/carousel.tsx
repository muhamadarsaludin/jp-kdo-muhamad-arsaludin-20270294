import { cn } from "@kdo/utils";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { useIsomorphicLayoutEffect } from "../lib/floating-tray";
import styles from "./carousel.module.css";
import type {
  CarouselControlProps,
  CarouselIndicatorProps,
  CarouselItemProps,
  CarouselProps,
  CarouselTrackProps,
} from "./carousel.type";
import {
  carouselIndicatorActive,
  carouselIndicatorActiveHeight,
  carouselIndicatorActiveWidth,
  carouselIndicatorDotSize,
  carouselIndicatorFocus,
  carouselIndicatorGap,
  carouselIndicatorInactive,
  carouselIndicatorProgress,
  carouselIndicatorTrack,
} from "./carousel.variants";
import { CarouselContext, type CarouselContextValue, useCarouselContext } from "./carousel-context";
import { useCarouselState } from "./use-carousel";

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const CarouselRoot = forwardRef<HTMLDivElement, CarouselProps>(function CarouselRoot(
  {
    value,
    defaultValue,
    onValueChange,
    count: countProp,
    orientation = "horizontal",
    loop = true,
    autoplay = false,
    interval = 5000,
    paused = false,
    pauseOnHover = true,
    className,
    children,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    "aria-label": ariaLabel = "Carousel",
    ...props
  },
  ref,
) {
  const baseId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [measuredCount, setMeasuredCount] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();
  const autoplayEnabled = autoplay && !prefersReducedMotion;

  useIsomorphicLayoutEffect(() => {
    if (countProp !== undefined) return;
    const element = trackRef.current;
    if (element === null) return;
    const measure = () => setMeasuredCount(element.childElementCount);
    measure();
    const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(measure);
    observer?.observe(element, { childList: true });
    return () => observer?.disconnect();
  }, [countProp]);

  const count = countProp ?? measuredCount;
  const { index, isPaused, progressKey, goTo, next, prev, setInteractionPaused } = useCarouselState(
    {
      count,
      value,
      defaultValue,
      onValueChange,
      loop,
      autoplay: autoplayEnabled,
      interval,
      paused,
    },
  );

  const contextValue: CarouselContextValue = {
    index,
    count,
    goTo,
    next,
    prev,
    loop,
    autoplay: autoplayEnabled,
    interval,
    isPaused,
    setInteractionPaused,
    progressKey,
    orientation,
    trackRef,
    baseId,
  };

  const handleMouseEnter = (event: ReactMouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(event);
    if (pauseOnHover) setInteractionPaused(true);
  };

  const handleMouseLeave = (event: ReactMouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    if (pauseOnHover) setInteractionPaused(false);
  };

  const handleFocus = (event: ReactFocusEvent<HTMLDivElement>) => {
    onFocus?.(event);
    if (pauseOnHover) setInteractionPaused(true);
  };

  const handleBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    onBlur?.(event);
    if (pauseOnHover) setInteractionPaused(false);
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: the root is a labelled region (role="region"); the compound contract and refs are built on a div, and the implicit section role would not change the accessibility tree.
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      id={baseId}
      data-slot="carousel"
      data-orientation={orientation}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      <CarouselContext.Provider value={contextValue}>{children}</CarouselContext.Provider>
    </div>
  );
});

CarouselRoot.displayName = "Carousel";

export const CarouselTrack = forwardRef<HTMLDivElement, CarouselTrackProps>(function CarouselTrack(
  { className, children, ...props },
  ref,
) {
  const { index, orientation, trackRef } = useCarouselContext();
  const horizontal = orientation === "horizontal";

  return (
    <div
      ref={ref}
      data-slot="carousel-viewport"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        ref={trackRef}
        data-slot="carousel-track"
        data-orientation={orientation}
        className={cn(
          "flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none",
          horizontal ? "flex-row" : "flex-col",
        )}
        style={{
          transform: horizontal
            ? `translate3d(-${index * 100}%, 0, 0)`
            : `translate3d(0, -${index * 100}%, 0)`,
        }}
      >
        {Children.map(children, (child, childIndex) => {
          if (!isValidElement<{ "aria-label"?: string }>(child)) return child;
          const active = childIndex === index;
          const label = child.props["aria-label"];
          return cloneElement(child as ReactElement<Record<string, unknown>>, {
            "aria-hidden": active ? undefined : true,
            "aria-label": active ? label : undefined,
            inert: active ? undefined : true,
          });
        })}
      </div>
    </div>
  );
});

CarouselTrack.displayName = "Carousel.Track";

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(
  { className, children, ...props },
  ref,
) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a slide is a role="group" so aria-roledescription="slide" is valid; fieldset/optgroup are not appropriate for slides.
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    >
      {children}
    </div>
  );
});

CarouselItem.displayName = "Carousel.Item";

export const CarouselIndicator = forwardRef<HTMLDivElement, CarouselIndicatorProps>(
  function CarouselIndicator(
    {
      variant = "static",
      orientation,
      size = "md",
      color = "brand",
      count,
      value,
      onValueChange,
      interval,
      paused,
      label = "Slides",
      slideLabel,
      className,
      ...props
    },
    ref,
  ) {
    const context = useContext(CarouselContext);
    const resolvedCount = count ?? context?.count ?? 0;
    const resolvedIndex = value ?? context?.index ?? 0;
    const resolvedOrientation = orientation ?? context?.orientation ?? "horizontal";
    const resolvedInterval = interval ?? context?.interval ?? 5000;
    const goTo = onValueChange ?? context?.goTo;
    const isPaused = paused ?? (context === null ? false : context.isPaused || !context.autoplay);
    const progressKey = context?.progressKey ?? resolvedIndex;
    const vertical = resolvedOrientation === "vertical";
    const dynamic = variant === "dynamic";

    if (resolvedCount <= 0) return null;

    return (
      // biome-ignore lint/a11y/useSemanticElements: the indicator is a group of navigation buttons (role="group"), which has no dedicated semantic element.
      <div
        ref={ref}
        role="group"
        aria-label={label}
        data-slot="carousel-indicator"
        data-orientation={resolvedOrientation}
        data-variant={variant}
        className={cn(
          "flex items-center",
          vertical ? "flex-col" : "flex-row",
          carouselIndicatorGap,
          className,
        )}
        {...props}
      >
        {Array.from({ length: resolvedCount }, (_, i) => {
          const active = i === resolvedIndex;
          const showProgress = active && dynamic && !isPaused;
          const lengthClass = vertical
            ? carouselIndicatorActiveHeight[size]
            : carouselIndicatorActiveWidth[size];
          let colorClass: string;
          if (!active) {
            colorClass = cn(carouselIndicatorInactive[color], "enabled:hover:opacity-70");
          } else if (showProgress) {
            colorClass = carouselIndicatorTrack[color];
          } else {
            colorClass = carouselIndicatorActive[color];
          }
          return (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: dots are a fixed-length positional list
              key={i}
              type="button"
              data-slot="carousel-indicator-dot"
              data-state={active ? "active" : "inactive"}
              aria-label={slideLabel ? slideLabel(i) : `Go to slide ${i + 1}`}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo?.(i)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-full outline-none transition-[width,height,background-color,opacity] duration-300 ease-out motion-reduce:transition-none",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                carouselIndicatorFocus[color],
                carouselIndicatorDotSize[size],
                active ? lengthClass : null,
                colorClass,
              )}
            >
              {showProgress ? (
                <span
                  key={progressKey}
                  data-slot="carousel-indicator-progress"
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0",
                    vertical ? styles.progressY : styles.progressX,
                    carouselIndicatorProgress[color],
                  )}
                  style={{ animationDuration: `${resolvedInterval}ms` }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    );
  },
);

CarouselIndicator.displayName = "Carousel.Indicator";

export const CarouselControl = forwardRef<HTMLButtonElement, CarouselControlProps>(
  function CarouselControl(
    { direction = "next", className, children, onClick, "aria-label": ariaLabel, ...props },
    ref,
  ) {
    const { next, prev, orientation } = useCarouselContext();
    const horizontal = orientation === "horizontal";
    const icons = horizontal
      ? { next: ChevronRight, prev: ChevronLeft }
      : { next: ChevronDown, prev: ChevronUp };
    const Icon = icons[direction];

    const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (direction === "next") next();
      else prev();
    };

    return (
      <button
        ref={ref}
        type="button"
        data-slot="carousel-control"
        data-direction={direction}
        aria-label={ariaLabel ?? (direction === "next" ? "Next slide" : "Previous slide")}
        onClick={handleClick}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full bg-primary-inverse/70 text-primary-inverse shadow-sm outline-none transition-colors",
          "hover:bg-primary-inverse focus-visible:outline-2 focus-visible:outline-primary-inverse focus-visible:outline-offset-2",
          className,
        )}
        {...props}
      >
        {children ?? <Icon aria-hidden="true" className="size-5" />}
      </button>
    );
  },
);

CarouselControl.displayName = "Carousel.Control";

export const Carousel = Object.assign(CarouselRoot, {
  Track: CarouselTrack,
  Item: CarouselItem,
  Indicator: CarouselIndicator,
  Control: CarouselControl,
});
