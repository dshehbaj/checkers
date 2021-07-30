import React from "react";
import { Circle, Text } from "@chakra-ui/react";
import magicNums from "../magicNumbers";

interface PieceInterface {
  color: number;
  visibile: true | false;
  movable: true | false;
}

const MOVABLE = [37, 37, 73, 73];
const OUTER = [31, 31, 59, 59];
const INNER = [18, 18, 35, 35];
const TEXTSIZE = [7, 7, 14, 14];
const BORDER = "2px";

const Piece: React.FC<PieceInterface> = ({ color, visibile, movable }) => {

  const isKing = color === magicNums.BKING || color === magicNums.RKING;
  let bg = "";
  switch (color) {
    case magicNums.BLACK:
    case magicNums.BKING:
      bg = "gray.700";
      break;

    case magicNums.RED:
    case magicNums.RKING:
      bg = "red";
      break;

    default:
      break;
  }
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
        <Circle size={INNER} bg={bg} border={BORDER} borderColor="black">
          {isKing && (
            <Text color="black" fontSize={TEXTSIZE}>
              &#9818;
            </Text>
          )}
        </Circle>
      </Circle>
    </Circle>
  );
};

export default Piece;
