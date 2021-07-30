import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  Button,
  Text,
} from "@chakra-ui/react";

const ColorModeSwitcher: React.FC = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");

  return (
    <Button
      color="current"
      onClick={toggleColorMode}
      aria-label={`Switch to ${text} mode`}
      {...props}
    >
      <Text>Toggle {text === "light" ? "Light" : "Dark"} Mode</Text>
    </Button>
  );
};

export default ColorModeSwitcher;
