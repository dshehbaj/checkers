import magicNums from "../magicNumbers";

function getSquares(
  originalGrid: number[],
  size: number,
  res: { [key: string]: any }
): number[] {
  const BLACK = magicNums.BLACK;
  const RED = magicNums.RED;
  const EMPTY = magicNums.EMPTY;

  const gridCopy = Array.from(originalGrid);
  const src = res.source.droppableId;

  const whoseTurn = gridCopy[src] === BLACK ? BLACK : RED;
  const row = Math.floor(src / size);
  const col = src % size;

  let rowPrev = row - 1;
  let rowNext = row + 1;

  let colLeft = col - 1 >= 0 ? col - 1 : false;
  let colRight = col + 1 < size ? col + 1 : false;

  const nextRow = whoseTurn === BLACK ? rowNext : rowPrev;

  if (colLeft !== false) {
    const leftIdx = nextRow * size + colLeft;
    if (Math.abs(gridCopy[leftIdx]) === EMPTY) {
      gridCopy[leftIdx] = EMPTY;
    }
  }
  if (colRight !== false) {
    const rightIdx = nextRow * size + colRight;
    if (Math.abs(gridCopy[rightIdx]) === EMPTY) {
      gridCopy[rightIdx] = EMPTY;
    }
  }

  return gridCopy;
}

export default getSquares;
