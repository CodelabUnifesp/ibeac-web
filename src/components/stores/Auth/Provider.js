import React, {useEffect, useCallback, useMemo} from 'react';

import jwt from 'jsonwebtoken';

import {get, isEmpty, isNil, isNull} from 'lodash';
import useLocalStorage from '../../../utils/react/storedState';
import Context from './Context';

const Provider = ({children} = {}) => {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);

  useEffect(() => {
    if (!isNil(token)) {
      const decoded = jwt.decode(token);

      // verificar se o token expirou, se estiver, invalidar a sessão
      if (Date.now() > get(decoded, 'exp', 0) * 1000) {
        setToken(undefined);
        setUser(undefined);
      }
    }
  }, [token, setToken, setUser]);

  useEffect(() => {
    if (isEmpty(user) || isNil(user)) {
      setToken(undefined);
      setUser(undefined);
    }
  }, [user, setToken, setUser]);

  return (
    <Context.Provider value={{token, setToken, user, setUser}}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
