import {createContext} from 'react';

const Context = createContext({
  token: [null, () => {}],
});

export default Context;
