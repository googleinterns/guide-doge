/**
 * Returns an array with unique values.
 *
 * @param array The input array with possibly redundant values.
 */
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Returns a modulo n. The range of return values is [0, n).
 *
 * @param a The dividend.
 * @param n The divisor.
 */
export function mod(a: number, n: number) {
  return (a % n + n) % n;
}

/**
 * Asynchronously waits for the given duration.
 *
 * @param duration The duration (in ms) to wait for.
 * @param cancel$ The subject to be fed to cancel waiting.
 * @return The promise to be fulfilled with true after the given duration. If cancelled, it will be immediately fulfilled with false.
 */
export function waitFor(duration: number): Promise<true>;
export function waitFor(duration: number, cancel$: Subject<unknown>): Promise<boolean>;
export function waitFor(duration: number, cancel$?: Subject<unknown>) {
  return new Promise(resolve => {
    const timeoutId = window.setTimeout(() => {
      cancelSubscription?.unsubscribe();
      resolve(true);
    }, duration);
    const cancelSubscription = cancel$
      ?.pipe(take(1))
      .subscribe(() => {
        window.clearTimeout(timeoutId);
        resolve(false);
      });
  });
}

export function linearScale(ratio: number, min: number, max: number) {
  return (max - min) * ratio + min;
}

export function linearSquaredScale(ratio: number, min: number, max: number) {
  return Math.sqrt(linearScale(ratio, min * min, max * max));
}

export function logarithmicScale(ratio: number, min: number, max: number) {
  return linearScale(Math.log(linearScale(ratio, 1, Math.E)), min, max);
}

export function isNotNullish<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}
