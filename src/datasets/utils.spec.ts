import { xBetweenDates } from './utils';

describe('DatasetUtils', () => {
  describe('xBetweenDates', () => {
    it('should create function.', () => {
      expect(xBetweenDates(new Date(), new Date())).toBeInstanceOf(Function);
    });

    it('should return whether input date in range or not.', () => {
      const time = new Date();
      const f = xBetweenDates(new Date(time.getTime() - 10), new Date(time.getTime() + 10));
      expect(f({ x: new Date(time.getTime() - 20), y: 0 })).toBeFalse();
      expect(f({ x: new Date(time.getTime() - 10), y: 0 })).toBeFalse();
      expect(f({ x: new Date(time.getTime()), y: 0 })).toBeTrue();
      expect(f({ x: new Date(time.getTime() + 10), y: 0 })).toBeTrue();
      expect(f({ x: new Date(time.getTime() + 20), y: 0 })).toBeFalse();
    });
  });
});
