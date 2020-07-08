/**
 * Returns an array with unique values.
 *
 * @param array The input array with possibly redundant values
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Returns a modulo n. The range of return values is [0, n).
 *
 * @param a The dividend
 * @param n The divisor
 */
export function mod(a: number, n: number) {
  return (a % n + n) % n;
}
