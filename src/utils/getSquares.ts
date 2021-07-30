import magicNums from "../magicNumbers";

function getSquares(
  originalGrid: number[],
  size: number,
  res: { [key: string]: any },
  forceJump: boolean
): number[] {
  const BLACK = magicNums.BLACK;
  const RED = magicNums.RED;
  const EMPTY = magicNums.EMPTY;

  const gridCopy = Array.from(originalGrid);
  const src = res.source.droppableId;

  const whoseTurn = gridCopy[src] === BLACK ? BLACK : RED;
  const opponent = whoseTurn === BLACK ? RED : BLACK;
  const row = Math.floor(src / size);
  const col = src % size;

  let rowPrev = row - 1;
  let rowNext = row + 1;

  let colLeft = col - 1 >= 0 ? col - 1 : false;
  let colRight = col + 1 < size ? col + 1 : false;

  const nextRow = whoseTurn === BLACK ? rowNext : rowPrev;

  if (forceJump) {
    const nextRowPrev = nextRow - 1 >= 0 ? nextRow - 1 : false;
    const nextRowNext = nextRow + 1 < size ? nextRow + 1 : false;
    const nextNextRow = whoseTurn === BLACK ? nextRowNext : nextRowPrev;

    if (nextNextRow !== false) {
      if (colLeft !== false) {
        const leftIdx = nextRow * size + colLeft;
        if (Math.abs(gridCopy[leftIdx]) === opponent) {
          let newColLeft = colLeft - 1 >= 0 ? colLeft - 1 : false;
          if (newColLeft !== false) {
            let newLeftIdx = nextNextRow * size + newColLeft;
            if (Math.abs(gridCopy[newLeftIdx]) === EMPTY) {
              gridCopy[newLeftIdx] = EMPTY;
            }
          }
        }
      }
      if (colRight !== false) {
        const rightIdx = nextRow * size + colRight;
        if (Math.abs(gridCopy[rightIdx]) === opponent) {
          let newColRight = colRight + 1 < size ? colRight + 1 : false;
          if (newColRight !== false) {
            let newRightIdx = nextNextRow * size + newColRight;
            if (Math.abs(gridCopy[newRightIdx]) === EMPTY) {
              gridCopy[newRightIdx] = EMPTY;
            }
          }
        }
      }
    }
  } else {
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
  }

  return gridCopy;
}

export default getSquares;
