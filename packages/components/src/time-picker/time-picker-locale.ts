import type { TimePickerLabels, TimePickerLocale } from "./time-picker.type";

export const timePickerLabels: Record<TimePickerLocale, TimePickerLabels> = {
  en: {
    now: "Now",
    clear: "Clear",
    hours: "Hours",
    minutes: "Minutes",
    period: "AM/PM",
    hoursShort: "H",
    minutesShort: "M",
    periodShort: "AM/PM",
    am: "AM",
    pm: "PM",
    time: "Time",
  },
  id: {
    now: "Sekarang",
    clear: "Hapus",
    hours: "Jam",
    minutes: "Menit",
    period: "AM/PM",
    hoursShort: "J",
    minutesShort: "M",
    periodShort: "AM/PM",
    am: "AM",
    pm: "PM",
    time: "Waktu",
  },
};

export function resolveTimePickerLabels(
  locale: TimePickerLocale,
  overrides?: Partial<TimePickerLabels>,
): TimePickerLabels {
  return { ...timePickerLabels[locale], ...overrides };
}
