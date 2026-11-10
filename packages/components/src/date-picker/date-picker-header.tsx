import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "../button/button";
import type { DatePickerLabels, DatePickerLocale, DatePickerView } from "./date-picker.type";
import { formatMonth } from "./date-picker-locale";
import { YEARS_PER_PAGE } from "./date-picker-utils";

type DatePickerHeaderProps = {
  view: DatePickerView;
  viewMonth: Date;
  yearPageStart: number;
  locale: DatePickerLocale;
  labels: DatePickerLabels;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onOpenMonths: () => void;
  onOpenYears: () => void;
};

export function DatePickerHeader({
  view,
  viewMonth,
  yearPageStart,
  locale,
  labels,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onOpenMonths,
  onOpenYears,
}: DatePickerHeaderProps) {
  const year = viewMonth.getFullYear();

  let title: ReactNode;
  if (view === "days") {
    title = (
      <>
        <Button variant="text" color="neutral" size="sm" onClick={onOpenMonths}>
          {formatMonth(viewMonth, locale)}
        </Button>
        <Button variant="text" color="neutral" size="sm" onClick={onOpenYears}>
          {year}
        </Button>
      </>
    );
  } else if (view === "months") {
    title = (
      <Button variant="text" color="neutral" size="sm" onClick={onOpenYears}>
        {year}
      </Button>
    );
  } else {
    title = (
      <span className="px-1.5 py-1 font-semibold text-primary text-sm">
        {yearPageStart} – {yearPageStart + YEARS_PER_PAGE - 1}
      </span>
    );
  }

  let previousLabel = labels.previousMonth;
  let nextLabel = labels.nextMonth;
  if (view === "months") {
    previousLabel = labels.previousYear;
    nextLabel = labels.nextYear;
  } else if (view === "years") {
    previousLabel = labels.previousYears;
    nextLabel = labels.nextYears;
  }

  return (
    <div data-slot="date-picker-header" className="flex items-center justify-between gap-1">
      <Button.Icon
        aria-label={previousLabel}
        disabled={!canGoPrevious}
        onClick={onPrevious}
        variant="text"
        color="neutral"
        size="sm"
      >
        <ChevronLeft aria-hidden="true" />
      </Button.Icon>
      <div
        aria-live="polite"
        className="flex min-w-0 flex-1 items-center justify-center whitespace-nowrap"
      >
        {title}
      </div>
      <Button.Icon
        aria-label={nextLabel}
        disabled={!canGoNext}
        onClick={onNext}
        variant="text"
        color="neutral"
        size="sm"
      >
        <ChevronRight aria-hidden="true" />
      </Button.Icon>
    </div>
  );
}
