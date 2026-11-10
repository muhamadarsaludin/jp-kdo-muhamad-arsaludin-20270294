import {
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../button";
import { useIsomorphicLayoutEffect } from "../lib/floating-tray";
import styles from "./tabs.module.css";
import type { TabsListProps, TabsPanelProps, TabsProps, TabsTabProps } from "./tabs.type";
import { tabsListClass, tabsTabClass, tabsViewportClass } from "./tabs.variants";
import { TabsContext, useTabsContext } from "./tabs-context";

const DEFAULT_SCROLL_LABELS = { start: "Scroll tabs to the start", end: "Scroll tabs to the end" };
const SCROLL_RATIO = 0.8;
const SCROLL_BUTTON_CLASS =
  "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 scale-90 opacity-0 shadow-sm transition-[opacity,transform] duration-150 ease-out group-hover/tabs:pointer-events-auto group-hover/tabs:scale-100 group-hover/tabs:opacity-100 group-focus-within/tabs:pointer-events-auto group-focus-within/tabs:scale-100 group-focus-within/tabs:opacity-100 max-md:hidden";

function focusTab(direction: 1 | -1 | "first" | "last", current: HTMLElement): string | undefined {
  const list = current.closest('[data-slot="tablist"]');
  if (list === null) return undefined;
  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
  if (tabs.length === 0) return undefined;
  if (direction === "first") {
    tabs[0]?.focus();
    return tabs[0]?.dataset.value;
  }
  if (direction === "last") {
    const last = tabs[tabs.length - 1];
    last?.focus();
    return last?.dataset.value;
  }
  const index = tabs.indexOf(current as HTMLButtonElement);
  const next = tabs[(index + direction + tabs.length) % tabs.length];
  next?.focus();
  return next?.dataset.value;
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function TabsRoot(
  {
    value,
    defaultValue,
    onValueChange,
    orientation = "horizontal",
    variant = "line",
    color = "brand",
    size = "md",
    shape = "rounded",
    width = "content",
    activationMode = "automatic",
    disabled = false,
    noBackground = false,
    noBorder = false,
    scrollButtons = true,
    scrollButtonIcons,
    scrollButtonLabels,
    className,
    children,
    ...props
  },
  ref,
) {
  const baseId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsContext.Provider
      value={{
        value: activeValue,
        setValue,
        baseId,
        orientation,
        variant,
        color,
        size,
        shape,
        width,
        activationMode,
        disabled,
        noBackground,
        noBorder,
        scrollButtons,
        scrollButtonIcons,
        scrollButtonLabels,
      }}
    >
      <div
        ref={ref}
        data-slot="tabs"
        data-orientation={orientation}
        data-variant={variant}
        className={cn(
          "flex min-w-0",
          orientation === "horizontal" ? cn("flex-col", variant === "fluid" ? "gap-0" : "gap-3") : "flex-row gap-6",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

TabsRoot.displayName = "Tabs";

function useScrollEdges(viewportRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
  const [edges, setEdges] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (el === null) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft > 1, end: max > 1 && el.scrollLeft < max - 1 });
  }, [viewportRef]);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      setEdges({ start: false, end: false });
      return;
    }
    const el = viewportRef.current;
    if (el === null) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    resizeObserver?.observe(el);
    const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => measure());
    mutationObserver?.observe(el, { childList: true, subtree: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled, measure, viewportRef]);

  return edges;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, children, ...props },
  ref,
) {
  const {
    orientation,
    variant,
    noBackground,
    noBorder,
    width,
    shape,
    scrollButtons,
    scrollButtonIcons,
    scrollButtonLabels,
  } = useTabsContext();
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollable = width === "scroll" && orientation === "horizontal";
  const showButtons = scrollable && scrollButtons;
  const edges = useScrollEdges(viewportRef, showButtons);

  const scrollBy = (direction: -1 | 1) => {
    const el = viewportRef.current;
    if (el === null || typeof el.scrollBy !== "function") return;
    el.scrollBy({ left: direction * el.clientWidth * SCROLL_RATIO, behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      data-slot="tabs-list"
      className={cn(tabsListClass(variant, orientation, { noBackground, noBorder, width, shape }), className)}
      {...props}
    >
      <div
        ref={viewportRef}
        role="tablist"
        aria-orientation={orientation}
        data-slot="tablist"
        data-variant={variant}
        data-orientation={orientation}
        className={tabsViewportClass(variant, orientation, scrollable, { noBorder })}
      >
        {children}
      </div>
      {showButtons && edges.start ? (
        <Button.Icon
          aria-label={scrollButtonLabels?.start ?? DEFAULT_SCROLL_LABELS.start}
          size="sm"
          shape="pill"
          variant="solid"
          color="inverse"
          onClick={() => scrollBy(-1)}
          className={cn(SCROLL_BUTTON_CLASS, "-left-3")}
        >
          {scrollButtonIcons?.start ?? <ChevronLeft aria-hidden="true" />}
        </Button.Icon>
      ) : null}
      {showButtons && edges.end ? (
        <Button.Icon
          aria-label={scrollButtonLabels?.end ?? DEFAULT_SCROLL_LABELS.end}
          size="sm"
          shape="pill"
          variant="solid"
          color="inverse"
          onClick={() => scrollBy(1)}
          className={cn(SCROLL_BUTTON_CLASS, "-right-3")}
        >
          {scrollButtonIcons?.end ?? <ChevronRight aria-hidden="true" />}
        </Button.Icon>
      ) : null}
    </div>
  );
});

TabsList.displayName = "Tabs.List";

export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(function TabsTab(
  { value, disabled = false, startContent, endContent, className, children, onClick, onKeyDown, ...props },
  ref,
) {
  const {
    value: activeValue,
    setValue,
    baseId,
    orientation,
    variant,
    color,
    size,
    shape,
    width,
    activationMode,
    disabled: rootDisabled,
  } = useTabsContext();
  const selected = activeValue === value;
  const isDisabled = disabled || rootDisabled;
  const horizontal = orientation === "horizontal";
  const hasLabel = children !== undefined && children !== null && children !== "" && children !== false;

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    setValue(value);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const nextKey = horizontal ? "ArrowRight" : "ArrowDown";
    const prevKey = horizontal ? "ArrowLeft" : "ArrowUp";
    let next: string | undefined;

    if (event.key === nextKey) {
      event.preventDefault();
      next = focusTab(1, event.currentTarget);
    } else if (event.key === prevKey) {
      event.preventDefault();
      next = focusTab(-1, event.currentTarget);
    } else if (event.key === "Home") {
      event.preventDefault();
      next = focusTab("first", event.currentTarget);
    } else if (event.key === "End") {
      event.preventDefault();
      next = focusTab("last", event.currentTarget);
    } else {
      return;
    }

    if (activationMode === "automatic" && next !== undefined) setValue(next);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      data-slot="tab"
      data-value={value}
      data-state={selected ? "active" : "inactive"}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      disabled={isDisabled || undefined}
      tabIndex={selected ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        tabsTabClass(variant, orientation, size, color, width, shape, !hasLabel),
        variant === "fluid" && styles.fluidTab,
        className,
      )}
      {...props}
    >
      {startContent ? (
        <span data-slot="start" className="flex shrink-0 items-center">
          {startContent}
        </span>
      ) : null}
      {hasLabel ? (
        <span data-slot="label" className="truncate">
          {children}
        </span>
      ) : null}
      {endContent ? (
        <span data-slot="end" className="flex shrink-0 items-center">
          {endContent}
        </span>
      ) : null}
    </button>
  );
});

TabsTab.displayName = "Tabs.Tab";

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { value, keepMounted = false, className, children, ...props },
  ref,
) {
  const { value: activeValue, baseId } = useTabsContext();
  const selected = activeValue === value;

  if (!selected && !keepMounted) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      data-slot="panel"
      data-state={selected ? "active" : "inactive"}
      hidden={!selected}
      inert={!selected}
      tabIndex={selected ? 0 : undefined}
      className={cn(
        "min-w-0 flex-1 outline-none focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
        styles.panel,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

TabsPanel.displayName = "Tabs.Panel";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
