import magicNums from "../magicNumbers";
import midPt from "./midPt";
import canMove from "./canMove";
import canJump from "./canJump";

function getNewGrid(
  originalGrid: number[],
  size: number,
  res: { [key: string]: any },
  isJumpMade: boolean
): { grid: number[]; forceJump: boolean } {
  const BLACK = magicNums.BLACK;
  const RED = magicNums.RED;
  const EMPTY = magicNums.EMPTY;

  let canHop = false;
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

  function getDir(value: number): string {
    let dir = "";
    switch(value) {
      case magicNums.BKING:
      case magicNums.RKING:
        dir = "both";
        break;

      case magicNums.RED:
        dir = "up";
        break;

      case magicNums.BLACK:
        dir = "down";
        break;
    }
    return dir;
  }

  //Make every token immovable
  gridCopy = gridCopy.map((value) => {
    return value > 0 ? -1 * value : value;
  });

  //Check for hops
  if (isJumpMade) {
    gridCopy[midPt(src, dst, size)] = (EMPTY * -1); //Replace jumped token with disabled empty box.
    let dir = getDir(Math.abs(gridCopy[dst]));
    let res = canJump(gridCopy, dst, size, dir);
    if (res.jumpable) {
      canHop = true;
      forceJump = true;
      gridCopy[dst] = Math.abs(gridCopy[dst]);
    }
  }

  //Check if next player can make jumps.
  if (canHop === false) {
    gridCopy = gridCopy.map((value, idx) => {
      if (Math.abs(value) === nextTurn && Math.abs(value) !== EMPTY) {
        let direction = getDir(Math.abs(value));
        const res = canJump(gridCopy, idx, size, direction);
        if (res.jumpable) {
          forceJump = true;
          return nextTurn;
        }
      }
      return value;
    });
  }

  //If next player cannot make jumps, then look for normal squares
  if (forceJump === false) {
    gridCopy = gridCopy.map((value, idx) => {
      if (Math.abs(value) === nextTurn && Math.abs(value) !== EMPTY) {
        let direction = getDir(Math.abs(value));
        const res = canMove(gridCopy, idx, size, direction);
        if (res.movable) {
          return nextTurn;
        }
      }
      return value;
    });
  }
  return { grid: gridCopy, forceJump: forceJump };
}

export default getNewGrid;
