import {
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
  Fragment,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";

import { FieldContext } from "../field/field-context";
import type { OtpMode, OtpProps } from "./otp.type";
import { otpCellVariants, otpTextSizes } from "./otp-variants";

function sanitizeValue(raw: string, mode: OtpMode): string {
  if (mode === "numeric") return raw.replace(/\D/g, "");
  return raw.replace(/[^a-zA-Z0-9]/g, "");
}

function splitCells(value: string, length: number): string[] {
  const cells = value.split("").slice(0, length);
  while (cells.length < length) cells.push("");
  return cells;
}

function fitCells(cells: string[], length: number): string[] {
  const next = cells.slice(0, length);
  while (next.length < length) next.push("");
  return next;
}

export function resolveSeparatorPositions(length: number, separator: boolean | number | undefined): number[] {
  let group = 0;
  if (separator === true) group = 2;
  else if (typeof separator === "number") group = Math.floor(separator);
  if (!Number.isFinite(group) || group < 1 || group >= length) return [];
  const positions: number[] = [];
  for (let index = group; index < length; index += group) positions.push(index);
  return positions;
}

const OtpRoot = forwardRef<HTMLFieldSetElement, OtpProps>(function OtpRoot(
  {
    length = 6,
    separator = false,
    value,
    defaultValue = "",
    onValueChange,
    onComplete,
    mode = "numeric",
    size = "md",
    status,
    variant = "outlined",
    shape = "rounded",
    disabled = false,
    autoFocus = false,
    autoComplete = "one-time-code",
    webOtp = false,
    className,
    cellClassName,
    cellLabel = (index, total) => `Digit ${index + 1} of ${total}`,
    ...props
  },
  ref,
) {
  const fieldCtx = useContext(FieldContext);
  const effectiveStatus = status ?? fieldCtx?.status ?? "default";

  const [internalCells, setInternalCells] = useState<string[]>(() =>
    splitCells(sanitizeValue(defaultValue, mode), length),
  );
  const isControlled = value !== undefined;
  // Re-sanitize every render so controlled values, defaultValue, and runtime
  // mode switches can never display rejected characters.
  const cells = fitCells(isControlled ? splitCells(value, length) : internalCells, length).map((cell) =>
    sanitizeValue(cell, mode).slice(0, 1),
  );

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusCell = useCallback((index: number) => {
    const node = inputsRef.current[index];
    if (node) {
      node.focus();
      node.select();
    }
  }, []);

  useEffect(() => {
    if (autoFocus) focusCell(0);
  }, [autoFocus, focusCell]);

  // Latest render state for the one-shot WebOTP request below.
  const stateRef = useRef({ cells, isControlled, onValueChange, onComplete, mode, length });
  stateRef.current = { cells, isControlled, onValueChange, onComplete, mode, length };

  useEffect(() => {
    if (!webOtp || disabled) return;
    if ((globalThis as { OTPCredential?: unknown }).OTPCredential === undefined) return;
    const credentials = navigator.credentials as unknown as
      | { get(options: { otp: { transport: string[] }; signal: AbortSignal }): Promise<unknown> }
      | undefined;
    if (credentials?.get === undefined) return;

    const controller = new AbortController();
    credentials
      .get({ otp: { transport: ["sms"] }, signal: controller.signal })
      .then((credential) => {
        const code = (credential as { code?: string } | null)?.code;
        const current = stateRef.current;
        const cleaned = code === undefined ? "" : sanitizeValue(code, current.mode);
        if (cleaned.length === 0) return;
        const next = [...current.cells];
        const chars = cleaned.split("");
        for (let offset = 0; offset < chars.length && offset < current.length; offset += 1) {
          const char = chars[offset];
          if (char !== undefined) next[offset] = char;
        }
        const nextValue = next.join("");
        const wasComplete = current.cells.every((cell) => cell !== "");
        const isComplete = next.every((cell) => cell !== "");
        if (!current.isControlled) setInternalCells(next);
        current.onValueChange?.(nextValue);
        if (isComplete && !wasComplete) current.onComplete?.(nextValue);
        const nextEmpty = next.indexOf("");
        focusCell(nextEmpty === -1 ? Math.min(chars.length - 1, current.length - 1) : nextEmpty);
      })
      .catch(() => {
        // No SMS (unsupported format, timeout, abort): user types or pastes manually.
      });
    return () => controller.abort();
  }, [webOtp, disabled, focusCell]);

  const instanceId = useId();
  const slots = useMemo(() => Array.from({ length }, (_, position) => position), [length]);
  const separatorPositions = useMemo(() => resolveSeparatorPositions(length, separator), [length, separator]);

  const commit = (nextCells: string[], focusIndex?: number) => {
    const nextValue = nextCells.join("");
    const wasComplete = cells.every((cell) => cell !== "");
    const isComplete = nextCells.every((cell) => cell !== "");
    if (!isControlled) setInternalCells(nextCells);
    onValueChange?.(nextValue);
    if (isComplete && !wasComplete) onComplete?.(nextValue);
    if (focusIndex !== undefined) focusCell(focusIndex);
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const raw = event.target.value;
    const cleaned = sanitizeValue(raw, mode);
    if (cleaned.length === 0) {
      const next = [...cells];
      next[index] = "";
      commit(next);
      return;
    }
    // The raw input holds rejected characters only: leave the code untouched.
    if (cleaned === cells[index] && raw !== cleaned) return;
    if (cleaned.length === 1) {
      const next = [...cells];
      next[index] = cleaned;
      commit(next, index < length - 1 ? index + 1 : undefined);
      return;
    }
    // Autofill or multi-character input lands in a single box: distribute it.
    const next = [...cells];
    const chars = cleaned.split("");
    for (let offset = 0; offset < chars.length && index + offset < length; offset += 1) {
      const char = chars[offset];
      if (char !== undefined) next[index + offset] = char;
    }
    const nextEmpty = next.indexOf("");
    const lastFilled = Math.min(index + chars.length - 1, length - 1);
    commit(next, nextEmpty === -1 ? lastFilled : nextEmpty);
  };

  const handleKeyDown = (index: number, event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      // A filled box clears itself via the change event; an empty box
      // deletes the previous digit and moves focus to it.
      if (cells[index] === "" && index > 0) {
        event.preventDefault();
        const next = [...cells];
        next[index - 1] = "";
        commit(next, index - 1);
      }
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusCell(index - 1);
      return;
    }
    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      focusCell(index + 1);
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    event.preventDefault();
    const cleaned = sanitizeValue(event.clipboardData.getData("text"), mode);
    if (cleaned.length === 0) return;
    const next = [...cells];
    const chars = cleaned.split("");
    for (let offset = 0; offset < chars.length && index + offset < length; offset += 1) {
      const char = chars[offset];
      if (char !== undefined) next[index + offset] = char;
    }
    const nextEmpty = next.indexOf("");
    const lastFilled = Math.min(index + chars.length - 1, length - 1);
    commit(next, nextEmpty === -1 ? lastFilled : nextEmpty);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <fieldset
      ref={ref}
      className={cn("flex min-w-0 items-center gap-2 border-0 p-0", disabled && "opacity-50", className)}
      {...props}
    >
      {slots.map((position) => (
        <Fragment key={`${instanceId}-cell-${position}`}>
          {separatorPositions.includes(position) && (
            <span aria-hidden="true" data-slot="separator" className="select-none text-tertiary">
              –
            </span>
          )}
          <div className={cn(otpCellVariants({ variant, shape, status: effectiveStatus, size }), cellClassName)}>
            <input
              ref={(node) => {
                inputsRef.current[position] = node;
              }}
              id={position === 0 ? fieldCtx?.controlId : undefined}
              value={cells[position] ?? ""}
              onChange={(event) => handleChange(position, event)}
              onKeyDown={(event) => handleKeyDown(position, event)}
              onPaste={(event) => handlePaste(position, event)}
              onFocus={handleFocus}
              disabled={disabled || undefined}
              autoComplete={autoComplete}
              inputMode={mode === "numeric" ? "numeric" : "text"}
              pattern={mode === "numeric" ? "[0-9]*" : undefined}
              aria-label={cellLabel(position, length)}
              aria-describedby={fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined}
              aria-invalid={effectiveStatus === "error" || undefined}
              className={cn(
                otpTextSizes[size],
                "h-full w-full bg-transparent text-center text-primary outline-none placeholder:text-placeholder disabled:cursor-not-allowed",
              )}
            />
          </div>
        </Fragment>
      ))}
    </fieldset>
  );
});

OtpRoot.displayName = "Otp";

export const Otp = OtpRoot;
