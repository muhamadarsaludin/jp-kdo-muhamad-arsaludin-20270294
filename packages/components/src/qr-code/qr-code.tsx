import { cn } from "@kdo/utils";
import { QRCodeSVG } from "qrcode.react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import type { QrCodeHandle, QrCodeProps } from "./qr-code.type";

const DEFAULT_SIZE = 200;
const DEFAULT_MARGIN = 4;

function resolveSvgColors(svg: SVGSVGElement): SVGSVGElement {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  if (typeof getComputedStyle !== "function") return clone;

  const originals = [svg, ...Array.from(svg.querySelectorAll<SVGElement>("*"))];
  const clones = [clone, ...Array.from(clone.querySelectorAll<SVGElement>("*"))];

  originals.forEach((original, index) => {
    const target = clones[index];
    if (target === undefined) return;

    const computed = getComputedStyle(original);
    for (const attribute of ["fill", "stroke"] as const) {
      const value = original.getAttribute(attribute);
      if (value === null || (!value.includes("currentColor") && !value.includes("var("))) continue;
      const resolved = attribute === "fill" ? computed.fill : computed.stroke;
      if (resolved !== "") target.setAttribute(attribute, resolved);
    }
  });

  return clone;
}

function serialize(svg: SVGSVGElement): string {
  return new XMLSerializer().serializeToString(resolveSvgColors(svg));
}

export const QrCode = forwardRef<QrCodeHandle, QrCodeProps>(function QrCode(
  {
    value,
    size = DEFAULT_SIZE,
    level = "M",
    marginSize = DEFAULT_MARGIN,
    fgColor = "currentColor",
    bgColor = "var(--color-bg-primary)",
    title,
    imageSettings,
    className,
    ...props
  },
  ref,
) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const toSvgString = useCallback(() => {
    const node = svgRef.current;
    if (node === null) return "";

    return serialize(node);
  }, []);

  const toSvgDataURL = useCallback(() => {
    const node = svgRef.current;
    if (node === null) return "";

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialize(node))}`;
  }, []);

  const toPngDataURL = useCallback(
    (pixelRatio = 2) =>
      new Promise<string>((resolve, reject) => {
        const node = svgRef.current;
        if (node === null) {
          reject(new Error("QR code is not rendered"));

          return;
        }

        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = size * pixelRatio;
          canvas.height = size * pixelRatio;
          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("Canvas 2D context is unavailable"));

            return;
          }
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/png"));
        };
        image.onerror = () => reject(new Error("Failed to rasterize QR code"));
        image.src = toSvgDataURL();
      }),
    [size, toSvgDataURL],
  );

  useImperativeHandle(
    ref,
    () => ({ getSvg: () => svgRef.current, toSvgString, toSvgDataURL, toPngDataURL }),
    [toSvgString, toSvgDataURL, toPngDataURL],
  );

  return (
    <QRCodeSVG
      ref={svgRef}
      value={value}
      size={size}
      level={level}
      marginSize={marginSize}
      fgColor={fgColor}
      bgColor={bgColor}
      title={title}
      imageSettings={
        imageSettings ? { ...imageSettings, excavate: imageSettings.excavate ?? true } : undefined
      }
      className={cn("text-primary", className)}
      {...props}
    />
  );
});

QrCode.displayName = "QrCode";
