import { forwardRef, useCallback, useRef, useState } from "react";

import { focusableElements } from "../lib/focus";
import { Popover } from "../popover/popover";
import type { TimePickerProps } from "./time-picker.type";
import { resolveTimePickerLabels } from "./time-picker-locale";
import { TimePickerPanel } from "./time-picker-panel";
import { isTimeAllowed, normalizeTime } from "./time-picker-utils";

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  function TimePicker(props, ref) {
    const {
      mode = "wheel",
      listAlign = "start",
      showWheelLabels = true,
      wheelLabelVariant = "full",
      format = "24h",
      locale = "en",
      labels: labelOverrides,
      options,
      minuteStep,
      value,
      defaultValue = null,
      onValueChange,
      disabled = false,
      disabledHours,
      disabledMinutes,
      isTimeDisabled,
      showFooter = true,
      footer,
      trigger,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      closeOnSelect = mode === "list",
      autoFocusPanel = true,
      position = "bottom-start",
      offset = 8,
      contentClassName,
      className,
      "aria-label": ariaLabel,
      ...rootProps
    } = props;

    const labels = resolveTimePickerLabels(locale, labelOverrides);
    const [internalValue, setInternalValue] = useState<string | null>(normalizeTime(defaultValue));
    const isControlled = value !== undefined;
    const normalizedValue = normalizeTime(isControlled ? value : internalValue);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpenControlled = controlledOpen !== undefined;
    const isOpen = isOpenControlled ? controlledOpen : uncontrolledOpen;
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isOpenControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
      },
      [isOpenControlled, onOpenChange],
    );

    const setPopoverRef = useCallback(
      (node: HTMLDivElement | null) => {
        popoverRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const focusTrigger = useCallback(() => {
      const [first] = focusableElements(popoverRef.current);
      first?.focus();
    }, []);

    const commit = (next: string | null) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const handleSelect = (next: string) => {
      const normalized = normalizeTime(next);
      if (normalized === null) return;
      if (!isTimeAllowed(normalized, { disabled, disabledHours, disabledMinutes, isTimeDisabled }))
        return;

      commit(normalized);
      if (trigger === undefined || !closeOnSelect) return;

      setOpen(false);
      focusTrigger();
    };

    const handleClear = () => commit(null);

    const panelProps = {
      mode,
      listAlign,
      showWheelLabels,
      wheelLabelVariant,
      format,
      labels,
      options,
      minuteStep,
      value: normalizedValue,
      disabled,
      disabledHours,
      disabledMinutes,
      isTimeDisabled,
      showFooter,
      footer,
      ariaLabel: ariaLabel ?? labels.time,
      onSelect: handleSelect,
      onClear: handleClear,
      className,
    } as const;

    if (trigger === undefined) {
      return <TimePickerPanel ref={ref} {...rootProps} {...panelProps} autoFocus={false} />;
    }

    return (
      <Popover
        ref={setPopoverRef}
        {...rootProps}
        trigger={trigger}
        open={isOpen}
        onOpenChange={setOpen}
        disabled={disabled}
        defaultPosition={position}
        offset={offset}
        contentRole="dialog"
        contentLabel={ariaLabel ?? labels.time}
        contentClassName={contentClassName}
      >
        <TimePickerPanel {...panelProps} autoFocus={autoFocusPanel} />
      </Popover>
    );
  },
);

TimePicker.displayName = "TimePicker";
