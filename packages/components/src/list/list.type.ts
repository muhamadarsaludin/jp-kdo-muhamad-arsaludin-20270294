import type {
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributeAnchorTarget,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  RefCallback,
} from "react";

export type ListKey = string | number;

export type ListSelectionMode = "none" | "single" | "multiple";

export type ListSelectionIndicator = "auto" | "checkbox" | "radio" | "checkmark" | "none";

export type ListHighlightMode = "selection" | "active" | "none";

export type ListAlignment = "start" | "center" | "end";

export type ListChevronPosition = "start" | "end" | "none";

export type ListSelectionPosition = "start" | "end" | "none";

export type ListItemData = {
  key: ListKey;
  label: ReactNode;
  description?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  disabled?: boolean;
  /** Renders the row as an anchor (navigation). Row click/Enter navigates natively and never toggles selection or expands — in selectable lists use the Checkbox/Radio control. */
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  children?: ListItemData[];
};

/**
 * Router link adapter: the component that renders `href` rows. Use the router's
 * own `Link` (Next.js, TanStack Router, React Router) so navigation stays
 * client-side. Set `linkHrefProp` when the prop name differs from `href`
 * (e.g. `"to"` for TanStack Router / React Router).
 */
export type ListLinkProps = {
  linkAs?: ElementType;
  linkHrefProp?: string;
};

export type FlatListRow<T extends ListItemData = ListItemData> =
  | { type: "group"; key: string; title: ReactNode }
  | { type: "divider"; key: string }
  | { type: "item"; key: ListKey; item: T; depth: number };

export type ListProps<T extends ListItemData = ListItemData> = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> &
  ListLinkProps & {
    items: T[];
    selectionMode?: ListSelectionMode;
    selectedKeys?: ListKey[];
    defaultSelectedKeys?: ListKey[];
    onSelectionChange?: (keys: ListKey[]) => void;
    /** When true the selection can never become empty: single keeps the current key (switch allowed), multiple keeps at least one key. */
    required?: boolean;
    /** When false, clicking (or Enter/Space on) the row never toggles selection — only the Checkbox/Radio control does. `onItemAction` still fires. */
    selectOnRowClick?: boolean;
    /** Which state paints the row background: `selection` tints selected rows, `active` tints the single active row (see `activeKey`), `none` never tints. */
    highlight?: ListHighlightMode;
    /** Controlled active row (only visible when `highlight="active"`). */
    activeKey?: ListKey;
    /** Uncontrolled initial active row. */
    defaultActiveKey?: ListKey;
    /** Fires when the active row changes (row click or Enter/Space). Re-clicking the active row is a no-op. */
    onActiveChange?: (key: ListKey) => void;
    expandedKeys?: ListKey[];
    defaultExpandedKeys?: ListKey[];
    defaultExpanded?: boolean;
    onExpandedChange?: (keys: ListKey[]) => void;
    groupBy?: (item: T) => string;
    renderGroupHeader?: (key: string, items: T[]) => ReactNode;
    stickyGroupHeaders?: boolean;
    chevronPosition?: ListChevronPosition;
    selectionPosition?: ListSelectionPosition;
    selectionIndicator?: ListSelectionIndicator;
    alignment?: ListAlignment;
    separator?: boolean;
    itemRender?: (item: T, context: ListItemContextValue) => ReactNode;
    rowClassName?: string;
    emptyContent?: ReactNode;
    /** Accessible label for the selection checkbox/radio on every row. */
    selectRowLabel?: string;
    /** Accessible label for an expandable row's chevron when collapsed. */
    expandLabel?: string;
    /** Accessible label for an expandable row's chevron when expanded. */
    collapseLabel?: string;
    virtual?: boolean;
    height?: number;
    estimatedRowHeight?: number;
    overscan?: number;
    onItemAction?: (item: T) => void;
    disabled?: boolean;
  };

export type ListItemContextValue = {
  depth: number;
  selected: boolean;
  indeterminate: boolean;
  expanded: boolean;
  disabled: boolean;
  hasChildren: boolean;
  /** True when this row is the active row and `highlight="active"`. */
  active: boolean;
  toggleSelect: () => void;
  toggleExpand: () => void;
  /** Mark this row active (only meaningful when `highlight="active"`). */
  setActive: () => void;
  /** Fire `onItemAction` for the row (custom rows decide when activation fires). */
  activate: () => void;
  tabIndex: number | undefined;
  posInSet: number;
  setSize: number;
  separator: boolean;
  /** Extra classes forwarded from the List `rowClassName` prop. */
  rowClassName: string | undefined;
  onKeyDown: (event: ReactKeyboardEvent) => void;
  onFocus: () => void;
  rowRef: RefCallback<HTMLElement>;
};
