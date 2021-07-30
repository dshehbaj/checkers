import React from "react";
import { Circle } from "@chakra-ui/react";

interface PieceInterface {
  color: 0 | 1; // 0 for black, 1 for red
  visibile: true | false;
  movable: true | false;
}

const MOVABLE = [37, 37, 73 ,79];
const OUTER = [31, 31, 59, 65];
const INNER = [18, 18, 35, 39];
const BORDER = "2px";

const Piece: React.FC<PieceInterface> = ({
  color,
  visibile,
  movable,
}) => {
  const bg = color ? "red" : "gray.700";
  return (
    <Circle
      size={MOVABLE}
      bg={movable ? "orange" : ""}
      visibility={visibile ? "visible" : "hidden"}
    >
      <Circle
        size={OUTER}
        bg={bg}
        border={BORDER}
        borderColor="black"
        shadow="dark-lg"
      >
        <Circle size={INNER} bg={bg} border={BORDER} borderColor="black" />
      </Circle>
    </Circle>
  );
};

export default Piece;
