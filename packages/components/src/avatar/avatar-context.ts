import { createContext, useContext } from "react";

import type { AvatarSize } from "./avatar.variants";

export const AvatarGroupContext = createContext<AvatarSize | undefined>(undefined);

export function useAvatarGroup() {
  return useContext(AvatarGroupContext);
}
