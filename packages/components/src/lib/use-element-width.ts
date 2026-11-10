import { useEffect, useRef, useState } from "react";

/**
 * Tracks the rendered width of an element. Falls back to `fallback` before the
 * first measurement (and in environments without `ResizeObserver`, such as
 * jsdom), keeping server and test output deterministic.
 */
export function useElementWidth<T extends HTMLElement>(fallback = 640) {
  const elementRef = useRef<T | null>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const node = elementRef.current;
    if (node === null) return;

    const measure = () => {
      const next = node.getBoundingClientRect().width;
      setWidth(next > 0 ? next : fallback);
    };
    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [fallback]);

  return { elementRef, width };
}
