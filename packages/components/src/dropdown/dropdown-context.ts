import { createContext, useContext } from "react";

import type { DropdownSelectionIndicator, DropdownSelectionMode, DropdownSelectionPosition } from "./dropdown.type";

export type DropdownContextValue = {
  close: () => void;
  focusTrigger: () => void;
  selectionMode: DropdownSelectionMode;
  selectedValue?: string;
  selectValue: (value: string) => void;
  selectionIndicator?: DropdownSelectionIndicator;
  selectionPosition?: DropdownSelectionPosition;
};

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(): DropdownContextValue {
  const context = useContext(DropdownContext);
  if (context === null) throw new Error("Dropdown compound parts must be used inside <Dropdown>");
  return context;
}

const focusableControlSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function focusDropdownTrigger(scope: HTMLElement | null): void {
  if (scope === null) return;
  const control = scope.querySelector<HTMLElement>(focusableControlSelector);
  (control ?? scope).focus();
}
