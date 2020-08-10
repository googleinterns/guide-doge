
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

/**
 * Create a trapezoidal membership function. The fuzzy membership value is computed
 * by the returned function with the following formula:
 *   f(x: number) = max(min((x-a)/(b-a), 1, (d-x)/(d-c)), 0)
 *
 * The shoulders of the membership function is defined by parameter b and c, and the
 * feet of the function is defined by a and d.
 */
export function trapmf(a: number, b: number, c: number, d: number): MembershipFunction {
  return (v: number) => {
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

/**
 * Create a left trapezoidal membership function. The fuzzy membership value is computed
 * by the returned function with the following formula:
 *   f(x: number) = max(min((x-a)/(b-a), 1), 0)
 *
 * `trapmfL` is equivalent to `trapmf` with c and d being +Infinity
 */
export function trapmfL(a: number, b: number) {
  return trapmf(a, b, Infinity, Infinity);
}

/**
 * Create a right trapezoidal membership function. The fuzzy membership value is computed
 * by the returned function with the following formula:
 *   f(x: number) = max(min((d-x)/(d-c), 1), 0)
 *
 * `trapmfR` is equivalent to `trapmf` with a and b being -Infinity
 */
export function trapmfR(c: number, d: number) {
  return trapmf(-Infinity, -Infinity, c, d);
}

