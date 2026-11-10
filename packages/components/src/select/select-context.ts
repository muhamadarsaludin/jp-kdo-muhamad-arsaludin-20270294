import { createContext, useContext } from "react";

import type { SelectSelectionIndicator, SelectSelectionPosition } from "./select.type";

export type SelectContextValue = {
  selectionMode: "single" | "multiple";
  selectedValues: string[];
  activeValue: string | undefined;
  selectionIndicator: SelectSelectionIndicator;
  selectionPosition: SelectSelectionPosition;
  selectOption: (value: string) => void;
  setActiveValue: (value: string | undefined) => void;
};

export const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(): SelectContextValue {
  const context = useContext(SelectContext);
  if (context === null) throw new Error("Select compound parts must be used inside <Select>");
  return context;
}

const focusableControlSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function focusSelectTrigger(scope: HTMLElement | null): void {
  if (scope === null) return;
  const control = scope.querySelector<HTMLElement>(focusableControlSelector);
  (control ?? scope).focus();
}
