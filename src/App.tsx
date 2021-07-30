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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" p={3}>
        <VStack>
          <Board size={8} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
