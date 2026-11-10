import { type ChangeEvent, forwardRef, useCallback, useContext, useEffect, useId, useRef, useState } from "react";

import { cn } from "@kdo/utils";

import { FieldContext } from "../field/field-context";
import { inputInnerVariants, inputTextSizes } from "../input/input-variants";
import type { TextAreaProps } from "./text-area.type";

const TextAreaRoot = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextAreaRoot(
  {
    id,
    "aria-describedby": ariaDescribedBy,
    size = "md",
    status,
    variant = "outlined",
    readOnly = false,
    disabled = false,
    required,
    maxLength,
    rows = 3,
    autoResize = false,
    value,
    defaultValue,
    onChange,
    onValueChange,
    startContent,
    endContent,
    footer,
    className,
    ...props
  },
  ref,
) {
  const fieldCtx = useContext(FieldContext);
  const fallbackId = useId();

  const effectiveId = id ?? fieldCtx?.controlId ?? fallbackId;
  const effectiveRequired = required ?? fieldCtx?.required ?? false;
  const effectiveMaxLength = maxLength ?? fieldCtx?.max;
  const effectiveStatus = status ?? fieldCtx?.status ?? "default";
  const describedBy =
    [ariaDescribedBy, fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined].filter(Boolean).join(" ") ||
    undefined;

  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const setAreaRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      areaRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = value === undefined ? internalValue : value;

  // biome-ignore lint/correctness/useExhaustiveDependencies: the height must re-sync whenever the displayed value changes; currentValue is the reactive merge of the controlled value and internal state.
  useEffect(() => {
    if (!autoResize) return;
    const node = areaRef.current;
    if (node === null) return;
    node.style.height = "auto";
    node.style.height = `${node.scrollHeight}px`;
  }, [autoResize, currentValue]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(event);
    onValueChange?.(nextValue);
  };

  const hasActions = startContent != null || endContent != null;

  return (
    <div className={cn("flex w-full min-w-0 flex-col", disabled && "opacity-50", className)}>
      <div
        className={cn(
          inputInnerVariants({
            variant,
            shape: "rounded",
            status: effectiveStatus,
            hasStartAddOn: false,
            hasEndAddOn: false,
          }),
          "px-3 py-2",
          hasActions ? "flex-col items-stretch gap-1.5" : "items-start",
        )}
      >
        <textarea
          {...props}
          ref={setAreaRef}
          id={effectiveId}
          rows={rows}
          aria-describedby={describedBy}
          aria-invalid={effectiveStatus === "error" || undefined}
          required={effectiveRequired || undefined}
          disabled={disabled || undefined}
          readOnly={readOnly || undefined}
          maxLength={effectiveMaxLength}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            "w-full min-w-0 bg-transparent text-primary outline-none placeholder:text-placeholder disabled:cursor-not-allowed",
            inputTextSizes[size],
            autoResize ? "resize-none overflow-hidden" : "resize-y",
          )}
        />
        {hasActions ? (
          <div data-slot="actions" className="flex w-full items-center gap-1">
            {startContent != null ? (
              <span data-slot="start" className="flex min-w-0 items-center gap-1">
                {startContent}
              </span>
            ) : null}
            <span className="flex-1" />
            {endContent != null ? (
              <span data-slot="end" className="flex shrink-0 items-center gap-1">
                {endContent}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      {footer != null ? (
        <div data-slot="footer" className="mt-1.5 text-tertiary text-xs">
          {footer}
        </div>
      ) : null}
    </div>
  );
});

TextAreaRoot.displayName = "TextArea";

export const TextArea = TextAreaRoot;
