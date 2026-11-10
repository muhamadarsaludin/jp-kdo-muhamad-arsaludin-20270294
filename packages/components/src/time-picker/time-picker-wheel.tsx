import { type KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@kdo/utils";

import type { TimePickerColumnOption } from "./time-picker-option";

const ROW_HEIGHT = 36;
const SETTLE_MS = 120;

type TimeWheelProps = {
  options: TimePickerColumnOption[];
  ariaLabel: string;
  valueKey: string | null;
  onSelect: (key: string) => void;
  autoFocus?: boolean;
  className?: string;
};

function findSelectedIndex(options: TimePickerColumnOption[], valueKey: string | null): number {
  const selected = options.findIndex((option) => option.key === valueKey && !option.disabled);
  if (selected !== -1) return selected;
  const firstEnabled = options.findIndex((option) => !option.disabled);
  return firstEnabled === -1 ? 0 : firstEnabled;
}

function nearestEnabled(options: TimePickerColumnOption[], index: number): number | null {
  if (options.length === 0) return null;
  if (!options[index]?.disabled) return index;

  for (let offset = 1; offset < options.length; offset += 1) {
    const after = options[index + offset];
    if (after !== undefined && !after.disabled) return index + offset;
    const before = options[index - offset];
    if (before !== undefined && !before.disabled) return index - offset;
  }
  return null;
}

function stepEnabled(options: TimePickerColumnOption[], from: number, direction: 1 | -1): number | null {
  if (options.length === 0) return null;
  for (let step = 1; step <= options.length; step += 1) {
    const index = (from + direction * step + options.length) % options.length;
    if (!options[index]?.disabled) return index;
  }
  return null;
}

function wheelOptionClass(option: TimePickerColumnOption, isActive: boolean): string {
  const base = "flex h-9 w-full items-center justify-center text-sm tabular-nums transition-colors";

  if (option.disabled) return cn(base, "cursor-not-allowed text-quinary opacity-50");
  if (isActive) return cn(base, "cursor-pointer font-semibold text-brand-primary");
  return cn(base, "cursor-pointer text-primary");
}

export function TimeWheel({ options, ariaLabel, valueKey, onSelect, autoFocus = false, className }: TimeWheelProps) {
  const id = useId();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const settleTimer = useRef<number | null>(null);
  const lastValueKey = useRef<string | null | undefined>(undefined);
  const didAutoFocus = useRef(false);
  const userScrolled = useRef(false);
  const [activeIndex, setActiveIndex] = useState(() => findSelectedIndex(options, valueKey));

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "auto") => {
    scrollRef.current?.scrollTo?.({ top: index * ROW_HEIGHT, behavior });
  }, []);

  useEffect(() => {
    if (lastValueKey.current === valueKey) return;
    lastValueKey.current = valueKey;
    const index = findSelectedIndex(options, valueKey);
    setActiveIndex(index);
    scrollToIndex(index, "auto");
  }, [valueKey, options, scrollToIndex]);

  useEffect(() => {
    if (!autoFocus || didAutoFocus.current) return;
    didAutoFocus.current = true;
    scrollRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  useEffect(
    () => () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    },
    [],
  );

  const settle = useCallback(
    (index: number) => {
      if (valueKey === null && !userScrolled.current) return;

      const target = nearestEnabled(options, index);
      if (target === null) return;

      if (target !== index) {
        setActiveIndex(target);
        scrollToIndex(target, "smooth");
      }

      const option = options[target];
      if (option !== undefined && option.key !== valueKey) onSelect(option.key);
    },
    [options, onSelect, scrollToIndex, valueKey],
  );

  const handleScroll = () => {
    if (options.length === 0) return;
    const top = scrollRef.current?.scrollTop ?? 0;
    const index = Math.max(0, Math.min(Math.round(top / ROW_HEIGHT), options.length - 1));
    setActiveIndex(index);

    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => settle(index), SETTLE_MS);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (options.length === 0) return;

    let next: number | null = null;
    switch (event.key) {
      case "ArrowUp":
        next = stepEnabled(options, activeIndex, -1);
        break;
      case "ArrowDown":
        next = stepEnabled(options, activeIndex, 1);
        break;
      case "Home":
        next = options.findIndex((option) => !option.disabled);
        if (next === -1) next = null;
        break;
      case "End":
        for (let index = options.length - 1; index >= 0; index -= 1) {
          if (!options[index]?.disabled) {
            next = index;
            break;
          }
        }
        break;
      default:
        return;
    }

    if (next === null) return;
    userScrolled.current = true;
    event.preventDefault();
    scrollToIndex(next, "smooth");
    const option = options[next];
    if (option !== undefined && !option.disabled && option.key !== valueKey) onSelect(option.key);
  };

  return (
    <div
      ref={scrollRef}
      role="listbox"
      aria-label={ariaLabel}
      aria-activedescendant={options[activeIndex] === undefined ? undefined : `${id}-${options[activeIndex].key}`}
      tabIndex={0}
      onScroll={handleScroll}
      onWheel={() => {
        userScrolled.current = true;
      }}
      onTouchMove={() => {
        userScrolled.current = true;
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative h-[calc(var(--spacing-9)*5)] w-full overflow-y-auto overscroll-y-contain outline-1 -outline-offset-1 outline-transparent [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div aria-hidden="true" className="h-9" />
      <div aria-hidden="true" className="h-9" />
      {options.map((option, index) => (
        <div
          key={option.key}
          id={`${id}-${option.key}`}
          role="option"
          aria-selected={index === activeIndex}
          aria-disabled={option.disabled || undefined}
          data-time-option={option.key}
          tabIndex={-1}
          onClick={() => {
            if (option.disabled) return;
            scrollToIndex(index, "smooth");
            if (option.key !== valueKey) onSelect(option.key);
          }}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            if (option.disabled) return;
            onSelect(option.key);
          }}
          className={wheelOptionClass(option, index === activeIndex)}
        >
          {option.label}
        </div>
      ))}
      <div aria-hidden="true" className="h-9" />
      <div aria-hidden="true" className="h-9" />
    </div>
  );
}
