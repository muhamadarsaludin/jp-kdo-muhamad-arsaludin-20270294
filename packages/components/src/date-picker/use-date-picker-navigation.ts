import { useCallback, useRef, useState } from "react";

import type { DatePickerView } from "./date-picker.type";
import {
  addMonths,
  clampDay,
  clampMonth,
  daysInMonth,
  isAfterMonth,
  isBeforeMonth,
  isMonthOutsideBounds,
  isSameMonth,
  isYearOutsideBounds,
  startOfMonth,
  YEARS_PER_PAGE,
} from "./date-picker-utils";

type FocusRequest = { current: "mount" | "keyboard" | null };

type UseDatePickerNavigationArgs = {
  initialAnchor: Date;
  initialView: DatePickerView;
  minDate?: Date;
  maxDate?: Date;
  disabled: boolean;
  autoFocus: boolean;
  focusRequest: FocusRequest;
};

function initialViewFocus(autoFocus: boolean, initialView: DatePickerView, anchor: Date): string | null {
  if (!autoFocus) return null;
  if (initialView === "months") return `[data-month-index="${anchor.getMonth()}"]`;
  if (initialView === "years") return `[data-year="${anchor.getFullYear()}"]`;
  return null;
}

/**
 * Owns the day/month/year view stack: the visible month, the roving focus date,
 * header navigation, and the bounds checks for every panel. Day selection stays
 * in the calendar because it also touches the range hover preview.
 */
export function useDatePickerNavigation({
  initialAnchor,
  initialView,
  minDate,
  maxDate,
  disabled,
  autoFocus,
  focusRequest,
}: UseDatePickerNavigationArgs) {
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(initialAnchor));
  const [focusedDate, setFocusedDate] = useState(initialAnchor);
  const [view, setView] = useState<DatePickerView>(initialView);
  const [yearPageStart, setYearPageStart] = useState(
    () => Math.floor(initialAnchor.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE,
  );
  const viewFocusSelector = useRef<string | null>(initialViewFocus(autoFocus, initialView, initialAnchor));

  const year = viewMonth.getFullYear();
  const minYear = minDate?.getFullYear();
  const maxYear = maxDate?.getFullYear();

  const canGoPreviousMonth = !disabled && (minDate === undefined || isAfterMonth(viewMonth, minDate));
  const canGoNextMonth = !disabled && (maxDate === undefined || isBeforeMonth(viewMonth, maxDate));
  const canGoPreviousYear = !disabled && (minYear === undefined || year > minYear);
  const canGoNextYear = !disabled && (maxYear === undefined || year < maxYear);
  const canGoPreviousYearPage = !disabled && (minYear === undefined || yearPageStart > minYear);
  const canGoNextYearPage = !disabled && (maxYear === undefined || yearPageStart + YEARS_PER_PAGE <= maxYear);

  const changeMonth = useCallback(
    (amount: number, focusGrid: boolean) => {
      const nextView = clampMonth(addMonths(viewMonth, amount), minDate, maxDate);
      if (isSameMonth(nextView, viewMonth)) return;

      setViewMonth(nextView);
      setFocusedDate(clampDay(addMonths(focusedDate, amount), minDate, maxDate));
      if (focusGrid) focusRequest.current = "keyboard";
    },
    [viewMonth, focusedDate, minDate, maxDate, focusRequest],
  );

  const changeYear = useCallback(
    (amount: number) => {
      const targetYear = year + amount;
      const day = Math.min(focusedDate.getDate(), daysInMonth(targetYear, viewMonth.getMonth()));
      const next = clampDay(new Date(targetYear, viewMonth.getMonth(), day), minDate, maxDate);
      setViewMonth(startOfMonth(next));
      setFocusedDate(next);
    },
    [year, focusedDate, viewMonth, minDate, maxDate],
  );

  const handlePrevious = useCallback(() => {
    if (view === "days") changeMonth(-1, false);
    else if (view === "months") changeYear(-1);
    else setYearPageStart((current) => current - YEARS_PER_PAGE);
  }, [view, changeMonth, changeYear]);

  const handleNext = useCallback(() => {
    if (view === "days") changeMonth(1, false);
    else if (view === "months") changeYear(1);
    else setYearPageStart((current) => current + YEARS_PER_PAGE);
  }, [view, changeMonth, changeYear]);

  const openMonths = useCallback(() => {
    viewFocusSelector.current = `[data-month-index="${viewMonth.getMonth()}"]`;
    setView("months");
  }, [viewMonth]);

  const openYears = useCallback(() => {
    setYearPageStart(Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE);
    viewFocusSelector.current = `[data-year="${year}"]`;
    setView("years");
  }, [year]);

  const selectMonth = useCallback(
    (month: number) => {
      const targetYear = viewMonth.getFullYear();
      const day = Math.min(focusedDate.getDate(), daysInMonth(targetYear, month));
      const next = clampDay(new Date(targetYear, month, day), minDate, maxDate);
      setViewMonth(startOfMonth(next));
      setFocusedDate(next);
      focusRequest.current = "keyboard";
      setView("days");
    },
    [viewMonth, focusedDate, minDate, maxDate, focusRequest],
  );

  const selectYear = useCallback(
    (targetYear: number) => {
      const month = viewMonth.getMonth();
      const day = Math.min(focusedDate.getDate(), daysInMonth(targetYear, month));
      const next = clampDay(new Date(targetYear, month, day), minDate, maxDate);
      setViewMonth(startOfMonth(next));
      setFocusedDate(next);
      viewFocusSelector.current = `[data-month-index="${next.getMonth()}"]`;
      setView("months");
    },
    [viewMonth, focusedDate, minDate, maxDate],
  );

  const isMonthDisabled = useCallback(
    (month: number): boolean => disabled || isMonthOutsideBounds(viewMonth.getFullYear(), month, minDate, maxDate),
    [disabled, viewMonth, minDate, maxDate],
  );

  const isYearDisabled = useCallback(
    (targetYear: number): boolean => disabled || isYearOutsideBounds(targetYear, minDate, maxDate),
    [disabled, minDate, maxDate],
  );

  let canGoPrevious = canGoPreviousMonth;
  let canGoNext = canGoNextMonth;
  if (view === "months") {
    canGoPrevious = canGoPreviousYear;
    canGoNext = canGoNextYear;
  } else if (view === "years") {
    canGoPrevious = canGoPreviousYearPage;
    canGoNext = canGoNextYearPage;
  }

  return {
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
  };
}
