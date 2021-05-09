import React from 'react';

import {ChakraProvider} from '@chakra-ui/react';
import Routes from './routes';

import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="appContainer">
        <Routes />
      </div>
    </ChakraProvider>
  );
}

export default App;
