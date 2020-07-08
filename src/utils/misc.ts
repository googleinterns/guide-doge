/**
 * Returns an array with unique values
 *
 * @param array The input array with possibly redundant values
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}
