import React from 'react';
import useLocalStorage from 'react-use-localstorage';

import Context from './Context';

const Provider = ({children} = {}) => {
  const [token, setToken] = useLocalStorage('token');

  return (
    <Context.Provider value={{token: [token, setToken]}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
