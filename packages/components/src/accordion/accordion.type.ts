import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type AccordionType = "single" | "multiple";

export type AccordionVariant = "outlined" | "plain";

export type AccordionProps = Omit<ComponentPropsWithoutRef<"div">, "children" | "defaultValue"> & {
  children?: ReactNode;
  type?: AccordionType;
  variant?: AccordionVariant;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  disabled?: boolean;
  separator?: boolean;
};

export type AccordionItemProps = Omit<ComponentPropsWithoutRef<"div">, "children" | "value"> & {
  children?: ReactNode;
  value: string;
  disabled?: boolean;
};

export type AccordionTriggerProps = ComponentPropsWithoutRef<"button"> & {
  startContent?: ReactNode;
  endContent?: ReactNode;
  action?: ReactNode;
};

export type AccordionContentProps = ComponentPropsWithoutRef<"div">;
