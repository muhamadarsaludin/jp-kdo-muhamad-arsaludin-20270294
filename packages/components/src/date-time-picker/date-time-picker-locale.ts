import type { DatePickerLocale } from "../date-picker/date-picker.type";
import type { DateTimePickerLabels } from "./date-time-picker.type";

export const dateTimePickerLabels: Record<DatePickerLocale, DateTimePickerLabels> = {
  en: { dateTime: "Date and time" },
  id: { dateTime: "Tanggal dan waktu" },
};

export function resolveDateTimePickerLabels(
  locale: DatePickerLocale,
  overrides?: Partial<DateTimePickerLabels>,
): DateTimePickerLabels {
  return { ...dateTimePickerLabels[locale], ...overrides };
}
