import { createContext, useContext } from "react";

import type { ButtonSize } from "../button/button.type";
import type { ButtonColor, ButtonVariant } from "../button/button-variants";
import type { Shape } from "../type";

export type OverlayContextValue = {
  onClose: () => void;
  showCloseIcon: boolean;
  titleId: string;
  descriptionId: string;
  setTitlePresent: (present: boolean) => void;
  setDescriptionPresent: (present: boolean) => void;
};

export const OverlayContext = createContext<OverlayContextValue | null>(null);

export function useOverlayContext(): OverlayContextValue {
  const context = useContext(OverlayContext);
  if (context === null) throw new Error("Overlay compound parts must be used inside <Modal> or <Drawer>");
  return context;
}

export type OverlayCloseDefaults = {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: Shape;
  className?: string;
  "aria-label"?: string;
};

export const OverlayCloseDefaultsContext = createContext<OverlayCloseDefaults | null>(null);
