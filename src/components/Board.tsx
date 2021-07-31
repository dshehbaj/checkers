import React, { useEffect, useState } from "react";
import { Text, Box, Center, HStack, VStack, Square, Button } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Piece from "./Piece";
import getNewGrid from "../utils/getNewGrid";
import getSquares from "../utils/getSquares";
import magicNums from "../magicNumbers";
import ColorModeSwitcher from "./ColorModeSwitcher";

interface BoardProps {
  size: number;
}

interface RowProps extends BoardProps {
  row: number;
  tokens: number[];
  jumpMode: boolean;
}

interface SquareProps extends RowProps {
  col: number;
  token: number;
  dropDisabled: boolean;
}

const DARK = "#A05F18";
const LIGHT = "#DBA65E";
const OUTLINE = "#412B11";
const SQUARE_SIZE = [45, 45, 90, 90];
const STACK_SPACING = [0.5, 0.5, 1, 1];
const TOPSPACING = [43, 43, 86, 86];
const TEXTSIZE = [7, 7, 14, 14];
const TEXTCOLOR = "white";

const BSquare: React.FC<SquareProps> = ({ row, col, size, dropDisabled, token, jumpMode }) => {
  const offset = row % 2 ? 0 : 1;
  const bg = (col + offset) % 2 ? LIGHT : DARK;
  const one_d = row * size + col;
  return (
    <Center width={SQUARE_SIZE} height={SQUARE_SIZE} bg={bg}>
      <Square
        size={SQUARE_SIZE}
        shadow="dark-lg"
        bg={dropDisabled ? "" : jumpMode ? "red" : "green"}
      >
        <Draggable
          index={one_d}
          draggableId={String(one_d)}
          isDragDisabled={token < 0 || Math.abs(token) === magicNums.EMPTY} //Square is disabled or Empty
        >
          {({ draggableProps, dragHandleProps, innerRef }) => (
            <Box {...draggableProps} {...dragHandleProps} ref={innerRef}>
              <Piece
                color={Math.abs(token)}
                visibile={Math.abs(token) !== magicNums.EMPTY}
                movable={token > 0} //Movable if positive
              />
            </Box>
          )}
        </Draggable>
      </Square>
    </Center>
  );
};

const Row: React.FC<RowProps> = ({ row, size, tokens, jumpMode }) => {
  return (
    <HStack spacing={STACK_SPACING}>
      <Text p={0.5} fontSize={TEXTSIZE} color={TEXTCOLOR}>
        {size - row}
      </Text>
      {new Array(size).fill(0).map((_, idx) => {
        const one_d = row * size + idx;
        const isDropDisabled = tokens[idx] !== magicNums.EMPTY;
        return (
          <Droppable
            droppableId={String(one_d)}
            key={one_d}
            isDropDisabled={isDropDisabled}
          >
            {({ droppableProps, innerRef }) => (
              <Box {...droppableProps} ref={innerRef}>
                <BSquare
                  row={row}
                  col={idx}
                  size={size}
                  token={tokens[idx]}
                  tokens={tokens}
                  dropDisabled={isDropDisabled}
                  jumpMode={jumpMode}
                />
              </Box>
            )}
          </Droppable>
        );
      })}
      <Text p={0.5} fontSize={TEXTSIZE} color={TEXTCOLOR}>
        {size - row}
      </Text>
    </HStack>
  );
};

const Board: React.FC<BoardProps> = ({ size }) => {
  const r = magicNums.RED;
  const b = magicNums.BLACK;
  const e = magicNums.EMPTY;
  const initGrid = [
    -e, -b, -e, -b, -e, -b, -e, -b,
    -b, -e, -b, -e, -b, -e, -b, -e,
    -e, b, -e, b, -e, b, -e, b,

    -e, -e, -e, -e, -e, -e, -e, -e,
    -e, -e, -e, -e, -e, -e, -e, -e,

    -r, -e, -r, -e, -r, -e, -r, -e,
    -e, -r, -e, -r, -e, -r, -e, -r,
    -r, -e, -r, -e, -r, -e, -r, -e,
  ];
  const [grid, setGrid] = useState(initGrid);
  const [oldGrid, setOldGrid] = useState(grid);
  const [forceJump, setForceJump] = useState(false);

  const resetGrid = () => {
    setForceJump(false);
    setGrid(initGrid);
    setOldGrid(initGrid);
  };

  useEffect(() => {
    const gridFromLocal = window.localStorage.getItem("gridLocal");
    const oldGridFromLocal = window.localStorage.getItem("oldGridLocal");
    const forceJumpFromLocal = window.localStorage.getItem("forceJumpLocal");
    if (forceJumpFromLocal) setForceJump(eval(forceJumpFromLocal));
    if (gridFromLocal) setGrid(JSON.parse(gridFromLocal));
    if (oldGridFromLocal) setOldGrid(JSON.parse(oldGridFromLocal));
  }, [setGrid, setForceJump, setOldGrid]);

  useEffect(() => {
    window.localStorage.setItem("gridLocal", JSON.stringify(grid));
    window.localStorage.setItem("forceJumpLocal", String(forceJump));
    window.localStorage.setItem("oldGridLocal", JSON.stringify(oldGrid));
  }, [grid, forceJump, oldGrid]);

  const handleOnDragEnd = (result: { [key: string]: any }) => {
    if (!result.destination) setGrid(oldGrid);
    else {
      const nextGrid = getNewGrid(grid, size, result, forceJump);
      setGrid(nextGrid.grid);
      setForceJump(nextGrid.forceJump);
    }
  };

  const handleOnDragStart = (result: { [key: string]: any }) => {
    const viewGrid = getSquares(grid, size, result, forceJump);
    setOldGrid(grid);
    setGrid(viewGrid);
  };

  return (
    <VStack>
      <HStack>
        <Button onClick={() => resetGrid()}>Reset Board</Button>
        <ColorModeSwitcher />
      </HStack>
      <VStack spacing={STACK_SPACING} bg={OUTLINE} rounded="2xl">
        <HStack spacing={TOPSPACING}>
          {new Array(size).fill(0).map((_, idx) => {
            return (
              <Text fontSize={TEXTSIZE} color={TEXTCOLOR}>
                {String.fromCharCode("a".charCodeAt(0) + idx)}
              </Text>
            );
          })}
        </HStack>
        <DragDropContext
          onDragEnd={handleOnDragEnd}
          onDragStart={handleOnDragStart}
        >
          {new Array(size).fill(0).map((_, idx) => {
            let rowStart = idx * size;
            return (
              <Row
                row={idx}
                size={size}
                tokens={grid.slice(rowStart, rowStart + size)}
                jumpMode={forceJump}
              />
            );
          })}
        </DragDropContext>
        <HStack spacing={TOPSPACING} color={TEXTCOLOR}>
          {new Array(size).fill(0).map((_, idx) => {
            return (
              <Text fontSize={TEXTSIZE}>
                {String.fromCharCode("a".charCodeAt(0) + idx)}
              </Text>
            );
          })}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Board;
