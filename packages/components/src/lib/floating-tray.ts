import {
  type CSSProperties,
  isValidElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import type { PopoverAlign, PopoverPosition, PopoverSide } from "../popover/popover.type";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const nativelyFocusableTags = new Set(["button", "input", "select", "textarea"]);

// True when the trigger owns keyboard focus itself, so the wrapper must not
// become a second tab stop with its own focus ring. Custom components (Button,
// Input) are trusted to render something interactive.
export function isTriggerFocusable(trigger: ReactNode): boolean {
  if (!isValidElement<{ disabled?: boolean; href?: string; tabIndex?: number }>(trigger))
    return false;
  if (typeof trigger.type !== "string") return true;
  if (trigger.props.disabled === true) return false;
  if (nativelyFocusableTags.has(trigger.type)) return true;
  if (trigger.type === "a" || trigger.type === "area") return trigger.props.href !== undefined;
  return typeof trigger.props.tabIndex === "number" && trigger.props.tabIndex >= 0;
}

export type MeasuredRect = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
};

export type ResolvedPosition = {
  top: number;
  left: number;
  position: PopoverPosition;
  /**
   * Distance in px from the tray's cross-axis start edge to the arrow center
   * (`left` for top/bottom sides, `top` for left/right sides). It tracks the
   * anchor center instead of a fixed inset, so `start`/`end` trays still point
   * at the middle of the trigger.
   */
  arrowOffset: number;
};

/** Minimum gap between the arrow center and the tray corner, clearing the diamond. */
const ARROW_INSET = 12;

function clampArrowOffset(anchorCenter: number, traySize: number): number {
  const inset = Math.min(ARROW_INSET, traySize / 2);
  return Math.min(Math.max(anchorCenter, inset), Math.max(inset, traySize - inset));
}

export function resolvePopoverPosition(
  trigger: MeasuredRect,
  content: Pick<MeasuredRect, "width" | "height">,
  viewport: { width: number; height: number },
  preferred: PopoverPosition,
  offset: number,
): ResolvedPosition {
  const safeOffset = Number.isFinite(offset) ? Math.max(0, offset) : 0;
  const margin = safeOffset;
  const [preferredSide, preferredAlign] = preferred.split("-") as [PopoverSide, PopoverAlign];
  let side = preferredSide;
  let align = preferredAlign;

  if (side === "top" && trigger.top - content.height - safeOffset < 0) side = "bottom";
  else if (side === "bottom" && trigger.bottom + content.height + safeOffset > viewport.height)
    side = "top";
  else if (side === "left" && trigger.left - content.width - safeOffset < 0) side = "right";
  else if (side === "right" && trigger.right + content.width + safeOffset > viewport.width)
    side = "left";

  if (side === "top" || side === "bottom") {
    const centerX = trigger.left + trigger.width / 2;
    if (centerX - content.width / 2 < margin) align = "start";
    else if (centerX + content.width / 2 > viewport.width - margin) align = "end";
  } else {
    const centerY = trigger.top + trigger.height / 2;
    if (centerY - content.height / 2 < margin) align = "start";
    else if (centerY + content.height / 2 > viewport.height - margin) align = "end";
  }

  let top: number;
  let left: number;

  if (side === "top") top = trigger.top - content.height - safeOffset;
  else if (side === "bottom") top = trigger.bottom + safeOffset;
  else if (align === "start") top = trigger.top;
  else if (align === "end") top = trigger.bottom - content.height;
  else top = trigger.top + trigger.height / 2 - content.height / 2;

  if (side === "left") left = trigger.left - content.width - safeOffset;
  else if (side === "right") left = trigger.right + safeOffset;
  else if (align === "start") left = trigger.left;
  else if (align === "end") left = trigger.right - content.width;
  else left = trigger.left + trigger.width / 2 - content.width / 2;

  // When the tray is larger than the viewport the max bound drops below the
  // margin; Math.max keeps the tray pinned to the margin instead of jittering.
  left = Math.min(
    Math.max(left, margin),
    Math.max(margin, viewport.width - content.width - margin),
  );
  top = Math.min(
    Math.max(top, margin),
    Math.max(margin, viewport.height - content.height - margin),
  );

  // Computed after clamping so the arrow follows a tray that was shifted back
  // inside the viewport, and clamped itself when the anchor sits off-tray.
  const isHorizontal = side === "top" || side === "bottom";
  const arrowOffset = isHorizontal
    ? clampArrowOffset(trigger.left + trigger.width / 2 - left, content.width)
    : clampArrowOffset(trigger.top + trigger.height / 2 - top, content.height);

  return { top, left, position: `${side}-${align}`, arrowOffset };
}

/**
 * Placement-axis classes only; the cross-axis coordinate comes from
 * `floatingArrowStyle` so the arrow can point at the anchor center.
 */
export const floatingArrowPlacementClasses: Record<PopoverSide, string> = {
  top: "-bottom-[5px]",
  bottom: "-top-[5px]",
  left: "-right-[5px]",
  right: "-left-[5px]",
};

export function floatingArrowStyle(side: PopoverSide, arrowOffset: number): CSSProperties {
  return side === "top" || side === "bottom"
    ? { left: arrowOffset, translate: "-50% 0" }
    : { top: arrowOffset, translate: "0 -50%" };
}

export const floatingArrowBorderClasses: Record<PopoverSide, string> = {
  top: "border-r border-b",
  bottom: "border-t border-l",
  left: "border-t border-r",
  right: "border-b border-l",
};

export type UseFloatingTrayOptions = {
  /** Measure and track while true; wire it to `isOpen && mounted`. */
  active: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  defaultPosition?: PopoverPosition;
  offset?: number;
  /** Measure the anchor width for width-matched trays (select-style). */
  matchAnchorWidth?: boolean;
};

export type UseFloatingTrayResult = {
  top: number;
  left: number;
  position: PopoverPosition;
  arrowOffset: number;
  anchorWidth: number | undefined;
};

/**
 * Shared positioning engine for portal-based floating trays (Popover,
 * Tooltip): measures the anchor and the tray, flips/shifts/clamps via
 * `resolvePopoverPosition`, and re-tracks on resize, scroll, and window
 * resize. The anchor is measured first, so width-matching sees the matched
 * width in the same pass.
 */
export function useFloatingTray({
  active,
  anchorRef,
  contentRef,
  defaultPosition = "bottom-start",
  offset = 8,
  matchAnchorWidth = false,
}: UseFloatingTrayOptions): UseFloatingTrayResult {
  const safeOffset = Number.isFinite(offset) ? Math.max(0, offset) : 8;
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [position, setPosition] = useState<PopoverPosition>(defaultPosition);
  const [arrowOffset, setArrowOffset] = useState(0);
  const [anchorWidth, setAnchorWidth] = useState<number | undefined>(undefined);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const content = contentRef.current;
    if (anchor === null || content === null) return;

    const anchorRect = anchor.getBoundingClientRect();
    // Matching runs on the measured anchor width (same value bails out of
    // re-render), so flip/shift math below already sees the matched width.
    if (matchAnchorWidth) setAnchorWidth(anchorRect.width);

    const resolved = resolvePopoverPosition(
      anchorRect,
      content.getBoundingClientRect(),
      { width: window.innerWidth, height: window.innerHeight },
      defaultPosition,
      safeOffset,
    );
    setCoords({ top: resolved.top, left: resolved.left });
    setPosition(resolved.position);
    setArrowOffset(resolved.arrowOffset);
  }, [anchorRef, contentRef, defaultPosition, safeOffset, matchAnchorWidth]);

  useIsomorphicLayoutEffect(() => {
    if (!active) return;

    updatePosition();

    const anchor = anchorRef.current;
    const content = contentRef.current;
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updatePosition);
    if (anchor !== null && resizeObserver !== null) resizeObserver.observe(anchor);
    if (content !== null && resizeObserver !== null) resizeObserver.observe(content);

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [active, anchorRef, contentRef, updatePosition]);

  return { top: coords.top, left: coords.left, position, arrowOffset, anchorWidth };
}
