import { ascendingDate, ascendingNumber, descendingDate, descendingNumber } from './comparators';

describe('Comparators', () => {
  const MAX_MILLISECONDS = 1e8 * 86400 * 1e3; // max milliseconds since epoch according to ECMA-262. (one hundred million days)

  function isSorted<T>(array: T[], assertion: (predecessor: T, successor: T) => boolean) {
    return array.every((value, index) => index === 0 || assertion(array[index - 1], value));
  }

  function generateArray<T>(generator: (index: number) => T, size = 15) {
    return new Array(size).fill(0).map((_, index) => generator(index));
  }

  describe('ascendingNumber', () => {
    it('should sort numbers in ascending order.', () => {
      const numbers = generateArray(() => Math.random() * Number.MAX_SAFE_INTEGER);
      const sortedNumbers = [...numbers].sort(ascendingNumber);
      expect(
        isSorted(sortedNumbers, (a, b) => a <= b),
      ).toBeTrue();
    });
  });

  describe('descendingNumber', () => {
    it('should sort numbers in descending order.', () => {
      const numbers = generateArray(() => Math.random() * Number.MAX_SAFE_INTEGER);
      const sortedNumbers = [...numbers].sort(descendingNumber);
      expect(
        isSorted(sortedNumbers, (a, b) => a >= b),
      ).toBeTrue();
    });
  });

  describe('ascendingDate', () => {
    it('should sort dates in ascending order.', () => {
      const dates = generateArray(() => new Date(Math.floor(Math.random() * MAX_MILLISECONDS)));
      const sortedDates = [...dates].sort(ascendingDate);
      expect(
        isSorted(sortedDates, (a, b) => a <= b),
      ).toBeTrue();
    });
  });

  describe('descendingDate', () => {
    it('should sort dates in descending order.', () => {
      const dates = generateArray(() => new Date(Math.floor(Math.random() * MAX_MILLISECONDS)));
      const sortedDates = [...dates].sort(descendingDate);
      expect(
        isSorted(sortedDates, (a, b) => a >= b),
      ).toBeTrue();
    });
  });
});
