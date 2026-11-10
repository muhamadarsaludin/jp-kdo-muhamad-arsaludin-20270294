import type {
  DatePickerHolidayInput,
  DatePickerPreset,
  DatePickerPresetValue,
  DatePickerRange,
} from "./date-picker.type";

export const YEARS_PER_PAGE = 12;

const MAX_WORKDAY_SCAN = 3660;

const NO_HOLIDAYS: ReadonlySet<string> = new Set();

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (a === null || a === undefined || b === null || b === undefined) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function addMonths(date: Date, amount: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  return new Date(
    target.getFullYear(),
    target.getMonth(),
    Math.min(date.getDate(), daysInMonth(target.getFullYear(), target.getMonth())),
  );
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function isAfterMonth(a: Date, b: Date): boolean {
  return startOfMonth(a).getTime() > startOfMonth(b).getTime();
}

export function isBeforeMonth(a: Date, b: Date): boolean {
  return startOfMonth(a).getTime() < startOfMonth(b).getTime();
}

export function isMonthOutsideBounds(year: number, month: number, minDate?: Date, maxDate?: Date): boolean {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month, daysInMonth(year, month));
  if (minDate !== undefined && isBeforeDay(monthEnd, minDate)) return true;
  return maxDate !== undefined && isAfterDay(monthStart, maxDate);
}

export function isYearOutsideBounds(year: number, minDate?: Date, maxDate?: Date): boolean {
  if (minDate !== undefined && year < minDate.getFullYear()) return true;
  return maxDate !== undefined && year > maxDate.getFullYear();
}

export function clampDay(date: Date, minDate?: Date, maxDate?: Date): Date {
  let result = startOfDay(date);
  if (minDate !== undefined && isBeforeDay(result, minDate)) result = startOfDay(minDate);
  if (maxDate !== undefined && isAfterDay(result, maxDate)) result = startOfDay(maxDate);
  return result;
}

export function clampMonth(date: Date, minDate?: Date, maxDate?: Date): Date {
  let result = startOfMonth(date);
  if (minDate !== undefined && isBeforeMonth(result, minDate)) result = startOfMonth(minDate);
  if (maxDate !== undefined && isAfterMonth(result, maxDate)) result = startOfMonth(maxDate);
  return result;
}

/** Returns the pair in calendar order so a range picked backwards still reads correctly. */
export function orderRange(a: Date, b: Date): [Date, Date] {
  return isAfterDay(a, b) ? [startOfDay(b), startOfDay(a)] : [startOfDay(a), startOfDay(b)];
}

export function isDayInRange(day: Date, start: Date | null, end: Date | null): boolean {
  if (start === null || end === null) return false;
  const time = startOfDay(day).getTime();
  return time >= startOfDay(start).getTime() && time <= startOfDay(end).getTime();
}

export function holidayDateKeys(holidays?: DatePickerHolidayInput[]): Set<string> {
  return new Set(
    (holidays ?? []).map((holiday) => dateKey(startOfDay(holiday instanceof Date ? holiday : holiday.date))),
  );
}

function isWorkday(date: Date, holidayKeys: ReadonlySet<string>): boolean {
  const weekday = date.getDay();
  return weekday !== 0 && weekday !== 6 && !holidayKeys.has(dateKey(date));
}

/**
 * Returns the date of the Nth working day on/after `start`, skipping weekends
 * and holidays. The scan is capped so a pathological holiday set cannot hang.
 */
export function addWorkdays(start: Date, count: number, holidayKeys: ReadonlySet<string> = NO_HOLIDAYS): Date | null {
  if (!Number.isFinite(count)) return null;

  let remaining = Math.max(Math.trunc(count), 1);
  let cursor = startOfDay(start);

  for (let scanned = 0; scanned < MAX_WORKDAY_SCAN; scanned += 1) {
    if (isWorkday(cursor, holidayKeys)) {
      remaining -= 1;
      if (remaining === 0) return cursor;
    }
    cursor = addDays(cursor, 1);
  }

  return null;
}

/** Resolves a range preset against an anchor date (the pending start, or today). */
export function resolvePresetValue(
  preset: DatePickerPreset,
  anchor: Date,
  holidayKeys: ReadonlySet<string> = NO_HOLIDAYS,
): DatePickerPresetValue {
  const value = typeof preset.value === "function" ? preset.value() : preset.value;
  if (value !== undefined) return value;

  if (preset.days !== undefined) {
    const start = startOfDay(anchor);
    return { start, end: addDays(start, Math.max(preset.days, 1) - 1) };
  }

  if (preset.months !== undefined) {
    const start = startOfDay(anchor);
    return { start, end: addDays(addMonths(start, Math.max(preset.months, 1)), -1) };
  }

  if (preset.workdays !== undefined) {
    const start = startOfDay(anchor);
    const end = addWorkdays(start, preset.workdays, holidayKeys);
    return end === null ? null : { start, end };
  }

  return null;
}

/**
 * Single-select presets are offsets from today: days: 7 is a week ahead and
 * days: 0 is today. Month presets follow the same rule.
 */
export function resolveSinglePresetValue(
  preset: DatePickerPreset,
  today: Date,
  holidayKeys: ReadonlySet<string> = NO_HOLIDAYS,
): Date | null {
  const value = typeof preset.value === "function" ? preset.value() : preset.value;
  if (value !== undefined) {
    if (value === null) return null;
    return value instanceof Date ? value : value.start;
  }

  if (preset.days !== undefined) {
    return addDays(startOfDay(today), Math.max(preset.days, 0));
  }

  if (preset.months !== undefined) {
    return addMonths(startOfDay(today), Math.max(preset.months, 0));
  }

  if (preset.workdays !== undefined) {
    return addWorkdays(startOfDay(today), preset.workdays, holidayKeys);
  }

  return null;
}

export function resolvePresetRange(
  preset: DatePickerPreset,
  anchor: Date,
  minDate?: Date,
  maxDate?: Date,
  holidayKeys: ReadonlySet<string> = NO_HOLIDAYS,
): DatePickerRange | null {
  const resolved = resolvePresetValue(preset, anchor, holidayKeys);
  if (resolved === null) return null;

  const raw = resolved instanceof Date ? { start: resolved, end: resolved } : resolved;
  const start = raw.start === null ? null : clampDay(raw.start, minDate, maxDate);
  const end = raw.end === null ? null : clampDay(raw.end, minDate, maxDate);

  if (start === null) return null;
  return end !== null && isAfterDay(start, end) ? { start: end, end: start } : { start, end };
}

export function resolveSinglePresetDate(
  preset: DatePickerPreset,
  today: Date,
  minDate?: Date,
  maxDate?: Date,
  holidayKeys: ReadonlySet<string> = NO_HOLIDAYS,
): Date | null {
  const resolved = resolveSinglePresetValue(preset, today, holidayKeys);
  return resolved === null ? null : clampDay(resolved, minDate, maxDate);
}

function sameOptionalDay(a: Date | null, b: Date | null): boolean {
  if (a === null || b === null) return a === b;
  return isSameDay(a, b);
}

/** First preset whose resolved range matches the current selection, else null. */
export function findActiveRangePreset(
  presets: DatePickerPreset[],
  range: DatePickerRange,
  today: Date,
  minDate?: Date,
  maxDate?: Date,
  holidayKeys: ReadonlySet<string> = NO_HOLIDAYS,
): number | null {
  const anchor = range.start ?? today;

  for (let index = 0; index < presets.length; index += 1) {
    const preset = presets[index];
    if (preset === undefined) continue;

    const resolved = resolvePresetRange(preset, anchor, minDate, maxDate, holidayKeys);
    if (resolved === null) continue;
    if (sameOptionalDay(resolved.start, range.start) && sameOptionalDay(resolved.end, range.end)) return index;
  }
  return null;
}

/** First preset whose resolved date matches the current selection, else null. */
export function findActiveSinglePreset(
  presets: DatePickerPreset[],
  date: Date | null,
  today: Date,
  minDate?: Date,
  maxDate?: Date,
  holidayKeys: ReadonlySet<string> = NO_HOLIDAYS,
): number | null {
  if (date === null) return null;

  for (let index = 0; index < presets.length; index += 1) {
    const preset = presets[index];
    if (preset === undefined) continue;

    const resolved = resolveSinglePresetDate(preset, today, minDate, maxDate, holidayKeys);
    if (resolved !== null && isSameDay(resolved, date)) return index;
  }
  return null;
}

export function startOfWeek(date: Date, weekStartsOn: number): Date {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

/**
 * Builds a fixed 6×7 grid. Always six rows so switching between a 28-day and a
 * 31-day month never changes the calendar's height.
 */
export function buildMonthGrid(month: Date, weekStartsOn: number): Date[][] {
  const gridStart = startOfWeek(startOfMonth(month), weekStartsOn);
  return Array.from({ length: 6 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => addDays(gridStart, week * 7 + day)),
  );
}

export function dateKey(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}
