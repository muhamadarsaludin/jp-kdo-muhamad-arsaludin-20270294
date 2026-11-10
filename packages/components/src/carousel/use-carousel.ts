import { useCallback, useEffect, useRef, useState } from "react";

export type UseCarouselStateOptions = {
  count: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
  paused?: boolean;
};

export function useCarouselState({
  count,
  value,
  defaultValue = 0,
  onValueChange,
  loop = true,
  autoplay = false,
  interval = 5000,
  paused = false,
}: UseCarouselStateOptions) {
  const isControlled = value !== undefined;
  const [internalIndex, setInternalIndex] = useState(defaultValue);
  const index = value ?? internalIndex;
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  // biome-ignore lint/nursery/useNullishCoalescing: either source may pause autoplay, so OR (not ??) is intended.
  const isPaused = paused || interactionPaused;

  const goTo = useCallback(
    (next: number) => {
      if (count <= 0) return;
      const target = loop
        ? ((next % count) + count) % count
        : Math.min(Math.max(next, 0), count - 1);
      if (target === index) return;
      if (!isControlled) setInternalIndex(target);
      onValueChange?.(target);
      setProgressKey((key) => key + 1);
    },
    [count, loop, index, isControlled, onValueChange],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const wasPaused = useRef(isPaused);
  useEffect(() => {
    if (wasPaused.current && !isPaused) setProgressKey((key) => key + 1);
    wasPaused.current = isPaused;
  }, [isPaused]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: progressKey is an intentional restart signal so the autoplay timer and the CSS progress fill reset together on resume.
  useEffect(() => {
    if (!autoplay || isPaused || count <= 1) return;
    const timer = setTimeout(next, interval);
    return () => clearTimeout(timer);
  }, [autoplay, isPaused, count, interval, next, progressKey]);

  return { index, count, isPaused, progressKey, goTo, next, prev, setInteractionPaused };
}
