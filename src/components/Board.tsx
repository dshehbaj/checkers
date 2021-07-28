import React from "react";
import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Piece from "./Piece";

interface BoardProps {
  size: number;
}

interface RowProps extends BoardProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const DARK = "#A05F18";
const LIGHT = "#DBA65E";
const OUTLINE = "#412B11";

const Square: React.FC<SquareProps> = ({ row, col, size, children }) => {
  const offset = row % 2 ? 0 : 1;
  const bg = (col + offset) % 2 ? LIGHT : DARK;
  const one_d = row * size + col;
  return (
    <Center width="100px" height="100px" bg={bg}>
      <Draggable index={one_d} draggableId={String(one_d)}>
        {({ draggableProps, dragHandleProps, innerRef }) => (
          <Box {...draggableProps} {...dragHandleProps} ref={innerRef}>
            {children}
          </Box>
        )}
      </Draggable>
    </Center>
  );
};

const Row: React.FC<RowProps> = ({ row, size }) => {
  const mid = Math.floor(size / 2);
  return (
    <HStack spacing={0}>
      {new Array(size).fill(0).map((_, idx) => {
        const one_d = row * size + idx;
        const isLight = (idx + ((row % 2) + 1)) % 2;
        return (
          <Droppable droppableId={String(one_d)} key={one_d}>
            {({ droppableProps, innerRef }) => (
              <Box {...droppableProps} ref={innerRef}>
                <Square row={row} col={idx} size={size}>
                  {!isLight && row !== mid && row !== mid - 1 && (
                    <Piece color={row > mid ? 1 : 0} />
                  )}
                </Square>
              </Box>
            )}
          </Droppable>
        );
      })}
    </HStack>
  );
};

const Board: React.FC<BoardProps> = ({ size }) => {
  return (
    <VStack spacing={0} bg={OUTLINE} rounded="2xl" p={4}>
      <DragDropContext onDragEnd={(res) => console.log(res)}>
        {new Array(size).fill(0).map((_, idx) => {
          return <Row row={idx} size={size} />;
        })}
      </DragDropContext>
    </VStack>
  );
};

export default Board;
