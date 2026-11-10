import { cn } from "@kdo/utils";
import { type ChangeEvent, forwardRef, type MouseEvent, useContext, useId, useState } from "react";

import { FieldContext } from "../field/field-context";
import type { SwitchProps } from "./switch.type";
import {
  switchDescriptionSizes,
  switchLabelSizes,
  switchRootGaps,
  switchStatusFocus,
  switchStatusOutlines,
  switchThumbSizes,
  switchThumbTranslates,
  switchTrackSizes,
} from "./switch-variants";

const SwitchRoot = forwardRef<HTMLInputElement, SwitchProps>(function SwitchRoot(
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
    trackClassName,
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
  const labelId = useId();
  const descriptionId = useId();
  const describedBy =
    [
      description ? descriptionId : undefined,
      fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = event.target.checked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
    onChange?.(event);
  };

  // Dragging across the label text ends with a click on the label, which would
  // toggle the switch. Keep the text copyable and skip that accidental toggle.
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
        "group/switch inline-flex cursor-pointer items-start align-middle",
        switchRootGaps[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        id={effectiveId}
        checked={currentChecked}
        disabled={disabled || undefined}
        aria-checked={currentChecked}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        onChange={handleChange}
        className="peer sr-only"
        {...props}
      />
      <span
        aria-hidden="true"
        data-slot="track"
        data-state={currentChecked ? "checked" : "unchecked"}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full p-0.5 outline-1 -outline-offset-1 transition-colors",
          "peer-focus-visible:ring-3",
          (label || description) && "mt-0.5",
          switchTrackSizes[size],
          currentChecked
            ? "bg-brand-primary outline-brand-primary hover:bg-brand-primary-hover peer-focus-visible:ring-brand-primary/50"
            : cn(
                "bg-quaternary hover:bg-quinary",
                switchStatusOutlines[effectiveStatus],
                switchStatusFocus[effectiveStatus],
              ),
          trackClassName,
        )}
      >
        <span
          data-slot="thumb"
          className={cn(
            "rounded-full bg-utility-white shadow-xs transition-transform",
            switchThumbSizes[size],
            currentChecked && switchThumbTranslates[size],
          )}
        />
      </span>
      {(label || description) && (
        <span className={cn("inline-flex min-w-0 flex-col", labelClassName)}>
          {label && (
            <span
              id={labelId}
              data-slot="label"
              className={cn("font-medium text-primary", switchLabelSizes[size])}
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
                switchDescriptionSizes[size],
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

SwitchRoot.displayName = "Switch";

export const Switch = SwitchRoot;
