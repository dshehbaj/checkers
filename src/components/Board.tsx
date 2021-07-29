import React, { useState } from "react";
import { Text, Box, Center, HStack, VStack, Square } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Piece from "./Piece";
import validateMove from "../utils/validate";
import getNewGrid from "../utils/getNewGrid";
import getSquares from "../utils/getSquares";
import magicNums from "../magicNumbers";

interface BoardProps {
  size: number;
}

interface RowProps extends BoardProps {
  row: number;
  tokens: number[];
}

interface SquareProps extends RowProps {
  col: number;
  token: number;
  dropDisabled: boolean;
}

const DARK = "#A05F18";
const LIGHT = "#DBA65E";
const OUTLINE = "#412B11";
const TOPSPACING = 107.5;

//Negative values = item is disabled
//0 = item is empty/not visible
const BLACK = magicNums.BLACK;
const RED = magicNums.RED;
const EMPTY = magicNums.EMPTY;
const SQUARE_SIZE = 115;

const BSquare: React.FC<SquareProps> = ({
  row,
  col,
  size,
  dropDisabled,
  token,
}) => {
  const offset = row % 2 ? 0 : 1;
  const bg = (col + offset) % 2 ? LIGHT : DARK;
  const one_d = row * size + col;
  return (
    <Center width={SQUARE_SIZE} height={SQUARE_SIZE} bg={bg}>
      <Square
        size={SQUARE_SIZE}
        bg={dropDisabled ? "" : "green.700"}
        shadow="dark-lg"
      >
        {
          <Draggable
            index={one_d}
            draggableId={String(one_d)}
            isDragDisabled={token < 0 || Math.abs(token) === EMPTY} //Square is disabled or Empty
          >
            {({ draggableProps, dragHandleProps, innerRef }) => (
              <Box {...draggableProps} {...dragHandleProps} ref={innerRef}>
                <Piece
                  color={Math.abs(token) === RED ? 1 : 0}
                  visibile={Math.abs(token) !== EMPTY}
                  movable={token > 0} //Movable if positive
                />
              </Box>
            )}
          </Draggable>
        }
      </Square>
    </Center>
  );
};

const Row: React.FC<RowProps> = ({ row, size, tokens }) => {
  return (
    <HStack spacing={1}>
      <Text p={1.5}>{size - row}</Text>
      {new Array(size).fill(0).map((_, idx) => {
        const one_d = row * size + idx;
        const isLight = (idx + (row % 2 ? 0 : 1)) % 2 ? true : false;
        const isDropDisabled = tokens[idx] !== EMPTY || isLight;
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
                />
              </Box>
            )}
          </Droppable>
        );
      })}
      <Text p={1.5}>{size - row}</Text>
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

  const handleOnDragEnd = (result: { [key: string]: any }) => {
    if (!result.destination) setGrid(oldGrid);
    else {
      validateMove(grid, size, result) &&
        setGrid(getNewGrid(grid, size, result));
    }
  };

  const handleOnDragStart = (result: { [key: string]: any }) => {
    console.log(result);
    const viewGrid = getSquares(grid, size, result);
    setOldGrid(grid);
    setGrid(viewGrid);
    console.log(viewGrid);
  };

  return (
    <VStack spacing={1} bg={OUTLINE} rounded="2xl">
      <HStack spacing={TOPSPACING}>
        {new Array(size).fill(0).map((_, idx) => {
          return <Text>{String.fromCharCode("a".charCodeAt(0) + idx)}</Text>;
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
            />
          );
        })}
      </DragDropContext>
      <HStack spacing={TOPSPACING}>
        {new Array(size).fill(0).map((_, idx) => {
          return <Text>{String.fromCharCode("a".charCodeAt(0) + idx)}</Text>;
        })}
      </HStack>
    </VStack>
  );
};

export default Board;
