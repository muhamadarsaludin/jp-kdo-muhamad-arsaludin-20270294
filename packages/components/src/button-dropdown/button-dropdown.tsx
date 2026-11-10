import { createContext, forwardRef, useContext, useState } from "react";

import { cn } from "@kdo/utils";
import { ChevronDown } from "lucide-react";

import { Button } from "../button/button";
import type { ButtonSize } from "../button/button.type";
import type { ButtonColor, ButtonVariant } from "../button/button-variants";
import { Dropdown } from "../dropdown/dropdown";
import type { Shape } from "../type";
import type {
  ButtonDropdownActionProps,
  ButtonDropdownProps,
  ButtonDropdownTriggerProps,
} from "./button-dropdown.type";

type ButtonDropdownContextValue = {
  size: ButtonSize;
  variant: ButtonVariant;
  color: ButtonColor;
  shape: Shape;
  disabled: boolean;
};

const ButtonDropdownContext = createContext<ButtonDropdownContextValue>({
  size: "md",
  variant: "solid",
  color: "brand",
  shape: "rounded",
  disabled: false,
});

const actionSeamClip = "focus-visible:[clip-path:inset(-8px_0_-8px_-8px)]";
const triggerSeamClip = "[clip-path:inset(-8px_-8px_-8px_1px)]";

const triggerDividerBorder: Record<ButtonColor, string> = {
  brand: "border-brand-primary",
  neutral: "border-primary",
  inverse: "border-primary-inverse",
  error: "border-error-primary",
};

const ButtonDropdownRoot = forwardRef<HTMLDivElement, ButtonDropdownProps>(function ButtonDropdownRoot(
  {
    size = "md",
    variant = "solid",
    color = "brand",
    shape = "rounded",
    disabled = false,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <ButtonDropdownContext.Provider value={{ size, variant, color, shape, disabled }}>
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        {children}
      </div>
    </ButtonDropdownContext.Provider>
  );
});

ButtonDropdownRoot.displayName = "ButtonDropdown";

const ButtonDropdownAction = forwardRef<HTMLButtonElement, ButtonDropdownActionProps>(function ButtonDropdownAction(
  { className, disabled = false, children, startContent, endContent, ...props },
  ref,
) {
  const group = useContext(ButtonDropdownContext);
  return (
    <Button
      ref={ref}
      size={group.size}
      variant={group.variant}
      color={group.color}
      shape={group.shape}
      disabled={group.disabled || disabled}
      startContent={startContent}
      endContent={endContent}
      className={cn("rounded-r-none", actionSeamClip, className)}
      {...props}
    >
      {children}
    </Button>
  );
});

ButtonDropdownAction.displayName = "ButtonDropdown.Action";

const ButtonDropdownTrigger = forwardRef<HTMLButtonElement, ButtonDropdownTriggerProps>(function ButtonDropdownTrigger(
  {
    menu,
    defaultPosition = "bottom-end",
    offset,
    open,
    defaultOpen = false,
    onOpenChange,
    selectionMode,
    value,
    defaultValue,
    onValueChange,
    selectionIndicator,
    selectionPosition,
    menuClassName,
    disabled = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const group = useContext(ButtonDropdownContext);
  const effectiveDisabled = group.disabled || disabled;
  const isSolid = group.variant === "solid";
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const handleOpenChange = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const icon = children ?? (
    <ChevronDown aria-hidden="true" className={cn("transition-transform", isOpen && "-rotate-180")} />
  );

  const triggerButton = (
    <Button.Icon
      ref={ref}
      size={group.size}
      variant={group.variant}
      color={group.color}
      shape={group.shape}
      aria-haspopup={menu === undefined ? undefined : "menu"}
      aria-expanded={menu === undefined ? undefined : isOpen}
      disabled={effectiveDisabled}
      className={cn(
        "-ml-px rounded-l-none",
        triggerSeamClip,
        "border-l-2",
        isSolid ? "border-current" : triggerDividerBorder[group.color],
        className,
      )}
      {...props}
    >
      {icon}
    </Button.Icon>
  );

  if (menu === undefined) return triggerButton;

  return (
    <Dropdown
      trigger={triggerButton}
      position={defaultPosition}
      offset={offset}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={handleOpenChange}
      disabled={effectiveDisabled}
      triggerClassName="-ml-px"
      aria-label={props["aria-label"]}
      selectionMode={selectionMode}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      selectionIndicator={selectionIndicator}
      selectionPosition={selectionPosition}
      menuClassName={menuClassName}
    >
      {menu}
    </Dropdown>
  );
});

ButtonDropdownTrigger.displayName = "ButtonDropdown.Trigger";

export const ButtonDropdown = Object.assign(ButtonDropdownRoot, {
  Action: ButtonDropdownAction,
  Trigger: ButtonDropdownTrigger,
});
