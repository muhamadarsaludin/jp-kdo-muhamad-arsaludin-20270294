import { useEffect, useRef } from "react";

let nextOrder = 0;
let activeLayers: number[] = [];
let bodyLockCount = 0;
let savedBodyStyle: { overflow: string; paddingRight: string } | null = null;

function createOrder(): number {
  nextOrder += 1;
  return nextOrder;
}

export function useOverlayLayer(active: boolean): number {
  const orderRef = useRef(0);
  const wasActive = useRef(false);

  if (active && !wasActive.current && typeof window !== "undefined") orderRef.current = createOrder();
  wasActive.current = active;

  useEffect(() => {
    if (!active) return;
    const order = orderRef.current;
    activeLayers = [...activeLayers.filter((entry) => entry !== order), order].sort((a, b) => a - b);
    return () => {
      activeLayers = activeLayers.filter((entry) => entry !== order);
    };
  }, [active]);

  return orderRef.current;
}

export function isTopOverlayLayer(order: number): boolean {
  return activeLayers[activeLayers.length - 1] === order;
}

export function lockBodyScroll(): void {
  if (typeof document === "undefined") return;
  bodyLockCount += 1;
  if (bodyLockCount > 1) return;

  const { body } = document;
  savedBodyStyle = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.overflow = "hidden";
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
}

export function unlockBodyScroll(): void {
  if (typeof document === "undefined") return;
  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount > 0 || savedBodyStyle === null) return;

  document.body.style.overflow = savedBodyStyle.overflow;
  document.body.style.paddingRight = savedBodyStyle.paddingRight;
  savedBodyStyle = null;
}
