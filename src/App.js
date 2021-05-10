import React from 'react';

import {Box, ChakraProvider} from '@chakra-ui/react';
import Routes from './routes';

import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box className="appContainer" bg={{base: 'white', lg: '#F0F6F8'}}>
        <Routes />
      </Box>
    </ChakraProvider>
  );
}

export default App;
