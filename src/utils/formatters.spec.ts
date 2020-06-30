import { formatX, formatY, humanizeMeasureName } from './formatters';

describe('Formatters', () => {
  describe('formatX', () => {
    it('should format a Date object into a human readable string.', () => {
      const firstDayOfYear = new Date();
      firstDayOfYear.setMonth(0, 1);
      expect(formatX(firstDayOfYear)).toBe('January 01');
    });
  });

  describe('formatY', () => {
    it('should format a whole number into a string.', () => {
      expect(formatY(42)).toBe('42');
    });

    it('should format a decimal number into a string by rounding down to one decimal place.', () => {
      expect(formatY(Math.PI)).toBe('3.1');
    });
  });

  describe('humanizeMeasureName', () => {
    it(`should format a 'lowerCamelCased' string into 'Title Cased' string.`, () => {
      expect(humanizeMeasureName('helloWorld')).toBe('Hello World');
    });
  });
});
