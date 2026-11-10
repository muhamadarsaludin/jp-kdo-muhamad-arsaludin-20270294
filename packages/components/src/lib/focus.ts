const focusableSelector = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]:not([contenteditable='false'])",
  "audio[controls]",
  "video[controls]",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function isVisibleWithin(element: HTMLElement, boundary: HTMLElement | null): boolean {
  let node: HTMLElement | null = element;

  while (node !== null) {
    if (node.hidden || node.hasAttribute("inert") || node.getAttribute("aria-hidden") === "true")
      return false;

    const style = getComputedStyle(node);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.visibility === "collapse"
    )
      return false;

    if (boundary !== null && node === boundary) break;
    node = node.parentElement;
  }

  return true;
}

export function focusableElements(panel: HTMLElement | null): HTMLElement[] {
  if (panel === null) return [];

  return Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) =>
    isVisibleWithin(element, panel),
  );
}

export function focusFirst(panel: HTMLElement | null): void {
  const [first] = focusableElements(panel);
  (first ?? panel)?.focus({ preventScroll: true });
}
