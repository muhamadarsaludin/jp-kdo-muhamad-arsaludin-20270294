import type { FlatListRow, ListItemData, ListKey } from "./list.type";

export function childItems(item: ListItemData): ListItemData[] {
  return item.children ?? [];
}

export function collectDescendantKeys(item: ListItemData): ListKey[] {
  const keys: ListKey[] = [];
  const visit = (node: ListItemData) => {
    for (const child of node.children ?? []) {
      keys.push(child.key);
      visit(child);
    }
  };
  visit(item);
  return keys;
}

export function collectParentKeys(items: ListItemData[]): ListKey[] {
  const keys: ListKey[] = [];
  const visit = (nodes: ListItemData[]) => {
    for (const node of nodes) {
      if ((node.children ?? []).length > 0) {
        keys.push(node.key);
        visit(node.children ?? []);
      }
    }
  };
  visit(items);
  return keys;
}

export function resolveRowSelection(
  item: ListItemData,
  selected: ReadonlySet<ListKey>,
): { selected: boolean; indeterminate: boolean } {
  const descendants = collectDescendantKeys(item);
  if (descendants.length === 0) return { selected: selected.has(item.key), indeterminate: false };
  const selectedCount = descendants.filter((key) => selected.has(key)).length;
  if (selectedCount === descendants.length) {
    // Every descendant is selected — the branch reads as fully selected whether
    // or not the parent key itself is stored.
    return { selected: true, indeterminate: false };
  }
  // Partially selected, or only the parent key stored without its descendants:
  // surface indeterminate so a stale parent key can never look fully checked.
  if (selectedCount > 0 || selected.has(item.key)) {
    return { selected: false, indeterminate: true };
  }
  return { selected: false, indeterminate: false };
}

export type FlattenOptions<T extends ListItemData> = {
  expanded: ReadonlySet<ListKey>;
  groupBy?: (item: T) => string;
};

function appendBranch<T extends ListItemData>(
  rows: FlatListRow<T>[],
  nodes: T[],
  expanded: ReadonlySet<ListKey>,
  depth: number,
): void {
  for (const node of nodes) {
    rows.push({ type: "item", key: node.key, item: node, depth });
    const children = (node.children ?? []) as T[];
    if (children.length > 0 && expanded.has(node.key)) appendBranch(rows, children, expanded, depth + 1);
  }
}

export function flattenListItems<T extends ListItemData>(items: T[], options: FlattenOptions<T>): FlatListRow<T>[] {
  const rows: FlatListRow<T>[] = [];
  if (!options.groupBy) {
    appendBranch(rows, items, options.expanded, 0);
    return rows;
  }
  const seen = new Map<string, T[]>();
  for (const item of items) {
    const groupKey = options.groupBy(item);
    const group = seen.get(groupKey);
    if (group) group.push(item);
    else seen.set(groupKey, [item]);
  }
  for (const [groupKey, groupItems] of seen) {
    rows.push({ type: "group", key: `group-${groupKey}`, title: groupKey });
    appendBranch(rows, groupItems, options.expanded, 0);
  }
  return rows;
}

export function resolveVisibleRange(
  scrollTop: number,
  viewportHeight: number,
  offsets: number[],
  overscan: number,
): { start: number; end: number } {
  const count = offsets.length - 1;
  if (count <= 0) return { start: 0, end: 0 };
  const safeOverscan = Number.isFinite(overscan) ? Math.max(0, Math.floor(overscan)) : 0;
  const top = Math.max(0, scrollTop);
  const bottom = top + Math.max(0, viewportHeight);

  let low = 0;
  let high = count;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if ((offsets[mid] ?? 0) + ((offsets[mid + 1] ?? 0) - (offsets[mid] ?? 0)) <= top) low = mid + 1;
    else high = mid;
  }
  const first = low;

  low = first;
  high = count;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if ((offsets[mid] ?? 0) < bottom) low = mid + 1;
    else high = mid;
  }
  const last = low;

  return {
    start: Math.max(0, first - safeOverscan),
    end: Math.min(count, last + safeOverscan),
  };
}

/**
 * Canonicalize a multiple-selection key set so a parent key is stored if and
 * only if every key in its subtree is stored. Keeps `onSelectionChange` output
 * consistent no matter which click order produced it, and drops stale parent
 * keys left behind when a single child is deselected.
 */
export function canonicalizeSelectedKeys(items: ListItemData[], keys: ReadonlySet<ListKey>): ListKey[] {
  const next = new Set(keys);
  // Post-order (deepest parents first) so an outer branch observes the
  // already-canonicalized state of nested branches.
  const parents: ListItemData[] = [];
  const visit = (nodes: ListItemData[]) => {
    for (const node of nodes) {
      if ((node.children ?? []).length > 0) {
        visit(node.children ?? []);
        parents.push(node);
      }
    }
  };
  visit(items);
  for (const parent of parents) {
    const descendants = collectDescendantKeys(parent);
    if (descendants.every((key) => next.has(key))) {
      next.add(parent.key);
    } else {
      next.delete(parent.key);
    }
  }
  return [...next];
}

/** Sort keys in depth-first list order so `onSelectionChange` output is stable. */
export function sortKeysByItemOrder(items: ListItemData[], keys: Iterable<ListKey>): ListKey[] {
  const order = new Map<ListKey, number>();
  const visit = (nodes: ListItemData[]) => {
    for (const node of nodes) {
      if (!order.has(node.key)) order.set(node.key, order.size);
      visit(node.children ?? []);
    }
  };
  visit(items);
  return [...keys].sort(
    (a, b) => (order.get(a) ?? Number.MAX_SAFE_INTEGER) - (order.get(b) ?? Number.MAX_SAFE_INTEGER),
  );
}
