import { cn } from "@kdo/utils";
import { ChevronDown } from "lucide-react";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "../button/button";
import type { ButtonProps } from "../button/button.type";
import { Popover } from "../popover/popover";
import { PopoverLabel, PopoverSeparator } from "../popover/popover-parts";
import type { DropdownProps } from "./dropdown.type";
import { DropdownContext, focusDropdownTrigger } from "./dropdown-context";
import { DropdownItem } from "./dropdown-item";

function DropdownMenu({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuItems = useCallback(() => {
    if (menuRef.current === null) return [];
    return Array.from(
      menuRef.current.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([disabled]), [role="menuitemradio"]:not([disabled]), [role="option"]:not([disabled])',
      ),
    );
  }, []);

  // The menu mounts fresh on every open (the portal unmounts on close),
  // so one mount effect covers initial focus: the selected radio item when
  // present, otherwise the first item.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional mount-only effect; re-running while open would steal focus mid-interaction.
  useEffect(() => {
    const selected = menuRef.current?.querySelector<HTMLElement>(
      '[role="menuitemradio"][aria-checked="true"]',
    );
    (selected ?? menuItems()[0])?.focus();
  }, []);

  const focusItem = useCallback(
    (direction: 1 | -1 | "first" | "last") => {
      const items = menuItems();
      if (items.length === 0) return;
      if (direction === "first" || direction === "last") {
        const edge = direction === "first" ? items[0] : items[items.length - 1];
        edge?.focus();
        return;
      }
      const active = document.activeElement as HTMLElement | null;
      const current = active === null ? -1 : items.indexOf(active);
      const next = items[(current + direction + items.length) % items.length];
      next?.focus();
    },
    [menuItems],
  );

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(-1);
        break;
      case "Home":
        event.preventDefault();
        focusItem("first");
        break;
      case "End":
        event.preventDefault();
        focusItem("last");
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label={label}
      onKeyDown={handleMenuKeyDown}
      data-slot="menu"
      className={cn("flex min-w-40 flex-col p-1 outline-none", className)}
    >
      {children}
    </div>
  );
}

const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(function DropdownRoot(
  {
    trigger,
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    position = "bottom-start",
    offset = 8,
    contentClassName,
    triggerClassName,
    menuClassName,
    matchTriggerWidth = false,
    className,
    selectionMode = "none",
    value,
    defaultValue,
    onValueChange,
    selectionIndicator = "none",
    selectionPosition = "end",
    "aria-label": ariaLabel,
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value !== undefined ? value : internalValue;
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const selectValue = useCallback(
    (next: string) => {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  const setPopoverRef = useCallback(
    (node: HTMLDivElement | null) => {
      popoverRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const close = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const focusTrigger = useCallback(() => {
    focusDropdownTrigger(popoverRef.current);
  }, []);

  const handleTriggerZoneKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (isOpen || disabled) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    if (!isControlled) setInternalOpen(true);
    onOpenChange?.(true);
  };

  const enhancedTrigger =
    isValidElement<ButtonProps>(trigger) &&
    trigger.type === Button &&
    trigger.props.endContent === undefined
      ? cloneElement(trigger as ReactElement<ButtonProps>, {
          endContent: (
            <ChevronDown
              aria-hidden="true"
              className={cn("transition-transform", isOpen && "-rotate-180")}
            />
          ),
        })
      : trigger;

  return (
    <DropdownContext.Provider
      value={{
        close,
        focusTrigger,
        selectionMode,
        selectedValue,
        selectValue,
        selectionIndicator,
        selectionPosition,
      }}
    >
      <Popover
        ref={setPopoverRef}
        trigger={enhancedTrigger}
        open={isOpen}
        onOpenChange={handleOpenChange}
        disabled={disabled}
        defaultPosition={position}
        offset={offset}
        hasPopup="menu"
        contentRole="presentation"
        contentClassName={contentClassName}
        triggerClassName={triggerClassName}
        matchTriggerWidth={matchTriggerWidth}
        className={className}
        onKeyDown={handleTriggerZoneKeyDown}
      >
        <DropdownMenu label={ariaLabel} className={menuClassName}>
          {children}
        </DropdownMenu>
      </Popover>
    </DropdownContext.Provider>
  );
});

DropdownRoot.displayName = "Dropdown";

export const Dropdown = Object.assign(DropdownRoot, {
  Item: DropdownItem,
  Separator: PopoverSeparator,
  Label: PopoverLabel,
});
