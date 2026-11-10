import type { DatePickerLocale } from "./date-picker.type";
import { formatMonth } from "./date-picker-locale";
import { monthYearButtonClass } from "./date-picker-styles";
import { YEARS_PER_PAGE } from "./date-picker-utils";

const MONTHS_PER_YEAR = 12;

const MONTHS = Array.from({ length: MONTHS_PER_YEAR }, (_, index) => index);

type DatePickerMonthGridProps = {
  year: number;
  activeMonth: number;
  locale: DatePickerLocale;
  isMonthDisabled: (month: number) => boolean;
  onSelect: (month: number) => void;
};

export function DatePickerMonthGrid({
  year,
  activeMonth,
  locale,
  isMonthDisabled,
  onSelect,
}: DatePickerMonthGridProps) {
  return (
    <div data-slot="month-grid" className="mt-1 grid h-64 grid-cols-3 grid-rows-4 gap-1 p-1">
      {MONTHS.map((month) => {
        const isActive = month === activeMonth;
        const isDisabled = isMonthDisabled(month);

        return (
          <button
            key={month}
            type="button"
            data-month-index={month}
            aria-pressed={isActive}
            disabled={isDisabled}
            onClick={() => onSelect(month)}
            className={monthYearButtonClass({ isActive, isDisabled })}
          >
            {formatMonth(new Date(year, month, 1), locale)}
          </button>
        );
      })}
    </div>
  );
}

type DatePickerYearGridProps = {
  pageStart: number;
  activeYear: number;
  isYearDisabled: (year: number) => boolean;
  onSelect: (year: number) => void;
};

export function DatePickerYearGrid({
  pageStart,
  activeYear,
  isYearDisabled,
  onSelect,
}: DatePickerYearGridProps) {
  const years = Array.from({ length: YEARS_PER_PAGE }, (_, index) => pageStart + index);

  return (
    <div data-slot="year-grid" className="mt-1 grid h-64 grid-cols-3 grid-rows-4 gap-1 p-1">
      {years.map((year) => {
        const isActive = year === activeYear;
        const isDisabled = isYearDisabled(year);

        return (
          <button
            key={year}
            type="button"
            data-year={year}
            aria-pressed={isActive}
            disabled={isDisabled}
            onClick={() => onSelect(year)}
            className={monthYearButtonClass({ isActive, isDisabled })}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}
