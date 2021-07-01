import {createContext} from 'react';

const Context = createContext({
  token: [null, () => {}],
  user: null,
});

export default Context;
