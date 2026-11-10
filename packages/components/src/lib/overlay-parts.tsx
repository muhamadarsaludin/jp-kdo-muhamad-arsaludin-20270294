import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useContext,
  useEffect,
} from "react";

import { cn } from "@kdo/utils";
import { X } from "lucide-react";

import { Button } from "../button/button";
import type { ButtonIconProps } from "../button/button.type";
import { type OverlayCloseDefaults, OverlayCloseDefaultsContext, useOverlayContext } from "./overlay-context";

export type OverlayHeaderProps = ComponentPropsWithoutRef<"div"> & {
  title?: ReactNode;
  description?: ReactNode;
  showCloseIcon?: boolean;
  separator?: boolean;
  icon?: ReactNode;
  iconOrientation?: "horizontal" | "vertical";
  closeButtonProps?: OverlayCloseDefaults;
};

export type OverlayBodyProps = ComponentPropsWithoutRef<"div">;

export type OverlayFooterProps = ComponentPropsWithoutRef<"div"> & {
  separator?: boolean;
};

export type OverlayCloseProps = Omit<ButtonIconProps<"button">, "children" | "aria-label" | "onClick"> & {
  children?: ReactNode;
  "aria-label"?: string;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
};

export const OverlayHeader = forwardRef<HTMLDivElement, OverlayHeaderProps>(function OverlayHeader(
  {
    title,
    description,
    showCloseIcon,
    separator = true,
    icon,
    iconOrientation = "horizontal",
    closeButtonProps,
    className,
    children,
    ...props
  },
  ref,
) {
  const context = useOverlayContext();
  const effectiveShowCloseIcon = showCloseIcon ?? context.showCloseIcon;
  const { setTitlePresent, setDescriptionPresent } = context;

  useEffect(() => {
    setTitlePresent(title != null);
    return () => setTitlePresent(false);
  }, [title, setTitlePresent]);

  useEffect(() => {
    setDescriptionPresent(description != null);
    return () => setDescriptionPresent(false);
  }, [description, setDescriptionPresent]);

  return (
    <OverlayCloseDefaultsContext.Provider value={closeButtonProps ?? null}>
      <div
        ref={ref}
        data-slot="header"
        className={cn(
          "flex shrink-0 items-center justify-between gap-4 px-4 py-3",
          separator && "border-primary border-b",
          className,
        )}
        {...props}
      >
        <div className={cn("flex min-w-0 items-start gap-3", iconOrientation === "vertical" && "flex-col")}>
          {icon ? (
            <span
              data-slot="icon"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-tertiary [&>svg]:size-4.5"
            >
              {icon}
            </span>
          ) : null}
          <div className="flex min-w-0 flex-col gap-1">
            {title ? (
              <h2 id={context.titleId} data-slot="title" className="font-medium text-base text-primary leading-tight">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p id={context.descriptionId} data-slot="description" className="text-sm text-tertiary">
                {description}
              </p>
            ) : null}
            {children}
          </div>
        </div>
        {effectiveShowCloseIcon ? <OverlayClose /> : null}
      </div>
    </OverlayCloseDefaultsContext.Provider>
  );
});

export const OverlayBody = forwardRef<HTMLDivElement, OverlayBodyProps>(function OverlayBody(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} data-slot="body" className={cn("min-h-0 flex-1 overflow-y-auto px-4 py-4", className)} {...props}>
      {children}
    </div>
  );
});

export const OverlayFooter = forwardRef<HTMLDivElement, OverlayFooterProps>(function OverlayFooter(
  { separator = true, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="footer"
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-end gap-2 px-4 py-3",
        separator && "border-primary border-t",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const OverlayClose = forwardRef<HTMLButtonElement, OverlayCloseProps>(function OverlayClose(
  {
    color,
    variant,
    size,
    shape,
    className,
    onClick,
    children = <X aria-hidden="true" />,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const { onClose } = useOverlayContext();
  const defaults = useContext(OverlayCloseDefaultsContext);

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    onClose();
  };

  return (
    <Button.Icon
      ref={ref}
      color={color ?? defaults?.color ?? "neutral"}
      variant={variant ?? defaults?.variant ?? "text"}
      size={size ?? defaults?.size ?? "sm"}
      shape={shape ?? defaults?.shape}
      aria-label={ariaLabel ?? defaults?.["aria-label"] ?? "Close"}
      onClick={handleClick}
      data-slot="close"
      className={cn(defaults?.className, className)}
      {...props}
    >
      {children}
    </Button.Icon>
  );
});
