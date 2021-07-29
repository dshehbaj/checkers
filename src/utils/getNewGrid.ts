import magicNums from "../magicNumbers";

function getNewGrid(
  originalGrid: number[],
  size: number,
  res: { [key: string]: any }
): number[] {
  const BLACK = magicNums.BLACK;
  const RED = magicNums.RED;
  const EMPTY = magicNums.EMPTY;

  const src = res.source.droppableId;
  const dst = res.destination.droppableId;
  let gridCopy = Array.from(originalGrid);

  const whoPlayed = gridCopy[src] === BLACK ? BLACK : RED;

  const temp = gridCopy[src];
  gridCopy[src] = gridCopy[dst];
  gridCopy[dst] = temp;

  //Switch turns
  //Note who's turn it is now
  const nextTurn = whoPlayed === BLACK ? RED : BLACK;

  //Make every token immovable
  gridCopy = gridCopy.map((value) => {
    return value > 0 ? -1 * value : value;
  });


  const enableSquares: number[] = [];
  //Evaluate tokens of the person who's turn is now
  gridCopy = gridCopy.map((value, idx) => {
    let row = Math.floor(idx / size);
    let col = idx % size;

    let rowPrev = row - 1 >= 0 ? row - 1 : false;
    let rowNext = row + 1 < size ? row + 1 : false;

    let colLeft = col - 1 >= 0 ? col - 1 : false;
    let colRight = col + 1 < size ? col + 1 : false;

    if (value === -1 * nextTurn) {
      let nextRow = nextTurn === BLACK ? rowNext : rowPrev;
      let left_diag = false;
      let right_diag = false;

      if (nextRow !== false) {
        if (colRight !== false) {
          let rightIdx = nextRow * size + colRight;
          right_diag = Math.abs(gridCopy[rightIdx]) === EMPTY;
          if (right_diag) enableSquares.push(rightIdx);
        }
        if (colLeft !== false) {
          let leftIdx = nextRow * size + colLeft;
          left_diag = Math.abs(gridCopy[leftIdx]) === EMPTY;
          if (left_diag) enableSquares.push(leftIdx);
        }
        return left_diag || right_diag ? nextTurn : value;
      }
      return value;
    }
    return value;
  });

  for (let i = 0; i < enableSquares.length; i++) {
    const idx = enableSquares[i]
    gridCopy[idx] = EMPTY;
  }

  return gridCopy;
}

export default getNewGrid;
