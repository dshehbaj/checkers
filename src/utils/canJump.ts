import magicNums from "../magicNumbers";
import canMove from "./canMove";

function canJump(
  grid: number[],
  idx: number,
  size: number,
  dir: string
): { jumpable: boolean; indicies: number[] } {
  let indicies: number[] = [];
  let jumpable = false;

  const value = Math.abs(grid[idx]);

  if (value === magicNums.EMPTY) {
    return { jumpable, indicies };
  }

  let enemy = -1;
  let enemyKing = -1;

  switch (value) {
    case magicNums.BLACK:
    case magicNums.BKING:
      enemy = magicNums.RED;
      enemyKing = magicNums.RKING;
      break;

    case magicNums.RED:
    case magicNums.RKING:
      enemy = magicNums.BLACK;
      enemyKing = magicNums.BKING;
      break;
  }

  const row = Math.floor(idx / size);
  const col = idx % size;

  const colRight = col + 1 < size ? col + 1 : false;
  const colLeft = col - 1 >= 0 ? col - 1 : false;

  const checkJumpable = (nxtRow: number, direction: string) => {
    const nextRow = nxtRow;
    let right_diag = false;
    let left_diag = false;
    let rightIdx = -1;
    let leftIdx = -1;
    if (colRight !== false) {
      rightIdx = nextRow * size + colRight;
      right_diag =
        Math.abs(grid[rightIdx]) === enemy ||
        Math.abs(grid[rightIdx]) === enemyKing;
    }
    if (colLeft !== false) {
      leftIdx = nextRow * size + colLeft;
      left_diag =
        Math.abs(grid[leftIdx]) === enemy ||
        Math.abs(grid[leftIdx]) === enemyKing;
    }
    if (right_diag) {
      const key = direction + "Right";
      const res = canMove(grid, rightIdx, size, direction);
      if (res.dirForm[key]) {
        jumpable = true;
        indicies.push(res.dirForm[key]);
      }
    }
    if (left_diag) {
      const key = direction + "Left";
      const res = canMove(grid, leftIdx, size, direction);
      if (res.dirForm[key]) {
        jumpable = true;
        indicies.push(res.dirForm[key]);
      }
    }
  };

  if (dir === "up" || dir === "both") {
    const rowUp = row - 1 >= 0 ? row - 1 : false;
    if (rowUp !== false) checkJumpable(rowUp, "up");
  }
  if (dir === "down" || dir === "both") {
    const rowDown = row + 1 < size ? row + 1 : false;
    if (rowDown !== false) checkJumpable(rowDown, "down");
  }

  return { jumpable, indicies };
}

export default canJump;
