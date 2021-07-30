import React from "react";
import {
  Button,
  ChakraProvider,
  Grid,
  VStack,
  theme,
  HStack,
} from "@chakra-ui/react";
import Board from "./components/Board";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Board size={8} />
          <HStack>
            <ColorModeSwitcher />
          </HStack>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
