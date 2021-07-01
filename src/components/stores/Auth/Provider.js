import React, {useEffect, useMemo} from 'react';
import useLocalStorage from 'react-use-localstorage';

import jwt from 'jsonwebtoken';

import {get, isEmpty, isNull} from 'lodash';
import Context from './Context';

const Provider = ({children} = {}) => {
  const [token, setToken] = useLocalStorage('token');
  const user = useMemo(
    () => (isNull(token) || isEmpty(token) ? null : jwt.decode(token)),
    [token],
  );

  useEffect(() => {
    if (!isNull(user)) {
      // verificar se o token expirou, se estiver, invalidar a sessão
      if (Date.now() > get(user, 'exp', 0) * 1000) {
        setToken(null);
      }
    }
  }, [user, setToken]);

  return (
    <Context.Provider value={{token: [token, setToken], user}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
