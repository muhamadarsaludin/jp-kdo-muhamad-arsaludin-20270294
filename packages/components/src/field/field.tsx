import { cn } from "@kdo/utils";
import { forwardRef, useCallback, useContext, useEffect, useId, useRef, useState } from "react";

import type {
  FieldContentProps,
  FieldCounterProps,
  FieldEndAddOnContentProps,
  FieldFooterProps,
  FieldHelperTextProps,
  FieldLabelProps,
  FieldProps,
  FieldStartContentProps,
} from "./field.type";
import { FieldContext } from "./field-context";
import { fieldLabelColor, fieldTextColor, fieldVariants } from "./field-variants";

// -----------------------------------------------------------------------------
// Field
// -----------------------------------------------------------------------------
const FieldRoot = forwardRef<HTMLDivElement, FieldProps>(function FieldRoot(
  {
    controlId,
    required = false,
    status = "default",
    color = "default",
    current,
    max,
    separator,
    orientation = "vertical",
    alignment = "stretch",
    className,
    children,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const descriptionId = useId();
  const effectiveId = controlId ?? generatedId;
  const descriptionCount = useRef(0);
  const [descriptionPresent, setDescriptionPresent] = useState(false);

  const registerDescription = useCallback((present: boolean) => {
    descriptionCount.current = Math.max(0, descriptionCount.current + (present ? 1 : -1));
    setDescriptionPresent(descriptionCount.current > 0);
  }, []);

  return (
    <FieldContext.Provider
      value={{
        controlId: effectiveId,
        descriptionId,
        descriptionPresent,
        setDescriptionPresent: registerDescription,
        required,
        status,
        color,
        current,
        max,
        separator,
      }}
    >
      <div
        ref={ref}
        className={cn(fieldVariants({ orientation, alignment }), className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
});
FieldRoot.displayName = "Field";

// -----------------------------------------------------------------------------
// Field.Label
// -----------------------------------------------------------------------------
const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { htmlFor, required, children, endContent, className, ...props },
  ref,
) {
  const ctx = useContext(FieldContext);
  const generatedId = useId();
  const effectiveHtmlFor = htmlFor ?? ctx?.controlId ?? generatedId;
  const effectiveRequired = required ?? ctx?.required ?? false;
  const effectiveColor = ctx?.color ?? "default";

  const label = (
    <label
      ref={ref}
      htmlFor={effectiveHtmlFor}
      className={cn(
        "flex items-center gap-1 font-medium text-sm",
        fieldLabelColor[effectiveColor],
        effectiveRequired && "after:text-error-primary after:content-['*']",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );

  // Kept outside the label: interactive end content must not toggle the control.
  if (endContent == null) return label;

  return (
    <div className="flex items-center gap-1">
      {label}
      {endContent}
    </div>
  );
});
FieldLabel.displayName = "Field.Label";

// -----------------------------------------------------------------------------
// Field.StartContent
// -----------------------------------------------------------------------------
const FieldStartContent = forwardRef<HTMLDivElement, FieldStartContentProps>(
  function FieldStartContent({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn("flex shrink-0 items-center gap-1", className)} {...props}>
        {children}
      </div>
    );
  },
);
FieldStartContent.displayName = "Field.StartContent";

// -----------------------------------------------------------------------------
// Field.EndAddOnContent
// -----------------------------------------------------------------------------
const FieldEndAddOnContent = forwardRef<HTMLDivElement, FieldEndAddOnContentProps>(
  function FieldEndAddOnContent({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn("flex shrink-0 items-center gap-1", className)} {...props}>
        {children}
      </div>
    );
  },
);
FieldEndAddOnContent.displayName = "Field.EndAddOnContent";

// -----------------------------------------------------------------------------
// Field.Content
// -----------------------------------------------------------------------------
const FieldContent = forwardRef<HTMLDivElement, FieldContentProps>(function FieldContent(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex w-full flex-1 flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
});
FieldContent.displayName = "Field.Content";

// -----------------------------------------------------------------------------
// Field.Footer
// -----------------------------------------------------------------------------
const FieldFooter = forwardRef<HTMLDivElement, FieldFooterProps>(function FieldFooter(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex items-center justify-between gap-2", className)} {...props}>
      {children}
    </div>
  );
});
FieldFooter.displayName = "Field.Footer";

// -----------------------------------------------------------------------------
// Field.HelperText
// -----------------------------------------------------------------------------
const FieldHelperText = forwardRef<HTMLDivElement, FieldHelperTextProps>(function FieldHelperText(
  { id, status, color, className, children, ...props },
  ref,
) {
  const ctx = useContext(FieldContext);
  const effectiveStatus = status ?? ctx?.status ?? "default";
  const effectiveColor = color ?? ctx?.color ?? "default";
  const setDescriptionPresent = ctx?.setDescriptionPresent;

  useEffect(() => {
    setDescriptionPresent?.(true);
    return () => setDescriptionPresent?.(false);
  }, [setDescriptionPresent]);

  return (
    <div
      ref={ref}
      id={id ?? ctx?.descriptionId}
      className={cn(
        "flex-1 text-xs transition-colors",
        fieldTextColor[effectiveColor][effectiveStatus],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
FieldHelperText.displayName = "Field.HelperText";

// -----------------------------------------------------------------------------
// Field.Counter
// -----------------------------------------------------------------------------

const FieldCounter = forwardRef<HTMLSpanElement, FieldCounterProps>(function FieldCounter(
  { current, max, maxLabel, separator, status, color, className, ...props },
  ref,
) {
  const ctx = useContext(FieldContext);
  const effectiveStatus = status ?? ctx?.status ?? "default";
  const effectiveColor = color ?? ctx?.color ?? "default";
  const effectiveCurrent = current ?? ctx?.current ?? 0;
  const effectiveMax = max ?? ctx?.max;
  const effectiveSeparator = separator ?? ctx?.separator ?? "/";
  const maxValue = effectiveMax !== undefined ? effectiveMax : maxLabel;

  return (
    <span
      ref={ref}
      aria-live="polite"
      className={cn(
        "ml-auto text-xs tabular-nums transition-colors",
        fieldTextColor[effectiveColor][effectiveStatus],
        className,
      )}
      {...props}
    >
      {effectiveCurrent}
      {maxValue !== undefined ? `${effectiveSeparator}${maxValue}` : null}
    </span>
  );
});
FieldCounter.displayName = "Field.Counter";

export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  StartContent: FieldStartContent,
  EndAddOnContent: FieldEndAddOnContent,
  Content: FieldContent,
  Footer: FieldFooter,
  HelperText: FieldHelperText,
  Counter: FieldCounter,
});

export type {
  FieldAlignment,
  FieldColor,
  FieldContentProps,
  FieldCounterProps,
  FieldEndAddOnContentProps,
  FieldFooterProps,
  FieldHelperTextProps,
  FieldLabelProps,
  FieldOrientation,
  FieldProps,
  FieldStartContentProps,
} from "./field.type";
