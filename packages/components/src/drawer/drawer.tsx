import { cn } from "@kdo/utils";
import {
  type CSSProperties,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { OverlayContext } from "../lib/overlay-context";
import { OverlayBody, OverlayClose, OverlayFooter, OverlayHeader } from "../lib/overlay-parts";
import { useOverlay } from "../lib/use-overlay";
import type { DrawerPosition, DrawerProps } from "./drawer.type";

const panelPositions: Record<DrawerPosition, string> = {
  top: "inset-x-0 top-0 max-h-[90dvh] rounded-b-2xl border-secondary border-b",
  bottom: "inset-x-0 bottom-0 max-h-[90dvh] rounded-t-2xl border-secondary border-t",
  left: "inset-y-0 left-0 h-full w-80 max-w-[90vw] rounded-r-2xl border-secondary border-r",
  right: "inset-y-0 right-0 h-full w-80 max-w-[90vw] rounded-l-2xl border-secondary border-l",
};

const hiddenPositions: Record<DrawerPosition, string> = {
  top: "-translate-y-full",
  bottom: "translate-y-full",
  left: "-translate-x-full",
  right: "translate-x-full",
};

function drawerSizeStyle(
  position: DrawerPosition,
  size: number | string | undefined,
): CSSProperties {
  if (size === undefined) return {};
  const value = typeof size === "number" ? `${size}px` : size;
  return position === "left" || position === "right" ? { width: value } : { height: value };
}

const DrawerRoot = forwardRef<HTMLDivElement, DrawerProps>(function DrawerRoot(
  {
    open,
    defaultOpen = false,
    onOpenChange,
    position = "right",
    size,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseIcon = true,
    className,
    overlayClassName,
    children,
    onKeyDown,
    style,
    ...props
  },
  ref,
) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const { mounted, rendered, visible, close, trapFocus } = useOverlay({
    open,
    defaultOpen,
    onOpenChange,
    closeOnEscape,
    exitDuration: 300,
    panelRef,
  });

  const handleScrimClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) return;
    if (event.target !== event.currentTarget) return;
    close();
  };

  const handlePanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    trapFocus(event);
  };

  if (!mounted || !rendered) return null;

  return (
    <OverlayContext.Provider
      value={{
        onClose: close,
        showCloseIcon,
        titleId,
        descriptionId,
        setTitlePresent: setHasTitle,
        setDescriptionPresent: setHasDescription,
      }}
    >
      {createPortal(
        <div
          data-slot="overlay"
          className={cn(
            "fixed inset-0 z-50 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out",
            visible ? "opacity-100" : "pointer-events-none opacity-0",
            overlayClassName,
          )}
        >
          {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: the scrim is a presentational dismiss surface; Escape and keyboard focus are handled by the root and the panel, so it needs no role or key handler of its own. */}
          <div
            data-slot="scrim"
            className="absolute inset-0 bg-neutral-800/20 backdrop-blur-[2px]"
            onClick={handleScrimClick}
          />
          <div
            ref={setPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={hasTitle ? titleId : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            tabIndex={-1}
            onKeyDown={handlePanelKeyDown}
            style={{ ...drawerSizeStyle(position, size), ...style }}
            className={cn(
              "absolute flex flex-col overflow-hidden border-secondary bg-primary text-primary shadow-2xl outline-none motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
              panelPositions[position],
              visible ? "translate-x-0 translate-y-0" : hiddenPositions[position],
              className,
            )}
            {...props}
          >
            {children}
          </div>
        </div>,
        document.body,
      )}
    </OverlayContext.Provider>
  );
});

DrawerRoot.displayName = "Drawer";

export const Drawer = Object.assign(DrawerRoot, {
  Header: OverlayHeader,
  Body: OverlayBody,
  Footer: OverlayFooter,
  Close: OverlayClose,
});
