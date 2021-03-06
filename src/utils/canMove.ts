import magicNums from "../magicNumbers";

function canMove(
  grid: number[],
  idx: number,
  size: number,
  dir: string
): { movable: boolean; indicies: number[], dirForm: {[key: string] : number} } {
  let indicies: number[] = [];
  let movable = false;
  let dirForm: {[key: string]: number} = {};

  if (dir !== "up" && dir !== "down" && dir !== "both") {
    return { movable, indicies, dirForm };
  }

  const row = Math.floor(idx / size);
  const col = idx % size;

  const colRight = col + 1 < size ? col + 1 : false;
  const colLeft = col - 1 >= 0 ? col - 1 : false;

  const checkMovable = (nxtRow: number, direction: string) => {
    const nextRow = nxtRow;
    let right_diag = false;
    let left_diag = false;
    let rightIdx = -1;
    let leftIdx = -1;
    if (colRight !== false) {
      rightIdx = nextRow * size + colRight;
      right_diag = Math.abs(grid[rightIdx]) === magicNums.EMPTY;
    }
    if (colLeft !== false) {
      leftIdx = nextRow * size + colLeft;
      left_diag = Math.abs(grid[leftIdx]) === magicNums.EMPTY;
    }
    if (right_diag) {
      movable = true;
      dirForm[direction + "Right"] = rightIdx;
      indicies.push(rightIdx);
    }
    if (left_diag) {
      movable = true;
      dirForm[direction + "Left"] = leftIdx;
      indicies.push(leftIdx);
    }
  };

  if (dir === "up" || dir === "both") {
    const rowUp = row - 1 >= 0 ? row - 1 : false;
    if (rowUp !== false) checkMovable(rowUp, "up");
  }
  if (dir === "down" || dir === "both") {
    const rowDown = row + 1 < size ? row + 1 : false;
    if (rowDown !== false) checkMovable(rowDown, "down");
  }

  return { movable, indicies, dirForm };
}

export default canMove;
