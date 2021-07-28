function isUnit(idx_1: number, idx_2: number, size: number): boolean {
  const x1 = idx_1 % size;
  const y1 = Math.floor(idx_1 / size);

  const x2 = idx_2 % size;
  const y2 = Math.floor(idx_2 / size);

  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) === Math.SQRT2;
}

export default isUnit;
