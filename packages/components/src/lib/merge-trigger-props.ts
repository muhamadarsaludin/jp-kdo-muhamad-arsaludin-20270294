import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

type TriggerProps = Record<string, unknown>;

/**
 * Injects interaction props into the actual trigger element. The element's
 * own props win so a consumer can override any state it owns; `aria-describedby`
 * is merged because both a consumer description and a tooltip can be valid.
 */
export function mergeTriggerProps(trigger: ReactNode, injected: TriggerProps): ReactNode {
  if (!isValidElement<TriggerProps>(trigger)) return trigger;

  const own = trigger.props;
  const describedBy = [injected["aria-describedby"], own["aria-describedby"]]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .join(" ");

  const merged: TriggerProps = { ...injected, ...own };
  if (describedBy !== "") merged["aria-describedby"] = describedBy;

  return cloneElement(trigger as ReactElement<TriggerProps>, merged);
}
