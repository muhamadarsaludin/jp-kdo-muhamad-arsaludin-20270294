import { cn } from "@kdo/utils";
import {
  type ComponentPropsWithoutRef,
  Fragment,
  forwardRef,
  type ReactNode,
  useState,
} from "react";

import { Button } from "../button/button";
import type {
  TimeFormat,
  TimePickerLabels,
  TimePickerListAlign,
  TimePickerMode,
  TimePickerOption,
  TimePickerWheelLabelVariant,
} from "./time-picker.type";
import { TimePickerInput } from "./time-picker-input";
import { TimeList } from "./time-picker-list";
import type { TimePickerColumnOption } from "./time-picker-option";
import {
  firstAllowedMinute,
  formatTimeValue,
  generateTimeOptions,
  getMinuteOptions,
  HOURS_12,
  HOURS_24,
  isHourAllowed,
  isTimeAllowed,
  nowTimeString,
  pad2,
  parseTime,
  type TimeConstraints,
  to12Hour,
  toCanonicalHour,
  toPeriod,
  toTimeString,
} from "./time-picker-utils";
import { TimeWheel } from "./time-picker-wheel";

type TimePickerPanelProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "defaultValue" | "onSelect"
> & {
  mode: TimePickerMode;
  listAlign?: TimePickerListAlign;
  showWheelLabels?: boolean;
  wheelLabelVariant?: TimePickerWheelLabelVariant;
  format: TimeFormat;
  labels: TimePickerLabels;
  options?: TimePickerOption[];
  minuteStep?: number;
  value: string | null;
  disabled: boolean;
  disabledHours?: number[];
  disabledMinutes?: (hour: number) => number[];
  isTimeDisabled?: (value: string) => boolean;
  showFooter: boolean;
  footer?: ReactNode;
  autoFocus: boolean;
  ariaLabel: string;
  onSelect: (value: string) => void;
  onClear: () => void;
  className?: string;
};

export const TimePickerPanel = forwardRef<HTMLDivElement, TimePickerPanelProps>(
  function TimePickerPanel(
    {
      mode,
      listAlign = "start",
      showWheelLabels = true,
      wheelLabelVariant = "full",
      format,
      labels,
      options,
      minuteStep,
      value,
      disabled,
      disabledHours,
      disabledMinutes,
      isTimeDisabled,
      showFooter,
      footer,
      autoFocus,
      ariaLabel,
      onSelect,
      onClear,
      className,
      ...props
    },
    ref,
  ) {
    const parsed = parseTime(value);
    const [periodOverride, setPeriodOverride] = useState<"AM" | "PM" | null>(null);
    const [now] = useState(() => nowTimeString());
    const constraints: TimeConstraints = {
      disabled,
      disabledHours,
      disabledMinutes,
      isTimeDisabled,
    };

    const period = parsed === null ? (periodOverride ?? "AM") : toPeriod(parsed.hours);
    const currentHour = parsed?.hours ?? (format === "12h" && period === "PM" ? 12 : 0);
    const currentMinute = parsed?.minutes ?? 0;

    let content: ReactNode;
    if (mode === "input") {
      content = (
        <TimePickerInput
          value={value}
          format={format}
          labels={labels}
          disabled={disabled}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          isTimeDisabled={isTimeDisabled}
          autoFocus={autoFocus}
          onSelect={onSelect}
        />
      );
    } else if (mode === "list") {
      const listOptions: TimePickerColumnOption[] = (
        options ?? generateTimeOptions(minuteStep)
      ).map((option) => {
        const normalized = formatTimeValue(option.value, "24h");
        return {
          key: normalized === "" ? option.value : normalized,
          label: option.label ?? formatTimeValue(option.value, format, labels),
          selected: parsed !== null && normalized === toTimeString(parsed.hours, parsed.minutes),
          disabled:
            option.disabled === true ||
            normalized === "" ||
            !isTimeAllowed(normalized, constraints),
        };
      });

      content = (
        <TimeList
          options={listOptions}
          ariaLabel={ariaLabel}
          align={listAlign}
          onSelect={onSelect}
          autoFocus={autoFocus}
        />
      );
    } else {
      const hourOptions: TimePickerColumnOption[] =
        format === "24h"
          ? HOURS_24.map((hour) => ({
              key: String(hour),
              label: pad2(hour),
              selected: parsed?.hours === hour,
              disabled: !isHourAllowed(hour, constraints, minuteStep),
            }))
          : HOURS_12.map((hour12) => {
              const hour = toCanonicalHour(hour12, period);
              return {
                key: String(hour),
                label: String(hour12),
                selected: parsed?.hours === hour,
                disabled: !isHourAllowed(hour, constraints, minuteStep),
              };
            });

      const minuteOptions: TimePickerColumnOption[] = getMinuteOptions(
        minuteStep,
        parsed?.minutes,
      ).map((minute) => ({
        key: String(minute),
        label: pad2(minute),
        selected: parsed?.minutes === minute,
        disabled: !isTimeAllowed(toTimeString(currentHour, minute), constraints),
      }));

      const periodOptions: TimePickerColumnOption[] = (["AM", "PM"] as const).map((candidate) => ({
        key: candidate,
        label: candidate === "AM" ? labels.am : labels.pm,
        selected: period === candidate,
        disabled: !HOURS_12.some((hour12) =>
          isHourAllowed(toCanonicalHour(hour12, candidate), constraints, minuteStep),
        ),
      }));

      const handleHour = (key: string) => {
        const hour = Number(key);
        const minute = firstAllowedMinute(hour, constraints, minuteStep, currentMinute);
        if (minute !== null) onSelect(toTimeString(hour, minute));
      };

      const handleMinute = (key: string) => onSelect(toTimeString(currentHour, Number(key)));

      const handlePeriod = (candidate: string) => {
        if (candidate !== "AM" && candidate !== "PM") return;
        setPeriodOverride(candidate);
        if (parsed === null) return;

        const hour = toCanonicalHour(to12Hour(parsed.hours), candidate);
        const minute = firstAllowedMinute(hour, constraints, minuteStep, parsed.minutes);
        if (minute !== null) onSelect(toTimeString(hour, minute));
      };

      const columns = [
        {
          key: "hours",
          label: labels.hours,
          options: hourOptions,
          valueKey: parsed === null ? null : String(parsed.hours),
          onSelect: handleHour,
        },
        {
          key: "minutes",
          label: labels.minutes,
          options: minuteOptions,
          valueKey: parsed === null ? null : String(parsed.minutes),
          onSelect: handleMinute,
        },
        ...(format === "12h"
          ? [
              {
                key: "period",
                label: labels.period,
                options: periodOptions,
                valueKey: period,
                onSelect: handlePeriod,
              },
            ]
          : []),
      ];

      const columnLabels =
        wheelLabelVariant === "short"
          ? { hours: labels.hoursShort, minutes: labels.minutesShort, period: labels.periodShort }
          : { hours: labels.hours, minutes: labels.minutes, period: labels.period };

      content = (
        <div>
          {showWheelLabels && (
            <div className="flex gap-1 pb-1">
              <div className="min-w-0 flex-1 text-center font-medium text-tertiary text-xs">
                {columnLabels.hours}
              </div>
              <div className="min-w-0 flex-1 text-center font-medium text-tertiary text-xs">
                {columnLabels.minutes}
              </div>
              {format === "12h" && (
                <div className="min-w-0 flex-1 text-center font-medium text-tertiary text-xs">
                  {columnLabels.period}
                </div>
              )}
            </div>
          )}
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 h-9 -translate-y-1/2 rounded-md bg-brand-muted-primary"
            />
            <div className="relative flex gap-1">
              {columns.map((column, index) => (
                <Fragment key={column.key}>
                  {index === 1 && (
                    <span
                      aria-hidden="true"
                      data-slot="time-separator"
                      className="relative z-2 flex w-3 shrink-0 items-center justify-center text-lg text-tertiary"
                    >
                      :
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <TimeWheel
                      options={column.options}
                      ariaLabel={column.label}
                      valueKey={column.valueKey}
                      onSelect={column.onSelect}
                      autoFocus={autoFocus && index === 0}
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const nowDisabled = !isTimeAllowed(now, constraints);
    let footerNode: ReactNode = null;
    if (footer !== undefined) {
      footerNode = footer;
    } else if (showFooter) {
      footerNode = (
        <div className="mt-1 flex items-center justify-between border-secondary border-t px-1 pt-2">
          <Button
            variant="text"
            color="brand"
            size="sm"
            disabled={nowDisabled}
            onClick={() => onSelect(now)}
          >
            {labels.now}
          </Button>
          <Button
            variant="text"
            color="neutral"
            size="sm"
            disabled={disabled || value === null}
            onClick={onClear}
          >
            {labels.clear}
          </Button>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="time-picker"
        className={cn("w-60 select-none bg-primary p-2 text-primary", className)}
        {...props}
      >
        {content}
        {footerNode}
      </div>
    );
  },
);

TimePickerPanel.displayName = "TimePickerPanel";
