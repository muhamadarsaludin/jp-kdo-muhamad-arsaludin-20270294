import { forwardRef } from "react";

import { cn } from "@kdo/utils";
import { X } from "lucide-react";

import type { ChipProps } from "./chip.type";
import { chipSelectedColors, chipShapes, chipSizes, chipVariantColors } from "./chip.variants";

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    size = "md",
    variant = "outline",
    shape = "pill",
    selected,
    disabled = false,
    removable = false,
    onRemove,
    removeLabel = "Remove",
    startContent,
    endContent,
    onClick,
    className,
    children,
    ...props
  },
  ref,
) {
  const sizes = chipSizes[size];
  const isToggle = selected !== undefined;
  const active = selected === true;
  const palette = active ? chipSelectedColors[variant] : chipVariantColors[variant];
  const interactive = onClick !== undefined;

  const start = startContent ? (
    <span data-slot="start" className={cn("flex shrink-0 items-center", sizes.start)}>
      {startContent}
    </span>
  ) : null;
  const label = (
    <span data-slot="label" className="truncate">
      {children}
    </span>
  );
  const end = endContent ? (
    <span data-slot="end" className={cn("flex shrink-0 items-center", sizes.end)}>
      {endContent}
    </span>
  ) : null;

  return (
    <div
      {...props}
      ref={ref}
      data-slot="chip"
      data-variant={variant}
      data-selected={active || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "inline-flex w-fit items-center font-normal outline-1 outline-transparent -outline-offset-1 transition-colors",
        chipShapes[shape],
        "has-[:focus-visible]:outline-brand-primary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-brand-primary/50",
        palette,
        active && "font-medium",
        sizes.root,
        removable && "pr-1",
        disabled && "opacity-50",
        className,
      )}
    >
      {interactive ? (
        <button
          type="button"
          data-slot="action"
          disabled={disabled || undefined}
          aria-pressed={isToggle ? active : undefined}
          onClick={onClick}
          className={cn(
            "inline-flex min-w-0 cursor-pointer items-center outline-none",
            sizes.action,
            disabled && "cursor-not-allowed",
          )}
        >
          {start}
          {label}
          {end}
        </button>
      ) : (
        <span data-slot="content" className={cn("inline-flex min-w-0 items-center", sizes.action)}>
          {start}
          {label}
          {end}
        </span>
      )}
      {removable ? (
        <button
          type="button"
          data-slot="remove"
          disabled={disabled || undefined}
          aria-label={removeLabel}
          onClick={onRemove}
          className={cn(
            "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition-opacity hover:opacity-70",
            sizes.remove,
            sizes.removeIcon,
            disabled && "cursor-not-allowed",
          )}
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});

Chip.displayName = "Chip";
