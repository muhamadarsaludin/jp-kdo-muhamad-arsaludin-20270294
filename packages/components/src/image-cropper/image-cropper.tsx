import {
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";
import { RotateCcw } from "lucide-react";

import { Button } from "../button/button";
import { NumberInput } from "../number-input/number-input";
import type { ImageCropperHandle, ImageCropperProps } from "./image-cropper.type";
import { clampOffset, computeCropRect, cropImageToBlob } from "./image-cropper-crop";

const PAN_STEP = 10;
const PAN_STEP_LARGE = 50;
const ZOOM_STEP = 0.25;

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

export const ImageCropper = forwardRef<ImageCropperHandle, ImageCropperProps>(function ImageCropper(
  {
    src,
    aspect = 1,
    shape = "rect",
    minZoom = 1,
    maxZoom = 3,
    outputSize = 1024,
    mimeType = "image/png",
    quality = 0.92,
    onApply,
    onError,
    showReset = true,
    showZoomInput = true,
    cropAreaLabel = "Crop area. Drag to position the photo, use arrow keys to move it, plus and minus to zoom, 0 to reset. Double-click to reset the zoom.",
    zoomLabel = "Zoom percent",
    resetLabel = "Reset zoom",
    zoomInLabel = "Increase value",
    zoomOutLabel = "Decrease value",
    className,
    ...props
  },
  ref,
) {
  const [scale, setScale] = useState(1);
  const [zoomDraft, setZoomDraft] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [natural, setNatural] = useState({ width: 0, height: 0 });
  const [view, setView] = useState({ width: 0, height: 0 });
  const viewRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<DragState | null>(null);

  const viewAspect = shape === "circle" ? 1 : aspect;

  const [lastSrc, setLastSrc] = useState(src);
  if (src !== lastSrc) {
    setLastSrc(src);
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setNatural({ width: 0, height: 0 });
  }

  useEffect(() => {
    const node = viewRef.current;
    if (node === null || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setView({ width: rect.width, height: rect.height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const baseScale =
    natural.width > 0 && view.width > 0 ? Math.max(view.width / natural.width, view.height / natural.height) : 0;
  const displayedWidth = natural.width * baseScale * scale;
  const displayedHeight = natural.height * baseScale * scale;

  useEffect(() => {
    setOffset((previous) => ({
      x: clampOffset(previous.x, displayedWidth, view.width),
      y: clampOffset(previous.y, displayedHeight, view.height),
    }));
  }, [displayedWidth, displayedHeight, view.width, view.height]);

  const zoomTo = useCallback(
    (next: number) => {
      setScale(Math.min(Math.max(next, minZoom), maxZoom));
    },
    [minZoom, maxZoom],
  );

  useEffect(() => {
    const node = viewRef.current;
    if (node === null) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomTo(scale - event.deltaY * 0.002);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [scale, zoomTo]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setZoomDraft(null);
  }, []);

  const minPercent = Math.round(minZoom * 100);
  const maxPercent = Math.round(maxZoom * 100);
  const zoomPercent = Math.round(scale * 100);

  const handleZoomChange = useCallback(
    (next: string) => {
      const parsed = Number.parseInt(next, 10);
      if (next.trim() !== "" && !Number.isNaN(parsed) && parsed >= minPercent && parsed <= maxPercent) {
        setZoomDraft(null);
        zoomTo(parsed / 100);
      } else {
        setZoomDraft(next);
      }
    },
    [minPercent, maxPercent, zoomTo],
  );

  const commitZoomDraft = useCallback(() => {
    if (zoomDraft === null) return;
    const parsed = Number.parseInt(zoomDraft, 10);
    setZoomDraft(null);
    if (!Number.isNaN(parsed)) zoomTo(parsed / 100);
  }, [zoomDraft, zoomTo]);

  const moveBy = useCallback(
    (dx: number, dy: number) => {
      setOffset((previous) => ({
        x: clampOffset(previous.x + dx, displayedWidth, view.width),
        y: clampOffset(previous.y + dy, displayedHeight, view.height),
      }));
    },
    [displayedWidth, displayedHeight, view.width, view.height],
  );

  const apply = useCallback(() => {
    const image = imgRef.current;
    if (image === null || natural.width === 0 || natural.height === 0 || view.width === 0) return;
    const rect = computeCropRect({
      naturalWidth: natural.width,
      naturalHeight: natural.height,
      viewWidth: view.width,
      viewHeight: view.height,
      scale,
      offsetX: offset.x,
      offsetY: offset.y,
    });
    cropImageToBlob(image, rect, outputSize, mimeType, quality).then(onApply, (error: unknown) => onError?.(error));
  }, [natural, view, scale, offset, outputSize, mimeType, quality, onApply, onError]);

  useImperativeHandle(ref, () => ({ apply }), [apply]);

  const onViewportPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current !== null) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    const target = event.currentTarget;
    if (typeof target.setPointerCapture === "function") target.setPointerCapture(event.pointerId);
  };

  const onViewportPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag === null || event.pointerId !== drag.pointerId) return;
    setOffset({
      x: clampOffset(drag.originX + (event.clientX - drag.startX), displayedWidth, view.width),
      y: clampOffset(drag.originY + (event.clientY - drag.startY), displayedHeight, view.height),
    });
  };

  const endViewportDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag === null || event.pointerId !== drag.pointerId) return;
    dragRef.current = null;
    const target = event.currentTarget;
    if (typeof target.releasePointerCapture === "function") target.releasePointerCapture(event.pointerId);
  };

  const onViewportKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const large = event.shiftKey ? PAN_STEP_LARGE : PAN_STEP;
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        moveBy(-large, 0);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveBy(large, 0);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveBy(0, -large);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveBy(0, large);
        break;
      case "+":
      case "=":
        event.preventDefault();
        zoomTo(scale + ZOOM_STEP);
        break;
      case "-":
      case "_":
        event.preventDefault();
        zoomTo(scale - ZOOM_STEP);
        break;
      case "0":
        event.preventDefault();
        resetZoom();
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div
        ref={viewRef}
        data-slot="viewport"
        role="application"
        aria-roledescription="photo cropper"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: the crop viewport is a keyboard-operated editing canvas with arrow-key pan and +/- zoom; it must be reachable by Tab so keyboard users get the same gestures as pointer users.
        tabIndex={0}
        aria-label={cropAreaLabel}
        onPointerDown={onViewportPointerDown}
        onPointerMove={onViewportPointerMove}
        onPointerUp={endViewportDrag}
        onPointerCancel={endViewportDrag}
        onDoubleClick={resetZoom}
        onKeyDown={onViewportKeyDown}
        style={{ aspectRatio: String(viewAspect) }}
        className={cn(
          "relative w-full touch-none select-none overflow-hidden bg-secondary outline-none focus-visible:outline-2 focus-visible:outline-brand-primary/50",
          shape === "circle" ? "rounded-full" : "rounded-lg",
        )}
      >
        {/* biome-ignore lint/performance/noImgElement: library component without a framework; no next/image is available */}
        <img
          ref={imgRef}
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          onLoad={(event) => {
            const image = event.currentTarget;
            setNatural({ width: image.naturalWidth, height: image.naturalHeight });
          }}
          onError={() => {
            setNatural({ width: 0, height: 0 });
            onError?.(new Error("The image could not be loaded"));
          }}
          className={cn(
            natural.width > 0 ? "absolute top-1/2 left-1/2 max-w-none cursor-grab active:cursor-grabbing" : "hidden",
          )}
          style={
            natural.width > 0
              ? {
                  width: displayedWidth,
                  height: displayedHeight,
                  transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                }
              : undefined
          }
        />
      </div>
      {showZoomInput || showReset ? (
        <div className="flex items-center gap-2">
          {showZoomInput ? (
            <div className="min-w-0 flex-1">
              <NumberInput
                size="sm"
                aria-label={zoomLabel}
                value={zoomDraft ?? zoomPercent}
                onValueChange={handleZoomChange}
                onBlur={commitZoomDraft}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.currentTarget.blur();
                }}
                min={minPercent}
                max={maxPercent}
                step={25}
                increaseLabel={zoomInLabel}
                decreaseLabel={zoomOutLabel}
              />
            </div>
          ) : null}
          {showReset ? (
            <Button.Icon aria-label={resetLabel} variant="text" color="neutral" size="sm" onClick={resetZoom}>
              <RotateCcw />
            </Button.Icon>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

export type { ImageCropperHandle };
