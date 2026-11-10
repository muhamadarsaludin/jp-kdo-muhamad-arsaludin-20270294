import { createContext, useContext } from "react";

import type { ListItemContextValue } from "./list.type";

export const ListContext = createContext<ListItemContextValue | undefined>(undefined);

export function useListContext(): ListItemContextValue {
  const context = useContext(ListContext);
  if (!context) throw new Error("useListContext must be used inside a List itemRender");
  return context;
}
