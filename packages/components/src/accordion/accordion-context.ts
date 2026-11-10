import { createContext, useContext } from "react";

export type AccordionContextValue = {
  isExpanded: (value: string) => boolean;
  toggle: (value: string) => void;
  disabled: boolean;
  separator: boolean;
};

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (context === null) throw new Error("Accordion compound parts must be used inside <Accordion>");
  return context;
}

export type AccordionItemContextValue = {
  value: string;
  expanded: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
  toggle: () => void;
};

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (context === null) throw new Error("Accordion.Trigger and Accordion.Content must be used inside <Accordion.Item>");
  return context;
}
