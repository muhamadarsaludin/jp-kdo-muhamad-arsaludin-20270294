import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type {
  DatePickerHolidayInput,
  DatePickerLabels,
  DatePickerLocale,
  DatePickerWeekStartsOn,
} from "../date-picker/date-picker.type";
import type { PopoverPosition } from "../popover/popover.type";
import type {
  TimeFormat,
  TimePickerLabels,
  TimePickerListAlign,
  TimePickerMode,
  TimePickerOption,
  TimePickerWheelLabelVariant,
} from "../time-picker/time-picker.type";

/** A date and an independent canonical `"HH:mm"` time. */
export type DateTimeValue = {
  date: Date | null;
  time: string | null;
};

export type DateTimePickerLabels = {
  /** Accessible name for the combined panel when it opens in a popover. */
  dateTime: string;
};

export type DateTimePickerProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange" | "value"
> & {
  value?: DateTimeValue;
  defaultValue?: DateTimeValue;
  onValueChange?: (value: DateTimeValue) => void;
  /** UI language for both panels and the `Intl` date formatting. Default `"en"`. */
  locale?: DatePickerLocale;
  /** Overrides for the calendar strings. */
  dateLabels?: Partial<DatePickerLabels>;
  /** Overrides for the time panel strings and footer actions. */
  timeLabels?: Partial<TimePickerLabels>;
  labels?: Partial<DateTimePickerLabels>;
  /** First day of the week (`0` = Sunday). Defaults to Monday for `id`, Sunday for `en`. */
  weekStartsOn?: DatePickerWeekStartsOn;
  /** Earliest selectable date and time. Dates are bounded per day; times on the boundary day are filtered. */
  minDateTime?: Date;
  /** Latest selectable date and time. Dates are bounded per day; times on the boundary day are filtered. */
  maxDateTime?: Date;
  /** Marks whole days unavailable (closed days, blackout dates). */
  isDateDisabled?: (date: Date) => boolean;
  /** Specific days that cannot be selected. */
  disabledDates?: Date[];
  /** Holidays rendered in the error color inside the calendar. */
  holidays?: DatePickerHolidayInput[];
  /**
   * Filters the time panel for the selected date. When set, the time panel always
   * renders as a list, so returned slots can depend on the date (for example
   * booked or available appointment times).
   */
  timeOptions?: (date: Date | null) => TimePickerOption[];
  /** Time panel mode. Ignored when `timeOptions` is set because slots use the list. Default `"wheel"`. */
  timeMode?: TimePickerMode;
  /** List mode text alignment. Default `"start"`. */
  listAlign?: TimePickerListAlign;
  /** Display and input format. Values stay canonical 24-hour strings. Default `"24h"`. */
  format?: TimeFormat;
  /** Minute increment for the wheel and generated lists. */
  minuteStep?: number;
  /** Shows the wheel column headers. Default `true`. */
  showWheelLabels?: boolean;
  /** Wheel header wording: full labels (`Hours`) or compact labels (`H`). Default `"full"`. */
  wheelLabelVariant?: TimePickerWheelLabelVariant;
  /** Extra predicate for a canonical `"HH:mm"` value on the selected date. */
  isTimeDisabled?: (value: string, date: Date | null) => boolean;
  disabled?: boolean;
  /** Renders the combined Now/Clear actions. Default `true`. Ignored when `footer` is set. */
  showFooter?: boolean;
  /** Replaces the combined footer. */
  footer?: ReactNode;
  /** Reference date and time for the Now action and the calendar's today marker. Defaults to the current local date and time. */
  today?: Date;
  /** Renders inside a `Popover` anchored to this trigger. Omit for inline. */
  trigger?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Closes the popover once both a date and a time are selected. Default `true`. */
  closeOnSelect?: boolean;
  /** Focuses the calendar (or the selected time) when the popover opens. Default `true`. */
  autoFocusPanel?: boolean;
  position?: PopoverPosition;
  offset?: number;
  contentClassName?: string;
  /** Extra classes for the trigger wrapper in popover mode. */
  triggerClassName?: string;
  className?: string;
  "aria-label"?: string;
};
