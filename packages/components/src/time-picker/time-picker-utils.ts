import type { TimeFormat, TimePickerLabels, TimePickerOption } from "./time-picker.type";

export type ParsedTime = {
  hours: number;
  minutes: number;
};

export type TimeConstraints = {
  disabled?: boolean;
  disabledHours?: number[];
  disabledMinutes?: (hour: number) => number[];
  isTimeDisabled?: (value: string) => boolean;
};

const TIME_24 = /^(\d{1,2}):(\d{2})$/;
const TIME_12 = /^(\d{1,2}):(\d{2})\s*([AaPp])\.?[Mm]\.?$/;

export const HOURS_24 = Array.from({ length: 24 }, (_, index) => index);
export const HOURS_12 = Array.from({ length: 12 }, (_, index) => index + 1);

export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function toTimeString(hours: number, minutes: number): string {
  return `${pad2(hours)}:${pad2(minutes)}`;
}

export function parseTime(value: string | null | undefined): ParsedTime | null {
  if (value === null || value === undefined) return null;

  const match = TIME_24.exec(value.trim());
  if (match === null) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;

  return { hours, minutes };
}

export function normalizeTime(value: string | null | undefined): string | null {
  const parsed = parseTime(value);
  return parsed === null ? null : toTimeString(parsed.hours, parsed.minutes);
}

export function formatTimeValue(
  value: string | null | undefined,
  format: TimeFormat,
  labels?: Pick<TimePickerLabels, "am" | "pm">,
): string {
  const parsed = parseTime(value);
  if (parsed === null) return "";

  if (format === "24h") return toTimeString(parsed.hours, parsed.minutes);

  const hour = parsed.hours % 12 || 12;
  const period = parsed.hours < 12 ? (labels?.am ?? "AM") : (labels?.pm ?? "PM");
  return `${hour}:${pad2(parsed.minutes)} ${period}`;
}

/** Accepts canonical 24-hour input and 12-hour input with an AM/PM suffix. */
export function parseTimeInput(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed === "") return null;

  const match24 = TIME_24.exec(trimmed);
  if (match24 !== null) {
    const hours = Number(match24[1]);
    const minutes = Number(match24[2]);
    if (hours > 23 || minutes > 59) return null;
    return toTimeString(hours, minutes);
  }

  const match12 = TIME_12.exec(trimmed);
  if (match12 === null) return null;

  const hour12 = Number(match12[1]);
  const minutes = Number(match12[2]);
  if (hour12 < 1 || hour12 > 12 || minutes > 59) return null;

  const isPm = match12[3]?.toLowerCase() === "p";
  const hours = (hour12 % 12) + (isPm ? 12 : 0);
  return toTimeString(hours, minutes);
}

export function sanitizeMinuteStep(step: number | undefined): number {
  if (step === undefined || !Number.isFinite(step)) return 1;
  return Math.min(Math.max(Math.trunc(step), 1), 60);
}

export function getMinuteOptions(step: number | undefined, currentMinute?: number): number[] {
  const safeStep = sanitizeMinuteStep(step);
  const minutes: number[] = [];
  for (let minute = 0; minute < 60; minute += safeStep) minutes.push(minute);
  if (currentMinute !== undefined && !minutes.includes(currentMinute)) minutes.push(currentMinute);
  return [...new Set(minutes)].sort((a, b) => a - b);
}

/** Generates every hour at the given minute step (default 30 for generated lists). */
export function generateTimeOptions(step: number | undefined, defaultStep = 30): TimePickerOption[] {
  const safeStep = sanitizeMinuteStep(step ?? defaultStep);
  const options: TimePickerOption[] = [];

  for (let hour = 0; hour < 24; hour += 1) {
    for (let minute = 0; minute < 60; minute += safeStep) {
      options.push({ value: toTimeString(hour, minute) });
    }
  }

  return options;
}

export function toCanonicalHour(hour12: number, period: "AM" | "PM"): number {
  const base = hour12 % 12;
  return period === "PM" ? base + 12 : base;
}

export function to12Hour(hours: number): number {
  return hours % 12 || 12;
}

export function toPeriod(hours: number): "AM" | "PM" {
  return hours < 12 ? "AM" : "PM";
}

export function isTimeAllowed(value: string, constraints: TimeConstraints): boolean {
  if (constraints.disabled === true) return false;

  const parsed = parseTime(value);
  if (parsed === null) return false;
  if (constraints.disabledHours?.includes(parsed.hours) === true) return false;
  if (constraints.disabledMinutes?.(parsed.hours)?.includes(parsed.minutes) === true) return false;
  if (constraints.isTimeDisabled?.(value) === true) return false;

  return true;
}

export function isHourAllowed(hour: number, constraints: TimeConstraints, step: number | undefined): boolean {
  if (constraints.disabled === true) return false;
  if (constraints.disabledHours?.includes(hour) === true) return false;

  return getMinuteOptions(step).some((minute) => isTimeAllowed(toTimeString(hour, minute), constraints));
}

export function firstAllowedMinute(
  hour: number,
  constraints: TimeConstraints,
  step: number | undefined,
  preferred?: number,
): number | null {
  if (preferred !== undefined && isTimeAllowed(toTimeString(hour, preferred), constraints)) return preferred;

  for (const minute of getMinuteOptions(step)) {
    if (isTimeAllowed(toTimeString(hour, minute), constraints)) return minute;
  }
  return null;
}

export function nowTimeString(): string {
  const now = new Date();
  return toTimeString(now.getHours(), now.getMinutes());
}
