import * as math from 'mathjs';
import { createLinearModel, createPartialTrends, LinearModel, TimeSeriesPartialTrend } from './trend';
import { NumPoint, TimeSeriesPoint } from '../../metas/types';

describe('createLinearModel', () => {
  const testData: [NumPoint[], LinearModel][] = [
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
      const model = createLinearModel(points);
      expect(model.gradient).toBeCloseTo(expectedResult.gradient, 4);
    }
  });

  it('should return correct gradient angle in radius.', () => {
    for (const [points, expectedResult] of testData) {
      const model = createLinearModel(points);
      expect(model.gradientAngleRad).toBeCloseTo(expectedResult.gradientAngleRad, 4);
    }
  });

  it('should return correct prediction.', () => {
    for (const [points, expectedResult] of testData) {
      const model = createLinearModel(points);
      expect(model.prediction.length).toBe(expectedResult.prediction.length);
      for (let i = 0; i < model.prediction.length; i++) {
        expect(model.prediction[i].x).toBeCloseTo(expectedResult.prediction[i].x, 4);
        expect(model.prediction[i].y).toBeCloseTo(expectedResult.prediction[i].y, 4);
      }
    }
  });

  it('should return correct absolute error mean.', () => {
    for (const [points, expectedResult] of testData) {
      const model = createLinearModel(points);
      expect(model.absoluteErrorMean).toBeCloseTo(expectedResult.absoluteErrorMean, 4);
    }
  });

  it('should return correct absolute error standard deviation.', () => {
    for (const [points, expectedResult] of testData) {
      const model = createLinearModel(points);
      expect(model.absoluteErrorStd).toBeCloseTo(expectedResult.absoluteErrorStd, 4);
    }
  });
});

describe('createPartialTrends', () => {
  const testData: [TimeSeriesPoint[], number][] = [
    [
      [
        { x: new Date(2020, 6, 1), y: 100 },
        { x: new Date(2020, 6, 2), y: 200 },
        { x: new Date(2020, 6, 3), y: 300 },
      ],
      0.1,
    ],
    [
      [
        { x: new Date(2020, 6, 1), y: 100 },
        { x: new Date(2020, 6, 2), y: 200 },
        { x: new Date(2020, 6, 3), y: 100 },
      ],
      0.1,
    ]
  ];

  it('should return index intervals covering entire points array.', () => {
    for (const [points, eps] of testData) {
      const partialTrends = createPartialTrends(points, eps);
      expect(partialTrends[0].indexStart).toBe(0);
      expect(partialTrends[partialTrends.length - 1].indexEnd).toBe(points.length - 1);
    }
  });

  it('should return continuous index interval.', () => {
    for (const [points, eps] of testData) {
      const partialTrends = createPartialTrends(points, eps);
      for (let i = 1; i < partialTrends.length; i++) {
        expect(partialTrends[i].indexStart).toBe(partialTrends[i - 1].indexEnd);
      }
    }
  });

  it('should return x-values of points as time start and time end.', () => {
    for (const [points, eps] of testData) {
      const partialTrends = createPartialTrends(points, eps);
      for (const partialTrend of partialTrends) {
        expect(partialTrend.timeStart).toEqual(points[partialTrend.indexStart].x);
        expect(partialTrend.timeEnd).toEqual(points[partialTrend.indexEnd].x);
      }
    }
  });

  it('should return correct time percentage span.', () => {
    for (const [points, eps] of testData) {
      const totalTimeSpan = points[points.length - 1].x.getTime() - points[0].x.getTime();
      const partialTrends = createPartialTrends(points, eps);
      for (const partialTrend of partialTrends) {
        const trendTimeSpan = points[partialTrend.indexEnd].x.getTime() - points[partialTrend.indexStart].x.getTime();
        expect(partialTrend.percentageSpan).toBeCloseTo(trendTimeSpan / totalTimeSpan, 4);
      }
    }
  });

  it('should have percentage spans sum to one.', () => {
    for (const [points, eps] of testData) {
      const partialTrends = createPartialTrends(points, eps);
      const percentageSpanSum = math.sum(partialTrends.map(trend => trend.percentageSpan));
      expect(percentageSpanSum).toBeCloseTo(1.0, 4);
    }
  });
});
