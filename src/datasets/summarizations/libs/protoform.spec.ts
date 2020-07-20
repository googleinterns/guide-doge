import { trapmf, trapmfL, trapmfR } from './protoform';

describe('membership', () => {
  const data: number[] = [];
  for (let i = -40; i < 40; i++) {
    data.push(i * 0.1);
  }

  describe('trapmf', () => {
    const [a, b, c, d] = [-2, -1, 1, 2];
    const f = trapmf(a, b, c, d);

    it('should create membership function.', () => {
      expect(f).toEqual(jasmine.any(Function));
    });

    it('should create membership function producing correct membership value.', () => {
      for (const v of data) {
        if (v < a) {
          expect(f(v)).toBeCloseTo(0.0, 5);
        } else if (a <= v && v < b) {
          expect(f(v)).toBeCloseTo(interp(v, [a, b], [0, 1]), 5);
        } else if (b <= v && v < c) {
          expect(f(v)).toBeCloseTo(1.0, 5);
        } else if (c <= v && v < d) {
          expect(f(v)).toBeCloseTo(interp(v, [c, d], [1, 0]));
        } else {
          expect(f(v)).toBeCloseTo(0.0, 5);
        }
      }
    });
  });

  describe('trapmfL', () => {
    const [a, b] = [-2, -1];
    const f = trapmfL(a, b);

    it('should create membership function.', () => {
      expect(f).toEqual(jasmine.any(Function));
    });

    it('should create membership function producing correct membership value.', () => {
      for (const v of data) {
        if (v < a) {
          expect(f(v)).toBeCloseTo(0.0, 5);
        } else if (a <= v && v < b) {
          expect(f(v)).toBeCloseTo(interp(v, [a, b], [0, 1]), 5);
        } else {
          expect(f(v)).toBeCloseTo(1.0, 5);
        }
      }
    });
  });

  describe('trapmfR', () => {
    const [c, d] = [1, 2];
    const f = trapmfR(c, d);

    it('should create membership function.', () => {
      expect(f).toEqual(jasmine.any(Function));
    });

    it('should create membership function producing correct membership value.', () => {
      for (const v of data) {
        if (v < c) {
          expect(f(v)).toBeCloseTo(1.0, 5);
        } else if (c <= v && v < d) {
          expect(f(v)).toBeCloseTo(interp(v, [c, d], [1, 0]));
        } else {
          expect(f(v)).toBeCloseTo(0.0, 5);
        }
      }
    });
  });
});

function interp(x: number, xp: [number, number], fp: [number, number]) {
  const [x1, x2] = xp;
  const [y1, y2] = fp;
  return (x - x1) * (y2 - y1) / (x2 - x1) + y1;
}
