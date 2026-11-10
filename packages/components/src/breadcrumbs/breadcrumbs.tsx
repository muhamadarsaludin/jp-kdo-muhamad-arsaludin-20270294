import { cn } from "@kdo/utils";
import { ChevronRight, Ellipsis } from "lucide-react";
import type { ElementType, ReactNode } from "react";

import { Popover } from "../popover";
import type { BreadcrumbItem, BreadcrumbsProps } from "./breadcrumbs.type";

function DefaultSeparator() {
  return <ChevronRight className="size-3.5 shrink-0 text-tertiary" aria-hidden="true" />;
}

type Step = { kind: "item"; item: BreadcrumbItem } | { kind: "ellipsis"; items: BreadcrumbItem[] };

export function Breadcrumbs({
  items,
  linkAs,
  linkHrefProp = "href",
  separator,
  maxItems,
  ellipsisLabel = "Show hidden breadcrumbs",
  className,
  ...props
}: BreadcrumbsProps) {
  const LinkComp: ElementType = linkAs ?? "a";
  const destination = (item: BreadcrumbItem): Record<string, string | undefined> =>
    linkAs ? { [linkHrefProp]: item.href } : { href: item.href };

  const collapsing = maxItems !== undefined && items.length > Math.max(2, maxItems);
  const tailCount = Math.max(1, (maxItems ?? items.length) - 1);
  const firstItem = items[0];
  const steps: Step[] =
    collapsing && firstItem !== undefined
      ? [
          { kind: "item", item: firstItem },
          { kind: "ellipsis", items: items.slice(1, items.length - tailCount) },
          ...items.slice(items.length - tailCount).map((item): Step => ({ kind: "item", item })),
        ]
      : items.map((item): Step => ({ kind: "item", item }));

  const linkFocus =
    "rounded-sm -m-1 p-1 outline-1 -outline-offset-1 outline-transparent focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50";

  // The icon sits outside the truncating label, so a long label clips without
  // squeezing the icon; without an icon the label stays the element's own text.
  const renderLabel = (item: BreadcrumbItem): ReactNode =>
    item.icon ? (
      <>
        <span
          data-slot="icon"
          aria-hidden="true"
          className="flex shrink-0 items-center [&>svg]:size-3.5"
        >
          {item.icon}
        </span>
        <span className="truncate">{item.label}</span>
      </>
    ) : (
      item.label
    );

  const layout = (item: BreadcrumbItem, className: string): string =>
    cn(className, item.icon ? "inline-flex min-w-0 items-center gap-1.5" : "truncate");

  const renderItem = (item: BreadcrumbItem, isLast: boolean): ReactNode => {
    if (isLast) {
      return (
        <span aria-current="page" className={layout(item, "font-medium text-brand-primary")}>
          {renderLabel(item)}
        </span>
      );
    }
    if (item.href) {
      return (
        <LinkComp
          {...destination(item)}
          className={layout(
            item,
            cn(linkFocus, "text-tertiary transition-colors hover:text-primary"),
          )}
        >
          {renderLabel(item)}
        </LinkComp>
      );
    }
    return <span className={layout(item, "text-tertiary")}>{renderLabel(item)}</span>;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex min-w-0 items-center gap-1 text-sm", className)}
      {...props}
    >
      <ol className="flex min-w-0 items-center gap-1">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: breadcrumb steps are positional and have no stable id.
            <li key={index} className="flex min-w-0 items-center gap-1">
              {index > 0 ? (
                <span className="flex shrink-0 items-center">
                  {separator ?? <DefaultSeparator />}
                </span>
              ) : null}
              {step.kind === "ellipsis" ? (
                <Popover
                  defaultPosition="bottom-start"
                  trigger={
                    <button
                      type="button"
                      aria-label={ellipsisLabel}
                      className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-tertiary outline-1 outline-transparent -outline-offset-1 transition-colors hover:bg-primary-hover hover:text-primary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50"
                    >
                      <Ellipsis className="size-3.5" aria-hidden="true" />
                    </button>
                  }
                >
                  <ul className="flex min-w-32 flex-col p-1">
                    {step.items.map((item, itemIndex) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: hidden items are positional and have no stable id.
                      <li key={itemIndex}>
                        {item.href ? (
                          <LinkComp
                            {...destination(item)}
                            className={cn(
                              "flex rounded-md px-2 py-1.5 text-sm text-tertiary outline-1 outline-transparent -outline-offset-1 transition-colors hover:bg-primary-hover hover:text-primary focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
                              item.icon && "items-center gap-1.5",
                            )}
                          >
                            {renderLabel(item)}
                          </LinkComp>
                        ) : (
                          <span
                            className={cn(
                              "flex rounded-md px-2 py-1.5 text-sm text-tertiary",
                              item.icon && "items-center gap-1.5",
                            )}
                          >
                            {renderLabel(item)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Popover>
              ) : (
                renderItem(step.item, isLast)
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
