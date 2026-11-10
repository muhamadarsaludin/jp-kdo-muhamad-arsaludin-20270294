import { cn } from "@kdo/utils";
import { Check } from "lucide-react";

export type SelectionMarkKind = "radio" | "checkmark" | "checkbox";

/**
 * Visual-only selection mark for menus. Unlike the radio/checkbox controls in
 * `List`, this renders no nested input: a `menuitemradio` must not contain a
 * second interactive control, so the row itself owns the state and the mark is
 * decorative (`aria-hidden`).
 */
export function SelectionMark({
  kind,
  selected,
  className,
}: {
  kind: SelectionMarkKind;
  selected: boolean;
  className?: string;
}) {
  if (kind === "checkmark") {
    return (
      <span
        data-slot="selection"
        className={cn("flex size-4 shrink-0 items-center justify-center", className)}
      >
        {selected && <Check aria-hidden="true" className="size-4 text-brand-primary" />}
      </span>
    );
  }

  if (kind === "checkbox") {
    return (
      <span
        data-slot="selection"
        className={cn("flex size-4 shrink-0 items-center justify-center", className)}
      >
        <span
          aria-hidden="true"
          data-state={selected ? "checked" : "unchecked"}
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-sm bg-primary outline-1 -outline-offset-1 transition-colors",
            selected ? "bg-brand-primary outline-brand-primary" : "outline-primary",
          )}
        >
          {selected && <Check className="size-3 text-primary-inverse" />}
        </span>
      </span>
    );
  }

  return (
    <span
      data-slot="selection"
      className={cn("flex size-4 shrink-0 items-center justify-center", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full bg-primary outline-1 -outline-offset-1 transition-colors",
          selected ? "outline-brand-primary" : "outline-primary",
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full bg-brand-primary transition-transform",
            selected ? "scale-100" : "scale-0",
          )}
        />
      </span>
    </span>
  );
}
