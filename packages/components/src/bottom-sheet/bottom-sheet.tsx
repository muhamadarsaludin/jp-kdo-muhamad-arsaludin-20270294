import { cn } from "@kdo/utils";
import {
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { OverlayContext } from "../lib/overlay-context";
import { OverlayBody, OverlayClose, OverlayFooter, OverlayHeader } from "../lib/overlay-parts";
import { useOverlay } from "../lib/use-overlay";
import type { BottomSheetProps, BottomSheetSnapPoint } from "./bottom-sheet.type";

const DEFAULT_SNAP_POINTS: BottomSheetSnapPoint[] = ["50dvh", "90dvh"];
const DEFAULT_DISMISS_THRESHOLD = 60;
const DEFAULT_DISMISS_VELOCITY = 0.5;
const SETTLE_DURATION = 260;

function resolveSnapPoint(point: BottomSheetSnapPoint, viewportHeight: number): number {
  if (typeof point === "number") return point;
  const match = /^(-?[\d.]+)(px|dvh|vh|%)$/.exec(point.trim());
  if (!match) return Number.NaN;
  const value = Number.parseFloat(match[1] ?? "");
  if (match[2] === "px") return value;
  return (value / 100) * viewportHeight;
}

type DragState = {
  pointerId: number;
  startY: number;
  startHeight: number;
  lastY: number;
  lastTime: number;
  velocity: number;
};

const BottomSheetRoot = forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheetRoot(
  {
    open,
    defaultOpen = false,
    onOpenChange,
    snapPoints = DEFAULT_SNAP_POINTS,
    defaultSnap = 0,
    snapIndex: controlledSnapIndex,
    onSnapChange,
    dismissThreshold = DEFAULT_DISMISS_THRESHOLD,
    dismissVelocity = DEFAULT_DISMISS_VELOCITY,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseIcon = true,
    className,
    overlayClassName,
    children,
    onKeyDown,
    style,
    ...props
  },
  ref,
) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const collapseTimer = useRef<number | null>(null);

  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerHeight,
  );

  useEffect(() => {
    const update = () => setViewportHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(
    () => () => {
      if (collapseTimer.current !== null) window.clearTimeout(collapseTimer.current);
    },
    [],
  );

  const snapHeights = useMemo(() => {
    const resolved = snapPoints
      .map((point) => resolveSnapPoint(point, viewportHeight))
      .filter((height) => Number.isFinite(height) && height > 0)
      .map((height) => Math.min(height, viewportHeight));
    return resolved.length > 0 ? resolved : [viewportHeight * 0.5];
  }, [snapPoints, viewportHeight]);

  const isSnapControlled = controlledSnapIndex !== undefined;
  const [internalSnapIndex, setInternalSnapIndex] = useState(defaultSnap);
  const rawSnapIndex = isSnapControlled ? controlledSnapIndex : internalSnapIndex;
  const snapIndex = Math.min(Math.max(rawSnapIndex, 0), snapHeights.length - 1);

  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const [collapsing, setCollapsing] = useState(false);
  const dragState = useRef<DragState | null>(null);

  const { mounted, rendered, visible, close, trapFocus } = useOverlay({
    open,
    defaultOpen,
    onOpenChange,
    closeOnEscape,
    exitDuration: 300,
    panelRef,
  });

  const settleSnap = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), snapHeights.length - 1);
      if (!isSnapControlled) setInternalSnapIndex(clamped);
      if (clamped !== snapIndex) onSnapChange?.(clamped);
    },
    [isSnapControlled, snapHeights.length, snapIndex, onSnapChange],
  );

  const dismiss = useCallback(() => {
    setDragHeight(null);
    setCollapsing(true);
    if (collapseTimer.current !== null) window.clearTimeout(collapseTimer.current);
    collapseTimer.current = window.setTimeout(() => {
      setCollapsing(false);
      close();
    }, SETTLE_DURATION);
  }, [close]);

  const handleScrimClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) return;
    if (event.target !== event.currentTarget) return;
    close();
  };

  const handlePanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    trapFocus(event);
  };

  const onHandlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current !== null) return;
    const startHeight = snapHeights[snapIndex] ?? 0;
    dragState.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startHeight,
      lastY: event.clientY,
      lastTime: event.timeStamp,
      velocity: 0,
    };
    setDragHeight(startHeight);
    const target = event.currentTarget;
    if (typeof target.setPointerCapture === "function") target.setPointerCapture(event.pointerId);
  };

  const onHandlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (drag === null || event.pointerId !== drag.pointerId) return;
    const deltaTime = event.timeStamp - drag.lastTime;
    if (deltaTime > 0) {
      const instantVelocity = (drag.lastY - event.clientY) / deltaTime;
      drag.velocity = drag.velocity * 0.7 + instantVelocity * 0.3;
    }
    drag.lastY = event.clientY;
    drag.lastTime = event.timeStamp;
    const maxHeight = snapHeights[snapHeights.length - 1] ?? 0;
    setDragHeight(
      Math.min(Math.max(drag.startHeight + (drag.startY - event.clientY), 0), maxHeight),
    );
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (drag === null || event.pointerId !== drag.pointerId) return;
    dragState.current = null;
    const target = event.currentTarget;
    if (typeof target.releasePointerCapture === "function")
      target.releasePointerCapture(event.pointerId);

    const releasedHeight = drag.startHeight + (drag.startY - event.clientY);
    const lowest = snapHeights[0] ?? 0;
    setDragHeight(null);
    if (drag.velocity < -dismissVelocity || releasedHeight < lowest - dismissThreshold) {
      dismiss();
      return;
    }
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    snapHeights.forEach((height, index) => {
      const distance = Math.abs(height - releasedHeight);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });
    settleSnap(nearest);
  };

  const onHandleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    settleSnap(snapIndex + (event.key === "ArrowUp" ? 1 : -1));
  };

  if (!mounted || !rendered) return null;

  const handleHeight = collapsing ? 0 : (dragHeight ?? snapHeights[snapIndex] ?? 0);

  return (
    <OverlayContext.Provider
      value={{
        onClose: close,
        showCloseIcon,
        titleId,
        descriptionId,
        setTitlePresent: setHasTitle,
        setDescriptionPresent: setHasDescription,
      }}
    >
      {createPortal(
        <div
          data-slot="overlay"
          className={cn(
            "fixed inset-0 z-50 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out",
            visible ? "opacity-100" : "pointer-events-none opacity-0",
            overlayClassName,
          )}
        >
          {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: the scrim is a presentational dismiss surface; Escape and keyboard focus are handled by the root and the panel, so it needs no role or key handler of its own. */}
          <div
            data-slot="scrim"
            className="absolute inset-0 bg-neutral-800/20 backdrop-blur-[2px]"
            onClick={handleScrimClick}
          />
          <div
            ref={setPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={hasTitle ? titleId : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            tabIndex={-1}
            onKeyDown={handlePanelKeyDown}
            style={{
              ...style,
              height: handleHeight,
              ...(dragHeight !== null ? { transition: "none" } : null),
            }}
            className={cn(
              "absolute inset-x-0 bottom-0 flex max-h-dvh flex-col overflow-hidden rounded-t-2xl border-secondary border-t bg-primary text-primary shadow-2xl outline-none motion-safe:transition-[height,transform] motion-safe:duration-300 motion-safe:ease-out",
              visible ? "translate-y-0" : "translate-y-full",
              className,
            )}
            {...props}
          >
            <div
              data-slot="handle"
              role="slider"
              aria-label="Resize sheet"
              aria-orientation="vertical"
              aria-valuemin={0}
              aria-valuemax={snapHeights.length - 1}
              aria-valuenow={snapIndex}
              tabIndex={0}
              onPointerDown={onHandlePointerDown}
              onPointerMove={onHandlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onKeyDown={onHandleKeyDown}
              className="flex shrink-0 cursor-grab touch-none items-center justify-center pb-1 pt-2.5 outline-none focus-visible:outline-2 focus-visible:outline-brand-primary/50 active:cursor-grabbing"
            >
              <span aria-hidden="true" className="h-1 w-10 rounded-full bg-quaternary" />
            </div>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </OverlayContext.Provider>
  );
});

BottomSheetRoot.displayName = "BottomSheet";

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Header: OverlayHeader,
  Body: OverlayBody,
  Footer: OverlayFooter,
  Close: OverlayClose,
});
