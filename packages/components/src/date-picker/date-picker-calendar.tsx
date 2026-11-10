import { cn } from "@kdo/utils";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  DatePickerHolidayInput,
  DatePickerLabels,
  DatePickerLocale,
  DatePickerMode,
  DatePickerPreset,
  DatePickerPresetLayout,
  DatePickerRange,
  DatePickerView,
} from "./date-picker.type";
import { DatePickerDayGrid } from "./date-picker-day-grid";
import { DatePickerFooter } from "./date-picker-footer";
import { DatePickerHeader } from "./date-picker-header";
import { DatePickerHolidayList } from "./date-picker-holiday-list";
import { DatePickerMonthGrid, DatePickerYearGrid } from "./date-picker-month-year-grid";
import { DatePickerPresets } from "./date-picker-presets";
import {
  addDays,
  clampDay,
  dateKey,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  orderRange,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "./date-picker-utils";
import { useDatePickerNavigation } from "./use-date-picker-navigation";

type DatePickerCalendarProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue"
> & {
  mode: DatePickerMode;
  selection: DatePickerRange;
  locale: DatePickerLocale;
  labels: DatePickerLabels;
  weekStartsOn: number;
  minDate?: Date;
  maxDate?: Date;
  today?: Date;
  isDateDisabled?: (date: Date) => boolean;
  disabledDates?: Date[];
  holidays?: DatePickerHolidayInput[];
  presets?: DatePickerPreset[];
  presetLayout?: DatePickerPresetLayout;
  calendarSlot?: ReactNode;
  holidayListOpen?: boolean;
  defaultHolidayListOpen?: boolean;
  onHolidayListOpenChange?: (open: boolean) => void;
  activePreset: number | null;
  onPresetSelect: (index: number) => void;
  initialView?: DatePickerView;
  disabled: boolean;
  showFooter: boolean;
  footer?: ReactNode;
  autoFocus?: boolean;
  ariaLabel: string;
  onSelectDate: (date: Date) => void;
  onClear: () => void;
};

export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(
  function DatePickerCalendar(
    {
      mode,
      selection,
      locale,
      labels,
      weekStartsOn,
      minDate,
      maxDate,
      today: todayProp,
      isDateDisabled,
      disabledDates,
      holidays,
      presets,
      presetLayout = "wrap",
      calendarSlot,
      holidayListOpen,
      defaultHolidayListOpen = true,
      onHolidayListOpenChange,
      activePreset,
      onPresetSelect,
      initialView = "days",
      disabled,
      showFooter,
      footer,
      autoFocus = false,
      ariaLabel,
      onSelectDate,
      onClear,
      className,
      ...props
    },
    ref,
  ) {
    const [mountedAt] = useState(() => new Date());
    const today = startOfDay(todayProp ?? mountedAt);
    const [initialAnchor] = useState(() =>
      clampDay(selection.start ?? selection.end ?? today, minDate, maxDate),
    );
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [internalHolidayListOpen, setInternalHolidayListOpen] = useState(defaultHolidayListOpen);
    const isHolidayListOpenControlled = holidayListOpen !== undefined;
    const isHolidayListOpen = isHolidayListOpenControlled
      ? holidayListOpen
      : internalHolidayListOpen;

    const panelRef = useRef<HTMLDivElement | null>(null);
    const gridRef = useRef<HTMLTableElement | null>(null);
    const focusRequest = useRef<"mount" | "keyboard" | null>(autoFocus ? "mount" : null);

    const {
      view,
      viewMonth,
      setViewMonth,
      focusedDate,
      setFocusedDate,
      yearPageStart,
      viewFocusSelector,
      canGoPrevious,
      canGoNext,
      handlePrevious,
      handleNext,
      openMonths,
      openYears,
      selectMonth,
      selectYear,
      changeMonth,
      isMonthDisabled,
      isYearDisabled,
    } = useDatePickerNavigation({
      initialAnchor,
      initialView,
      minDate,
      maxDate,
      disabled,
      autoFocus,
      focusRequest,
    });

    const setRootRef = useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const disabledDateKeys = useMemo(
      () => new Set((disabledDates ?? []).map((date) => dateKey(startOfDay(date)))),
      [disabledDates],
    );

    const holidayEntries = useMemo(
      () =>
        (holidays ?? []).map((holiday) =>
          holiday instanceof Date
            ? { date: startOfDay(holiday), label: "" }
            : { date: startOfDay(holiday.date), label: holiday.label ?? "" },
        ),
      [holidays],
    );

    const holidayKeys = useMemo(
      () => new Set(holidayEntries.map((holiday) => dateKey(holiday.date))),
      [holidayEntries],
    );

    const holidayNotes = useMemo(
      () =>
        holidayEntries
          .filter((holiday) => holiday.label !== "" && isSameMonth(holiday.date, viewMonth))
          .sort((a, b) => a.date.getTime() - b.date.getTime()),
      [holidayEntries, viewMonth],
    );

    const toggleHolidayList = () => {
      const next = !isHolidayListOpen;
      if (!isHolidayListOpenControlled) setInternalHolidayListOpen(next);
      onHolidayListOpenChange?.(next);
    };

    const isDayDisabled = useCallback(
      (day: Date): boolean => {
        if (disabled) return true;
        if (minDate !== undefined && isBeforeDay(day, minDate)) return true;
        if (maxDate !== undefined && isAfterDay(day, maxDate)) return true;
        if (disabledDateKeys.has(dateKey(day))) return true;
        return isDateDisabled?.(day) === true;
      },
      [disabled, minDate, maxDate, disabledDateKeys, isDateDisabled],
    );

    const focusDay = useCallback((day: Date) => {
      const node = gridRef.current?.querySelector<HTMLElement>(`[data-date="${dateKey(day)}"]`);
      node?.focus({ preventScroll: true });
    }, []);

    useEffect(() => {
      if (view !== "days" || focusRequest.current === null) return;
      focusRequest.current = null;
      focusDay(focusedDate);
    }, [view, focusedDate, focusDay]);

    // After switching panels the clicked header control unmounts; move focus to
    // the equivalent item in the new panel so keyboard users keep their place.
    useEffect(() => {
      const selector = viewFocusSelector.current;
      if (selector === null || view === "days") return;
      viewFocusSelector.current = null;
      panelRef.current?.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
    }, [view, viewFocusSelector]);

    // Controlled values can move the selection far outside the visible month;
    // follow them without fighting the user's own month navigation.
    const anchorTime = (selection.start ?? selection.end)?.getTime() ?? null;
    useEffect(() => {
      if (anchorTime === null) return;
      const anchor = clampDay(new Date(anchorTime), minDate, maxDate);
      setViewMonth((current) => (isSameMonth(current, anchor) ? current : startOfMonth(anchor)));
      setFocusedDate((current) => (isSameMonth(current, anchor) ? current : anchor));
    }, [anchorTime, minDate, maxDate, setFocusedDate, setViewMonth]);

    const year = viewMonth.getFullYear();

    const moveFocus = (next: Date) => {
      const target = clampDay(next, minDate, maxDate);
      if (isSameDay(target, focusedDate)) {
        focusDay(target);
        return;
      }
      setFocusedDate(target);
      setViewMonth((current) => (isSameMonth(current, target) ? current : startOfMonth(target)));
      focusRequest.current = "keyboard";
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLTableElement>) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          moveFocus(addDays(focusedDate, -1));
          break;
        case "ArrowRight":
          event.preventDefault();
          moveFocus(addDays(focusedDate, 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          moveFocus(addDays(focusedDate, -7));
          break;
        case "ArrowDown":
          event.preventDefault();
          moveFocus(addDays(focusedDate, 7));
          break;
        case "Home":
          event.preventDefault();
          moveFocus(startOfWeek(focusedDate, weekStartsOn));
          break;
        case "End":
          event.preventDefault();
          moveFocus(addDays(startOfWeek(focusedDate, weekStartsOn), 6));
          break;
        case "PageUp":
          event.preventDefault();
          changeMonth(event.shiftKey ? -12 : -1, true);
          break;
        case "PageDown":
          event.preventDefault();
          changeMonth(event.shiftKey ? 12 : 1, true);
          break;
        default:
          break;
      }
    };

    const selectDay = (day: Date) => {
      if (isDayDisabled(day)) return;
      setFocusedDate(day);
      setViewMonth((current) => (isSameMonth(current, day) ? current : startOfMonth(day)));
      onSelectDate(day);
    };

    let rangeStart = selection.start;
    let rangeEnd = selection.end;
    if (
      mode === "range" &&
      selection.start !== null &&
      selection.end === null &&
      hoverDate !== null
    ) {
      [rangeStart, rangeEnd] = orderRange(selection.start, hoverDate);
    }

    const pendingStart = mode === "range" && selection.start !== null && selection.end === null;
    const previewBeforeStart =
      pendingStart &&
      selection.start !== null &&
      hoverDate !== null &&
      isBeforeDay(hoverDate, selection.start);
    const previewAfterStart =
      pendingStart &&
      selection.start !== null &&
      hoverDate !== null &&
      isAfterDay(hoverDate, selection.start);

    const hasSelection = selection.start !== null || selection.end !== null;

    let footerNode: ReactNode = null;
    if (footer !== undefined) {
      footerNode = footer;
    } else if (showFooter) {
      footerNode = (
        <DatePickerFooter
          labels={labels}
          todayDisabled={isDayDisabled(today)}
          clearDisabled={disabled || !hasSelection}
          onToday={() => selectDay(today)}
          onClear={onClear}
        />
      );
    }

    return (
      <div
        ref={setRootRef}
        lang={locale}
        data-slot="date-picker"
        className={cn("w-72 select-none bg-primary p-2 text-primary", className)}
        {...props}
      >
        <DatePickerHeader
          view={view}
          viewMonth={viewMonth}
          yearPageStart={yearPageStart}
          locale={locale}
          labels={labels}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onOpenMonths={openMonths}
          onOpenYears={openYears}
        />

        {calendarSlot !== undefined && (
          <div data-slot="calendar-slot" className="mt-1">
            {calendarSlot}
          </div>
        )}

        {view === "days" && (
          <DatePickerDayGrid
            ref={gridRef}
            mode={mode}
            selection={selection}
            viewMonth={viewMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            pendingStart={pendingStart}
            previewBeforeStart={previewBeforeStart}
            previewAfterStart={previewAfterStart}
            weekStartsOn={weekStartsOn}
            locale={locale}
            labels={labels}
            today={today}
            holidayKeys={holidayKeys}
            focusedDate={focusedDate}
            isDayDisabled={isDayDisabled}
            ariaLabel={ariaLabel}
            onSelectDate={selectDay}
            onFocusedDateChange={setFocusedDate}
            onHoverDateChange={setHoverDate}
            onKeyDown={handleKeyDown}
          />
        )}

        {view === "months" && (
          <DatePickerMonthGrid
            year={year}
            activeMonth={viewMonth.getMonth()}
            locale={locale}
            isMonthDisabled={isMonthDisabled}
            onSelect={selectMonth}
          />
        )}

        {view === "years" && (
          <DatePickerYearGrid
            pageStart={yearPageStart}
            activeYear={year}
            isYearDisabled={isYearDisabled}
            onSelect={selectYear}
          />
        )}

        {presets !== undefined && presets.length > 0 && (
          <DatePickerPresets
            presets={presets}
            activeIndex={activePreset}
            layout={presetLayout}
            disabled={disabled}
            onSelect={onPresetSelect}
          />
        )}

        {view === "days" && holidayNotes.length > 0 && (
          <DatePickerHolidayList
            items={holidayNotes}
            locale={locale}
            labels={labels}
            open={isHolidayListOpen}
            onToggle={toggleHolidayList}
          />
        )}

        {footerNode}
      </div>
    );
  },
);

DatePickerCalendar.displayName = "DatePickerCalendar";
