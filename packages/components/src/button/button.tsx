import { cn } from "@kdo/utils";
import type { ElementType, MouseEvent } from "react";

import { Spinner } from "../spinner/spinner";
import type { ButtonIconProps, ButtonProps } from "./button.type";
import { buttonVariants, getMutedLabelClasses, getSpinnerColor } from "./button-variants";

function ButtonRoot<C extends ElementType = ElementType>({
  as,
  href,
  ref,
  type = "button",
  size = "md",
  variant = "solid",
  color = "brand",
  muted = false,
  shape = "rounded",
  loading = false,
  disabled = false,
  fullWidth = false,
  startContent,
  endContent,
  children,
  onClick,
  className,
  ...props
}: ButtonProps<C>) {
  const effectiveDisabled = disabled === true || loading === true;

  let Comp: ElementType = "button";
  if (as) {
    Comp = as;
  } else if (href) {
    Comp = effectiveDisabled ? "span" : "a";
  }
  const isButton = Comp === "button";
  const isAnchor = Comp === "a";
  // A custom `as` component receives only the props it should: its own
  // destination prop (`to`, `href`, …) comes through `...props`, so passing an
  // explicit `href={undefined}` here would clobber the link's own handling.
  const isCustom = !isButton && !isAnchor && Comp !== "span";

  const interactionProps: {
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    "aria-disabled"?: true;
    "aria-busy"?: true;
    tabIndex?: number;
  } = {};
  if (isButton) {
    interactionProps.type = type;
    interactionProps.disabled = effectiveDisabled;
  } else {
    if (isAnchor || (isCustom && href !== undefined)) interactionProps.href = href;
    if (effectiveDisabled) {
      interactionProps["aria-disabled"] = true;
      interactionProps.tabIndex = -1;
    }
  }
  if (loading) interactionProps["aria-busy"] = true;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (effectiveDisabled && !isButton) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <Comp
      ref={ref}
      {...interactionProps}
      onClick={handleClick}
      className={cn(
        buttonVariants({ size, variant, color, shape }),
        muted && getMutedLabelClasses({ variant, color, disabled: effectiveDisabled }),
        !effectiveDisabled &&
          "motion-safe:transition-transform motion-safe:duration-100 motion-safe:active:scale-[0.97]",
        effectiveDisabled && "cursor-not-allowed opacity-50",
        loading && "cursor-wait",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="sr-only">{children}</span>
          <Spinner aria-hidden="true" color={getSpinnerColor(variant, color)} />
        </>
      ) : (
        <>
          {startContent && (
            <span data-slot="start" className="flex shrink-0 items-center">
              {startContent}
            </span>
          )}
          {children}
          {endContent && (
            <span data-slot="end" className="flex shrink-0 items-center">
              {endContent}
            </span>
          )}
        </>
      )}
    </Comp>
  );
}

ButtonRoot.displayName = "Button";

function ButtonIcon({ children, className, ...props }: ButtonIconProps) {
  return (
    <ButtonRoot {...(props as ButtonProps)} className={cn("aspect-square px-0", className)}>
      {children}
    </ButtonRoot>
  );
}

ButtonIcon.displayName = "Button.Icon";

export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
});
