import { cn } from "@kdo/utils";
import { X } from "lucide-react";
import {
  Fragment,
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useContext,
  useId,
  useState,
} from "react";

import { Badge, type BadgeProps } from "../badge";
import { Button, type ButtonProps } from "../button";
import { FieldContext } from "../field/field-context";
import type { InputSize } from "../input/input.type";
import { InputBase } from "../input/input-base";
import {
  inputContentBase,
  inputContentIconSizes,
  inputFieldBase,
  inputHeights,
  inputIconAndLoadingSizes,
  inputIconButtonBase,
  inputInnerLayout,
  inputStatusFocus,
  inputStatusOutline,
  inputTextSizes,
} from "../input/input-variants";
import { type FileSelectError, useFileSelect } from "../lib/use-file-select";
import { Tooltip } from "../tooltip";
import type { Status } from "../type";

export type FileInputSide = "start" | "end";

export type FileInputButtonProps = Omit<
  ButtonProps,
  "as" | "ref" | "type" | "disabled" | "loading" | "fullWidth" | "shape" | "onClick"
>;

export type FileInputProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> & {
  accept?: string;
  maxBytes?: number;
  maxFiles?: number;
  maxTotalBytes?: number;
  multiple?: boolean;
  disabled?: boolean;
  status?: Status;
  size?: InputSize;
  startContent?: ReactNode;
  endContent?: ReactNode;
  startAddOnContent?: ReactNode;
  endAddOnContent?: ReactNode;
  showButton?: boolean;
  buttonLabel?: string;
  buttonProps?: FileInputButtonProps;
  buttonPosition?: FileInputSide;
  removable?: boolean;
  removeLabel?: string;
  onRemove?: () => void;
  showCountBadge?: boolean;
  countBadgeProps?: Omit<BadgeProps, "children">;
  showCountBadgeTooltip?: boolean;
  countBadgeTooltipLimit?: number;
  placeholder?: string;
  value?: string;
  onFiles?: (files: File[]) => void;
  onError?: (error: FileSelectError) => void;
};

const fileInputButtonSizes: Record<InputSize, "xs" | "sm" | "md"> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
} as const;

const fileInputBadgeSizes: Record<InputSize, "sm" | "md" | "lg"> = {
  xs: "sm",
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
} as const;

const addOnGroupBase = cn(
  "flex shrink-0 items-stretch bg-quaternary font-medium",
  "[&>button]:h-auto [&>button]:shrink-0 [&>button]:self-stretch [&>button]:rounded-none",
  "[&>button]:motion-safe:active:scale-100! [&>button]:focus-visible:outline-none! [&>button]:focus-visible:ring-0!",
  "[&>*+*]:border-l [&>*+*]:border-primary",
);

export const FileInput = forwardRef<HTMLDivElement, FileInputProps>(function FileInput(
  {
    accept,
    maxBytes,
    maxFiles,
    maxTotalBytes,
    multiple,
    disabled = false,
    status,
    size = "md",
    startContent,
    endContent,
    startAddOnContent,
    endAddOnContent,
    showButton = true,
    buttonLabel = "Browse",
    buttonProps,
    buttonPosition = "end",
    removable = true,
    removeLabel = "Remove file",
    onRemove,
    showCountBadge = true,
    countBadgeProps,
    showCountBadgeTooltip = true,
    countBadgeTooltipLimit = 5,
    placeholder = "No file selected",
    value,
    onFiles,
    onError,
    "aria-label": ariaLabel,
    className,
    ...props
  },
  ref,
) {
  const fieldCtx = useContext(FieldContext);
  const effectiveStatus = status ?? fieldCtx?.status ?? "default";
  const fallbackId = useId();
  const controlId = fieldCtx?.controlId ?? fallbackId;

  const [selected, setSelected] = useState<File[]>([]);

  const handleFiles = (files: File[]) => {
    setSelected(files);
    onFiles?.(files);
  };

  const { getInputProps, open } = useFileSelect({
    accept,
    maxBytes,
    maxFiles,
    maxTotalBytes,
    multiple,
    disabled,
    onFiles: handleFiles,
    onError,
  });

  let displayName = value;
  if (displayName === undefined) {
    const [first] = selected;
    displayName = first?.name ?? "";
  }
  const extraCount = value === undefined ? Math.max(0, selected.length - 1) : 0;
  const showCount = showCountBadge && extraCount > 0;
  const hiddenFiles = extraCount > 0 ? selected.slice(1) : [];
  const tooltipFiles = hiddenFiles.slice(0, countBadgeTooltipLimit);
  const hiddenFilesMore = hiddenFiles.length - tooltipFiles.length;
  const hasContent = displayName.length > 0;
  const showRemove = removable && hasContent && !disabled;

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelected([]);
    onRemove?.();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  };

  const contentClassName = cn(inputContentBase, inputTextSizes[size], inputContentIconSizes[size]);

  const renderAddOns = (side: FileInputSide) => {
    const custom = side === "start" ? startAddOnContent : endAddOnContent;
    const builtIns: ReactNode[] = [];

    if (showButton && buttonPosition === side) {
      builtIns.push(
        <Button
          key="browse"
          {...buttonProps}
          data-slot="file-input-browse"
          type="button"
          size={buttonProps?.size ?? fileInputButtonSizes[size]}
          variant={buttonProps?.variant ?? "solid"}
          color={buttonProps?.color ?? "brand"}
          disabled={disabled}
          onClick={open}
          className={buttonProps?.className}
        >
          {buttonProps?.children ?? buttonLabel}
        </Button>,
      );
    }

    const customNode = custom ? <Fragment key="custom">{custom}</Fragment> : null;
    const nodes = side === "start" ? [customNode, ...builtIns] : [...builtIns, customNode];
    const visible = nodes.filter(Boolean);
    if (visible.length === 0) return null;

    return (
      <div
        data-slot={`file-input-${side}`}
        className={cn(
          addOnGroupBase,
          side === "start" ? "border-primary border-r" : "border-primary border-l",
        )}
      >
        {visible}
      </div>
    );
  };

  return (
    <div
      {...props}
      ref={ref}
      data-slot="file-input"
      data-status={effectiveStatus}
      className={cn(
        "flex w-full min-w-0 items-stretch overflow-hidden rounded-lg bg-primary",
        inputFieldBase,
        inputStatusOutline[effectiveStatus],
        inputStatusFocus[effectiveStatus],
        inputHeights[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input {...getInputProps()} />
      {renderAddOns("start")}
      <div className={inputInnerLayout}>
        {startContent && <div className={contentClassName}>{startContent}</div>}
        <InputBase
          id={controlId}
          aria-label={ariaLabel}
          aria-describedby={fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined}
          data-slot="file-input-value"
          className={cn(
            "flex-1 truncate text-sm",
            disabled ? "cursor-not-allowed!" : "cursor-pointer!",
          )}
          size={size}
          type="text"
          value={displayName}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onClick={open}
          onKeyDown={handleInputKeyDown}
        />
        {showCount && (
          <Tooltip
            disabled={!showCountBadgeTooltip}
            contentClassName="max-w-64 text-left"
            trigger={
              <Badge
                {...countBadgeProps}
                data-slot="file-input-count"
                tabIndex={0}
                size={countBadgeProps?.size ?? fileInputBadgeSizes[size]}
                variant={countBadgeProps?.variant ?? "subtle"}
                color={countBadgeProps?.color ?? "neutral"}
                className={cn(
                  "shrink-0 focus-visible:outline-2 focus-visible:outline-brand-primary/50",
                  countBadgeProps?.className,
                )}
              >
                {`+${extraCount}`}
              </Badge>
            }
          >
            <span className="flex flex-col gap-0.5">
              {tooltipFiles.map((file) => (
                <span
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="block max-w-60 truncate"
                >
                  {file.name}
                </span>
              ))}
              {hiddenFilesMore > 0 && (
                <span className="opacity-70">{`+${hiddenFilesMore} more`}</span>
              )}
            </span>
          </Tooltip>
        )}
        {showRemove && (
          <button
            type="button"
            data-slot="file-input-remove"
            aria-label={removeLabel}
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleRemove}
            className={cn(inputIconButtonBase)}
          >
            <X className={inputIconAndLoadingSizes[size]} />
          </button>
        )}
        {endContent && <div className={contentClassName}>{endContent}</div>}
      </div>
      {renderAddOns("end")}
    </div>
  );
});
