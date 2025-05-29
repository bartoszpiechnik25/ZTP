import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names conditionally.
 * It uses `clsx` for conditional class names and `twMerge` to merge Tailwind CSS classes.
 *
 * @param inputs - Class names or conditions to apply.
 * @returns A string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
