import React from 'react';

import {Box, ChakraProvider} from '@chakra-ui/react';
import Routes from './routes';

import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box className="appContainer" bg={{base: 'white', lg: 'light.50'}}>
        <Routes />
      </Box>
    </ChakraProvider>
  );
}

export default App;
