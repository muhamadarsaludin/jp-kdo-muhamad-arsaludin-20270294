import { cn, getInitials } from "@kdo/utils";
import { UserRound } from "lucide-react";
import { Children, forwardRef, useContext, useState } from "react";

import type { AvatarGroupProps, AvatarProps } from "./avatar.type";
import {
  type AvatarStatus,
  avatarColorFromName,
  avatarFallbackColors,
  avatarGroupOverlaps,
  avatarIconSizes,
  avatarStatusColors,
  avatarStatusSizes,
  avatarVariants,
} from "./avatar.variants";
import { AvatarGroupContext } from "./avatar-context";

const STATUS_LABELS: Record<AvatarStatus, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
};

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarProps>(function AvatarRoot(
  {
    src,
    alt,
    name = "",
    fallback,
    size,
    shape = "circle",
    color,
    status,
    statusLabel,
    className,
    children,
    ...props
  },
  ref,
) {
  const groupSize = useContext(AvatarGroupContext);
  const resolvedSize = size ?? groupSize ?? "md";

  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const label = alt ?? (name || undefined);
  const showImage = Boolean(src) && failedSrc !== src;
  const initials = name ? getInitials(name) : "";
  const resolvedColor = color ?? (name ? avatarColorFromName(name) : "brand");

  return (
    <span
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ size: resolvedSize, shape }), className)}
      {...props}
    >
      <span
        data-slot="avatar-content"
        aria-hidden={!showImage && label ? true : undefined}
        className={cn(
          "flex size-full items-center justify-center overflow-hidden rounded-[inherit]",
          avatarFallbackColors[resolvedColor],
        )}
      >
        {showImage ? (
          /* biome-ignore lint/performance/noImgElement: library component without a framework; no next/image is available */
          <img
            data-slot="avatar-image"
            src={src}
            alt={label ?? ""}
            className="size-full object-cover"
            onError={() => setFailedSrc(src ?? null)}
          />
        ) : (
          (children ??
          fallback ??
          (initials ? (
            <span data-slot="avatar-initials">{initials}</span>
          ) : (
            <UserRound className={avatarIconSizes[resolvedSize]} aria-hidden="true" />
          )))
        )}
      </span>
      {!showImage && label ? <span className="sr-only">{label}</span> : null}
      {status ? (
        <span
          data-slot="avatar-status"
          className={cn(
            "absolute right-0 bottom-0 rounded-full ring-2 ring-[var(--color-bg-primary)]",
            avatarStatusSizes[resolvedSize],
            avatarStatusColors[status],
          )}
        >
          <span className="sr-only">{statusLabel ?? STATUS_LABELS[status]}</span>
        </span>
      ) : null}
    </span>
  );
});
AvatarRoot.displayName = "Avatar";

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max, size = "md", className, children, ...props },
  ref,
) {
  const items = Children.toArray(children);
  const visible = typeof max === "number" && max >= 0 ? items.slice(0, max) : items;
  const overflow = items.length - visible.length;

  return (
    <AvatarGroupContext.Provider value={size}>
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn(
          "flex items-center",
          avatarGroupOverlaps[size],
          "[&>[data-slot=avatar]]:ring-2 [&>[data-slot=avatar]]:ring-[var(--color-bg-primary)]",
          className,
        )}
        {...props}
      >
        {visible}
        {overflow > 0 ? (
          <span
            data-slot="avatar-group-counter"
            className={cn(
              avatarVariants({ size, shape: "circle" }),
              "bg-quaternary text-tertiary ring-2 ring-[var(--color-bg-primary)]",
            )}
          >
            {`+${overflow}`}
          </span>
        ) : null}
      </div>
    </AvatarGroupContext.Provider>
  );
});
AvatarGroup.displayName = "Avatar.Group";

export const Avatar = Object.assign(AvatarRoot, {
  Group: AvatarGroup,
});
