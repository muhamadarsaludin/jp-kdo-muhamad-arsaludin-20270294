import { forwardRef, type MouseEvent as ReactMouseEvent } from "react";

import { ItemRowContent, itemRowClassName, itemRowSlotOffset } from "../lib/item-row";
import { SelectionMark } from "../lib/selection-mark";
import type { DropdownItemProps } from "./dropdown.type";
import { useDropdownContext } from "./dropdown-context";

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(function DropdownItem(
  {
    icon,
    startContent,
    endContent,
    description,
    shortcut,
    destructive = false,
    value,
    selected,
    className,
    children,
    onClick,
    disabled = false,
    ...props
  },
  ref,
) {
  const { close, focusTrigger, selectionMode, selectedValue, selectValue, selectionIndicator, selectionPosition } =
    useDropdownContext();
  const isRadio = selectionMode === "single" && value !== undefined;
  const isSelected = selected ?? (isRadio && value === selectedValue);
  const isManuallySelected = !isRadio && selected === true;
  const alignment = description === undefined ? "center" : "start";
  const slotOffset = itemRowSlotOffset(alignment);

  // Selection marks only belong to single-select menus: action items have
  // no checked state, and `selected` alone is expressed with aria-current + highlight.
  let selectionMark = null;
  if (isRadio && selectionIndicator === "radio") {
    selectionMark = <SelectionMark kind="radio" selected={isSelected} className={slotOffset} />;
  } else if (isRadio && selectionIndicator === "checkmark" && isSelected) {
    selectionMark = <SelectionMark kind="checkmark" selected className={slotOffset} />;
  }

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (isRadio && value !== undefined) selectValue(value);
    close();
    focusTrigger();
  };

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: role becomes menuitemradio for selectable items, where aria-checked is valid.
    <button
      ref={ref}
      type="button"
      role={isRadio ? "menuitemradio" : "menuitem"}
      aria-checked={isRadio ? isSelected : undefined}
      aria-current={isManuallySelected ? "true" : undefined}
      tabIndex={-1}
      disabled={disabled}
      onClick={handleClick}
      data-slot="item"
      data-selected={isSelected || undefined}
      className={itemRowClassName({
        variant: "menu",
        alignment,
        background: isSelected ? "brand" : "none",
        emphasized: isSelected,
        disabled,
        destructive,
        className,
      })}
      {...props}
    >
      <ItemRowContent
        variant="menu"
        alignment={alignment}
        label={children}
        description={description}
        startContent={startContent ?? icon}
        endContent={endContent}
        shortcut={shortcut}
        selectionStart={selectionPosition === "start" ? selectionMark : null}
        selectionEnd={selectionPosition === "end" ? selectionMark : null}
        emphasized={isSelected}
        disabled={disabled}
        destructive={destructive}
      />
    </button>
  );
});

DropdownItem.displayName = "Dropdown.Item";
