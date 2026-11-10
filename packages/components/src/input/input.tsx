import { cn } from "@kdo/utils";
import {
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleX,
  Eye,
  EyeOff,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  cloneElement,
  type FocusEvent,
  forwardRef,
  isValidElement,
  type MouseEvent,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";

import { FieldContext } from "../field/field-context";
import { Spinner } from "../spinner/spinner";
import type { InputProps } from "./input.type";
import { InputBase } from "./input-base";
import {
  inputAddOnVariants,
  inputContentBase,
  inputContentButtonBase,
  inputContentIconSizes,
  inputHeights,
  inputIconAndLoadingSizes,
  inputIconButtonBase,
  inputIconStatusColors,
  inputInnerVariants,
  inputStepperButtonBase,
  inputStepperIconSizes,
  inputStepperWidths,
  inputTextSizes,
} from "./input-variants";

const InputRoot = forwardRef<HTMLInputElement, InputProps>(function InputRoot(
  {
    id,
    "aria-describedby": ariaDescribedBy,
    size = "md",
    status,
    readOnly = false,
    disabled = false,
    loading = false,
    required,
    statusIcon,
    variant = "outlined",
    shape = "rounded",
    clearable = true,
    maxLength,
    value,
    defaultValue,
    onClear,
    onChange,
    onFocus,
    onBlur,
    onValueChange,
    type = "text",
    inputMode,
    startContent,
    endContent,
    startAddOnContent,
    endAddOnContent,
    stepper = true,
    stepperVariant = "bordered",
    clearLabel = "Clear input",
    increaseLabel = "Increase value",
    decreaseLabel = "Decrease value",
    loadingLabel = "Loading input",
    showPasswordLabel = "Show password",
    hidePasswordLabel = "Hide password",
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
    [ariaDescribedBy, fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const inputBaseRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputBaseRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const currentValue = value === undefined ? internalValue : String(value);

  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword && showPassword ? "text" : type;
  const showPasswordToggle = isPassword;
  const showNumberStepper = type === "number" && stepper;
  const stepperDisabled = disabled || loading || readOnly;
  const effectiveInputMode = inputMode ?? (type === "number" ? "decimal" : undefined);

  const [focused, setFocused] = useState(false);
  const hasValue = currentValue.length > 0;
  const showClearButton =
    clearable &&
    hasValue &&
    !readOnly &&
    !disabled &&
    !loading &&
    (focused || effectiveStatus === "default");

  let DefaultStatusIcon: typeof CircleX | undefined;
  switch (effectiveStatus) {
    case "error":
      DefaultStatusIcon = CircleX;
      break;
    case "warning":
      DefaultStatusIcon = TriangleAlert;
      break;
    case "success":
      DefaultStatusIcon = CircleCheck;
      break;
    default:
      DefaultStatusIcon = undefined;
  }

  const statusIconClassName = cn(
    inputIconAndLoadingSizes[size],
    inputIconStatusColors[effectiveStatus],
  );
  const resolvedStatusIcon = isValidElement<{ className?: string }>(statusIcon)
    ? cloneElement(statusIcon, { className: cn(statusIconClassName, statusIcon.props.className) })
    : statusIcon;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    if (!isControlled) setInternalValue(nextValue);

    onChange?.(event);
    onValueChange?.(nextValue);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  const commitValue = (node: HTMLInputElement, nextValue: string) => {
    const prototypeSetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(node),
      "value",
    )?.set;
    if (prototypeSetter) prototypeSetter.call(node, nextValue);
    /* v8 ignore start -- fallback for non-DOM environments; browsers and jsdom always provide the setter */ else
      node.value = nextValue;
    /* v8 ignore stop */
    node.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const node = inputBaseRef.current;
    /* v8 ignore next -- defensive: the clear button only renders when interactive and mounted */
    if (node === null || disabled || loading) return;
    commitValue(node, "");

    onClear?.();
    node.focus();
  };

  const handlePasswordToggle = () => {
    setShowPassword((visible) => !visible);
  };

  const handleStep = (direction: 1 | -1) => {
    const node: HTMLInputElement | null = inputBaseRef.current;
    /* v8 ignore next -- defensive: stepper buttons are disabled in these states and cannot be clicked */
    if (node === null || stepperDisabled) return;

    if (direction === 1) node.stepUp();
    else node.stepDown();
    commitValue(node, node.value);

    node.focus();
  };

  const contentStyles = cn(
    inputContentBase,
    inputContentButtonBase,
    inputTextSizes[size],
    inputContentIconSizes[size],
  );
  const stepperBorder = variant === "filled" ? "border-transparent" : "border-primary";

  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-stretch",
        inputHeights[size],
        (disabled || loading) && "opacity-50",
        disabled && "cursor-not-allowed",
        loading && "cursor-wait",
        className,
      )}
    >
      {startAddOnContent && (
        <div className={cn(inputAddOnVariants({ side: "start", shape, variant, size }))}>
          {startAddOnContent}
        </div>
      )}
      <div
        className={cn(
          inputInnerVariants({
            variant,
            shape,
            status: effectiveStatus,
            hasStartAddOn: !!startAddOnContent,
            hasEndAddOn: !!endAddOnContent,
          }),
        )}
      >
        {startContent && <div className={contentStyles}>{startContent}</div>}

        <InputBase
          {...props}
          ref={setInputRef}
          id={effectiveId}
          type={inputType}
          inputMode={effectiveInputMode}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          aria-invalid={effectiveStatus === "error" || undefined}
          required={effectiveRequired || undefined}
          disabled={disabled || loading || undefined}
          readOnly={readOnly || undefined}
          maxLength={effectiveMaxLength || undefined}
          size={size}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={currentValue}
        />

        {loading && (
          <Spinner className={cn(inputIconAndLoadingSizes[size])} aria-label={loadingLabel} />
        )}

        {showClearButton ? (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            className={cn(inputIconButtonBase)}
            aria-label={clearLabel}
          >
            <X className={cn(inputIconAndLoadingSizes[size])} />
          </button>
        ) : (
          <>
            {resolvedStatusIcon ??
              (DefaultStatusIcon && (
                <DefaultStatusIcon aria-hidden="true" className={statusIconClassName} />
              ))}
            {clearable && !resolvedStatusIcon && !DefaultStatusIcon && !showPasswordToggle ? (
              <span className={cn(inputIconButtonBase, "invisible")} aria-hidden="true">
                <X className={cn(inputIconAndLoadingSizes[size])} />
              </span>
            ) : null}
          </>
        )}

        {showPasswordToggle && (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handlePasswordToggle}
            disabled={disabled || loading}
            className={cn(inputIconButtonBase)}
            aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
          >
            {showPassword ? (
              <EyeOff className={cn(inputIconAndLoadingSizes[size])} />
            ) : (
              <Eye className={cn(inputIconAndLoadingSizes[size])} />
            )}
          </button>
        )}

        {endContent && <div className={contentStyles}>{endContent}</div>}

        {showNumberStepper && (
          <div
            className={cn(
              "-mr-3 flex shrink-0 flex-col self-stretch overflow-hidden",
              inputStepperWidths[size],
              shape === "pill" ? "rounded-r-full" : "rounded-r-lg",
              stepperVariant === "filled" ? "bg-tertiary" : "border-l",
              stepperVariant === "bordered" && stepperBorder,
            )}
          >
            <button
              type="button"
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleStep(1)}
              disabled={stepperDisabled || undefined}
              className={cn(inputStepperButtonBase)}
              aria-label={increaseLabel}
            >
              <ChevronUp className={cn(inputStepperIconSizes[size])} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleStep(-1)}
              disabled={stepperDisabled || undefined}
              className={cn(
                inputStepperButtonBase,
                stepperVariant === "bordered" && cn("border-t", stepperBorder),
              )}
              aria-label={decreaseLabel}
            >
              <ChevronDown className={cn(inputStepperIconSizes[size])} />
            </button>
          </div>
        )}
      </div>
      {endAddOnContent && (
        <div className={cn(inputAddOnVariants({ side: "end", shape, variant, size }))}>
          {endAddOnContent}
        </div>
      )}
    </div>
  );
});

InputRoot.displayName = "Input";

export const Input = InputRoot;

export type {
  InputBaseProps,
  InputProps,
  InputSize,
  InputStepperVariant,
  InputValue,
} from "./input.type";
export {
  inputAddOnVariants,
  inputBaseVariants,
  inputContentBase,
  inputContentIconSizes,
  inputEndAddOnVariants,
  inputIconButtonBase,
  inputInnerVariants,
  inputStartAddOnVariants,
  inputStepperButtonBase,
  inputStepperIconSizes,
  inputStepperWidths,
} from "./input-variants";
