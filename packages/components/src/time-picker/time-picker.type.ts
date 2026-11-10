import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { PopoverPosition } from "../popover/popover.type";

export type TimeFormat = "24h" | "12h";

export type TimePickerMode = "wheel" | "list" | "input";

export type TimePickerListAlign = "start" | "center" | "end";

export type TimePickerLocale = "en" | "id";

export type TimePickerOption = {
  /** Canonical `"HH:mm"` (24-hour). */
  value: string;
  label?: string;
  disabled?: boolean;
};

export type TimePickerLabels = {
  now: string;
  clear: string;
  hours: string;
  minutes: string;
  period: string;
  hoursShort: string;
  minutesShort: string;
  periodShort: string;
  am: string;
  pm: string;
  time: string;
};

export type TimePickerWheelLabelVariant = "full" | "short";

export type TimePickerProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onChange" | "value"
> & {
  /** `wheel` picks arbitrary hours/minutes; `list` shows provided or generated slots; `input` is a segmented HH:MM + AM/PM field. Default `"wheel"`. */
  mode?: TimePickerMode;
  /** List mode text alignment. `start` mirrors the List component; `end` aligns right; `center` centers every row. Default `"start"`. */
  listAlign?: TimePickerListAlign;
  /** Display and input format. Values are always canonical `"HH:mm"` (24-hour). Default `"24h"`. */
  format?: TimeFormat;
  locale?: TimePickerLocale;
  labels?: Partial<TimePickerLabels>;
  /** Options for `mode="list"`. Values are canonical `"HH:mm"`. */
  options?: TimePickerOption[];
  /** Shows the visible column headers above the wheel. Default `true`. */
  showWheelLabels?: boolean;
  /** Wheel header wording: full labels (`Hours`) or compact labels (`H`). Default `"full"`. */
  wheelLabelVariant?: TimePickerWheelLabelVariant;
  /** Minute increment: wheel default `1`, generated lists default `30`. `60` means hourly. */
  minuteStep?: number;
  /** Canonical `"HH:mm"` or `null`. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  /** Canonical hours (0–23) where every minute is unavailable. */
  disabledHours?: number[];
  /** Minutes unavailable for a canonical hour. */
  disabledMinutes?: (hour: number) => number[];
  /** Extra predicate for a canonical `"HH:mm"` value. */
  isTimeDisabled?: (value: string) => boolean;
  /** Renders the built-in Now/Clear actions. Default `true`. Ignored when `footer` is set. */
  showFooter?: boolean;
  footer?: ReactNode;
  /** Renders inside a Popover anchored to this trigger. Omit for inline. */
  trigger?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Closes the popover after a selection. Default `true` for `list`, `false` for `wheel`/`input`. */
  closeOnSelect?: boolean;
  /** Focuses the selected option when the panel opens. Default `true`. */
  autoFocusPanel?: boolean;
  position?: PopoverPosition;
  offset?: number;
  contentClassName?: string;
  className?: string;
  "aria-label"?: string;
};
