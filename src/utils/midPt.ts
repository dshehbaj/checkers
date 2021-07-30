function midPt(src: number, dst: number, size: number): number {
  const x1 = Math.floor(src / size);
  const y1 = Math.floor(src % size);

  const x2 = Math.floor(dst / size);
  const y2 = Math.floor(dst % size);

  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return mx * size + my;
}

export default midPt;
