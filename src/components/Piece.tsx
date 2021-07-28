import React from "react";
import { Circle } from "@chakra-ui/react";

interface PieceInterface {
  color: 0 | 1; // 0 for black, 1 for red
}

const Piece: React.FC<PieceInterface> = ({ color }) => {
  const bg = color ? "red" : "gray.600";
  return (
    <Circle size="85px" bg={bg} border="4px" borderColor="black">
      <Circle size="55px" bg={bg} border="4px" borderColor="black" />
    </Circle>
  );
};

export default Piece;
