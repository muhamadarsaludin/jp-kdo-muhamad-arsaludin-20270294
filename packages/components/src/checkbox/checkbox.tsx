import {
  type ChangeEvent,
  forwardRef,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";
import { Check, Minus } from "lucide-react";

import { FieldContext } from "../field/field-context";
import type { CheckboxProps } from "./checkbox.type";
import {
  checkboxBoxSizes,
  checkboxDescriptionSizes,
  checkboxIconSizes,
  checkboxLabelSizes,
  checkboxRootGaps,
  checkboxStatusFocus,
  checkboxStatusOutlines,
} from "./checkbox-variants";

const CheckboxRoot = forwardRef<HTMLInputElement, CheckboxProps>(function CheckboxRoot(
  {
    checked,
    defaultChecked = false,
    indeterminate = false,
    onCheckedChange,
    onChange,
    size = "sm",
    status,
    disabled = false,
    label,
    description,
    id,
    className,
    boxClassName,
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
    [description ? descriptionId : undefined, fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;
  const showIndeterminate = indeterminate && !currentChecked;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (node) node.indeterminate = showIndeterminate;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, showIndeterminate],
  );

  const labelActive = currentChecked || showIndeterminate;

  let boxState = "unchecked";
  if (showIndeterminate) boxState = "indeterminate";
  else if (currentChecked) boxState = "checked";

  let boxIcon: ReactNode = null;
  if (showIndeterminate) {
    boxIcon = <Minus data-slot="minus" className={cn(checkboxIconSizes[size], "text-primary-inverse")} />;
  } else if (currentChecked) {
    boxIcon = <Check data-slot="check" className={cn(checkboxIconSizes[size], "text-primary-inverse")} />;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = event.target.checked;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
    onChange?.(event);
  };

  // Dragging across the label text ends with a click on the label, which would
  // toggle the checkbox. Keep the text copyable and skip that accidental toggle.
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
        "group/checkbox inline-flex cursor-pointer items-start align-middle",
        checkboxRootGaps[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        ref={setInputRef}
        type="checkbox"
        id={effectiveId}
        checked={currentChecked}
        disabled={disabled || undefined}
        aria-checked={showIndeterminate ? "mixed" : currentChecked}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={describedBy}
        onChange={handleChange}
        className="peer sr-only"
        {...props}
      />
      <span
        aria-hidden="true"
        data-slot="box"
        data-state={boxState}
        className={cn(
          "flex shrink-0 items-center justify-center bg-primary outline-1 -outline-offset-1 transition-colors",
          "peer-focus-visible:ring-3",
          (label || description) && "mt-0.5",
          checkboxBoxSizes[size],
          currentChecked || showIndeterminate
            ? "bg-brand-primary outline-brand-primary peer-focus-visible:ring-brand-primary/50"
            : cn(
                checkboxStatusOutlines[effectiveStatus],
                "hover:bg-brand-muted-primary",
                checkboxStatusFocus[effectiveStatus],
              ),
          boxClassName,
        )}
      >
        {boxIcon}
      </span>
      {(label || description) && (
        <span className={cn("inline-flex min-w-0 flex-col", labelClassName)}>
          {label && (
            <span
              id={labelId}
              data-slot="label"
              className={cn(
                "transition-colors",
                labelActive
                  ? "font-medium text-primary"
                  : "font-normal text-secondary group-hover/checkbox:text-primary",
                checkboxLabelSizes[size],
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
                checkboxDescriptionSizes[size],
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

CheckboxRoot.displayName = "Checkbox";

export const Checkbox = CheckboxRoot;
