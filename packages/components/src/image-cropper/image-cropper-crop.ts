export type CropSource = {
  naturalWidth: number;
  naturalHeight: number;
  viewWidth: number;
  viewHeight: number;
  scale: number;
  offsetX: number;
  offsetY: number;
};

export type CropRect = {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
};

export function clampOffset(offset: number, displayed: number, view: number): number {
  const max = Math.max((displayed - view) / 2, 0);
  if (max === 0) return 0;
  return Math.min(Math.max(offset, -max), max);
}

export function computeCropRect(source: CropSource): CropRect {
  const { naturalWidth, naturalHeight, viewWidth, viewHeight, scale, offsetX, offsetY } = source;
  const baseScale = Math.max(viewWidth / naturalWidth, viewHeight / naturalHeight);
  const totalScale = baseScale * scale;
  const displayedWidth = naturalWidth * totalScale;
  const displayedHeight = naturalHeight * totalScale;
  return {
    sWidth: viewWidth / totalScale,
    sHeight: viewHeight / totalScale,
    sx: (displayedWidth / 2 - viewWidth / 2 - offsetX) / totalScale,
    sy: (displayedHeight / 2 - viewHeight / 2 - offsetY) / totalScale,
  };
}

export function cropImageToBlob(
  image: HTMLImageElement,
  rect: CropRect,
  outputSize: number,
  mimeType = "image/png",
  quality = 0.92,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const exportScale = Math.min(1, outputSize / Math.max(rect.sWidth, rect.sHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(Math.round(rect.sWidth * exportScale), 1);
    canvas.height = Math.max(Math.round(rect.sHeight * exportScale), 1);
    const context = canvas.getContext("2d");
    if (context === null) {
      reject(new Error("Canvas 2D context is not available"));
      return;
    }
    context.drawImage(
      image,
      rect.sx,
      rect.sy,
      rect.sWidth,
      rect.sHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas export returned no data"));
      },
      mimeType,
      quality,
    );
  });
}
