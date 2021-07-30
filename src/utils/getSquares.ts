import magicNums from "../magicNumbers";
import canJump from "./canJump";
import canMove from "./canMove";

function getSquares(
  originalGrid: number[],
  size: number,
  res: { [key: string]: any },
  forceJump: boolean
): number[] {
  const gridCopy = Array.from(originalGrid);
  const src = res.source.droppableId;

  let dir = "";
  const value = Math.abs(gridCopy[src]);
  switch (Math.abs(value)) {
    case magicNums.BKING:
    case magicNums.RKING:
      dir = "both";
      break;
    case magicNums.BLACK:
      dir = "down";
      break;
    case magicNums.RED:
      dir = "up";
      break;
  }

  if (forceJump) {
    const res = canJump(gridCopy, src, size, dir);
    if (res.jumpable) {
      res.indicies.forEach((idx) => {
        gridCopy[idx] = magicNums.EMPTY;
      });
    }
  } else {
    const res = canMove(gridCopy, src, size, dir);
    if (res.movable) {
      res.indicies.forEach((idx) => {
        gridCopy[idx] = magicNums.EMPTY;
      });
    }
  }

  return gridCopy;
}

export default getSquares;
