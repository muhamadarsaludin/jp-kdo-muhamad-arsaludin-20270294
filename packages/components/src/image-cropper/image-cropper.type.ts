import type { ComponentPropsWithoutRef } from "react";

export type ImageCropperShape = "circle" | "rect";

export type ImageCropperHandle = {
  apply: () => void;
};

export type ImageCropperProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  src: string;
  aspect?: number;
  shape?: ImageCropperShape;
  minZoom?: number;
  maxZoom?: number;
  outputSize?: number;
  mimeType?: string;
  quality?: number;
  onApply?: (blob: Blob) => void;
  onError?: (error: unknown) => void;
  showReset?: boolean;
  showZoomInput?: boolean;
  cropAreaLabel?: string;
  zoomLabel?: string;
  resetLabel?: string;
  zoomInLabel?: string;
  zoomOutLabel?: string;
};
