export function ascendingNumber(a: number, b: number) {
  return a - b;
}

export function descendingNumber(a: number, b: number) {
  return -ascendingNumber(a, b);
}

export function ascendingDate(a: Date, b: Date) {
  return ascendingNumber(a.getTime(), b.getTime());
}

export function descendingDate(a: Date, b: Date) {
  return -ascendingDate(a, b);
}
