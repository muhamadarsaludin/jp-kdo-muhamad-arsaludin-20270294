import {
  Children,
  Fragment,
  forwardRef,
  isValidElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@kdo/utils";
import { ChevronDown } from "lucide-react";

import { Badge } from "../badge/badge";
import { FieldContext } from "../field/field-context";
import { Input } from "../input/input";
import { Popover } from "../popover/popover";
import { PopoverLabel, PopoverSeparator } from "../popover/popover-parts";
import type { SelectProps } from "./select.type";
import { focusSelectTrigger, SelectContext, useSelectContext } from "./select-context";
import { SelectOption } from "./select-option";

type OptionMeta = {
  value: string;
  label: string;
  disabled: boolean;
};

type OptionElementProps = {
  value?: unknown;
  disabled?: unknown;
  children?: ReactNode;
};

function eachOptionElement(children: ReactNode, visit: (props: OptionElementProps) => void): void {
  Children.forEach(children, (child) => {
    if (!isValidElement<OptionElementProps>(child)) return;
    if (child.type === Fragment) {
      eachOptionElement(child.props.children, visit);
      return;
    }
    visit(child.props);
  });
}

function optionMetas(children: ReactNode): OptionMeta[] {
  const metas: OptionMeta[] = [];
  eachOptionElement(children, ({ value, disabled, children: label }) => {
    if (typeof value !== "string") return;
    metas.push({ value, disabled: disabled === true, label: typeof label === "string" ? label : "" });
  });
  return metas;
}

function findOptionLabels(children: ReactNode, values: string[]): string[] {
  const metas = optionMetas(children);
  return values.map((value) => {
    const meta = metas.find((candidate) => candidate.value === value);
    if (meta === undefined) return value;
    return meta.label !== "" ? meta.label : meta.value;
  });
}

function scrollIntoViewIfNeeded(node: HTMLElement | undefined): void {
  if (node === undefined) return;
  if (typeof node.scrollIntoView === "function") node.scrollIntoView({ block: "nearest" });
}

const SelectListbox = forwardRef<
  HTMLDivElement,
  { id: string; children?: ReactNode; labelledBy?: string; label?: string; multiple: boolean }
>(function SelectListbox({ id, children, labelledBy, label, multiple }, ref) {
  const { selectedValues, activeValue, setActiveValue } = useSelectContext();
  const listRef = useRef<HTMLDivElement | null>(null);
  const typeBuffer = useRef("");
  const typeTimer = useRef<number | null>(null);

  const setListRef = useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const enabledNodes = useCallback(() => {
    if (listRef.current === null) return [];
    return Array.from(listRef.current.querySelectorAll<HTMLElement>('[role="option"]:not([disabled])'));
  }, []);

  const focusNode = useCallback(
    (node: HTMLElement | undefined, label: string | undefined) => {
      if (node === undefined) return;
      node.focus();
      scrollIntoViewIfNeeded(node);
      if (label !== undefined) setActiveValue(label);
    },
    [setActiveValue],
  );

  // The listbox mounts fresh on every open (the portal unmounts on close),
  // so one mount effect covers initial focus: the first selected option, else
  // the first enabled one.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional mount-only effect; re-running on children/selection change would steal focus mid-interaction.
  useEffect(() => {
    const nodes = enabledNodes();
    if (nodes.length === 0) return;
    const values = nodes.map((node) => node.dataset.optionValue);
    let target = 0;
    if (selectedValues.length > 0) {
      const selected = values.findIndex((value) => value !== undefined && selectedValues.includes(value));
      if (selected !== -1) target = selected;
    }
    const node = nodes[target];
    setActiveValue(node?.dataset.optionValue);
    node?.focus();
    scrollIntoViewIfNeeded(node);
  }, []);

  useEffect(
    () => () => {
      if (typeTimer.current !== null) window.clearTimeout(typeTimer.current);
    },
    [],
  );

  const step = useCallback(
    (direction: 1 | -1 | "first" | "last") => {
      const nodes = enabledNodes();
      if (nodes.length === 0) return;
      if (direction === "first" || direction === "last") {
        const edge = direction === "first" ? nodes[0] : nodes[nodes.length - 1];
        focusNode(edge, edge?.dataset.optionValue);
        return;
      }
      const active = document.activeElement as HTMLElement | null;
      const current = active === null ? -1 : nodes.indexOf(active);
      const next = nodes[(current + direction + nodes.length) % nodes.length];
      focusNode(next, next?.dataset.optionValue);
    },
    [enabledNodes, focusNode],
  );

  const typeAhead = useCallback(
    (character: string) => {
      const metas = optionMetas(children).filter((meta) => !meta.disabled && meta.label !== "");
      if (metas.length === 0) return;
      if (typeTimer.current !== null) window.clearTimeout(typeTimer.current);
      typeTimer.current = window.setTimeout(() => {
        typeBuffer.current = "";
      }, 500);
      typeBuffer.current = `${typeBuffer.current}${character}`.slice(-8);
      const query = typeBuffer.current.toLowerCase();
      const values = metas.map((meta) => meta.value);
      const start = activeValue === undefined ? 0 : (values.indexOf(activeValue) + 1) % values.length;
      for (let offset = 0; offset < values.length; offset += 1) {
        const meta = metas[(start + offset) % metas.length];
        if (meta?.label.toLowerCase().startsWith(query) === true) {
          const nodes = enabledNodes();
          const node = nodes.find((candidate) => candidate.dataset.optionValue === meta.value);
          focusNode(node, meta.value);
          return;
        }
      }
    },
    [children, activeValue, enabledNodes, focusNode],
  );

  const handleListKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        step(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        step(-1);
        break;
      case "Home":
        event.preventDefault();
        step("first");
        break;
      case "End":
        event.preventDefault();
        step("last");
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey)
          typeAhead(event.key.toLowerCase());
        break;
    }
  };

  return (
    <div
      ref={setListRef}
      id={id}
      role="listbox"
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-multiselectable={multiple || undefined}
      onKeyDown={handleListKeyDown}
      data-slot="listbox"
      className="min-w-40 p-1 outline-none"
    >
      {children}
    </div>
  );
});

const SelectRoot = forwardRef<HTMLDivElement, SelectProps>(function SelectRoot(props, ref) {
  const {
    children,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select an option",
    disabled = false,
    required,
    id,
    status,
    size = "md",
    variant,
    startContent,
    endContent,
    startAddOnContent,
    endAddOnContent,
    open,
    defaultOpen = false,
    onOpenChange,
    onKeyDown,
    selectAllValue,
    position = "bottom-start",
    offset = 8,
    matchTriggerWidth = true,
    contentClassName,
    className,
    selectionMode = "single",
    selectionIndicator = "none",
    selectionPosition = "start",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;

  const fieldCtx = useContext(FieldContext);
  const effectiveId = id ?? fieldCtx?.controlId;
  const describedBy =
    [ariaDescribedBy, fieldCtx?.descriptionPresent ? fieldCtx.descriptionId : undefined].filter(Boolean).join(" ") ||
    undefined;
  const multiple = selectionMode === "multiple";
  const listboxId = useId();

  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue);
  const isValueControlled = value !== undefined;
  const currentValue = isValueControlled ? value : internalValue;
  let selectedValues: string[];
  if (multiple) {
    selectedValues = Array.isArray(currentValue) ? currentValue : [];
  } else {
    selectedValues = typeof currentValue === "string" ? [currentValue] : [];
  }

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? open : internalOpen;
  const [activeValue, setActiveValue] = useState<string | undefined>(undefined);

  const popoverRef = useRef<HTMLDivElement | null>(null);

  const openTray = useCallback(() => {
    if (disabled) return;
    if (!isOpenControlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [disabled, isOpenControlled, onOpenChange]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange],
  );

  const setPopoverRef = useCallback(
    (node: HTMLDivElement | null) => {
      popoverRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const selectOption = useCallback(
    (next: string) => {
      setActiveValue(next);

      if (multiple) {
        const isSelected = selectedValues.includes(next);
        if (required && isSelected && selectedValues.length === 1) return;
        const nextValues = isSelected ? selectedValues.filter((item) => item !== next) : [...selectedValues, next];
        if (!isValueControlled) setInternalValue(nextValues);
        (onValueChange as ((values: string[]) => void) | undefined)?.(nextValues);
        return;
      }

      if (next !== selectedValues[0]) {
        if (!isValueControlled) setInternalValue(next);
        (onValueChange as ((value: string) => void) | undefined)?.(next);
      }
      if (!isOpenControlled) setInternalOpen(false);
      onOpenChange?.(false);
      focusSelectTrigger(popoverRef.current);
    },
    [multiple, required, selectedValues, isValueControlled, onValueChange, isOpenControlled, onOpenChange],
  );

  const selectedLabels = findOptionLabels(children, selectedValues);
  const selectedCount = selectedValues.length;
  const displaySelectedValues =
    multiple && selectAllValue && selectedValues.includes(selectAllValue)
      ? [...new Set([...selectedValues, ...optionMetas(children).map((meta) => meta.value)])]
      : selectedValues;

  const handleFieldKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (disabled || isOpen) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openTray();
  };

  const chevron = (
    <ChevronDown
      aria-hidden="true"
      className={cn("size-4 shrink-0 text-tertiary transition-transform", isOpen && "-rotate-180")}
    />
  );

  const triggerEndContent =
    multiple && selectedCount > 0 ? (
      <span className="flex items-center gap-1.5">
        <Badge size="sm" shape="rounded" variant="subtle" color="brand">
          {selectedCount}
        </Badge>
        {endContent ?? chevron}
      </span>
    ) : (
      (endContent ?? chevron)
    );

  const trigger = (
    <Input
      id={effectiveId}
      aria-describedby={describedBy}
      size={size}
      variant={variant}
      status={status}
      required={required}
      disabled={disabled}
      readOnly
      role="combobox"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={isOpen ? listboxId : undefined}
      value={selectedLabels.join(", ")}
      placeholder={placeholder}
      onKeyDown={handleFieldKeyDown}
      startContent={startContent}
      endContent={triggerEndContent}
      startAddOnContent={startAddOnContent}
      endAddOnContent={endAddOnContent}
      className="[&_input]:cursor-pointer"
    />
  );

  return (
    <div className={cn("w-full min-w-0", className)} {...rest}>
      <SelectContext.Provider
        value={{
          selectionMode,
          selectedValues: displaySelectedValues,
          activeValue,
          selectionIndicator,
          selectionPosition,
          selectOption,
          setActiveValue,
        }}
      >
        <Popover
          ref={setPopoverRef}
          trigger={trigger}
          open={isOpen}
          onOpenChange={handleOpenChange}
          disabled={disabled}
          defaultPosition={position}
          offset={offset}
          hasPopup="listbox"
          contentRole="presentation"
          matchTriggerWidth={matchTriggerWidth}
          contentClassName={contentClassName}
          className="w-full"
        >
          <SelectListbox id={listboxId} label={ariaLabel} labelledBy={ariaLabelledBy} multiple={multiple}>
            {children}
          </SelectListbox>
        </Popover>
      </SelectContext.Provider>
    </div>
  );
});

SelectRoot.displayName = "Select";

export const Select = Object.assign(SelectRoot, {
  Option: SelectOption,
  Label: PopoverLabel,
  Separator: PopoverSeparator,
});
