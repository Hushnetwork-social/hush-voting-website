/**
 * Minimal classname merge utility.
 * Accepts strings, undefined, or null — merges them, filtering out falsy values.
 * No external dependency required for this feature's scope.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
