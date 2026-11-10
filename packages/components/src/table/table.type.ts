import type { ComponentPropsWithoutRef } from "react";

/** `framed` wraps the table in a rounded, bordered card (default `true`). */
export type TableProps = ComponentPropsWithoutRef<"table"> & { framed?: boolean };
export type TableHeaderProps = ComponentPropsWithoutRef<"thead">;
export type TableBodyProps = ComponentPropsWithoutRef<"tbody">;
export type TableFooterProps = ComponentPropsWithoutRef<"tfoot">;
export type TableRowProps = ComponentPropsWithoutRef<"tr">;
export type TableHeadProps = ComponentPropsWithoutRef<"th">;
export type TableCellProps = ComponentPropsWithoutRef<"td">;
export type TableCaptionProps = ComponentPropsWithoutRef<"caption">;
