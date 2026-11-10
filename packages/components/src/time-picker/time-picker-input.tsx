import { cn } from "@kdo/utils";
import {
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type { TimeFormat, TimePickerLabels } from "./time-picker.type";
import {
  isTimeAllowed,
  pad2,
  parseTime,
  type TimeConstraints,
  to12Hour,
  toCanonicalHour,
  toPeriod,
  toTimeString,
} from "./time-picker-utils";

type TimePickerInputProps = {
  value: string | null;
  format: TimeFormat;
  labels: TimePickerLabels;
  disabled: boolean;
  disabledHours?: number[];
  disabledMinutes?: (hour: number) => number[];
  isTimeDisabled?: (value: string) => boolean;
  autoFocus: boolean;
  onSelect: (value: string) => void;
};

type Period = "AM" | "PM";

const fieldClass =
  "h-11 w-14 rounded-lg bg-primary text-center text-lg text-primary tabular-nums outline-1 -outline-offset-1 outline-primary placeholder:text-placeholder focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50 disabled:cursor-not-allowed disabled:opacity-50";

export function TimePickerInput({
  value,
  format,
  labels,
  disabled,
  disabledHours,
  disabledMinutes,
  isTimeDisabled,
  autoFocus,
  onSelect,
}: TimePickerInputProps) {
  const parsed = parseTime(value);
  const [draftHour, setDraftHour] = useState<string | null>(null);
  const [draftMinute, setDraftMinute] = useState<string | null>(null);
  const [draftPeriod, setDraftPeriod] = useState<Period | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLInputElement | null>(null);
  const minuteRef = useRef<HTMLInputElement | null>(null);
  const periodRefs = useRef<Record<Period, HTMLButtonElement | null>>({ AM: null, PM: null });
  const didAutoFocus = useRef(false);
  const constraints: TimeConstraints = { disabled, disabledHours, disabledMinutes, isTimeDisabled };

  let derivedHour = "";
  if (parsed !== null) {
    derivedHour = format === "12h" ? String(to12Hour(parsed.hours)) : pad2(parsed.hours);
  }
  const derivedMinute = parsed === null ? "" : pad2(parsed.minutes);
  const derivedPeriod = parsed === null ? "AM" : toPeriod(parsed.hours);
  const hourText = draftHour ?? derivedHour;
  const minuteText = draftMinute ?? derivedMinute;
  const period = draftPeriod ?? derivedPeriod;
  const defaultHourText = format === "12h" ? "12" : "0";
  const defaultHourLabel = format === "12h" ? 12 : 0;

  const handleBlur = (event: ReactFocusEvent<HTMLInputElement>) => {
    if (groupRef.current?.contains(event.relatedTarget as Node | null) === true) return;
    clearDrafts();
  };

  useEffect(() => {
    if (!autoFocus || didAutoFocus.current) return;
    didAutoFocus.current = true;
    hourRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const buildTime = (
    nextHourText: string,
    nextMinuteText: string,
    nextPeriod: Period,
  ): { value: string; hours: number; minutes: number } | null => {
    if (!/^\d{1,2}$/.test(nextHourText) || !/^\d{1,2}$/.test(nextMinuteText)) return null;

    const hour = Number(nextHourText);
    const minute = Number(nextMinuteText);
    if (minute > 59) return null;

    let canonicalHour: number;
    if (format === "12h") {
      if (hour < 1 || hour > 12) return null;
      canonicalHour = toCanonicalHour(hour, nextPeriod);
    } else {
      if (hour > 23) return null;
      canonicalHour = hour;
    }

    const canonical = toTimeString(canonicalHour, minute);
    if (!isTimeAllowed(canonical, constraints)) return null;
    return { value: canonical, hours: canonicalHour, minutes: minute };
  };

  const clearDrafts = () => {
    setDraftHour(null);
    setDraftMinute(null);
    setDraftPeriod(null);
  };

  const commit = (nextHourText: string, nextMinuteText: string, nextPeriod: Period): boolean => {
    const result = buildTime(nextHourText, nextMinuteText, nextPeriod);
    if (result === null) return false;
    if (result.value !== value) onSelect(result.value);
    return true;
  };

  const applyResult = (result: { value: string; hours: number; minutes: number }) => {
    setDraftHour(format === "12h" ? String(to12Hour(result.hours)) : pad2(result.hours));
    setDraftMinute(pad2(result.minutes));
    setDraftPeriod(toPeriod(result.hours));
    if (result.value !== value) onSelect(result.value);
  };

  const nudge = (part: "hour" | "minute", delta: 1 | -1) => {
    const minute = minuteText === "" ? 0 : Number(minuteText);
    const hourLabel = hourText === "" ? defaultHourLabel : Number(hourText);

    if (part === "hour") {
      const size = format === "12h" ? 12 : 24;
      for (let step = 1; step <= size; step += 1) {
        let candidate = (hourLabel + delta * step + size) % size;
        if (format === "12h") candidate = ((hourLabel - 1 + delta * step + size) % size) + 1;
        const result = buildTime(String(candidate), String(minute), period);
        if (result !== null) {
          applyResult(result);
          return;
        }
      }
      return;
    }

    for (let step = 1; step <= 60; step += 1) {
      const candidate = (minute + delta * step + 60) % 60;
      const result = buildTime(
        hourText === "" ? defaultHourText : hourText,
        String(candidate),
        period,
      );
      if (result !== null) {
        applyResult(result);
        return;
      }
    }
  };

  const handleHourChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 2);
    setDraftHour(digits);
    commit(digits, minuteText === "" ? "0" : minuteText, period);
    if (digits.length === 2) minuteRef.current?.focus();
  };

  const handleMinuteChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 2);
    setDraftMinute(digits);
    commit(hourText === "" ? defaultHourText : hourText, digits, period);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>, part: "hour" | "minute") => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      nudge(part, event.key === "ArrowUp" ? 1 : -1);
      return;
    }

    if (event.key !== "Enter") return;
    event.preventDefault();
    const valid = commit(hourText, minuteText, period);
    if (valid) clearDrafts();
  };

  const handlePeriod = (nextPeriod: Period) => {
    setDraftPeriod(nextPeriod);
    if (hourText === "" || minuteText === "") return;
    commit(hourText, minuteText, nextPeriod);
  };

  const handlePeriodKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, candidate: Period) => {
    const isNext = event.key === "ArrowDown" || event.key === "ArrowRight";
    const isPrevious = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!isNext && !isPrevious) return;

    event.preventDefault();
    const nextPeriod: Period = candidate === "AM" ? "PM" : "AM";
    handlePeriod(nextPeriod);
    periodRefs.current[nextPeriod]?.focus();
  };

  return (
    <div
      ref={groupRef}
      data-slot="time-input"
      className="flex items-center justify-center gap-1.5 py-3"
    >
      <input
        ref={hourRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={2}
        aria-label={labels.hours}
        placeholder="HH"
        disabled={disabled}
        value={hourText}
        onChange={(event) => handleHourChange(event.target.value)}
        onFocus={(event) => event.currentTarget.select()}
        onBlur={handleBlur}
        onKeyDown={(event) => handleKeyDown(event, "hour")}
        className={fieldClass}
      />
      <span aria-hidden="true" className="text-lg text-tertiary">
        :
      </span>
      <input
        ref={minuteRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={2}
        aria-label={labels.minutes}
        placeholder="MM"
        disabled={disabled}
        value={minuteText}
        onChange={(event) => handleMinuteChange(event.target.value)}
        onFocus={(event) => event.currentTarget.select()}
        onBlur={handleBlur}
        onKeyDown={(event) => handleKeyDown(event, "minute")}
        className={fieldClass}
      />
      {format === "12h" && (
        <fieldset className="ml-1 min-w-10 shrink-0 border-0 p-0">
          <legend className="sr-only">{labels.period}</legend>
          <div className="flex h-11 flex-col overflow-hidden rounded-lg outline-1 -outline-offset-1 outline-primary has-[:focus-visible]:outline-brand-primary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-brand-primary/50">
            {(["AM", "PM"] as const).map((candidate, index) => (
              <button
                key={candidate}
                ref={(node) => {
                  periodRefs.current[candidate] = node;
                }}
                type="button"
                tabIndex={period === candidate ? 0 : -1}
                aria-pressed={period === candidate}
                disabled={disabled}
                onClick={() => handlePeriod(candidate)}
                onKeyDown={(event) => handlePeriodKeyDown(event, candidate)}
                className={cn(
                  "flex-1 cursor-pointer px-2 font-medium text-xs outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                  index > 0 && "border-primary border-t",
                  period === candidate
                    ? "bg-brand-muted-primary text-brand-primary"
                    : "text-tertiary hover:bg-primary-hover hover:text-primary",
                )}
              >
                {candidate === "AM" ? labels.am : labels.pm}
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
