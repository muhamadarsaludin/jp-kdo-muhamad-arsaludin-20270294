import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@kdo/utils";
import { Upload } from "lucide-react";

import { type FileSelectError, useFileSelect } from "../lib/use-file-select";

type NativeDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "onDrop" | "onDragEnter" | "onDragOver" | "onDragLeave" | "role"
>;

export type DropzoneProps = NativeDivProps & {
  accept?: string;
  maxBytes?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFiles?: (files: File[]) => void;
  onError?: (error: FileSelectError) => void;
  label?: string;
  description?: string;
  icon?: ReactNode;
  iconClassName?: string;
  children?: ReactNode;
};

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(function Dropzone(
  {
    accept,
    maxBytes,
    multiple,
    disabled = false,
    onFiles,
    onError,
    label,
    description,
    icon,
    iconClassName,
    children,
    className,
    ...props
  },
  ref,
) {
  const { getInputProps, getRootProps, isDragging } = useFileSelect({
    accept,
    maxBytes,
    multiple,
    disabled,
    onFiles,
    onError,
  });

  return (
    <div
      {...props}
      {...getRootProps()}
      ref={ref}
      data-slot="dropzone"
      data-dragging={isDragging || undefined}
      className={cn(
        "group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-primary border-dashed px-6 py-8 text-center outline-none transition-colors",
        "focus-visible:border-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
        isDragging && "border-brand-primary bg-brand-muted-primary",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input {...getInputProps()} />
      {children ?? (
        <>
          <span
            data-slot="dropzone-icon"
            className={cn("inline-flex items-center justify-center text-tertiary [&_svg]:size-5", iconClassName)}
          >
            {icon ?? <Upload aria-hidden />}
          </span>
          <span data-slot="dropzone-content" className="flex flex-col items-center gap-1">
            {label && (
              <p className="font-medium text-secondary text-sm transition-colors group-hover:text-primary">{label}</p>
            )}
            {description && <p className="text-tertiary text-xs">{description}</p>}
          </span>
        </>
      )}
    </div>
  );
});
