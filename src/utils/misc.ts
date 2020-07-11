/**
 * Returns an array with unique values.
 *
 * @param array The input array with possibly redundant values
 */
import { Subject } from 'rxjs';

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

export function waitFor(duration: number): Promise<true>;
export function waitFor(duration: number, cancel$: Subject<unknown>): Promise<boolean>;
export function waitFor(duration: number, cancel$?: Subject<unknown>) {
  return new Promise(resolve => {
    const timeoutId = window.setTimeout(() => {
      cancelSubscription?.unsubscribe();
      resolve(true);
    }, duration);
    const cancelSubscription = cancel$?.subscribe(() => {
      window.clearTimeout(timeoutId);
      resolve(false);
    });
  });
}
