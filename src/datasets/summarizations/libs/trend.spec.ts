import * as math from 'mathjs';
import {
  additiveDecomposite,
  createLinearModel,
  createPartialTrends,
  createExponentialMovingAveragePoints,
  createCenteredMovingAveragePoints,
  LinearModel,
} from './trend';
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
        yIntercept: 2.0,
        r2: 1.0,
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
        yIntercept: 0.5,
        r2: 0.5,
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
        yIntercept: 2.0,
        r2: 0.25,
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

  it('should return correct yIntercept.', () => {
    for (const [points, expectedResult] of testData) {
      const model = createLinearModel(points);
      expect(model.yIntercept).toBeCloseTo(expectedResult.yIntercept, 4);
    }
  });

  it('should return correct r2.', () => {
    for (const [points, expectedResult] of testData) {
      const model = createLinearModel(points);
      expect(model.r2).toBeCloseTo(expectedResult.r2, 4);
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

describe('createExponentialMovingAveragePoints', () => {

  const testData = [
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
      alpha: 0.5,
      expectedResult: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
      alpha: 0.0,
      expectedResult: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
      alpha: 0.5,
      expectedResult: [{ x: 1, y: 1 }, { x: 2, y: 1.5 }, { x: 3, y: 2.25 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
      alpha: 1.0,
      expectedResult: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 7 }, { x: 3, y: 2 }, { x: 4, y: 8 }, { x: 5, y: 3 }],
      alpha: 0.3,
      expectedResult: [{ x: 1, y: 1 }, { x: 2, y: 2.8 }, { x: 3, y: 2.56 }, { x: 4, y: 4.192 }, { x: 5, y: 3.8344 }],
    },
  ];

  it('should return correct result.', () => {
    for (const { points, alpha, expectedResult } of testData) {
      const result = createExponentialMovingAveragePoints(points, alpha);

      expect(result.length).toBe(expectedResult.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i].x).toBe(expectedResult[i].x);
        expect(result[i].y).toBeCloseTo(expectedResult[i].y, 4);
      }
    }
  });

  it('should return x-values of input points.', () => {
    const points = [
      { x: new Date(2020, 6, 1), y: 1 },
      { x: new Date(2020, 6, 2), y: 2 },
      { x: new Date(2020, 6, 3), y: 3 },
      { x: new Date(2020, 6, 4), y: 4 },
      { x: new Date(2020, 6, 5), y: 5 },
    ];
    const alpha = 1.0;

    const result = createExponentialMovingAveragePoints(points, alpha);

    expect(result.length).toBe(points.length);
    for (let i = 0; i < result.length; i++) {
      expect(result[i].x).toBe(points[i].x);
    }
  });
});


describe('createCenteredMovingAveragePoints', () => {

  const testData = [
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
      k: 1,
      expectedResult: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
      k: 1,
      expectedResult: [{ x: 1, y: 1.25 }, { x: 2, y: 2 }, { x: 3, y: 2.75 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
      k: 2,
      expectedResult: [{ x: 1, y: 1.75 }, { x: 2, y: 2 }, { x: 3, y: 2.25 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
      k: 3,
      expectedResult: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    },
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 7 }, { x: 3, y: 2 }, { x: 4, y: 8 }, { x: 5, y: 3 }],
      k: 2,
      expectedResult: [
        { x: 1, y: 3.6667 },
        { x: 2, y: 3.9167 },
        { x: 3, y: 4.75 },
        { x: 4, y: 4.6667 },
        { x: 5, y: 4.9167 },
      ],
    },
  ];

  it('should return correct result.', () => {
    for (const { points, k, expectedResult } of testData) {
      const result = createCenteredMovingAveragePoints(points, k);

      expect(result.length).toBe(expectedResult.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i].x).toBe(expectedResult[i].x);
        expect(result[i].y).toBeCloseTo(expectedResult[i].y, 4);
      }
    }
  });

  it('should return x-values of input points.', () => {
    const points = [
      { x: new Date(2020, 6, 1), y: 1 },
      { x: new Date(2020, 6, 2), y: 2 },
      { x: new Date(2020, 6, 3), y: 3 },
      { x: new Date(2020, 6, 4), y: 4 },
      { x: new Date(2020, 6, 5), y: 5 },
    ];
    const k = 2;

    const result = createCenteredMovingAveragePoints(points, k);

    expect(result.length).toBe(points.length);
    for (let i = 0; i < result.length; i++) {
      expect(result[i].x).toBe(points[i].x);
    }
  });
});

describe('additiveDecomposite', () => {

  const testData = [
    {
      points: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
      trendPoints: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
      groupFn: ({ x }: NumPoint): number => x % 3,
    },
    {
      points: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 8 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
      ],
      trendPoints: [
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
      ],
      groupFn: ({ x }: NumPoint): number => x % 3,
    },
    {
      points: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 8 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
      ],
      trendPoints: [
        { x: 1, y: 5 },
        { x: 2, y: 2 },
        { x: 3, y: 4 },
        { x: 4, y: 1 },
        { x: 5, y: 6 },
        { x: 6, y: 8 },
      ],
      groupFn: ({ x }: NumPoint): number => x % 2,
    },
  ];

  it('should return decomposition result satisfying additive model definition.', () => {
    for (const { points, trendPoints, groupFn } of testData) {
      const {
        detrendedPoints,
        seasonalPoints,
        residualPoints,
      } = additiveDecomposite(points, trendPoints, groupFn);

      expect(detrendedPoints.length).toBe(points.length);
      expect(seasonalPoints.length).toBe(points.length);
      expect(residualPoints.length).toBe(points.length);

      for (let i = 0; i < points.length; i++) {
        expect(detrendedPoints[i].y).toBeCloseTo(points[i].y - trendPoints[i].y, 4);
        expect(seasonalPoints[i].y + residualPoints[i].y).toBeCloseTo(points[i].y - trendPoints[i].y, 4);
      }
    }
  });

  it('should return seasonal points with the same y-value for points in a group.', () => {
    for (const { points, trendPoints, groupFn } of testData) {
      const {
        seasonalPoints,
      } = additiveDecomposite(points, trendPoints, groupFn);

      const groupYValue: Record<number, number> = {};
      expect(seasonalPoints.length).toBe(points.length);
      for (let i = 0; i < points.length; i++) {
        if (!(groupFn(points[i]) in groupYValue)) {
          groupYValue[groupFn(points[i])] = seasonalPoints[i].y;
        } else {
          expect(seasonalPoints[i].y).toBeCloseTo(groupYValue[groupFn(points[i])], 4);
        }
      }
    }
  });

  it('should return x-values of input points.', () => {
    for (const { points, trendPoints, groupFn } of testData) {
      const {
        detrendedPoints,
        seasonalPoints,
        residualPoints,
      } = additiveDecomposite(points, trendPoints, groupFn);

      expect(detrendedPoints.length).toBe(points.length);
      expect(seasonalPoints.length).toBe(points.length);
      expect(residualPoints.length).toBe(points.length);

      for (let i = 0; i < points.length; i++) {
        expect(detrendedPoints[i].x).toBe(points[i].x);
        expect(seasonalPoints[i].x).toBe(points[i].x);
        expect(residualPoints[i].x).toBe(points[i].x);
      }
    }
  });
});
