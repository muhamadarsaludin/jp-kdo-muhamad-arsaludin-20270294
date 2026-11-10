import { cn } from "@kdo/utils";
import { forwardRef } from "react";

import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "./table.type";

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, framed = true, ...props },
  ref,
) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto",
        framed && "rounded-xl border border-secondary",
      )}
    >
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom border-collapse text-sm", className)}
        {...props}
      />
    </div>
  );
});

TableRoot.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} data-slot="table-header" className={cn(className)} {...props} />;
  },
);

TableHeader.displayName = "Table.Header";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { className, ...props },
  ref,
) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:hover]:bg-secondary [&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
});

TableBody.displayName = "Table.Body";

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot
        ref={ref}
        data-slot="table-footer"
        className={cn("border-secondary border-t font-medium", className)}
        {...props}
      />
    );
  },
);

TableFooter.displayName = "Table.Footer";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "border-secondary border-b transition-colors data-[state=selected]:bg-secondary",
        className,
      )}
      {...props}
    />
  );
});

TableRow.displayName = "Table.Row";

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, ...props },
  ref,
) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "h-10 whitespace-nowrap px-4 text-left align-middle font-medium text-primary",
        className,
      )}
      {...props}
    />
  );
});

TableHead.displayName = "Table.Head";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref,
) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn("px-4 py-3 align-middle", className)}
      {...props}
    />
  );
});

TableCell.displayName = "Table.Cell";

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return (
      <caption
        ref={ref}
        data-slot="table-caption"
        className={cn("mt-4 text-sm text-tertiary", className)}
        {...props}
      />
    );
  },
);

TableCaption.displayName = "Table.Caption";

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});
