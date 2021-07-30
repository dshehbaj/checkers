import React from "react";
import { ChakraProvider, Grid, VStack, theme } from "@chakra-ui/react";
import Board from "./components/Board";

const BOARDSIZE = 8;
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" p={3}>
        <VStack>
          <Board size={BOARDSIZE} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
