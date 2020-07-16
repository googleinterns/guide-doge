
export type MembershipFunction = (v: number) => number;

export type PointMembershipFunction<PointT> = (p: PointT) => number;

export function sigmaCountQA<PointT>(points: PointT[],
                                     fQ: MembershipFunction,
                                     fA: PointMembershipFunction<PointT>): number {
  const uA = points.map(fA);
  const n = uA.reduce((p, v) => p + v, 0);
  const d = uA.length + 1e-7;
  const t = fQ(n / d);
  return t;
}

export function sigmaCountQAB<PointT>(points: PointT[],
                                      fQ: MembershipFunction,
                                      fA: PointMembershipFunction<PointT>,
                                      fB: PointMembershipFunction<PointT>): number {

  const uA = points.map(fA);
  const uB = points.map(fB);
  const n = uA.map((ua, i) => ua * uB[i]).reduce((p, v) => p + v, 0);
  const d = uA.reduce((p, v) => p + v, 0) + 1e-7;
  const t = fQ(n / d);
  return t;
}

export function trapezoidalMF(a: number, b: number, c: number, d: number): MembershipFunction {
  return (v) => {
    if (v < a) {
      return 0.0;
    } else if (a <= v && v < b) {
      return (v - a) / (b - a);
    } else if (b <= v && v < c) {
      return 1.0;
    } else if (c <= v && v < d) {
      return 1.0 - (v - c) / (d - c);
    } else {
      return 0.0;
    }
  };
}

export function trapezoidalMFL(a: number, b: number) {
  return trapezoidalMF(a, b, Infinity, Infinity);
}

export function trapezoidalMFR(c: number, d: number) {
  return trapezoidalMF(-Infinity, -Infinity, c, d);
}

