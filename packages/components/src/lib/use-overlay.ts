import {
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { focusableElements, focusFirst } from "./focus";
import { isTopOverlayLayer, lockBodyScroll, unlockBodyScroll, useOverlayLayer } from "./overlay-stack";

export type UseOverlayOptions = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  exitDuration?: number;
  panelRef: RefObject<HTMLElement | null>;
};

export type UseOverlayResult = {
  isOpen: boolean;
  mounted: boolean;
  rendered: boolean;
  visible: boolean;
  close: () => void;
  /** Keeps Tab/Shift+Tab focus cycling inside the panel. Chain it in `onKeyDown`. */
  trapFocus: (event: ReactKeyboardEvent<HTMLElement>) => void;
};

/**
 * Shared overlay behavior for portal-based floating surfaces (Modal, Drawer):
 * open/close lifecycle with an exit transition, body scroll lock, focus
 * capture/restore, initial focus, Escape-to-close, and a focus trap.
 */
export function useOverlay({
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnEscape = true,
  exitDuration = 200,
  panelRef,
}: UseOverlayOptions): UseOverlayResult {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const layer = useOverlayLayer(isOpen && mounted);

  const close = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Open immediately, but keep the node mounted during the exit transition.
  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      return;
    }
    setVisible(false);
    if (!rendered) return;
    const timer = setTimeout(() => setRendered(false), exitDuration);
    return () => clearTimeout(timer);
  }, [isOpen, rendered, exitDuration]);

  // Flip to the visible state on the next frame so the enter transition runs.
  useEffect(() => {
    if (!rendered || !isOpen) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [rendered, isOpen]);

  // Lock body scroll while the overlay is mounted. The shared lock is
  // reference-counted so stacked overlays restore the page exactly once.
  useEffect(() => {
    if (!rendered) return;
    lockBodyScroll();
    return unlockBodyScroll;
  }, [rendered]);

  // Remember what was focused, and restore it once the overlay leaves the tree.
  useEffect(() => {
    if (!rendered) return;
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    return () => {
      previousActiveElement.current?.focus?.({ preventScroll: true });
    };
  }, [rendered]);

  // Move focus into the panel once the portal has mounted.
  useEffect(() => {
    if (!rendered || !mounted) return;
    focusFirst(panelRef.current);
  }, [rendered, mounted, panelRef]);

  useEffect(() => {
    if (!rendered || !closeOnEscape) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !isTopOverlayLayer(layer)) return;
      close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [rendered, closeOnEscape, close, layer]);

  const trapFocus = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.defaultPrevented || event.key !== "Tab") return;
      const panel = panelRef.current;
      if (panel === null) return;

      const focusables = focusableElements(panel);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (first === undefined || last === undefined) return;
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || active === panel) {
          event.preventDefault();
          last.focus();
        }
        return;
      }
      if (active === last || active === panel) {
        event.preventDefault();
        first.focus();
      }
    },
    [panelRef],
  );

  return { isOpen, mounted, rendered, visible, close, trapFocus };
}
