import { type ChangeEvent, forwardRef, useCallback, useContext, useId, useRef, useState } from "react";

import { cn } from "@kdo/utils";
import { Minus, Plus } from "lucide-react";

import { Button } from "../button/button";
import { FieldContext } from "../field/field-context";
import { InputBase } from "../input/input-base";
import {
  inputAddOnVariants,
  inputHeights,
  inputIconAndLoadingSizes,
  inputInnerVariants,
} from "../input/input-variants";
import type { NumberInputProps } from "./number-input.type";

const NumberInputRoot = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInputRoot(
  {
    id,
    "aria-describedby": ariaDescribedBy,
    size = "md",
    variant = "plain",
    shape = "rounded",
    status,
    readOnly = false,
    disabled = false,
    required,
    min,
    max,
    step,
    value,
    defaultValue,
    inputMode,
    onChange,
    onValueChange,
    buttonProps,
    increaseLabel = "Increase value",
    decreaseLabel = "Decrease value",
    className,
    ...props
  },
  ref,
) {
  const fieldCtx = useContext(FieldContext);
  const fallbackId = useId();

  const effectiveId = id ?? fieldCtx?.controlId ?? fallbackId;
  const effectiveRequired = required ?? fieldCtx?.required ?? false;
  const effectiveStatus = status ?? fieldCtx?.status ?? "default";
  const describedBy =
    [ariaDescribedBy, fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined].filter(Boolean).join(" ") ||
    undefined;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const currentValue = value === undefined ? internalValue : String(value);
  const interactive = !disabled && !readOnly;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(event);
    onValueChange?.(nextValue);
  };

  const handleStep = (direction: 1 | -1) => {
    const node = inputRef.current;
    if (node === null || !interactive) return;
    if (direction === 1) node.stepUp();
    else node.stepDown();
    const nextValue = node.value;
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
    node.focus();
  };

  const buttonVariant = buttonProps?.variant ?? "solid";
  const buttonColor = buttonProps?.color ?? "brand";
  const buttonSize = buttonProps?.size ?? size;
  const stepButton = (label: string, direction: 1 | -1, Icon: typeof Minus) => (
    <Button.Icon
      aria-label={label}
      variant={buttonVariant}
      color={buttonColor}
      size={buttonSize}
      shape={buttonProps?.shape}
      className={buttonProps?.className}
      disabled={!interactive}
      onClick={() => handleStep(direction)}
    >
      <Icon />
    </Button.Icon>
  );
  const addonButton = (label: string, direction: 1 | -1, Icon: typeof Minus) => (
    <button
      type="button"
      aria-label={label}
      disabled={!interactive || undefined}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => handleStep(direction)}
      className="cursor-pointer bg-brand-primary text-primary-inverse transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon aria-hidden="true" className={cn(inputIconAndLoadingSizes[size])} />
    </button>
  );
  const decreaseButton =
    variant === "plain" ? stepButton(decreaseLabel, -1, Minus) : addonButton(decreaseLabel, -1, Minus);
  const increaseButton = variant === "plain" ? stepButton(increaseLabel, 1, Plus) : addonButton(increaseLabel, 1, Plus);

  const field = (
    <InputBase
      {...props}
      ref={setInputRef}
      id={effectiveId}
      type="number"
      inputMode={inputMode ?? "decimal"}
      aria-describedby={describedBy}
      aria-invalid={effectiveStatus === "error" || undefined}
      required={effectiveRequired || undefined}
      disabled={disabled || undefined}
      readOnly={readOnly || undefined}
      min={min}
      max={max}
      step={step}
      size={size}
      value={currentValue}
      onChange={handleChange}
      className="text-center"
    />
  );

  if (variant === "plain") {
    return (
      <div className={cn("flex w-full min-w-0 items-center gap-2", disabled && "opacity-50", className)}>
        {decreaseButton}
        {field}
        {increaseButton}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-stretch",
        inputHeights[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <div className={cn(inputAddOnVariants({ side: "start", shape, variant, size }))}>{decreaseButton}</div>
      <div
        className={cn(
          inputInnerVariants({
            variant,
            shape,
            status: effectiveStatus,
            hasStartAddOn: true,
            hasEndAddOn: true,
          }),
        )}
      >
        {field}
      </div>
      <div className={cn(inputAddOnVariants({ side: "end", shape, variant, size }))}>{increaseButton}</div>
    </div>
  );
});

NumberInputRoot.displayName = "NumberInput";

export const NumberInput = NumberInputRoot;
