import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type Ref,
  type RefCallback,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";

import type {
  FlatListRow,
  ListItemContextValue,
  ListItemData,
  ListKey,
  ListProps,
  ListSelectionIndicator,
  ListSelectionMode,
} from "./list.type";
import { ListContext } from "./list-context";
import {
  canonicalizeSelectedKeys,
  childItems,
  collectDescendantKeys,
  collectParentKeys,
  flattenListItems,
  resolveRowSelection,
  resolveVisibleRange,
  sortKeysByItemOrder,
} from "./list-helpers";
import { ListItem } from "./list-item";

const DEFAULT_HEIGHT = 320;
const DEFAULT_ESTIMATED_ROW_HEIGHT = 57;
const DEFAULT_OVERSCAN = 3;

function toKeySet(keys: ListKey[]): Set<ListKey> {
  return new Set(keys);
}

/** Stable key for a flattened row, used for virtual height bookkeeping. */
function rowHeightKey(row: FlatListRow): string {
  if (row.type === "group" || row.type === "divider") return row.key;
  return `item-${String(row.key)}`;
}

function resolveIndicator(
  mode: ListSelectionMode,
  indicator: ListSelectionIndicator,
): Exclude<ListSelectionIndicator, "auto"> {
  // Intentional: multiple selection always renders checkboxes so the selected
  // rows stay visible; `auto` stays control-free for single/none so callers
  // opt into a radio/checkmark when they need one.
  if (mode === "multiple") return "checkbox";
  if (indicator !== "auto") return indicator;
  return "none";
}

function resolveRootRole(tree: boolean, selectable: boolean): "tree" | "listbox" | "list" {
  if (tree) return "tree";
  if (selectable) return "listbox";
  return "list";
}

function resolveRowRole(tree: boolean, selectable: boolean): "treeitem" | "option" | "listitem" {
  if (tree) return "treeitem";
  if (selectable) return "option";
  return "listitem";
}

export function List<T extends ListItemData = ListItemData>({
  items,
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys = [],
  onSelectionChange,
  required = false,
  selectOnRowClick = true,
  highlight = "selection",
  activeKey,
  defaultActiveKey,
  onActiveChange,
  expandedKeys,
  defaultExpandedKeys,
  defaultExpanded = true,
  onExpandedChange,
  groupBy,
  renderGroupHeader,
  stickyGroupHeaders = false,
  chevronPosition = "start",
  selectionPosition = "start",
  selectionIndicator = "auto",
  alignment = "start",
  separator = false,
  linkAs,
  linkHrefProp,
  itemRender,
  rowClassName,
  emptyContent,
  selectRowLabel,
  expandLabel,
  collapseLabel,
  virtual = false,
  height = DEFAULT_HEIGHT,
  estimatedRowHeight = DEFAULT_ESTIMATED_ROW_HEIGHT,
  overscan = DEFAULT_OVERSCAN,
  onItemAction,
  disabled = false,
  className,
  ref,
  ...props
}: ListProps<T> & { ref?: Ref<HTMLDivElement> }) {
  const radioGroupId = useId();
  const selectable = selectionMode !== "none";
  const resolvedIndicator = resolveIndicator(selectionMode, selectionIndicator);

  const [internalSelected, setInternalSelected] = useState<ListKey[]>(defaultSelectedKeys);
  const selected = useMemo(() => toKeySet(selectedKeys ?? internalSelected), [selectedKeys, internalSelected]);

  const [internalActive, setInternalActive] = useState<ListKey | undefined>(defaultActiveKey);
  const active = activeKey ?? internalActive;
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const [internalExpanded, setInternalExpanded] = useState<ListKey[]>(
    () => defaultExpandedKeys ?? (defaultExpanded ? collectParentKeys(items) : []),
  );
  // Auto-expand async-loaded branches: track every parent key ever seen and
  // expand newly appeared ones when `defaultExpanded` is set. Keys the user
  // explicitly collapsed stay collapsed because they are already seen.
  const seenParentsRef = useRef<Set<ListKey> | null>(null);
  useEffect(() => {
    if (expandedKeys !== undefined || defaultExpandedKeys !== undefined) return;
    const parents = collectParentKeys(items);
    if (seenParentsRef.current === null) {
      seenParentsRef.current = new Set(parents);
      if (defaultExpanded) {
        setInternalExpanded((previous) => {
          const missing = parents.filter((key) => !previous.includes(key));
          return missing.length > 0 ? [...previous, ...missing] : previous;
        });
      }
      return;
    }
    const seen = seenParentsRef.current;
    const fresh = parents.filter((key) => !seen.has(key));
    for (const key of parents) seen.add(key);
    if (defaultExpanded && fresh.length > 0) {
      setInternalExpanded((previous) => [...previous, ...fresh.filter((key) => !previous.includes(key))]);
    }
  }, [items, expandedKeys, defaultExpandedKeys, defaultExpanded]);
  const expanded = useMemo(() => toKeySet(expandedKeys ?? internalExpanded), [expandedKeys, internalExpanded]);

  const rows = useMemo(() => flattenListItems(items, { expanded, groupBy }), [items, expanded, groupBy]);
  // Separators render as standalone divider rows (a hairline `div` with no
  // radius) instead of a `border-t` on the rounded row, whose border would
  // follow the corner radius. Dividers sit between two item rows only — never
  // first, and never directly under a group header.
  const displayRows = useMemo(() => {
    if (!separator) return rows;
    const out: FlatListRow<T>[] = [];
    for (const row of rows) {
      if (row.type === "item" && out[out.length - 1]?.type === "item") {
        out.push({ type: "divider", key: `divider-${out.length}` });
      }
      out.push(row);
    }
    return out;
  }, [rows, separator]);
  const itemOrder = useMemo(() => {
    const positions = new Map<number, number>();
    let position = 0;
    for (const [index, row] of displayRows.entries()) {
      if (row.type !== "item") continue;
      position += 1;
      positions.set(index, position);
    }
    return { positions, total: position };
  }, [displayRows]);
  const hasNested = useMemo(() => collectParentKeys(items).length > 0, [items]);
  const rootRole = resolveRootRole(hasNested, selectable);
  const rowRole = resolveRowRole(hasNested, selectable);
  const roving = rootRole !== "list";

  const groupItems = useMemo(() => {
    if (!groupBy) return new Map<string, T[]>();
    const map = new Map<string, T[]>();
    for (const item of items) {
      const key = groupBy(item);
      const group = map.get(key);
      if (group) group.push(item);
      else map.set(key, [item]);
    }
    return map;
  }, [items, groupBy]);

  const toggleSelect = useCallback(
    (item: T) => {
      if (disabled || item.disabled) return;
      let next: ListKey[];
      if (selectionMode === "single") {
        if (selected.has(item.key)) {
          // Required single-select keeps the current key: switching is allowed,
          // clearing to empty is a no-op (no callback, no state change).
          if (required) return;
          next = [];
        } else {
          next = [item.key];
        }
      } else if (selectionMode === "multiple") {
        const descendants = collectDescendantKeys(item);
        const { selected: isSelected } = resolveRowSelection(item, selected);
        const raw = isSelected
          ? [...selected].filter((key) => key !== item.key && !descendants.includes(key))
          : [...selected, item.key, ...descendants.filter((key) => !selected.has(key))];
        // Drop stale parent keys (e.g. a deselected child's ancestors) and
        // re-add parents whose whole subtree ended up selected, then emit in
        // stable list order.
        next = sortKeysByItemOrder(items, canonicalizeSelectedKeys(items, new Set(raw)));
        // Required multiple-select keeps at least one key.
        if (required && next.length === 0) return;
      } else {
        return;
      }
      if (selectedKeys === undefined) setInternalSelected(next);
      onSelectionChange?.(next);
    },
    [disabled, items, selectionMode, selected, selectedKeys, onSelectionChange, required],
  );

  // Expand and collapse both apply instantly with no row animation: the rows
  // mount at full height in the same frame, so a slide-in would read as a
  // bounce (layout jump first, then drift). The chevron rotation is the only
  // motion and stays as the expand/collapse feedback.
  const toggleExpand = useCallback(
    (key: ListKey) => {
      if (disabled) return;
      const isExpanded = expanded.has(key);
      const next = isExpanded ? [...expanded].filter((k) => k !== key) : [...expanded, key];
      if (expandedKeys === undefined) setInternalExpanded(next);
      onExpandedChange?.(next);
    },
    [disabled, expanded, expandedKeys, onExpandedChange],
  );

  const setActiveKey = useCallback(
    (key: ListKey) => {
      if (disabled) return;
      if ((activeKey ?? internalActive) === key) return;
      if (activeKey === undefined) setInternalActive(key);
      onActiveChange?.(key);
    },
    [disabled, activeKey, internalActive, onActiveChange],
  );

  const activateRow = useCallback(
    (row: FlatListRow<T>) => {
      if (row.type !== "item" || disabled || row.item.disabled) return;
      if (highlight === "active") setActiveKey(row.item.key);
      if (selectable && selectOnRowClick) toggleSelect(row.item);
      else if (childItems(row.item).length > 0) toggleExpand(row.item.key);
      onItemAction?.(row.item);
    },
    [disabled, highlight, setActiveKey, selectable, selectOnRowClick, toggleSelect, toggleExpand, onItemAction],
  );

  const rowNodes = useRef(new Map<number, HTMLElement | null>());
  const refCallbacks = useRef(new Map<number, RefCallback<HTMLElement>>());
  const getRowRef = useCallback((flatIndex: number): RefCallback<HTMLElement> => {
    const cached = refCallbacks.current.get(flatIndex);
    if (cached) return cached;
    const callback: RefCallback<HTMLElement> = (node) => {
      if (node) rowNodes.current.set(flatIndex, node);
      else rowNodes.current.delete(flatIndex);
    };
    refCallbacks.current.set(flatIndex, callback);
    return callback;
  }, []);

  const focusableIndices = useMemo(() => {
    const indices: number[] = [];
    displayRows.forEach((row, index) => {
      // Disabled rows stay measurable/click-guarded but leave the tab order —
      // Tab and arrow-key navigation skip them.
      if (row.type === "item" && !disabled && !row.item.disabled) indices.push(index);
    });
    return indices;
  }, [displayRows, disabled]);
  const focusRow = useCallback((flatIndex: number) => {
    setFocusedIndex(flatIndex);
    const node = rowNodes.current.get(flatIndex);
    if (node) node.focus();
  }, []);
  const firstFocusable = focusableIndices[0] ?? -1;
  const tabbableIndex =
    roving && focusedIndex !== null && focusableIndices.includes(focusedIndex) ? focusedIndex : firstFocusable;

  const handleRowKeyDown = useCallback(
    (flatIndex: number, event: ReactKeyboardEvent) => {
      const pos = focusableIndices.indexOf(flatIndex);
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const next = event.key === "ArrowDown" ? pos + 1 : pos - 1;
        const target = focusableIndices[next];
        if (target !== undefined) focusRow(target);
        return;
      }
      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        const target = event.key === "Home" ? focusableIndices[0] : focusableIndices[focusableIndices.length - 1];
        if (target !== undefined) focusRow(target);
        return;
      }
      const row = displayRows[flatIndex];
      if (row?.type !== "item") return;
      const hasChildren = childItems(row.item).length > 0;
      if (event.key === "ArrowRight" && hasNested && hasChildren && !expanded.has(row.item.key)) {
        event.preventDefault();
        toggleExpand(row.item.key);
        return;
      }
      if (event.key === "ArrowLeft" && hasNested && hasChildren && expanded.has(row.item.key)) {
        event.preventDefault();
        toggleExpand(row.item.key);
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        // Link rows keep native anchor behavior (Enter navigates); the
        // `closest("a")` guard below also matches the root anchor itself.
        if (row.item.href) return;
        if ((event.target as HTMLElement).closest("button,input,a")) return;
        event.preventDefault();
        activateRow(row);
      }
    },
    [focusableIndices, focusRow, displayRows, hasNested, expanded, toggleExpand, activateRow],
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  // Measured row heights by stable row key (see `rowHeightKey`), so inserts,
  // reorders, and expand/collapse can never misattribute a height to the
  // wrong row.
  const [heights, setHeights] = useState<ReadonlyMap<string, number>>(new Map());
  const rafRef = useRef(0);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container === null) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setScrollTop(container.scrollTop));
  }, []);

  const offsets = useMemo(() => {
    const result: number[] = [0];
    let total = 0;
    for (let index = 0; index < displayRows.length; index += 1) {
      const row = displayRows[index];
      total += (row ? heights.get(rowHeightKey(row)) : undefined) ?? estimatedRowHeight;
      result.push(total);
    }
    return result;
  }, [displayRows, estimatedRowHeight, heights]);

  const totalHeight = offsets[offsets.length - 1] ?? 0;
  const measured = heights.size > 0;
  const windowed = virtual && measured;
  const visible = windowed
    ? resolveVisibleRange(scrollTop, height, offsets, overscan)
    : { start: 0, end: displayRows.length };

  // biome-ignore lint/correctness/useExhaustiveDependencies: measuring must also re-run when the rendered window shifts on scroll, which is only observable via visible.start/end; the heights equality guard inside terminates the update cycle.
  useEffect(() => {
    if (!virtual) return;
    const measure = () => {
      const alive = new Set<string>();
      for (const row of displayRows) alive.add(rowHeightKey(row));
      setHeights((previous) => {
        // Merge fresh measurements over previous ones (rows outside the
        // current window keep their heights) and drop keys that no longer
        // exist so the map cannot grow without bound.
        const next = new Map<string, number>();
        for (const [key, value] of previous) {
          if (alive.has(key)) next.set(key, value);
        }
        for (const [index, node] of rowNodes.current) {
          const row = displayRows[index];
          if (!row || !node) continue;
          const measuredHeight = node.getBoundingClientRect().height ?? 0;
          if (measuredHeight > 0) next.set(rowHeightKey(row), measuredHeight);
        }
        if (next.size === previous.size && [...next].every(([key, value]) => previous.get(key) === value)) {
          return previous;
        }
        return next;
      });
      // Drop cached ref callbacks for indices that no longer exist.
      for (const index of [...refCallbacks.current.keys()]) {
        if (index >= displayRows.length) {
          refCallbacks.current.delete(index);
          rowNodes.current.delete(index);
        }
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [displayRows, virtual, visible.start, visible.end]);

  const renderRow = (row: FlatListRow<T>, flatIndex: number) => {
    if (row.type === "divider") {
      // Standalone hairline (`hr` carries the implicit separator role) with
      // no radius, so the line stays straight unlike a `border-t` on the
      // rounded row.
      if (!windowed) {
        return <hr key={row.key} role="presentation" data-slot="separator" className="mx-2 border-primary border-t" />;
      }
      return (
        <div
          key={row.key}
          role="presentation"
          data-slot="virtual-row"
          ref={getRowRef(flatIndex)}
          style={{ position: "absolute", top: offsets[flatIndex] ?? 0, left: 0, right: 0 }}
        >
          <hr role="presentation" data-slot="separator" className="mx-2 border-primary border-t" />
        </div>
      );
    }

    if (row.type === "group") {
      const groupKey = row.key.replace(/^group-/, "");

      const header = (
        <div
          data-slot="group-header"
          className={cn(
            "px-3 py-1.5 font-semibold text-tertiary text-xs uppercase tracking-wide",
            // Sticky positioning conflicts with the absolute-positioned virtual
            // window, so it only applies to non-virtual lists.
            stickyGroupHeaders && !windowed && "sticky top-0 z-[1] bg-primary",
          )}
        >
          {renderGroupHeader?.(groupKey, groupItems.get(groupKey) ?? []) ?? row.title}
        </div>
      );
      if (!windowed)
        return (
          <div key={row.key} role="presentation">
            {header}
          </div>
        );
      // In virtual mode headers participate in measurement and absolute
      // positioning exactly like item rows.
      return (
        <div
          key={row.key}
          role="presentation"
          data-slot="virtual-row"
          ref={getRowRef(flatIndex)}
          style={{ position: "absolute", top: offsets[flatIndex] ?? 0, left: 0, right: 0 }}
        >
          {header}
        </div>
      );
    }

    const { item, depth } = row;
    let rowDisabled = disabled;
    if (item.disabled === true) rowDisabled = true;
    const hasChildren = childItems(item).length > 0;
    const { selected: isSelected, indeterminate } = selectable
      ? resolveRowSelection(item, selected)
      : { selected: false, indeterminate: false };
    const isExpanded = expanded.has(item.key);
    // Every enabled row is tabbable so Tab walks row-to-row in DOM order;
    // disabled rows (and dividers/headers) stay out of the tab order.
    let tabIndex: number | undefined;
    if (focusableIndices.includes(flatIndex)) tabIndex = roving && flatIndex !== tabbableIndex ? -1 : 0;

    // Custom rows draw their own divider via `context.separator`; default
    // rows rely on the standalone divider rows above.
    const rowSeparator = separator && displayRows[flatIndex - 1]?.type === "divider";

    const context: ListItemContextValue = {
      depth,
      selected: isSelected,
      indeterminate,
      expanded: isExpanded,
      disabled: rowDisabled,
      hasChildren,
      active: highlight === "active" && active === item.key,
      toggleSelect: () => toggleSelect(item),
      toggleExpand: () => toggleExpand(item.key),
      setActive: () => setActiveKey(item.key),
      activate: () => onItemAction?.(item),
      tabIndex,
      posInSet: itemOrder.positions.get(flatIndex) ?? 0,
      setSize: itemOrder.total,
      separator: rowSeparator,
      rowClassName,
      onKeyDown: (event) => handleRowKeyDown(flatIndex, event),
      onFocus: () => setFocusedIndex(flatIndex),
      rowRef: getRowRef(flatIndex),
    };

    const content = itemRender?.(item, context) ?? (
      <ListItem
        ref={context.rowRef}
        label={item.label}
        description={item.description}
        startContent={item.startContent}
        endContent={item.endContent}
        depth={depth}
        role={rowRole}
        selected={isSelected}
        indeterminate={indeterminate}
        expanded={isExpanded}
        hasChildren={hasChildren}
        alignChevron={hasNested}
        disabled={rowDisabled}
        selectable={selectable}
        selectOnRowClick={selectOnRowClick}
        highlight={highlight}
        active={highlight === "active" && active === item.key}
        href={item.href}
        target={item.target}
        linkAs={linkAs}
        linkHrefProp={linkHrefProp}
        selectionName={selectionMode === "single" ? radioGroupId : undefined}
        selectRowLabel={selectRowLabel}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        chevronPosition={chevronPosition}
        selectionPosition={selectionPosition}
        selectionIndicator={resolvedIndicator}
        alignment={alignment}
        separator={false}
        tabIndex={tabIndex}
        posInSet={itemOrder.positions.get(flatIndex) ?? 0}
        setSize={itemOrder.total}
        onFocus={() => setFocusedIndex(flatIndex)}
        className={rowClassName}
        onToggleSelect={() => toggleSelect(item)}
        onToggleExpand={() => toggleExpand(item.key)}
        // Mouse clicks land here (keyboard goes through `activateRow`); both
        // must move the tint in `active` mode.
        onAction={() => {
          if (highlight === "active") setActiveKey(item.key);
          onItemAction?.(item);
        }}
        onKeyDown={(event) => handleRowKeyDown(flatIndex, event)}
      />
    );

    return (
      <ListContext.Provider key={`${String(item.key)}-${depth}`} value={context}>
        {windowed ? (
          <div
            role="presentation"
            data-slot="virtual-row"
            style={{ position: "absolute", top: offsets[flatIndex] ?? 0, left: 0, right: 0 }}
          >
            {content}
          </div>
        ) : (
          content
        )}
      </ListContext.Provider>
    );
  };

  let body: ReactNode;
  if (displayRows.length === 0) {
    body = emptyContent ?? <p className="px-3 py-6 text-center text-sm text-tertiary">No items</p>;
  } else if (windowed) {
    body = (
      <div data-slot="virtual-spacer" style={{ position: "relative", height: totalHeight }}>
        {displayRows.slice(visible.start, visible.end).map((row, index) => renderRow(row, visible.start + index))}
      </div>
    );
  } else {
    body = displayRows.map((row, flatIndex) => renderRow(row, flatIndex));
  }

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: the root is listbox/tree with aria-multiselectable whenever multiple; plain lists pass undefined.
    <div
      ref={setRootRef}
      role={rootRole}
      aria-multiselectable={selectionMode === "multiple" || undefined}
      onScroll={virtual ? handleScroll : undefined}
      style={virtual ? { height } : undefined}
      className={cn(virtual && "overflow-y-auto", className)}
      {...props}
    >
      {body}
    </div>
  );
}

List.displayName = "List";
