import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names into a final `className` string.
 *
 * Combines values with `clsx` (falsy values are skipped) and resolves
 * conflicting Tailwind utilities with `tailwind-merge`, so later classes
 * override earlier ones. This is the standard way to let consumers override
 * default styling in `@wedo/altar-components` and other packages.
 *
 * @param inputs - Class names, strings, objects keyed by class name, or
 * arrays thereof. Falsy entries are filtered out.
 * @returns A single deduplicated class string (empty string when no truthy input).
 *
 * @example
 * cn("px-4 py-2", "mt-2", condition && "bg-brand-500")
 * // => "px-4 py-2 mt-2 bg-brand-500"
 *
 * @example
 * cn("px-4", "px-8")
 * // => "px-8" — tailwind-merge resolves the conflict
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
