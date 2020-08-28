import { linearRegression, normalizedUniformPartiallyLinearEpsApprox, LinearRegressionResult } from './trend';
import { NumPoint } from '../../metas/types';

describe('linearRegression', () => {
  const testData: [NumPoint[], LinearRegressionResult][] = [
    [
      [{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 5 }],
      {
        gradient: 1,
        gradientAngleRad: 0.7854,
        prediction: [{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 5 }],
        absoluteErrorMean: 0.0,
        absoluteErrorStd: 0.0,
      }
    ],
    [
      [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
      {
        gradient: 1,
        gradientAngleRad: 0.7854,
        prediction: [{ x: 1, y: 1.5 }, { x: 1, y: 1.5 }, { x: 2, y: 2.5 }, { x: 2, y: 2.5 }],
        absoluteErrorMean: 0.5,
        absoluteErrorStd: 0.0,
      }
    ],
    [
      [{ x: 1, y: 6 }, { x: 2, y: 2 }, { x: 3, y: 10 }],
      {
        gradient: 2,
        gradientAngleRad: 1.1071,
        prediction: [{ x: 1, y: 4 }, { x: 2, y: 6 }, { x: 3, y: 8 }],
        absoluteErrorMean: 8 / 3,
        absoluteErrorStd: 1.1547,
      }
    ]
  ];

  it('should return correct gradient.', () => {
    for (const [points, expectedResult] of testData) {
      const result = linearRegression(points);
      expect(result.gradient).toBeCloseTo(expectedResult.gradient, 4);
    }
  });

  it('should return correct gradient angle in radius.', () => {
    for (const [points, expectedResult] of testData) {
      const result = linearRegression(points);
      expect(result.gradientAngleRad).toBeCloseTo(expectedResult.gradientAngleRad, 4);
    }
  });

  it('should return correct prediction.', () => {
    for (const [points, expectedResult] of testData) {
      const result = linearRegression(points);
      expect(result.prediction.length).toBe(expectedResult.prediction.length);
      for (let i = 0; i < result.prediction.length; i++) {
        expect(result.prediction[i].x).toBeCloseTo(expectedResult.prediction[i].x, 4);
        expect(result.prediction[i].y).toBeCloseTo(expectedResult.prediction[i].y, 4);
      }
    }
  });

  it('should return correct absolute error mean.', () => {
    for (const [points, expectedResult] of testData) {
      const result = linearRegression(points);
      expect(result.absoluteErrorMean).toBeCloseTo(expectedResult.absoluteErrorMean, 4);
    }
  });

  it('should return correct absolute error standard deviation.', () => {
    for (const [points, expectedResult] of testData) {
      const result = linearRegression(points);
      expect(result.absoluteErrorStd).toBeCloseTo(expectedResult.absoluteErrorStd, 4);
    }
  });
});
