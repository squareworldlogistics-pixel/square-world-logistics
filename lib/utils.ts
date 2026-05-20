/**
 * Simple, robust utility to merge class names dynamically
 * and filter out conditional/falsy values.
 */
export function cn(...inputs: any[]): string {
  return inputs.flat().filter(Boolean).join(" ");
}
