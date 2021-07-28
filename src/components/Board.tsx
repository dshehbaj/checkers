import React from "react";
import { Text, Center, HStack, VStack } from "@chakra-ui/react";
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
const TOP_SPACING = 85;

const Square: React.FC<SquareProps> = ({ row, col, children }) => {
  const offset = row % 2 ? 0 : 1;
  const bg = (col + offset) % 2 ? LIGHT : DARK;
  return (
    <Center width="100px" height="100px" bg={bg} flex="1">
      {children}
    </Center>
  );
};

const Row: React.FC<RowProps> = ({ row, size }) => {
  const mid = Math.floor(size / 2);
  return (
    <HStack spacing={0} flex="1">
      <Text p={2} color="white">
        {size - row}
      </Text>
      {new Array(size).fill(0).map((_, idx) => {
        return (
          <Square row={row} col={idx} size={size}>
            {(idx + ((row % 2) + 1)) % 2 === 0 &&
              row !== mid &&
              row !== mid - 1 &&
              <Piece color={row > mid ? 1 : 0} />
            }
          </Square>
        );
      })}
      <Text p={2} color="white">
        {size - row}
      </Text>
    </HStack>
  );
};

const Board: React.FC<BoardProps> = ({ size }) => {
  return (
    <VStack spacing={0} bg={OUTLINE} rounded="2xl" flex="1">
      <HStack spacing={TOP_SPACING}>
        {new Array(size).fill(0).map((_, idx) => {
          return (
            <Text p={1} color="white">
              {String.fromCharCode("a".charCodeAt(0) + idx)}
            </Text>
          );
        })}
      </HStack>
      {new Array(size).fill(0).map((_, idx) => {
        return <Row row={idx} size={size} />;
      })}
      <HStack spacing={TOP_SPACING}>
        {new Array(size).fill(0).map((_, idx) => {
          return (
            <Text p={1} color="white">
              {String.fromCharCode("a".charCodeAt(0) + idx)}
            </Text>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default Board;
