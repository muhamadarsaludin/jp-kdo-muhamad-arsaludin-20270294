// biome-ignore-all lint/a11y/noNoninteractiveElementToInteractiveRole: the calendar table follows the ARIA grid pattern for roving day focus.
// biome-ignore-all lint/a11y/useFocusableInteractive: grid cells delegate focus to the day buttons they contain.
import { forwardRef, type KeyboardEvent as ReactKeyboardEvent } from "react";

import type { DatePickerLabels, DatePickerLocale, DatePickerMode, DatePickerRange } from "./date-picker.type";
import { formatFullDate, formatWeekdayLabel } from "./date-picker-locale";
import { type DayRounding, dayButtonClass } from "./date-picker-styles";
import {
  addDays,
  buildMonthGrid,
  dateKey,
  isDayInRange,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "./date-picker-utils";

type DatePickerDayGridProps = {
  mode: DatePickerMode;
  selection: DatePickerRange;
  viewMonth: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  pendingStart: boolean;
  previewBeforeStart: boolean;
  previewAfterStart: boolean;
  weekStartsOn: number;
  locale: DatePickerLocale;
  labels: DatePickerLabels;
  today: Date;
  holidayKeys: ReadonlySet<string>;
  focusedDate: Date;
  isDayDisabled: (day: Date) => boolean;
  ariaLabel: string;
  onSelectDate: (day: Date) => void;
  onFocusedDateChange: (day: Date) => void;
  onHoverDateChange: (day: Date | null) => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLTableElement>) => void;
};

export const DatePickerDayGrid = forwardRef<HTMLTableElement, DatePickerDayGridProps>(function DatePickerDayGrid(
  {
    mode,
    selection,
    viewMonth,
    rangeStart,
    rangeEnd,
    pendingStart,
    previewBeforeStart,
    previewAfterStart,
    weekStartsOn,
    locale,
    labels,
    today,
    holidayKeys,
    focusedDate,
    isDayDisabled,
    ariaLabel,
    onSelectDate,
    onFocusedDateChange,
    onHoverDateChange,
    onKeyDown,
  },
  ref,
) {
  const weeks = buildMonthGrid(viewMonth, weekStartsOn);
  const gridStart = startOfWeek(startOfMonth(viewMonth), weekStartsOn);
  const weekdayBase = new Date(2024, 0, 7);
  const weekdayDates = Array.from({ length: 7 }, (_, index) => addDays(weekdayBase, weekStartsOn + index));

  return (
    <div className="mt-1 h-64">
      <table
        role="grid"
        ref={ref}
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        onMouseLeave={() => onHoverDateChange(null)}
        className="w-full table-fixed border-collapse"
      >
        <thead>
          <tr>
            {weekdayDates.map((date) => (
              <th key={dateKey(date)} scope="col" className="h-8 font-medium text-tertiary text-xs">
                {formatWeekdayLabel(date, locale)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={dateKey(addDays(gridStart, weekIndex * 7))}>
              {week.map((day) => {
                const isRangeStart = isSameDay(day, selection.start);
                const isRangeEnd = isSameDay(day, selection.end);
                const isSelected = isRangeStart || isRangeEnd;
                const isInRange = isDayInRange(day, rangeStart, rangeEnd);
                const isToday = isSameDay(day, today);
                const isHoliday = holidayKeys.has(dateKey(day));
                const dayDisabled = isDayDisabled(day);
                const isOutsideMonth = !isSameMonth(day, viewMonth);

                let rounding: DayRounding = "none";
                if (isSelected) {
                  if (mode === "single" || (isRangeStart && isRangeEnd)) rounding = "all";
                  else if (isRangeStart) {
                    if (!pendingStart) rounding = "start";
                    else if (previewBeforeStart) rounding = "end";
                    else if (previewAfterStart) rounding = "start";
                    else rounding = "all";
                  } else if (isRangeEnd) {
                    rounding = selection.start === null ? "all" : "end";
                  } else {
                    rounding = "all";
                  }
                } else if (isInRange && previewAfterStart && isSameDay(day, rangeEnd)) {
                  rounding = "end";
                } else if (isInRange && previewBeforeStart && isSameDay(day, rangeStart)) {
                  rounding = "start";
                }

                return (
                  <td key={dateKey(day)} role="gridcell" aria-selected={isSelected} className="p-0">
                    <button
                      type="button"
                      data-date={dateKey(day)}
                      data-today={isToday || undefined}
                      data-in-range={isInRange || undefined}
                      data-holiday={isHoliday || undefined}
                      aria-current={isToday ? "date" : undefined}
                      aria-disabled={dayDisabled || undefined}
                      aria-label={`${formatFullDate(day, locale)}${isHoliday ? `, ${labels.holiday}` : ""}`}
                      tabIndex={isSameDay(day, focusedDate) ? 0 : -1}
                      onClick={() => onSelectDate(day)}
                      onFocus={() => onFocusedDateChange(day)}
                      onMouseEnter={() => {
                        onHoverDateChange(dayDisabled ? null : day);
                      }}
                      className={dayButtonClass({
                        rounding,
                        isSelected,
                        isInRange,
                        isOutsideMonth,
                        isToday,
                        isHighlighted: day.getDay() === 0 || isHoliday,
                        isDisabled: dayDisabled,
                      })}
                    >
                      {day.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

DatePickerDayGrid.displayName = "DatePickerDayGrid";
