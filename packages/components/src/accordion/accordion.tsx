import {
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useId,
  useState,
} from "react";

import { cn } from "@kdo/utils";
import { ChevronDown } from "lucide-react";

import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./accordion.type";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./accordion-context";

function normalizeValues(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function AccordionRoot(
  {
    type = "single",
    variant = "outlined",
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    separator = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const [internalValues, setInternalValues] = useState<string[]>(() => normalizeValues(defaultValue));
  const isControlled = value !== undefined;
  const expandedValues = isControlled ? normalizeValues(value) : internalValues;

  const isExpanded = useCallback((itemValue: string) => expandedValues.includes(itemValue), [expandedValues]);

  const toggle = useCallback(
    (itemValue: string) => {
      let next: string[];
      if (type === "multiple") {
        next = expandedValues.includes(itemValue)
          ? expandedValues.filter((entry) => entry !== itemValue)
          : [...expandedValues, itemValue];
      } else if (expandedValues.includes(itemValue)) {
        next = [];
      } else {
        next = [itemValue];
      }
      if (next !== expandedValues) {
        if (!isControlled) setInternalValues(next);
        onValueChange?.(type === "multiple" ? next : next[0]);
      }
    },
    [type, expandedValues, isControlled, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ isExpanded, toggle, disabled, separator }}>
      <div
        ref={ref}
        data-slot="accordion"
        data-variant={variant}
        className={cn(
          "flex w-full min-w-0 flex-col text-primary",
          variant === "outlined"
            ? "rounded-lg border border-primary bg-primary [&>[data-slot=item]:first-child_[data-slot=trigger]]:rounded-t-lg [&>[data-slot=item]:last-child_[data-slot=trigger]]:rounded-b-lg"
            : "border-transparent bg-transparent",
          disabled && "opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

AccordionRoot.displayName = "Accordion";

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, disabled = false, className, children, ...props },
  ref,
) {
  const { isExpanded, toggle, disabled: rootDisabled, separator } = useAccordionContext();
  const triggerId = useId();
  const contentId = useId();
  const expanded = isExpanded(value);
  const effectiveDisabled = disabled || rootDisabled;

  const handleToggle = useCallback(() => {
    if (effectiveDisabled) return;
    toggle(value);
  }, [effectiveDisabled, toggle, value]);

  return (
    <AccordionItemContext.Provider
      value={{ value, expanded, disabled: effectiveDisabled, triggerId, contentId, toggle: handleToggle }}
    >
      <div
        ref={ref}
        data-slot="item"
        data-state={expanded ? "open" : "closed"}
        className={cn(separator && "border-secondary border-t", "first:border-t-0", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

AccordionItem.displayName = "Accordion.Item";

function focusTrigger(direction: 1 | -1 | "first" | "last", scope: HTMLElement | null): void {
  const root = scope?.closest('[data-slot="accordion"]');
  if (root === null || root === undefined) return;
  const triggers = Array.from(root.querySelectorAll<HTMLElement>('[data-slot="trigger"]:not([disabled])'));
  if (triggers.length === 0) return;
  if (direction === "first" || direction === "last") {
    const edge = direction === "first" ? triggers[0] : triggers[triggers.length - 1];
    edge?.focus();
    return;
  }
  const active = document.activeElement as HTMLElement | null;
  const current = active === null ? -1 : triggers.indexOf(active);
  const next = triggers[(current + direction + triggers.length) % triggers.length];
  next?.focus();
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  { startContent, endContent, action, className, children, onClick, onKeyDown, ...props },
  ref,
) {
  const { expanded, disabled, triggerId, contentId, toggle } = useAccordionItemContext();

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    toggle();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusTrigger(1, event.currentTarget);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusTrigger(-1, event.currentTarget);
        break;
      case "Home":
        event.preventDefault();
        focusTrigger("first", event.currentTarget);
        break;
      case "End":
        event.preventDefault();
        focusTrigger("last", event.currentTarget);
        break;
      default:
        break;
    }
  };

  return (
    <div data-slot="header" className="flex items-center">
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={expanded}
        aria-controls={contentId}
        disabled={disabled || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-slot="trigger"
        data-state={expanded ? "open" : "closed"}
        className={cn(
          "flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-4 py-3 text-left text-sm font-medium outline-1 -outline-offset-1 outline-transparent transition-colors hover:bg-secondary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {startContent ? (
          <span data-slot="start" className="flex shrink-0 items-center [&>svg]:size-4">
            {startContent}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">{children}</span>
        {endContent ? (
          <span data-slot="end" className="flex shrink-0 items-center">
            {endContent}
          </span>
        ) : null}
        <ChevronDown
          aria-hidden="true"
          data-slot="chevron"
          className={cn(
            "size-4 shrink-0 text-tertiary transition-transform motion-safe:duration-200",
            expanded && "-rotate-180",
          )}
        />
      </button>
      {action ? (
        <span data-slot="action" className="flex shrink-0 items-center pr-4">
          {action}
        </span>
      ) : null}
    </div>
  );
});

AccordionTrigger.displayName = "Accordion.Trigger";

export const AccordionContent = forwardRef<HTMLElement, AccordionContentProps>(function AccordionContent(
  { className, children, ...props },
  ref,
) {
  const { expanded, triggerId, contentId } = useAccordionItemContext();

  return (
    <section
      ref={ref}
      id={contentId}
      aria-labelledby={triggerId}
      data-slot="content"
      data-state={expanded ? "open" : "closed"}
      inert={!expanded}
      className={cn(
        "grid transition-[grid-template-rows] motion-safe:duration-200 motion-safe:ease-out",
        expanded ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]",
        className,
      )}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="p-4 text-sm text-tertiary">{children}</div>
      </div>
    </section>
  );
});

AccordionContent.displayName = "Accordion.Content";

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
