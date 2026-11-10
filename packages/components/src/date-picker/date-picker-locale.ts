import type {
  DatePickerLabels,
  DatePickerLocale,
  DatePickerWeekStartsOn,
} from "./date-picker.type";

const INTL_LOCALES: Record<DatePickerLocale, string> = {
  en: "en-US",
  id: "id-ID",
};

export const datePickerLabels: Record<DatePickerLocale, DatePickerLabels> = {
  en: {
    previousMonth: "Previous month",
    nextMonth: "Next month",
    previousYear: "Previous year",
    nextYear: "Next year",
    previousYears: "Previous years",
    nextYears: "Next years",
    today: "Today",
    clear: "Clear",
    calendar: "Calendar",
    holiday: "Holiday",
    holidays: "Holidays",
  },
  id: {
    previousMonth: "Bulan sebelumnya",
    nextMonth: "Bulan berikutnya",
    previousYear: "Tahun sebelumnya",
    nextYear: "Tahun berikutnya",
    previousYears: "Rentang tahun sebelumnya",
    nextYears: "Rentang tahun berikutnya",
    today: "Hari ini",
    clear: "Hapus",
    calendar: "Kalender",
    holiday: "Hari libur",
    holidays: "Hari libur",
  },
};

const monthFormatters: Record<DatePickerLocale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat(INTL_LOCALES.en, { month: "long" }),
  id: new Intl.DateTimeFormat(INTL_LOCALES.id, { month: "long" }),
};

const monthYearFormatters: Record<DatePickerLocale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat(INTL_LOCALES.en, { month: "long", year: "numeric" }),
  id: new Intl.DateTimeFormat(INTL_LOCALES.id, { month: "long", year: "numeric" }),
};

const weekdayFormatters: Record<DatePickerLocale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat(INTL_LOCALES.en, { weekday: "short" }),
  id: new Intl.DateTimeFormat(INTL_LOCALES.id, { weekday: "short" }),
};

const fullDateFormatters: Record<DatePickerLocale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat(INTL_LOCALES.en, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  id: new Intl.DateTimeFormat(INTL_LOCALES.id, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

const shortDateFormatters: Record<DatePickerLocale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat(INTL_LOCALES.en, { day: "numeric", month: "short" }),
  id: new Intl.DateTimeFormat(INTL_LOCALES.id, { day: "numeric", month: "short" }),
};

export function resolveDatePickerLabels(
  locale: DatePickerLocale,
  overrides?: Partial<DatePickerLabels>,
): DatePickerLabels {
  return { ...datePickerLabels[locale], ...overrides };
}

/** `id` starts the week on Monday; `en` on Sunday (US convention). */
export function resolveWeekStartsOn(
  locale: DatePickerLocale,
  weekStartsOn?: DatePickerWeekStartsOn,
): DatePickerWeekStartsOn {
  if (weekStartsOn !== undefined) return weekStartsOn;
  return locale === "id" ? 1 : 0;
}

export function formatMonthYear(date: Date, locale: DatePickerLocale): string {
  return monthYearFormatters[locale].format(date);
}

export function formatMonth(date: Date, locale: DatePickerLocale): string {
  return monthFormatters[locale].format(date);
}

export function formatWeekdayLabel(date: Date, locale: DatePickerLocale): string {
  return weekdayFormatters[locale].format(date);
}

export function formatFullDate(date: Date, locale: DatePickerLocale): string {
  return fullDateFormatters[locale].format(date);
}

export function formatShortDate(date: Date, locale: DatePickerLocale): string {
  return shortDateFormatters[locale].format(date);
}
