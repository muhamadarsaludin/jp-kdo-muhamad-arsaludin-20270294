import { cn } from "@kdo/utils";
import { forwardRef, useId } from "react";

import type { InputBaseProps } from "./input.type";
import { inputBaseVariants } from "./input-variants";

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(function InputBase(
  { className, id, size = "md", type = "text", ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <input
      ref={ref}
      id={inputId}
      type={type}
      className={cn(inputBaseVariants({ size }), className)}
      {...props}
    />
  );
});

InputBase.displayName = "InputBase";
