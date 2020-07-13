export function tFunc(bStart: number, cStart: number, cEnd: number, bEnd: number) {
  return (v) => {
    if (v < bStart) {
      return 0.0;
    } else if (bStart <= v && v < cStart) {
      return (v - bStart) / (cStart - bStart);
    } else if (cStart <= v && v < cEnd) {
      return 1.0;
    } else if (cEnd <= v && v < bEnd) {
      return 1.0 - (v - cEnd) / (bEnd - cEnd);
    } else {
      return 0.0;
    }
  };
}

export function tFuncL(bStart: number, cStart: number) {
  return tFunc(bStart, cStart, Infinity, Infinity);
}

export function tFuncR(cEnd: number, bEnd: number) {
  return tFunc(-Infinity, -Infinity, cEnd, bEnd);
}
