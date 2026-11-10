import { cn } from "@kdo/utils";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { forwardRef, type MouseEvent, type ReactNode, useState } from "react";

import type { PaginationProps } from "./pagination.type";
import {
  paginationActiveColors,
  paginationFocus,
  paginationItemSizes,
} from "./pagination.variants";

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
}

export function paginationItems(
  page: number,
  total: number,
  siblingCount: number,
  boundaryCount: number,
): Array<number | "ellipsis"> {
  const startPages = range(1, Math.min(boundaryCount, total));
  const endPages = range(Math.max(total - boundaryCount + 1, boundaryCount + 1), total);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? (endPages[0] as number) - 2 : total - 1,
  );

  let left: Array<number | "ellipsis">;
  if (siblingsStart > boundaryCount + 2) left = ["ellipsis"];
  else if (boundaryCount + 1 < total - boundaryCount) left = [boundaryCount + 1];
  else left = [];

  let right: Array<number | "ellipsis">;
  if (siblingsEnd < total - boundaryCount - 1) right = ["ellipsis"];
  else if (total - boundaryCount > boundaryCount) right = [total - boundaryCount];
  else right = [];

  return [...startPages, ...left, ...range(siblingsStart, siblingsEnd), ...right, ...endPages];
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    defaultPage = 1,
    total,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    showEdges = false,
    size = "md",
    color = "brand",
    disabled = false,
    labels,
    className,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultPage);
  const isControlled = page !== undefined;
  const totalPages = Math.max(1, Math.round(total));
  const current = Math.min(Math.max(1, Math.round(isControlled ? page : internal)), totalPages);

  const goTo = (next: number) => {
    const target = Math.min(Math.max(1, next), totalPages);
    if (target === current) return;
    if (!isControlled) setInternal(target);
    onPageChange?.(target);
  };

  const resolvedLabels = {
    nav: labels?.nav ?? "Pagination",
    page: labels?.page ?? ((item: number) => `Go to page ${item}`),
    first: labels?.first ?? "Go to first page",
    previous: labels?.previous ?? "Go to previous page",
    next: labels?.next ?? "Go to next page",
    last: labels?.last ?? "Go to last page",
  };

  const itemClass = cn(
    "inline-flex cursor-pointer items-center justify-center rounded-md font-medium outline-1 -outline-offset-1 outline-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    paginationItemSizes[size],
    paginationFocus[color],
  );
  const idleClass = "text-secondary hover:bg-primary-hover hover:text-primary";

  const control = (label: string, icon: ReactNode, target: number, isDisabled: boolean) => (
    <li>
      <button
        type="button"
        aria-label={label}
        disabled={disabled || isDisabled}
        onClick={() => goTo(target)}
        className={cn(itemClass, idleClass)}
      >
        {icon}
      </button>
    </li>
  );

  const handlePageClick = (event: MouseEvent<HTMLButtonElement>, target: number) => {
    event.preventDefault();
    if (disabled) return;
    goTo(target);
  };

  const items = paginationItems(current, totalPages, siblingCount, boundaryCount);

  return (
    <nav
      ref={ref}
      aria-label={resolvedLabels.nav}
      data-slot="pagination"
      className={cn("w-fit", className)}
      {...props}
    >
      <ul data-slot="pagination-list" className="flex list-none items-center gap-1 p-0">
        {showEdges
          ? control(resolvedLabels.first, <ChevronLeft aria-hidden="true" />, 1, current === 1)
          : null}
        {control(
          resolvedLabels.previous,
          <ChevronLeft aria-hidden="true" />,
          current - 1,
          current === 1,
        )}
        {items.map((item, index) =>
          item === "ellipsis" ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis markers are positional.
            <li key={`ellipsis-${index}`}>
              <span
                data-slot="ellipsis"
                aria-hidden="true"
                className={cn(
                  "inline-flex items-center justify-center text-tertiary",
                  paginationItemSizes[size],
                )}
              >
                <Ellipsis aria-hidden="true" />
              </span>
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                aria-label={resolvedLabels.page(item)}
                aria-current={item === current ? "page" : undefined}
                disabled={disabled}
                data-active={item === current || undefined}
                onClick={(event) => handlePageClick(event, item)}
                className={cn(
                  itemClass,
                  item === current ? paginationActiveColors[color] : idleClass,
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
        {control(
          resolvedLabels.next,
          <ChevronRight aria-hidden="true" />,
          current + 1,
          current === totalPages,
        )}
        {showEdges
          ? control(
              resolvedLabels.last,
              <ChevronRight aria-hidden="true" />,
              totalPages,
              current === totalPages,
            )
          : null}
      </ul>
    </nav>
  );
});

Pagination.displayName = "Pagination";
