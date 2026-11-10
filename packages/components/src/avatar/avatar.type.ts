import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { AvatarColor, AvatarShape, AvatarSize, AvatarStatus } from "./avatar.variants";

export type AvatarProps = Omit<ComponentPropsWithoutRef<"span">, "color"> & {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: AvatarColor;
  status?: AvatarStatus;
  statusLabel?: string;
};

export type AvatarGroupProps = ComponentPropsWithoutRef<"div"> & {
  max?: number;
  size?: AvatarSize;
};
