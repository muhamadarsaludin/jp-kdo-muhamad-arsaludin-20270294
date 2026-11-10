import { type ChangeEvent, forwardRef, type MouseEvent, useContext, useId } from "react";

import { cn } from "@kdo/utils";

import { FieldContext } from "../field/field-context";
import type { RadioProps } from "./radio.type";
import {
  radioCircleSizes,
  radioDescriptionSizes,
  radioDotSizes,
  radioLabelSizes,
  radioRootGaps,
  radioStatusFocus,
  radioStatusOutlines,
} from "./radio-variants";

const RadioRoot = forwardRef<HTMLInputElement, RadioProps>(function RadioRoot(
  {
    checked,
    defaultChecked = false,
    onCheckedChange,
    onChange,
    size = "sm",
    status,
    disabled = false,
    label,
    description,
    id,
    className,
    circleClassName,
    labelClassName,
    ...props
  },
  ref,
) {
  const fieldCtx = useContext(FieldContext);
  const effectiveStatus = status ?? fieldCtx?.status ?? "default";
  const generatedId = useId();
  const hasOwnLabel = Boolean(label);
  const effectiveId = id ?? (hasOwnLabel ? undefined : fieldCtx?.controlId) ?? generatedId;
  const isControlled = checked !== undefined;
  const labelId = useId();
  const descriptionId = useId();
  const describedBy =
    [description ? descriptionId : undefined, fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onCheckedChange?.(event.target.checked);
    onChange?.(event);
  };

  // Dragging across the label text ends with a click on the label, which would
  // select the radio. Keep the text copyable and skip that accidental toggle.
  const handleLabelClick = (event: MouseEvent<HTMLLabelElement>) => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      event.preventDefault();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: this handler only cancels label activation after a text selection; keyboard activation stays on the input.
    <label
      onClick={handleLabelClick}
      className={cn(
        "group/radio inline-flex cursor-pointer items-start align-middle",
        radioRootGaps[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        id={effectiveId}
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        disabled={disabled || undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        onChange={handleChange}
        className="peer sr-only"
        {...props}
      />
      <span
        aria-hidden="true"
        data-slot="circle"
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-primary outline-1 -outline-offset-1 transition-colors",
          "peer-focus-visible:ring-3",
          (label || description) && "mt-0.5",
          radioCircleSizes[size],
          radioStatusOutlines[effectiveStatus],
          "hover:bg-brand-muted-primary",
          radioStatusFocus[effectiveStatus],
          "group-has-[:checked]/radio:outline-brand-primary!",
          "group-has-[:checked]/radio:hover:bg-primary",
          "group-has-[:checked]/radio:ring-brand-primary/50!",
          circleClassName,
        )}
      >
        <span
          data-slot="dot"
          className={cn(
            "scale-0 rounded-full bg-brand-primary transition-transform group-has-[:checked]/radio:scale-100",
            radioDotSizes[size],
          )}
        />
      </span>
      {(label || description) && (
        <span className={cn("inline-flex min-w-0 flex-col", labelClassName)}>
          {label && (
            <span
              id={labelId}
              data-slot="label"
              className={cn(
                "text-secondary transition-colors",
                "font-normal group-hover/radio:text-primary",
                "group-has-[:checked]/radio:font-medium group-has-[:checked]/radio:text-primary",
                radioLabelSizes[size],
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              id={descriptionId}
              data-slot="description"
              className={cn(
                "text-tertiary",
                radioDescriptionSizes[size],
                effectiveStatus === "error" && "text-error-primary",
              )}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

RadioRoot.displayName = "Radio";

export const Radio = RadioRoot;
