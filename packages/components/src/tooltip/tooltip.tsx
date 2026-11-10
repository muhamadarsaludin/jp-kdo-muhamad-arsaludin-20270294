import {
  forwardRef,
  isValidElement,
  type FocusEvent as ReactFocusEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";
import { createPortal } from "react-dom";

import { floatingArrowPlacementClasses, floatingArrowStyle, useFloatingTray } from "../lib/floating-tray";
import { mergeTriggerProps } from "../lib/merge-trigger-props";
import { isTopOverlayLayer, useOverlayLayer } from "../lib/overlay-stack";
import type { TooltipProps, TooltipSide } from "./tooltip.type";

const TooltipRoot = forwardRef<HTMLDivElement, TooltipProps>(function TooltipRoot(
  {
    trigger,
    children,
    defaultPosition = "top-center",
    offset = 8,
    showArrow = true,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    openDelay = 150,
    closeDelay = 0,
    closeOnEscape = true,
    className,
    triggerClassName,
    contentClassName,
    ...props
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const contentId = useId();
  const [mounted, setMounted] = useState(false);
  const layer = useOverlayLayer(isOpen && mounted);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    top,
    left,
    position: adaptedPosition,
    arrowOffset,
  } = useFloatingTray({
    active: isOpen && mounted,
    anchorRef: wrapperRef,
    contentRef,
    defaultPosition,
    offset,
  });

  const arrowSide = adaptedPosition.split("-")[0] as TooltipSide;

  const setWrapperRef = useCallback(
    (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const clearTimers = useCallback(() => {
    if (openTimer.current !== null) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const commitOpen = useCallback(
    (next: boolean) => {
      if (next === isOpen) return;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpen, isControlled, onOpenChange],
  );

  const show = useCallback(
    (immediate = false) => {
      if (disabled) return;
      clearTimers();
      if (immediate || openDelay <= 0) {
        commitOpen(true);
        return;
      }
      openTimer.current = setTimeout(() => commitOpen(true), openDelay);
    },
    [disabled, clearTimers, openDelay, commitOpen],
  );

  const hide = useCallback(
    (immediate = false) => {
      clearTimers();
      if (immediate || closeDelay <= 0) {
        commitOpen(false);
        return;
      }
      closeTimer.current = setTimeout(() => commitOpen(false), closeDelay);
    },
    [clearTimers, closeDelay, commitOpen],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (disabled && isOpen) commitOpen(false);
  }, [disabled, isOpen, commitOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !isTopOverlayLayer(layer)) return;
      clearTimers();
      commitOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, clearTimers, commitOpen, layer]);

  const handleBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next !== null && event.currentTarget.contains(next)) return;
    hide(true);
  };

  const describedBy = isOpen ? contentId : undefined;
  const triggerIsElement = isValidElement(trigger);
  const enhancedTrigger = mergeTriggerProps(trigger, { "aria-describedby": describedBy });

  return (
    <div ref={setWrapperRef} className={cn("inline-flex", className)} {...props}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover/focus handlers live on a layout wrapper so the opaque trigger slot can be any element; keyboard access comes from the focusable control inside (onFocus/onBlur bubble), and the tooltip is described via aria-describedby. */}
      <div
        className={cn("inline-flex", triggerClassName)}
        onPointerEnter={() => show(false)}
        onPointerLeave={() => hide(false)}
        onFocus={() => show(true)}
        onBlur={handleBlur}
        {...(triggerIsElement ? {} : { "aria-describedby": describedBy })}
        data-slot="trigger"
      >
        {enhancedTrigger}
      </div>

      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={contentRef}
            role="tooltip"
            id={contentId}
            data-slot="content"
            data-position={adaptedPosition}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              transform: `translate3d(${left}px, ${top}px, 0)`,
            }}
            className="pointer-events-none z-50"
          >
            <div
              data-slot="panel"
              className={cn(
                "relative w-max max-w-[min(20rem,calc(100vw-2rem))] rounded-md bg-primary-inverse px-2.5 py-1.5 text-left text-primary-inverse text-xs shadow-md",
                contentClassName,
              )}
            >
              {showArrow && (
                <span
                  aria-hidden="true"
                  data-slot="arrow"
                  className={cn(
                    "absolute z-[1] size-2.5 rotate-45 bg-primary-inverse",
                    floatingArrowPlacementClasses[arrowSide],
                  )}
                  style={floatingArrowStyle(arrowSide, arrowOffset)}
                />
              )}
              <div data-slot="inner" className="relative z-[2]">
                {children}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
});

TooltipRoot.displayName = "Tooltip";

export const Tooltip = TooltipRoot;
