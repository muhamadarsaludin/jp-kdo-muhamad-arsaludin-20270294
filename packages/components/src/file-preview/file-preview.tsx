import { Fragment, forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@kdo/utils";
import { Check, CircleAlert, Play, X } from "lucide-react";

import { Button } from "../button";
import { FileTypeIcon } from "../lib/file-type-icon";
import { ProgressBar } from "../progress-bar";
import { Spinner } from "../spinner";

export type FilePreviewItemStatus = "uploading" | "complete" | "failed";

export type FilePreviewItem = {
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  meta?: string;
  poster?: string;
  corrupt?: boolean;
  progress?: number;
  status?: FilePreviewItemStatus;
  statusMessage?: ReactNode;
};

export type FilePreviewSize = "sm" | "md" | "lg";
export type FilePreviewVariant = "plain" | "outline";
export type FilePreviewAlign = "top" | "center";

export type FilePreviewProps = Omit<HTMLAttributes<HTMLUListElement>, "onChange"> & {
  items: FilePreviewItem[];
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
  onPreview?: (item: FilePreviewItem) => void;
  showStatusIcon?: boolean;
  statusLabels?: Partial<Record<FilePreviewItemStatus, string>>;
  separator?: boolean;
  align?: FilePreviewAlign;
  size?: FilePreviewSize;
  variant?: FilePreviewVariant;
};

const filePreviewThumbSizes: Record<FilePreviewSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
} as const;

const filePreviewIconSizes: Record<FilePreviewSize, string> = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
} as const;

const filePreviewPlaySizes: Record<FilePreviewSize, string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
} as const;

const filePreviewProgressSizes: Record<FilePreviewSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
} as const;

const filePreviewTextSizes: Record<FilePreviewSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
} as const;

const filePreviewRowVariants: Record<FilePreviewVariant, string> = {
  plain: "rounded-lg hover:bg-primary-hover",
  outline: "rounded-xl border border-secondary hover:bg-primary-hover",
} as const;

const filePreviewStatusMessages: Record<FilePreviewItemStatus, string> = {
  uploading: "Uploading...",
  complete: "Complete",
  failed: "Failed",
} as const;

const filePreviewStatusColors: Record<FilePreviewItemStatus, string> = {
  uploading: "text-tertiary",
  complete: "text-success-primary",
  failed: "text-error-primary",
} as const;

function itemState(item: FilePreviewItem): FilePreviewItemStatus | "idle" {
  if (item.status) return item.status;
  if (item.progress !== undefined) return item.progress >= 100 ? "complete" : "uploading";
  return "idle";
}

function StatusIcon({ status }: { status: FilePreviewItemStatus }) {
  if (status === "uploading") return <Spinner size="sm" aria-hidden className="size-3.5" />;
  if (status === "complete") return <Check aria-hidden className="size-3.5" />;
  return <CircleAlert aria-hidden className="size-3.5" />;
}

export const FilePreview = forwardRef<HTMLUListElement, FilePreviewProps>(function FilePreview(
  {
    items,
    onRemove,
    onRetry,
    onPreview,
    showStatusIcon = true,
    statusLabels,
    separator = false,
    align = "center",
    size = "md",
    variant = "plain",
    className,
    ...props
  },
  ref,
) {
  return (
    <ul {...props} ref={ref} data-slot="file-preview" className={cn("flex flex-col gap-1", className)}>
      {items.map((item, index) => {
        const isImage = item.type?.startsWith("image/");
        const isVideo = item.type?.startsWith("video/");
        const hasThumb = !item.corrupt && ((isImage && !!item.src) || (isVideo && !!(item.src || item.poster)));
        const label = item.name ?? item.id;
        const state = itemState(item);
        const failed = state === "failed";
        const progress = Math.max(0, Math.min(100, item.progress ?? 0));
        const thumbBox = cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-secondary",
          failed ? "border-error-primary" : "border-secondary",
          filePreviewThumbSizes[size],
        );
        const previewable = onPreview != null && hasThumb && !!item.src;
        let thumbContent: ReactNode;
        if (hasThumb && isVideo) {
          thumbContent = (
            <>
              <video
                data-slot="file-preview-video"
                src={item.src}
                poster={item.poster}
                muted
                playsInline
                preload="metadata"
                aria-label={item.alt ?? label}
                className="size-full object-cover"
              />
              <span
                data-slot="file-preview-play"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <Play className={cn("fill-white text-white drop-shadow-sm", filePreviewPlaySizes[size])} />
              </span>
            </>
          );
        } else if (hasThumb) {
          thumbContent = (
            // biome-ignore lint/performance/noImgElement: library component without a framework; no next/image is available
            <img
              data-slot="file-preview-image"
              src={item.src}
              alt={item.alt ?? label}
              className="size-full object-cover"
            />
          );
        } else {
          thumbContent = (
            <FileTypeIcon
              type={item.type}
              name={item.name}
              kind={item.corrupt ? "corrupt" : undefined}
              className={filePreviewIconSizes[size]}
            />
          );
        }

        let secondary: ReactNode = null;
        if (state === "idle") {
          if (item.meta) secondary = <span className="block truncate text-tertiary text-xs">{item.meta}</span>;
        } else {
          secondary = (
            <span className="flex min-w-0 items-center gap-1.5 text-xs">
              {item.meta ? (
                <>
                  <span className="shrink-0 text-tertiary">{item.meta}</span>
                  <span aria-hidden="true" className="text-tertiary">
                    |
                  </span>
                </>
              ) : null}
              <span className={cn("flex shrink-0 items-center gap-1", filePreviewStatusColors[state])}>
                {showStatusIcon ? <StatusIcon status={state} /> : null}
                {item.statusMessage ?? statusLabels?.[state] ?? filePreviewStatusMessages[state]}
              </span>
            </span>
          );
        }

        return (
          <Fragment key={item.id}>
            {separator && index > 0 ? (
              <li aria-hidden="true" data-slot="file-preview-separator" className="mx-2 border-primary border-t" />
            ) : null}
            <li
              data-slot="file-preview-item"
              data-status={state === "idle" ? undefined : state}
              className={cn(
                "group flex gap-2 px-2 py-2 transition-colors",
                align === "top" ? "items-start" : "items-center",
                filePreviewRowVariants[variant],
              )}
            >
              {previewable ? (
                <button
                  type="button"
                  data-slot="file-preview-thumb"
                  aria-label={`Preview ${label}`}
                  onClick={() => onPreview?.(item)}
                  className={cn(
                    thumbBox,
                    "cursor-zoom-in focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2",
                  )}
                >
                  {thumbContent}
                </button>
              ) : (
                <span data-slot="file-preview-thumb" className={thumbBox}>
                  {thumbContent}
                </span>
              )}

              <span className="flex min-w-0 flex-1 flex-col">
                <span className={cn("block truncate font-medium text-primary", filePreviewTextSizes[size])}>
                  {item.name ?? item.id}
                </span>
                {secondary}
                {state === "uploading" ? (
                  <ProgressBar
                    value={progress}
                    size={filePreviewProgressSizes[size]}
                    className="mt-1.5"
                    aria-label={`Uploading ${label}`}
                  />
                ) : null}
              </span>

              {failed && onRetry ? (
                <Button type="button" variant="text" color="brand" size="xs" onClick={() => onRetry(item.id)}>
                  Try again
                </Button>
              ) : null}

              {onRemove ? (
                <button
                  type="button"
                  aria-label={`Remove ${item.name ?? "item"}`}
                  onClick={() => onRemove(item.id)}
                  className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-tertiary transition-colors hover:bg-secondary hover:text-primary"
                >
                  <X aria-hidden className="size-4" />
                </button>
              ) : null}
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
});
