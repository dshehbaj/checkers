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

  let canHop = false;
  let forceJump = false;

  const src = res.source.droppableId;
  const dst = res.destination.droppableId;
  let gridCopy = Array.from(originalGrid);

  let nextTurn  = -1;
  let nextTurnKing = -1;
  //Note who played, then pick next player.
  switch (Math.abs(gridCopy[src])) {
    case magicNums.BKING:
    case magicNums.BLACK:
      nextTurn = magicNums.RED;
      nextTurnKing = magicNums.RKING;
      break;
    case magicNums.RKING:
    case magicNums.RED:
      nextTurn = magicNums.BLACK;
      nextTurnKing = magicNums.BKING;
      break;
  }

  const temp = gridCopy[src];
  gridCopy[src] = gridCopy[dst];
  gridCopy[dst] = temp;

  //Switch turns

  function getDir(value: number): string {
    let dir = "";
    switch(value) {
      case magicNums.BKING:
      case magicNums.RKING:
        dir = magicNums.KDIR;
        break;

      case magicNums.RED:
        dir = magicNums.RDIR;
        break;

      case magicNums.BLACK:
        dir = magicNums.BDIR;
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
    //Replace jumped token with disabled empty box.
    gridCopy[midPt(src, dst, size)] = (magicNums.EMPTY * -1);
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
      if (Math.abs(value) === nextTurn || Math.abs(value) === nextTurnKing) {
        let direction = getDir(Math.abs(value));
        const res = canJump(gridCopy, idx, size, direction);
        if (res.jumpable) {
          forceJump = true;
          return Math.abs(value);
        }
      }
      return value;
    });
  }

  //If next player cannot make jumps, then look for normal squares
  if (forceJump === false) {
    gridCopy = gridCopy.map((value, idx) => {
      if (Math.abs(value) === nextTurn || Math.abs(value) === nextTurnKing) {
        let direction = getDir(Math.abs(value));
        const res = canMove(gridCopy, idx, size, direction);
        if (res.movable) {
          return Math.abs(value);
        }
      }
      return value;
    });
  }
  return { grid: gridCopy, forceJump: forceJump };
}

export default getNewGrid;
