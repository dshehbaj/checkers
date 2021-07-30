import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

export const ColorModeSwitcher: React.FC = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");

  return (
    <Button
      fontSize="lg"
      color="current"
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
      {...props}
    >
      Toggle {text === "light" ? "Light" : "Dark"} Mode
    </Button>
  );
};
