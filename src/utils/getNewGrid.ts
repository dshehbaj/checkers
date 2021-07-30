import magicNums from "../magicNumbers";

function getNewGrid(
  originalGrid: number[],
  size: number,
  res: { [key: string]: any }
): { grid: number[], forceJump: boolean } {
  const BLACK = magicNums.BLACK;
  const RED = magicNums.RED;
  const EMPTY = magicNums.EMPTY;

  let forceJump = false;

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

  //Check for jumps
  let jumpMode = gridCopy.map((value, idx) => {
    if (Math.abs(value) === nextTurn) {
      let row = Math.floor(idx / size);
      let col = idx % size;

      let rowPrev = row - 1 >= 0 ? row - 1 : false;
      let rowNext = row + 1 < size ? row + 1 : false;

      let colLeft = col - 1 >= 0 ? col - 1 : false;
      let colRight = col + 1 < size ? col + 1 : false;

      let nextRow = nextTurn === BLACK ? rowNext : rowPrev;
      let left_diag = false;
      let right_diag = false;

      let leftIdx = -1;
      let rightIdx = -1;

      if (nextRow !== false) {
        if (colRight !== false) {
          rightIdx = nextRow * size + colRight;
          right_diag = Math.abs(gridCopy[rightIdx]) === whoPlayed;
        }
        if (colLeft !== false) {
          leftIdx = nextRow * size + colLeft;
          left_diag = Math.abs(gridCopy[leftIdx]) === whoPlayed;
        }

        const nextRowPrev = nextRow - 1 >= 0 ? nextRow - 1 : false;
        const nextRowNext = nextRow + 1 < size ? nextRow + 1 : false;

        const nextNextRow = nextTurn === BLACK ? nextRowNext : nextRowPrev;

        if (nextNextRow !== false) {
          let jumpLeft = false;
          let jumpRight = false;
          if (right_diag) {
            let rt_Col = rightIdx % size;
            let newRt = rt_Col + 1 < size ? rt_Col + 1 : false;
            if (newRt !== false) {
              let newRtIdx = nextNextRow * size + newRt;
              jumpRight = Math.abs(gridCopy[newRtIdx]) === EMPTY;
            }
          }
          if (left_diag) {
            let lf_Col = leftIdx % size;
            let newLf = lf_Col - 1 >= 0 ? lf_Col - 1 : false;
            if (newLf !== false) {
              let newLfIdx = nextNextRow * size + newLf;
              jumpLeft = Math.abs(gridCopy[newLfIdx]) === EMPTY;
            }
          }
          if (jumpRight || jumpLeft) {
            forceJump = true;
          }
          return jumpRight || jumpLeft ? nextTurn : value;
        }
        return value;
      }
      return value;
    }
    return value;
  });

  gridCopy = gridCopy.map((value, idx) => {
    if (Math.abs(value) === nextTurn) {
      let row = Math.floor(idx / size);
      let col = idx % size;

      let rowPrev = row - 1 >= 0 ? row - 1 : false;
      let rowNext = row + 1 < size ? row + 1 : false;

      let colLeft = col - 1 >= 0 ? col - 1 : false;
      let colRight = col + 1 < size ? col + 1 : false;

      let nextRow = nextTurn === BLACK ? rowNext : rowPrev;
      let left_diag = false;
      let right_diag = false;

      if (nextRow !== false) {
        if (colRight !== false) {
          let rightIdx = nextRow * size + colRight;
          right_diag = Math.abs(gridCopy[rightIdx]) === EMPTY;
        }
        if (colLeft !== false) {
          let leftIdx = nextRow * size + colLeft;
          left_diag = Math.abs(gridCopy[leftIdx]) === EMPTY;
        }
        return left_diag || right_diag ? nextTurn : value;
      }
      return value;
    }
    return value;
  });

  let answerGrid = forceJump ? jumpMode : gridCopy;
  return { grid: answerGrid, forceJump: forceJump };
}

export default getNewGrid;
