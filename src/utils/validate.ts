import isUnit from "./distance";

function validateMove(
  grid: number[],
  size: number,
  src: number,
  dst: number
): boolean {
  let gridCopy = Array.from(grid);
  if (!isUnit(src, dst, size)) return false; //Can only move 1 unit sideways.
  if (gridCopy[dst] !== 0) return false; //Can not move onto an occupied place.

  //Black can only move down the grid.
  if (gridCopy[src] === 1) {
    if (dst <= src) return false;
  }

  //Red can only move up the grid.
  if (gridCopy[src] === 2) {
    if(dst >= src) return false;
  }

  return true;
}

export default validateMove;