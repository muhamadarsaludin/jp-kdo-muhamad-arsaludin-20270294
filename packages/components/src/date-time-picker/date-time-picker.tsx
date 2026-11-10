import { type ForwardedRef, forwardRef, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@kdo/utils";

import { Button } from "../button/button";
import { DatePicker } from "../date-picker/date-picker";
import { isSameDay, startOfDay } from "../date-picker/date-picker-utils";
import { focusableElements } from "../lib/focus";
import { Popover } from "../popover/popover";
import { TimePicker } from "../time-picker/time-picker";
import { resolveTimePickerLabels } from "../time-picker/time-picker-locale";
import { normalizeTime, toTimeString } from "../time-picker/time-picker-utils";
import type { DateTimePickerProps, DateTimeValue } from "./date-time-picker.type";
import { resolveDateTimePickerLabels } from "./date-time-picker-locale";
import { EMPTY_DATE_TIME, normalizeDateTime, toDateTime } from "./date-time-picker-utils";

type AssignableRef<T> = ForwardedRef<T>;

function assignRef<T>(ref: AssignableRef<T>, node: T | null): void {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
}

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(function DateTimePicker(props, ref) {
  const {
    value,
    defaultValue,
    onValueChange,
    locale = "en",
    dateLabels,
    timeLabels,
    labels: labelOverrides,
    weekStartsOn,
    minDateTime,
    maxDateTime,
    isDateDisabled,
    disabledDates,
    holidays,
    timeOptions,
    timeMode,
    listAlign,
    format = "24h",
    minuteStep,
    showWheelLabels = true,
    wheelLabelVariant = "full",
    isTimeDisabled,
    disabled = false,
    showFooter = true,
    footer,
    today,
    trigger,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    closeOnSelect = true,
    autoFocusPanel = true,
    position = "bottom-start",
    offset = 8,
    contentClassName,
    triggerClassName,
    className,
    "aria-label": ariaLabel,
    ...rootProps
  } = props;

  const labels = resolveDateTimePickerLabels(locale, labelOverrides);
  const timeLabelsResolved = resolveTimePickerLabels(locale, timeLabels);
  const [internalValue, setInternalValue] = useState<DateTimeValue>(() =>
    normalizeDateTime(defaultValue ?? EMPTY_DATE_TIME),
  );
  const isControlled = value !== undefined;
  const current = normalizeDateTime(isControlled ? value : internalValue);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpenControlled = controlledOpen !== undefined;
  const isOpen = isOpenControlled ? controlledOpen : uncontrolledOpen;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const didAutoFocus = useRef(false);
  const now = today ?? new Date();
  const nowDay = startOfDay(now);

  const minDay = minDateTime === undefined ? undefined : startOfDay(minDateTime);
  const maxDay = maxDateTime === undefined ? undefined : startOfDay(maxDateTime);
  const optionsForDate = useCallback((date: Date | null) => timeOptions?.(date), [timeOptions]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange],
  );

  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (trigger === undefined) assignRef(ref, node);
    },
    [ref, trigger],
  );

  const setPopoverRef = useCallback(
    (node: HTMLDivElement | null) => {
      popoverRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  const focusTrigger = useCallback(() => {
    const [first] = focusableElements(popoverRef.current);
    first?.focus();
  }, []);

  const isDaySelectable = useCallback(
    (date: Date): boolean => {
      const day = startOfDay(date);
      if (isDateDisabled?.(day) === true) return false;
      if (disabledDates?.some((candidate) => isSameDay(candidate, day)) === true) return false;
      if (minDay !== undefined && day.getTime() < minDay.getTime()) return false;
      if (maxDay !== undefined && day.getTime() > maxDay.getTime()) return false;
      return true;
    },
    [disabledDates, isDateDisabled, maxDay, minDay],
  );

  const isTimeSelectable = useCallback(
    (date: Date | null, time: string | null): boolean => {
      const normalized = normalizeTime(time);
      if (normalized === null) return false;
      if (date !== null && !isDaySelectable(date)) return false;
      if (isTimeDisabled?.(normalized, date) === true) return false;

      if (date !== null) {
        const candidate = toDateTime({ date, time: normalized });
        if (candidate === null) return false;
        if (minDateTime !== undefined && candidate.getTime() < minDateTime.getTime()) return false;
        if (maxDateTime !== undefined && candidate.getTime() > maxDateTime.getTime()) return false;
      }

      if (timeOptions !== undefined) {
        const slots = optionsForDate(date) ?? [];
        return slots.some((slot) => normalizeTime(slot.value) === normalized && slot.disabled !== true);
      }

      return true;
    },
    [isDaySelectable, isTimeDisabled, maxDateTime, minDateTime, optionsForDate, timeOptions],
  );

  const commit = (next: DateTimeValue) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const commitAndMaybeClose = (next: DateTimeValue) => {
    commit(next);
    if (trigger === undefined || !closeOnSelect) return;
    if (next.date === null || next.time === null) return;

    setOpen(false);
    focusTrigger();
  };

  const handleDateChange = (date: Date | null) => {
    const nextDate = date === null ? null : startOfDay(date);
    const keepTime = current.time !== null && isTimeSelectable(nextDate, current.time);
    commitAndMaybeClose({ date: nextDate, time: keepTime ? current.time : null });
  };

  const handleTimeChange = (time: string | null) => {
    commitAndMaybeClose({ date: current.date, time: normalizeTime(time) });
  };

  const handleClear = () => commit(EMPTY_DATE_TIME);

  const nowTime = toTimeString(now.getHours(), now.getMinutes());
  const nowDisabled = disabled || !isTimeSelectable(nowDay, nowTime);

  const handleNow = () => {
    if (nowDisabled) return;
    commit({ date: nowDay, time: nowTime });
  };

  useEffect(() => {
    if (!isOpen) {
      didAutoFocus.current = false;
      return;
    }
    if (trigger === undefined || !autoFocusPanel || didAutoFocus.current) return;

    const panel = panelRef.current;
    if (panel === null) return;

    didAutoFocus.current = true;
    const preferred =
      current.date === null
        ? panel.querySelector<HTMLElement>('[role="gridcell"] [tabindex="0"]')
        : (panel.querySelector<HTMLElement>('[role="option"][aria-selected="true"]') ??
          panel.querySelector<HTMLElement>('[role="option"]') ??
          panel.querySelector<HTMLElement>("input"));
    (preferred ?? focusableElements(panel)[0])?.focus({ preventScroll: true });
  }, [autoFocusPanel, current.date, isOpen, trigger]);

  const effectiveTimeMode = timeOptions !== undefined ? "list" : (timeMode ?? "wheel");
  const resolvedOptions = timeOptions === undefined ? undefined : optionsForDate(current.date);
  const hasValue = current.date !== null || current.time !== null;

  let footerNode: ReactNode = null;
  if (footer !== undefined) {
    footerNode = footer;
  } else if (showFooter) {
    footerNode = (
      <div className="mt-2 flex items-center justify-between border-secondary border-t px-1 pt-2">
        <Button variant="text" color="brand" size="sm" disabled={nowDisabled} onClick={handleNow}>
          {timeLabelsResolved.now}
        </Button>
        <Button variant="text" color="neutral" size="sm" disabled={disabled || !hasValue} onClick={handleClear}>
          {timeLabelsResolved.clear}
        </Button>
      </div>
    );
  }

  const panel = (
    <div
      ref={setPanelRef}
      data-slot="date-time-picker"
      lang={locale}
      className={cn("w-72 select-none bg-primary p-2 text-primary sm:w-fit", className)}
      {...rootProps}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <DatePicker
          mode="single"
          value={current.date}
          onValueChange={handleDateChange}
          locale={locale}
          labels={dateLabels}
          weekStartsOn={weekStartsOn}
          minDate={minDay}
          maxDate={maxDay}
          today={nowDay}
          isDateDisabled={isDateDisabled}
          disabledDates={disabledDates}
          holidays={holidays}
          disabled={disabled}
          showFooter={false}
          className="w-full p-0 sm:w-72"
        />
        <div className="border-secondary border-t pt-2 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-2">
          <TimePicker
            mode={effectiveTimeMode}
            value={current.time}
            onValueChange={handleTimeChange}
            locale={locale}
            labels={timeLabels}
            options={resolvedOptions}
            listAlign={listAlign}
            format={format}
            minuteStep={minuteStep}
            showWheelLabels={showWheelLabels}
            wheelLabelVariant={wheelLabelVariant}
            isTimeDisabled={(time) =>
              isTimeDisabled?.(time, current.date) === true || !isTimeSelectable(current.date, time)
            }
            disabled={disabled}
            showFooter={false}
            className="w-full p-0 sm:w-[200px]"
          />
        </div>
      </div>
      {footerNode}
    </div>
  );

  if (trigger === undefined) return panel;

  return (
    <Popover
      ref={setPopoverRef}
      trigger={trigger}
      open={isOpen}
      onOpenChange={setOpen}
      disabled={disabled}
      defaultPosition={position}
      offset={offset}
      contentRole="dialog"
      contentLabel={ariaLabel ?? labels.dateTime}
      contentClassName={contentClassName}
      triggerClassName={triggerClassName}
    >
      {panel}
    </Popover>
  );
});

DateTimePicker.displayName = "DateTimePicker";
