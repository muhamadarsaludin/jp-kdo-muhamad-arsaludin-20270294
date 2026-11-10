import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { PopoverPosition } from "../popover/popover.type";

export type DatePickerLocale = "en" | "id";

export type DatePickerMode = "single" | "range";

export type DatePickerView = "days" | "months" | "years";

export type DatePickerWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Selected range. `end` stays `null` while the second endpoint is pending. */
export type DatePickerRange = {
  start: Date | null;
  end: Date | null;
};

/** A holiday date with an optional note shown under the calendar. */
export type DatePickerHoliday = {
  date: Date;
  label?: string;
};

export type DatePickerHolidayInput = Date | DatePickerHoliday;

export type DatePickerPresetValue = Date | DatePickerRange | null;

export type DatePickerPresetLayout = "wrap" | "scroll";

/** Quick-range chip rendered below the calendar (Today, 3 days, 1 month, …). */
export type DatePickerPreset = {
  label: string;
  /** Range: window length in days from `today` (1 = today only). Single: days ahead from today (0 = today, 7 = a week ahead). */
  days?: number;
  /** Range: window length in months from `today`, ending the day before the same date N months later (12 = one year). Single: months ahead from today. */
  months?: number;
  /** Number of working days; skips Saturday/Sunday and dates in `holidays`. Range starts at the anchor, single returns the Nth working day from today. */
  workdays?: number;
  /** Fixed value, or a resolver evaluated when the chip is clicked. Keep resolvers pure; they are also evaluated to detect the active chip. */
  value?: DatePickerPresetValue | (() => DatePickerPresetValue);
};

export type DatePickerLabels = {
  previousMonth: string;
  nextMonth: string;
  previousYear: string;
  nextYear: string;
  previousYears: string;
  nextYears: string;
  today: string;
  clear: string;
  calendar: string;
  holiday: string;
  holidays: string;
};

export type DatePickerBaseProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange" | "value"
> & {
  /** UI language and `Intl` formatting locale. Default `"en"`. */
  locale?: DatePickerLocale;
  /** Overrides any of the locale's built-in strings. */
  labels?: Partial<DatePickerLabels>;
  /** First day of the week (`0` = Sunday). Defaults to Monday for `id`, Sunday for `en`. */
  weekStartsOn?: DatePickerWeekStartsOn;
  minDate?: Date;
  maxDate?: Date;
  /** Reference date for the "today" marker and footer action. Defaults to the current date; pass a fixed date for deterministic previews or server-driven clocks. */
  today?: Date;
  /** Marks individual days unavailable on top of `minDate`/`maxDate` (closed days, blackout dates). */
  isDateDisabled?: (date: Date) => boolean;
  /** Specific days that cannot be selected, e.g. booked or closed dates. */
  disabledDates?: Date[];
  /** Holidays rendered in the error color; pass `{ date, label }` to list the note under the calendar. */
  holidays?: DatePickerHolidayInput[];
  /** Quick-range chips rendered below the calendar. The active chip is derived from the current value. */
  presets?: DatePickerPreset[];
  /** Preset chip layout: `wrap` stacks rows, `scroll` keeps one horizontal row. Default `"wrap"`. */
  presetLayout?: DatePickerPresetLayout;
  /** Content rendered between the month/year header and the calendar grid (banner, note, price summary, …). */
  calendarSlot?: ReactNode;
  /** Controlled open state for the holiday notes section. */
  holidayListOpen?: boolean;
  /** Initial open state for the holiday notes section. Default `true`. */
  defaultHolidayListOpen?: boolean;
  onHolidayListOpenChange?: (open: boolean) => void;
  /** Panel shown on first render. Default `"days"`. */
  initialView?: DatePickerView;
  disabled?: boolean;
  /** Renders the Today/Clear actions. Default `true`. Ignored when `footer` is set. */
  showFooter?: boolean;
  /** Replaces the built-in footer. Pass `null` to remove it while keeping `showFooter` untouched. */
  footer?: ReactNode;
  /**
   * When provided, the calendar renders inside a `Popover` anchored to this
   * trigger. Omit it to render the calendar inline wherever `DatePicker` sits.
   */
  trigger?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Closes the popover after a complete selection (single date, or both range endpoints). Default `true`. */
  closeOnSelect?: boolean;
  /** Focuses the calendar when the popover opens. Default `true`; set `false` for editable input triggers so typing keeps focus. */
  autoFocusCalendar?: boolean;
  position?: PopoverPosition;
  offset?: number;
  /** Extra classes for the popover tray (popover mode only). */
  contentClassName?: string;
  /** Extra classes for the calendar panel. */
  className?: string;
  "aria-label"?: string;
};

export type DatePickerSingleProps = DatePickerBaseProps & {
  mode?: "single";
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
};

export type DatePickerRangeProps = DatePickerBaseProps & {
  mode: "range";
  value?: DatePickerRange;
  defaultValue?: DatePickerRange;
  onValueChange?: (value: DatePickerRange) => void;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;
