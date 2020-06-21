import { formatX, formatY, humanizeMeasureName } from './formatters';

describe('Formatters', () => {
  describe('formatX', () => {
    it('should format a date correctly.', () => {
      const firstDayOfYear = new Date();
      firstDayOfYear.setMonth(0, 1);
      expect(formatX(firstDayOfYear)).toBe('January 01');
    });
  });

  describe('formatY', () => {
    it('should format a whole number correctly.', () => {
      expect(formatY(42)).toBe('42');
    });

    it('should format a decimal number correctly.', () => {
      expect(formatY(Math.PI)).toBe('3.1');
    });
  });

  describe('humanizeMeasureName', () => {
    it(`should format a 'lowerCamelCased' string into 'Title Cased' string.`, () => {
      expect(humanizeMeasureName('helloWorld')).toBe('Hello World');
    });
  });
});
