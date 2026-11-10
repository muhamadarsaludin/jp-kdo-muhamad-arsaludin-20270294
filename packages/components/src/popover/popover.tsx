import { cn } from "@kdo/utils";
import {
  forwardRef,
  isValidElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  floatingArrowBorderClasses,
  floatingArrowPlacementClasses,
  floatingArrowStyle,
  isTriggerFocusable,
  useFloatingTray,
} from "../lib/floating-tray";
import { focusableElements } from "../lib/focus";
import { mergeTriggerProps } from "../lib/merge-trigger-props";
import { isTopOverlayLayer, useOverlayLayer } from "../lib/overlay-stack";
import type { PopoverProps, PopoverSide } from "./popover.type";
import { PopoverLabel, PopoverSeparator } from "./popover-parts";

export { resolvePopoverPosition } from "../lib/floating-tray";

function focusTriggerControl(scope: HTMLElement | null): void {
  if (scope === null) return;
  const [control] = focusableElements(scope);
  (control ?? scope).focus();
}

const PopoverRoot = forwardRef<HTMLDivElement, PopoverProps>(function PopoverRoot(
  {
    trigger,
    children,
    defaultPosition = "bottom-start",
    offset = 8,
    showArrow = false,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    closeOnOutsideClick = true,
    closeOnEscape = true,
    closeOnFocusOut = true,
    matchTriggerWidth = false,
    hasPopup = "dialog",
    contentRole = "dialog",
    contentLabel,
    "aria-label": ariaLabel,
    id: containerId,
    className,
    triggerClassName,
    contentClassName,
    onClick,
    ...props
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const contentId = useId();
  const triggerHostId = useId();

  const [mounted, setMounted] = useState(false);
  const triggerTakesFocus = isTriggerFocusable(trigger);
  const layer = useOverlayLayer(isOpen && mounted);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const {
    top,
    left,
    position: adaptedPosition,
    arrowOffset,
    anchorWidth: triggerWidth,
  } = useFloatingTray({
    active: isOpen && mounted,
    anchorRef: wrapperRef,
    contentRef,
    defaultPosition,
    offset,
    matchAnchorWidth: matchTriggerWidth,
  });

  const setWrapperRef = useCallback(
    (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const close = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [disabled, isControlled, isOpen, onOpenChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: globalThis.PointerEvent) => {
      if (!closeOnOutsideClick) return;
      const target = event.target as Node;
      if (wrapperRef.current?.contains(target) || contentRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, closeOnOutsideClick, close]);

  useEffect(() => {
    if (!isOpen || !closeOnFocusOut) return;

    const handleFocusIn = (event: globalThis.FocusEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current?.contains(target) || contentRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener("focusin", handleFocusIn);
    return () => document.removeEventListener("focusin", handleFocusIn);
  }, [isOpen, closeOnFocusOut, close]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!closeOnEscape || event.key !== "Escape" || !isTopOverlayLayer(layer)) return;
      // If focus is inside the tray the dialog node unmounts on close,
      // so park focus back on the trigger control instead of losing it to <body>.
      if (contentRef.current?.contains(document.activeElement) === true && disabled !== true) {
        focusTriggerControl(triggerRef.current);
      }
      close();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, close, disabled, layer]);

  const handleTriggerClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(event);
    if (event.defaultPrevented) return;
    toggle();
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Tab from the trigger enters the portaled tray. Without this bridge the
    // tray sits after the app root in the DOM, so the next Tab would leave the
    // wrapper and close it before a keyboard user could reach its content.
    if (event.key === "Tab" && isOpen && !event.shiftKey) {
      const [first] = focusableElements(contentRef.current);
      if (first) {
        event.preventDefault();
        first.focus();
        return;
      }
    }

    // Let keys pressed inside the trigger content (typing in an input,
    // activating a nested button) reach their own control untouched.
    // Native activation (Enter/Space on an inner button) still bubbles up
    // as a click and toggles exactly once via handleTriggerClick.
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggle();
  };

  const handleContentKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !event.shiftKey) return;
    const [first] = focusableElements(contentRef.current);
    if (first === undefined || first !== document.activeElement) return;
    event.preventDefault();
    focusTriggerControl(triggerRef.current);
  };

  const [side] = adaptedPosition.split("-") as [PopoverSide];

  const triggerAria = {
    "aria-label": ariaLabel,
    "aria-haspopup": hasPopup,
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? contentId : undefined,
    "aria-disabled": disabled || undefined,
  };
  const triggerElement = isValidElement<{ id?: string }>(trigger) ? trigger : null;
  const injectIntoTrigger = triggerTakesFocus && triggerElement !== null;
  const triggerElementId = triggerElement?.props.id ?? triggerHostId;
  const labelHostId = injectIntoTrigger ? triggerElementId : triggerHostId;
  let contentAria: Record<string, string | undefined> = {};
  if (contentRole === "dialog") {
    if (contentLabel !== undefined) contentAria = { "aria-label": contentLabel };
    else if (ariaLabel !== undefined && triggerElement === null)
      contentAria = { "aria-label": ariaLabel };
    else contentAria = { "aria-labelledby": labelHostId };
  }
  const enhancedTrigger =
    injectIntoTrigger && triggerElement !== null
      ? mergeTriggerProps(triggerElement, {
          ...triggerAria,
          id: triggerElementId,
          tabIndex: disabled ? -1 : undefined,
        })
      : trigger;

  return (
    <div ref={setWrapperRef} id={containerId} className={cn("inline-flex", className)} {...props}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: the wrapper doubles as the keyboard control (role="button") when the trigger itself is not focusable; with a focusable trigger it is a plain layout wrapper, and the key handler ignores events bubbled from inside. It must stay a div because the trigger accepts any element, including a button or input, which cannot nest inside a native button. */}
      <div
        ref={triggerRef}
        id={injectIntoTrigger ? undefined : triggerHostId}
        role={triggerTakesFocus ? undefined : "button"}
        tabIndex={triggerTakesFocus || disabled ? -1 : 0}
        className={cn(
          !triggerTakesFocus && "focus-visible:outline-2 focus-visible:outline-brand-primary/50",
          triggerClassName,
        )}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        {...(injectIntoTrigger ? {} : triggerAria)}
        data-slot="trigger"
      >
        {enhancedTrigger}
      </div>

      {mounted &&
        isOpen &&
        createPortal(
          // biome-ignore lint/a11y/noStaticElementInteractions: the tray only bridges Shift+Tab back to the trigger; its children own the interactions.
          <div
            ref={contentRef}
            role={contentRole}
            id={contentId}
            {...contentAria}
            onKeyDown={handleContentKeyDown}
            data-slot="content"
            data-position={adaptedPosition}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              transform: `translate3d(${left}px, ${top}px, 0)`,
              width: matchTriggerWidth && triggerWidth !== undefined ? triggerWidth : undefined,
            }}
            className="relative z-50"
          >
            {/* The arrow lives outside the scroll container: the panel clips its
                overflow, which used to hide the diamond entirely. */}
            {showArrow && (
              <span
                aria-hidden="true"
                data-slot="arrow"
                className={cn(
                  "absolute z-[1] size-2.5 rotate-45 border-secondary bg-primary",
                  floatingArrowPlacementClasses[side],
                  floatingArrowBorderClasses[side],
                )}
                style={floatingArrowStyle(side, arrowOffset)}
              />
            )}
            <div
              data-slot="panel"
              className={cn(
                "relative z-[2] max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] overflow-auto overscroll-contain rounded-lg border border-secondary bg-primary text-primary shadow-lg",
                matchTriggerWidth ? "w-full" : "w-max",
                contentClassName,
              )}
            >
              <div data-slot="inner" className="rounded-[inherit] bg-inherit">
                {children}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
});

PopoverRoot.displayName = "Popover";

export const Popover = Object.assign(PopoverRoot, {
  Label: PopoverLabel,
  Separator: PopoverSeparator,
});
