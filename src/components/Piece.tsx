import React from "react";
import { Circle } from "@chakra-ui/react";

interface PieceInterface {
  color: 0 | 1; // 0 for black, 1 for red
  visibile: true | false;
}

const Piece: React.FC<PieceInterface> = ({ color, visibile }) => {
  const bg = color ? "red" : "gray.700";
  return (
    <Circle
      size="85px"
      bg={bg}
      border="4px"
      borderColor="black"
      visibility={visibile ? "visible" : "hidden"}
    >
      <Circle size="55px" bg={bg} border="4px" borderColor="black" />
    </Circle>
  );
};

export default Piece;
