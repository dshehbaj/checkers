import magicNums from "../magicNumbers";

function canMove(
  grid: number[],
  idx: number,
  size: number,
  dir: string
): { movable: boolean; indicies: number[] } {
  let indicies: number[] = [];
  let movable = false;

  if (dir !== "up" && dir !== "down" && dir !== "both") {
    return { movable, indicies };
  }

  const EMPTY = magicNums.EMPTY;

  const row = Math.floor(idx / size);
  const col = idx % size;

  const colRight = col + 1 < size ? col + 1 : false;
  const colLeft = col - 1 >= 0 ? col - 1 : false;

  const check = (nxtRow: number) => {
    const nextRow = nxtRow;
    let right_diag = false;
    let left_diag = false;
    let rightIdx = -1;
    let leftIdx = -1;
    if (colRight !== false) {
      rightIdx = nextRow * size + colRight;
      right_diag = Math.abs(grid[rightIdx]) === EMPTY;
    }
    if (colLeft !== false) {
      leftIdx = nextRow * size + colLeft;
      left_diag = Math.abs(grid[leftIdx]) === EMPTY;
    }
    if (right_diag || left_diag) {
      movable = true;
      if (right_diag) indicies.push(rightIdx);
      if (left_diag) indicies.push(leftIdx);
    }
  };

  if (dir === "up" || dir === "both") {
    const rowUp = row - 1 >= 0 ? row - 1 : false;
    if (rowUp !== false) check(rowUp);
  }
  if (dir === "down" || dir === "both") {
    const rowDown = row + 1 < size ? row + 1 : false;
    if (rowDown !== false) check(rowDown);
  }

  return { movable, indicies };
}

export default canMove;
