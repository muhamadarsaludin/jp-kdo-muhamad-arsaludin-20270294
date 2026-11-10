import { createContext, type RefObject, useContext } from "react";

import type { CarouselOrientation } from "./carousel.variants";

export type CarouselContextValue = {
  index: number;
  count: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  loop: boolean;
  autoplay: boolean;
  interval: number;
  isPaused: boolean;
  setInteractionPaused: (paused: boolean) => void;
  /** Bumped whenever the active slide (re)starts, so the dynamic fill can restart. */
  progressKey: number;
  orientation: CarouselOrientation;
  trackRef: RefObject<HTMLDivElement | null>;
  baseId: string;
};

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarouselContext(): CarouselContextValue {
  const context = useContext(CarouselContext);
  if (context === null) throw new Error("Carousel compound parts must be used inside <Carousel>");
  return context;
}

export const useCarousel = useCarouselContext;
