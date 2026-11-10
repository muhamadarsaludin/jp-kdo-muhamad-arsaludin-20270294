import {
  type ElementType,
  forwardRef,
  type HTMLAttributeAnchorTarget,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";

import { cn } from "@kdo/utils";
import { Check, ChevronRight } from "lucide-react";

import { Checkbox } from "../checkbox/checkbox";
import { ItemRowContent, itemRowClassName, itemRowSlotOffset } from "../lib/item-row";
import { Radio } from "../radio/radio";
import type {
  ListAlignment,
  ListChevronPosition,
  ListHighlightMode,
  ListItemContextValue,
  ListSelectionIndicator,
  ListSelectionPosition,
} from "./list.type";

export type ListItemProps = {
  label: ReactNode;
  description?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  depth?: number;
  role?: "listitem" | "option" | "treeitem";
  selected?: boolean;
  indeterminate?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  alignChevron?: boolean;
  disabled?: boolean;
  selectable?: boolean;
  selectOnRowClick?: boolean;
  highlight?: ListHighlightMode;
  active?: boolean;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  /** Router `Link` component used to render `href` rows (Next.js, TanStack Router, React Router). */
  linkAs?: ElementType;
  /** Prop name the router link receives `href` under (default `"href"`; use `"to"` for TanStack Router / React Router). */
  linkHrefProp?: string;
  selectionName?: string;
  chevronPosition?: ListChevronPosition;
  selectionPosition?: ListSelectionPosition;
  selectionIndicator?: Exclude<ListSelectionIndicator, "auto">;
  alignment?: ListAlignment;
  separator?: boolean;
  tabIndex?: number;
  selectRowLabel?: string;
  expandLabel?: string;
  collapseLabel?: string;
  posInSet?: number;
  setSize?: number;
  className?: string;
  onToggleSelect?: () => void;
  onToggleExpand?: () => void;
  onAction?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  onFocus?: () => void;
};

function SelectionControl({
  indicator,
  selected,
  indeterminate,
  disabled,
  selectionName,
  selectRowLabel = "Select row",
  onToggleSelect,
  className,
}: {
  indicator: Exclude<ListSelectionIndicator, "auto">;
  selected: boolean;
  indeterminate: boolean;
  disabled: boolean;
  selectionName?: string;
  selectRowLabel?: string;
  onToggleSelect?: () => void;
  className?: string;
}) {
  // Rows own the tab order (every enabled row is tabbable, arrows also
  // move, Space toggles), so the control stays out of it like the
  // chevron — otherwise Tab would hop control-to-control and skip every row.
  // The input keeps its label and stays in the accessibility tree, so screen
  // readers still announce state; pointer and row-keyboard toggling are
  // unaffected.
  if (indicator === "none") return null;
  if (indicator === "checkmark") {
    return (
      // Fixed `size-4` (16px) keeps the slot reserved when unchecked so labels
      // stay aligned across selected/unselected rows.
      <span data-slot="selection" className={cn("flex size-4 shrink-0 items-center justify-center", className)}>
        {selected && <Check aria-hidden="true" className="size-4 text-brand-primary" />}
      </span>
    );
  }
  if (indicator === "radio") {
    return (
      <span data-slot="selection" className={cn("flex shrink-0 items-center", className)}>
        <Radio
          size="sm"
          name={selectionName}
          checked={selected}
          disabled={disabled}
          tabIndex={-1}
          aria-label={selectRowLabel}
          onCheckedChange={() => onToggleSelect?.()}
        />
      </span>
    );
  }
  return (
    <span data-slot="selection" className={cn("flex shrink-0 items-center", className)}>
      <Checkbox
        size="sm"
        checked={selected}
        indeterminate={indeterminate}
        disabled={disabled}
        tabIndex={-1}
        aria-label={selectRowLabel}
        onCheckedChange={() => onToggleSelect?.()}
      />
    </span>
  );
}

function ExpandChevron({
  expanded,
  disabled,
  expandLabel = "Expand",
  collapseLabel = "Collapse",
  onToggleExpand,
  className,
}: {
  expanded: boolean;
  disabled: boolean;
  expandLabel?: string;
  collapseLabel?: string;
  onToggleExpand?: () => void;
  className?: string;
}) {
  return (
    // Fixed `size-4` (16px) slot keeps labels aligned across rows and keeps
    // rows from growing. The button inside uses `-m-1 p-1` compensation for a
    // 24px hit area, hover background, and focus ring without changing the
    // footprint — same trick as Input's `inputIconButtonBase`, with the shared
    // tertiary icon-button standard.
    <span data-slot="chevron-slot" className={cn("flex size-4 shrink-0 items-center justify-center", className)}>
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-expanded={expanded}
        aria-label={expanded ? collapseLabel : expandLabel}
        data-slot="chevron"
        onClick={(event) => {
          event.stopPropagation();
          onToggleExpand?.();
        }}
        className="-m-1 flex shrink-0 cursor-pointer items-center justify-center rounded-md p-1 text-tertiary outline-1 outline-transparent -outline-offset-1 transition-colors hover:bg-primary-hover hover:text-primary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        <ChevronRight aria-hidden="true" className={cn("size-4 transition-transform", expanded && "rotate-90")} />
      </button>
    </span>
  );
}

const ListItemRoot = forwardRef<HTMLElement, ListItemProps>(function ListItemRoot(
  {
    label,
    description,
    startContent,
    endContent,
    depth = 0,
    role = "listitem",
    selected = false,
    indeterminate = false,
    expanded = false,
    hasChildren = false,
    alignChevron = false,
    disabled = false,
    selectable = false,
    selectOnRowClick = true,
    highlight = "selection",
    active = false,
    href,
    target,
    linkAs,
    linkHrefProp = "href",
    selectionName,
    chevronPosition = "start",
    selectionPosition = "start",
    selectionIndicator = "checkbox",
    alignment = "start",
    separator = false,
    tabIndex,
    selectRowLabel,
    expandLabel,
    collapseLabel,
    posInSet,
    setSize,
    className,
    onToggleSelect,
    onToggleExpand,
    onAction,
    onKeyDown,
    onFocus,
  },
  ref,
) {
  const showChevron = chevronPosition !== "none" && (hasChildren || alignChevron);
  const showSelection = selectable && selectionPosition !== "none" && selectionIndicator !== "none";
  // The tint follows one state at a time: selected rows in `selection` mode,
  // the single active row in `active` mode, nothing in `none` mode.
  const highlightMatches: Record<ListHighlightMode, boolean> = { selection: selected, active, none: false };
  const highlighted = highlightMatches[highlight];
  const slotOffset = itemRowSlotOffset(alignment);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return;
    // Nested native controls own their activation: a checkbox/radio change,
    // a chevron button, and links inside a plain row already act exactly
    // once — the row must not act a second time. (When the row itself is the
    // anchor, only nested controls match here; the root anchor falls through
    // to native navigation below.)
    const targetElement = event.target as HTMLElement;
    if (targetElement.closest("button,input,label")) return;
    if (!href && targetElement.closest("a")) return;
    // Link wins: an href row navigates natively and never toggles selection
    // or expands — in selectable lists use the Checkbox/Radio control.
    if (!href) {
      if (selectable && selectOnRowClick) onToggleSelect?.();
      else if (hasChildren) onToggleExpand?.();
    }
    onAction?.();
  };

  const renderChevron = (position: ListChevronPosition) => {
    if (chevronPosition !== position || !showChevron) return null;
    if (!hasChildren) return <span aria-hidden="true" className={cn("size-4 shrink-0", slotOffset)} />;
    return (
      <ExpandChevron
        expanded={expanded}
        disabled={disabled}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        onToggleExpand={onToggleExpand}
        className={slotOffset}
      />
    );
  };

  const selectionControl = showSelection ? (
    <SelectionControl
      indicator={selectionIndicator}
      selected={selected}
      indeterminate={indeterminate}
      disabled={disabled}
      selectionName={selectionName}
      selectRowLabel={selectRowLabel}
      onToggleSelect={onToggleSelect}
      className={slotOffset}
    />
  ) : null;

  const rowClassName = itemRowClassName({
    variant: "list",
    alignment,
    background: highlighted ? "brand" : "none",
    disabled,
    separator,
    className,
  });

  const rowStyle = depth > 0 ? { paddingLeft: `calc(var(--spacing) * ${2 + depth * 4})` } : undefined;

  // One text color drives the label and the content icons so the row reads as a
  // single unit: soft by default, firmer on hover, brand when selected/active.
  // The chevron opts out and keeps its own subdued `text-tertiary`.
  const labelEmphasized = selected || active;

  const rowContent = (
    <ItemRowContent
      variant="list"
      alignment={alignment}
      label={label}
      description={description}
      startContent={startContent}
      endContent={endContent}
      chevronStart={renderChevron("start")}
      chevronEnd={renderChevron("end")}
      selectionStart={selectionPosition === "start" ? selectionControl : null}
      selectionEnd={selectionPosition === "end" ? selectionControl : null}
      emphasized={labelEmphasized}
      disabled={disabled}
    />
  );

  if (href) {
    const LinkComp: ElementType = linkAs ?? "a";
    const destination: Record<string, string | undefined> = linkAs ? { [linkHrefProp]: href } : { href };
    return (
      <LinkComp
        ref={ref as Ref<HTMLAnchorElement>}
        {...destination}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        role={role}
        tabIndex={tabIndex}
        aria-selected={selectable ? selected : undefined}
        aria-current={active ? "page" : undefined}
        aria-expanded={role === "treeitem" && hasChildren ? expanded : undefined}
        aria-level={role === "treeitem" ? depth + 1 : undefined}
        aria-posinset={role === "option" ? posInSet : undefined}
        aria-setsize={role === "option" ? setSize : undefined}
        aria-disabled={disabled || undefined}
        onFocus={onFocus}
        data-slot="row"
        data-depth={depth}
        data-selected={selectable && selected ? "true" : undefined}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        style={rowStyle}
        className={rowClassName}
      >
        {rowContent}
      </LinkComp>
    );
  }

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole lint/a11y/noStaticElementInteractions: rows are option/treeitem with aria-selected whenever selectable (listitem rows pass undefined); the role is assigned dynamically with full keyboard support.
    <div
      ref={ref as Ref<HTMLDivElement>}
      role={role}
      tabIndex={tabIndex}
      aria-selected={selectable ? selected : undefined}
      aria-current={active ? "page" : undefined}
      aria-expanded={role === "treeitem" && hasChildren ? expanded : undefined}
      aria-level={role === "treeitem" ? depth + 1 : undefined}
      aria-posinset={role === "option" ? posInSet : undefined}
      aria-setsize={role === "option" ? setSize : undefined}
      aria-disabled={disabled || undefined}
      onFocus={onFocus}
      data-slot="row"
      data-depth={depth}
      data-selected={selectable && selected ? "true" : undefined}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      style={rowStyle}
      className={rowClassName}
    >
      {rowContent}
    </div>
  );
});

ListItemRoot.displayName = "ListItem";

export const ListItem = ListItemRoot;

export type { ListItemContextValue };
