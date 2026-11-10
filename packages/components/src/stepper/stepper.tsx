import { Children, cloneElement, forwardRef, isValidElement, type ReactElement, type ReactNode, useState } from "react";

import { cn } from "@kdo/utils";
import { Check, X } from "lucide-react";

import type { StepperProps, StepperStepProps } from "./stepper.type";
import {
  type StepStatus,
  stepperActiveTones,
  stepperDescriptionSizes,
  stepperDotSizes,
  stepperIndicatorSizes,
  stepperStatusTones,
  stepperTitleColors,
  stepperTitleSizes,
} from "./stepper.variants";
import { StepperContext, useStepperContext } from "./stepper-context";

const StepperRoot = forwardRef<HTMLElement, StepperProps>(function StepperRoot(
  {
    activeStep,
    defaultActiveStep = 0,
    onStepChange,
    orientation = "horizontal",
    size = "md",
    color = "brand",
    indicator = "number",
    align = "left",
    dashed = false,
    linear = false,
    className,
    children,
    "aria-label": ariaLabel,
    ...props
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultActiveStep);
  const isControlled = activeStep !== undefined;
  const current = isControlled ? activeStep : internal;
  const interactive = onStepChange !== undefined;
  const horizontal = orientation === "horizontal";

  const goTo = (index: number) => {
    if (!isControlled) setInternal(index);
    onStepChange?.(index);
  };

  const items = Children.toArray(children);

  return (
    <StepperContext.Provider
      value={{ activeStep: current, orientation, size, color, indicator, align, dashed, interactive, linear, goTo }}
    >
      <nav
        ref={ref}
        aria-label={ariaLabel ?? "Progress"}
        data-slot="stepper"
        data-orientation={orientation}
        className={cn(horizontal && "w-full", className)}
        {...props}
      >
        <ol
          data-slot="stepper-list"
          className={cn(
            "flex list-none p-0",
            horizontal ? cn("flex-row", align === "center" ? "gap-0" : "gap-2") : "flex-col gap-2",
          )}
        >
          {items.map((child, index) =>
            isValidElement(child)
              ? cloneElement(child as ReactElement<StepperStepProps>, {
                  index,
                  first: index === 0,
                  last: index === items.length - 1,
                })
              : child,
          )}
        </ol>
      </nav>
    </StepperContext.Provider>
  );
});

StepperRoot.displayName = "Stepper";

export const StepperStep = forwardRef<HTMLLIElement, StepperStepProps>(function StepperStep(
  { title, description, endContent, icon, status, disabled = false, index = 0, first = false, last = false, className },
  ref,
) {
  const { activeStep, orientation, size, color, indicator, align, dashed, interactive, linear, goTo } =
    useStepperContext();
  const horizontal = orientation === "horizontal";
  let resolved: StepStatus;
  if (status !== undefined) resolved = status;
  else if (index < activeStep) resolved = "complete";
  else if (index === activeStep) resolved = "active";
  else resolved = "pending";
  const clickable = interactive && !disabled && (!linear || index <= activeStep);
  const isActive = resolved === "active";
  const isDot = indicator === "dot";

  const interactionClass = cn(
    clickable &&
      "cursor-pointer outline-1 -outline-offset-1 outline-transparent focus-visible:outline-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/50",
    disabled && "opacity-50",
  );

  const indicatorClass = cn(
    "flex shrink-0 items-center justify-center rounded-full border-2 font-medium",
    stepperIndicatorSizes[size],
    isActive ? stepperActiveTones[color] : stepperStatusTones[resolved],
    interactionClass,
  );

  let content: ReactNode;
  if (isDot) {
    content = (
      <span data-slot="dot" aria-hidden="true" className={cn("rounded-full bg-current", stepperDotSizes[size])} />
    );
  } else if (icon != null) {
    content = icon;
  } else if (resolved === "complete") {
    content = <Check aria-hidden="true" />;
  } else if (resolved === "error") {
    content = <X aria-hidden="true" />;
  } else {
    content = index + 1;
  }

  const indicatorNode = clickable ? (
    <button
      type="button"
      data-slot="indicator"
      aria-label={typeof title === "string" ? title : `Step ${index + 1}`}
      onClick={() => goTo(index)}
      className={indicatorClass}
    >
      {content}
    </button>
  ) : (
    <span data-slot="indicator" className={indicatorClass}>
      {content}
    </span>
  );

  const connector = last ? null : (
    <span
      data-slot="connector"
      aria-hidden="true"
      className={cn(
        horizontal ? "min-w-4 flex-1 border-t" : "min-h-4 flex-1 border-l",
        index < activeStep ? "border-success-primary" : "border-primary",
        dashed && "border-dashed",
      )}
    />
  );

  const text = (
    <>
      {title != null || endContent != null ? (
        <span className="flex min-w-0 items-center gap-2">
          {title != null ? (
            <span
              data-slot="title"
              className={cn("truncate font-medium", stepperTitleSizes[size], stepperTitleColors[resolved])}
            >
              {title}
            </span>
          ) : null}
          {endContent != null ? (
            <span data-slot="end" className="shrink-0">
              {endContent}
            </span>
          ) : null}
        </span>
      ) : null}
      {description != null ? (
        <span data-slot="description" className={cn("truncate text-tertiary", stepperDescriptionSizes[size])}>
          {description}
        </span>
      ) : null}
    </>
  );

  const centered = horizontal && align === "center";
  // A horizontal step without text is just an indicator. Let the last one hug
  // its content instead of taking an equal flex share, otherwise the empty
  // trailing column reads as a connector that is still there.
  const bareLast = last && title == null && description == null;

  let body: ReactNode;
  if (centered) {
    body = (
      <>
        <div className="relative flex w-full items-center justify-center">
          {!first ? (
            <span
              data-slot="connector"
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 right-1/2 left-0 h-0 -translate-y-1/2 border-t",
                index - 1 < activeStep ? "border-success-primary" : "border-primary",
                dashed && "border-dashed",
              )}
            />
          ) : null}
          {!last ? (
            <span
              data-slot="connector"
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 right-0 left-1/2 h-0 -translate-y-1/2 border-t",
                index < activeStep ? "border-success-primary" : "border-primary",
                dashed && "border-dashed",
              )}
            />
          ) : null}
          <span className="relative flex bg-primary px-2">{indicatorNode}</span>
        </div>
        <span data-slot="text" className="flex min-w-0 flex-col items-center text-center">
          {text}
        </span>
      </>
    );
  } else if (horizontal) {
    body = (
      <>
        <div className="flex items-center gap-2">
          {indicatorNode}
          {connector}
        </div>
        <span data-slot="text" className="flex min-w-0 flex-col items-start text-left">
          {text}
        </span>
      </>
    );
  } else {
    body = (
      <>
        <div className="flex flex-col items-center gap-2">
          {indicatorNode}
          {connector}
        </div>
        <div data-slot="text" className="flex min-w-0 flex-1 flex-col">
          {text}
        </div>
      </>
    );
  }

  return (
    <li
      ref={ref}
      data-slot="step"
      data-status={resolved}
      aria-current={resolved === "active" ? "step" : undefined}
      className={cn(
        "flex min-w-0",
        horizontal
          ? cn("flex-col gap-2", bareLast ? "flex-none" : "flex-1", centered && "items-center")
          : "flex-row gap-3",
        className,
      )}
    >
      {body}
    </li>
  );
});

StepperStep.displayName = "Stepper.Step";

export const Stepper = Object.assign(StepperRoot, {
  Step: StepperStep,
});
