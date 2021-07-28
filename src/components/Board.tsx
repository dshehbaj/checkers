import React from "react";
import { Text, Box, Center, HStack, VStack } from "@chakra-ui/react";
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
const TOPSPACING = 90;

const Square: React.FC<SquareProps> = ({ row, col, size }) => {
  const offset = row % 2 ? 0 : 1;
  const bg = (col + offset) % 2 ? LIGHT : DARK;
  const one_d = row * size + col;
  const mid = Math.floor(size / 2);
  return (
    <Center width="100px" height="100px" bg={bg}>
      {bg === DARK && row !== mid && row !== mid - 1 && (
        <Draggable index={one_d} draggableId={String(one_d)}>
          {({ draggableProps, dragHandleProps, innerRef }) => (
            <Box {...draggableProps} {...dragHandleProps} ref={innerRef}>
              <Piece color={row > mid ? 1 : 0} />
            </Box>
          )}
        </Draggable>
      )}
    </Center>
  );
};

const Row: React.FC<RowProps> = ({ row, size }) => {
  return (
    <HStack spacing={0}>
      <Text p={1.5}>{size - row}</Text>
      {new Array(size).fill(0).map((_, idx) => {
        const one_d = row * size + idx;
        return (
          <Droppable droppableId={String(one_d)} key={one_d}>
            {({ droppableProps, innerRef }) => (
              <Box {...droppableProps} ref={innerRef}>
                <Square row={row} col={idx} size={size} />
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
  return (
    <VStack spacing={0} bg={OUTLINE} rounded="2xl">
      <HStack spacing={TOPSPACING}>
        {new Array(size).fill(0).map((_, idx) => {
          return <Text>{String.fromCharCode("a".charCodeAt(0) + idx)}</Text>;
        })}
      </HStack>
      <DragDropContext onDragEnd={(res) => console.log(res)}>
        {new Array(size).fill(0).map((_, idx) => {
          return <Row row={idx} size={size} />;
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
