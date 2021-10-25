import React from 'react';

import {Box, ChakraProvider} from '@chakra-ui/react';
import Routes from './routes';
import {Provider as AuthProvider} from './components/stores/Auth';

import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Box className="appContainer" bg={{base: '#F0F6F8', lg: 'light.50'}}>
          <Routes />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
