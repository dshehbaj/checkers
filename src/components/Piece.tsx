import React from "react";
import { Circle } from "@chakra-ui/react";

interface PieceInterface {
  color: 0 | 1; // 0 for black, 1 for red
  visibile: true | false;
  movable: true | false;
}

const Piece: React.FC<PieceInterface> = ({ color, visibile, movable }) => {
  const bg = color ? "red" : "gray.700";
  return (
    <Circle
      size="100px"
      bg={movable ? "orange" : ""}
      visibility={visibile ? "visible" : "hidden"}
    >
      <Circle
        size="85px"
        bg={bg}
        border="4px"
        borderColor="black"
        shadow="dark-lg"
      >
        <Circle size="55px" bg={bg} border="4px" borderColor="black" />
      </Circle>
    </Circle>
  );
};

export default Piece;
