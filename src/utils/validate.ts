import isUnit from "./distance";

function validateMove(
  grid: number[],
  size: number,
  res: { [key: string]: any }
): boolean {
  let src = parseInt(res.source.droppableId);
  let dst = parseInt(res.destination.droppableId);
  let gridCopy = Array.from(grid);
  const EMPTY = 9;
  if (!isUnit(src, dst, size)) return false; //Can only move 1 unit sideways.
  if (Math.abs(gridCopy[dst]) !== EMPTY) return false; //Can not move onto an occupied place.

  //Black can only move down the grid.
  if (gridCopy[src] === 1) {
    if (dst <= src) return false;
  }

  //Red can only move up the grid.
  if (gridCopy[src] === 2) {
    if (dst >= src) return false;
  }

  return true;
}

export default validateMove;
