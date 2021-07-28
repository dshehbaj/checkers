import React, {useState} from "react";
import { Text, Box, Center, HStack, VStack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Piece from "./Piece";

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
}

const DARK = "#A05F18";
const LIGHT = "#DBA65E";
const OUTLINE = "#412B11";
const TOPSPACING = 90;

const Square: React.FC<SquareProps> = ({ row, col, size, token }) => {
  const offset = row % 2 ? 0 : 1;
  const bg = (col + offset) % 2 ? LIGHT : DARK;
  const one_d = row * size + col;
  return (
    <Center width="100px" height="100px" bg={bg}>
      {token !== 0 &&
      <Draggable index={one_d} draggableId={String(one_d)}>
        {({ draggableProps, dragHandleProps, innerRef }) => (
          <Box {...draggableProps} {...dragHandleProps} ref={innerRef}>
            <Piece color={token === 2 ? 1 : 0} />
          </Box>
        )}
      </Draggable>
      }
    </Center>
  );
};

const Row: React.FC<RowProps> = ({ row, size, tokens }) => {
  return (
    <HStack spacing={0}>
      <Text p={1.5}>{size - row}</Text>
      {new Array(size).fill(0).map((_, idx) => {
        const one_d = row * size + idx;
        return (
          <Droppable droppableId={String(one_d)} key={one_d}>
            {({ droppableProps, innerRef }) => (
              <Box {...droppableProps} ref={innerRef}>
                <Square row={row} col={idx} size={size} token={tokens[idx]}
                  tokens={tokens}/>
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
  const [grid, setGrid] = useState([
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1,

    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,

    2, 0, 2, 0, 2, 0, 2, 0,
    0, 2, 0, 2, 0, 2, 0, 2,
    2, 0, 2, 0, 2, 0, 2, 0,
  ]);

  const handleOnDragEnd = (result: {[key: string]: any}) => {
    if (!result.destination) return;
    console.log(result);
    const source = parseInt(result.source.droppableId);
    const destination = parseInt(result.destination.droppableId);
    const tempGrid = Array.from(grid);
    const temp = tempGrid[source];
    tempGrid[source] = tempGrid[destination];
    tempGrid[destination] = temp;
    setGrid(tempGrid);
  }

  return (
    <VStack spacing={0} bg={OUTLINE} rounded="2xl">
      <HStack spacing={TOPSPACING}>
        {new Array(size).fill(0).map((_, idx) => {
          return <Text>{String.fromCharCode("a".charCodeAt(0) + idx)}</Text>;
        })}
      </HStack>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {new Array(size).fill(0).map((_, idx) => {
          let rowStart = idx * size;
          return <Row row={idx} size={size}
                  tokens={grid.slice(rowStart, rowStart + size)}/>;
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
