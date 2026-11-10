import { type KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useRef } from "react";

import { cn } from "@kdo/utils";

import type { TimePickerListAlign } from "./time-picker.type";
import type { TimePickerColumnOption } from "./time-picker-option";

type TimeListProps = {
  options: TimePickerColumnOption[];
  ariaLabel: string;
  align: TimePickerListAlign;
  onSelect: (key: string) => void;
  autoFocus?: boolean;
  className?: string;
};

const rowBase =
  "flex h-9 w-full shrink-0 cursor-pointer items-center rounded-lg px-2 text-sm outline-1 -outline-offset-1 outline-transparent transition-colors focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50";

function rowClass(option: TimePickerColumnOption, align: TimePickerListAlign): string {
  let alignment = "justify-start text-left";
  if (align === "center") alignment = "justify-center text-center";
  else if (align === "end") alignment = "justify-end text-right";

  if (option.disabled) {
    return cn(rowBase, alignment, "cursor-not-allowed text-quinary opacity-50 hover:bg-transparent");
  }
  if (option.selected) {
    return cn(rowBase, alignment, "bg-brand-muted-primary font-medium text-brand-primary");
  }
  return cn(rowBase, alignment, "text-secondary hover:bg-primary-hover hover:text-primary");
}

export function TimeList({ options, ariaLabel, align, onSelect, autoFocus = false, className }: TimeListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const didAutoFocus = useRef(false);
  const selectedKey = options.find((option) => option.selected && !option.disabled)?.key ?? null;
  const firstEnabledKey = options.find((option) => !option.disabled)?.key ?? null;
  const tabStopKey = selectedKey ?? firstEnabledKey;

  const focusOption = useCallback((key: string) => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-time-option="${key}"]`);
    node?.focus({ preventScroll: true });
    node?.scrollIntoView?.({ block: "nearest" });
  }, []);

  useEffect(() => {
    if (!autoFocus || didAutoFocus.current) return;
    didAutoFocus.current = true;
    if (tabStopKey !== null) focusOption(tabStopKey);
  }, [autoFocus, tabStopKey, focusOption]);

  useEffect(() => {
    if (selectedKey === null) return;
    const node = listRef.current?.querySelector<HTMLElement>(`[data-time-option="${selectedKey}"]`);
    node?.scrollIntoView?.({ block: "nearest" });
  }, [selectedKey]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (options.length === 0) return;

    const nodes = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
    const activeIndex = nodes.indexOf(document.activeElement as HTMLElement);
    const currentIndex = activeIndex === -1 ? nodes.findIndex((node) => node.tabIndex === 0) : activeIndex;
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % nodes.length;
        break;
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + nodes.length) % nodes.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = nodes.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    const backwards = event.key === "ArrowUp" || event.key === "End";
    for (let step = 0; step < nodes.length; step += 1) {
      const index = backwards ? (nextIndex - step + nodes.length) % nodes.length : (nextIndex + step) % nodes.length;
      const node = nodes[index];
      const key = node?.dataset.timeOption;
      if (node === undefined || key === undefined || node.getAttribute("aria-disabled") === "true") continue;
      onSelect(key);
      node.focus({ preventScroll: true });
      node.scrollIntoView?.({ block: "nearest" });
      return;
    }
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      tabIndex={tabStopKey === null ? 0 : -1}
      className={cn(
        // Negative margin + matching padding gives the focus ring room inside the
        // scroll viewport, which would otherwise clip it on every side.
        "-m-1 flex h-[calc(var(--spacing-9)*5+var(--spacing-2))] min-w-0 flex-col overflow-y-auto scroll-p-1 p-1 outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          role="option"
          aria-selected={option.selected}
          aria-disabled={option.disabled || undefined}
          data-time-option={option.key}
          tabIndex={option.key === tabStopKey ? 0 : -1}
          onClick={() => {
            if (!option.disabled) onSelect(option.key);
          }}
          className={rowClass(option, align)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
