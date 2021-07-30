import React, { useState } from "react";
import { Text, Box, Center, HStack, VStack, Square } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Piece from "./Piece";
import getNewGrid from "../utils/getNewGrid";
import getSquares from "../utils/getSquares";
import magicNums from "../magicNumbers";

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
const SQUARE_SIZE = [45, 45, 90, 100];
const STACK_SPACING = [0.5, 0.5, 1, 1];
const TOPSPACING = [43, 43, 86, 93];
const TEXTSIZE = [7, 7, 14, 21];
const TEXTCOLOR = "white";

//Negative values = item is disabled
//0 = item is empty/not visible
const BLACK = magicNums.BLACK;
const RED = magicNums.RED;
const EMPTY = magicNums.EMPTY;

const BSquare: React.FC<SquareProps> = ({
  row,
  col,
  size,
  dropDisabled,
  token,
  jumpMode,
}) => {
  const offset = row % 2 ? 0 : 1;
  const bg = (col + offset) % 2 ? LIGHT : DARK;
  const one_d = row * size + col;
  return (
    <Center width={SQUARE_SIZE} height={SQUARE_SIZE} bg={bg}>
      <Square
        size={SQUARE_SIZE}
        bg={dropDisabled ? "" : jumpMode ? "red" : "green"}
        shadow="dark-lg"
      >
        <Draggable
          index={one_d}
          draggableId={String(one_d)}
          isDragDisabled={token < 0 || Math.abs(token) === EMPTY} //Square is disabled or Empty
        >
          {({ draggableProps, dragHandleProps, innerRef }) => (
            <Box {...draggableProps} {...dragHandleProps} ref={innerRef}>
              <Piece
                color={Math.abs(token)}
                visibile={Math.abs(token) !== EMPTY}
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
      {
        <Text p={0.5} fontSize={TEXTSIZE} color={TEXTCOLOR}>
          {size - row}
        </Text>
      }
      {new Array(size).fill(0).map((_, idx) => {
        const one_d = row * size + idx;
        const isDropDisabled = tokens[idx] !== EMPTY;
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
      {
        <Text p={0.5} fontSize={TEXTSIZE} color={TEXTCOLOR}>
          {size - row}
        </Text>
      }
    </HStack>
  );
};

const Board: React.FC<BoardProps> = ({ size }) => {
  const r = RED;
  const b = BLACK;
  const e = EMPTY;
  const [grid, setGrid] = useState([
    -e, -b, -e, -b, -e, -b, -e, -b,
    -b, -e, -b, -e, -b, -e, -b, -e,
    -e, b, -e, b, -e, b, -e, b,

    -e, -e, -e, -e, -e, -e, -e, -e,
    -e, -e, -e, -e, -e, -e, -e, -e,

    -r, -e, -r, -e, -r, -e, -r, -e,
    -e, -r, -e, -r, -e, -r, -e, -r,
    -r, -e, -r, -e, -r, -e, -r, -e,
  ]);
  const [oldGrid, setOldGrid] = useState(grid);
  const [forceJump, setForceJump] = useState(false);

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
    <VStack spacing={STACK_SPACING} bg={OUTLINE} rounded="2xl">
      {
        <HStack spacing={TOPSPACING}>
          {new Array(size).fill(0).map((_, idx) => {
            return (
              <Text fontSize={TEXTSIZE} color={TEXTCOLOR}>
                {String.fromCharCode("a".charCodeAt(0) + idx)}
              </Text>
            );
          })}
        </HStack>
      }
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
      {
        <HStack spacing={TOPSPACING} color={TEXTCOLOR}>
          {new Array(size).fill(0).map((_, idx) => {
            return (
              <Text fontSize={TEXTSIZE}>
                {String.fromCharCode("a".charCodeAt(0) + idx)}
              </Text>
            );
          })}
        </HStack>
      }
    </VStack>
  );
};

export default Board;
