import type { SVGProps } from "react";

export type QrCodeLevel = "L" | "M" | "Q" | "H";

export interface QrCodeImageSettings {
  /** Image URI (data URL or absolute URL) embedded in the center of the code. */
  src: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
  opacity?: number;
  /** Clear the modules behind the image. Defaults to `true`. */
  excavate?: boolean;
  crossOrigin?: "anonymous" | "use-credentials" | "";
}

export type QrCodeProps = Omit<SVGProps<SVGSVGElement>, "ref" | "value"> & {
  /** Content to encode. */
  value: string;
  /** Rendered width/height in pixels. Defaults to `200`. */
  size?: number;
  /** Error-correction level. Higher survives more damage / a bigger logo. Defaults to `M`. */
  level?: QrCodeLevel;
  /** Quiet-zone size in modules. Defaults to `4` (the spec minimum). */
  marginSize?: number;
  /** Foreground (module) color. Defaults to `currentColor`. */
  fgColor?: string;
  /** Background color. Defaults to `var(--color-bg-primary)`. */
  bgColor?: string;
  /** Accessible name; also rendered as an SVG `<title>`. */
  title?: string;
  /** Center image/logo settings. */
  imageSettings?: QrCodeImageSettings;
};

export interface QrCodeHandle {
  /** The underlying `<svg>` element, or `null` before mount. */
  getSvg: () => SVGSVGElement | null;
  /** Serialized SVG markup. */
  toSvgString: () => string;
  /** `image/svg+xml` data URL (vector export). */
  toSvgDataURL: () => string;
  /** Rasterized `image/png` data URL. Rejects when canvas/image is unavailable. */
  toPngDataURL: (pixelRatio?: number) => Promise<string>;
}
