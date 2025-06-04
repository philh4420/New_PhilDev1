// src/lib/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Optional internal cache for repeat merges (efficient for repeated renders)
const _classCache = new Map<string, string>();

/**
 * A performant utility that intelligently combines class names using `clsx` and `tailwind-merge`,
 * with caching for static or repeated inputs. Automatically removes falsy or duplicate classes.
 *
 * @param inputs - A list of class names or conditional expressions.
 * @returns A single merged string of Tailwind-safe class names.
 */
export function cn(...inputs: ClassValue[]): string {
  const key = JSON.stringify(inputs);

  // Return cached value if available
  if (_classCache.has(key)) return _classCache.get(key)!;

  const merged = twMerge(clsx(...inputs));

  // Cache the result for future use
  _classCache.set(key, merged);

  return merged;
}