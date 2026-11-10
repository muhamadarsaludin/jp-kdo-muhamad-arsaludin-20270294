import { forwardRef, useCallback, useMemo, useRef, useState } from "react";

import { focusableElements } from "../lib/focus";
import { Popover } from "../popover/popover";
import type {
  DatePickerBaseProps,
  DatePickerMode,
  DatePickerProps,
  DatePickerRange,
  DatePickerRangeProps,
  DatePickerSingleProps,
} from "./date-picker.type";
import { DatePickerCalendar } from "./date-picker-calendar";
import { resolveDatePickerLabels, resolveWeekStartsOn } from "./date-picker-locale";
import {
  findActiveRangePreset,
  findActiveSinglePreset,
  holidayDateKeys,
  isAfterDay,
  orderRange,
  resolvePresetRange,
  resolveSinglePresetDate,
  startOfDay,
} from "./date-picker-utils";

const EMPTY_RANGE: DatePickerRange = { start: null, end: null };

type DatePickerShellProps = DatePickerBaseProps & {
  mode: DatePickerMode;
  selection: DatePickerRange;
  onSelectDate: (date: Date) => void;
  onClear: () => void;
  activePreset: number | null;
  onPresetSelect: (index: number) => void;
};

const DatePickerShell = forwardRef<HTMLDivElement, DatePickerShellProps>(
  function DatePickerShell(props, ref) {
    const {
      mode,
      selection,
      onSelectDate,
      onClear,
      activePreset,
      onPresetSelect,
      locale = "en",
      labels: labelOverrides,
      weekStartsOn: weekStartsOnProp,
      minDate,
      maxDate,
      today,
      isDateDisabled,
      disabledDates,
      holidays,
      presets,
      presetLayout = "wrap",
      calendarSlot,
      holidayListOpen,
      defaultHolidayListOpen,
      onHolidayListOpenChange,
      initialView,
      disabled = false,
      showFooter = true,
      footer,
      trigger,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      closeOnSelect = true,
      autoFocusCalendar = true,
      position = "bottom-start",
      offset = 8,
      contentClassName,
      className,
      "aria-label": ariaLabel,
      ...rootProps
    } = props;

    const labels = resolveDatePickerLabels(locale, labelOverrides);
    const weekStartsOn = resolveWeekStartsOn(locale, weekStartsOnProp);
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

    const handleSelectDate = (date: Date) => {
      onSelectDate(date);
      if (trigger === undefined || !closeOnSelect) return;

      // Single pick completes immediately; a range completes on its second click.
      const completes = mode === "single" || (selection.start !== null && selection.end === null);
      if (!completes) return;

      setOpen(false);
      focusTrigger();
    };

    const calendarProps = {
      mode,
      selection,
      locale,
      labels,
      weekStartsOn,
      minDate,
      maxDate,
      today,
      isDateDisabled,
      disabledDates,
      holidays,
      presets,
      presetLayout,
      calendarSlot,
      holidayListOpen,
      defaultHolidayListOpen,
      onHolidayListOpenChange,
      activePreset,
      onPresetSelect,
      initialView,
      disabled,
      showFooter,
      footer,
      className,
      ariaLabel: ariaLabel ?? labels.calendar,
      onSelectDate: handleSelectDate,
      onClear,
    } as const;

    if (trigger === undefined) {
      return <DatePickerCalendar ref={ref} {...rootProps} {...calendarProps} />;
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
        contentLabel={ariaLabel ?? labels.calendar}
        contentClassName={contentClassName}
      >
        <DatePickerCalendar {...calendarProps} autoFocus={autoFocusCalendar} />
      </Popover>
    );
  },
);

function normalizeRange(range: DatePickerRange): DatePickerRange {
  if (range.start !== null && range.end !== null && isAfterDay(range.start, range.end)) {
    return { start: startOfDay(range.end), end: startOfDay(range.start) };
  }
  return range;
}

const DatePickerSingleRoot = forwardRef<HTMLDivElement, DatePickerSingleProps>(
  function DatePickerSingleRoot(props, ref) {
    const { value, defaultValue, onValueChange, presets, today: todayProp, ...rest } = props;
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
    const isControlled = value !== undefined;
    const selected = (isControlled ? value : internalValue) ?? null;
    const today = startOfDay(todayProp ?? new Date());
    const holidayKeys = useMemo(() => holidayDateKeys(props.holidays), [props.holidays]);

    const selection = useMemo<DatePickerRange>(() => ({ start: selected, end: null }), [selected]);
    const activePreset = findActiveSinglePreset(
      presets ?? [],
      selected,
      today,
      props.minDate,
      props.maxDate,
      holidayKeys,
    );

    const handleSelectDate = (date: Date) => {
      const next = startOfDay(date);
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue(null);
      onValueChange?.(null);
    };

    const handlePresetSelect = (index: number) => {
      const preset = presets?.[index];
      if (preset === undefined) return;

      const next = resolveSinglePresetDate(
        preset,
        today,
        props.minDate,
        props.maxDate,
        holidayKeys,
      );
      if (next === null) return;

      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    return (
      <DatePickerShell
        ref={ref}
        {...rest}
        today={today}
        presets={presets}
        mode="single"
        selection={selection}
        activePreset={activePreset}
        onPresetSelect={handlePresetSelect}
        onSelectDate={handleSelectDate}
        onClear={handleClear}
      />
    );
  },
);

const DatePickerRangeRoot = forwardRef<HTMLDivElement, DatePickerRangeProps>(
  function DatePickerRangeRoot(props, ref) {
    const { value, defaultValue, onValueChange, presets, today: todayProp, ...rest } = props;
    const [internalValue, setInternalValue] = useState<DatePickerRange>(
      defaultValue ?? EMPTY_RANGE,
    );
    const isControlled = value !== undefined;
    const current = normalizeRange((isControlled ? value : internalValue) ?? EMPTY_RANGE);
    const today = startOfDay(todayProp ?? new Date());
    const holidayKeys = useMemo(() => holidayDateKeys(props.holidays), [props.holidays]);
    const activePreset = findActiveRangePreset(
      presets ?? [],
      current,
      today,
      props.minDate,
      props.maxDate,
      holidayKeys,
    );

    const commit = (next: DatePickerRange) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const handleSelectDate = (date: Date) => {
      if (current.start === null || current.end !== null) {
        commit({ start: startOfDay(date), end: null });
        return;
      }
      const [start, end] = orderRange(current.start, date);
      commit({ start, end });
    };

    const handleClear = () => commit(EMPTY_RANGE);

    const handlePresetSelect = (index: number) => {
      const preset = presets?.[index];
      if (preset === undefined) return;

      const anchor = current.start ?? today;
      const next = resolvePresetRange(preset, anchor, props.minDate, props.maxDate, holidayKeys);
      if (next !== null) commit(next);
    };

    return (
      <DatePickerShell
        ref={ref}
        {...rest}
        today={today}
        presets={presets}
        mode="range"
        selection={current}
        activePreset={activePreset}
        onPresetSelect={handlePresetSelect}
        onSelectDate={handleSelectDate}
        onClear={handleClear}
      />
    );
  },
);

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(props, ref) {
    if (props.mode === "range") return <DatePickerRangeRoot {...props} ref={ref} />;
    return <DatePickerSingleRoot {...props} ref={ref} />;
  },
);

DatePicker.displayName = "DatePicker";
