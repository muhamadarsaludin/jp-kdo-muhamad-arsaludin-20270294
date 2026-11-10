import { cn } from "@kdo/utils";
import { ChevronDown } from "lucide-react";
import { useId } from "react";

import type { DatePickerLabels, DatePickerLocale } from "./date-picker.type";
import { formatShortDate } from "./date-picker-locale";
import { dateKey } from "./date-picker-utils";

type DatePickerHolidayListProps = {
  items: Array<{ date: Date; label: string }>;
  locale: DatePickerLocale;
  labels: DatePickerLabels;
  open: boolean;
  onToggle: () => void;
};

export function DatePickerHolidayList({
  items,
  locale,
  labels,
  open,
  onToggle,
}: DatePickerHolidayListProps) {
  const listId = useId();

  return (
    <div data-slot="holiday-list" className="mt-1 border-secondary border-t px-1.5 pt-2 pb-1">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-1 rounded-md px-1 py-0.5 font-medium text-primary text-xs transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-brand-primary"
      >
        {labels.holidays}
        <span className="font-normal text-tertiary">({items.length})</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3.5 text-tertiary transition-transform", open && "rotate-180")}
        />
      </button>

      <ul id={listId} hidden={!open} className="mt-1 space-y-1">
        {items.map(({ date, label }) => (
          <li key={dateKey(date)} className="flex items-start gap-1.5 text-tertiary text-xs">
            <span
              data-slot="holiday-bullet"
              aria-hidden="true"
              className="mt-px text-error-primary"
            >
              •
            </span>
            <span className="shrink-0 font-medium text-primary">
              {formatShortDate(date, locale)}
            </span>
            <span className="min-w-0 flex-1">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
