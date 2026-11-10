import { createContext, useContext } from "react";

import type { Shape } from "../type";
import type { TabsActivationMode, TabsScrollButtonIcons, TabsScrollButtonLabels } from "./tabs.type";
import type { TabsColor, TabsOrientation, TabsSize, TabsVariant, TabsWidth } from "./tabs.variants";

export type TabsContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
  baseId: string;
  orientation: TabsOrientation;
  variant: TabsVariant;
  color: TabsColor;
  size: TabsSize;
  shape: Shape;
  width: TabsWidth;
  activationMode: TabsActivationMode;
  disabled: boolean;
  noBackground: boolean;
  noBorder: boolean;
  scrollButtons: boolean;
  scrollButtonIcons: TabsScrollButtonIcons | undefined;
  scrollButtonLabels: TabsScrollButtonLabels | undefined;
};

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (context === null) throw new Error("Tabs compound parts must be used inside <Tabs>");
  return context;
}
