import React from "react";
import { ChakraProvider, Grid, VStack } from "@chakra-ui/react";
import Board from "./components/Board";

function App() {
  return (
    <ChakraProvider>
      <Grid>
        <VStack>
          <Board size={8} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
