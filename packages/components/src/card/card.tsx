import { forwardRef } from "react";

import { cn } from "@kdo/utils";

import type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./card.type";

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-secondary bg-primary py-5 text-primary text-sm",
        "has-data-[slot=card-footer]:pb-0",
        className,
      )}
      {...props}
    />
  );
});

CardRoot.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("grid items-start gap-1 px-5", "has-data-[slot=card-action]:grid-cols-[1fr_auto]", className)}
      {...props}
    />
  );
});

CardHeader.displayName = "Card.Header";

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(function CardTitle({ className, ...props }, ref) {
  return (
    <div ref={ref} data-slot="card-title" className={cn("font-medium text-base text-primary", className)} {...props} />
  );
});

CardTitle.displayName = "Card.Title";

export const CardDescription = forwardRef<HTMLDivElement, CardDescriptionProps>(function CardDescription(
  { className, ...props },
  ref,
) {
  return <div ref={ref} data-slot="card-description" className={cn("text-sm text-tertiary", className)} {...props} />;
});

CardDescription.displayName = "Card.Description";

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(function CardAction(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
});

CardAction.displayName = "Card.Action";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div ref={ref} data-slot="card-content" className={cn("px-5", className)} {...props} />;
});

CardContent.displayName = "Card.Content";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center border-secondary border-t p-5", className)}
      {...props}
    />
  );
});

CardFooter.displayName = "Card.Footer";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
});
