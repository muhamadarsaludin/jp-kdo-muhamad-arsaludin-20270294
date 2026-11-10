import type { DatePickerLocale } from "../date-picker/date-picker.type";
import { startOfDay } from "../date-picker/date-picker-utils";
import type { TimeFormat } from "../time-picker/time-picker.type";
import {
  formatTimeValue,
  normalizeTime,
  pad2,
  parseTime,
  parseTimeInput,
  toTimeString,
} from "../time-picker/time-picker-utils";
import type { DateTimeValue } from "./date-time-picker.type";

export const EMPTY_DATE_TIME: DateTimeValue = { date: null, time: null };

const DATE_TIME_INPUT = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2}|\d{4})(?:[,\s]+(.+))?$/;

export function normalizeDateTime(value: DateTimeValue | undefined | null): DateTimeValue {
  if (value === undefined || value === null) return EMPTY_DATE_TIME;

  return {
    date: value.date === null ? null : startOfDay(value.date),
    time: normalizeTime(value.time),
  };
}

/** Combines the two fields into a local `Date`. Returns `null` when no date is set. */
export function toDateTime(value: DateTimeValue): Date | null {
  if (value.date === null) return null;

  const parsed = parseTime(value.time);
  return new Date(
    value.date.getFullYear(),
    value.date.getMonth(),
    value.date.getDate(),
    parsed?.hours ?? 0,
    parsed?.minutes ?? 0,
  );
}

/** Splits a `Date` into a normalized local date and canonical `"HH:mm"` time. */
export function fromDateTime(date: Date | null): DateTimeValue {
  if (date === null) return EMPTY_DATE_TIME;

  return {
    date: startOfDay(date),
    time: toTimeString(date.getHours(), date.getMinutes()),
  };
}

/** Formats the pair for a trigger, for example `Oct 20, 2026, 14:30`. */
export function formatDateTimeValue(
  value: DateTimeValue,
  format: TimeFormat = "24h",
  locale: DatePickerLocale = "en",
): string {
  if (value.date === null) return "";

  const dateText = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(
    value.date,
  );
  const timeText = formatTimeValue(value.time, format);

  return timeText === "" ? dateText : `${dateText}, ${timeText}`;
}

/** Formats the pair for a numeric input trigger, for example `20/10/26, 14:30`. */
export function formatDateTimeInput(value: DateTimeValue, format: TimeFormat = "24h"): string {
  if (value.date === null) return "";

  const date = `${pad2(value.date.getDate())}/${pad2(value.date.getMonth() + 1)}/${pad2(value.date.getFullYear() % 100)}`;
  const time = formatTimeValue(value.time, format);

  return time === "" ? date : `${date}, ${time}`;
}

/**
 * Parses a numeric date-time input: `dd/mm/yy`, `dd/mm/yyyy`, `dd-mm-yy`, or
 * `dd.mm.yy`, followed by a comma or space and a 12/24-hour time. Time is
 * optional, so parsing a date alone keeps `time: null`.
 */
export function parseDateTimeInput(text: string): DateTimeValue | null {
  const match = DATE_TIME_INPUT.exec(text.trim());
  if (match === null) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const yearText = match[3];
  if (yearText === undefined) return null;
  const year = yearText.length === 2 ? 2000 + Number(yearText) : Number(yearText);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;

  const timeText = match[4]?.trim() ?? "";
  const time = timeText === "" ? null : parseTimeInput(timeText);
  if (timeText !== "" && time === null) return null;

  return { date, time };
}
