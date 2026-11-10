import {
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";
import { createPortal } from "react-dom";

import { OverlayContext } from "../lib/overlay-context";
import { OverlayBody, OverlayClose, OverlayFooter, OverlayHeader } from "../lib/overlay-parts";
import { useOverlay } from "../lib/use-overlay";
import type { ModalProps, ModalSize } from "./modal.type";

const modalSizes: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[calc(100vw-2rem)] md:max-w-5xl",
};

const ModalRoot = forwardRef<HTMLDivElement, ModalProps>(function ModalRoot(
  {
    open,
    defaultOpen = false,
    onOpenChange,
    size = "md",
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseIcon = true,
    className,
    overlayClassName,
    children,
    onKeyDown,
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
    panelRef,
  });

  const handleOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
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
        // biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: the backdrop is a presentational dismiss surface; Escape and keyboard focus are handled by the root and the panel, so it needs no role or key handler of its own.
        <div
          data-slot="overlay"
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-800/20 p-4 backdrop-blur-[2px] motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out",
            visible ? "opacity-100" : "pointer-events-none opacity-0",
            overlayClassName,
          )}
          onClick={handleOverlayClick}
        >
          <div
            ref={setPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={hasTitle ? titleId : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            tabIndex={-1}
            onKeyDown={handlePanelKeyDown}
            className={cn(
              "relative z-10 flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-2xl border border-primary bg-primary text-primary shadow-2xl outline-none motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
              modalSizes[size],
              visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
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

ModalRoot.displayName = "Modal";

export const Modal = Object.assign(ModalRoot, {
  Header: OverlayHeader,
  Body: OverlayBody,
  Footer: OverlayFooter,
  Close: OverlayClose,
});
