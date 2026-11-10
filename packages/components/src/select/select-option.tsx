import { forwardRef, type MouseEvent as ReactMouseEvent } from "react";

import { ItemRowContent, itemRowClassName, itemRowSlotOffset } from "../lib/item-row";
import { SelectionMark } from "../lib/selection-mark";
import type { SelectOptionProps } from "./select.type";
import { useSelectContext } from "./select-context";

export const SelectOption = forwardRef<HTMLButtonElement, SelectOptionProps>(function SelectOption(
  { value, startContent, endContent, description, className, children, onClick, ...props },
  ref,
) {
  const { selectionMode, selectedValues, activeValue, selectionIndicator, selectionPosition, selectOption } =
    useSelectContext();
  const multiple = selectionMode === "multiple";
  const selected = selectedValues.includes(value);
  const active = activeValue === value;
  const alignment = description === undefined ? "center" : "start";
  const slotOffset = itemRowSlotOffset(alignment);

  let selectionMark = null;
  if (multiple) {
    selectionMark = <SelectionMark kind="checkbox" selected={selected} className={slotOffset} />;
  } else if (selectionIndicator === "radio") {
    selectionMark = <SelectionMark kind="radio" selected={selected} className={slotOffset} />;
  } else if (selectionIndicator === "checkmark" && selected) {
    selectionMark = <SelectionMark kind="checkmark" selected className={slotOffset} />;
  }

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    selectOption(value);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="option"
      data-option-value={value}
      aria-selected={selected}
      tabIndex={active ? 0 : -1}
      onClick={handleClick}
      data-slot="option"
      className={itemRowClassName({
        variant: "menu",
        alignment,
        background: selected ? "brand" : "none",
        emphasized: selected,
        className,
      })}
      {...props}
    >
      <ItemRowContent
        variant="menu"
        alignment={alignment}
        label={children}
        description={description}
        startContent={startContent}
        endContent={endContent}
        selectionStart={selectionPosition === "start" ? selectionMark : null}
        selectionEnd={selectionPosition === "end" ? selectionMark : null}
        emphasized={selected}
      />
    </button>
  );
});

SelectOption.displayName = "Select.Option";
