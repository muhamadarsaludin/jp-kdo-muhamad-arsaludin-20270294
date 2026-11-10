import { cn } from "@kdo/utils";
import { ImagePlus, Play, X } from "lucide-react";
import { forwardRef, type HTMLAttributes, type ReactNode, useRef, useState } from "react";

import { FileTypeIcon } from "../lib/file-type-icon";
import { type FileSelectError, useFileSelect } from "../lib/use-file-select";

export type FileGridItem = {
  id: string;
  src?: string;
  name?: string;
  type?: string;
  alt?: string;
  poster?: string;
  badge?: ReactNode;
};

export type FileGridShape = "rounded" | "circle";
export type FileGridSize = "sm" | "md" | "lg";

export type FileGridProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onError"> & {
  items: FileGridItem[];
  onAdd?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  onItemClick?: (item: FileGridItem) => void;
  itemClickLabel?: (item: FileGridItem) => string;
  onReorder?: (fromId: string, toId: string) => void;
  accept?: string;
  maxBytes?: number;
  max?: number;
  shape?: FileGridShape;
  size?: FileGridSize;
  disabled?: boolean;
  addLabel?: string;
  removeLabel?: (item: FileGridItem) => string;
  onError?: (error: FileSelectError) => void;
  addIcon?: ReactNode;
};

const fileGridSizes: Record<FileGridSize, string> = {
  sm: "size-16",
  md: "size-20",
  lg: "size-24",
} as const;

const fileGridShapes: Record<FileGridShape, string> = {
  rounded: "rounded-lg",
  circle: "rounded-full",
} as const;

const fileGridIconSizes: Record<FileGridSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
} as const;

const fileGridPlaySizes: Record<FileGridSize, string> = {
  sm: "size-6",
  md: "size-7",
  lg: "size-8",
} as const;

export const FileGrid = forwardRef<HTMLDivElement, FileGridProps>(function FileGrid(
  {
    items,
    onAdd,
    onRemove,
    onItemClick,
    itemClickLabel = (item) => `Edit ${item.name ?? "item"}`,
    onReorder,
    accept,
    maxBytes,
    max,
    shape = "rounded",
    size = "md",
    disabled = false,
    addLabel = "Add",
    removeLabel = (item) => `Remove ${item.name ?? "item"}`,
    onError,
    addIcon = <ImagePlus aria-hidden className="size-5" />,
    className,
    ...props
  },
  ref,
) {
  const draggedId = useRef<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const remaining = max === undefined ? Number.POSITIVE_INFINITY : Math.max(0, max - items.length);
  const canAdd = !disabled && remaining > 0;

  const { getInputProps, getRootProps, isDragging } = useFileSelect({
    accept,
    maxBytes,
    multiple: true,
    disabled: !canAdd,
    onFiles: (files) => {
      const limited = remaining === Number.POSITIVE_INFINITY ? files : files.slice(0, remaining);
      if (limited.length > 0) onAdd?.(limited);
    },
    onError,
  });

  const tileShape = fileGridShapes[shape];
  const tileSize = fileGridSizes[size];

  return (
    <div
      {...props}
      ref={ref}
      data-slot="file-grid"
      className={cn("flex flex-wrap gap-3", className)}
    >
      {items.map((item) => {
        const isImage = item.type?.startsWith("image/");
        const isVideo = item.type?.startsWith("video/");
        const hasThumb = (isImage && !!item.src) || (isVideo && !!(item.src || item.poster));

        let tileContent: ReactNode;
        if (hasThumb && isVideo) {
          tileContent = (
            <>
              <video
                data-slot="file-grid-video"
                src={item.src}
                poster={item.poster}
                muted
                playsInline
                preload="metadata"
                aria-label={item.alt ?? item.name ?? ""}
                className="size-full object-cover"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <Play
                  className={cn("fill-white text-white drop-shadow-sm", fileGridPlaySizes[size])}
                />
              </span>
            </>
          );
        } else if (hasThumb) {
          tileContent = (
            // biome-ignore lint/performance/noImgElement: library component without a framework; no next/image is available
            <img
              data-slot="file-grid-image"
              src={item.src}
              alt={item.alt ?? item.name ?? ""}
              className="size-full object-cover"
            />
          );
        } else {
          tileContent = (
            <FileTypeIcon type={item.type} name={item.name} className={fileGridIconSizes[size]} />
          );
        }

        return (
          // biome-ignore lint/a11y/noStaticElementInteractions: the tile is a drag-and-drop reorder target; crop and remove are separate controls.
          <div
            key={item.id}
            data-slot="file-grid-item"
            draggable={onReorder !== undefined}
            onDragStart={(event) => {
              if (!onReorder) return;
              draggedId.current = item.id;
              setDraggingId(item.id);
              if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/plain", item.id);
              }
            }}
            onDragOver={(event) => {
              if (!onReorder) return;
              event.preventDefault();
              if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
              setOverId(item.id);
            }}
            onDragLeave={() => {
              if (onReorder) setOverId((current) => (current === item.id ? null : current));
            }}
            onDrop={(event) => {
              if (!onReorder) return;
              event.preventDefault();
              const from = draggedId.current ?? event.dataTransfer?.getData("text/plain") ?? "";
              if (from && from !== item.id) onReorder(from, item.id);
              draggedId.current = null;
              setDraggingId(null);
              setOverId(null);
            }}
            onDragEnd={() => {
              draggedId.current = null;
              setDraggingId(null);
              setOverId(null);
            }}
            className={cn(
              "relative flex shrink-0 items-center justify-center overflow-hidden border border-secondary bg-secondary",
              tileSize,
              tileShape,
              onReorder && "cursor-grab active:cursor-grabbing",
              draggingId === item.id && "opacity-60",
              overId === item.id && draggingId !== item.id && "ring-2 ring-brand-primary",
            )}
          >
            {onItemClick ? (
              <button
                type="button"
                aria-label={itemClickLabel(item)}
                onClick={() => onItemClick(item)}
                className="flex size-full cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:-outline-offset-2"
              >
                {tileContent}
              </button>
            ) : (
              tileContent
            )}
            {onRemove ? (
              <button
                type="button"
                aria-label={removeLabel(item)}
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove(item.id);
                }}
                className="absolute top-1 right-1 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full bg-primary-inverse text-primary-inverse outline-1 outline-transparent -outline-offset-1 transition-colors hover:bg-secondary-inverse focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
              >
                <X aria-hidden className="size-3" />
              </button>
            ) : null}
            {item.badge ? (
              <span className="pointer-events-none absolute top-1 left-1 z-10">{item.badge}</span>
            ) : null}
          </div>
        );
      })}

      {canAdd ? (
        <div
          {...getRootProps()}
          data-slot="file-grid-add"
          data-dragging={isDragging || undefined}
          className={cn(
            "flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border border-primary border-dashed text-tertiary outline-none transition-colors",
            tileSize,
            tileShape,
            "focus-visible:border-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
            isDragging && "border-brand-primary bg-brand-muted-primary text-brand-primary",
          )}
        >
          <input {...getInputProps()} />
          {addIcon}
          <span className="text-xs">{addLabel}</span>
        </div>
      ) : null}
    </div>
  );
});
